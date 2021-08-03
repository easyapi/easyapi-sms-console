<template>
  <div class="container">
    <Header></Header>
    <div :class="showHeader ? 'content' : 'contents'">
      <Aside></Aside>
      <div class="main">
        <div class="main-title" v-if="ifOutsideTitle">
          <div class="main-title_top mg-tp-20">
            <b>短信概览</b>
          </div>
        </div>
        <div class="main-content">
          <div class="main-title" v-if="!ifOutsideTitle">
            <div class="main-title_top"><b>短信概览</b></div>
            <div class="main-title_line"></div>
          </div>
          <div class="overview-top">
            <div v-for="item in 4" :key="item" class="overview-top-card">
              <div>
                <p>2345</p>
                <p>今日发送数量</p>
              </div>
              <div>
                <el-image
                  style="width: 80px; height: 80px; border-radius: 50%"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"
                ></el-image>
              </div>
            </div>
          </div>
          <el-radio-group @change="change" v-model="tab" class="overview-tab">
            <el-radio-button label="day">最近30天</el-radio-button>
            <el-radio-button label="month">上个月</el-radio-button>
          </el-radio-group>
          <div
            v-show="chartShow"
            id="RecentlyChart"
            class="overview-chart"
          ></div>
          <div v-show="!chartShow" id="monthChart" class="overview-chart"></div>
          <Pagination
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
import { getSmsSummayList } from '../../api/sms-summary'

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
      tab: 'day',
      chartShow: true,
      articleList: [],
      searchItems: [{ label: '标题', type: 'input', key: 'title' }],
      title: '',
      showHeader: '',
      pagination: {
        page: 1,
        size: 12,
        total: 0,
      },
      loadingData: false,
      tableText: '',
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
    getSmsSummayList() {
      let params = {}
      getSmsSummayList(params, this).then((res) => {})
    },
    change(e) {
      if (e === 'day') {
        this.chartShow = true
        this.$nextTick(() => {
          this.getRecentlyChart()
        })
      } else if (e === 'month') {
        this.chartShow = false
        this.$nextTick(() => {
          this.getMonthChart()
        })
      }
    },
    /**
     * 获取最近30天图表
     */
    getRecentlyChart() {
      let RecentlyChart = this.$echarts.init(
        document.getElementById('RecentlyChart')
      )

      RecentlyChart.setOption({
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      })
    },
    /**
     * 获取上个月图表
     */
    getMonthChart() {
      let monthChart = this.$echarts.init(document.getElementById('monthChart'))

      monthChart.setOption({
        title: {
          text: '未来一周气温变化',
          subtext: '纯属虚构',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['最高气温', '最低气温'],
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C',
          },
        },
        series: [
          {
            name: '最高气温',
            type: 'line',
            data: [10, 11, 13, 11, 12, 12, 9],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: '最低气温',
            type: 'line',
            data: [1, -2, 2, 5, 3, 2, 0],
            markPoint: {
              data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }],
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' },
                [
                  {
                    symbol: 'none',
                    x: '90%',
                    yAxis: 'max',
                  },
                  {
                    symbol: 'circle',
                    label: {
                      position: 'start',
                      formatter: '最大值',
                    },
                    type: 'max',
                    name: '最高点',
                  },
                ],
              ],
            },
          },
        ],
      })
    },
    /**
     * 获取文章列表
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
      let { title } = item
      this.title = title
      this.getArticleList()
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
    this.getSmsSummayList()
    this.getArticleList()
    this.getRecentlyChart()
    // this.getMonthChart()
    this.showHeader = this.theme.showHeader
    this.ifOutsideTitle = this.theme.ifOutsideTitle
  },
}
</script>

<style lang="scss">
.overview-top {
  display: flex;
  flex-wrap: wrap;

  .overview-top-card {
    width: 280px;
    height: 120px;
    margin-right: 40px;
    padding: 20px;
    border: 1px solid #dcdfe6;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p:nth-child(1) {
      font-size: 30px;
    }

    p:nth-child(2) {
      font-size: 14px;
    }
  }
}

.overview-tab {
  margin: 30px 0 0 0;
}

.overview-chart {
  width: 100%;
  height: 400px;
}
</style>
