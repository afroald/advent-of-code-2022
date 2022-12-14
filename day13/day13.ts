import chunk from 'lodash.chunk';
import { Range } from '../day09/range.js';

type Packet = (number | Packet)[];

const parseInput = (input: string): Packet[] =>
  input
    .trim()
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => JSON.parse(line) as Packet);

export function checkOrder(a: Packet | number, b: Packet | number): boolean {
  const aa = Array.isArray(a) ? a : [a];
  const bb = Array.isArray(b) ? b : [b];

  for (const i of new Range(0, aa.length)) {
    if (bb[i] === undefined) {
      break;
    }

    if (typeof aa[i] === 'number' && typeof bb[i] === 'number') {
      if (aa[i] === bb[i]) {
        continue;
      }
      return aa[i] < bb[i];
    }

    return checkOrder(aa[i], bb[i]);
  }

  return aa.length < bb.length;
}

export function solve1(input: string): number {
  return chunk(parseInput(input), 2)
    .map(([a, b]) => checkOrder(a, b))
    .reduce((sum, isOrdered, index) => (isOrdered ? sum + index + 1 : sum), 0);
}

export function solve2(input: string): number {
  const packets = [[[2]], [[6]], ...parseInput(input)].sort((a, b) =>
    checkOrder(a, b) ? -1 : 1,
  );

  return (
    (packets.findIndex((packet) => JSON.stringify(packet) === '[[2]]') + 1) *
    (packets.findIndex((packet) => JSON.stringify(packet) === '[[6]]') + 1)
  );
}
