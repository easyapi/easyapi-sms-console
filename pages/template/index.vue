<template>
  <div class="container">
    <Header></Header>
    <div :class="showHeader ? 'content': 'contents'">
      <Aside></Aside>
      <div class="main">
        <div class="main-title">
          <div>
            <b>短信模板</b>
          </div>
          <div>
            <el-button type="primary" class="ea-info-btn" size="mini" @click="createArticle">
              创建新模板
            </el-button>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="main-content">
          <div class="item-list">
            <div class="item-list-card" v-for="item in 10" :key="item" :span="6">
              <div class="template-card">
                <div class="header clearfix">
                  <span>•</span>
                  <span>卡片名称</span>
                </div>
                <div class="template-card-content">
                  <div class="types types-df">
                    <span>审核中</span>
                  </div>
                  <div class="types types-success">
                    <span>审核成功</span>
                  </div>
                  <div class="types types-wrong">
                    <span>未<br/>通过</span>
                  </div>
                  <p class="color-gray f12 t-c time">短信/彩信<br>最后编辑
                    <time>2021-06-30 14:12:59</time>
                  </p>
                  <div class="repbox">
                    提示：由于大家设备不同，会遇到部分特殊符号不显示哈~ 圆圈符号包含了有100多个各种各样的符号，包含有有大的、小的、空心、实心、带颜色、类似圆形的等符号
                  </div>
                </div>
                <div class="bottom clearfix">
                  <div>
                    <el-button type="primary" plain size="mini">编辑</el-button>
                    <el-button type="success" plain size="mini">发送</el-button>
                  </div>
                  <div>
                    <el-button type="info" plain size="mini">删除</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination @fatherSize="fatherSize" @fatherCurrent="fatherCurrent" :size="pagination.size"
                    :total-elements="pagination.total" class="paging"></Pagination>
        <div style="clear: both"></div>
        <Edit ref="editArticle"></Edit>
      </div>
    </div>
  </div>

</template>

<script>
  import Header from '../../components/Header/index.vue'
  import Aside from '../../components/Aside/index.vue'
  import Pagination from '../../components/Pagination/index'
  import Edit from './components/edit'
  import {getArticleList, deleteArticle} from '../../api/article'

  export default {
    name: '',
    components: {
      Header,
      Aside,
      Pagination,
      Edit
    },
    data() {
      return {
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
       * 获取文章列表
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
        getArticleList(params, this).then(res => {
          if (res.data.code === 0) {
            this.loadingData = false
            this.tableText = '暂无数据'
            this.articleList = []
            this.pagination.total = 0
          } else {
            this.loadingData = false
            this.articleList = res.data.content
            this.pagination.total = Number(res.data.totalElements)
          }
        }).catch(error => {
          console.log(error)
        })
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
      this.showHeader = this.comsys.showHeader
    }
  }
</script>

<style lang="scss">
  .item-list {
    display: flex;
    flex-wrap: wrap;

    .template-card {
      width: 350px;
      height: 400px;
      border: 1px solid #ebeef5;
      margin-right: 40px;
      margin-bottom: 20px;

      .header {
        width: 100%;
        height: 50px;
        padding: 10px;
        border-bottom: 1px solid #ebeef5;
      }

      .template-card-content {
        width: 100%;
        height: 300px;
        border-bottom: 1px solid #ebeef5;
        position: relative;

        .types {
          background: #e6a23c;
          position: absolute;
          right: 20px;
          top: -1px;
          width: 36px;
          height: 50px;
          text-align: center;

          span {
            font-size: 14px;
            color: #fff;
          }
        }

        .time {
          padding: 10px 0;
          text-align: center;
        }

        .types:after {
          width: 0;
          position: absolute;
          bottom: 0px;
          content: '';
          left: 0px;
          height: 0;
          border-left: 18px solid transparent;
          border-right: 18px solid transparent;
          border-bottom: 8px solid #fff;
        }

        .repbox {
          margin-top: 10px;
          position: relative;
          background: #00a3c1;
          color: #fff;
          padding: 10px;
          display: inline-block;
          border-radius: 10px;
          width: 54%;
          float: right;
          margin-right: 30px;
        }

        .repbox:after {
          right: -10px;
          top: 20px;
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 15px solid transparent;
          border-left: 15px solid #00a3c1;
          border-bottom: 15px solid transparent;
        }
      }

      .bottom {
        width: 100%;
        height: 50px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

  }


  .f12 {
    font-size: 12px;
  }
</style>
