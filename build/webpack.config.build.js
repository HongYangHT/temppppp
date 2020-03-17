/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 生产环境设置
 * @Date: 2019-12-19 14:54:12
 * @LastEditTime: 2020-03-17 16:35:09
 */
const merge = require('webpack-merge')
const base = require('./webpack.config')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const path = require('path')

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const CompileEnd = require('./webpack-plugins/compile-end')

const chalk = require('chalk')
const ora = require('ora')
const CopyPlugin = require('copy-webpack-plugin')

const spinner = ora('building for production...')

const smp = new SpeedMeasurePlugin()
module.exports = smp.wrap(
  merge(base, {
    output: {
      path: path.resolve(__dirname, '../dist/assets'),
      publicPath: '/assets/',
      libraryTarget: 'umd',
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[chunkhash].js',
      umdNamedDefine: true
    },
    // externals: {
    //   vue: '/assets/lib/vue.js',
    //   vuex: '/assets/lib/vuex.js',
    //   'vue-router': '/assets/lib/vue-router.js',
    //   'vue-i18n': '/assets/lib/vue-i18n.js',
    //   axios: '/assets/lib/axios.js'
    // },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            test: module => {
              return (
                /[\\/]node_modules[\\/]/.test(module.context) &&
                !/react|redux|prop-types/.test(module.context) &&
                !/vue|vuex|vue-router/.test(module.context)
              )
            },
            chunks: 'initial',
            name: 'commons',
            minSize: 0,//如果模块的大小大于多少的话才需要提取
            minChunks: 2,//最少最几个chunk引用才需要提取
            priority: -20
          },
          vendors:{
            test: module => {
              return (
                /[\\/]node_modules[\\/]/.test(module.context) &&
                !/react|redux|prop-types/.test(module.context) &&
                !/vue|vuex|vue-router/.test(module.context)
              )
            },
            chunks: 'initial',//指定分割的类型，默认3种选项 all async initial
            name: 'vendors',//给分割出去的代码块起一个名字叫vendors
            priority: -10 //优先级
          },
          vueBase: {
            name: 'vueBase',
            test: module => {
              return /vue|vuex|vue-router/.test(module.context)
            },
            chunks: 'initial',
            priority: 12
          },
          componentCommon: {
            name: 'component-commons',
            test: path.resolve(__dirname, '../src/components'), // 可自定义拓展你的规则
            minChunks: 2, // 最小共用次数
            priority: 5,
            reuseExistingChunk: true
          },
          commonStyle: {
            name: 'commonStyle',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
            priority: 20
          }
        }
      },
      runtimeChunk: {
        name: 'manifest'
      },
      minimizer: [
        new TerserJSPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            output: {
              comments: false,
              beautify: false
            },
            warnings: false,
            compress: {
              // 删除所有的 `console` 语句
              // 还可以兼容ie浏览器
              drop_console: true,
              // 内嵌定义了但是只用到一次的变量
              collapse_vars: true,
              // 提取出出现多次但是没有定义成变量去引用的静态值
              reduce_vars: true,
              warnings: false
            }
          }
        }),
        // new UglifyJsPlugin({
        //   // 有很多可以配置
        //   cache: true,
        //   parallel: true,
        //   sourceMap: true,
        //   uglifyOptions: {
        //     // 在UglifyJs删除没有用到的代码时不输出警告
        //     warnings: false,
        //     output: {
        //       // 删除所有的注释
        //       comments: false,
        //       // 最紧凑的输出
        //       beautify: false
        //     },
        //     compress: {
        //       // 删除所有的 `console` 语句
        //       // 还可以兼容ie浏览器
        //       drop_console: true,
        //       // 内嵌定义了但是只用到一次的变量
        //       collapse_vars: true,
        //       // 提取出出现多次但是没有定义成变量去引用的静态值
        //       reduce_vars: true
        //     }
        //   }
        // }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    // 打包后显示优化信息
    performance: {
      maxEntrypointSize: 300000,
      assetFilter: function (file) {
        return file.endsWith('.js')
      }
    },
    plugins: [
      // new CopyPlugin([
      //   {
      //     from: 'node_modules/vue/dist/vue.js',
      //     to: 'lib/vue.js'
      //   },
      //   {
      //     from: 'node_modules/vue-i18n/dist/vue-i18n.js',
      //     to: 'lib/vue-i18n.js'
      //   },
      //   {
      //     from: 'node_modules/vue-router/dist/vue-router.js',
      //     to: 'lib/vue-router.js'
      //   },
      //   {
      //     from: 'node_modules/vuex/dist/vuex.js',
      //     to: 'lib/vuex.js'
      //   },
      //   {
      //     from: 'node_modules/axios/dist/axios.js',
      //     to: 'lib/axios.js'
      //   }
      // ]),
      new CompileEnd(stats => {
        spinner.stop()
        console.log('\n')
        console.log(chalk.cyan('  Compile complete.\n'))
        console.log(chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
          '  Opening index.html over file:// won\'t work.\n'
        ))
      }, err => {
        console.log(chalk.red('  Compile failed.\n'))
        throw new Error(err)
      })
    ]
  })
)
