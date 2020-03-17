/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: function description
 * @Date: 2019-12-31 11:05:39
 * @LastEditTime : 2020-01-15 14:58:25
 */
import { homeService } from '@/utils/http'
import { SET_USER_INFO } from './constants'

export function fetchUserInfo({ commit }, params) {
  return homeService.fetchUserInfo('/user').then(result => {
    if (result && result.data && result.data.code === 200 && result.data.success) {
      commit(SET_USER_INFO, result.data.result)
    }
    return (result && result.data) || {}
  })
}

export function logout({ commit }, params) {
  return homeService.logout('/logout').then(result => {
    return (result && result.data) || {}
  })
}
