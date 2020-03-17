/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 入口文件
 * @Date: 2019-12-18 11:44:22
 * @LastEditTime: 2020-03-17 15:49:41
 */
import Vue from 'vue'
import App from './modules/app.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import singleSpaVue from '@/micro'
import pkg from '../package.json'

// NOTE: 采取懒加载的模式
// import 'view-design/dist/styles/iview.css'
/* 全局注册是为了调用实例模式 */
import { Modal, Message } from 'view-design'

import 'normalize.css'

import '@/assets/scss/theme/index.less'
import '@/assets/scss/_index.scss'

import i18nManager from '@/utils/i18n'

Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

// 将路由状态同步到store中
sync(store, router)

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || navigator.language || 'zh-CN'
  i18nManager.loadLanguageAsync(lang).then(() => next())
})

if (module.hot) {
  module.hot.accept()
}

new Vue({
  el: '#app',
  router,
  store,
  i18n: i18nManager.i18n,
  render: h => h(App),
})

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    name: `${pkg.name}`,
    // el: "#app",
    router,
    store,
    i18n: i18nManager.i18n,
    render: h => h(App) // loadRootComponent: h => h(App)
  }
})
Vue.prototype.$Message = Message

export async function bootstrap(props) {
  createDomElement(props.domElement.replace(/#/, ''))
  store.commit(SET_SINGLE_SPA, props.singleSpa)
  return vueLifecycles.bootstrap(props)
}

export async function mount(props) {
  createDomElement(props.domElement.replace(/#/, ''))
  return vueLifecycles.mount(props)
}

export async function unmount(props) {
  removeDomElement(props.domElement.replace(/#/, ''))
  return vueLifecycles.unmount(props)
}

let el = null
function createDomElement(domEl = 'app') {
  // Make sure there is a div for us to render into
  el = document.getElementById(domEl)

  if (!el) {
    el = document.createElement('div')
    el.id = domEl
    el.classList.add(`${pkg.name}`)
    document.body.appendChild(el)
  }
  return el
}

function removeDomElement(domEl = 'app') {
  el = document.getElementById(domEl)
  if (el) {
    document.body.removeChild(el)
  }
}

export const config = {
  bootstrap: bootstrap,
  mount: mount,
  unmount: unmount
}

window.saasEtcloudPermission = {
  bootstrap: bootstrap,
  mount: mount,
  unmount: unmount
}
