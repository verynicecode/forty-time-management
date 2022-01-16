import { FortyTime } from "./FortyTime"

describe("FortyTime", () => {
  describe("making a basic work day", () => {
    it("renders and calculates correctly", () => {
      const workWeek = {
        adjustMinutes: null,
        inMinutes: 540,
        outMinutes: 1020,
        ptoMinutes: null,
      }

      const inPoint = new FortyTime.Point(workWeek.inMinutes)
      const outPoint = new FortyTime.Point(workWeek.outMinutes)

      const ptoAmount = FortyTime.Amount.parse(workWeek.ptoMinutes)
      const adjustAmount = FortyTime.Amount.parse(workWeek.adjustMinutes)

      expect(inPoint.toString()).toEqual("9:00")
      expect(outPoint.toString()).toEqual("17:00")

      expect(ptoAmount.toString()).toEqual("")
      expect(adjustAmount.toString()).toEqual("")

      const totalAmount = outPoint
        .minus(inPoint)
        .plus(ptoAmount)
        .plus(adjustAmount)
      expect(totalAmount.value).toEqual(480)
    })
  })

  describe("making a complex day", () => {
    it("renders and calculates correctly", () => {
      const workWeek = {
        adjustMinutes: -30,
        inMinutes: 600,
        outMinutes: 1020,
        ptoMinutes: 60,
      }

      const inPoint = new FortyTime.Point(workWeek.inMinutes)
      const outPoint = new FortyTime.Point(workWeek.outMinutes)

      const ptoAmount = FortyTime.Amount.parse(workWeek.ptoMinutes)
      const adjustAmount = FortyTime.Amount.parse(workWeek.adjustMinutes)

      expect(inPoint.toString()).toEqual("10:00")
      expect(outPoint.toString()).toEqual("17:00")

      expect(ptoAmount.toString()).toEqual("1:00")
      expect(adjustAmount.toString()).toEqual("-0:30")

      const totalAmount = outPoint
        .minus(inPoint)
        .plus(ptoAmount)
        .plus(adjustAmount)
      expect(totalAmount.value).toEqual(450)
    })
  })
})
