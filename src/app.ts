import { REQUEST, transformRequestResponseOkData } from 'miniprogram-request'

//app.ts
export interface MyApp {
  globalData: {}
  userInfoReadyCallback?(res: wx.UserInfo): void
  wxLogin(): void
  chechSession(): void
  getAccessToken(): string
}

App<MyApp>({
  onLaunch() {
    REQUEST.Defaults.baseURL = '{{BASE_URL}}'
    REQUEST.Defaults.transformResponse = transformRequestResponseOkData

    console.log('{{VERSION}}') // eslint-disable-line no-console
    // 检查登录态
    this.chechSession()
  },

  chechSession() {
    // 检查 session 是否过期 过期就刷新服务端保存的 session_key
    wx.checkSession({
      success: () => {
        if (!wx.getStorageSync('accessToken')) this.wxLogin()
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
      },
    })
  },

  getAccessToken() {
    return wx.getStorageSync('accessToken')
  },

  globalData: {},
})
