/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: function description
 * @Date: 2020-01-06 10:10:43
 * @LastEditTime : 2020-01-06 10:27:12
 */
import * as actions from './actions'
import mutations from './mutations'
export default {
  namespaced: true,
  state: {
    tanentList: [],
  },
  actions,
  mutations,
}
