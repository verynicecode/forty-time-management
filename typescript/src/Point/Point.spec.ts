import { FortyTime } from "../FortyTime"
import { Config } from "../Config"
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
      describe("valid points", () => {
        const validPoints = [
          ["1", 60, "1:00am"],
          ["1a", 60, "1:00am"],
          ["1am", 60, "1:00am"],
          ["1p", 780, "1:00pm"],
          ["1pm", 780, "1:00pm"],
          ["1:", 60, "1:00am"],
          ["1:0", 60, "1:00am"],
          ["1:00", 60, "1:00am"],
          ["1:00a", 60, "1:00am"],
          ["1:00am", 60, "1:00am"],
          ["1:00p", 780, "1:00pm"],
          ["1:00pm", 780, "1:00pm"],
          ["11", 660, "11:00am"],
          ["11a", 660, "11:00am"],
          ["11am", 660, "11:00am"],
          ["11p", 1380, "11:00pm"],
          ["11pm", 1380, "11:00pm"],
          ["11:", 660, "11:00am"],
          ["11:0", 660, "11:00am"],
          ["11:00", 660, "11:00am"],
          ["11:00a", 660, "11:00am"],
          ["11:00am", 660, "11:00am"],
          ["11:00p", 1380, "11:00pm"],
          ["11:00pm", 1380, "11:00pm"],
        ]

        validPoints.forEach(([validValue, expectedMinutes, expectedString]) => {
          it(`returns a Point with "${expectedMinutes}" minutes and "${expectedString}" as string with "${validValue}"`, () => {
            const timePoint = Point.parse(validValue)
            expect(timePoint.value).toEqual(expectedMinutes)
            expect(timePoint.toString()).toEqual(expectedString)
          })
        })
      })

      describe("invalid points", () => {
        const invalidPoints = [
          ":",
          "1-",
          "-:",
          ":0",
          "-:0",
          ":00",
          "-1:00",
          "-1:00m",
          "-11:000",
          "17",
          "17:",
          "17:0",
          "17:00",
        ]

        invalidPoints.forEach((invalidValue) => {
          it(`throws a parse error with ${invalidValue}`, () => {
            expect(() => {
              Point.parse(invalidValue)
            }).toThrow(Point.ParseError)
          })
        })
      })

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

      describe("with twentyFourHourTime turned on", () => {
        beforeAll(() => {
          FortyTime.Config = { twentyFourHourTime: true }
        })

        afterAll(() => {
          FortyTime.Config = Config
        })

        describe("valid points", () => {
          const validPoints = [
            ["1", 60, "1:00"],
            ["1:", 60, "1:00"],
            ["1:0", 60, "1:00"],
            ["1:00", 60, "1:00"],
            ["11", 660, "11:00"],
            ["11:", 660, "11:00"],
            ["11:0", 660, "11:00"],
            ["11:00", 660, "11:00"],
            ["17", 1020, "17:00"],
            ["17:", 1020, "17:00"],
            ["17:0", 1020, "17:00"],
            ["17:00", 1020, "17:00"],
          ]

          validPoints.forEach(
            ([validValue, expectedMinutes, expectedString]) => {
              it(`returns a Point with "${expectedMinutes}" minutes and "${expectedString}" as string with "${validValue}"`, () => {
                const timePoint = Point.parse(validValue)
                expect(timePoint.value).toEqual(expectedMinutes)
                expect(timePoint.toString()).toEqual(expectedString)
              })
            }
          )
        })

        describe("invalid points", () => {
          const invalidPoints = [
            ":",
            "1-",
            "-:",
            ":0",
            "-:0",
            ":00",
            "-1:00",
            "-1:00m",
            "-11:000",
            "1a",
            "1am",
            "1p",
            "1pm",
            "1:00a",
            "1:00am",
            "1:00p",
            "1:00pm",
            "11a",
            "11am",
            "11p",
            "11pm",
            "11:00a",
            "11:00am",
            "11:00p",
            "11:00pm",
          ]

          invalidPoints.forEach((invalidValue) => {
            it(`throws a parse error with ${invalidValue}`, () => {
              expect(() => {
                Point.parse(invalidValue)
              }).toThrow(Point.ParseError)
            })
          })
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
        expect(fortyTime.toString()).toEqual("8:00am")
      })
    })

    describe("with an input that has less than 10 minutes", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new Point(481)
        expect(fortyTime.toString()).toEqual("8:01am")
      })
    })

    describe("with an input that has more than 10 minutes", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new Point(491)
        expect(fortyTime.toString()).toEqual("8:11am")
      })
    })
  })
})
