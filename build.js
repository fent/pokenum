import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

const pngSize = (file) => {
  const buffer = readFileSync(file);
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
};

const numbers = [
  ...Array.from({ length: 10 }, (_, i) => String(i)),
  ...Array.from({ length: 100 }, (_, i) => String(i).padStart(2, '0')),
];
const expected = new Set(numbers);

const data = JSON.parse(readFileSync(join(root, 'pokemon.json'), 'utf8'));
const errors = [];

for (const number of numbers) {
  const entry = data[number];

  if (!entry) {
    errors.push(`missing entry for "${number}"`);
    continue;
  }
  if (!entry.name) errors.push(`"${number}" has no name`);
  if (number.length === 2) {
    if (!Number.isInteger(entry.week) || entry.week < 0 || entry.week > 6) {
      errors.push(`"${number}" has an invalid weekday: ${entry.week}`);
    } else {
      // Pair cards encode O'Brien's Human Calendar year code for 1900 + NN,
      // equivalent to the weekday of March 4 in that year.
      const expected = new Date(Date.UTC(1900 + Number(number), 2, 4)).getUTCDay();
      if (entry.week !== expected) {
        errors.push(
          `"${number}" has weekday ${entry.week}, expected ${expected} (March 4, ${1900 + Number(number)})`,
        );
      }
    }
    if (!entry.move) {
      errors.push(`"${number}" has no move`);
    }
  }
  if (!existsSync(join(root, 'img', `${number}.png`))) {
    errors.push(`missing image: img/${number}.png`);
  }
}

for (const number of Object.keys(data)) {
  if (!expected.has(number)) errors.push(`unexpected entry: "${number}"`);
}

if (errors.length > 0) {
  console.error('Data validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const cards = numbers
  .map((number) => {
    const { name, move, week } = data[number];
    const cardClass = number.length === 2 ? `card week-${week}` : 'card card--single';
    const size = pngSize(join(root, 'img', `${number}.png`));
    const moveHtml = move
      ? `\n        <span class="move">${escapeHtml(move)}</span>`
      : number.length === 1
        ? `\n        <span class="move" aria-hidden="true">&nbsp;</span>`
        : '';

    return `      <li class="${cardClass}">
        <span class="number">${number}</span>
        <span class="art"><img src="img/${number}.png" alt="" width="${size.width}" height="${size.height}" loading="lazy" decoding="async"></span>
        <span class="name">${escapeHtml(name)}</span>${moveHtml}
      </li>`;
  })
  .join('\n');

const template = readFileSync(join(root, 'template.html'), 'utf8');
const output = template.replace('<!-- CARDS -->', cards);

writeFileSync(join(root, 'index.html'), output);
console.log(`Built index.html (${numbers.length} cards).`);
