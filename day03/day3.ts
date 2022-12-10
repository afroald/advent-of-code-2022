import chunk from 'lodash.chunk';
import intersection from 'lodash.intersection';
import sum from 'lodash.sum';

const priorities = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const solve1 = (input: string) =>
  sum(
    input
      .trim()
      .split('\n')
      .map((rucksack) => {
        const splitIndex = rucksack.length / 2;
        const [itemInBothCompartments] = intersection(
          Array.from(new Set(Array.from(rucksack.substring(0, splitIndex)))),
          Array.from(new Set(Array.from(rucksack.substring(splitIndex)))),
        );

        return priorities.indexOf(itemInBothCompartments);
      }),
  );

export const solve2 = (input: string) =>
  sum(
    chunk(input.trim().split('\n'), 3).map((group) => {
      const [badge] = intersection(
        ...group.map((rucksack) => Array.from(new Set(Array.from(rucksack)))),
      );
      return priorities.indexOf(badge);
    }),
  );
