import { $enum } from 'ts-enum-util';

enum InstructionType {
  Addx = 'addx',
  Noop = 'noop',
}

interface InstructionInterface {
  type: InstructionType;
  cycles: number;
  execute: (cpu: Cpu) => void;
}

export class AddxInstruction implements InstructionInterface {
  type = InstructionType.Addx;
  cycles = 2;

  constructor(readonly v: number) {}

  execute(cpu: Cpu) {
    cpu.x += this.v;
  }
}

export class NoopInstruction implements InstructionInterface {
  type = InstructionType.Noop;
  cycles = 1;

  execute() {}
}

enum CpuState {
  Running,
  Halted,
}

class CpuInstructionExecutor {
  private cycles = 0;

  constructor(readonly cpu: Cpu, readonly instruction: InstructionInterface) {}

  cycle(): boolean {
    this.cycles++;

    if (this.cycles < this.instruction.cycles) {
      return false;
    }

    this.instruction.execute(this.cpu);

    return true;
  }
}

export class Cpu {
  private executor: CpuInstructionExecutor | null = null;

  cc = 0;
  pc = 0;
  state = CpuState.Running;

  x = 1;

  constructor(readonly instructions: InstructionInterface[]) {}

  cycle() {
    if (this.state === CpuState.Halted) {
      throw new Error('pls stahp');
    }

    if (this.executor === null) {
      this.executor = new CpuInstructionExecutor(
        this,
        this.instructions[this.pc],
      );
    }

    if (this.executor.cycle()) {
      this.pc++;
      this.executor = null;
    }

    this.cc++;

    if (this.instructions[this.pc] === undefined || this.cc > 1_000_000) {
      this.state = CpuState.Halted;
    }
  }
}

export const parseInstructions = (input: string): InstructionInterface[] =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const instructionType = $enum(InstructionType).asValueOrThrow(
        line.substring(0, 4),
      );
      const v = parseInt(line.substring(5));

      switch (instructionType) {
        case InstructionType.Addx:
          return new AddxInstruction(v);
        case InstructionType.Noop:
          return new NoopInstruction();
      }
    });

export function solve1(input: string): number {
  const cpu = new Cpu(parseInstructions(input));
  const signalStrengths: number[] = [];

  while (cpu.state === CpuState.Running) {
    // We want to calculate the signal strength before the cycle ends. We do this by calculating
    // the signal strength at the end of the previous cycle.
    if ((cpu.cc + 1 - 20) % 40 === 0) {
      signalStrengths.push(cpu.x * (cpu.cc + 1));
    }

    cpu.cycle();
  }

  return signalStrengths.reduce((sum, value) => sum + value, 0);
}

export function solve2(input: string): string {
  const cpu = new Cpu(parseInstructions(input));

  const crt: string[][] = [[], [], [], [], [], []];
  const crtRow = (cycle: number) => Math.floor(cycle / 40);
  const crtColumn = (cycle: number) => cycle % 40;

  while (cpu.state === CpuState.Running) {
    crt[crtRow(cpu.cc)][crtColumn(cpu.cc)] = [
      cpu.x - 1,
      cpu.x,
      cpu.x + 1,
    ].includes(crtColumn(cpu.cc))
      ? '#'
      : ' ';

    cpu.cycle();
  }

  return crt.map((row) => row.join('')).join('\n');
}
