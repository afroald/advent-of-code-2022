import { solve1, solve2 } from './day2.js';

const EXAMPLE_INPUT = `
A Y
B X
C Z
`;

describe('day2', () => {
  describe('solve1', () => {
    it('solves the example', () => {
      const score = solve1(EXAMPLE_INPUT);
      expect(score).toBe(15);
    });
  });

  describe('solve2', () => {
    it('solves the example', () => {
      const score = solve2(EXAMPLE_INPUT);
      expect(score).toBe(12);
    });
  });
});
