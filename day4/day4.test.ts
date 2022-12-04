import { solve1, solve2 } from './day4.js';

const EXAMPLE_INPUT = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

describe('day 4', () => {
  describe('solve1', () => {
    it('solves the example input', () => {
      const result = solve1(EXAMPLE_INPUT);
      expect(result.length).toBe(2);
    });
  });

  describe('solve2', () => {
    it('solves the example input', () => {
      const result = solve2(EXAMPLE_INPUT);
      expect(result.length).toBe(4);
    });
  });
});
