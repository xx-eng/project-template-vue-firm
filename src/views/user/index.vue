<template>
  <div><!--人员管理-->
    <a-card>
      <a-row type="flex" justify="space-between">
        <a-col span="5" v-if="expand">
          <a-input
            v-model="tree.searchKey"
            placeholder="输入部门名称搜索？？？"
            allowClear
            @change="search"
            @pressEnter="search"
          >
            <a-icon slot="prefix" type="search" />
          </a-input>
          <div class="tree-bar" :style="{maxHeight: tree.maxHeight}">
            <a-tree
              ref="tree"
              :expandedKeys.sync="tree.expandedKeys"
              :selectedKeys.sync="tree.selectedKeys"
              :loadedKeys="tree.loadedKeys"
              :tree-data="tree.data"
              :loadData="loadData"
              @select="selectTree"
            />
          </div>
          <a-spin v-if="tree.loading" size="large" fix />
        </a-col>
        <div class="expand">
          <a-icon size="16" :type="expandIcon" class="icon" @click="changeExpand" />
        </div>
        <a-col :span="span">
          <a-alert showIcon v-if="tree.selectedNode">
            <template slot="message">
              当前选中：
              <span class="select-title">{{ tree.selectedNode.dataRef.title }}</span>
              <a class="ml-5" @click="cancelChosenNode">取消选择</a>
            </template>
          </a-alert>
          <List :class="{'mt-5':tree.selectedNode!==null}" :department-id="departmentId" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { getDepartmentTree } from '@/api/user'
import List from './List'

export default {
  name: 'UserManager',
  components: { List },
  data () {
    return {
      expand: true,
      expandIcon: 'left',
      span: 18,
      tree: { // 树状结构相关数据
        loading: false,
        searchKey: '',
        maxHeight: '500px',
        data: [],
        selectedKeys: [],
        expandedKeys: [],
        loadedKeys: [],
        selectedNode: null
      },
      departmentId: 0
    }
  },
  created () {
    this.listTree()
  },
  mounted () {
    // 计算高度
    const height = document.documentElement.clientHeight
    this.tree.maxHeight = Number(height - 300) + 'px'
  },
  methods: {
    changeExpand () {
      this.expand = !this.expand
      if (this.expand) {
        this.expandIcon = 'left'
        this.span = 18
      } else {
        this.expandIcon = 'right'
        this.span = 23
      }
    },
    processNodeData (data) {
      for (const v of data) {
        v['key'] = v['id']
        v['title'] = v['name']
        v['isLeaf'] = v['isParent'] === 0
      }
    },
    // 业务节点树相关
    listTree () {
      this.tree.loading = true
      this.tree.selectedNode = null
      this.tree.loadedKeys = []
      this.tree.selectedKeys = []
      this.tree.expandedKeys = []
      getDepartmentTree(0, '').then(response => {
        const { data } = response
        this.processNodeData(data)
        this.tree.data = data
        this.tree.loading = false
      })
    },
    search () {
      this.tree.loading = true
      getDepartmentTree(0, this.tree.searchKey).then(response => {
        const { data } = response
        this.processNodeData(data)
        this.tree.data = data
        this.tree.loading = false
      })
    },
    loadData (node) {
      return new Promise(resolve => {
        if (node.dataRef.children) {
          resolve()
          return
        }
        getDepartmentTree(node.dataRef.id, '').then(response => {
            if (this.tree.loadedKeys.findIndex(key => key === node.dataRef.id) === -1) {
              this.tree.loadedKeys.push(node.dataRef.id)
            }
          const { data } = response
          this.processNodeData(data)
          node.dataRef.children = data
          this.tree.data = [...this.tree.data]
          resolve()
        })
      })
    },
    selectTree (selectedKeys, e) {
      const { selected, node } = e
      console.log('e', e)
      if (selected) {
        this.tree.selectedNode = node
        this.departmentId = node.dataRef.id
        return
      }
      this.tree.selectedNode = null
      this.departmentId = 0
    },
    cancelChosenNode () {
      this.tree.selectedKeys = []
      this.tree.selectedNode = null
      this.departmentId = 0
    }
  }
}
</script>

<style lang="less" scoped>
.tree-bar {
  overflow: auto;
  margin-top: 5px;
}

.tree-bar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.tree-bar::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 2px #d1d1d1;
  background: #e4e4e4;
}

.expand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .icon {
    cursor: pointer;
  }

  :hover {
    color: #1890ff !important;
  }
}
</style>
