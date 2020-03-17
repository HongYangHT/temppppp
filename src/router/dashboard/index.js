/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: 子模块
 * @Date: 2019-12-23 11:02:07
 * @LastEditTime : 2020-01-17 13:46:02
 */
const dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/modules/dashboard/index.vue')
export default [
  {
    path: 'dashboard',
    name: 'dashboard',
    component: dashboard,
    meta: {
      title: '支付概况',
      showInMenu: true,
    },
  },
]
