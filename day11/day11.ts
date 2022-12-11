import { Range } from '../day09/range.js';

function gcd(a: number, b: number): number {
  return !b ? a : gcd(b, a % b);
}

function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b);
}

type Test = {
  div: number;
  (level: number): number;
};

class Monkey {
  items: number[];
  ic = 0;

  constructor(
    items: number[],
    readonly operation: (level: number) => number,
    readonly test: Test,
  ) {
    this.items = items;
  }
}

function parseInput(input: string): Monkey[] {
  const parseItems = (input: string) =>
    input
      .substring(18)
      .split(', ')
      .map((item) => parseInt(item, 10));
  const parseOp = (input: string) => {
    if (input.substring(25) === 'old') {
      return (level: number) => level * level;
    }

    const value = parseInt(input.substring(25));

    switch (input.substring(23, 24)) {
      case '*':
        return (level: number) => level * value;
      case '+':
        return (level: number) => level + value;
      default:
        throw new Error('never happens™️');
    }
  };
  const parseTest = (input: string[]) => {
    const div = parseInt(input[0].substring(21));
    const targetIfTrue = parseInt(input[1].substring(29));
    const targetIfFalse = parseInt(input[2].substring(30));
    const test = (level: number) =>
      level % div === 0 ? targetIfTrue : targetIfFalse;
    test.div = div;
    return test;
  };

  return input
    .trim()
    .split('\n\n')
    .map((section) => {
      const [, items, op, ...test] = section.split('\n');
      return new Monkey(parseItems(items), parseOp(op), parseTest(test));
    });
}

export function solve1(input: string): number {
  const monkeys = parseInput(input);

  for (const _ of new Range(0, 20)) {
    for (const monkey of monkeys) {
      if (monkey.items.length === 0) {
        continue;
      }

      for (const worryLevel of monkey.items) {
        monkey.ic++;
        const newLevel = Math.floor(monkey.operation(worryLevel) / 3);
        monkeys[monkey.test(newLevel)].items.push(newLevel);
      }

      monkey.items = [];
    }
  }

  monkeys.sort((a, b) => b.ic - a.ic);

  return monkeys[0].ic * monkeys[1].ic;
}

export function solve2(input: string): number {
  const monkeys = parseInput(input);
  const leastCommonMultiple = monkeys
    .map((monkey) => monkey.test.div)
    .reduce((l, div) => lcm(l, div), 1);

  for (const _ of new Range(0, 10000)) {
    for (const monkey of monkeys) {
      if (monkey.items.length === 0) {
        continue;
      }

      for (const worryLevel of monkey.items) {
        monkey.ic++;
        const newLevel = monkey.operation(worryLevel) % leastCommonMultiple;
        monkeys[monkey.test(newLevel)].items.push(newLevel);
      }

      monkey.items = [];
    }
  }

  monkeys.sort((a, b) => b.ic - a.ic);

  return monkeys[0].ic * monkeys[1].ic;
}
