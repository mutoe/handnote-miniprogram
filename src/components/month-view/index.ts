/*!
 * Component: components/Index/index
 * License: MIT
 * Created: 2019-06-03 15:12
 */

import { getDayInMonth } from '/utils/date'

/** 获取某月的天数组成的数组 */
function getMonthArray(days: number): object[] {
  return new Array(days).fill('').map((v, i) => ({ label: i + 1 }))
}

Component({
  /**
   * Component properties
   */
  properties: {
    date: { type: Number, value: Date.now() },
  },

  /**
   * Component initial data [private]
   */
  data: {
    now: new Date(),
    currentMonth: [] as object[],
    prevMonth: [] as object[],
    nextMonth: [] as object[],
  },

  observers: {
    date() {
      this.initData()
    },
  },

  /**
   * lifecycle of component
   */
  lifetimes: {
    attached() {
      this.initData()
    },
  },

  /**
   * Component methods
   */
  methods: {
    initData() {
      const date = new Date(this.data.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const currentMonth = getMonthArray(getDayInMonth(year, month))
      let firstDayInWeek = new Date(year, month - 1, 1).getDay()
      const prevMonth = getMonthArray(getDayInMonth(year, month - 1)).slice(
        0 - firstDayInWeek || 31,
      )
      const nextMonth = getMonthArray(getDayInMonth(year, month + 1)).slice(
        0,
        7 - ((firstDayInWeek + getDayInMonth(year, month)) % 7),
      )
      this.setData({
        year,
        month,
        day,
        currentMonth,
        prevMonth,
        nextMonth,
      })
    },
  },
})
