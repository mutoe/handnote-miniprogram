/*!
 * Page: pages/calendar/Calendar
 * License: MIT
 * Created: 2019-06-03 09:15
 */

import { TabbarData } from '../../custom-tab-bar'

/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

Page({
  data: {},
  onReady() {
    if (this.getTabBar) {
      const tabbar = this.getTabBar<TabbarData>()
      tabbar.setData({ active: 0 })
    }
  },
})
