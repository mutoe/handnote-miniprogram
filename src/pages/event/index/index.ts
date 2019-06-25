import { MyApp } from '/app'

const app = getApp<MyApp>()

Page({
  data: {
    paddingTop: 0,
    events: [] as Memorial[],
    typeMap: { birthday: '生日', love: '恋爱纪念日' },
  },
  onLoad() {
    const { top, height } = app.globalData.menuRect
    this.setData({ paddingTop: top + height + 10 })
    let timer = setInterval(() => {
      if (app.globalData.user.id) {
        clearInterval(timer)
        this.initPage()
      }
    }, 50)
  },
  initPage() {
    this.setData({ events: app.globalData.user.memorials || [] })
  },
  onAdd() {
    wx.navigateTo({ url: '/pages/event/add/add' })
  },
  computedDay(date: Date) {
    return new Date(date).getFullYear()
  },
})
