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
import { getAllTrade } from '@/api/order'
import OnlineSearchForm from '@/views/monitor/online/components/OnlineSearchForm'
import TableMixins from '@/mixins/TableMixins'

export default {
  name: 'Trade',
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
          width: 140,
          align: 'center',
          dataIndex: 'id',
          title: '交易编号'
          // scopedSlots: { customRender: 'sessionId' }
        }, {
          width: 140,
          align: 'center',
          dataIndex: 'orderId',
          title: '订单编号'
          // scopedSlots: { customRender: 'img' }
        }, {
          width: 200,
          align: 'center',
          dataIndex: 'createdTime',
          title: '交易时间'
        }, {
          width: 200,
          align: 'center',
          dataIndex: 'clientId',
          title: '用户编号'
        }, {
          width: 100,
          align: 'center',
          dataIndex: 'money',
          title: '交易金额'
        }],
        loadData: parameter => {
          const pageData = {
            pageSize: parameter.pageSize,
            pageNumber: parameter.pageNo
          }
          const firm = { firmId: 20212000001 }
          const requestParameters = Object.assign({}, pageData, firm)
          console.log('requestParam', requestParameters)
          return getAllTrade(requestParameters).then(res => {
            res['pageNo'] = parameter['pageNo']
            for (const tradeList of res.data) {
              tradeList.money = Number(tradeList.money)
            }
            return res
          })
        }
      }
    }
  },
  created () {
    // this.getUserList()
    this.getTradeList()
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
    getTradeList () {
      console.log('failed')
      const pageData = {
        pageSize: 1,
        pageNumber: 10
      }
      const firm = { firmId: 20212000001 }
      const requestParameters = Object.assign({}, pageData, firm)
      getAllTrade(requestParameters).then(response => {
        this.data.goodsList = response.data
        for (const tradeList of this.data.goodsList) {
          tradeList.money = Number(tradeList.money)
        }
        console.log('trade', this.data.goodsList)
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
