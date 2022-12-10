import { $enum } from 'ts-enum-util';
import { Range } from './range.js';

function compare(a: number, b: number) {
  const delta = a - b;

  if (delta > 0) {
    return 1;
  } else if (delta === 0) {
    return 0;
  } else {
    return -1;
  }
}

enum Direction {
  Up = 'U',
  Down = 'D',
  Left = 'L',
  Right = 'R',
}

export class Motion {
  constructor(readonly direction: Direction, readonly steps: number) {}

  static fromString(input: string) {
    return new Motion(
      $enum(Direction).asValueOrThrow(input.substring(0, 1)),
      parseInt(input.substring(2)),
    );
  }
}

const parseInput = (input: string): Motion[] =>
  input
    .trim()
    .split('\n')
    .map((line) => Motion.fromString(line));

export type Position = [number, number];

export class Rope {
  readonly knots: Position[][] = [];

  constructor(knots: number) {
    for (const _ of new Range(0, knots)) {
      this.knots.push([[0, 0]]);
    }
  }

  get head() {
    return this.knots[0][0];
  }

  set head(position: Position) {
    this.knots[0].unshift(position);
  }

  get tail() {
    return this.knots[this.knots.length - 1][0];
  }

  move(motion: Motion) {
    for (const _ of new Range(0, motion.steps)) {
      switch (motion.direction) {
        case Direction.Up:
          this.head = [this.head[0], this.head[1] + 1];
          break;
        case Direction.Down:
          this.head = [this.head[0], this.head[1] - 1];
          break;
        case Direction.Right:
          this.head = [this.head[0] + 1, this.head[1]];
          break;
        case Direction.Left:
          this.head = [this.head[0] - 1, this.head[1]];
          break;
      }

      for (const knot of new Range(1, this.knots.length)) {
        const deltaX = this.knots[knot - 1][0][0] - this.knots[knot][0][0];
        const deltaY = this.knots[knot - 1][0][1] - this.knots[knot][0][1];

        if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 2) {
          continue;
        }

        this.knots[knot].unshift([
          this.knots[knot][0][0] + compare(deltaX, 0),
          this.knots[knot][0][1] + compare(deltaY, 0),
        ]);
      }
    }
  }
}

export function solve1(input: string): number {
  const motions = parseInput(input);
  const rope = new Rope(2);

  for (const motion of motions) {
    rope.move(motion);
  }

  const uniqueTailPositions = new Set(
    rope.knots[1].map(([x, y]) => `${x},${y}`),
  );

  return uniqueTailPositions.size;
}

export function solve2(input: string): number {
  const motions = parseInput(input);
  const rope = new Rope(10);

  for (const motion of motions) {
    rope.move(motion);
  }

  const uniqueTailPositions = new Set(
    rope.knots[9].map(([x, y]) => `${x},${y}`),
  );

  return uniqueTailPositions.size;
}
