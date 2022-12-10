export function solve1(input: string) {
  const bytes = Array.from(input);
  const windowSize = 4;

  let cursor = 0;
  while (cursor < bytes.length) {
    const set = new Set(bytes.slice(Math.max(0, cursor - windowSize), cursor));
    if (set.size === windowSize) {
      return cursor;
    }
    cursor++;
  }
}

export function solve2(input: string) {
  const bytes = Array.from(input);
  const windowSize = 14;

  let cursor = 0;
  while (cursor < bytes.length) {
    const set = new Set(bytes.slice(Math.max(0, cursor - windowSize), cursor));
    if (set.size === windowSize) {
      return cursor;
    }
    cursor++;
  }
}
