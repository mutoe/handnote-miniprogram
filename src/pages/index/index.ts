Page({
  data: {
    list: [
      {
        label: '生理期',
        icon: 'bulb-o',
        url: '/pages/setting/menstrual/menstrual',
      },
      {
        label: '设置',
        icon: 'setting-o',
        url: '/pages/setting/index/index',
      },
    ],
  },
  onShow() {
    const tabbar = this.getTabBar()
    tabbar && tabbar.setData({ active: 2 })
  },
})
