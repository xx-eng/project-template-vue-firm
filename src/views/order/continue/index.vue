<template>
  <div><!--待审核商品-->
    <a-card :bordered="false">
      <OnlineSearchForm :user-list="data.userList" @search="search"></OnlineSearchForm>
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
import { getReletOrders } from '@/api/order'
import OnlineSearchForm from '@/views/order/consignment/components/OnlineSearchForm'
import TableMixins from '@/mixins/TableMixins'

export default {
  name: 'Continue',
  mixins: [TableMixins],
  components: {
    OnlineSearchForm,
    STable,
    Ellipsis
  },
  data () {
    return {
      data: {
        goodsList: []
        // userList: []
      },
      table: {
        hasData: false,
        columns: [{
          width: 80,
          align: 'center',
          dataIndex: 'id',
          title: '订单编号'
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
          dataIndex: 'goodsTitle',
          title: '商品名称'
        }, {
          width: 100,
          align: 'center',
          dataIndex: 'userId',
          title: '用户编号'
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
          title: '订单状态'
        }, {
          width: 80,
          align: 'center',
          dataIndex: 'typeName',
          title: '订单类型'
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
          const firm = { firmId: 20212000001 }
          const sta = { status: 6 }
          const requestParameters = Object.assign({}, pageData, firm, sta)
          console.log('requestParam', requestParameters)
          return getReletOrders(requestParameters).then(res => {
            res['pageNo'] = parameter['pageNo']
            for (const goodsInfo of res.data) {
              goodsInfo.image = process.env.VUE_APP_API_HOST + goodsInfo.image
              if (goodsInfo.orderState === 1) {
                goodsInfo.status = '待付款'
              }
              if (goodsInfo.orderState === 3) {
                goodsInfo.status = '待发货'
              }
              if (goodsInfo.orderState === 4) {
                goodsInfo.status = '待收货'
              }
              if (goodsInfo.orderState === 6) {
                goodsInfo.status = '续租'
              }
              if (goodsInfo.orderState === 7) {
                goodsInfo.status = '已购买'
              }
              if (goodsInfo.orderState === 8) {
                goodsInfo.status = '退租'
              }
              if (goodsInfo.orderState === 9) {
                goodsInfo.status = '返还'
              }
              if (goodsInfo.type === '1') {
                console.log('type', goodsInfo.type)
                goodsInfo.typeName = '以租代售'
              }
              if (goodsInfo.type === '2') {
                goodsInfo.typeName = '共享租赁'
              }
              if (goodsInfo.type === '3') {
                goodsInfo.typeName = '先租后售'
              }
              console.log(goodsInfo)
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
    this.getOrderList()
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
    getOrderList () {
      console.log('failed')
      const pageData = {
        pageSize: 1,
        pageNumber: 10
      }
      const firm = { firmId: 20212000001 }
      const sta = { status: 6 }
      console.log('sta???', sta)
      const requestParameters = Object.assign({}, pageData, firm, sta)
      getReletOrders(requestParameters).then(response => {
        this.data.goodsList = response.data
        console.log('orderList', this.data.goodsList)
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
