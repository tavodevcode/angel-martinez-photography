// Optimiza imágenes para el sitio: las deja visualmente idénticas pero dentro
// del presupuesto de peso (220 KB, el mismo que valida check-image-budget.mjs).
//
// Estrategia:
//   1. Hornea la orientación EXIF y convierte a sRGB (el resto de metadata se descarta).
//   2. Redimensiona al lado mayor máximo (default 2400px) — nunca agranda.
//   3. Codifica JPEG con mozjpeg probando calidades de mayor a menor hasta caber
//      en el presupuesto; si ni la calidad mínima alcanza, reduce dimensiones
//      por pasos y reintenta.
//   4. PNG con transparencia se mantiene PNG (paleta + compresión máxima);
//      todo lo demás sale como JPEG progresivo.
//
// Uso:
//   pnpm optimize:images foto.jpg carpeta-con-fotos/   # optimiza hacia src/assets/images/
//   pnpm optimize:images                               # revisa src/assets/images/ y re-optimiza
//                                                      # solo lo que excede el presupuesto
// Opciones:
//   --out <dir>     carpeta de salida (default: src/assets/images)
//   --budget <kb>   presupuesto por imagen en KB (default: 215, margen bajo los 220 del gate)
//   --max <px>      lado mayor máximo (default: 2400)
//   --force         reprocesa aunque el archivo ya cumpla el presupuesto
//   --dry-run       muestra qué haría sin escribir nada

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DEFAULT_OUT = path.resolve('src/assets/images');
const VALID_INPUT = /\.(jpe?g|png|webp|avif|tiff?)$/i;
// Escalera de calidades mozjpeg: 88 es visualmente indistinguible del original
// para fotografía; 70 es el piso — debajo de eso preferimos bajar dimensiones.
const QUALITY_STEPS = [88, 84, 80, 76, 72, 70];
const MIN_EDGE = 1400; // no reducimos el lado mayor por debajo de esto

const args = process.argv.slice(2);
const options = { out: DEFAULT_OUT, budgetKb: 215, maxEdge: 2400, force: false, dryRun: false };
const inputs = [];

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--out') options.out = path.resolve(args[++i]);
  else if (arg === '--budget') options.budgetKb = Number(args[++i]);
  else if (arg === '--max') options.maxEdge = Number(args[++i]);
  else if (arg === '--force') options.force = true;
  else if (arg === '--dry-run') options.dryRun = true;
  else if (arg.startsWith('--')) {
    console.error(`Opción desconocida: ${arg}`);
    process.exit(1);
  } else inputs.push(arg);
}

if (!Number.isFinite(options.budgetKb) || !Number.isFinite(options.maxEdge)) {
  console.error('--budget y --max deben ser números.');
  process.exit(1);
}

const budgetBytes = options.budgetKb * 1024;

// Normaliza nombres al estilo del repo: minúsculas, kebab-case, sin acentos.
function normalizeName(filename, ext) {
  const base = path.basename(filename, path.extname(filename));
  const slug = base
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${slug || 'imagen'}${ext}`;
}

function collectFiles(entry) {
  const full = path.resolve(entry);
  if (!fs.existsSync(full)) {
    console.error(`No existe: ${entry}`);
    process.exit(1);
  }
  if (fs.statSync(full).isDirectory()) {
    return fs
      .readdirSync(full)
      .filter((f) => VALID_INPUT.test(f))
      .map((f) => path.join(full, f));
  }
  if (!VALID_INPUT.test(full)) {
    console.error(`Formato no soportado: ${entry}`);
    process.exit(1);
  }
  return [full];
}

// Codifica una imagen buscando la calidad más alta que quepa en el presupuesto.
// Devuelve { buffer, quality, width, height } o null si ni el mínimo cupo.
async function encodeWithinBudget(pipelineFactory, targetEdge) {
  for (const quality of QUALITY_STEPS) {
    const { data, info } = await pipelineFactory(targetEdge)
      .jpeg({ quality, mozjpeg: true, progressive: true })
      .toBuffer({ resolveWithObject: true });
    if (data.length <= budgetBytes) {
      return { buffer: data, quality, width: info.width, height: info.height };
    }
  }
  return null;
}

async function optimizeFile(inputPath) {
  const originalBytes = fs.statSync(inputPath).size;
  const metadata = await sharp(inputPath).metadata();
  const hasAlpha = metadata.hasAlpha === true;
  const longEdge = Math.max(metadata.width ?? 0, metadata.height ?? 0);

  const ext = hasAlpha ? '.png' : '.jpg';
  const outPath = path.join(options.out, normalizeName(inputPath, ext));
  const inPlace = path.resolve(inputPath) === outPath;

  // Si ya cumple presupuesto y dimensiones, no recomprimir: cada re-encode
  // de un JPEG degrada un poco. Solo se fuerza con --force.
  if (inPlace && !options.force && originalBytes <= budgetBytes && longEdge <= options.maxEdge) {
    return { file: outPath, status: 'skip', originalBytes, finalBytes: originalBytes };
  }

  // rotate() sin argumentos hornea la orientación EXIF antes de descartar metadata.
  const pipelineFactory = (edge) =>
    sharp(inputPath)
      .rotate()
      .resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true })
      .toColourspace('srgb');

  let result = null;
  let finalPath = outPath;

  if (hasAlpha) {
    const { data, info } = await pipelineFactory(options.maxEdge)
      .png({ palette: true, compressionLevel: 9, effort: 10 })
      .toBuffer({ resolveWithObject: true });
    result = { buffer: data, quality: null, width: info.width, height: info.height };
  } else {
    // Escalera de dimensiones: si a calidad mínima no cabe, reducir el lado mayor.
    let edge = Math.min(options.maxEdge, longEdge);
    while (!result && edge >= MIN_EDGE) {
      result = await encodeWithinBudget(pipelineFactory, edge);
      if (!result) edge = Math.round(edge * 0.85);
    }
    if (!result) {
      // Mejor esfuerzo: mínimo absoluto, se reporta como FAIL pero se escribe.
      const { data, info } = await pipelineFactory(MIN_EDGE)
        .jpeg({ quality: QUALITY_STEPS.at(-1), mozjpeg: true, progressive: true })
        .toBuffer({ resolveWithObject: true });
      result = { buffer: data, quality: QUALITY_STEPS.at(-1), width: info.width, height: info.height };
    }
  }

  const overBudget = result.buffer.length > budgetBytes;
  // En reproceso in-place solo pisamos el archivo si de verdad ahorramos.
  if (inPlace && result.buffer.length >= originalBytes) {
    return { file: finalPath, status: 'skip', originalBytes, finalBytes: originalBytes };
  }

  if (!options.dryRun) {
    fs.mkdirSync(options.out, { recursive: true });
    fs.writeFileSync(finalPath, result.buffer);
  }

  return {
    file: finalPath,
    status: overBudget ? 'fail' : 'ok',
    originalBytes,
    finalBytes: result.buffer.length,
    quality: result.quality,
    width: result.width,
    height: result.height,
  };
}

const files = inputs.length > 0 ? inputs.flatMap(collectFiles) : collectFiles(options.out);

if (files.length === 0) {
  console.log('No hay imágenes que procesar.');
  process.exit(0);
}

console.log(`\nOptimización de imágenes → ${path.relative(process.cwd(), options.out) || '.'}`);
console.log(`Presupuesto: ${options.budgetKb} KB · lado mayor máx: ${options.maxEdge}px${options.dryRun ? ' · DRY RUN' : ''}`);
console.log('-'.repeat(72));

let failed = false;
for (const file of files) {
  try {
    const r = await optimizeFile(file);
    const name = path.basename(r.file);
    if (r.status === 'skip') {
      console.log(`SKIP  ${name.padEnd(32)} ${(r.originalBytes / 1024).toFixed(1)} KB (ya óptima)`);
      continue;
    }
    if (r.status === 'fail') failed = true;
    const saved = (((r.originalBytes - r.finalBytes) / r.originalBytes) * 100).toFixed(0);
    const detail = `${(r.originalBytes / 1024).toFixed(1)} KB → ${(r.finalBytes / 1024).toFixed(1)} KB (−${saved}%)` +
      ` ${r.width}x${r.height}${r.quality ? ` q${r.quality}` : ''}`;
    console.log(`${r.status.toUpperCase().padEnd(5)} ${name.padEnd(32)} ${detail}`);
  } catch (error) {
    failed = true;
    console.error(`ERROR ${path.basename(file)}: ${error.message}`);
  }
}

if (failed) {
  console.error(`\nAlguna imagen no pudo quedar bajo ${options.budgetKb} KB ni reduciendo a ${MIN_EDGE}px.`);
  process.exit(1);
}
