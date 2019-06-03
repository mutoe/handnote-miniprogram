/*!
 * Page: pages/calendar/Calendar
 * License: MIT
 * Created: 2019-06-03 09:15
 */

import { TabbarData } from '../../custom-tab-bar'
import { MyApp } from '/app'
import { getDayInMonth, getLastMonth } from '/utils/date'

const app = getApp<MyApp>()

let lastLayer: 0 | 1 | 2 = 0

Component({
  data: {
    layers: [0, 0, 0],
    currentLayer: 0,
    pickerDate: '1970-01',
    navigationTitle: `掌心日历`,
    navigationStyle: '',
    navigationHeight: 0,
  },
  observers: {
    currentLayer(index: number) {
      const timestamp = this.data.layers[index]
      this.updateView(timestamp)
      const d = new Date(timestamp)
      this.setData({ pickerDate: `${d.getFullYear()}-${d.getMonth() + 1}` })
    },
  },
  lifetimes: {
    attached() {
      const rect = app.globalData.menuRect
      if (this.getTabBar) {
        const tabbar = this.getTabBar<TabbarData>()
        tabbar.setData({ active: 0 })
      }
      this.initCalendar()
      this.setData({
        rect,
        navigationStyle: app.getNavigationStyle(),
        navigationHeight: app.getNavigationHeihgt(),
      })
    },
  },
  methods: {
    /** 回到今天, 为了实现正确的左右滑动效果, 不直接调用 initCalendar 方法 */
    gotoToday() {
      const { layers, currentLayer } = this.data
      const current = layers[currentLayer]
      const now = new Date()
      const index = +now > current ? 1 : 2
      // 设置将要跳转到的图层并跳转
      this.setData({
        [`layers[${(currentLayer + index) % 3}]`]: +new Date(),
        currentLayer: (currentLayer + index) % 3,
      })
      // 设置剩余两个图层
      const year = now.getFullYear()
      const month = now.getMonth()
      this.setData({
        [`layers[${(currentLayer + index + 1) % 3}]`]: +new Date(year, month + 1),
        [`layers[${(currentLayer + index + 2) % 3}]`]: +new Date(year, month - 1),
      })
      // this.initCalendar()
    },
    initCalendar(date: number | string | Date = new Date()) {
      const now = new Date(date)
      const year = now.getFullYear()
      const month = now.getMonth()
      const layers = [
        +new Date(year, month, 1),
        +new Date(year, month + 1, 1),
        +new Date(year, month - 1),
      ]
      this.setData({ layers, currentLayer: 0 })
    },
    updateView(date: number | Date) {
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
        navigationTitle: `${date.getFullYear()}年 ${date.getMonth() + 1}月`,
      })
    },
    onChangeMonth(event: any) {
      const layer: 0 | 1 | 2 = event.detail.current
      if (layer === (lastLayer + 1) % 3) {
        // 下一页
        this.setData({
          [`layers[${(layer + 1) % 3}]`]: getLastMonth(this.data.layers[layer], 1),
          currentLayer: layer,
        })
      } else {
        // 上一页
        this.setData({
          [`layers[${(layer + 2) % 3}]`]: getLastMonth(this.data.layers[layer]),
          currentLayer: layer,
        })
      }
      lastLayer = layer
    },
    onSelectMonth(event: any) {
      const str: string = event.detail.value
      const [year, month] = str.split('-').map((i) => +i)
      const date = new Date(year, month - 1, 1)
      this.initCalendar(date)
    },
  },
})
