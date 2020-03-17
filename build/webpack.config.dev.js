/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 开发环境设置
 * @Date: 2019-12-19 14:54:23
 * @LastEditTime: 2020-03-17 15:33:10
 */
const checkVersion = require('./check-version')

const merge = require('webpack-merge')
const base = require('./webpack.config')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = require('./config')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

checkVersion()

const devWebpackConfig = merge(base, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    libraryTarget: 'umd',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    umdNamedDefine: true
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    clientLogLevel: 'warning',
    hot: true, // 热更新
    open: true, // 是否自动打开浏览器页面
    compress: true, // 是否启用gzip
    host: config.host,
    port: config.port,
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    overlay: true,
    hotOnly: true,
    historyApiFallback: true,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false
    },
    proxy: config.proxy,
    stats: 'minimal'
  },
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host ||
                'localhost'}:${port}`
            ]
          }
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
