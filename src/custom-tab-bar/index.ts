/*!
 * Component: components/Index/index
 * License: MIT
 * Created: 2019-05-31 10:24
 */

/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

/** 自定义 tabbar 实例的 data */
export interface TabbarData {
  /** 当前激活的标签 index */
  active: 0 | 1 | 2 | 3
  /** 标签数组 */
  list: {
    /** 显示的名称 */
    label: string
    /** 徽标数量 */
    info?: number
    /** 图标 */
    icon: string
    /** 路径 */
    path: string
  }[]
}

Component({
  /**
   * Component properties
   */
  properties: {},

  /**
   * Component initial data [private]
   */
  data: {
    active: 0,
    list: [
      {
        label: '日历',
        icon: 'calender-o',
        path: '/pages/calendar/calendar',
      },
      {
        label: '事件',
        icon: 'todo-list-o',
        path: '/pages/event/index/index',
      },
      {
        label: '更多',
        icon: 'apps-o',
        path: '/pages/index/index',
      },
    ],
  } as TabbarData,

  /**
   * lifecycle of component
   */
  lifetimes: {},

  /**
   * Component methods
   */
  methods: {
    onChange(event: any) {
      const index: number = event.detail
      wx.switchTab({ url: this.data.list[index].path })
      this.setData({
        active: this.data.active,
      })
    },
  },
})
