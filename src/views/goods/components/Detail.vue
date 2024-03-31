<template>
  <div>
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="商品名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['title', {rules:[{required: true, message: '请输入'}]}]" />
      </a-form-item>
      <a-form-item
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
            {{ item.title }}
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
      </a-form-item>
      <a-form-item
        label="库存"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['stock']"></a-input>
      </a-form-item>
      <a-form-item
        label="最短租赁天数"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['rentTime']" />
      </a-form-item>
      <a-form-item label="添加图片" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-upload
          name="file"
          :multiple="true"
          action="http://121.40.235.133:8080/file/upload"
          :headers="headers"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> Click to Upload </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item style="position: absolute; left: 50%; transform: translate(-50%);">
        <a-button @click="updateGoods" type="danger">更改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import pick from 'lodash.pick'
import { getAllBrand, getAllCategory, updateGoods } from '@/api/goods'

const fields = [
  'title', 'abstract', 'brandId', 'brandName', 'brandName', 'categoryId', 'categoryName', 'deposit', 'description', 'grounding', 'image', 'isSale', 'price', 'rentalTime', 'rental', 'rentalNum', 'saleNum', 'status', 'stock']

export default {
  name: 'Detail',
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
      category: [],
      brand: [],
      imageId: '',
      image: ''
    }
  },
  mounted () {
    this.record && this.form.setFieldsValue(pick(this.record, fields))
    console.log('record', this.form)
    getAllCategory().then(res => {
      console.log('res-category', res.data)
      this.category = res.data
      console.log('category', this.category)
    }).catch(error => {
      console.log(error)
    })
    getAllBrand().then(res => {
      this.brand = res.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    updateGoods () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          console.log('form', values)
          const photo = { id: this.record.id }
          const requestParameters = Object.assign({}, photo, values)
          console.log('requestParam', requestParameters)
          return updateGoods(requestParameters).then(res => {
            if (res.code === 2004) {
              alert('更改成功')
            }
          })
        }
      })
    },
    onOk () {
      console.log('监听了 modal ok 事件')
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
