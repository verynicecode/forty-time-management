import { BaseFortyTime } from "../BaseFortyTime"
import { NullFortyTime } from "../NullFortyTime"

export class Point extends BaseFortyTime {
  static parse = (input: number | string | null): BaseFortyTime => {
    if (input === null || input === "") {
      return new NullFortyTime()
    }

    if (typeof input === "number") {
      if (Number.isInteger(input) && input > 0) {
        return new Point(input)
      } else {
        throw new Point.ParseError()
      }
    }

    if (!input.match(/:/)) throw new Point.ParseError()

    // eslint-disable-next-line prefer-const
    let [hours, extra] = input.split(":").map(Number)

    if (input[0] === "-") {
      throw new Point.ParseError()
    }

    const minutes = hours * 60 + extra

    return new Point(minutes)
  }

  get value(): number {
    return this.minutes
  }

  constructor(minutes: number) {
    super(minutes)
    if (minutes < 0) throw new Point.ParseError()
  }

  toString = (): string => {
    const hours: number = Math.trunc(this.minutes / 60)
    let extra: string | number = this.minutes - hours * 60

    if (extra < 10) {
      extra = `0${extra}`
    }

    return [hours, extra].join(":")
  }

  plus = (other: BaseFortyTime): BaseFortyTime => {
    const sum = this.minutes + other.minutes
    const result = new Point(sum)
    return result
  }

  minus = (other: BaseFortyTime): BaseFortyTime => {
    const diff = this.minutes - other.minutes
    const result = new Point(diff)
    return result
  }
}
