import { FortyTime } from "./FortyTime"

describe("FortyTime", () => {
  describe("parsing", () => {
    describe("with an integer", () => {
      it("parses that number and returns an instance", () => {
        const input = 480
        const fortyTime = FortyTime.parse(input)
        expect(fortyTime).toBeInstanceOf(FortyTime)
      })
    })

    describe("with a float", () => {
      it("throws a parse error", () => {
        const input = 480.5
        expect(() => {
          FortyTime.parse(input)
        }).toThrow(FortyTime.ParseError)
      })
    })

    describe("with a string", () => {
      describe("with a random format", () => {
        it("throws a parse error", () => {
          const input = "asdf"
          expect(() => {
            FortyTime.parse(input)
          }).toThrow(FortyTime.ParseError)
        })
      })

      describe("with proper formatting", () => {
        it("parses that string and returns an instance", () => {
          const input = "8:00"
          const fortyTime = FortyTime.parse(input)
          expect(fortyTime).toBeInstanceOf(FortyTime)
        })
      })
    })
  })

  describe("math", () => {
    it("adds two forty times", () => {
      const lhs = FortyTime.parse(480)
      const rhs = FortyTime.parse(20)
      const result = lhs.plus(rhs)

      expect(result.minutes).toEqual(500)
    })

    it("subtracts two forty times", () => {
      const lhs = FortyTime.parse(1020)
      const rhs = FortyTime.parse(480)
      const result = lhs.minus(rhs)

      expect(result.minutes).toEqual(540)
    })
  })

  describe("toString", () => {
    describe("with an input that has no minutes", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new FortyTime(480)
        expect(fortyTime.toString()).toEqual("8:00")
      })
    })

    describe("with an input that has less than 10 minutes", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new FortyTime(481)
        expect(fortyTime.toString()).toEqual("8:01")
      })
    })

    describe("with an input that has more than 10 minutes", () => {
      it("returns a properly formatted string", () => {
        const fortyTime = new FortyTime(491)
        expect(fortyTime.toString()).toEqual("8:11")
      })
    })
  })
})