/** 一天的毫秒数 */
export const ONE_DAY = 24 * 3600 * 1000

/** 日期值 */
export type DateLike = Date | string | number

/**
 * 获取某月有多少天
 */
export function getDayInMonth(year: number, month: number): number {
  const date = new Date(year, month, 0)
  return date.getDate()
}

/**
 * 获取上月1日的日期
 */
export function getLastMonth(date: number | Date, offset = -1): number {
  date = new Date(date)
  return +new Date(date.getFullYear(), date.getMonth() + offset, 1)
}

/**
 * 获取某天是否是生理期
 * @param [date] 某天日期, 不填则当天
 * @param [menstrualOptions] 生理期设置, 不填则从配置获取
 */
export function getDayIsManstrual(date?: DateLike, menstrualOptions?: MenstrualOptions): boolean {
  const options: MenstrualOptions = menstrualOptions ||
    wx.getStorageSync('menstrual') || { status: 0 }
  if (!options.status) return false
  const current = date ? +new Date(date) : Date.now()
  const start = +new Date(options.lastDate)
  const offsetDay = (current - start) / ONE_DAY
  const dayInCycle = offsetDay % options.cycle
  const isInDuration = dayInCycle - options.duration <= 0
  return isInDuration
}

/** 获取某天的日期是否是今天 */
export function getDayIsToday(date: DateLike): boolean {
  date = new Date(date)
  const now = new Date()
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  )
}
