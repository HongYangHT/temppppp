/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: function description
 * @Date: 2019-12-31 11:05:39
 * @LastEditTime : 2020-01-15 14:51:15
 */
import { SET_ACTIVENAME, SET_SUB_ACTIVENAME, SET_MENU_LIST, SET_ORIGIN_MENU_LIST, SET_TOKEN, SET_USER_INFO } from './constants'

export default {
  [SET_ACTIVENAME](state, payload) {
    state.activeName = payload
  },
  [SET_SUB_ACTIVENAME](state, payload) {
    state.subActiveName = payload
  },
  [SET_MENU_LIST](state, payload) {
    state.menuList = payload
  },
  [SET_ORIGIN_MENU_LIST](state, payload) {
    state.originMenuList = payload
  },
  [SET_TOKEN](state, payload) {
    state.token = payload
  },
  [SET_USER_INFO](state, payload) {
    state.userInfo = payload
  },
}
