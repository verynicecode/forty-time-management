import { Amount } from "./Amount"
import { NullFortyTime } from "../NullFortyTime"

describe("Amount", () => {
  describe("parsing", () => {
    describe("with a null", () => {
      it("returns a NullFortyTime", () => {
        const input = null
        const fortyTime = Amount.parse(input)
        expect(fortyTime).toBeInstanceOf(NullFortyTime)
        expect(fortyTime.minutes).toEqual(0)
        expect(fortyTime.toString()).toEqual("")
      })
    })

    describe("with an integer", () => {
      it("parses that number and returns an instance", () => {
        const input = 480
        const fortyTime = Amount.parse(input)
        expect(fortyTime).toBeInstanceOf(Amount)
      })
    })

    describe("with a negative integer", () => {
      it("parses that number and returns an instance", () => {
        const input = -30
        const fortyTime = Amount.parse(input)
        expect(fortyTime).toBeInstanceOf(Amount)
      })
    })

    describe("with a float", () => {
      it("throws a parse error", () => {
        const input = 480.5
        expect(() => {
          Amount.parse(input)
        }).toThrow(Amount.ParseError)
      })
    })

    describe("with a string", () => {
      describe("with an empty string", () => {
        it("returns a NullFortyTime", () => {
          const input = ""
          const fortyTime = Amount.parse(input)
          expect(fortyTime).toBeInstanceOf(NullFortyTime)
        })
      })

      describe("with a random format", () => {
        it("throws a parse error", () => {
          const input = "asdf"
          expect(() => {
            Amount.parse(input)
          }).toThrow(Amount.ParseError)
        })
      })

      describe("with proper formatting", () => {
        it("parses that string and returns an instance", () => {
          const input = "8:00"
          const fortyTime = Amount.parse(input)
          expect(fortyTime).toBeInstanceOf(Amount)
        })
      })

      describe("with some negative minutes", () => {
        it("parses that string and returns an instance with negative minutes", () => {
          const input = "-0:30"
          const fortyTime = Amount.parse(input)
          expect(fortyTime).toBeInstanceOf(Amount)
          expect(fortyTime.minutes).toEqual(-30)
        })
      })

      describe("with some negative hours", () => {
        it("parses that string and returns an instance with negative minutes", () => {
          const input = "-1:30"
          const fortyTime = Amount.parse(input)
          expect(fortyTime).toBeInstanceOf(Amount)
          expect(fortyTime.minutes).toEqual(-90)
        })
      })
    })
  })

  describe("math", () => {
    it("adds two forty times", () => {
      const lhs = Amount.parse(480)
      const rhs = Amount.parse(20)
      const result = lhs.plus(rhs)

      expect(result.minutes).toEqual(500)
    })

    it("subtracts two forty times", () => {
      const lhs = Amount.parse(1020)
      const rhs = Amount.parse(480)
      const result = lhs.minus(rhs)

      expect(result.minutes).toEqual(540)
    })

    it("subtracts negative numbers while adding", () => {
      const lhs = Amount.parse("8:00")
      const rhs = Amount.parse("-0:30")
      const result = lhs.plus(rhs)

      expect(result.minutes).toEqual(450)
    })
  })

  describe("value", () => {
    it("returns the minutes", () => {
      const fortyTime = new Amount(480)
      expect(fortyTime.value).toEqual(480)
    })
  })

  describe("toString", () => {
    describe("with an input that has no minutes", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new Amount(480)
        expect(fortyTime.toString()).toEqual("8:00")
      })
    })

    describe("with an input that has less than 10 minutes", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new Amount(481)
        expect(fortyTime.toString()).toEqual("8:01")
      })
    })

    describe("with an input that has more than 10 minutes", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new Amount(491)
        expect(fortyTime.toString()).toEqual("8:11")
      })
    })

    describe("with a negative amount", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new Amount(-30)
        expect(fortyTime.toString()).toEqual("-0:30")
      })
    })

    describe("with a large negative amount", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new Amount(-601)
        expect(fortyTime.toString()).toEqual("-10:01")
      })
    })
  })
})
