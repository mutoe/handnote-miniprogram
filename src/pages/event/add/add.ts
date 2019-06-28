/*!
 * Page: pages/event/add/Add
 * License: MIT
 * Created: 2019-06-17 16:20
 */

import { REQUEST } from 'miniprogram-request'
import { formatDate } from '/utils/date'

interface MemorialType {
  name: 'love' | 'birthday'
  label: string
}

const types: MemorialType[] = [{ name: 'birthday', label: '生日' }, { name: 'love', label: '恋爱纪念日' }]

Page({
  data: {
    types,
    typeIndex: 0,

    date: formatDate(new Date(), 'YYYY-MM-DD'),
    person: '',
    personMessage: '',
  },
  onTypeChange(event: event.Custom) {
    const value = event.detail.value as number
    this.setData({ typeIndex: value })
  },
  onDateChange(event: event.Custom) {
    const value = event.detail.value as string
    this.setData({ date: value })
  },
  onPersonInput(event: Weapp.Event) {
    const person = event.detail
    this.setData({ person, personMessage: '' })
  },
  onSubmitWithoutBack() {
    this.submit(() => {
      this.setData({ person: '' })
    })
  },
  onSubmit() {
    this.submit(() => {
      wx.navigateBack({ delta: 1 })
    })
  },
  async submit(callback = () => {}) {
    const [year, month, day] = this.data.date.split('-').map((i) => +i)
    const form = {
      type: types[this.data.typeIndex].name,
      date: new Date(year, month - 1, day),
      person: this.data.person,
    }
    if (form.type === 'birthday' && !form.person) {
      this.setData({ personMessage: '请输入寿星名字' })
      return
    }
    await REQUEST.post('/memorial', form)
    wx.showToast({ title: '添加成功' })
    callback()
  },
})
