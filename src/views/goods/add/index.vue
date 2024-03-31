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
          <a-select-option v-for="item in categories" :value="item.id" :key="item.id" >
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
          <a-select-option v-for="item in brands" :value="item.id" :key="item.id" >
            {{ item.title }}
          </a-select-option>
        </a-select>
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
        label="商品简介"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['abstract']" />
      </a-form-item>
      <a-form-item
        label="商品描述"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-textarea v-decorator="['description']"></a-textarea>
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
        label="购买价格"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['price']"></a-input>
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
        <a-button @click="addGoods" type="danger">添加</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getAllBrand, getAllCategory, addGoods } from '@/api/goods'
import pick from 'lodash.pick'
import { notification } from 'ant-design-vue'

const fields = [
  'title', 'abstract', 'brandId', 'brandName', 'brandName', 'categoryId', 'categoryName', 'deposit', 'description', 'grounding', 'image', 'isSale', 'price', 'rentalTime', 'rental', 'rentalNum', 'saleNum', 'status', 'stock']

export default {
  name: 'AddGoods',
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
      categories: [],
      brands: [],
      imageId: '',
      image: ''
    }
  },
  mounted () {
    // this.record && this.form.setFieldsValue(pick(this.record, fields))
    this.form.setFieldsValue(pick(fields))
    console.log('record', this.form)
    getAllCategory().then(res => {
      console.log('res-category', res.data)
      this.categories = res.data
      console.log('category', this.categories)
    }).catch(error => {
      console.log(error)
    })
    getAllBrand().then(res => {
      console.log('brand', res.data)
      this.brands = res.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
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
    },
    addGoods () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          console.log('form', values)
          const photo = { imageId: this.imageId, image: this.image, firmId: 20212000001 }
          const requestParameters = Object.assign({}, photo, values)
          console.log('requestParam', requestParameters)
          return addGoods(requestParameters).then(res => {
            if (res.code === 2006) {
              notification.success({
                message: 'SUCCESS',
                description: '添加成功'
              })
            }
          })
        }
      })
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
        console.log('file', info.fileList[0].response.data)
        this.imageId = info.fileList[0].response.data.id
        this.image = '/file/image/' + info.fileList[0].response.data.fileName
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>

<style scoped>

</style>
