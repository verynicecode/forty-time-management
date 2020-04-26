import { BaseFortyTime, implementError } from "./BaseFortyTime"

describe("BaseFortyTime", () => {
  describe("parse", () => {
    it("throws an error to implement in subclass", () => {
      expect(() => {
        BaseFortyTime.parse(0)
      }).toThrow(implementError)
    })
  })

  describe("construction", () => {
    it("saves minutes to an instance variable", () => {
      const time = new BaseFortyTime(10)
      expect(time.minutes).toEqual(10)
    })
  })

  describe("toString", () => {
    it("throws an error to implement in subclass", () => {
      const time = new BaseFortyTime(10)

      expect(() => {
        time.toString()
      }).toThrow(implementError)
    })
  })

  describe("plus", () => {
    it("throws an error to implement in subclass", () => {
      const time = new BaseFortyTime(10)
      const other = new BaseFortyTime(10)

      expect(() => {
        time.plus(other)
      }).toThrow(implementError)
    })
  })

  describe("minus", () => {
    it("throws an error to implement in subclass", () => {
      const time = new BaseFortyTime(10)
      const other = new BaseFortyTime(10)

      expect(() => {
        time.minus(other)
      }).toThrow(implementError)
    })
  })
})
