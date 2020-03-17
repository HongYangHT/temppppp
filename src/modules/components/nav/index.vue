<template>
  <div :class="prefix">
    <slot></slot>
    <div :class="prefix + '__right'">
      <span :class="prefix + '__tip'">欢迎您! {{ user && user.base && user.base.name }}</span>
      <a :class="prefix + '__logout'" href="javascript:;" @click="$_onLogout">
        <Icon type="ios-log-out" size="24" />
      </a>
    </div>
  </div>
</template>
<script>
import { Icon } from 'view-design'
import { TOKEN } from '@/constants'
import { localStore } from '@/utils/storage'
import { mapActions, mapState } from 'vuex'
const NAV_CLASS_PREFIX = 'custom__nav'

export default {
  name: 'CustomNav',
  components: {
    Icon,
  },
  data() {
    return {
      prefix: NAV_CLASS_PREFIX,
      user: {},
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },
  watch: {
    userInfo(value) {
      this.user = value
    },
  },
  mounted() {
    this.user = this.userInfo
  },
  methods: {
    ...mapActions(['logout']),
    $_onLogout() {
      this.logout().then(result => {
        if (result.code === 200) {
          window.location.search = ''
          localStore.remove(TOKEN)
          window.location.href = '//sso.sdongpo.com/?action=logout#/login'
        }
      })
    },
  },
}
</script>
