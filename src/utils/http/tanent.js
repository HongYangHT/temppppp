/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 进件列表
 * @Date: 2020-01-06 09:57:43
 * @LastEditTime: 2020-02-28 16:57:28
 */

import BaseService from './base'

class TanentService extends BaseService {
  constructor(options) {
    super(options)
    this.baseUrl = options.baseUrl
  }

  /**
   * 查询商家列表
   * @param {String} path 路径
   * @param {Object} options 传入参数
   */
  fetchTanents(path, options = {}) {
    return this.get(path, options)
  }

  /**
   * 查询进件详情
   * @param {STring} path
   * @param {Object} options
   */
  fetchTanentById(path, options = []) {
    return this.get(path, options)
  }

  /**
   * 同步支付表
   * @param {String} path
   * @param {Object} options
   */
  asycAdapay(path, options = {}) {
    return this.post(path, options)
  }

  /**
   * 商家入驻业务配置
   * @param {String} path
   * @param {Object} options
   */
  payConfig(path, options = {}) {
    return this.post(path, options)
  }

  /**
   * 商家业务配置的详情
   * @param {String} path
   * @param {Object} options
   */
  fetchPayConfig(path, options = {}) {
    return this.get(path, options)
  }

  /**
   * 查询城市列表
   * @param {String} path
   * @param {Object} options
   */
  cityCodeList(path, options = {}) {
    return this.get(path, options)
  }

  /**
   * 进件
   * @param {*} path
   * @param {*} options
   */
  openPay(path, options = {}) {
    return this.post(path, options)
  }

  /**
   * 模糊查询银行
   * @param {*} path
   * @param {*} options
   */
  fetchBanks(path, options = {}) {
    return this.get(path, options)
  }

  /**
   * 实名认证成功
   * @param {*} path
   * @param {*} options
   */
  updateVerify(path, options = {}) {
    return this.put(path, options)
  }
}

export default TanentService
