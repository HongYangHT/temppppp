<template>
  <div :class="prefix">
    <Table
      ref="table"
      :data="data"
      :columns="columns"
      :size="size"
      :width="width"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      :disabled-hover="disabledHover"
      :loading="loading"
      :draggable="draggable"
      :tooltip-theme="tooltipTheme"
      :rowKey="rowKey"
      :height="tableHeight"
      :max-height="tableHeight"
      @on-select-all="$_onSelectAll"
      @on-select="$_onSelect"
      @on-select-cancel="$_onSelectCancel"
      @on-drag-drop="$_onDragDrop"
    ></Table>
    <Page
      ref="page"
      :current="page"
      :total="total"
      :page-size="defaultPageSize"
      :page-size-opts="pageSizeOpts"
      :show-total="showTotal"
      :show-elevator="showElevator"
      :show-sizer="showSizer"
      :class="prefix + '__page'"
      @on-change="$_onChangePage"
      @on-page-size-change="$_onPageSizeChange"
    ></Page>
  </div>
</template>
<script>
import { Table, Page, Tag } from 'view-design'
import bus from '@/utils/bus'

const TABLE_CLASS_PREFIX = 'custom__table'
const getTableMaxHeight = () => {
  let winHeight = 0
  if (document.body && document.body.offsetHeight) {
    winHeight = document.body.offsetHeight
  } else if (window.innerHeight) {
    winHeight = window.innerHeight
  }
  return winHeight - 320
}
export default {
  name: 'CustomTable',
  components: {
    Table,
    Page,
    Tag,
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    size: {
      type: String,
      default: 'default',
    },
    width: {
      type: [Number, String],
      default: '100%',
    },
    height: {
      type: [Number, String],
      default: 0,
    },
    // 3.4.0
    maxHeight: {
      type: [Number, String],
      default: 0,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    highlightRow: {
      type: Boolean,
      default: false,
    },
    rowClassName: {
      type: Function,
      default() {
        return ''
      },
    },
    noDataText: {
      type: String,
      default: '暂无数据',
    },
    noFilteredDataText: {
      type: String,
      default: '暂无数据',
    },
    disabledHover: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    tooltipTheme: {
      validator(value) {
        return ['dark', 'light'].includes(value)
      },
      default: 'dark',
    },
    // #5380 开启后，:key 强制更新，否则使用 index
    rowKey: {
      type: Boolean,
      default: false,
    },

    // NOTE: page的参数
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizeOpts: {
      type: Array,
      default: () => [10, 20, 30, 40],
    },
    showTotal: {
      type: Boolean,
      default: true,
    },
    showElevator: {
      type: Boolean,
      default: true,
    },
    showSizer: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      prefix: TABLE_CLASS_PREFIX,
      page: 1,
      defaultPageSize: 40,
      tableHeight: 0,
    }
  },
  mounted() {
    this.tableHeight = this.height || getTableMaxHeight()
    this.page = this.current
    this.defaultPageSize = this.pageSize
    bus.$on('on-content-resize', () => {
      this.$nextTick(() => {
        this.$refs.table && this.$refs.table.handleResize()
      })
    })
    this.$_initColumn()
  },
  watch: {
    pageSize() {
      this.defaultPageSize = this.pageSize
    },
  },
  methods: {
    $_initColumn() {
      const dealColumns = (item, index) => {
        // 可拖拽样式处理
        if (index === 0 && this.draggable) {
          item.render = (h, params) => {
            return h(
              'i',
              {
                class: {
                  'ivu-icon': true,
                  'ivu-icon-md-more': true,
                  draggable: true,
                },
              },
              params.row[item.key]
            )
          }
        }

        if (item.type === 'selection') {
          item.align = 'center'
          item.width = 30
        }
        if (item.key === 'action') {
          item.width = item.width ? item.width : 70
          item.align = 'center'
          item.title = '操作'
          item.fixed = false
          if (item.actions && item.actions.length) {
            item.width = 1
            item.title = ' '
            item.render = (h, params) => {
              let _hs = []
              item.actions.forEach(_action => {
                // if (typeof _action.display === 'function') {
                //   _action.display = _action.display(params.row)
                // }
                _hs.push(
                  h(
                    'span',
                    {
                      style: {
                        display: typeof _action.display === 'function' && _action.display(params.row) ? 'inline-block' : 'none',
                      },
                      on: {
                        click: () => {
                          _action.event(params.row)
                        },
                      },
                    },
                    [
                      h('Icon', {
                        style: {
                          marginRight: '5px',
                        },
                        props: {
                          type: _action.icon,
                        },
                      }),
                      h(
                        'span',
                        {
                          style: {
                            display: 'inline-block',
                          },
                        },
                        _action.title
                      ),
                    ]
                  )
                )
              })

              return h(
                'div',
                {
                  class: {
                    'action-panel': true,
                  },
                },
                _hs
              )
            }
          }
        }
      }
      let order = -1
      this.columns.forEach((item, index) => {
        order++
        if (item.children && item.children.length > 0) {
          item.children.forEach((element, sort) => {
            dealColumns(element, order)
          })
        } else {
          dealColumns(item, order)
        }
      })
    },
    $_onSelect(selection, row) {
      this.$emit('on-select', {
        selection,
        row,
      })
    },
    $_onSelectCancel(selection, row) {
      this.$emit('on-select-cancel', {
        selection,
        row,
      })
    },
    $_onSelectAll(selection) {
      this.$emit('on-select-all', {
        selection,
      })
    },
    $_onDragDrop(index1, index2) {
      this.$emit('on-drag-drop', {
        start: index1,
        end: index2,
      })
    },
    $_onChangePage(page) {
      this.$emit('on-page-change', {
        page,
        pageSize: this.defaultPageSize,
      })
    },
    $_onPageSizeChange(pageSize) {
      this.$emit('on-page-change', {
        page: this.page,
        pageSize,
      })
    },
  },
}
</script>
