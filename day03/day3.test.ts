import { solve1, solve2 } from './day3.js';

const EXAMPLE_INPUT = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

describe('day3', () => {
  describe('solve1', () => {
    it('solves the example', () => {
      expect(solve1(EXAMPLE_INPUT)).toBe(157);
    });
  });

  describe('solve2', () => {
    it('solves the example', () => {
      expect(solve2(EXAMPLE_INPUT)).toBe(70);
    });
  });
});
