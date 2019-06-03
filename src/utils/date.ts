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
