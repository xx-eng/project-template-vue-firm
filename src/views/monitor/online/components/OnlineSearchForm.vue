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
      label="操作人员"
      :style="{width:searchForm.width}">
      <a-select
        show-search
        allowClear
        option-filter-prop="children"
        :filter-option="filterOption"
        v-model="searchForm.form.userId"
        placeholder="请选择xx操作人员"
        @change="search"
      >
        <a-select-option v-for="item in userList" :value="item.id" :key="item.id">{{ item.username }}</a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item :label-width="0" style="width: 180px" :wrapper-col="{ span: 24 }">
      <a-button type="primary" icon="search" @click="search">搜索</a-button>
      <a-button icon="redo" class="ml-5" @click="reset">重置</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>

import TableSearchFormMixins from '@/mixins/TableSearchFormMixins'

export default {
  name: 'OnlineSearchForm',
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
