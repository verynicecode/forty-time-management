import { BaseFortyTime } from "../BaseFortyTime"
import { FortyTime } from "../FortyTime"
import { NullFortyTime } from "../NullFortyTime"

const computeMinutes = (timeValue: string): number => {
  const { twentyFourHourTime } = FortyTime.Config

  const twentyFourHourPattern = /^\d{1,2}:?\d{0,2}$/
  const twelveHourPattern = /^\d{1,2}:?\d{0,2}(a|p)?m?$/

  const pattern = twentyFourHourTime ? twentyFourHourPattern : twelveHourPattern

  if (!pattern.test(timeValue)) throw new Point.ParseError()

  const add12Hours = /pm?/.test(timeValue)
  const cleanValue = timeValue.replace(/(a|p)m?/, "")
  const [first, last] = cleanValue.split(":")

  if (!twentyFourHourTime && Number(first) > 12) throw new Point.ParseError()

  const offset = add12Hours ? 12 : 0
  const hours = Number(first) + offset

  const multiplier = last?.length === 1 ? 10 : 1
  const extra = Number(last || "") * multiplier

  return hours * 60 + extra
}

export class Point extends BaseFortyTime {
  static parse = (input: number | string | null): BaseFortyTime => {
    if (input === null || input === "") return new NullFortyTime()

    if (typeof input === "number") {
      if (Number.isInteger(input) && input > 0) {
        return new Point(input)
      } else {
        throw new Point.ParseError()
      }
    }

    const minutes = computeMinutes(input)
    if (minutes === 0) return new NullFortyTime()

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
    const { twentyFourHourTime } = FortyTime.Config

    let hours = Math.trunc(this.minutes / 60)
    const extra = this.minutes - hours * 60
    const minutes = extra.toString().padStart(2, "0")

    const meridianIndicator = hours < 12 ? "am" : "pm"

    if (!twentyFourHourTime && hours > 12) {
      hours -= 12
    }

    if (twentyFourHourTime) {
      return `${hours}:${minutes}`
    } else {
      return `${hours}:${minutes}${meridianIndicator}`
    }
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
