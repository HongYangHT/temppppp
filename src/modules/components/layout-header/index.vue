<template>
  <div :class="prefix">
    <div :class="prefix + '__left'">
      <slot></slot>
    </div>
    <div :class="prefix + '__right'">
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script>
const LAYOUT_CLASS_PREFIX = 'layout__header'
export default {
  name: 'CustomLayoutHeader',
  data() {
    return {
      prefix: LAYOUT_CLASS_PREFIX,
    }
  },
}
</script>
