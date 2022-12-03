import chunk from 'lodash.chunk';
import intersection from 'lodash.intersection';

export function getPriorityForItem(item: string) {
  const charCode = item.charCodeAt(0);

  if (charCode >= 65 && charCode <= 90) {
    return charCode - 38;
  } else {
    return charCode - 96;
  }
}

export const solve1 = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((rucksack) => {
      const splitIndex = rucksack.length / 2;
      const [itemInBothCompartments] = intersection(
        Array.from(new Set(Array.from(rucksack.substring(0, splitIndex)))),
        Array.from(new Set(Array.from(rucksack.substring(splitIndex)))),
      );

      return getPriorityForItem(itemInBothCompartments);
    })
    .reduce((sum, priority) => sum + priority, 0);

export const solve2 = (input: string) =>
  chunk(input.trim().split('\n'), 3)
    .map((group) => {
      const [badge] = intersection(
        ...group.map((rucksack) => Array.from(new Set(Array.from(rucksack)))),
      );
      return getPriorityForItem(badge);
    })
    .reduce((sum, priority) => sum + priority, 0);
