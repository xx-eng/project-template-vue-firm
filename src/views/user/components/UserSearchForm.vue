<template>
  <a-form-model
    ref="searchForm"
    :model="searchForm.form"
    :label-width="80"
    layout="inline"
    @submit.native.prevent
    :label-col="{span:6}"
    :wrapper-col="{ span: 18 }"
  >
    <a-form-model-item
      label="中文姓名"
      prop="username"
      :style="{width:searchForm.width}">
      <a-input
        v-model="searchForm.form.name"
        type="text"
        placeholder="请输入用户中文名称"
        @keyup.enter.native="search"
      />
    </a-form-model-item>
    <a-form-model-item
      label="登录账号"
      prop="account"
      :style="{width:searchForm.width}">
      <a-input
        v-model="searchForm.form.account"
        type="text"
        placeholder="请输入登录账号"
        @keyup.enter.native="search"
      />
    </a-form-model-item>
    <a-form-model-item
      label="联系方式"
      prop="phoneNumber"
      :style="{width:searchForm.width}"
    >
      <a-input
        v-model="searchForm.form.mobile"
        type="text"
        placeholder="请输入联系方式"
        @keyup.enter.native="search"
      />
    </a-form-model-item>
    <a-form-model-item
      v-if="!isSimple"
      label="用户状态"
      :style="{width:searchForm.width}"
      prop="userStatus">
      <a-select
        allowClear
        v-model="searchForm.form.status"
        placeholder="请选择用户状态"
        @change="search"
      >
        <a-select-option :value="0">所有</a-select-option>
        <a-select-option :value="1">正常</a-select-option>
        <a-select-option :value="2">禁用</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item v-if="!isSimple" label="创建时间" prop="time" :style="{width:searchForm.width}">
      <a-range-picker v-model="searchForm.form.time" format="YYYY/MM/DD" @change="search"/>
    </a-form-model-item>
    <a-form-model-item :label-width="0" :style="{width:searchForm.width}">
      <a-button type="primary" icon="search" @click="search">搜索</a-button>
      <a-button icon="redo" class="ml-5" @click="reset">重置</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import moment from 'moment'
import TableSearchFormMixins from '@/mixins/TableSearchFormMixins'

export default {
  name: 'UserSearchForm',
  mixins: [TableSearchFormMixins],
  props: {
    isSimple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchForm: {
        width: '300px'
      }
    }
  },
  methods: {
    moment,
    search () {
      const data = { ...this.searchForm.form }
      if (data.time && data.time.length > 0) {
        data.startTime = data.time[0].format('YYYY-MM-DD')
        data.endTime = data.time[1].format('YYYY-MM-DD')
        delete data.time
      } else {
        delete data.startTime
        delete data.endTime
      }
      this.$emit('search', data)
    }
  }
}
</script>

<style scoped>

</style>
