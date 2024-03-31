<template>
  <div>
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="请输入物流单号"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-model="logisticsId"></a-input>
        <!--<a-input v-decorator="['title', {rules:[{required: true, message: '请输入'}]}]" />-->
      </a-form-item>
      <!--<a-form-item
        label="商品类别"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select placeholder="请输入类别" style="width: 200px" v-decorator="['categoryId']">
          <a-select-option v-for="item in category" :value="item.id" :key="item.id" >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="品牌"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select placeholder="请输入品牌" style="width: 200px" v-decorator="['brandId']">
          <a-select-option v-for="item in brand" :value="item.id" :key="item.id" >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="商品描述"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-textarea v-decorator="['description']"></a-textarea>
      </a-form-item>
      <a-form-item
        label="商品简介"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['abstract']" />
      </a-form-item>
      <a-form-item
        label="租金"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['rental']"></a-input>
      </a-form-item>
      <a-form-item
        label="押金"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['deposit']"></a-input>
      </a-form-item>
      <a-form-item
        label="是否可买"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select v-decorator="['isSale']">
          <a-select-option :value="1">可买</a-select-option>
          <a-select-option :value="2">不可买</a-select-option>
        </a-select>
      </a-form-item>-->
    </a-form>
  </div>
</template>

<script>
import pick from 'lodash.pick'
// import { getAllBrand, getAllCategory } from '@/api/goods'
import { consignment } from '@/api/order'

const fields = [
  'goodsTitle', 'abstract', 'brandId', 'brandName', 'brandName', 'categoryId', 'categoryName', 'deposit', 'description', 'grounding', 'image', 'isSale', 'price', 'rentalTime', 'rental', 'rentalNum', 'saleNum', 'status', 'stock']

export default {
  name: 'Consign',
  props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      form: this.$form.createForm(this),
      logisticsId: ''
    }
  },
  mounted () {
    this.record && this.form.setFieldsValue(pick(this.record, fields))
    console.log('record', this.form)
  },
  methods: {
    onOk () {
      console.log('监听了 modal ok 事件')
      console.log('record::', this.record)
      console.log('logisticsId::', this.logisticsId)
      const data = { id: this.record.id, logisticsId: this.logisticsId }
      const requestParameters = Object.assign({}, data)
      console.log('request::', requestParameters)
      consignment(requestParameters)
      return new Promise(resolve => {
        resolve(true)
      })
    },
    onCancel () {
      console.log('监听了 modal cancel 事件')
      return new Promise(resolve => {
        resolve(true)
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
        }
      })
    }
  }
}
</script>
