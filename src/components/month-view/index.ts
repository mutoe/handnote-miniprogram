/*!
 * Component: components/Index/index
 * License: MIT
 * Created: 2019-06-03 15:12
 */

import { MenstrualOptions } from '/pages/setting/menstrual/menstrual'
import { getDayInMonth, getDayIsManstrual, ONE_DAY } from '/utils/date'

/** 获取某月的天数组成的数组 */
function getMonthArray(year: number, month: number): object[] {
  const menstrualOptions = wx.getStorageSync('menstrual') as MenstrualOptions
  const days = getDayInMonth(year, month)
  const date = +new Date(year, month - 1, 1)
  return new Array(days).fill('').map((v, i) => ({
    label: i + 1,
    date: date + i * ONE_DAY,
    isMenstrual: getDayIsManstrual(date + i * ONE_DAY, menstrualOptions),
  }))
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
      const currentMonth = getMonthArray(year, month)
      let firstDayInWeek = new Date(year, month - 1, 1).getDay()
      const prevMonth = getMonthArray(year, month - 1).slice(0 - firstDayInWeek || 31)
      const firstDayNextMonth = 7 - ((firstDayInWeek + getDayInMonth(year, month)) % 7)
      const nextMonth = getMonthArray(year, month + 1).slice(0, firstDayNextMonth)
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
