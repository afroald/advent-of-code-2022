import { Position, Rope } from './day9.js';
import { Range } from './range.js';

export function printGrid(
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
    const position = rope.knots[knot][0];
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
