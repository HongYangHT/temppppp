import * as constants from './constants'

export default {
  [constants.SET_TOKEN](state, payload) {
    state.token = payload
  },
  [constants.SET_LOGIN_INFO](state, payload) {
    state.loginInfo = payload
  },
  [constants.SET_FUNCTION_LIST](state, payload) {
    state.functionList = payload
  },
  [constants.SET_FUNCTION_TREE](state, payload) {
    state.functionTree = payload
  },
  [constants.SET_SUB_LIST](state, payload) {
    state.subList = payload
  },
  [constants.SET_PAGE_LIST](state, payload) {
    state.pageList = payload
  }
}
