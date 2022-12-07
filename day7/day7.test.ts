import { Directory, File, solve1, solve2 } from './day7.js';

const EXAMPLE_INPUT = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

describe('day7', () => {
  describe(Directory.name, () => {
    it('fetches node based on path', () => {
      const file = new File('foo.txt', 1);
      const a = new Directory('a', [file]);
      const root = new Directory('/', [a]);

      expect(root.get(['/'])).toBe(root);
      expect(root.get(['/', 'a'])).toBe(a);
      expect(root.get(['/', 'a', 'foo.txt'])).toBe(file);
    });
  });

  describe('solve1', () => {
    it('solves the example', () => {
      expect(solve1(EXAMPLE_INPUT)).toBe(95437);
    });
  });

  describe('solve2', () => {
    it('solves the example', () => {
      expect(solve2(EXAMPLE_INPUT)).toBe(24933642);
    });
  });
});
