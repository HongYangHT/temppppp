<template>
  <div class="layout">
    <Layout name="wrapper">
      <Header>
        <custom-nav>
          <div class="layout-logo">
            模版工程
          </div>
        </custom-nav>
      </Header>
      <Layout name="inner">
        <Sider class="sider__left" :style="{ width: 'auto', maxWidth: 'auto', minWidth: 'auto', flex: 'none' }">
          <custom-menu></custom-menu>
        </Sider>
        <Layout class="layout__content" name="content">
          <custom-bread></custom-bread>
          <Content class="content__content">
            <router-view>
              <div class="container">
                模版工程
              </div>
            </router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { Layout, Header, Sider, Content } from 'view-design'
import CustomMenu from '@/modules/components/menu/index.vue'
import CustomNav from '@/modules/components/nav/index.vue'
import CustomBread from '@/modules/components/bread/index.vue'
import bus from '@/utils/bus'
import { mapActions } from 'vuex'

export default {
  components: {
    [Layout.name]: Layout,
    [Header.name]: Header,
    [Sider.name]: Sider,
    [Content.name]: Content,
    [CustomMenu.name]: CustomMenu,
    [CustomNav.name]: CustomNav,
    [CustomBread.name]: CustomBread,
  },
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchUserInfo()
    })
  },
  methods: {
    ...mapActions(['fetchUserInfo']),
    $_mouseover() {
      bus.$emit('on-show-sub-menu')
    },
    $_mouseout() {
      bus.$emit('on-hide-sub-menu')
    },
  },
}
</script>
