<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="dialogVisible"
    width="30%">
    <el-form ref="templateForm" :model="templateForm" label-width="80px">
      <el-form-item label="模板标题">
        <el-input v-model="templateForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="模板正文">
        <el-input
          type="textarea"
          :rows="8"
          placeholder="请输入短信内容"
          v-model="textarea">
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="dynamicTags">
          <el-select v-model="value" placeholder="请选择签名">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        </div>
      </el-form-item>
      <el-form-item>
        <div>
          <span>模板示例：您的验证码是：@var(code)，请在@var(time)内输入</span>
          <span class="doc">阅读文章变量申明方法文档></span>
          <p>营销类短信请再短信的末尾加上“退订回N”</p>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm('articleForm')">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'addTemplate',
    data() {
      return {
        dialogVisible: false,
        title: "",
        templateForm: {
          title: "",
          textarea: "",
        },
        dynamicTags: ['标签一'],
      }
    },
    mounted() {

    },
    computed: {},
    methods: {
      //移除标签
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
    }
  }
</script>

<style lang="scss">
  .el-dialog__header {
    border-bottom: 1px solid #DCDFE6;
  }

  .template-content {
    margin-bottom: 10px;
  }

  .dynamicTags {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .doc {
    color: #18c1d6;
    cursor: pointer;
  }

  .doc:hover {
    text-decoration: underline;
  }
</style>
