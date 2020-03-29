export class FortyTime {
  static ParseError = class ParseError extends Error {}

  static parse = (input: number | string) => {
    if (typeof input === "number") {
      if (Number.isInteger(input)) {
        return new FortyTime(input)
      } else {
        throw new FortyTime.ParseError()
      }
    }

    if (!input.match(/:/)) throw new FortyTime.ParseError()

    const [hours, extra] = input.split(":").map(Number)
    let minutes = hours * 60 + extra

    if (input[0] === "-") {
      minutes = minutes * -1
    }

    return new FortyTime(minutes)
  }

  minutes: number

  constructor(minutes: number) {
    this.minutes = minutes
  }

  toString = (): string => {
    const hours = Math.trunc(this.minutes / 60)

    let extra: string | number = this.minutes - hours * 60
    if (extra < 10) {
      extra = `0${extra}`
    }

    return [hours, extra].join(":")
  }

  plus = (other: FortyTime): FortyTime => {
    const sum = this.minutes + other.minutes
    const result = new FortyTime(sum)
    return result
  }

  minus = (other: FortyTime): FortyTime => {
    const diff = this.minutes - other.minutes
    const result = new FortyTime(diff)
    return result
  }
}
