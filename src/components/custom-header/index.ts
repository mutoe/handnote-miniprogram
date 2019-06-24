/*!
 * Component: components/Index/index
 * License: MIT
 * Created: 2019-06-17 15:23
 */

import { MyApp } from '/app'

const app = getApp<MyApp>()

Component({
  options: {
    multipleSlots: true,
  },

  /**
   * Component properties
   */
  properties: {
    title: { type: String, value: '' },
  },

  /**
   * Component initial data [private]
   */
  data: {
    titleStyle: '',
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
        headerStyle: `height: ${height}px; padding-top: ${top}px;`,
        capsuleStyle: `top: ${top}px;height: ${height}px;left: ${left}px;width: ${width / 2}px;`,
      })
    },
  },

  /**
   * Component methods
   */
  methods: {},
})
