import {
  getScenicScore,
  isVisible,
  parseInput,
  solve1,
  solve2,
} from './day8.js';

const EXAMPLE_INPUT = `
30373
25512
65332
33549
35390`;

describe('day8', () => {
  describe('isVisible', () => {
    it('solves stuff', () => {
      const grid = parseInput(EXAMPLE_INPUT);
      expect(isVisible(grid, [1, 1])).toEqual([
        true,
        {
          isVisibleFromAbove: true,
          isVisibleFromBelow: false,
          isVisibleFromLeft: true,
          isVisibleFromRight: false,
        },
      ]);
      expect(isVisible(grid, [2, 1])).toEqual([
        true,
        {
          isVisibleFromAbove: true,
          isVisibleFromBelow: false,
          isVisibleFromLeft: false,
          isVisibleFromRight: true,
        },
      ]);
      expect(isVisible(grid, [3, 1])).toEqual([
        false,
        {
          isVisibleFromAbove: false,
          isVisibleFromBelow: false,
          isVisibleFromLeft: false,
          isVisibleFromRight: false,
        },
      ]);
      expect(isVisible(grid, [1, 2])).toEqual([
        true,
        {
          isVisibleFromAbove: false,
          isVisibleFromBelow: false,
          isVisibleFromLeft: false,
          isVisibleFromRight: true,
        },
      ]);
      expect(isVisible(grid, [2, 2])).toEqual([
        false,
        {
          isVisibleFromAbove: false,
          isVisibleFromBelow: false,
          isVisibleFromLeft: false,
          isVisibleFromRight: false,
        },
      ]);
      expect(isVisible(grid, [3, 2])).toEqual([
        true,
        {
          isVisibleFromAbove: false,
          isVisibleFromBelow: false,
          isVisibleFromLeft: false,
          isVisibleFromRight: true,
        },
      ]);
      expect(isVisible(grid, [1, 3])).toEqual([
        false,
        {
          isVisibleFromAbove: false,
          isVisibleFromBelow: false,
          isVisibleFromLeft: false,
          isVisibleFromRight: false,
        },
      ]);
      expect(isVisible(grid, [2, 3])).toEqual([
        true,
        {
          isVisibleFromAbove: false,
          isVisibleFromBelow: true,
          isVisibleFromLeft: true,
          isVisibleFromRight: false,
        },
      ]);
      expect(isVisible(grid, [3, 3])).toEqual([
        false,
        {
          isVisibleFromAbove: false,
          isVisibleFromBelow: false,
          isVisibleFromLeft: false,
          isVisibleFromRight: false,
        },
      ]);
    });
  });

  describe('getScenicScore', () => {
    it('pls work', () => {
      const grid = parseInput(EXAMPLE_INPUT);
      expect(getScenicScore(grid, [2, 1])).toBe(4);
      expect(getScenicScore(grid, [2, 3])).toBe(8);
    });
  });

  describe('solve1', () => {
    it('solves the example', () => {
      expect(solve1(EXAMPLE_INPUT)).toBe(21);
    });
  });

  describe('solve2', () => {
    it('solves the example', () => {
      expect(solve2(EXAMPLE_INPUT)).toBe(8);
    });
  });
});
