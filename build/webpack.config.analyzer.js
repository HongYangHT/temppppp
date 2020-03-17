const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const merge = require('webpack-merge')
const base = require('./webpack.config')
const TerserJSPlugin = require('terser-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const path = require('path')

module.exports = merge(base, {
  output: {
    path: path.resolve(__dirname, '../dist/assets'),
    publicPath: '/assets/',
    libraryTarget: 'umd',
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    umdNamedDefine: true
  },
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
      new OptimizeCSSAssetsPlugin({}) // 压缩css
    ]
  },
  externals: {
    vue: 'lib/vue.js',
    vuex: 'lib/vuex.js',
    'vue-router': 'lib/vue-router.js',
    'vue-i18n': 'lib/vue-i18n.js',
    axios: 'lib/axios.js'
  },
  // 打包后显示优化信息
  performance: {
    maxEntrypointSize: 300000,
    assetFilter: function (file) {
      return file.endsWith('.js')
    }
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'node_modules/vue/dist/vue.min.js',
        to: 'lib/vue.js'
      },
      {
        from: 'node_modules/vue-i18n/dist/vue-i18n.min.js',
        to: 'lib/vue-i18n.js'
      },
      {
        from: 'node_modules/vue-router/dist/vue-router.min.js',
        to: 'lib/vue-router.js'
      },
      {
        from: 'node_modules/vuex/dist/vuex.min.js',
        to: 'lib/vuex.js'
      },
      {
        from: 'node_modules/axios/dist/axios.min.js',
        to: 'lib/axios.js'
      }
    ]),
    new BundleAnalyzerPlugin()
  ]
})
