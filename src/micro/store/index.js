/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 作为数据总线在APP之间传输
 * @Date: 2019-08-05 10:35:23
 * @LastEditTime: 2019-08-05 11:14:37
 */

import mutations from './mutations'

export const store = {
  namespaced: true,
  state: {
    functionList: null,
    loginInfo: null,
    token: null,
    functionTree: null,
    subList: null,
    pageList: null
  },
  mutations
}
