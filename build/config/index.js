/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: 相关配置
 * @Date: 2019-12-30 14:53:39
 * @LastEditTime : 2020-01-13 15:54:39
 */
const proxy = require('./proxy')
module.exports = {
  ...proxy,
  port: 9000,
  // host: '0.0.0.0'
  host: 'localhost',
  useEslint: true,
  autoFix: true
}
