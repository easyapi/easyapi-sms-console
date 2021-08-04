export default {
  name: 'Aside',
  data() {
    return {
      activePath: '',
      menuType: null,
      menuList: [
        {
          title: '通用配置',
          children: [
            {
              title: '短信概览',
              path: '/overview',
              icon: 'el-icon-s-help',
              children: []
            },
          ],
        },
        {
          title: '测试配置',
          children: [
            {
              title: '短信模板',
              path: '/template',
              icon: 'el-icon-s-help',
              children: []
            },
          ],
        },
        {
          title: '其他配置',
          children: [
            {
              title: '短信收件箱',
              path: '/Inbox',
              icon: 'el-icon-s-help',
              children: []
            },
            {
              title: '短信发送',
              path: '/send',
              icon: 'el-icon-s-help',
              children: []
            },
            {
              title: '计费日志',
              path: '/billing',
              icon: 'el-icon-s-help',
              children: [
                {
                  title: '测试1',
                  path: '/123'
                },
                {
                  title: '测试2',
                  path: '/456'
                },
              ]
            }
          ],
        },
      ],
    }
  },
  methods: {
    handleSelectMenu(key, keyPath) {
      console.log(key);
      console.log(keyPath);
      let path = keyPath[0];
      this.$router.push({path: path});
    },
  },
  mounted() {
    this.activePath = this.$route.path ? `${this.$route.path}` : '/overview'
    this.menuType = this.theme.menuType
  },
}

