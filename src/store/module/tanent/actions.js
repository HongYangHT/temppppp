/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-01-06 10:11:21
 * @LastEditTime: 2020-02-28 16:59:20
 */
import { tanentService } from '@/utils/http'
import { SET_TANENT_LIST } from './contants'

/**
 * 查询商户列表
 * @param {store} param0
 * @param {Object} params
 */
export function fetchTanentList({ commit }, params) {
  return tanentService.fetchTanents('/members', params).then(result => {
    if (result && result.data && result.data.code === 200 && result.data.success) {
      commit(SET_TANENT_LIST, result.data.result)
    }
    return (result && result.data) || {}
  })
}

/**
 * 同步商户信息
 * @param {*} param0
 * @param {*} params
 */
export function asycAdapay({ commit }, params) {
  return tanentService.asycAdapay('/sync', params).then(result => {
    return (result && result.data) || {}
  })
}

/**
 * 提交业务配置
 * @param {*} param0
 * @param {*} params
 */
export function payConfig({ commit }, params) {
  return tanentService.payConfig('/pay-config', params).then(result => {
    return (result && result.data) || {}
  })
}

/**
 * 查询城市编码
 * @param {*} param0
 * @param {*} params
 */
export function cityCodeList({ commit }, params) {
  return tanentService.cityCodeList('/data/city-code-list', params).then(result => {
    return (result && result.data) || {}
  })
}

/**
 * 提交商户
 * @param {*} param0
 * @param {*} params
 */
export function openPay({ commit }, params) {
  return tanentService.openPay('/open', params).then(result => {
    return (result && result.data) || {}
  })
}

/**
 * 查询商户详情
 * @param {*} param0
 * @param {*} params
 */
export function fetchTanentById({ commit }, params) {
  return tanentService.fetchTanentById(`/members/${params.id}`, params).then(result => {
    return (result && result.data) || {}
  })
}

/**
 * 查询银行
 * @param {*} param0
 * @param {*} params
 */
export function fetchBanks({ commit }, params) {
  return tanentService.fetchBanks('/data/bank-code', params).then(result => {
    return (result && result.data) || {}
  })
}

/**
 * 查询业务配置详情
 * @param {*} param0
 * @param {*} params
 */
export function fetchPayConfig({ commit }, params) {
  return tanentService.fetchPayConfig('/pay-config', params).then(result => {
    return (result && result.data) || {}
  })
}

export function updateVerify({ commit }, params) {
  return tanentService.updateVerify(`/members/done-verify/${params.id}`, params).then(result => {
    return (result && result.data) || {}
  })
}
