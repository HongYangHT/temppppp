<template>
  <div :class="prefix">
    <custom-title>
      <p>商户列表</p>
    </custom-title>
    <custom-layout-header>
      <custom-search-panel placeholder="项目编码/商户名称/联系人/手机号" @on-serach="$_onSearch"></custom-search-panel>
      <div slot="append">
        <Button type="primary" @click="$_onAdd">新增商户</Button>
        <!-- <Button type="primary" @click="$_onNavTo">业务配置</Button> -->
      </div>
    </custom-layout-header>
    <custom-table :data="data" :columns="columns" @on-page-change="$_onPageChange" :total="pager.total" :current="pager.page" :page-size="pager['per-page']"></custom-table>
  </div>
</template>
<script>
import CustomTable from '@/modules/components/table/index.vue'
import CustomSearchPanel from '@/modules/components/search-panel/index.vue'
import CustomLayoutHeader from '@/modules/components/layout-header/index.vue'
import CustomTitle from '@/modules/components/custom-title/index.vue'
import { Button, Tag, Icon, Tooltip } from 'view-design'
import { mapActions, mapState } from 'vuex'

const TANENT_CLASS_PREFIX = 'tanent'
export default {
  components: {
    CustomTable,
    CustomSearchPanel,
    CustomLayoutHeader,
    CustomTitle,
    Button,
    Tag,
    Icon,
    Tooltip,
  },
  data() {
    let statusMap = new Map()
    statusMap.set('unsubmit', '未提交或未提交成功')
    statusMap.set('audit', '审核中')
    statusMap.set('success', '成功')
    statusMap.set('fail', '失败')
    return {
      prefix: TANENT_CLASS_PREFIX,
      data: [],
      columns: [
        {
          title: '项目编码',
          key: 'project_code',
        },
        {
          title: '进件状态',
          key: 'create_status',
          render(h, params) {
            return h(
              'a',
              {
                style: {
                  color: params.row.create_status === 'success' ? '#4164e3' : '#515a6e',
                },
              },
              [
                statusMap.get(params.row.create_status),
                params.row.create_status === 'fail'
                  ? h(
                      'Tooltip',
                      {
                        props: {
                          placement: 'top',
                          transfer: true,
                          'max-width': 160,
                        },
                        scopedSlots: {
                          content: () => h('div', {}, ['失败原因：' + params.row.create_fail_message]),
                        },
                      },
                      [
                        h('Icon', {
                          props: {
                            type: 'ios-help-circle',
                            color: '#ed4014',
                            size: 20,
                            placement: 'top',
                          },
                          class: {
                            'ml-10': true,
                          },
                        }),
                      ]
                    )
                  : '',
              ]
            )
          },
        },
        {
          title: '实名论证',
          key: 'is_verify',
          render(h, params) {
            return h(
              'div',
              {
                style: {
                  color: params.row.is_verify === 1 ? '#4164e3' : '#515a6e',
                },
              },
              params.row.is_verify === 1 ? '已认证' : '未认证'
            )
          },
        },
        {
          title: '业务配置',
          key: 'config_status',
          render(h, params) {
            return h(
              'a',
              {
                style: {
                  color: params.row.config_status === 'success' ? '#4164e3' : '#515a6e',
                },
              },
              [
                statusMap.get(params.row.config_status),
                params.row.config_status === 'fail'
                  ? h(
                      'Tooltip',
                      {
                        props: {
                          placement: 'top',
                          transfer: true,
                          'max-width': 160,
                        },
                        scopedSlots: {
                          content: () => h('div', {}, ['失败原因：' + params.row.config_fail_message]),
                        },
                      },
                      [
                        h('Icon', {
                          props: {
                            type: 'ios-help-circle',
                            color: '#ed4014',
                            size: 20,
                          },
                          class: {
                            'ml-10': true,
                          },
                        }),
                      ]
                    )
                  : '',
              ]
            )
          },
        },
        {
          title: '商户名称',
          key: 'member_name',
          width: 200,
          tooltip: true,
          ellipsis: true,
        },
        {
          title: '联系人',
          key: 'username',
        },
        {
          title: '联系电话',
          key: 'phone',
        },

        {
          title: '开户日期',
          key: 'create_time',
        },
        {
          title: ' ',
          key: 'action',
          className: 'action-table-cell',
          width: 80,
          actions: [
            {
              title: '详情',
              display: row => true,
              event: row => {
                this.$router.push({
                  name: 'detail',
                  query: {
                    id: row.id,
                  },
                })
              },
            },
            {
              title: '实名认证',
              display: row => !row.is_verify,
              event: row => {
                this.$Modal.confirm({
                  title: '实名认证',
                  content: '确认实名认证成功吗？',
                  okText: '认证成功',
                  onOk: () => {
                    this.$_submitVerify(row)
                  },
                })
              },
            },
            {
              title: '编辑',
              display: row => {
                return row.create_status !== 'success'
              },
              event: row => {
                this.$router.push({
                  name: 'editUser',
                  query: {
                    id: row.id,
                  },
                })
              },
            },
            {
              title: '业务配置',
              display: row => {
                return row.config_status !== 'success'
              },
              event: row => {
                this.$router.push({
                  name: 'tanentConfig',
                  query: {
                    config_status: row.config_status,
                    project_code: row.project_code,
                    site_id: row.site_id,
                    type: row.type,
                  },
                })
              },
            },
            {
              title: '同步',
              display: row => true,
              event: async row => {
                if (row.create_status === 'success' && row.config_status === 'success') {
                  let data = await this.asycAdapay({
                    params: {
                      project_code: row.project_code,
                      site_id: row.site_id,
                      type: row.type,
                    },
                  })
                  if (data && data.code === 200 && data.success) {
                    this.$Message.success('同步信息成功 ！')
                  } else {
                    this.$Message.error(data.message)
                  }
                } else {
                  this.$Message.error('请先审核成功后再同步信息')
                }
              },
            },
          ],
        },
      ],
      pager: {
        total: 0,
        page: 1,
        'per-page': 40,
      },
      query: {},
    }
  },
  computed: {
    ...mapState({
      tanentList: state => state.tanent.tanentList,
    }),
  },
  async mounted() {
    await this.$_fetchTanentList()
  },
  methods: {
    ...mapActions('tanent', ['fetchTanentList', 'asycAdapay', 'updateVerify']),
    async $_fetchTanentList() {
      let params = {
        params: {
          ...this.query,
          ...this.pager,
        },
      }
      let data = await this.fetchTanentList(params)
      this.data = this.tanentList
      this.pager.total = data.pagination && data.pagination.total
      this.pager.page = data.pagination && data.pagination.page
      this.pager['per-page'] = data.pagination && data.pagination['per-page']
    },
    $_onPageChange({ page, pageSize }) {
      this.pager.page = page
      this.pager['per-page'] = pageSize
      this.$_fetchTanentList()
    },
    $_onSearch(query) {
      this.pager.pageNum = 1
      this.query = query
      this.$_fetchTanentList()
    },
    $_onAdd() {
      this.$router.push({
        name: 'newUser',
      })
    },
    $_onNavTo() {
      this.$router.push({
        name: 'tanentConfig',
      })
    },
    async $_submitVerify(row) {
      let data = await this.updateVerify({
        id: row.id,
      })
      if (data && data.code === 200) {
        this.$Message.success('实名认证成功')
        this.pager.pageNum = 1
        this.$_fetchTanentList()
      }
    },
  },
}
</script>
