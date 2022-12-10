import { Motion, Rope, solve1, solve2 } from './day9.js';

const EXAMPLE_INPUT_1 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const EXAMPLE_INPUT_2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

describe('day9', () => {
  describe(Rope.name, () => {
    it('moves horizontally', () => {
      const rope = new Rope(2);

      rope.move(Motion.fromString('R 1'));

      expect(rope.head).toEqual([1, 0]);
      expect(rope.tail).toEqual([0, 0]);

      rope.move(Motion.fromString('R 1'));

      expect(rope.head).toEqual([2, 0]);
      expect(rope.tail).toEqual([1, 0]);

      rope.move(Motion.fromString('L 4'));

      expect(rope.head).toEqual([-2, 0]);
      expect(rope.tail).toEqual([-1, 0]);
    });

    it('moves vertically', () => {
      const rope = new Rope(2);

      rope.move(Motion.fromString('D 1'));

      expect(rope.head).toEqual([0, -1]);
      expect(rope.tail).toEqual([0, 0]);

      rope.move(Motion.fromString('D 1'));

      expect(rope.head).toEqual([0, -2]);
      expect(rope.tail).toEqual([0, -1]);

      rope.move(Motion.fromString('U 4'));

      expect(rope.head).toEqual([0, 2]);
      expect(rope.tail).toEqual([0, 1]);
    });

    it('moves the tail diagonally', () => {
      // possible diagonal moves: UR UL DR DL
      const rope = new Rope(2);

      rope.move(Motion.fromString('R 2'));
      rope.move(Motion.fromString('U 1'));

      // grid:
      // .....
      // ..H..
      // sT...

      expect(rope.head).toEqual([2, 1]);
      expect(rope.tail).toEqual([1, 0]);

      // UR
      rope.move(Motion.fromString('U 1'));

      // grid:
      // ..H..
      // ..T..
      // s....

      expect(rope.head).toEqual([2, 2]);
      expect(rope.tail).toEqual([2, 1]);

      rope.move(Motion.fromString('R 1'));
      rope.move(Motion.fromString('D 2'));

      // grid:
      // .....
      // ..T..
      // s..H.

      // DR
      rope.move(Motion.fromString('D 1'));

      // grid:
      // .....
      // .....
      // s..T.
      // ...H.

      expect(rope.head).toEqual([3, -1]);
      expect(rope.tail).toEqual([3, 0]);

      rope.move(Motion.fromString('L 1'));
      rope.move(Motion.fromString('U 2'));

      // grid:
      // .....
      // ..H..
      // s..T.
      // .....

      // UL
      rope.move(Motion.fromString('U 1'));

      // grid:
      // ..H..
      // ..T..
      // s....

      expect(rope.head).toEqual([2, 2]);
      expect(rope.tail).toEqual([2, 1]);

      rope.move(Motion.fromString('L 1'));
      rope.move(Motion.fromString('D 2'));

      // grid:
      // .....
      // ..T..
      // sH...

      expect(rope.head).toEqual([1, 0]);
      expect(rope.tail).toEqual([2, 1]);

      // DL
      rope.move(Motion.fromString('D 1'));

      // grid:
      // .....
      // .....
      // sT...
      // .H...

      expect(rope.head).toEqual([1, -1]);
      expect(rope.tail).toEqual([1, 0]);

      rope.move(Motion.fromString('R 2'));
      expect(rope.head).toEqual([3, -1]);
      expect(rope.tail).toEqual([2, -1]);

      // grid:
      // .....
      // .....
      // s....
      // ..TH.

      rope.move(Motion.fromString('U 1'));
      rope.move(Motion.fromString('L 3'));
      expect(rope.head).toEqual([0, 0]);
      expect(rope.tail).toEqual([1, 0]);

      // grid:
      // .....
      // .....
      // HT...
      // .....
    });

    it('support large motions', () => {
      const rope = new Rope(2);
      rope.move(Motion.fromString('R 9999'));

      expect(rope.head).toEqual([9999, 0]);
      expect(rope.tail).toEqual([9998, 0]);
    });
  });

  describe('solve1', () => {
    it('solves the example', async () => {
      expect(solve1(EXAMPLE_INPUT_1)).toBe(13);
    });
  });

  describe('solve2', () => {
    it('solves the example', () => {
      expect(solve2(EXAMPLE_INPUT_1)).toBe(1);
      expect(solve2(EXAMPLE_INPUT_2)).toBe(36);
    });
  });
});
