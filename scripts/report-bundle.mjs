import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

function format(bytes) {
  const units = ['B', 'KB', 'MB'];
  let size = bytes;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i += 1;
  }
  return `${size.toFixed(2)} ${units[i]}`;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

const files = walk(distDir);
let total = 0;
const grouped = { js: 0, css: 0, html: 0, images: 0, other: 0 };

for (const file of files) {
  const size = fs.statSync(file).size;
  total += size;
  const ext = path.extname(file).toLowerCase();
  if (ext === '.js') grouped.js += size;
  else if (ext === '.css') grouped.css += size;
  else if (ext === '.html') grouped.html += size;
  else if (['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'].includes(ext)) grouped.images += size;
  else grouped.other += size;
}

console.log('\nBundle Report');
console.log('------------');
console.log(`Total: ${format(total)}`);
for (const [key, value] of Object.entries(grouped)) {
  console.log(`${key.padEnd(6)} ${format(value)}`);
}
