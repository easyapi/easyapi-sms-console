<template>
  <div class="container">
    <Header></Header>
    <div :class="showHeader ? 'content' : 'contents'">
      <Aside></Aside>
      <div class="main">
        <div class="main-title" v-if="ifOutsideTitle">
          <div class="main-title_top mg-tp-20">
            <b>短信收件箱</b>
          </div>
        </div>
        <div class="main-content">
          <div class="main-title" v-if="!ifOutsideTitle">
            <div class="main-title_top"><b>短信收件箱</b></div>
            <div class="main-title_line"></div>
          </div>
          <el-table
            v-loading="loading"
            :data="smsSummayList"
            style="width: 100%"
          >
            <el-table-column prop="addTime" label="日期"> </el-table-column>
            <el-table-column prop="name" label="源"> </el-table-column>
            <el-table-column prop="address" label="计费"> </el-table-column>
            <el-table-column prop="mobile" label="号码"> </el-table-column>
            <el-table-column prop="smsTemplate.signature" label="签名">
            </el-table-column>
            <el-table-column prop="content" label="内容"> </el-table-column>
            <template slot="empty" style="height: 200px; line-height: 200px">
              <el-empty :image-size="200"></el-empty>
            </template>
          </el-table>
          <Pagination
            v-if="isShow"
            @fatherSize="fatherSize"
            @fatherCurrent="fatherCurrent"
            :size="pagination.size"
            :total-elements="pagination.total"
            class="paging"
          ></Pagination>
          <div style="clear: both"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/index.vue'
import Aside from '../../components/Aside/index.vue'
import Pagination from '../../components/Pagination/index'
import { getSmsRecordList } from '../../api/sms-record'

export default {
  name: '',
  components: {
    Header,
    Aside,
    Pagination,
  },
  data() {
    return {
      ifOutsideTitle: false,
      smsSummayList: [],
      loading: true,
      isShow: true,
      title: '',
      showHeader: '',
      pagination: {
        page: 1,
        size: 12,
        total: 0,
      },
    }
  },
  head() {
    return {
      title: '金融专辑 - EasyAPI服务市场',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '服务市场场景化服务',
        },
        { hid: 'keyword', name: 'keyword', content: '服务市场场景化服务' },
      ],
    }
  },
  methods: {
    /**
     * 获取短信收件箱列表
     */
    getSmsRecordList() {
      let page = this.pagination.page - 1
      let params = {
        sort: 'addTime,desc',
        page: page,
        size: this.pagination.size,
      }
      getSmsRecordList(params, this).then((res) => {
        if (res.data.code === 1) {
          this.loading = false
          this.smsSummayList = res.data.content
          this.pagination.total = Number(res.data.totalElements)
        } else {
          this.loading = false
          this.smsSummayList = []
          this.isShow = false
          this.pagination.total = 0
        }
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
      this.$refs.editArticle.articleForm.articleCategoryId =
        row.articleCategory.articleCategoryId
    },
    //分页
    fatherSize(data) {
      this.pagination.size = data
      this.getSmsRecordList()
    },
    fatherCurrent(data) {
      this.pagination.page = data
      this.getSmsRecordList()
    },
    search(item) {
      console.log(1111, item)
      let { title } = item
      this.title = title
      this.getSmsRecordList()
    },
    reset(item) {
      console.log(1111, item)
    },
    event(item) {
      let { title } = item
      this.title = title
    },
  },
  mounted() {
    this.getSmsRecordList()
    this.showHeader = this.theme.showHeader
    this.ifOutsideTitle = this.theme.ifOutsideTitle
  },
}
</script>

<style lang="scss"></style>
