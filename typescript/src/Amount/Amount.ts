import { BaseFortyTime } from "../BaseFortyTime"
import { NullFortyTime } from "../NullFortyTime"

export class Amount extends BaseFortyTime {
  static parse = (input: number | string | null): BaseFortyTime => {
    if (input === null || input === "") {
      return new NullFortyTime()
    }

    if (typeof input === "number") {
      if (Number.isInteger(input)) {
        return new Amount(input)
      } else {
        throw new Amount.ParseError()
      }
    }

    if (!input.match(/:/)) throw new Amount.ParseError()

    // eslint-disable-next-line prefer-const
    let [hours, extra] = input.split(":").map(Number)

    if (input[0] === "-") {
      extra = extra * -1
    }

    const minutes = hours * 60 + extra

    return new Amount(minutes)
  }

  get value(): number {
    return this.minutes
  }

  toString = (): string => {
    let hours: string | number = Math.trunc(this.minutes / 60)
    let extra: string | number = this.minutes - hours * 60

    if (this.minutes < 0) {
      hours = hours * -1
      extra = extra * -1
      hours = `-${hours}`
    }

    if (extra < 10) {
      extra = `0${extra}`
    }

    return [hours, extra].join(":")
  }

  plus = (other: BaseFortyTime): BaseFortyTime => {
    const sum = this.minutes + other.minutes
    const result = new Amount(sum)
    return result
  }

  minus = (other: BaseFortyTime): BaseFortyTime => {
    const diff = this.minutes - other.minutes
    const result = new Amount(diff)
    return result
  }
}
