/*!
 * Page: pages/setting/menstrual/Menstrual
 * License: MIT
 * Created: 2019-05-31 14:06
 */

/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

Page({
  data: {
    enable: false,
    lastDate: Date.now(),
    now: Date.now(),
    duration: 6,
    cycle: 28,

    durations: new Array(14).fill('').map((v, i) => `${i + 1} 天`),
    cycles: new Array(90).fill('').map((v, i) => `${i + 14} 天`),
  },

  onChangeEnable() {
    this.setData({ enable: !this.data.enable })
  },
  onChangeLastDate(event: any) {
    const dateStr = event.detail.value
    const date = new Date(dateStr.replace(/-/g, '/'))
    this.setData({ lastDate: +date })
  },
  onChangeDuration(event: any) {
    const { index } = event.detail.value
    this.setData({ duration: +index + 1 })
  },
  onChangeCycle(event: any) {
    const { index } = event.detail.value
    this.setData({ duration: +index + 14 })
  },
})
