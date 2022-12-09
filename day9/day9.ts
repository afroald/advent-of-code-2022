import { $enum } from 'ts-enum-util';

export class Range {
  constructor(readonly start: number, readonly end: number) {}

  get length() {
    return this.end - this.start;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i < this.end; i++) {
      yield i;
    }
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
    const direction = $enum(Direction).asValueOrThrow(input.substring(0, 1));
    const steps = parseInt(input.substring(2));

    if (isNaN(steps)) {
      throw new Error('Invalid input');
    }

    return new Motion(direction, steps);
  }
}

type Position = [number, number];

function distance(a: Position, b: Position): number {
  return Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]));
}

export class Rope {
  readonly knots: Position[][] = [];

  constructor(knots: number) {
    for (const _ of new Range(0, knots)) {
      this.knots.push([[0, 0]]);
    }
  }

  get head() {
    return this.getKnotPosition(0);
  }

  set head(position: Position) {
    this.setKnotPosition(0, position);
  }

  get tail() {
    return this.getKnotPosition(this.knots.length - 1);
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
        const knotPosition = this.getKnotPosition(knot);
        const precedingKnotPosition = this.getKnotPosition(knot - 1);

        if (distance(knotPosition, precedingKnotPosition) < 2) {
          continue;
        }

        this.setKnotPosition(knot, this.getKnotPosition(knot - 1, -1));
      }
    }
  }

  private getKnotPosition(knot: number, historyIndex = 0): Position {
    const positions = this.knots[knot];
    return positions[positions.length - (1 + historyIndex * -1)];
  }

  private setKnotPosition(knot: number, position: Position) {
    this.knots[knot].push(position);
  }
}

const parseMotions = (input: string): Motion[] =>
  input
    .trim()
    .split('\n')
    .map((line) => Motion.fromString(line));

export function solve1(input: string): number {
  const motions = parseMotions(input);
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
  const motions = parseMotions(input);
  const rope = new Rope(10);

  for (const motion of motions) {
    rope.move(motion);
  }

  const uniqueTailPositions = new Set(
    rope.knots[9].map(([x, y]) => `${x},${y}`),
  );

  return uniqueTailPositions.size;
}
