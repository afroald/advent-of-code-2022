import { solve } from './day1.js';

const EXAMPLE_INPUT = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe('day 1', () => {
  describe('solve', () => {
    it('solves the example', () => {
      const [part1, part2] = solve(EXAMPLE_INPUT);
      expect(part1).toBe(24000);
      expect(part2).toBe(45000);
    });
  });
});
