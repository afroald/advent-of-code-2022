import { solve1, solve2 } from './day5.js';

const EXAMPLE_INPUT = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

describe('day5', () => {
  describe('solve1', () => {
    it('solves the example', () => {
      expect(solve1(EXAMPLE_INPUT)).toBe('CMZ');
    });
  });

  describe('solve2', () => {
    it('solves the example', () => {
      expect(solve2(EXAMPLE_INPUT)).toBe('MCD');
    });
  });
});
