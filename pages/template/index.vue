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
            <el-button type="primary" class="ea-info-btn" size="mini" @click="createTemplate">
              创建新模板
            </el-button>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="main-content">
          <div class="item-list">
            <div class="item-list-card" v-for="item in templateList" :key="item" :span="6">
              <div class="template-card">
                <div class="header clearfix">
                  <span>•</span>
                  <span>{{item.title}}</span>
                </div>
                <div class="template-card-content">
                  <div v-if="item.state==0" class="types types-df">
                    <span>审核中</span>
                  </div>
                  <div v-if="item.state==1" class="types types-success">
                    <span>审核成功</span>
                  </div>
                  <div v-if="item.state==-1" class="types types-wrong">
                    <span>未<br/>通过</span>
                  </div>
                  <p class="color-gray f12 t-c time">短信/彩信<br>最后编辑
                    <time>{{item.addTime}}</time>
                  </p>
                  <div class="repbox">
                    {{item.signature}}{{item.content}}
                  </div>
                </div>
                <div class="bottom clearfix">
                  <div>
                    <el-button @click="updateTemplate(item)" type="primary" plain size="mini">编辑</el-button>
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
        <Edit ref="editTemplate"></Edit>
      </div>
    </div>
  </div>

</template>

<script>
  import Header from '../../components/Header/index.vue'
  import Aside from '../../components/Aside/index.vue'
  import Pagination from '../../components/Pagination/index'
  import Edit from './components/edit'
  import {getSmsTemplateList} from "../../api/sms-template"

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
        templateList: [],
        showHeader: '',
        pagination: {
          page: 1,
          size: 12,
          total: 0
        },
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
       * 获取短信模板列表
       */
      getSmsTemplateList() {
        let page = this.pagination.page - 1
        let params = {
          appKey: "db8b8b8202f2c8c7",
          appSecret: "99d2703f5fbb160c",
          page: page,
          size: this.pagination.size,
        }
        getSmsTemplateList(params, this).then(res => {
          if (res.data.code === 0) {
            this.templateList = []
            this.pagination.total = 0
          } else {
            this.templateList = res.data.content
            this.pagination.total = Number(res.data.totalElements)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 添加新模板
       */
      createTemplate() {
        this.$refs.editTemplate.dialogVisible = true
        this.$refs.editTemplate.title = '创建新模板'
      },
      /**
       * 编辑模板
       */
      updateTemplate(item) {
        console.log(item)
        this.$refs.editTemplate.dialogVisible = true
        this.$refs.editTemplate.title = '编辑模板'
        this.$refs.editTemplate.templateForm = item
        // this.$refs.editTemplate.articleId = row.articleId
        // this.$refs.editTemplate.articleForm.articleCategoryId = row.articleCategory.articleCategoryId
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
        this.getSmsTemplateList()
      },
      fatherCurrent(data) {
        this.pagination.page = data
        this.getSmsTemplateList()
      },
    },
    mounted() {
      this.getSmsTemplateList()
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
      border: 1px solid #DCDFE6;
      margin-right: 40px;
      margin-bottom: 20px;

      .header {
        width: 100%;
        height: 50px;
        padding: 10px;
        border-bottom: 1px solid #DCDFE6;
      }

      .template-card-content {
        width: 100%;
        height: 300px;
        border-bottom: 1px solid #DCDFE6;
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
          font-size: 14px;
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
