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
})
