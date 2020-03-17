<template>
  <Breadcrumb :class="prefix">
    <template v-for="(item, index) in breads">
      <BreadcrumbItem v-if="index === 0" :key="item.name">{{ item.meta.title }}</BreadcrumbItem>
      <BreadcrumbItem v-else :key="item.name" :to="{ name: item.name }">{{ item.meta.title }}</BreadcrumbItem>
    </template>
  </Breadcrumb>
</template>
<script>
import { Breadcrumb, BreadcrumbItem } from 'view-design'
import { mapState } from 'vuex'
import { localStore } from '@/utils/storage'
import { ORIGIN_MENU_LIST } from '@/constants'

const BREAD_CLASS_PREFIX = 'custom__bread'

export default {
  name: 'CustomBread',
  components: {
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem,
  },
  data() {
    return {
      breads: [],
      prefix: BREAD_CLASS_PREFIX,
    }
  },
  watch: {
    $route: function(to, from) {
      let list = localStore.get(ORIGIN_MENU_LIST) || []
      let lists = this.originMenuList && this.originMenuList.length ? this.originMenuList : list
      let name = to.name
      this.$_setBreads(lists, name)
    },
  },
  computed: {
    ...mapState({
      originMenuList: state => state.originMenuList,
    }),
  },
  mounted() {
    let list = localStore.get(ORIGIN_MENU_LIST) || []
    let lists = this.originMenuList && this.originMenuList.length ? this.originMenuList : list
    let name = this.$route.name
    this.$_setBreads(lists, name)
  },
  methods: {
    $_setBreads(lists, name) {
      let find = (array, name) => {
        let stack = []
        let going = true

        let walker = (array, name) => {
          array.forEach(item => {
            if (!going) return
            stack.push({
              name: item.name,
              meta: item.meta,
            })
            if (item['name'] === name) {
              going = false
            } else if (item['children']) {
              walker(item['children'], name)
            } else {
              stack.pop()
            }
          })
          if (going) stack.pop()
        }
        walker(array, name)
        return stack
      }
      this.breads = find(lists, name)
    },
  },
}
</script>
