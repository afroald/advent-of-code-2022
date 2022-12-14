import { solve1, solve2 } from './day12.js';

const EXAMPLE_INPUT = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe('day12', () => {
  describe('solve1', () => {
    it('solves the example', () => {
      expect(solve1(EXAMPLE_INPUT)).toBe(31);
    });
  });
  describe('solve2', () => {
    it('solves the example', () => {
      expect(solve2(EXAMPLE_INPUT)).toBe(29);
    });
  });
});
