import { solve } from './day1.js';

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input = await readFile(path.resolve(__dirname, 'input.txt'), {
  encoding: 'utf-8',
});

const [part1, part2] = solve(input);

console.log('part1:', part1);
console.log('part2:', part2);
