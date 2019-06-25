import { REQUEST, transformRequestResponseOkData } from 'miniprogram-request'

//app.ts
export interface MyApp {
  globalData: {
    date: Date
    clientWidth: number
    menuRect: wx.Rect
    user: UserLogged
  }
  userInfoReadyCallback?(res: wx.UserInfo): void
  /** 初始化请求库 */
  initRequest(): void
  wxLogin(): void
  checkSession(): void
  getAccessToken(): string
  /** 读取数据 */
  fetchData(): void
  /** 获取自定义导航栏样式 */
  getNavigationStyle(): string
  /** 获取导航条总高度 */
  getNavigationHeihgt(): number
}

App<MyApp>({
  onLaunch() {
    this.initRequest()

    const { windowWidth } = wx.getSystemInfoSync()
    this.globalData.menuRect = wx.getMenuButtonBoundingClientRect()
    this.globalData.clientWidth = windowWidth

    console.log('{{VERSION}}') // eslint-disable-line no-console
    // 检查登录态
    this.checkSession()
  },

  initRequest() {
    REQUEST.Defaults.baseURL = '{{BASE_URL}}'
    REQUEST.Defaults.transformResponse = transformRequestResponseOkData
    REQUEST.Defaults.headers = {
      Authorization: null,
    }
    REQUEST.Listeners.onResponse.push(({ statusCode, data }) => {
      if (statusCode < 400) return
      switch (statusCode) {
        case 401:
          wx.removeStorageSync('accessToken')
          this.checkSession()
          break
        case 422:
          wx.showToast({
            title: (data as any).error.message,
            icon: 'none',
          })
          break
      }
      console.error(statusCode, data) // eslint-disable-line no-console
    })
  },

  checkSession() {
    // 检查 session 是否过期 过期就刷新服务端保存的 session_key
    wx.checkSession({
      success: () => {
        if (!wx.getStorageSync('accessToken')) {
          this.wxLogin()
        } else {
          REQUEST.Defaults.headers!.Authorization = `Bearer ${wx.getStorageSync('accessToken')}`
          this.fetchData()
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
        this.fetchData()
      },
    })
  },

  getAccessToken() {
    return wx.getStorageSync('accessToken')
  },

  async fetchData() {
    const user = await REQUEST.get<UserLogged>('/user')
    this.globalData.user = user
    if (user.menstrual) {
      wx.setStorage({ key: 'menstrual', data: user.menstrual })
    }
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
    user: { id: '' },
  },
})
