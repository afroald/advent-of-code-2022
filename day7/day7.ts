enum NodeType {
  Directory,
  File,
}

export class Directory {
  readonly type = NodeType.Directory;

  constructor(readonly name: string, readonly children: Node[] = []) {}

  get(path: string[]): Node | undefined {
    const [level1, ...restOfPath] = path;

    if (level1 !== this.name) {
      return;
    }

    if (restOfPath.length === 0) {
      return this;
    }

    const node = this.children.find((child) => child.name === restOfPath[0]);

    if (node === undefined) {
      return;
    }

    switch (node.type) {
      case NodeType.Directory:
        return node.get(restOfPath);
      case NodeType.File:
        return restOfPath.length === 1 ? node : undefined;
    }
  }

  du() {
    return this.children.reduce((size, child): number => {
      switch (child.type) {
        case NodeType.Directory:
          return size + child.du();
        case NodeType.File:
          return size + child.size;
      }
    }, 0);
  }

  walk<T>(callback: (node: Node) => T): T[] {
    return [
      callback(this),
      ...this.children.flatMap((node) => {
        switch (node.type) {
          case NodeType.Directory:
            return node.walk(callback);
          case NodeType.File:
            return callback(node);
        }
      }),
    ];
  }
}

export class File {
  readonly type = NodeType.File;

  constructor(readonly name: string, readonly size: number) {}
}

enum CommandType {
  List = 'ls',
  ChangeDir = 'cd',
}

class ListCommand {
  readonly type = CommandType.List;
  readonly list: (File | Directory)[];

  constructor(output: string) {
    this.list = output
      .split('\n')
      .slice(1)
      .filter((line) => line !== '')
      .map((line) => {
        if (line.startsWith('dir')) {
          return new Directory(line.slice(4).trim());
        } else {
          const [, size, name] = line.match(/(\d+) (.+)/) ?? [];
          return new File(name, parseInt(size));
        }
      });
  }
}

type Node = Directory | File;

class ChangeDirCommand {
  readonly type = CommandType.ChangeDir;
  readonly name: string;

  constructor(output: string) {
    this.name = output.slice(3).trim();
  }
}

type Command = ListCommand | ChangeDirCommand;

function parseTerminalOutput(output: string): Command[] {
  return output
    .trim()
    .split('$ ')
    .filter((value) => value !== '')
    .map((output) => {
      switch (output.slice(0, 2)) {
        case 'ls':
          return new ListCommand(output);
        case 'cd':
          return new ChangeDirCommand(output);
        default:
          throw new Error('kannie');
      }
    });
}

export function solve1(input: string) {
  const commands = parseTerminalOutput(input);

  const cwd = [];
  const fs = new Directory('/');

  for (const command of commands) {
    switch (command.type) {
      case CommandType.ChangeDir:
        command.name === '..' ? cwd.pop() : cwd.push(command.name);
        break;
      case CommandType.List:
        const node = fs.get(cwd);

        if (node?.type !== NodeType.Directory) {
          throw new Error(`Expected directory but got: ${node}`);
        }

        node.children.push(...command.list);
        break;
    }
  }

  const dirs = fs
    .walk((node): Directory | null =>
      node.type === NodeType.Directory && node.du() < 100000 ? node : null,
    )
    .filter((dir): dir is Directory => dir !== null);

  return dirs.reduce((total, dir) => total + dir.du(), 0);
}

export function solve2(input: string) {
  const commands = parseTerminalOutput(input);

  const cwd = [];
  const fs = new Directory('/');

  for (const command of commands) {
    switch (command.type) {
      case CommandType.ChangeDir:
        command.name === '..' ? cwd.pop() : cwd.push(command.name);
        break;
      case CommandType.List:
        const node = fs.get(cwd);

        if (node?.type !== NodeType.Directory) {
          throw new Error(`Expected directory but got: ${node}`);
        }

        node.children.push(...command.list);
        break;
    }
  }

  const totalDiskSpace = 70000000;
  const usedDiskSpace = fs.du();
  const availableDiskSpace = totalDiskSpace - usedDiskSpace;

  const dirs = fs
    .walk((node): [Directory, number] | null =>
      node.type === NodeType.Directory ? [node, node.du()] : null,
    )
    .filter((value): value is [Directory, number] => value !== null)
    .sort(([, a], [, b]) => a - b);

  const [, bytesToDelete] = dirs.find(
    ([, size]) => availableDiskSpace + size >= 30000000,
  )!;

  return bytesToDelete;
}
