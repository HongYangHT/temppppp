/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 抛出请求
 * @Date: 2019-06-27 15:11:19
 * @LastEditTime: 2020-03-17 15:53:08
 */
import TanentService from './tanent'
import HomeService from './home'
import config from './config'
import { Message } from 'view-design'
import { localStore } from '@/utils/storage'
import { TOKEN } from '@/constants'

export const tanentService = new TanentService({
  baseUrl: process.env.NODE_ENV === 'production' ? config.production : config.development,
  basePath: 'business/adapay',
  // NOTE: 用户处理状态码不为 200 的情况
  responseError: error => {
    if (error && error.response && error.response.status === 401) {
      // window.location.search = ''
      localStore.remove(TOKEN)
      // window.location.href = '//sso.sdongpo.com/?action=logout#/login'
    } else if (error && error.response && error.response.status !== 200) {
      if (error && error.response && error.response.data && error.response.data.message) {
        Message.error({
          content: error.response.data.message,
          duration: 3,
        })
      } else {
        Message.error({
          content: '系统繁忙，请稍后再试！',
          duration: 3,
        })
      }
    }
  },
  requestError: error => {},
  // NOTE: 相应拦截器
  responseInterceptor: config => {
    if ((config && config.status === 401) || (config && config.data && config.data.code === 401)) {
      // window.location.search = ''
      localStore.remove(TOKEN)
      // window.location.href = '//sso.sdongpo.com/?action=logout#/login'
    } else if (config && config.data && config.data.code !== 200 && !config.data.success) {
      Message.error({
        content: config.data && config.data.message,
        duration: 3,
      })
    }
    return config
  },
  // NOTE: 请求拦截器
  requestInterceptor: config => {
    let token = localStore.get(TOKEN) || ''
    if (token) {
      config.headers.common['Authorization'] = token
    }
    if (config.method.toLowerCase() === 'post') {
      config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return config
  },
})

export const homeService = new HomeService({
  baseUrl: process.env.NODE_ENV === 'production' ? config.production : config.development,
  basePath: 'admin/sso',
  // NOTE: 用户处理状态码不为 200 的情况
  responseError: error => {
    if (error && error.response && error.response.status === 401) {
      // window.location.search = ''
      localStore.remove(TOKEN)
      // window.location.href = '//sso.sdongpo.com/?action=logout#/login'
    } else if (error && error.response && error.response.status !== 200) {
      if (error && error.response && error.response.data && error.response.data.message) {
        Message.error({
          content: error.response.data.message,
          duration: 3,
        })
      } else {
        Message.error({
          content: '系统繁忙，请稍后再试！',
          duration: 3,
        })
      }
    }
  },
  requestError: error => {},
  // NOTE: 相应拦截器
  responseInterceptor: config => {
    if ((config && config.status === 401) || (config && config.data && config.data.code === 401)) {
      // window.location.search = ''
      localStore.remove(TOKEN)
      // window.location.href = '//sso.sdongpo.com/?action=logout#/login'
    } else if (config && config.data && config.data.code !== 200 && !config.data.success) {
      Message.error({
        content: config.data && config.data.message,
        duration: 3,
      })
    }
    return config
  },
  // NOTE: 请求拦截器
  requestInterceptor: config => {
    let token = localStore.get(TOKEN) || ''
    if (token) {
      config.headers.common['Authorization'] = token
    }
    if (config.method.toLowerCase() === 'post') {
      config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return config
  },
})
