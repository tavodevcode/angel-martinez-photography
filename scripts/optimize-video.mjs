// Optimiza un video para el hero: recorta un loop corto y lo codifica en dos
// variantes ligeras (WebM VP9 + MP4 H.264) dentro de public/videos/. El sitio
// sirve WebM por compresión y cae a MP4 como respaldo universal.
//
// Pensado para metraje pesado (un reel de varios minutos) del que solo se quiere
// un loop atmosférico de fondo. NUNCA subas el original pesado al repo: pásalo por
// aquí y commitea solo las variantes ligeras.
//
// Requiere ffmpeg en el PATH (macOS: `brew install ffmpeg`).
//
// Uso:
//   pnpm optimize:video fuente.mp4                 # loop de 12s desde el segundo 0
//   pnpm optimize:video fuente.mp4 --start 140 --duration 12
//
// Opciones:
//   --start <seg>     segundo donde empieza el recorte (default: 0)
//   --duration <seg>  duración del loop en segundos (default: 12)
//   --width <px>      ancho de salida; la altura se ajusta sola (default: 1280)
//   --out <dir>       carpeta de salida (default: public/videos)
//   --name <base>     nombre base de los archivos, sin extensión (default: hero)
//   --crf <n>         calidad H.264 (menor = mejor/pesado, default: 30)
//   --dry-run         muestra los comandos sin ejecutarlos

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const options = {
  start: 0,
  duration: 12,
  width: 1280,
  out: path.resolve('public/videos'),
  name: 'hero',
  crf: 30,
  dryRun: false,
};
let input = null;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--start') options.start = Number(args[++i]);
  else if (arg === '--duration') options.duration = Number(args[++i]);
  else if (arg === '--width') options.width = Number(args[++i]);
  else if (arg === '--out') options.out = path.resolve(args[++i]);
  else if (arg === '--name') options.name = args[++i];
  else if (arg === '--crf') options.crf = Number(args[++i]);
  else if (arg === '--dry-run') options.dryRun = true;
  else if (arg.startsWith('--')) {
    console.error(`Opción desconocida: ${arg}`);
    process.exit(1);
  } else if (!input) input = path.resolve(arg);
}

if (!input) {
  console.error('Falta el video de entrada. Uso: pnpm optimize:video fuente.mp4 [--start 140 --duration 12]');
  process.exit(1);
}
if (!fs.existsSync(input)) {
  console.error(`No existe: ${input}`);
  process.exit(1);
}
for (const [key, value] of Object.entries({ start: options.start, duration: options.duration, width: options.width, crf: options.crf })) {
  if (!Number.isFinite(value) || value < 0) {
    console.error(`--${key} debe ser un número válido.`);
    process.exit(1);
  }
}

// Verifica que ffmpeg exista antes de intentar codificar.
try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
} catch {
  console.error('No se encontró ffmpeg en el PATH. En macOS: brew install ffmpeg');
  process.exit(1);
}

fs.mkdirSync(options.out, { recursive: true });
const mp4Out = path.join(options.out, `${options.name}.mp4`);
const webmOut = path.join(options.out, `${options.name}.webm`);
// `scale=W:-2` mantiene proporción y fuerza altura par (requisito de yuv420p).
const scale = `scale=${options.width}:-2`;
const seek = ['-ss', String(options.start), '-t', String(options.duration)];

// -an: el hero va silenciado (autoplay), así que se descarta el audio.
const mp4Args = [
  '-y', '-hide_banner', '-loglevel', 'error',
  ...seek, '-i', input, '-an', '-vf', scale,
  '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
  '-crf', String(options.crf), '-preset', 'slow', '-movflags', '+faststart',
  mp4Out,
];
const webmArgs = [
  '-y', '-hide_banner', '-loglevel', 'error',
  ...seek, '-i', input, '-an', '-vf', scale,
  '-c:v', 'libvpx-vp9', '-crf', String(options.crf + 4), '-b:v', '0',
  '-row-mt', '1', '-pix_fmt', 'yuv420p',
  webmOut,
];

console.log(`\nOptimización de video → ${path.relative(process.cwd(), options.out) || '.'}`);
console.log(`Fuente: ${path.relative(process.cwd(), input)} · recorte ${options.start}s +${options.duration}s · ancho ${options.width}px${options.dryRun ? ' · DRY RUN' : ''}`);
console.log('-'.repeat(72));

if (options.dryRun) {
  console.log(`ffmpeg ${mp4Args.join(' ')}`);
  console.log(`ffmpeg ${webmArgs.join(' ')}`);
  process.exit(0);
}

const kb = (p) => (fs.statSync(p).size / 1024).toFixed(1);
try {
  execFileSync('ffmpeg', mp4Args, { stdio: 'inherit' });
  console.log(`OK    ${path.basename(mp4Out).padEnd(16)} ${kb(mp4Out)} KB`);
  execFileSync('ffmpeg', webmArgs, { stdio: 'inherit' });
  console.log(`OK    ${path.basename(webmOut).padEnd(16)} ${kb(webmOut)} KB`);
} catch (error) {
  console.error(`\nffmpeg falló: ${error.message}`);
  process.exit(1);
}

console.log('\nListo. Verifica el loop en el navegador; ajusta --start/--duration si corta en mal momento.');
