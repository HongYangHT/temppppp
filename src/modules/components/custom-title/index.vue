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
const CUSTOM_TITLE_PREFIX = 'custom__title'
export default {
  name: 'CustomTitle',
  data() {
    return {
      prefix: CUSTOM_TITLE_PREFIX,
    }
  },
}
</script>
