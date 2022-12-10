import { Range } from '../day09/range.js';
import {
  AddxInstruction,
  Cpu,
  NoopInstruction,
  parseInstructions,
  solve1,
  solve2,
} from './day10.js';

const EXAMPLE_INPUT = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const EXAMPLE_OUTPUT = `##  ##  ##  ##  ##  ##  ##  ##  ##  ##  
###   ###   ###   ###   ###   ###   ### 
####    ####    ####    ####    ####    
#####     #####     #####     #####     
######      ######      ######      ####
#######       #######       #######     `;

describe('day10', () => {
  describe(Cpu.name, () => {
    it('takes 1 cycle to complete a noop instruction', () => {
      const cpu = new Cpu([new NoopInstruction()]);
      expect(cpu.cc).toBe(0);
      expect(cpu.pc).toBe(0);

      cpu.cycle();
      expect(cpu.cc).toBe(1);
      expect(cpu.pc).toBe(1);
    });

    it('takes 2 cycles to complete an addx instruction', () => {
      const cpu = new Cpu([new AddxInstruction(3)]);
      expect(cpu.cc).toBe(0);
      expect(cpu.x).toBe(1);

      cpu.cycle();
      expect(cpu.cc).toBe(1);
      expect(cpu.x).toBe(1);

      cpu.cycle();
      expect(cpu.cc).toBe(2);
      expect(cpu.x).toBe(4);
      expect(cpu.pc).toBe(1);
    });

    it.skip('debugs', () => {
      const cpu = new Cpu(parseInstructions(EXAMPLE_INPUT));
      console.log('cc', cpu.cc, 'pc', cpu.pc, 'x', cpu.x, 'ss', cpu.x * cpu.cc);

      for (const _ of new Range(0, 20)) {
        cpu.cycle();
        console.log(
          'cc',
          cpu.cc,
          'pc',
          cpu.pc,
          'x',
          cpu.x,
          'ss',
          cpu.x * cpu.cc,
        );
      }
    });
  });

  describe('solve1', () => {
    it('solves the example', () => {
      expect(solve1(EXAMPLE_INPUT)).toBe(13140);
    });
  });

  describe('solve2', () => {
    expect(solve2(EXAMPLE_INPUT)).toBe(EXAMPLE_OUTPUT);
  });
});
