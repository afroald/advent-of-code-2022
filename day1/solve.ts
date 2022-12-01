import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input = await readFile(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' });

function sum(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}

const values = input
  .trim()
  .split('\n\n')
  .map(elf => elf.split('\n').map(value => parseInt(value, 10)))
  .map(sum)
  .sort((a, b) => a - b)
  .reverse();

console.log('part 1', values[0]);
console.log('part 2', sum(values.slice(0, 3)));
