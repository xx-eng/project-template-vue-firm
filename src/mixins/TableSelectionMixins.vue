<script>
export default {
  name: 'TableSelectionMixins',
  data () {
    return {
      table: {
        selectedRowKeys: [],
        selectedRows: []
      }
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.table.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.table.selectedRowKeys = selectedRowKeys
      this.table.selectedRows = selectedRows
    },
    clearSelected () {
      this.table.selectedRowKeys = []
      this.table.selectedRows = []
    }
  }
}
</script>

<style scoped>

</style>
