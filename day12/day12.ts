import { Range } from '../day09/range.js';

function parseInput(input: string): [string[][], Vertex, Vertex] {
  const grid: string[][] = input
    .trim()
    .split('\n')
    .map((line) => Array.from(line));

  let start: Vertex = new Vertex(0, 0);
  let end: Vertex = new Vertex(0, 0);

  for (const row of new Range(0, grid.length)) {
    for (const column of new Range(0, grid[0].length)) {
      switch (grid[row][column]) {
        case 'S':
          start = new Vertex(row, column);
          grid[row][column] = 'a';
          break;
        case 'E':
          end = new Vertex(row, column);
          grid[row][column] = 'z';
          break;
      }
    }
  }

  return [grid, start, end];
}

class Vertex {
  constructor(readonly row: number, readonly column: number) {}

  equals(other: Vertex): boolean {
    return this.row === other.row && this.column === other.column;
  }

  add(other: Vertex): Vertex {
    return new Vertex(this.row + other.row, this.column + other.column);
  }

  toString(): string {
    return `${this.row},${this.column}`;
  }
}

function findPaths(grid: string[][], start: Vertex[]) {
  const queue: [Vertex, number][] = start.map((vertex) => [vertex, 0]);
  const paths = new Map(start.map((vertex) => [vertex.toString(), 0]));

  while (queue.length > 0) {
    const [vertex, steps] = queue.shift() as [Vertex, number];
    const height = grid[vertex.row][vertex.column].charCodeAt(0);

    for (const direction of [
      new Vertex(1, 0),
      new Vertex(-1, 0),
      new Vertex(0, 1),
      new Vertex(0, -1),
    ]) {
      const vertexToCheck = vertex.add(direction);

      if (
        vertexToCheck.row < 0 ||
        vertexToCheck.row >= grid.length ||
        vertexToCheck.column < 0 ||
        vertexToCheck.column >= grid[0].length
      ) {
        continue;
      }

      const heightToCheck =
        grid[vertexToCheck.row][vertexToCheck.column].charCodeAt(0);

      if (heightToCheck > height + 1) {
        continue;
      }

      if ((paths.get(vertexToCheck.toString()) ?? Infinity) > steps + 1) {
        paths.set(vertexToCheck.toString(), steps + 1);
        queue.push([vertexToCheck, steps + 1]);
      }
    }
  }

  return paths;
}

export function solve1(input: string): number {
  const [grid, start, end] = parseInput(input);
  const paths = findPaths(grid, [start]);

  return paths.get(end.toString()) ?? 0;
}

export function solve2(input: string): number {
  const [grid, , end] = parseInput(input);
  const startPositions: Vertex[] = [];

  for (const row of new Range(0, grid.length)) {
    for (const column of new Range(0, grid[0].length)) {
      if (grid[row][column] === 'a') {
        startPositions.push(new Vertex(row, column));
      }
    }
  }

  const paths = findPaths(grid, startPositions);

  return paths.get(end.toString()) ?? 0;
}
