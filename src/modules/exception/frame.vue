<template>
  <div class="exception">
    <div class="content">
      <h1>{{ config[type].title }}</h1>
      <div class="desc">
        {{ config[type].desc }}
      </div>
      <div class="action">
        <Button type="primary" @click="$_handleToHome">
          返回首页
        </Button>
        <p>{{ $t('t.code') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'view-design'

export default {
  name: 'ExceptionFrame',
  components: {
    [Button.name]: Button,
  },
  props: {
    type: {
      type: String,
      default: '404',
    },
  },
  data() {
    return {
      config: {
        403: {
          title: '403',
          desc: '抱歉，你无权访问该页面',
        },
        404: {
          title: '404',
          desc: '抱歉，你访问的页面不存在或仍在开发中',
        },
        500: {
          title: '500',
          desc: '抱歉，服务器出错了',
        },
      },
    }
  },
  methods: {
    $_handleToHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.exception {
  align-items: center;
  margin-top: 150px;
  text-align: center;

  .content {
    display: inline-block;
    flex: auto;

    h1 {
      margin-bottom: 24px;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      color: #434e59;
    }

    .desc {
      margin-bottom: 16px;
      font-size: 20px;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>
