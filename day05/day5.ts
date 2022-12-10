import chunk from 'lodash.chunk';

const parseStacks = (input: string): string[][] => {
  const lines = input.split('\n');
  lines.pop(); // the last line are the stack numbers, don't care
  return lines.reduce((stacks, line) => {
    chunk(Array.from(line), 4).forEach((crate, index) => {
      const stack = stacks[index] ?? (stacks[index] = []);
      if (crate[1] !== ' ') {
        stack.unshift(crate[1]);
      }
    });
    return stacks;
  }, [] as string[][]);
};

type Move = {
  amount: number;
  from: number;
  to: number;
};

function parseMove(input: string): Move {
  const matches = input.match(/move (\d+) from (\d+) to (\d+)/);
  return {
    amount: parseInt(matches![1]),
    from: parseInt(matches![2]) - 1,
    to: parseInt(matches![3]) - 1,
  };
}

export function solve1(input: string) {
  const [stacksString, procedure] = input.trimEnd().split('\n\n');
  const stacks = parseStacks(stacksString);
  procedure
    .split('\n')
    .map(parseMove)
    .forEach((move) =>
      stacks[move.to].push(
        ...stacks[move.from].splice(move.amount * -1).reverse(),
      ),
    );
  return stacks.map((stack) => stack[stack.length - 1]).join('');
}

export function solve2(input: string) {
  const [stacksString, procedure] = input.trimEnd().split('\n\n');
  const stacks = parseStacks(stacksString);
  procedure
    .split('\n')
    .map(parseMove)
    .forEach((move) =>
      stacks[move.to].push(...stacks[move.from].splice(move.amount * -1)),
    );
  return stacks.map((stack) => stack[stack.length - 1]).join('');
}
