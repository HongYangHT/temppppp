/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 路由都需要做模块分层设计
 * @Date: 2019-12-18 11:46:46
 * @LastEditTime: 2020-03-17 15:51:56
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { MENU_LIST, ORIGIN_MENU_LIST } from '@/constants'
import { SET_MENU_LIST, SET_ORIGIN_MENU_LIST } from '@/store/constants'
import { localStore } from '@/utils/storage'
import pkg from '../../package.json'
// NOTE: 路由做到分层设计
import dashboard from './dashboard'
import tanent from './tanent'

import { GetUrlParam } from '@/utils/utils'
import { TOKEN } from '@/constants'
import { SET_TOKEN } from '@/store/constants'

/**
 * 重写路由的push方法，解决 `Navigating to current location is not allowed`
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

let tanentChildren = tanent.filter(item => item.meta.showInMenu)
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "index" */ '@/modules/index.vue'),
    meta: {
      title: '首页',
      icon: 'ios-home',
    },
    children: [...dashboard],
  },
  {
    path: '/tanent',
    name: 'tanent',
    component: () => import(/* webpackChunkName: "tanent-index" */ '@/modules/index.vue'),
    meta: {
      title: '商户',
      icon: 'ios-people',
    },
    children: [...tanent],
  },
]

const menuList = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "index" */ '@/modules/index.vue'),
    meta: {
      title: '首页',
      icon: 'ios-home',
    },
    children: [...dashboard],
  },
  {
    path: '/tanent',
    name: 'tanent',
    component: () => import(/* webpackChunkName: "tanent-index" */ '@/modules/index.vue'),
    meta: {
      title: '商户',
      icon: 'ios-people',
    },
    children: [...tanentChildren],
  },
]

store.commit(SET_MENU_LIST, menuList)
store.commit(SET_ORIGIN_MENU_LIST, routes)
localStore.set(MENU_LIST, menuList)
localStore.set(ORIGIN_MENU_LIST, routes)

let router = new Router({
  mode: 'history',
  // base: `/${pkg.name}/`,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
  routes: [
    ...routes,
    {
      // 会匹配所有路径
      path: '/403/:lang',
      name: '403',
      component: () => import(/* webpackChunkName: "403" */ '@/modules/exception/403.vue'),
    },
    {
      // 会匹配所有路径
      path: '/500/:lang',
      name: '500',
      component: () => import(/* webpackChunkName: "500" */ '@/modules/exception/500.vue'),
    },
    {
      // 会匹配所有路径
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '@/modules/exception/404.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  // let { jwt = '' } = GetUrlParam()
  // jwt = jwt || localStore.get(TOKEN)
  // if (jwt) {
  //   localStore.set(TOKEN, jwt)
  //   store.commit(SET_TOKEN, jwt)
  //   // window.location.search = ''
  //   next()
  // } else {
  //   // window.location.search = ''
  //   localStore.remove(TOKEN)
  //   window.location.href = '//sso.sdongpo.com/?action=logout#/login'
  // }
  next()
})

export default router
