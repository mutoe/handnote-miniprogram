import { REQUEST, transformRequestResponseOkData } from 'miniprogram-request'

//app.ts
export interface MyApp {
  globalData: {
    date: Date
    clientWidth: number
    menuRect: wx.Rect
  }
  userInfoReadyCallback?(res: wx.UserInfo): void
  wxLogin(): void
  chechSession(): void
  getAccessToken(): string
  /** 获取自定义导航栏样式 */
  getNavigationStyle(): string
  /** 获取导航条总高度 */
  getNavigationHeihgt(): number
}

App<MyApp>({
  onLaunch() {
    REQUEST.Defaults.baseURL = '{{BASE_URL}}'
    REQUEST.Defaults.transformResponse = transformRequestResponseOkData
    REQUEST.Defaults.headers = {
      Authorization: null,
    }
    const { windowWidth } = wx.getSystemInfoSync()
    this.globalData.menuRect = wx.getMenuButtonBoundingClientRect()
    this.globalData.clientWidth = windowWidth

    console.log('{{VERSION}}') // eslint-disable-line no-console
    // 检查登录态
    this.chechSession()
  },

  chechSession() {
    // 检查 session 是否过期 过期就刷新服务端保存的 session_key
    wx.checkSession({
      success: () => {
        if (!wx.getStorageSync('accessToken')) {
          this.wxLogin()
        } else {
          REQUEST.Defaults.headers!.Authorization = `Bearer ${wx.getStorageSync('accessToken')}`
        }
      },
      fail: () => {
        this.wxLogin()
      },
    })
  },

  wxLogin() {
    wx.login({
      success: async ({ code }) => {
        interface Returns {
          accessToken: string
        }
        const { accessToken } = await REQUEST.get<Returns>('/wechat/login', { code })
        wx.setStorageSync('accessToken', accessToken)
        REQUEST.Defaults.headers!.Authorization = `Bearer ${accessToken}`
      },
    })
  },

  getAccessToken() {
    return wx.getStorageSync('accessToken')
  },

  getNavigationStyle() {
    const r = this.globalData.menuRect
    const padding = this.globalData.clientWidth - r.right
    const height = r.top + r.height + padding
    return `padding: ${r.top}px ${padding}px ${padding}px;height: ${height}px;`
  },
  getNavigationHeihgt() {
    const r = this.globalData.menuRect
    const padding = this.globalData.clientWidth - r.right
    return r.top + r.height + padding
  },

  globalData: {
    date: new Date(),
    clientWidth: 750,
    menuRect: {} as any,
  },
})
