import { MyApp } from '/app'

const app = getApp<MyApp>()

Page({
  data: {
    paddingTop: 0,
  },
  onLoad() {
    const { top, height } = app.globalData.menuRect
    this.setData({ paddingTop: top + height + 10 })
  },
  onAdd() {
    wx.navigateTo({ url: '/pages/event/add/add' })
  },
})
