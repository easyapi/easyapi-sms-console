<template>
  <div v-if='showHeader' class='header'>
    <div class='header-title'>
      <p>{{ title }}</p>
      <div>
        <el-dropdown trigger='click'>
          <span class='el-dropdown-link'>
            <el-avatar src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'></el-avatar>
          </span>
          <el-dropdown-menu slot='dropdown'>
            <el-dropdown-item icon='el-icon-plus'>黄金糕</el-dropdown-item>
            <el-dropdown-item icon='el-icon-circle-plus'>狮子头</el-dropdown-item>
            <el-dropdown-item icon='el-icon-circle-plus-outline'>螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon='el-icon-check'>双皮奶</el-dropdown-item>
            <el-dropdown-item icon='el-icon-circle-check'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      title: '',
      showHeader: '',
      isActive: true
    }
  },
  mounted() {
    this.showHeader = this.theme.showHeader
    this.title = this.theme.title
  }
}
</script>

<style lang='scss' scoped>
.header {
  width: 100%;
  background: $-header-bgColor;
  height: 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.1);
}

.header-title {
  width: 100%;
  height: 100%;
  padding: 0 30px 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: $-header-color;
  }
}

.el-submenu__title i {
  color: #000;
}
</style>
