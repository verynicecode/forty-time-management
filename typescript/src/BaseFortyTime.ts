export const implementError = new Error("implement in subclass")

export class BaseFortyTime {
  static ParseError = class ParseError extends Error {}

  static parse = (input: number | string | null): BaseFortyTime => {
    throw implementError
  }

  minutes: number

  constructor(minutes: number) {
    this.minutes = minutes
  }

  get value(): number | null {
    throw implementError
  }

  toString = (): string => {
    throw implementError
  }

  plus = (other: BaseFortyTime): BaseFortyTime => {
    throw implementError
  }

  minus = (other: BaseFortyTime): BaseFortyTime => {
    throw implementError
  }
}
