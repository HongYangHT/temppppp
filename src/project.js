/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-03-17 14:40:52
 * @LastEditTime: 2020-03-17 14:46:29
 */
export const params = {
  name: 'saas-etcloud-permission', // 子项目名，用于隔离css
  main: 'http://localhost:8000/saas-etcloud-permission-app/js/single-spa.js', // 入口文件
  store: 'http://localhost:8000/saas-etcloud-permission-app/js/store.js', // 传递的数据入口
  base: false, // 是否是默认进入的子项目
  mode: 'history', // 路由的模式
  path: '/saas-etcloud-permission', // 路由前缀
  libCss: ['/saas-etcloud-permission-app/css/single-spa.css'] // 需要加载的css
}
