import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { solve1, solve2 } from './day8.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input = await readFile(path.resolve(__dirname, 'input.txt'), {
  encoding: 'utf-8',
});

console.log('part 1:', solve1(input));
console.log('part 2:', solve2(input));
