function sum(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}

export function solve(input: string): [number, number] {
  const values = input
    .trim()
    .split('\n\n')
    .map((elf) => elf.split('\n').map((value) => parseInt(value, 10)))
    .map(sum)
    .sort((a, b) => a - b)
    .reverse();

  return [values[0], sum(values.slice(0, 3))];
}
