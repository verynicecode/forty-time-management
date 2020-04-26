import { BaseFortyTime } from "./BaseFortyTime"

export class NullFortyTime extends BaseFortyTime {
  static parse = (_input: any): NullFortyTime => {
    return new NullFortyTime()
  }

  constructor() {
    super(0)
  }

  toString = (): string => {
    return ""
  }

  plus = (other: BaseFortyTime): BaseFortyTime => {
    return other
  }

  minus = (other: BaseFortyTime): BaseFortyTime => {
    return other
  }
}
