<template>
  <div :class="prefix">
    <custom-title>
      <p>支付概况</p>
    </custom-title>
    <div class="container">
      企业支付网关
    </div>
  </div>
</template>
<script>
import CustomTitle from '@/modules/components/custom-title/index.vue'

const DASHBOARD_CLASS_PREFIX = 'dashboard'

export default {
  components: {
    CustomTitle,
  },
  data() {
    return {
      prefix: DASHBOARD_CLASS_PREFIX,
    }
  },
}
</script>
