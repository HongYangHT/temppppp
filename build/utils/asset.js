/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: 静态资源处理，如font文字或者图片加载
 * @Date: 2019-12-18 14:27:17
 * @LastEditTime : 2019-12-30 15:00:47
 */
module.exports = [
  {
    test: /\.(png|jpe?g|gif)(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          // 具体配置见插件官网
          limit: 8192,
          // 具体配置见插件官网
          name: '[name]-[contenthash].[ext]',
          outputPath: 'img/',
          publicPath:
            process.env.NODE_ENV === 'production'
              ? '/assets/img'
              : '/img'
        }
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          },
          gifsicle: {
            interlaced: false
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75
          }
        }
      }
    ]
  },
  {
    test: /\.(svg|woff|woff2|ttf|oft|eot)(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          // 具体配置见插件官网
          limit: 8192,
          // 具体配置见插件官网
          name: '[name]-[contenthash].[ext]',
          outputPath: 'fonts/',
          publicPath:
            process.env.NODE_ENV === 'production'
              ? '/assets/fonts'
              : '/fonts'
        }
      }
    ]
  }
]

