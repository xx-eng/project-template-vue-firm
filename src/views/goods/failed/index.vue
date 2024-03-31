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
          <img :src="record.image" style="width: 70px;" />
        </template>

        <template slot="action" slot-scope="text,record">
          <a-button type="danger" icon="edit" size="small" @click="forceQuit(record.id)">详情</a-button>
        </template>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { Ellipsis, STable } from '@/components'
// import { forceQuit, listOnlineUser } from '@/api/monitor'
// import { listAllUser } from '@/api/user'
import { getAuditGoods, getAllCategory } from '@/api/goods'
import OnlineSearchForm from '@/views/goods/audit/components/OnlineSearchForm'
import TableMixins from '@/mixins/TableMixins'

export default {
  name: 'FailedGoods',
  mixins: [TableMixins],
  components: {
    OnlineSearchForm,
    STable,
    Ellipsis
  },
  data () {
    return {
      data: {
        goodsList: [],
        categoryList: []
        // userList: []
      },
      table: {
        hasData: false,
        columns: [{
          width: 80,
          align: 'center',
          dataIndex: 'id',
          title: '商品编号'
          // scopedSlots: { customRender: 'sessionId' }
        }, {
          width: 140,
          align: 'center',
          dataIndex: 'image',
          title: '商品图片',
          scopedSlots: { customRender: 'img' }
        }, {
          width: 200,
          align: 'center',
          dataIndex: 'title',
          title: '商品名称'
        }, {
          width: 100,
          align: 'center',
          dataIndex: 'brandName',
          title: '商品品牌'
        }, {
          width: 100,
          align: 'center',
          dataIndex: 'categoryName',
          title: '商品类型'
        }, {
          width: 50,
          align: 'center',
          dataIndex: 'rental',
          title: '租金'
        }, {
          width: 50,
          align: 'center',
          dataIndex: 'deposit',
          title: '押金'
        }, {
          width: 80,
          align: 'center',
          dataIndex: 'status',
          title: '审核状态'
        }, {
          width: 80,
          align: 'center',
          dataIndex: 'stock',
          title: '库存'
        }, {
          width: 140,
          align: 'center',
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }],
        loadData: parameter => {
          const pageData = {
            pageSize: parameter.pageSize,
            pageNumber: parameter.pageNo
          }
          const firm = { firmId: 20212000001, status: 2 }
          const requestParameters = Object.assign({}, pageData, firm, this.searchForm.form)
          console.log('requestParam', requestParameters)
          return getAuditGoods(requestParameters).then(res => {
            console.log('s-table', res)
            res['pageNo'] = parameter['pageNo']
            for (const goodsInfo of res.data) {
              goodsInfo.image = process.env.VUE_APP_API_HOST + goodsInfo.image
              if (goodsInfo.status === 0) {
                goodsInfo.status = '未审核'
              }
              if (goodsInfo.status === 1) {
                goodsInfo.status = '已通过'
              }
              if (goodsInfo.status === 2) {
                goodsInfo.status = '未通过'
              }
              goodsInfo.rental = Number(goodsInfo.rental)
              goodsInfo.deposit = Number(goodsInfo.deposit)
            }
            return res
          })
        }
      }
    }
  },
  created () {
    // this.getUserList()
    this.getAuditList()
    this.getAuditList()
  },
  mounted () {
    console.log('进入failed')
    console.log('table', this.table)
  },
  methods: {
    /* getUserList () {
      listAllUser().then(response => {
        this.data.userList = response.data
      })
    }, */
    getAuditList () {
      console.log('failed')
      const pageData = {
        pageSize: 1,
        pageNumber: 10
      }
      const firm = { firmId: 20212000001 }
      const sta = { status: 2 }
      console.log('sta???', sta)
      const requestParameters = Object.assign({}, pageData, firm, sta)
      getAuditGoods(requestParameters).then(response => {
        this.data.goodsList = response.data
        console.log('goodsList', this.data.goodsList)
      })
    },
    getCategoryList () {
      getAllCategory().then(res => {
        this.data.categoryList = res.data
        console.log('categories', this.data.categoryList)
      })
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
