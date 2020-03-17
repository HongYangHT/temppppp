<template>
  <div :class="mainCls" @mouseover="$_mouseover" @mouseout="$_mouseout">
    <div :class="prefix + '__main'">
      <Menu :active-name="activeName" width="82px" @on-select="$_onSelectMenu">
        <MenuItem v-for="item in menuList" :key="item.name" :name="item.name">
          <Icon :type="item.meta.icon" size="30" />
          <p>{{ item.meta.title }}</p>
        </MenuItem>
      </Menu>
    </div>
    <div :class="prefix + '__sub'" v-if="subMenuList && subMenuList.length && (!hideSub || hover)">
      <Menu :active-name="subActiveName" width="112px" @on-select="$_onSelectSubMenu">
        <MenuItem v-for="item in subMenuList" :key="item.name" :name="item.name" :to="{ name: item.name }">{{ item.meta.title }}</MenuItem>
      </Menu>
      <div v-if="!hideSub" :class="prefix + '__slider'" @click="$_collapseSubMenu">
        <Icon type="ios-arrow-back" size="18" />
        <span>收起</span>
      </div>
      <div :class="prefix + '__slider'" @click="$_OpenCollapseSubMenu" v-else>
        <span>固定</span>
        <Icon type="ios-arrow-forward" size="18" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { Menu, MenuItem, Icon } from 'view-design'
import bus from '@/utils/bus'
import { localStore } from '@/utils/storage'
import { SET_ACTIVENAME, SET_SUB_ACTIVENAME } from '@/store/constants'
import { CURRENT_MENU, CURRENT_SUB_MENU } from '@/constants'

const NAV_CLASS_PREFIX = 'custom__menu'

export default {
  name: 'CustomMenu',
  components: {
    Menu,
    MenuItem,
    Icon,
  },
  data() {
    return {
      prefix: NAV_CLASS_PREFIX,
      hideSub: false,
      hover: false,
      activeName: '',
      subActiveName: '',
      subMenuList: [],
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.menuList,
    }),
    mainCls() {
      return [
        `${this.prefix}`,
        {
          [`${this.prefix}__sub--hide`]: this.hideSub,
          [`${this.prefix}--hover`]: this.hover,
        },
      ]
    },
  },
  mounted() {
    bus.$on('set-sub-menu-list', subMenuList => {
      this.subMenuList = subMenuList || this.subMenuList
    })
    bus.$on('on-show-sub-menu', () => {
      this.$_mouseover()
    })
    bus.$on('on-hide-sub-menu', () => {
      this.$_mouseout()
    })
    this.activeName = localStore.get(CURRENT_MENU) || ''
    this.subActiveName = localStore.get(CURRENT_SUB_MENU) || ''
    if (this.menuList && this.menuList.length) {
      this.subMenuList = this.$_getSubMenu(this.menuList, this.subActiveName)
    } else {
      this.subMenuList = []
    }
    if (this.subActiveName) {
      this.$router.push({
        name: this.subActiveName,
      })
    } else {
      this.$router.push({
        name: 'dashboard',
      })
    }
  },
  methods: {
    ...mapMutations([SET_ACTIVENAME, SET_SUB_ACTIVENAME]),
    $_getSubMenu(menuList, subActiveName) {
      let stack = []
      let going = true
      let walker = (array, name) => {
        array.forEach(item => {
          if (!going) return
          stack.push(item)
          if (item['name'] === name) {
            stack = array
            going = false
          } else if (item['children']) {
            walker(item['children'], name)
          } else {
            stack.pop()
          }
        })
        if (going) stack.pop()
      }
      walker(menuList, subActiveName)
      // if (stack && stack.length) {
      //   stack.shift()
      // }
      return stack
    },
    // NOTE: 显示二级菜单
    $_mouseover() {
      if (this.subMenuList && this.subMenuList.length) {
        this.$nextTick(() => {
          bus.$emit('on-content-resize')
        })
        this.hover = true
      }
    },
    $_mouseout() {
      if (this.hideSub) {
        this.$nextTick(() => {
          bus.$emit('on-content-resize')
        })
        this.hover = false
      }
    },
    $_onSelectMenu(name) {
      this.activeName = name
      let currentMenuList = this.menuList.find(item => item.name === name)
      this.subMenuList = (currentMenuList && currentMenuList.children) || []
      this[SET_ACTIVENAME](name)
      // let subMenu = this.$_checkLegalSubMenu(this.subMenuList)
      let subMenuName = this.subMenuList && this.subMenuList.length ? this.subMenuList[0].name : ''
      this.$_onSelectSubMenu(subMenuName)

      // NOTE: 存入缓存
      localStore.set(CURRENT_MENU, name)
      this.$router.push({
        name: subMenuName,
      })
    },
    $_checkLegalSubMenu(menu) {},
    $_onSelectSubMenu(name) {
      this.subActiveName = name
      this[SET_SUB_ACTIVENAME](name)

      // NOTE: 缓存二级菜单
      localStore.set(CURRENT_SUB_MENU, name)
    },
    // 隐藏二级菜单
    $_collapseSubMenu() {
      this.hideSub = true
    },
    $_OpenCollapseSubMenu() {
      this.hideSub = false
    },
  },
}
</script>
