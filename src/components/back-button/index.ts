/*!
 * Component: components/Index/index
 * License: MIT
 * Created: 2019-06-17 15:11
 */

import { MyApp } from '/app'

const app = getApp<MyApp>()

Component({
  /**
   * Component properties
   */
  properties: {},

  /**
   * Component initial data [private]
   */
  data: {
    capsuleStyle: '',
    top: 0,
    height: 0,
  },

  /**
   * lifecycle of component
   */
  lifetimes: {
    attached() {
      const position = app.globalData.menuRect
      const { height, top, width, right } = position
      const left = app.globalData.clientWidth - right
      this.setData({
        width,
        height,
        right,
        top,
        capsuleStyle: `top: ${top}px;height: ${height}px;left: ${left}px;width: ${width / 2}px;`,
      })
    },
  },

  /**
   * Component methods
   */
  methods: {
    goBack() {
      const pages = getCurrentPages()
      if (pages.length === 1) wx.reLaunch({ url: '/pages/index/index' })
      else wx.navigateBack({ delta: 1 })
    },
  },
})
