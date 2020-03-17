<template>
  <div :class="prefix">
    <slot></slot>
    <Button @click="$_navToBack">返 回</Button>
  </div>
</template>
<script>
import { Button } from 'view-design'
const BOTTOM_PANEL_PREFIX = 'bottom__panel'
export default {
  name: 'CustomBottomPanel',
  components: {
    Button,
  },
  data() {
    return {
      prefix: BOTTOM_PANEL_PREFIX,
    }
  },
  methods: {
    $_navToBack() {
      this.$router.back()
    },
  },
}
</script>
