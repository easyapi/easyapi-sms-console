<template>
  <div class="sidebar">
    <div class="menu" v-if="menuType==0" v-for="(menu, index) in menuList" :key="index">
      <nuxt-link
        :to="menu.path"
        :class="activePath === menu.path ? 'menu-item_active' : 'menu-item'"
      >
        <i :class="menu.icon"></i>
        <span>{{ menu.title }}</span>
      </nuxt-link>
    </div>
    <div v-if="menuType==1" v-for="(menu, index) in menuSecondList" :key="index">
      <p class="title">{{menu.title}}</p>
      <nuxt-link
        v-for="(item, index) in menu.children" :key="index"
        :to="item.path"
        class="menu"
        :class="activePath === item.path ? 'menu-item_active' : 'menu-item'"
      >
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Aside',
    data() {
      return {
        activePath: '',
        menuType: null,
        menuList: [
          {
            title: '短信概览',
            path: '/overview',
            icon: 'el-icon-s-help',
          },
          {
            title: '短信模板',
            path: '/template',
            icon: 'el-icon-s-help',
          },
          {
            title: '短信收件箱',
            path: '/Inbox',
            icon: 'el-icon-s-help',
          },
          {
            title: '短信发送',
            path: '/send',
            icon: 'el-icon-s-help',
          },
          {
            title: '计费日志',
            path: '/billing',
            icon: 'el-icon-s-help',
          },
        ],
        menuSecondList: [
          {
            title: '通用配置',
            children: [{
              title: '短信概览',
              path: '/overview',
              icon: 'el-icon-s-help',
            }]
          },
          {
            title: '测试配置',
            children: [{
              title: '短信模板',
              path: '/template',
              icon: 'el-icon-s-help',
            }]
          },
          {
            title: '其他配置',
            children: [
              {
                title: '短信收件箱',
                path: '/Inbox',
                icon: 'el-icon-s-help',
              },
              {
                title: '短信发送',
                path: '/send',
                icon: 'el-icon-s-help',
              },
              {
                title: '计费日志',
                path: '/billing',
                icon: 'el-icon-s-help',
              },
            ]
          }
        ]
      }
    },
    mounted() {
      this.activePath = this.$route.path ? `${this.$route.path}` : '/overview'
      this.menuType = this.theme.menuType
    },
  }
</script>

<style scoped lang="scss">
  .sidebar {
    position: absolute;
    top: $-sidebar-top+px;
    left: $-sidebar-left+px;
    bottom: $-sidebar-bottom+px;
    overflow: auto;
    padding-top: 20px;
    width: 200px;
    background: $-sidebar-bgColor;
    border-radius: $-sidebar-radius+px;
  }

  .title {
    color: $-menu-first-color;
    align-items: center;
    display: flex;
    height: 56px;
    line-height: 22px;
    padding-left: 20px;
    font-size: 14px;
  }

  .menu :hover {
    i {
      color: $-menu-hover-color;
    }

    span {
      color: $-menu-hover-color;
    }

    background: $-menu-hover-bgColor;
  }

  .menu-item {
    padding: 0 20px;
    width: 200px;
    height: 56px;
    display: flex;
    align-items: center;
    background: $-menu-bgColor;

    i {
      font-size: 18px;
      margin-right: 10px;
      color: $-menu-color;
    }

    span {
      font-size: 14px;
      color: $-menu-color;
    }
  }

  .menu-item_active {
    padding: 0 20px;
    width: 200px;
    height: 56px;
    display: flex;
    align-items: center;
    background: $-menu-active-bgColor;

    i {
      font-size: 18px;
      margin-right: 10px;
      color: $-menu-active-color;
    }

    span {
      font-size: 14px;
      color: $-menu-active-color;
    }
  }
</style>
