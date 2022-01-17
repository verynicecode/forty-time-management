import { BaseFortyTime } from "../BaseFortyTime"
import { NullFortyTime } from "../NullFortyTime"

const computeMinutes = (timeValue: string): number => {
  if (timeValue === "-") return 0

  const pattern = /^-?\d{1,2}:?\d{0,2}$/
  if (!pattern.test(timeValue)) throw new Amount.ParseError()

  const negativeAmount = timeValue[0] === "-"
  const cleanValue = timeValue.replace("-", "")
  const [first, last] = cleanValue.split(":")

  const hours = Number(first)

  const multiplier = last?.length === 1 ? 10 : 1
  const extra = Number(last || "") * multiplier

  const minutes = hours * 60 + extra

  return negativeAmount ? minutes * -1 : minutes
}

export class Amount extends BaseFortyTime {
  static parse = (input: number | string | null): BaseFortyTime => {
    if (input === null || input === "") return new NullFortyTime()

    if (typeof input === "number") {
      if (Number.isInteger(input)) {
        return new Amount(input)
      } else {
        throw new Amount.ParseError()
      }
    }

    const minutes = computeMinutes(input)
    if (minutes === 0) return new NullFortyTime()

    return new Amount(minutes)
  }

  get value(): number {
    return this.minutes
  }

  toString = (): string => {
    const negativeAmount = this.minutes < 0
    const absoluteMinutes = Math.abs(this.minutes)

    const sign = negativeAmount ? "-" : ""
    const hours = Math.trunc(absoluteMinutes / 60)
    const extra = absoluteMinutes - hours * 60
    const minutes = extra.toString().padStart(2, "0")

    return `${sign}${hours}:${minutes}`
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
