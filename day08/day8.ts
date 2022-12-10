export const parseInput = (input: string): number[][] => {
  const rows = input
    .trim()
    .split('\n')
    .map((line) => Array.from(line).map((value) => parseInt(value)));

  const grid: number[][] = [];

  rows.forEach((row) => {
    row.forEach((value, x) => {
      const column = grid[x] ?? (grid[x] = []);
      column.push(value);
    });
  });

  return grid;
};

const getColumn = (grid: number[][], index: number): number[] => grid[index];
const getRow = (grid: number[][], index: number): number[] =>
  grid.map((row) => row[index]);

export function isVisible(grid: number[][], tree: [number, number]) {
  const column = getColumn(grid, tree[0]);
  const isVisibleFromAbove = column
    .slice(0, tree[1])
    .every((value) => value < column[tree[1]]);
  const isVisibleFromBelow = column
    .slice(tree[1] + 1)
    .every((value) => value < column[tree[1]]);

  const row = getRow(grid, tree[1]);
  const isVisibleFromLeft = row
    .slice(0, tree[0])
    .every((value) => value < row[tree[0]]);
  const isVisibleFromRight = row
    .slice(tree[0] + 1)
    .every((value) => value < row[tree[0]]);

  return [
    isVisibleFromAbove ||
      isVisibleFromBelow ||
      isVisibleFromLeft ||
      isVisibleFromRight,
    {
      isVisibleFromAbove,
      isVisibleFromBelow,
      isVisibleFromLeft,
      isVisibleFromRight,
    },
  ];
}

export function getScenicScore(grid: number[][], tree: [number, number]) {
  const treeHeight = grid[tree[0]][tree[1]];

  const column = getColumn(grid, tree[0]);
  const row = getRow(grid, tree[1]);

  const calculateScoreForSlice = (slice: number[]) => {
    const index = slice.findIndex((value) => value >= treeHeight);
    return index < 0 ? slice.length : index + 1;
  };
  const scores = [
    calculateScoreForSlice(column.slice(0, tree[1]).reverse()), // looking up
    calculateScoreForSlice(column.slice(tree[1] + 1)), // looking down
    calculateScoreForSlice(row.slice(0, tree[0]).reverse()), // looking left
    calculateScoreForSlice(row.slice(tree[0] + 1)), // looking right
  ];

  return scores.reduce((total, score) => total * score, 1);
}

function printGrid(grid: number[][]) {
  let output = '';

  for (let y = 0; y < grid[0].length; y++) {
    for (let x = 0; x < grid.length; x++) {
      output += grid[x][y].toString().padStart(2);
    }
    output += '\n';
  }

  console.log(output);
}

export function solve1(input: string) {
  const grid = parseInput(input);

  for (const column of grid) {
    column.unshift(-1);
    column.push(-1);
  }

  grid.unshift(new Array(grid[0].length).fill(-1));
  grid.push(new Array(grid[0].length).fill(-1));

  // printGrid(grid);

  const visibleTrees: [number, number][] = [];

  for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[0].length - 1; y++) {
      if (isVisible(grid, [x, y])[0]) {
        visibleTrees.push([x, y]);
      }
    }
  }

  return visibleTrees.length;
}

export function solve2(input: string) {
  const grid = parseInput(input);

  const scores: number[] = [];

  for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[0].length - 1; y++) {
      scores.push(getScenicScore(grid, [x, y]));
    }
  }

  scores.sort((a, b) => b - a);

  return scores[0];
}
