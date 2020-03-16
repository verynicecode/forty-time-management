export class FortyTime {
  static ParseError = class ParseError extends Error {}

  static parse = (input: number | string) => {
    if (typeof input === "number") {
      if (Number.isInteger(input)) {
        return new FortyTime(input)
      } else {
        throw new FortyTime.ParseError
      }
    }

    if (!input.match(/:/)) throw new FortyTime.ParseError

    const [hours, extra] = input.split(":").map(Number)
    const minutes = hours * 60 + extra
    return new FortyTime(minutes)
  }

  minutes: number

  constructor(minutes: number) {
    this.minutes = minutes
  }
}
