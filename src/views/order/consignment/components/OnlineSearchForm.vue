<template>
  <a-form-model
    ref="searchForm"
    :model="searchForm.form"
    layout="inline"
    @submit.native.prevent
    :label-col="{span:5}"
    :wrapper-col="{ span: 19 }"
  >
    <a-form-model-item
      label="订单类型"
      :style="{width:searchForm.width}">
      <a-select
        show-search
        allowClear
        option-filter-prop="children"
        :filter-option="filterOption"
        v-model="searchForm.form.type"
        placeholder="请选择订单类型"
        @change="search"
      >
        <tag-select-option :value="0">全部</tag-select-option>
        <!--<a-select-option v-for="item in userList" :value="item.id" :key="item.id">{{ item.username }}</a-select-option>-->
        <a-select-option :value="1">以租代售</a-select-option>
        <a-select-option :value="2">共享租赁</a-select-option>
        <a-select-option :value="3">先租后售</a-select-option>
      </a-select>
    </a-form-model-item>

    <!--<a-form-model-item
      label="订单状态"
      :style="{width:searchForm.width}">
      <a-select
        show-search
        allowClear
        option-filter-prop="children"
        :filter-option="filterOption"
        v-model="searchForm.form.orderState"
        placeholder="请选择订单状态"
        @change="search"
      >
        <tag-select-option :value="0">全部</tag-select-option>
        <a-select-option v-for="item in userList" :value="item.id" :key="item.id">{{ item.username }}</a-select-option>
        <a-select-option :value="1">未支付</a-select-option>
        <a-select-option :value="3">未发货</a-select-option>
        <a-select-option :value="4">已发货</a-select-option>
        <a-select-option :value="6">续租</a-select-option>
        <a-select-option :value="7">已购买</a-select-option>
        <a-select-option :value="8">退租</a-select-option>
        <a-select-option :value="9">正在返还</a-select-option>
      </a-select>
    </a-form-model-item>-->

    <a-form-model-item :label-width="0" style="width: 180px" :wrapper-col="{ span: 24 }">
      <a-button type="primary" icon="search" @click="search">搜索</a-button>
      <a-button icon="redo" class="ml-5" @click="reset">重置</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>

import TableSearchFormMixins from '@/mixins/TableSearchFormMixins'
import TagSelectOption from '@/components/TagSelect/TagSelectOption'

export default {
  name: 'OnlineSearchForm',
  components: { TagSelectOption },
  mixins: [TableSearchFormMixins],
  props: {
    userList: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      searchForm: {
        width: '340px'
      }
    }
  }
}
</script>
