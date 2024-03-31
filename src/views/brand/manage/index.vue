<template>
  <div><!--待审核商品-->
    <a-card :bordered="false">
      <OnlineSearchForm :user-list="data.categoryList" @search="search"></OnlineSearchForm>
    </a-card>

    <a-card :bordered="false" class="mt-10">
      <s-table
        ref="table"
        rowKey="id"
        :columns="table.columns"
        :data="table.loadData"
        :alert="false"
        showPagination="auto"
      >
        <template slot="img" slot-scope="text, record">
          <img :src="record.logo" style="width: 70px;" />
        </template>

        <!--<template slot="action" slot-scope="text,record">
          <a-button type="danger" icon="edit" size="small" @click="forceQuit(record.id)">详情</a-button>
        </template>-->
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { Ellipsis, STable } from '@/components'
// import { forceQuit, listOnlineUser } from '@/api/monitor'
// import { listAllUser } from '@/api/user'
import { getFirmBrand } from '@/api/brand'
import OnlineSearchForm from '@/views/goods/audit/components/OnlineSearchForm'
import TableMixins from '@/mixins/TableMixins'
import { getAllCategory } from '@/api/goods'

export default {
  name: 'ManageBrand',
  mixins: [TableMixins],
  components: {
    OnlineSearchForm,
    STable,
    Ellipsis
  },
  data () {
    return {
      data: {
        brandList: [],
        categoryList: [],
        // userList: []
        grounding: ''
      },
      table: {
        hasData: false,
        columns: [{
          width: 80,
          align: 'center',
          dataIndex: 'id',
          title: '品牌编号'
          // scopedSlots: { customRender: 'sessionId' }
        }, {
          width: 140,
          align: 'center',
          dataIndex: 'logo',
          title: '商品图片',
          scopedSlots: { customRender: 'img' }
        }, {
          width: 200,
          align: 'center',
          dataIndex: 'title',
          title: '品牌名称'
        }, {
          width: 250,
          align: 'center',
          dataIndex: 'description',
          title: '详细描述'
        }, {
          width: 100,
          align: 'center',
          dataIndex: 'categoryName',
          title: '分类'
        }, {
          width: 140,
          align: 'center',
          dataIndex: 'statusTitle',
          title: '审核情况'
          // scopedSlots: { customRender: 'action' }
        }],
        loadData: parameter => {
          const pageData = {
            pageSize: parameter.pageSize,
            pageNumber: parameter.pageNo
          }
          const firm = { firmId: 20212000001 }
          const requestParameters = Object.assign({}, pageData, firm, this.searchForm.form)
          console.log('requestParam', requestParameters)
          return getFirmBrand(requestParameters).then(res => {
            res['pageNo'] = parameter['pageNo']
            console.log(res.data)
            for (const goodsInfo of res.data) {
              goodsInfo.logo = process.env.VUE_APP_API_HOST + goodsInfo.logo
              if (goodsInfo.status === 0) {
                goodsInfo.statusTitle = '未审核'
              }
              if (goodsInfo.status === 1) {
                goodsInfo.statusTitle = '审核通过'
              }
              if (goodsInfo.status === 2) {
                goodsInfo.statusTitle = '审核未通过'
              }
              console.log(goodsInfo.logo)
            }
            return res
          })
        }
      }
    }
  },
  created () {
    // this.getUserList()
    this.getCategoryList()
  },
  mounted () {
    console.log('进入failed')
  },
  methods: {
    /* getUserList () {
      listAllUser().then(response => {
        this.data.userList = response.data
      })
    }, */
    getBrandList () {
      console.log('failed')
      const pageData = {
        pageSize: 1,
        pageNumber: 10
      }
      const firm = { firmId: 20212000001 }
      const requestParameters = Object.assign({}, pageData, firm)
      getFirmBrand(requestParameters).then(response => {
        this.data.brandList = response.data
        for (const goodsInfo of this.data.brandList) {
          goodsInfo.image = process.env.VUE_APP_API_HOST + goodsInfo.image
        }
        console.log('brandList', this.data.brandList)
      })
    },
    getCategoryList () {
      getAllCategory().then(res => {
        this.data.categoryList = res.data
        console.log('categories', this.data.categoryList)
      })
    },
    onChange (checked, record) {
      record.grounding = !record.grounding
      console.log(record.grounding)
    }
    /* forceQuit (id) {
      const _this = this
      const modal = this.$confirm({
        title: '系统提示',
        content: '是否确认强退该用户？',
        loading: true,
        onOk: () => {
          forceQuit(id).then(() => {
            // 删除成功，重新加载树状结构数据
            _this.$refs.table.refresh()
            modal.destroy()
            _this.$message.success({
              content: '强退成功'
            })
          })
        }
      })
    } */
  }
}
</script>

<style lang="less" scoped>

</style>
