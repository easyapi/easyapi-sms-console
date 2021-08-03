import Vue from 'vue'

let theme = {
  install(Vue) {
    Vue.prototype.theme = {
      title: 'API CMS', //项目标题
      showHeader: true, //头部显示隐藏
      menuType: 1, // 0只有一级菜单 1有两层第一层不能点击
      ifOutsideTitle: false, //右侧页面标题在框外显示
    }
  },
}

Vue.use(theme)
