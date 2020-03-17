<template>
  <div :class="prefix">
    <custom-title>
      <p>业务配置</p>
    </custom-title>
    <Form ref="config" :model="config" :rules="configRules" :label-width="160" label-position="left">
      <div :class="prefix + '__title'">商户信息</div>
      <Row :gutter="30">
        <Col :span="12">
          <FormItem label="商户经营地址：" :label-width="140" prop="area">
            <Cascader v-model="config.area" :data="area" :load-data="$_loadData" @on-change="$_onChangeArea"></Cascader>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="商户种类：" prop="mer_type" :label-width="100">
            <Select v-model="config.mer_type" placeholder="请选择商户种类" clearable>
              <Option v-for="type in customTypes" :key="type.value" :value="type.value">{{ type.label }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <div :class="prefix + '__title'">
        微信支付
        <i-switch v-model="config.open_wx" :true-value="1" :false-value="0"></i-switch>
        <Alert type="warning" show-icon>微信支付，默认开通当面付、小程序支付</Alert>
      </div>
      <FormItem label="微信支付appId：" prop="wx_lite" :label-width="140">
        <Input v-model="config.wx_lite" placeholder="请输入微信appId" :disabled="!config.open_wx" />
      </FormItem>
      <div :class="prefix + '__title'">
        微信公众号支付
        <i-switch v-model="config.open_pub" :true-value="1" :false-value="0"></i-switch>
        <Alert type="warning" show-icon>公众号属于线上场景的支付，费率0.65，非特殊需求建议不需要开通</Alert>
      </div>
      <Row :gutter="30">
        <Col :span="12">
          <FormItem label="公众号支付appId：" :label-width="140" prop="wx_pub">
            <Input v-model="config.wx_pub" placeholder="请输入公众号支付appId" :disabled="!config.open_pub" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="公众号支付授权目录：" prop="wx_pub_path">
            <Input v-model="config.wx_pub_path" placeholder="请输入公众号支付授权目录：" :disabled="!config.open_pub" />
          </FormItem>
        </Col>
      </Row>
      <div :class="prefix + '__title'">
        支付宝支付
        <i-switch v-model="config.open_alipay" :true-value="1" :false-value="0"></i-switch>
        <Alert type="warning" show-icon>支付宝支付，默认开通当面付功能</Alert>
      </div>
    </Form>
    <custom-bottom-panel>
      <Button :loading="loading" type="primary" @click="$_onSumit">提 交</Button>
    </custom-bottom-panel>
  </div>
</template>
<script>
import CustomTitle from '@/modules/components/custom-title/index.vue'
import CustomBottomPanel from '@/modules/components/bottom-panel/index.vue'
import { Form, FormItem, Cascader, Select, Option, Input, Switch, Alert, Row, Col, Button } from 'view-design'
import { mapActions } from 'vuex'
const TANENT_CLASS_PREFIX = 'tanent'

export default {
  components: {
    CustomTitle,
    Form,
    FormItem,
    Cascader,
    Select,
    Option,
    Input,
    [Switch.name]: Switch,
    Alert,
    Row,
    Col,
    Button,
    CustomBottomPanel,
  },
  data() {
    const validateWxLite = (rule, value, cb) => {
      if (this.config.open_wx && !value) {
        return cb(new Error('请输入微信支付appId'))
      }
      cb()
    }

    const validateWxPub = (rule, value, cb) => {
      if (this.config.open_pub && !value) {
        return cb(new Error('请输入公众号支付appId'))
      }
      cb()
    }

    const validateWxPubPath = (rule, value, cb) => {
      if (this.config.open_pub && !value) {
        return cb(new Error('请输入公众号支付授权目录'))
      }
      cb()
    }

    return {
      prefix: TANENT_CLASS_PREFIX,
      config: {
        area: [],
        mer_type: '',
        open_wx: 1,
        open_pub: 0,
        open_alipay: 1,
        wx_lite: '',
        wx_pub: '',
        wx_pub_path: '',
        province_code: '',
        city_code: '',
        district_code: '',
      },
      configRules: {
        area: [
          {
            required: true,
            type: 'array',
            message: '请选择商户经营地址',
            trigger: 'change',
            min: 3,
          },
        ],
        mer_type: [
          {
            type: 'number',
            required: true,
            message: '请选择商户类型',
            trigger: 'change',
          },
        ],
        wx_lite: [
          {
            validator: validateWxLite,
            trigger: 'blur',
          },
        ],
        wx_pub: [
          {
            validator: validateWxPub,
            trigger: 'blur',
          },
        ],
        wx_pub_path: [
          {
            validator: validateWxPubPath,
            trigger: 'blur',
          },
        ],
      },
      customTypes: [
        {
          // 1-政府机构
          // 2-国营企业
          // 3-私营企业
          // 4-外资企业
          // 5-个体工商户
          // 7-事业单位/其他组织
          label: '政府机构',
          value: 1,
        },
        {
          label: '国营企业',
          value: 2,
        },
        {
          label: '私营企业',
          value: 3,
        },
        {
          label: '外资企业',
          value: 4,
        },
        {
          label: '个体工商户',
          value: 5,
        },
        {
          label: '事业单位/其他组织',
          value: 7,
        },
      ],
      query: {
        project_code: '',
        site_id: '',
        type: '',
      },
      loading: false,
      area: [],
      selectedProvince: '',
    }
  },
  async mounted() {
    let { project_code, site_id, type, config_status } = this.$route.query
    this.query.project_code = project_code
    this.query.site_id = site_id
    this.query.type = type
    let provinces = await this.cityCodeList({
      params: {
        type: 6,
      },
    })

    this.area = provinces.result
      ? provinces.result.map(item => {
          return {
            value: item.value,
            label: item.title,
            type: 'province',
            children: [],
            loading: false,
          }
        })
      : []
    if (config_status !== 'unsubmit' && config_status !== 'success') {
      let detail = await this.fetchPayConfig({
        params: {
          ...this.query,
        },
      })
    }
  },
  methods: {
    ...mapActions('tanent', ['payConfig', 'cityCodeList', 'fetchPayConfig']),
    $_onSumit() {
      let validFlag = false
      this.$refs.config.validate(valid => {
        validFlag = valid
      })
      if (!validFlag) return
      this.loading = true
      let params = {
        params: {
          ...this.query,
        },
        data: {
          mer_type: this.config.mer_type,
          open_alipay: this.config.open_alipay,
          wx_lite: this.config.open_wx ? this.config.wx_lite : '',
          wx_pub: this.config.open_pub ? this.config.wx_pub : '',
          wx_pub_path: this.config.open_pub ? this.config.wx_pub_path : '',
          province_code: this.config.area && this.config.area.length > 2 ? this.config.area[0] : '',
          city_code: this.config.area && this.config.area.length > 2 ? this.config.area[1] : '',
          district_code: this.config.area && this.config.area.length > 2 ? this.config.area[2] : '',
        },
      }
      this.payConfig(params)
        .then(res => {
          if (res.success && res.code === 200) {
            this.$Modal.success({
              content: '提交成功, 请等待审核结果',
              okText: '返回列表',
              onOk: () => {
                this.$router.push({
                  name: 'tanentList',
                })
              },
            })
          } else {
            this.$Message.error(res.message)
          }
        })
        .catch(error => {
          this.loading = false
        })
    },
    $_onChangeArea() {
      this.$refs.config.validateField('area')
    },
    $_loadData(item, cb) {
      item.loading = true
      let params = {}
      if (item.type === 'province') {
        this.selectedProvince = item.value
        params = {
          params: {
            province: item.value,
            type: 6,
          },
        }
      } else {
        params = {
          params: {
            province: this.selectedProvince,
            city: item.value,
            type: 6,
          },
        }
      }

      this.cityCodeList(params).then(res => {
        item.children = res.result
          ? res.result.map(d => {
              if (item.type === 'province') {
                return {
                  value: d.value,
                  label: d.title,
                  type: 'city',
                  children: [],
                  loading: false,
                }
              } else {
                return {
                  value: d.value,
                  label: d.title,
                  type: 'area',
                }
              }
            })
          : []
        item.loading = false
        cb()
      })
    },
  },
}
</script>
