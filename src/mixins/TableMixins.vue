<script>
export default {
  name: 'TableMixins',
  data () {
   return {
     searchForm: {
       form: {}
     }
   }
  },
  methods: {
    refresh () {
      this.$refs.table.refresh()
    },
    search (data) {
      this.searchForm.form = data
      this.$refs.table.refresh()
    }
  }
}
</script>

<style scoped>

</style>
