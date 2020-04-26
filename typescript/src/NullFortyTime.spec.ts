import { NullFortyTime } from "./NullFortyTime"

describe("NullFortyTime", () => {
  describe("parse", () => {
    it("returns a new NullFortyTime", () => {
      const time = NullFortyTime.parse(10)
      expect(time).toBeInstanceOf(NullFortyTime)
    })
  })

  describe("construction", () => {
    it("sets minutes to zero", () => {
      const time = new NullFortyTime()
      expect(time.minutes).toEqual(0)
    })
  })

  describe("toString", () => {
    it("returns an empty string", () => {
      const time = new NullFortyTime()
      expect(time.toString()).toEqual("")
    })
  })

  describe("plus", () => {
    it("returns the other", () => {
      const time = new NullFortyTime()
      const other = new NullFortyTime()
      expect(time.plus(other)).toEqual(other)
    })
  })

  describe("minus", () => {
    it("returns the other", () => {
      const time = new NullFortyTime()
      const other = new NullFortyTime()
      expect(time.minus(other)).toEqual(other)
    })
  })
})
