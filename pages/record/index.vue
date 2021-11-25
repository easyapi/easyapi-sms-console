<template>
  <div class='container'>
    <Header></Header>
    <div :class="showHeader ? 'content' : 'contents'">
      <Aside></Aside>
      <div class='main'>
        <div class='main-title'>
          <div class='main-title_top mg-tp-20'>
            <b>计费日志</b>
          </div>
        </div>
        <div class='main-content'>
          <!-- <SearchArea
            :items="searchItems"
            @search="search"
            @event="event"
            @reset="reset"
          /> -->
          <el-table v-loading='loading' :data='recordList' style='width: 100%'>
            <el-table-column prop='addTime' label='日期'></el-table-column>
            <el-table-column prop='name' label='源'></el-table-column>
            <el-table-column prop='address' label='计费'></el-table-column>
            <el-table-column prop='mobile' label='号码'></el-table-column>
            <el-table-column prop='smsTemplate.signature' label='签名'></el-table-column>
            <el-table-column prop='content' label='内容'></el-table-column>
            <template slot='empty' style='height: 200px; line-height: 200px'>
              <el-empty :image-size='200'></el-empty>
            </template>
          </el-table>
          <Pagination
            v-if='isShow'
            @fatherSize='fatherSize'
            @fatherCurrent='fatherCurrent'
            :size='pagination.size'
            :total-elements='pagination.total'
            class='paging'
          ></Pagination>
          <div style='clear: both'></div>
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
import SearchArea from '../../components/SearchArea/index.vue'

export default {
  name: '',
  components: {
    Header,
    Aside,
    Pagination,
    SearchArea
  },
  data() {
    return {
      recordList: [],
      loading: true,
      isShow: true,
      title: '',
      showHeader: '',
      pagination: {
        page: 1,
        size: 12,
        total: 0
      },
      searchItems: [
        // {
        //   label: '日期',
        //   type: 'datePicker',
        //   key: 'makeDate',
        //   pickerType: 'date',
        //   format: 'yyyy-MM-dd',
        // },
      ]
    }
  },
  head() {
    return {
      title: '计费日志 - EasyAPI短信服务',
      meta: [
        { hid: 'description', name: 'description', content: '计费日志' },
        { hid: 'keyword', name: 'keyword', content: '计费日志' }
      ]
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
        size: this.pagination.size
      }
      getSmsRecordList(params, this).then((res) => {
        if (res.data.code === 1) {
          this.loading = false
          this.recordList = res.data.content
          this.pagination.total = Number(res.data.totalElements)
        } else {
          this.loading = false
          this.recordList = []
          this.isShow = false
          this.pagination.total = 0
        }
      })
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
      let { title } = item
      this.title = title
      this.getSmsRecordList()
    },
    reset(item) {
    },
    event(item) {
      let { title } = item
      this.title = title
    }
  },
  mounted() {
    this.getSmsRecordList()
    this.showHeader = this.theme.showHeader
  }
}
</script>

<style lang='scss'></style>
