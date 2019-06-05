/*!
 * Page: pages/setting/menstrual/Menstrual
 * License: MIT
 * Created: 2019-05-31 14:06
 */

import { REQUEST } from 'miniprogram-request'
import { BaseStatus } from '/common'

/** 生理期设置选项 */
export interface MenstrualOptions {
  /** 开关 0:关 1:开 */
  status: BaseStatus
  /** 起始日期 */
  lastDate: string
  /** 持续时间 */
  duration: number
  /** 周期 */
  cycle: number
}

let loading = true

Component({
  data: {
    enable: false,
    lastDate: Date.now(),
    now: Date.now(),
    duration: 6,
    cycle: 28,

    durations: new Array(14).fill('').map((v, i) => `${i + 1} 天`),
    cycles: new Array(90).fill('').map((v, i) => `${i + 14} 天`),
  },
  observers: {
    'enable,lastDate,duration,cycle'(
      enable: boolean,
      lastDate: number,
      duration: number,
      cycle: number,
    ) {
      if (loading) return
      const status = enable ? 1 : 0
      const data = { status, lastDate, duration, cycle }
      wx.setStorage({ key: 'menstrual', data })
      REQUEST.post('/menstrual', { ...data, enable })
    },
  },
  lifetimes: {
    attached() {
      const { status, lastDate, duration, cycle } = wx.getStorageSync('menstrual')
      const enable = !!status
      this.setData({ enable, lastDate, duration, cycle })
      loading = false
    },
  },
  methods: {
    onChangeEnable() {
      this.setData({ enable: !this.data.enable })
    },
    onChangeLastDate(event: any) {
      const dateStr = event.detail.value
      const date = new Date(dateStr.replace(/-/g, '/'))
      this.setData({ lastDate: +date })
    },
    onChangeDuration(event: any) {
      const index: string = event.detail.value
      this.setData({ duration: +index + 1 })
    },
    onChangeCycle(event: any) {
      const index: string = event.detail.value
      this.setData({ cycle: +index + 14 })
    },
  },
})
