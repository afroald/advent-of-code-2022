import { Range } from './range.js';

export const solve1 = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(','))
    .map(([a, b]) => [Range.fromString(a), Range.fromString(b)])
    .filter(([a, b]) => a.contains(b) || b.contains(a));

export const solve2 = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(','))
    .map(([a, b]) => [Range.fromString(a), Range.fromString(b)])
    .filter(([a, b]) => a.overlaps(b));
