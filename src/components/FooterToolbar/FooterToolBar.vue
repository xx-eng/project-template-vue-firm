<template>
  <div :class="prefixCls" :style="{ width: barWidth, transition: '0.3s all' }">
    <div style="float: left">
      <slot name="extra">{{ extra }}</slot>
    </div>
    <div style="float: right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterToolBar',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-footer-toolbar'
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    siderWidth: {
      type: Number,
      default: undefined
    },
    extra: {
      type: [String, Object],
      default: ''
    },
    customBarWidth: {
      type: Number,
      default: 0
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    barWidth () {
      if (this.fullWidth) {
        return '100vw'
      }
      if (this.customBarWidth === 0) {
        return this.isMobile ? undefined : `calc(100% - ${this.collapsed ? 80 : this.siderWidth || 256}px)`
      }
      return `${this.customBarWidth}px`
    }
  }
}
</script>

<style lang="less">
@import "./index";
</style>
