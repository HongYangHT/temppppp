/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: vue loader 设置
 * @Date: 2019-12-19 14:17:17
 * @LastEditTime : 2019-12-30 15:01:41
 */
module.exports = [
  {
    test: /\.vue$/,
    use: [
      {
        loader: 'vue-loader',
        options: {}
      },
      {
        loader: 'iview-loader',
        options: {
          prefix: false
        }
      }
    ]
  }
]
