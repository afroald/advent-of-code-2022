export class Range {
  constructor(readonly start: number, readonly end: number) {}

  get length() {
    return this.end - this.start;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i < this.end; i++) {
      yield i;
    }
  }

  *reverse() {
    for (let i = this.end - 1; i >= this.start; i--) {
      yield i;
    }
  }
}
