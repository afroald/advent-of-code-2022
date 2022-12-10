import { solve1 } from './day6.js';

const EXAMPLE_INPUT: [string, number][] = [
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 7],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
  ['nppdvjthqldpwncqszvftbrmjlhg', 6],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
];

describe('day6', () => {
  describe('solve1', () => {
    it('solves the examples', () => {
      for (const [input, answer] of EXAMPLE_INPUT) {
        expect(solve1(input)).toBe(answer);
      }
    });
  });
});
