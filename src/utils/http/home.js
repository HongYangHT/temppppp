/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: home service
 * @Date: 2019-06-27 16:36:41
 * @LastEditTime : 2020-01-15 14:45:41
 */
import BaseService from './base'

class HomeService extends BaseService {
  constructor(options) {
    super(options)
    this.baseUrl = options.baseUrl
  }

  /**
   * 查询用户信息
   * @param {string} path
   * @param {Object} options
   */
  fetchUserInfo(path, options) {
    return this.get(path, options)
  }

  /**
   * 查询页面接口
   * @param {String} path
   * @param {Object} options
   */
  logout(path, options) {
    return this.post(path, options)
  }
}

export default HomeService
