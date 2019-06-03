/**
 * 获取某月有多少天
 */
export function getDayInMonth(year: number, month: number): number {
  const date = new Date(year, month, 0)
  return date.getDate()
}
