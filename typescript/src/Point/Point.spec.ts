import { Point } from "./Point"
import { NullFortyTime } from "../NullFortyTime"

describe("Point", () => {
  describe("construction", () => {
    describe("with a positive number", () => {
      it("returns a Point", () => {
        const minutes = 480
        const fortyTime = new Point(minutes)
        expect(fortyTime).toBeInstanceOf(Point)
      })
    })

    describe("with a negative number", () => {
      it("throws a parse error", () => {
        const minutes = -480
        expect(() => {
          new Point(minutes)
        }).toThrow(Point.ParseError)
      })
    })
  })

  describe("parsing", () => {
    describe("with a null", () => {
      it("returns a NullFortyTime", () => {
        const input = null
        const fortyTime = Point.parse(input)
        expect(fortyTime).toBeInstanceOf(NullFortyTime)
        expect(fortyTime.minutes).toEqual(0)
        expect(fortyTime.toString()).toEqual("")
      })
    })

    describe("with an integer", () => {
      it("parses that number and returns an instance", () => {
        const input = 480
        const fortyTime = Point.parse(input)
        expect(fortyTime).toBeInstanceOf(Point)
      })
    })

    describe("with a negative integer", () => {
      it("throws a parse error", () => {
        const input = -30
        expect(() => {
          Point.parse(input)
        }).toThrow(Point.ParseError)
      })
    })

    describe("with a float", () => {
      it("throws a parse error", () => {
        const input = 480.5
        expect(() => {
          Point.parse(input)
        }).toThrow(Point.ParseError)
      })
    })

    describe("with a string", () => {
      describe("with an empty string", () => {
        it("returns a NullFortyTime", () => {
          const input = ""
          const fortyTime = Point.parse(input)
          expect(fortyTime).toBeInstanceOf(NullFortyTime)
        })
      })

      describe("with a random format", () => {
        it("throws a parse error", () => {
          const input = "asdf"
          expect(() => {
            Point.parse(input)
          }).toThrow(Point.ParseError)
        })
      })

      describe("with proper formatting", () => {
        it("parses that string and returns an instance", () => {
          const input = "8:00"
          const fortyTime = Point.parse(input)
          expect(fortyTime).toBeInstanceOf(Point)
        })
      })

      describe("with some negative minutes", () => {
        it("throws a parse error", () => {
          const input = "-0:30"
          expect(() => {
            Point.parse(input)
          }).toThrow(Point.ParseError)
        })
      })

      describe("with some negative hours", () => {
        it("throws a parse error", () => {
          const input = "-1:30"
          expect(() => {
            Point.parse(input)
          }).toThrow(Point.ParseError)
        })
      })
    })
  })

  describe("math", () => {
    it("adds two forty times", () => {
      const lhs = Point.parse(480)
      const rhs = Point.parse(20)
      const result = lhs.plus(rhs)

      expect(result.minutes).toEqual(500)
    })

    it("subtracts two forty times", () => {
      const lhs = Point.parse(1020)
      const rhs = Point.parse(480)
      const result = lhs.minus(rhs)

      expect(result.minutes).toEqual(540)
    })
  })

  describe("value", () => {
    it("returns the minutes", () => {
      const fortyTime = new Point(480)
      expect(fortyTime.value).toEqual(480)
    })
  })

  describe("toString", () => {
    describe("with an input that has no minutes", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new Point(480)
        expect(fortyTime.toString()).toEqual("8:00")
      })
    })

    describe("with an input that has less than 10 minutes", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new Point(481)
        expect(fortyTime.toString()).toEqual("8:01")
      })
    })

    describe("with an input that has more than 10 minutes", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new Point(491)
        expect(fortyTime.toString()).toEqual("8:11")
      })
    })
  })
})
