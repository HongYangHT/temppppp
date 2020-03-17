/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: function description
 * @Date: 2019-12-30 15:05:15
 * @LastEditTime : 2019-12-30 17:01:10
 */
import { KEY_APP_COUNT } from '@/store/utils/constants'

export function getAppCount() {
  let count = parseInt(window.localStorage.getItem(KEY_APP_COUNT), 10)
  if (isNaN(count)) {
    count = 0
  }
  return count
}
