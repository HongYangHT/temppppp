/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: function description
 * @Date: 2020-01-03 11:44:05
 * @LastEditTime : 2020-01-09 10:57:41
 */
const tanent = () => import(/* webpackChunkName: "tanent-list" */ '@/modules/tanent/index.vue')
const config = () => import(/* webpackChunkName: "tanent-config" */ '@/modules/tanent/config.vue')
const newUser = () => import(/* webpackChunkName: "tanent-newUser" */ '@/modules/tanent/new-user.vue')
const detailUser = () => import(/* webpackChunkName: "tanent-detail" */ '@/modules/tanent/detail.vue')

export default [
  {
    path: 'tanent-list',
    name: 'tanentList',
    component: tanent,
    meta: {
      title: '商户列表',
      showInMenu: true,
    },
  },
  {
    path: 'config',
    name: 'tanentConfig',
    component: config,
    meta: {
      title: '业务配置',
      showInMenu: false,
    },
  },
  {
    path: 'new-user',
    name: 'newUser',
    meta: {
      title: '新增用户',
      showInMenu: false,
    },
    component: newUser,
  },
  {
    path: 'edit-user',
    name: 'editUser',
    meta: {
      title: '编辑用户',
      showInMenu: false,
    },
    component: newUser,
  },
  {
    path: 'detail',
    name: 'detail',
    meta: {
      title: '用户详情',
      showInMenu: false,
    },
    component: detailUser,
  },
]
