<template>
  <div>
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="品牌名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['title', {rules:[{required: true, message: '请输入'}]}]" />
      </a-form-item>
      <a-form-item
        label="类别"
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
        label="品牌描述"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-textarea v-decorator="['description']"></a-textarea>
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
        <a-button @click="addBrand" type="danger">添加</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getAllBrand, getAllCategory } from '@/api/goods'
import { addBrand } from '@/api/brand'
import pick from 'lodash.pick'

const fields = [
  'title', 'categoryId', 'description']

export default {
  name: 'AddBrand',
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
      logoId: '',
      logo: ''
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
    addBrand () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          console.log('form', values)
          const photo = { logoId: this.logoId, logo: this.logo, firmId: 20212000001 }
          const requestParameters = Object.assign({}, photo, values)
          console.log('requestParam', requestParameters)
          return addBrand(requestParameters).then(res => {
            if (res.code === 2006) {
              alert('添加成功')
            }
          })
        }
      })
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
        console.log('file', info.fileList[0].response.data)
        this.logoId = info.fileList[0].response.data.id
        this.logo = '/file/image/' + info.fileList[0].response.data.fileName
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
