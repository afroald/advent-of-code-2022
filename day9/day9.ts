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

  *reverse() {
    for (let i = this.end - 1; i >= this.start; i--) {
      yield i;
    }
  }
}

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
      this.step(motion.direction);
    }
  }

  step(direction: Direction) {
    switch (direction) {
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

      const deltaX = precedingKnotPosition[0] - knotPosition[0];
      const deltaY = precedingKnotPosition[1] - knotPosition[1];

      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 2) {
        continue;
      }

      this.setKnotPosition(knot, [
        knotPosition[0] + compare(deltaX, 0),
        knotPosition[1] + compare(deltaY, 0),
      ]);
    }
  }

  getKnotPosition(knot: number, historyIndex = 0): Position {
    const positions = this.knots[knot];
    return positions[positions.length - (1 + historyIndex * -1)];
  }

  setKnotPosition(knot: number, position: Position) {
    this.knots[knot].push(position);
  }
}

const parseMotions = (input: string): Motion[] =>
  input
    .trim()
    .split('\n')
    .map((line) => Motion.fromString(line));

function printGrid(
  width: number,
  height: number,
  center: Position,
  rope: Rope,
) {
  const lines: string[][] = [];

  for (const _ of new Range(0, height)) {
    const line = new Array(width);
    line.fill('.');
    lines.push(line);
  }

  lines[center[1]][center[0]] = 's';

  for (const knot of new Range(1, rope.knots.length).reverse()) {
    const position = rope.getKnotPosition(knot);
    lines[position[1] + center[1]][position[0] + center[0]] = knot.toString();
  }

  lines[rope.head[1] + center[1]][rope.head[0] + center[0]] = 'H';

  console.log(
    lines
      .reverse()
      .map((line) => line.join(''))
      .join('\n'),
  );
}

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

  // printGrid(26, 26, [10, 10], rope);

  for (const motion of motions) {
    rope.move(motion);
    // printGrid(26, 26, [10, 10], rope);
  }

  const uniqueTailPositions = new Set(
    rope.knots[9].map(([x, y]) => `${x},${y}`),
  );

  return uniqueTailPositions.size;
}
