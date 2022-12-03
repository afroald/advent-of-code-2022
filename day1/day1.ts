import sum from 'lodash.sum';

export function solve(input: string): [number, number] {
  const values = input
    .trim()
    .split('\n\n')
    .map((elf) => elf.split('\n').map((value) => parseInt(value, 10)))
    .map(sum)
    .sort((a, b) => b - a);

  return [values[0], sum(values.slice(0, 3))];
}
