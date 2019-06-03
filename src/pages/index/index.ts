/*!
 * Page: pages/index/Index
 * License: MIT
 * Created: 2019-06-03 11:54
 */

import { TabbarData } from '../../custom-tab-bar'

/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

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
  onReady() {
    if (this.getTabBar) {
      const tabbar = this.getTabBar<TabbarData>()
      tabbar.setData({ active: 2 })
    }
  },
})
