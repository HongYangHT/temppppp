/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: vuex 来管理共有状态，并进行模块分层设计
 * @Date: 2019-12-19 16:02:48
 * @LastEditTime : 2020-01-17 10:51:30
 */
import Vuex from 'vuex'
import Vue from 'vue'
// NOTE: 用于缓存vuex的状态
import createPersistedState from 'vuex-persistedstate'
import { getAppCount } from '@/store/utils/lib'
import { KEY_STORE, KEY_APP_COUNT } from '@/store/utils/constants'

import * as actions from './actions'
import mutations from './mutations'
import getters from './getters'

import tanent from './module/tanent'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  state: {
    activeName: '',
    subActiveName: '',
    menuList: [],
    originMenuList: [],
    token: '',
    userInfo: {},
  },
  actions,
  mutations,
  getters,
  modules: {
    tanent,
  },
  // 缓存vuex状态对象
  plugins: [
    createPersistedState({
      key: `${KEY_STORE}-${getAppCount() + 1}`,
      storage: window.sessionStorage,
    }),
  ],
})

window.addEventListener('unload', () => {
  const appCount = getAppCount()
  if (appCount > 1) {
    // 递减应用实例个数
    window.localStorage.setItem(KEY_APP_COUNT, appCount - 1)
  } else {
    window.localStorage.removeItem(KEY_APP_COUNT)
  }
})

export default store
