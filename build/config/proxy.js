/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 代理配置
 * @Date: 2019-12-30 14:54:45
 * @LastEditTime: 2020-02-28 16:49:48
 */
module.exports = {
  proxy: {
    '/api/**': {
      target: 'http://test-pay-gateway.sdongpo.com',
      pathRewrite: {
        '^/api/': ''
      },
      changeOrigin: true,
      secure: false
    }
  }
}
