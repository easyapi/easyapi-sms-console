import Vue from 'vue'

let theme = {
  install(Vue) {
    Vue.prototype.theme = {
      title: 'EasyAPI短信服务', //项目标题
      showHeader: true, //头部显示隐藏
      menuType: 0 // 0只有一级菜单 1有两层第一层不能点击
    }
  }
}

Vue.use(theme)
