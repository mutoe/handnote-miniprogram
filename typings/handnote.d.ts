/** 基础开关 */
declare enum BaseStatus {
  DISABLED,
  ENABLE,
}

/** 生理期设置选项 */
declare interface MenstrualOptions {
  /** 开关 0:关 1:开 */
  status: BaseStatus
  /** 起始日期 */
  lastDate: string
  /** 持续时间 */
  duration: number
  /** 周期 */
  cycle: number
}
