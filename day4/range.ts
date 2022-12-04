export class Range {
  #start: number;
  #length: number;

  constructor(start: number, end: number) {
    this.#start = start;
    this.#length = end - start + 1;
  }

  get start() {
    return this.#start;
  }

  get end() {
    return this.start + this.length - 1;
  }

  get length() {
    return this.#length;
  }

  contains(other: Range) {
    return this.start <= other.start && this.end >= other.end;
  }

  overlaps(other: Range) {
    return this.start <= other.end && this.end >= other.start;
  }

  toString() {
    return `${this.start}-${this.end}`;
  }

  valueOf() {
    return this.toString();
  }

  static fromString(input: string) {
    const [startString, endString] = input.split('-');
    return new Range(parseInt(startString), parseInt(endString));
  }
}
