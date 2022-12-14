import { checkOrder, solve1, solve2 } from './day13.js';

const EXAMPLE_INPUT = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`;

describe('day13', () => {
  describe('checkOrder', () => {
    it('compares integers', () => {
      expect(checkOrder([1], [2])).toBe(true);
      expect(checkOrder([2], [1])).toBe(false);
    });

    it('compares lists', () => {
      expect(checkOrder([[1, 2]], [[2, 3]])).toBe(true);
      expect(checkOrder([[2, 2]], [[1, 3]])).toBe(false);
      expect(checkOrder([[2, 2]], [[2, 2, 2]])).toBe(true);
      expect(checkOrder([[2, 2, 2]], [[2, 2]])).toBe(false);
    });

    it('compares lists with integers', () => {
      expect(checkOrder([[1]], [2])).toBe(true);
      expect(checkOrder([[1, 1]], [1])).toBe(false);
    });

    it('compares the examples', () => {
      expect(checkOrder([1, 1, 3, 1, 1], [1, 1, 5, 1, 1])).toBe(true);
      expect(checkOrder([[1], [2, 3, 4]], [[1], 4])).toBe(true);
      expect(checkOrder([9], [[8, 7, 6]])).toBe(false);
      expect(checkOrder([[4, 4], 4, 4], [[4, 4], 4, 4, 4])).toBe(true);
      expect(checkOrder([7, 7, 7, 7], [7, 7, 7])).toBe(false);
      expect(checkOrder([], [3])).toBe(true);
      expect(checkOrder([[[]]], [[]])).toBe(false);
      expect(
        checkOrder(
          [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
          [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
        ),
      ).toBe(false);
    });
  });

  describe('solve1', () => {
    it('solves the example', () => {
      expect(solve1(EXAMPLE_INPUT)).toBe(13);
    });
  });

  describe('solve2', () => {
    it('solves the example', () => {
      expect(solve2(EXAMPLE_INPUT)).toBe(140);
    });
  });
});
