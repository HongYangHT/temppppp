/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: function description
 * @Date: 2020-01-06 10:11:00
 * @LastEditTime : 2020-01-06 10:20:34
 */
import { SET_TANENT_LIST } from './contants'
export default {
  [SET_TANENT_LIST](state, payload) {
    state.tanentList = payload
  },
}
