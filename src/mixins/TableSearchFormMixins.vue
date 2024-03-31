<script>
export default {
  name: 'TableSearchFormMixins',
  data () {
    return {
      searchForm: {
        form: {}
      }
    }
  },
  methods: {
    search () {
      this.$emit('search', this.searchForm.form)
    },
    reset () {
      this.searchForm.form = {}
      this.search()
    },
    filterOption (input, option) {
      return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>

<style scoped>

</style>
