<template>
  <div class="container">
    <Header></Header>
    <div :class="showHeader ? 'content': 'contents'">
      <Aside></Aside>
      <div class="main">
        <div class="main-title">
          <div>
            <b>短信发送</b>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="main-content">

        </div>
        <Pagination @fatherSize="fatherSize" @fatherCurrent="fatherCurrent" :size="pagination.size"
                    :total-elements="pagination.total" class="paging"></Pagination>
        <div style="clear: both"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import Header from '../../components/Header/index.vue'
  import Aside from '../../components/Aside/index.vue'
  import Pagination from '../../components/Pagination/index'

  export default {
    name: '',
    components: {
      Header,
      Aside,
      Pagination,
    },
    data() {
      return {
        tab: "day",
        chartShow: true,
        articleList: [],
        searchItems: [
          {label: '标题', type: 'input', key: 'title'}
        ],
        title: '',
        showHeader: '',
        pagination: {
          page: 1,
          size: 12,
          total: 0
        },
        loadingData: false,
        tableText: ''
      }
    },
    head() {
      return {
        title: '金融专辑 - EasyAPI服务市场',
        meta: [
          {hid: 'description', name: 'description', content: '服务市场场景化服务'},
          {hid: 'keyword', name: 'keyword', content: '服务市场场景化服务'}
        ]
      }
    },
    methods: {
      /**
       * 获取短信收件箱列表
       */
      getArticleList() {
        this.loadingData = true
        let page = this.pagination.page - 1
        let params = {
          title: this.title,
          appKey: sessionStorage.getItem('appKey'),
          appSecret: sessionStorage.getItem('appSecret'),
          page: page,
          size: this.pagination.size,
          type: '文章'
        }
      },
      /**
       * 添加文章
       */
      createArticle() {
        this.$refs.editArticle.dialogVisible = true
        this.$refs.editArticle.title = '添加文章'
        this.$refs.editArticle.articleForm = this.$options.data()
      },
      /**
       * 修改文章
       */
      updateArticle(row) {
        this.$refs.editArticle.dialogVisible = true
        this.$refs.editArticle.title = '编辑文章'
        this.$refs.editArticle.articleForm = row
        this.$refs.editArticle.articleId = row.articleId
        this.$refs.editArticle.articleForm.articleCategoryId = row.articleCategory.articleCategoryId
      },
      //删除文章
      deleteArticle(row) {
        this.$confirm('您确定要删除该文章吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteArticle(row.articleId, this).then(res => {
            if (res.data.code === 1) {
              this.getArticleList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
      },
      //分页
      fatherSize(data) {
        this.pagination.size = data
        this.getArticleList()
      },
      fatherCurrent(data) {
        this.pagination.page = data
        this.getArticleList()
      },
      search(item) {
        console.log(1111, item)
        let {title} = item
        this.title = title
        this.getArticleList()
      },
      reset(item) {
        console.log(1111, item)

      },
      event(item) {
        let {title} = item
        this.title = title
      }
    },
    mounted() {
      this.getArticleList()
      // this.getMonthChart()
      this.showHeader = this.comsys.showHeader
    }
  }
</script>

<style lang="scss">

</style>
