/** 基础开关 */
declare enum BaseStatus {
  DISABLED,
  ENABLE,
}

type DateLike = Date | string | number

/** 生理期设置选项 */
declare interface MenstrualOptions {
  /** 开关 0:关 1:开 */
  status: BaseStatus
  /** 起始日期 */
  lastDate: DateLike
  /** 持续时间 */
  duration: number
  /** 周期 */
  cycle: number
}

/** 纪念日 */
declare interface Memorial {
  type: 'birthday' | 'love'
  date: DateLike
  person: string
}

/** 登录用户 */
declare interface UserLogged {
  /** 用户id */
  id: string
  menstrual?: MenstrualOptions
  memorials?: Memorial[]
}
