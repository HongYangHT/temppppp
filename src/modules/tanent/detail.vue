<template>
  <div :class="prefix">
    <custom-title>
      <p>用户详情</p>
    </custom-title>
    <div :class="prefix + '__content'">
      <Form ref="user" :label-width="150" label-position="left">
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="所属产品：" prop="product">
              {{ productText }}
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="项目编码：" prop="project_code">
              {{ user.project_code }}
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="子站id：" prop="site_id">
              {{ user.site_id }}
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="子站会员类型：" prop="type">
              {{ user.type }}
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="重新开户：" prop="reOpen" :label-width="100">
              {{ user.reOpen ? '是' : '否' }}
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="支付费率：" prop="fee">
              {{ user.fee + '%' }}
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
              {{ user.mer_short_name }}
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="商户注册名称：" prop="mer_name">
              {{ user.mer_name }}
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="商户注册手机：" prop="usr_phone">
              {{ user.usr_phone }}
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="12">
            <FormItem label="商户注册地址：" prop="reg_addr">
              {{ user.reg_addr }}
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="联系人手机：" prop="cont_phone">
              {{ user.cont_phone }}
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="联系人邮箱：" prop="customer_email">
              {{ user.customer_email }}
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="统一社会信用代码：" prop="license_code">
              {{ user.license_code }}
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="营业执照有效期：" prop="mer_date">{{ user.mer_start_valid_date }} - {{ user.mer_valid_date }}</FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="法人：" prop="legal_name">
              {{ user.legal_name }}
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="法人证件类型：" prop="legal_type">
              {{ legalTypeText }}
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="法人证件号码：" prop="legal_idno">
              {{ user.legal_idno }}
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="法人证件有效期：" prop="legal_expires">{{ user.legal_start_cert_id_expires }} - {{ user.legal_id_expires }}</FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="结算方式：" prop="bank_acct_type">
              {{ user.bank_acct_type === 1 ? '对公' : '对私(法人)' }}
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="结算帐户名：" prop="card_name">
              {{ user.card_name }}
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="结算账号：" prop="card_id_mask">
              {{ user.card_id_mask }}
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="6">
            <FormItem label="银行地址：" prop="area">{{ areaText.join(' / ') }}</FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="总行名称：" prop="bank_code">
              {{ user.bank_name }}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <custom-bottom-panel></custom-bottom-panel>
  </div>
</template>
<script>
import { Form, Row, Col, FormItem, Button, Modal, Alert } from 'view-design'
import CustomTitle from '@/modules/components/custom-title/index.vue'
import CustomBottomPanel from '@/modules/components/bottom-panel/index.vue'
import { mapActions } from 'vuex'

const TANENT_CLASS_PREFIX = 'tanent__user'
export default {
  components: {
    CustomTitle,
    CustomBottomPanel,
    Form,
    FormItem,
    Row,
    Col,
    Modal,
    Alert,
  },
  data() {
    return {
      prefix: TANENT_CLASS_PREFIX,
      user: {
        product: '',
        project_code: '',
        site_id: '1',
        type: '',
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
      productText: '',
      legalTypeText: '',
      bank_code_text: '',
      areaText: [],
    }
  },
  async mounted() {
    let { id } = this.$route.query
    if (id) {
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
        let legal_expires = [new Date(legal_start_cert_id_expires), new Date(legal_id_expires)]
        let mer_date = [new Date(mer_start_valid_date), new Date(mer_valid_date)]
        let area = [prov_code, area_code]

        let provinces = await this.cityCodeList({
          params: {
            type: 4,
          },
        })
        let prov = ''
        if (provinces.result && provinces.result.length) {
          let provx = provinces.result.find(p => p.value + '' === prov_code)
          prov = provx ? provx.title : ''
        }
        this.areaText.push(prov)

        let city = await this.cityCodeList({
          params: {
            province: prov_code,
            type: 4,
          },
        })

        let ty = ''
        if (city.result && city.result.length) {
          let tyx = city.result.find(p => p.value + '' === area_code)
          ty = tyx ? tyx.title : ''
        }
        this.areaText.push(ty)

        this.user = Object.assign(this.user, {
          product,
          project_code,
          site_id,
          type,
          reOpen,
          fee,
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
          legal_start_cert_id_expires: legal_start_cert_id_expires.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
          legal_id_expires: legal_id_expires.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
          mer_start_valid_date: mer_start_valid_date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
          mer_valid_date: mer_valid_date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
          bank_code,
          legal_expires,
          mer_date,
          usr_phone,
          area,
          bank_name,
        })
        this.productText = (this.products.find(item => item.value === this.user.product) && this.products.find(item => item.value === this.user.product).label) || ''
        this.legalTypeText = (this.legals.find(item => item.value === this.user.legal_type) && this.legals.find(item => item.value === this.user.legal_type).label) || ''
      }
    }
  },
  methods: {
    ...mapActions('tanent', ['fetchTanentById', 'cityCodeList']),
  },
}
</script>
