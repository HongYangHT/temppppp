<template>
  <div :class="prefix">
    <custom-title>
      <p>{{ detail ? '编辑用户' : '新增用户' }}</p>
    </custom-title>
    <div :class="prefix + '__content'">
      <Form ref="user" :model="user" :rules="userRules" :label-width="150" label-position="left">
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="所属产品：" prop="product">
              <Select v-model="user.product" placeholder="请选择所属产品" clearable transfer>
                <Option v-for="item in products" :key="item.value" :value="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="项目编码：" prop="project_code">
              <Input v-model="user.project_code" placeholder="请输入项目编码" clearable />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="子站id：" prop="site_id">
              <!-- <Input v-model="user.site_id" placeholder="默认值为1" clearable /> -->
              <InputNumber v-model="user.site_id" style="width: 100%;" :active-change="false" placeholder="默认值为1" clearable></InputNumber>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="子站会员类型：" prop="type">
              <!-- <Input v-model="user.type" placeholder="请输入子站会员类型" clearable /> -->
              <InputNumber v-model="user.type" style="width: 100%;" :active-change="false" placeholder="请输入子站会员类型" clearable></InputNumber>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="重新开户：" prop="reOpen" :label-width="100">
              <RadioGroup v-model="user.reOpen">
                <Radio :label="1">是</Radio>
                <Radio :label="0">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="支付费率：" prop="fee">
              <!-- <Input v-model="user.fee" placeholder="建议填写0.38% - 1%" clearable/> -->
              <InputNumber
                :max="100"
                v-model="user.fee"
                :formatter="value => `${value}%`"
                :parser="value => value.replace('%', '')"
                style="width: 100%;"
                :active-change="false"
                placeholder="建议填写0.38% - 1%"
                clearable
              ></InputNumber>
            </FormItem>
          </Col>
          <!-- <Col :span="6">
             <FormItem label="结算方式：" prop="bank_acct_type">
               <RadioGroup v-model="user.bank_acct_type">
                 <Radio :value="1" label="D+1"></Radio>
                 <Radio :value="2" label="T+1"></Radio>
               </RadioGroup>
             </FormItem>
          </Col> -->
        </Row>
        <!-- <Alert type="warning" show-icon>支付宝和微信的费率默认0.5%，如需要D+1结算，加收 “0.02% * 节假日天数” 的额外费率，非特殊需求，建议开通D+1</Alert> -->
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="商户简称：" prop="mer_short_name">
              <Input v-model="user.mer_short_name" placeholder="请输入商户简称" clearable />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="商户注册名称：" prop="mer_name">
              <Input v-model="user.mer_name" placeholder="请填写营业执照上的注册名称" clearable />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="商户注册手机：" prop="usr_phone">
              <Input v-model="user.usr_phone" placeholder="请填写商户注册手机号码" clearable />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="12">
            <FormItem label="商户注册地址：" prop="reg_addr">
              <Input v-model="user.reg_addr" placeholder="请填写详细的经营地址" clearable />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="联系人手机：" prop="cont_phone">
              <Input v-model="user.cont_phone" placeholder="请输入联系人手机" clearable />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="联系人邮箱：" prop="customer_email">
              <Input v-model="user.customer_email" placeholder="请输入联系人邮箱" clearable />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="统一社会信用代码：" prop="license_code">
              <Input v-model="user.license_code" placeholder="请输入统一社会信用代码" clearable />
            </FormItem>
          </Col>
          <Col :span="18">
            <FormItem label="营业执照有效期：" prop="mer_date">
              <!-- <DatePicker v-model="user.mer_date" type="daterange" placeholder="请选择营业执照有效期" style="width: 63%;"></DatePicker> -->
              <DatePicker v-model="user.mer_start_valid_date" type="date" :start-date="new Date('2010-1-1')" placeholder="请选择营业执照起始有效期"></DatePicker>
              -
              <DatePicker v-model="user.mer_valid_date" type="date" :start-date="new Date('2010-1-1')" placeholder="请选择营业执照结束有效期"></DatePicker>
              <Checkbox v-model="long_mer_valid_date" :class="prefix + '__check'" @on-change="$_onChangeMerDate">长期有效</Checkbox>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="法人：" prop="legal_name">
              <Input v-model="user.legal_name" placeholder="请输入法人姓名" clearable />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="法人证件类型：" prop="legal_type">
              <Select v-model="user.legal_type" placeholder="请选择证件类型" clearable transfer>
                <Option v-for="item in legals" :key="item.value" :value="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="法人证件号码：" prop="legal_idno">
              <Input v-model="user.legal_idno" placeholder="请输入法人证件号码" clearable />
            </FormItem>
          </Col>
          <Col :span="18">
            <FormItem label="法人证件有效期：" prop="legal_expires">
              <!-- <DatePicker v-model="user.legal_expires" type="daterange" placeholder="请选择法人证件有效期" style="width: 63%;"></DatePicker> -->
              <DatePicker v-model="user.legal_start_cert_id_expires" type="date" :start-date="new Date('2010-1-1')" placeholder="请选择法人证件起始有效期"></DatePicker>
              -
              <DatePicker v-model="user.legal_id_expires" type="date" :start-date="new Date('2010-1-1')" placeholder="请选择法人证件结束有效期"></DatePicker>
              <Checkbox v-model="long_legal_expires" :class="prefix + '__check'" @on-change="$_onChangeLegal">长期有效</Checkbox>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="结算方式：" prop="bank_acct_type">
              <RadioGroup v-model="user.bank_acct_type">
                <Radio :label="1">对公</Radio>
                <Radio :label="2">对私(法人)</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="结算帐户名：" prop="card_name">
              <Input v-model="user.card_name" placeholder="请输入结算帐户名" clearable />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="结算账号：" prop="card_id_mask">
              <Input v-model="user.card_id_mask" placeholder="请输入结算账号" clearable />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="银行地址：" prop="area">
              <Cascader ref="cascder" v-model="user.area" :data="area" :load-data="$_loadData" @on-change="$_onChangeArea" clearable transfer></Cascader>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="总行名称：" prop="bank_code">
              <Select v-model="user.bank_code" filterable remote transfer :remote-method="$_onSearch" :loading="searchLoading">
                <Option v-for="(option, index) in banks" :value="option.value" :key="index">{{ option.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <custom-bottom-panel>
      <Button type="primary" :loading="loading" @click="$_onSumit">提 交</Button>
    </custom-bottom-panel>
  </div>
</template>

<script>
import {
  Select,
  Option,
  Input,
  Radio,
  TimePicker,
  DatePicker,
  Checkbox,
  CheckboxGroup,
  Form,
  Row,
  Col,
  FormItem,
  RadioGroup,
  Button,
  Modal,
  Alert,
  Cascader,
  InputNumber,
} from 'view-design'
import CustomTitle from '@/modules/components/custom-title/index.vue'
import CustomBottomPanel from '@/modules/components/bottom-panel/index.vue'
import { mapActions } from 'vuex'
import { dateFormater } from '@/utils/utils'

const TANENT_CLASS_PREFIX = 'tanent__user'

export default {
  components: {
    CustomTitle,
    CustomBottomPanel,
    Form,
    FormItem,
    Row,
    Col,
    Input,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
    Select,
    Option,
    TimePicker,
    DatePicker,
    Button,
    Modal,
    Alert,
    Cascader,
    InputNumber,
  },
  data() {
    const validatePhone = (rule, value, cb) => {
      let reg = /^1\d{10}/
      if (!reg.test(value)) {
        return cb(new Error('请输入正确的手机号码'))
      }
      cb()
    }
    return {
      prefix: TANENT_CLASS_PREFIX,
      loading: false,
      user: {
        product: '',
        project_code: '',
        site_id: 1,
        type: 0,
        reOpen: 0,
        fee: 0.38,
        mer_short_name: '',
        mer_name: '',
        reg_addr: '',
        cont_phone: '',
        customer_email: '',
        license_code: '',
        mer_date: [],
        legal_name: '',
        legal_type: '',
        legal_idno: '',
        legal_expires: [],
        bank_acct_type: 1,
        card_name: '',
        card_id_mask: '',
        bank_code: '',
        prov_code: '',
        area_code: '',
        area: [],
        legal_start_cert_id_expires: '',
        legal_id_expires: '',
        mer_start_valid_date: '',
        mer_valid_date: '',
        usr_phone: '',
      },
      userRules: {
        product: [
          {
            required: true,
            message: '请选择所属产品',
            trigger: 'change',
          },
        ],
        project_code: [
          {
            required: true,
            message: '请输入项目编码',
            trigger: 'blur',
          },
        ],
        site_id: [
          {
            required: true,
            type: 'number',
            message: '请输入子站Id',
            trigger: 'blur',
          },
        ],
        type: [
          {
            required: true,
            type: 'number',
            message: '请输入子站会员类型',
            trigger: 'blur',
          },
        ],
        fee: [
          {
            required: true,
            type: 'number',
            message: '请输入支付费率',
            trigger: 'blur',
          },
        ],
        mer_short_name: [
          {
            required: true,
            message: '请输入商户简称',
            trigger: 'blur',
          },
        ],
        mer_name: [
          {
            required: true,
            message: '请输入商户注册名称',
            trigger: 'blur',
          },
        ],
        reg_addr: [
          {
            required: true,
            message: '请输入商户注册地址',
            trigger: 'blur',
          },
        ],
        cont_phone: [
          {
            required: true,
            message: '请输入联系人手机',
            trigger: 'blur',
          },
          {
            validator: validatePhone,
            trigger: 'blur',
          },
        ],
        usr_phone: [
          {
            required: true,
            message: '请输入联系人手机',
            trigger: 'blur',
          },
          {
            validator: validatePhone,
            trigger: 'blur',
          },
        ],
        customer_email: [
          {
            required: true,
            message: '请输入联系人邮箱',
            trigger: 'blur',
          },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
        ],
        license_code: [
          {
            required: true,
            message: '请输入统一社会信用代码',
            trigger: 'blur',
          },
        ],
        mer_date: [
          {
            required: true,
            type: 'array',
            message: '请选择营业执照有效期',
            trigger: 'change',
            min: 2,
          },
        ],
        legal_name: [
          {
            required: true,
            message: '请输入法人名称',
            trigger: 'blur',
          },
        ],
        legal_type: [
          {
            required: true,
            type: 'number',
            message: '请选择法人证件类型',
            trigger: 'change',
          },
        ],
        legal_idno: [
          {
            required: true,
            message: '请输入法人证件号码',
            trigger: 'blur',
          },
        ],
        legal_expires: [
          {
            required: true,
            type: 'array',
            message: '请选择法人证件有效期',
            trigger: 'change',
            min: 2,
          },
        ],
        card_name: [
          {
            required: true,
            message: '请输入结算帐户名',
            trigger: 'blur',
          },
        ],
        card_id_mask: [
          {
            required: true,
            message: '请输入结算账号',
            trigger: 'blur',
          },
        ],
        area: [
          {
            required: true,
            type: 'array',
            message: '请选择银行地址',
            trigger: 'change',
            min: 2,
          },
        ],
        bank_code: [
          {
            required: true,
            message: '请输入总行名称',
            trigger: 'blur',
          },
        ],
        reOpen: [
          {
            required: true,
            type: 'number',
            message: '请勾选是否重新开户',
            trigger: 'change',
          },
        ],
        bank_acct_type: [
          {
            required: true,
            type: 'number',
            message: '请勾选结算方式',
            trigger: 'change',
          },
        ],
      },
      products: [
        {
          label: 'Pos',
          value: 'pos',
        },
        {
          label: '生鲜配送',
          value: 'base',
        },
        {
          label: '社区团购',
          value: 'group',
        },
      ],
      legals: [
        {
          label: '身份证',
          value: 0,
        },
        {
          label: '其他',
          value: 1,
        },
      ],
      long_mer_valid_date: false,
      long_legal_expires: false,
      area: [],
      banks: [],
      diabledMerDate: false,
      diabledLegalDate: false,
      detail: false,
      searchLoading: false,
      id: '',
    }
  },
  async mounted() {
    let { id } = this.$route.query
    if (id) {
      this.id = id
      this.detail = true
      let data = await this.fetchTanentById({ id, params: { id } })
      if (data.success && data.code === 200) {
        let {
          product = '',
          project_code = '',
          site_id = '',
          type = '',
          reOpen = 0,
          fee,
          mer_short_name = '',
          mer_name = '',
          reg_addr = '',
          cont_phone = '',
          customer_email = '',
          license_code = '',
          legal_name = '',
          legal_type = 0,
          legal_idno = '',
          bank_acct_type = 0,
          card_name = '',
          card_id_mask = '',
          prov_code = '',
          area_code = '',
          legal_start_cert_id_expires = '',
          legal_id_expires = '',
          mer_start_valid_date = '',
          mer_valid_date = '',
          bank_code = '',
          usr_phone = '',
          bank_name = '',
        } = data.result
        let legal_expires = [
          new Date(legal_start_cert_id_expires.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')),
          new Date(legal_id_expires.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')),
        ]
        let mer_date = [new Date(mer_start_valid_date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')), new Date(mer_valid_date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))]
        let area = [prov_code, area_code]

        await this.fetchBanks({
          params: {
            bank: bank_name,
          },
        })
          .then(res => {
            this.searchLoading = false
            if (res.code === 200 && res.success) {
              let banks = res.result
              let keys = Object.keys(banks)
              keys.forEach(key => {
                this.banks.push({
                  value: key,
                  label: banks[key],
                })
              })
            }
          })
          .catch(err => {
            this.searchLoading = false
          })

        let provinces = await this.cityCodeList({
          params: {
            type: 4,
          },
        })

        this.area = provinces.result
          ? provinces.result.map(item => {
              return {
                value: item.value + '',
                label: item.title,
                type: 'province',
                children: [],
                loading: false,
              }
            })
          : []
        let city = await this.cityCodeList({
          params: {
            province: prov_code,
            type: 4,
          },
        })
        this.area = this.area.map(item => {
          if (item.value === prov_code) {
            item.children = city.result
              ? city.result.map(d => {
                  return {
                    value: d.value + '',
                    label: d.title,
                    type: 'area',
                  }
                })
              : []
          }
          return item
        })

        this.user = Object.assign(this.user, {
          product,
          project_code,
          site_id: Number(site_id),
          type: Number(type),
          reOpen,
          fee: Number(fee),
          mer_short_name,
          mer_name,
          reg_addr,
          cont_phone,
          customer_email,
          license_code,
          legal_name,
          legal_type: Number(legal_type),
          legal_idno,
          bank_acct_type: Number(bank_acct_type),
          card_name,
          card_id_mask,
          prov_code,
          area_code,
          legal_start_cert_id_expires: new Date(legal_start_cert_id_expires.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')),
          legal_id_expires: new Date(legal_id_expires.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')),
          mer_start_valid_date: new Date(mer_start_valid_date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')),
          mer_valid_date: new Date(mer_valid_date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')),
          bank_code,
          legal_expires,
          mer_date,
          usr_phone,
          area,
        })
      }
    } else {
      let provinces = await this.cityCodeList({
        params: {
          type: 4,
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
    }
  },
  methods: {
    ...mapActions('tanent', ['cityCodeList', 'openPay', 'fetchTanentById', 'fetchBanks']),
    $_onSumit() {
      let validFlag = true
      this.$refs.user.validate(valid => {
        validFlag = valid
      })
      if (!validFlag) return
      this.loading = true
      let legal_start_cert_id_expires = ''
      let legal_id_expires = ''
      let mer_start_valid_date = ''
      let mer_valid_date = ''
      legal_start_cert_id_expires = dateFormater('YYYY-MM-DD', this.user.legal_start_cert_id_expires).replace(/-/g, '')
      legal_id_expires = dateFormater('YYYY-MM-DD', this.user.legal_id_expires).replace(/-/g, '')
      // if (this.user.legal_expires && this.user.legal_expires.length) {
      //   legal_start_cert_id_expires = dateFormater('YYYY-MM-DD', this.user.legal_expires[0]).replace(/-/g, '')
      //   legal_id_expires = dateFormater('YYYY-MM-DD', this.user.legal_expires[1]).replace(/-/g, '')
      // }

      mer_start_valid_date = dateFormater('YYYY-MM-DD', this.user.mer_start_valid_date).replace(/-/g, '')
      mer_valid_date = dateFormater('YYYY-MM-DD', this.user.mer_valid_date).replace(/-/g, '')
      // if (this.user.mer_date && this.user.mer_date.length) {
      //   mer_start_valid_date = dateFormater('YYYY-MM-DD', this.user.mer_date[0]).replace(/-/g, '')
      //   mer_valid_date = dateFormater('YYYY-MM-DD', this.user.mer_date[1]).replace(/-/g, '')
      // }
      let data = {
        params: {
          project_code: this.user.project_code,
          site_id: this.user.site_id,
          type: this.user.type,
        },
        data: {
          id: this.id,
          product: this.user.product,
          project_code: this.user.project_code,
          site_id: this.user.site_id,
          type: this.user.type,
          reOpen: this.user.reOpen,
          fee: this.user.fee,
          usr_phone: this.user.usr_phone,
          mer_short_name: this.user.mer_short_name,
          mer_name: this.user.mer_name,
          reg_addr: this.user.reg_addr,
          cont_phone: this.user.cont_phone,
          customer_email: this.user.customer_email,
          license_code: this.user.license_code,
          legal_name: this.user.legal_name,
          legal_type: this.user.legal_type,
          legal_idno: this.user.legal_idno,
          bank_acct_type: this.user.bank_acct_type,
          card_name: this.user.card_name,
          card_id_mask: this.user.card_id_mask,
          prov_code: this.user.area && this.user.area.length ? this.user.area[0] : '',
          area_code: this.user.area && this.user.area.length ? this.user.area[1] : '',
          legal_start_cert_id_expires: legal_start_cert_id_expires,
          legal_id_expires: legal_id_expires,
          mer_start_valid_date: mer_start_valid_date,
          mer_valid_date: mer_valid_date,
          bank_code: this.user.bank_code,
        },
      }
      this.openPay(data)
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
    $_loadData(item, cb) {
      item.loading = true
      let params = {}
      if (item.type === 'province') {
        this.selectedProvince = item.value
        params = {
          params: {
            province: item.value,
            type: 4,
          },
        }
      } else {
        params = {
          params: {
            province: this.selectedProvince,
            city: item.value,
            type: 4,
          },
        }
      }

      this.cityCodeList(params).then(res => {
        item.children = res.result
          ? res.result.map(d => {
              return {
                value: d.value + '',
                label: d.title,
                type: 'area',
              }
            })
          : []
        item.loading = false
        cb()
      })
    },
    $_onChangeArea() {
      this.$refs.user.validateField('area')
    },
    $_onSearch(value) {
      this.searchLoading = true
      this.fetchBanks({
        params: {
          bank: value,
        },
      })
        .then(res => {
          this.searchLoading = false
          if (res.code === 200 && res.success) {
            this.banks = []
            let banks = res.result
            let keys = Object.keys(banks)
            keys.forEach(key => {
              this.banks.push({
                value: key,
                label: banks[key],
              })
            })
          }
        })
        .catch(err => {
          this.searchLoading = false
        })
    },
    $_onChangeMerDate(flag) {
      if (!this.user.mer_date.length) {
        this.user.mer_date = [new Date(), new Date(2999, 0, 1)]
      } else {
        this.user.mer_date = [this.user.mer_date[0] || new Date(), new Date(2999, 0, 1)]
      }

      if (!this.user.mer_start_valid_date && !this.user.mer_valid_date) {
        this.user.mer_start_valid_date = new Date()
        this.user.mer_valid_date = new Date(2999, 0, 1)
      } else {
        this.user.mer_valid_date = new Date(2999, 0, 1)
      }
    },
    $_onChangeLegal(flag) {
      if (!this.user.legal_expires.length) {
        this.user.legal_expires = [new Date(), new Date(2999, 0, 1)]
      } else {
        this.user.legal_expires = [this.user.legal_expires[0] || new Date(), new Date(2999, 0, 1)]
      }

      if (!this.legal_start_cert_id_expires && !this.legal_id_expires) {
        this.legal_start_cert_id_expires = new Date()
        this.legal_id_expires = new Date(2999, 0, 1)
      } else {
        this.legal_id_expires = new Date(2999, 0, 1)
      }
    },
  },
}
</script>
