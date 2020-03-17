<template>
  <div :class="prefix">
    <div :class="prefix + '__filter'"></div>
    <div :class="prefix + '__search'">
      <div :class="prefix + '__item'">
        <template v-for="item in renderData">
          <Input v-if="item.type === 'Input'" v-model="query[`${item.model}`]" :placeholder="item.placeholder" :key="item.type" clearable @on-enter="$_search" />
          <Select
            v-if="item.type === 'Select'"
            v-model="query[`${item.model}`]"
            :placeholder="item.placeholder"
            :key="item.type"
            :multiple="item.meta.multiple"
            clearable
            transfer
            @on-change="$_search"
          >
            <Option v-for="d in item.data" :value="d.value" :key="d.value">{{ d.label }}</Option>
          </Select>
          <Cascader
            v-if="item.type === 'Cascader'"
            v-model="query[`${item.model}`]"
            :data="item.data"
            :placeholder="item.placeholder"
            :key="item.type"
            clearable
            transfer
            @on-change="$_search"
          ></Cascader>
          <DatePicker
            v-if="item.type === 'DatePicker'"
            v-model="query[`${item.model}`]"
            :type="item.meta.type"
            :options="item.meta.options"
            :placeholder="placeholder"
            :key="item.type"
            clearable
            transfer
            @on-change="$_search"
          ></DatePicker>
        </template>
      </div>
      <div :class="prefix + '__item--long'">
        <!-- eslint-disable-next-line vue/x-invalid-end-tag -->
        <Input v-if="search" v-model="query.keyword" :placeholder="placeholder" icon="ios-search" clearable search autocomplete="off" @on-search="$_search"></Input>
      </div>
    </div>
  </div>
</template>
<script>
import { Select, DatePicker, Cascader, Input, Option, Icon } from 'view-design'
const SEARCH_CLASS_PREFIX = 'search__panel'
export default {
  name: 'CustomSearchPanel',
  components: {
    Select,
    DatePicker,
    Cascader,
    Input,
    Option,
    Icon,
  },
  props: {
    // NOTE: 用于默认控制是否显示模糊查询的Input
    search: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '请输入关键字查询',
    },
    /**
     * 数据格式
     * [{
     *   type: 'Select',  // Select、 DatePicker 、Cascader、Input
     *   model: 'shopId', // 为当前选项的key值
     *   placeholder: '请选择', //
     *   data: [{
     *    label: '',
     *    value: ''
     *   }] // 用于渲染的数据
     *   label: '门店', // 用于显示的label
     *   meta: {
     *     type: 'daterange'
     *     options:  // 用于DatePicker组件
     *     multiple: false, // 是否多选，用于Select组件
     *     placeholder: '请选择', // 用于Input组件
     *   }
     *   ...
     * }]
     */
    renderData: {
      type: Array,
      default: () => [],
    },
    defaultValue: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      prefix: SEARCH_CLASS_PREFIX,
      query: {
        keyword: '',
      },
    }
  },
  mounted() {
    this.$_getModel()
    this.query = Object.assign(this.query, this.defaultValue)
  },
  methods: {
    $_getModel() {
      let models = {}
      this.renderData.forEach(item => {
        switch (item.type) {
          case 'DatePicker':
            if (item.meta && (item.meta.type === 'daterange' || item.meta.type === 'datetimerange')) {
              models[`${item.model}`] = []
            } else {
              models[`${item.model}`] = ''
            }
            break
          case 'Cascader':
            models[`${item.model}`] = []
            break
          case 'Select':
            if (item.meta && item.meta.multiple) {
              models[`${item.model}`] = []
            } else {
              models[`${item.model}`] = ''
            }
            break
          default:
            models[`${item.model}`] = ''
            break
        }
      })
      this.query = Object.assign(this.query, models)
    },
    $_search() {
      this.$emit('on-serach', this.query)
    },
  },
}
</script>
