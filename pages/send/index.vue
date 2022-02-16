<template>
  <div class="container">
    <Header></Header>
    <div :class="showHeader ? 'content' : 'contents'">
      <Aside></Aside>
      <div class="main">
        <div class="main-content">
          <div class="main-title">
            <div class="main-title_top"><b>短信发送</b></div>
            <div class="main-title_line"></div>
          </div>
          <div>
            <el-select v-model="value" placeholder="请选择短信模板">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="send-content">
            <div class="send-content-left">
              <div class="repbox">
                【爱通达】您好，您的包裹已到达@var(name)，地址@var(address)，请尽快领取！
              </div>
            </div>
            <div class="send-content-right">
              <p>每67字（包含标点符号和空格）计算为1条短信</p>
              <p>此模板包含48个字，需要1条短信发送许可（至每个联系人）</p>
            </div>
          </div>
          <div class="send-tab">
            <el-tabs type="border-card">
              <el-tab-pane label="从文件中导入">
                <p>
                  您的短信模板中包含2个文本变量，请在CSV文件中将第一列（A列）设为接收手机号码，第2列（B列）设为@var(name)对应的值，第三列（C列）设为@var(address)对应的值。
                </p>
                <div class="send-table">
                  <p>文件排列示例：</p>
                  <el-table
                    :header-cell-style="{
                      background: '#f5f7fa',
                      color: '#606266',
                      textAlign: 'center',
                    }"
                    :cell-style="{ 'text-align': 'center' }"
                    :data="exampleData"
                    border
                    style="width: 650px"
                  >
                    <el-table-column prop="mobile" label="A"> </el-table-column>
                    <el-table-column prop="name" label="B"> </el-table-column>
                    <el-table-column prop="address" label="C">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="send-button">
                  <el-button style="width: 185px" type="primary" plain
                    >选取文件</el-button
                  >
                  <span>未选取文件</span>
                </div>
              </el-tab-pane>
              <el-tab-pane label="手动输入">
                <Edit_table ref="editTable" :tableData="editData"></Edit_table>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="send-bottom">
            <h4>请注意</h4>
            <p>
              •地址簿模式：地址簿模式单次发送上限为100万个联系人，不支持变量
            </p>
            <p>
              •文件导入模式：文件导入模式单次发送上限为5万个联系人，支持变量
            </p>
            <p>•手动输入模式：手动模式单次提交不超过1000个联系人，支持变量</p>
            <p>
              •当单击发送按钮后，需要等待页面处理完成后才能关闭本页，否则会导致发送失败！等待时间视您提交的联系人数量而定，等待时间会随之递增，最长不超过900秒
            </p>
          </div>
          <el-button style="margin-top: 20px; width: 120px" type="primary"
            >发送</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/index.vue'
import Aside from '../../components/Aside/index.vue'
import Edit_table from './components/index'

export default {
  name: '',
  components: {
    Edit_table,
    Header,
    Aside,
  },
  data() {
    return {
      showHeader: '',
      disable: false, //控制表格是否可编辑
      editData: [
        {
          mobile: '',
          name: '',
          address: '',
        },
      ],
      exampleData: [
        {
          mobile: '135XXXXXXXX',
          name: 'name值',
          address: 'address值',
        },
        {
          mobile: '135XXXXXXXX',
          name: 'name值',
          address: 'address值',
        },
        {
          mobile: '135XXXXXXXX',
          name: 'name值',
          address: 'address值',
        },
      ],
      pagination: {
        page: 1,
        size: 12,
        total: 0,
      },
    }
  },
  head() {
    return {
      title: '短信发送 - EasyAPI短信服务',
      meta: [
        { hid: 'description', name: 'description', content: '短信发送', },
        { hid: 'keyword', name: 'keyword', content: '短信发送' },
      ],
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
        page: page,
        size: this.pagination.size,
        type: '文章',
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
      this.$refs.editArticle.articleForm.articleCategoryId =
        row.articleCategory.articleCategoryId
    },
    //删除文章
    deleteArticle(row) {
      this.$confirm('您确定要删除该文章吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteArticle(row.articleId, this).then((res) => {
          if (res.data.code === 1) {
            this.getArticleList()
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          }
        })
      })
    },
  },
  mounted() {
    this.getArticleList()
    // this.getMonthChart()
    this.showHeader = this.theme.showHeader
  },
}
</script>

<style lang="scss">
.send-content {
  margin-top: 20px;
  display: flex;

  .send-content-left {
    width: 600px;
    height: 120px;
    border: 1px solid #dcdfe6;
    background: #fafafa;
    display: flex;
    align-items: center;

    .repbox {
      position: relative;
      background: #00a3c1;
      left: 30px;
      color: #fff;
      padding: 10px;
      display: inline-block;
      border-radius: 10px;
      width: 70%;
    }

    .repbox:after {
      left: -10px;
      top: 10px;
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-top: 15px solid transparent;
      border-right: 15px solid #00a3c1;
      border-bottom: 15px solid transparent;
    }
  }

  .send-content-right {
    width: 420px;
    height: 120px;
    border-top: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    align-content: center;
    padding: 41px 20px;

    p {
      font-size: 14px;
    }
  }
}

.send-tab {
  width: 1020px;
  margin-top: 20px;
  margin-bottom: 20px;

  .send-table {
    margin-bottom: 15px;

    p {
      font-weight: bold;
      margin: 20px 0 15px 0;
    }
  }

  .send-button {
    margin: 15px 0 0;

    span {
      margin-left: 10px;
    }
  }
}

.send-bottom {
  width: 1020px;
  padding: 15px;
  background: #fffde4;

  h4 {
    margin-bottom: 15px;
  }

  p {
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
