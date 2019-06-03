/*!
 * Page: pages/setting/index/Index
 * License: MIT
 * Created: 2019-05-31 13:58
 */

/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

Page({
  data: {},
  onReady() {
    if (this.getTabBar) {
      const tabbar = this.getTabBar()
      tabbar.setData({ active: 3 })
    }
  },
})
