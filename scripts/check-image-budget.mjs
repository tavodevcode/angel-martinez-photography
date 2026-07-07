import fs from 'node:fs';
import path from 'node:path';

const imagesDir = path.resolve('src/assets/images');
const maxBytes = 220 * 1024;

if (!fs.existsSync(imagesDir)) {
  console.error('src/assets/images not found');
  process.exit(1);
}

const files = fs.readdirSync(imagesDir).filter((file) => /\.(jpg|jpeg|png|webp|avif)$/i.test(file));
let hasViolation = false;

console.log('\nImage Budget Report');
console.log('-------------------');

for (const file of files) {
  const full = path.join(imagesDir, file);
  const size = fs.statSync(full).size;
  const kb = (size / 1024).toFixed(1);
  const status = size > maxBytes ? 'FAIL' : 'OK';
  if (size > maxBytes) hasViolation = true;
  console.log(`${status.padEnd(5)} ${file.padEnd(24)} ${kb} KB`);
}

if (hasViolation) {
  console.error(`\nAt least one image is above ${(maxBytes / 1024).toFixed(0)} KB.`);
  process.exit(1);
}
