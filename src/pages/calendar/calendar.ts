/*!
 * Page: pages/calendar/Calendar
 * License: MIT
 * Created: 2019-06-03 09:15
 */

import { TabbarData } from '../../custom-tab-bar'
import { MyApp } from '/app'
import { getDayInMonth } from '/utils/date'

const app = getApp<MyApp>()

const ONE_MONTH_TIME = 30 * 24 * 3600 * 1000

let lastLayer: 0 | 1 | 2 = 0

Component({
  data: {
    layers: [Date.now(), Date.now() + ONE_MONTH_TIME, Date.now() - ONE_MONTH_TIME],
    animateDuration: 500,
  },

  lifetimes: {
    attached() {
      if (this.getTabBar) {
        const tabbar = this.getTabBar<TabbarData>()
        tabbar.setData({ active: 0 })
      }
      this.setViewHeight(this.data.layers[0])
    },
  },
  methods: {
    setViewHeight(date: number | Date) {
      date = new Date(date)
      const days = getDayInMonth(date.getFullYear(), date.getMonth() + 1)
      const cellWidth = app.globalData.clientWidth / 7
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
      let row = 5
      if (days === 28 && firstDay === 0) {
        row = 4
      } else if ((days >= 30 && firstDay === 6) || (days === 31 && firstDay >= 5)) {
        row = 6
      }
      this.setData({
        viewHeight: cellWidth * row,
      })
      wx.setNavigationBarTitle({
        title: `${date.getFullYear()}年 ${date.getMonth() + 1}月`,
      })
    },
    onChangeMonth(event: any) {
      const layer: 0 | 1 | 2 = event.detail.current
      if (layer === (lastLayer + 1) % 3) {
        // 下一页
        this.setData({
          [`layers[${(layer + 1) % 3}]`]: this.data.layers[layer] + ONE_MONTH_TIME,
        })
      } else {
        // 上一页
        this.setData({
          [`layers[${(layer + 2) % 3}]`]: this.data.layers[layer] - ONE_MONTH_TIME,
        })
      }
      lastLayer = layer
      this.setViewHeight(this.data.layers[layer])
    },
  },
})
