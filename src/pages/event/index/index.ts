/*!
 * Page: pages/event/index/index
 * License: MIT
 * Created: 2019-05-31 10:29
 */

/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

Page({
  data: {},
  onReady() {
    if (this.getTabBar) {
      const tabbar = this.getTabBar()
      tabbar.setData({ active: 1 })
    }
  },
})
