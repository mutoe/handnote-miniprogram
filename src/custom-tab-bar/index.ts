/*!
 * Component: components/Index/index
 * License: MIT
 * Created: 2019-06-29 16:51
 */

const list = [
  {
    pagePath: '/pages/calendar/calendar',
    text: '日历',
    iconPath: '/images/rili.png',
    selectedIconPath: '/images/rili_active.png',
    icon: 'calender-o',
  },
  {
    pagePath: '/pages/event/index/index',
    text: '事件',
    iconPath: '/images/dingdan.png',
    selectedIconPath: '/images/dingdan_active.png',
    icon: 'notes-o',
  },
  {
    pagePath: '/pages/index/index',
    text: '更多',
    iconPath: '/images/gengduo.png',
    selectedIconPath: '/images/gengduo_active.png',
    icon: 'apps-o',
  },
]

Component({
  data: {
    list,
    active: 0,
  },
  methods: {
    onChange(event: any) {
      const index: number = event.detail
      const page = list[index]
      this.setData({ active: index })
      wx.switchTab({ url: page.pagePath })
    },
  },
})
