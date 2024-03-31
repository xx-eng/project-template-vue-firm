<template>
  <div>
    <a-form-model-item label="菜单权限">
      <a-tree
        :checkStrictly="true"
        ref="editFormMenuTree"
        checkable
        :selectedKeys="menu.chosenNode"
        :loadedKeys="menu.loadedKeys"
        v-model="menu.checkedKeys"
        :treeData="menu.data"
        @expand="onExpand"
        @select="selectTree"
        show-icon
      >
        <a-icon slot="box" type="profile" />
        <a-icon slot="list" type="align-left" />
        <a-icon slot="on" type="tool" />
      </a-tree>
    </a-form-model-item>
  </div>
</template>

<script>
import { allListMenuTree } from '@/api/menu.js'
// import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'ChoosePermission',
  props: {
    menuList: {
      type: Array,
      default: null
    },
    isAdd: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      menu: {
        expandedKeys: [],
        isFirstLoadData: true, // 是否第一次进行懒加载请求
        callback: null, // 懒加载函数
        loading: false,
        maxHeight: '500px',
        data: [],
        chosenNode: [],
        checkedKeys: [],
        loadedKeys: []
      },
      app: {
        data: [],
        chosenNode: []
      }
    }
  },
  watch: {
    menuList (n, o) {
      // && !this.isAdd
      if (n && n.length > 0) {
        this.menu.checkedKeys = n
      } else {
        this.menu.checkedKeys = []
      }
    }
  },
  mounted () {
    // 获取权限菜单信息
    this.listMenu()
  },
  methods: {
    initaddForm () {
      this.menu.chosenNode = []
    },
    selectTree (selectedKeys, e) {
      console.log(selectedKeys, e)
      this.menu.selectedKeys = selectedKeys
    },
    onExpand (expandedKeys) {
      this.menu.expandedKeys = expandedKeys
    },
    listMenu () {
      this.menu.loading = true
      this.menu.chosenNode = []
      allListMenuTree().then(response => {
        const { data } = response
        this.menu.data = this.transitionData(data)
        this.menu.loading = false
        if (this.isAdd) {
          this.menu.checkedKeys = []
        } else {
          this.menu.checkedKeys = this.menuList
        }
      })
    },
    transitionData (data) {
      for (const v of data) {
        // v['expand'] = false
        v['key'] = v['id']
        v['isLeaf'] = v['isParent'] !== 1
        const icon = v['isParent'] === 1 ? 'box' : 'list'
        v['slots'] = {}
        v['slots'].icon = (v['type'] === 1 ? icon : 'on')
        if (v['isParent'] === 1 && v['children'].length > 0) {
          this.transitionData(v['children'])
        }
      }
      return data
    },
    // 重置菜单选择
    resetChosen () {

    },
    // 获取选择的节点
    getChosenNodes () {
      // console.log('获取当前选中节点', this.menu.checkedKeys)
      if (this.menu.checkedKeys.checked) {
        return this.menu.checkedKeys.checked
      }
      return []
      // this.$refs.editFormMenuTree.getCheckedNodes()
      // concat(this.$refs.editFormAppTree.getCheckedNodes())
    },
    setChosenNodes (menuIdList) {
      // 渲染树节点

    }
  }
}
</script>

<style lang="less" scoped>

</style>
