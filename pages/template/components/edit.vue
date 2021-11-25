<template>
  <el-dialog
    :close-on-click-modal='false'
    :title='title'
    :visible.sync='dialogVisible'
    width='30%'>
    <el-form ref='childForm' :model='childForm' label-width='80px'>
      <el-form-item label='模板标题'>
        <el-input v-model='childForm.title' placeholder='请输入标题'></el-input>
      </el-form-item>
      <el-form-item label='模板正文'>
        <el-input type='textarea' :rows='8' placeholder='请输入短信内容' v-model='childForm.content'></el-input>
      </el-form-item>
      <el-form-item>
        <div class='dynamicTags'>
          <el-select
            v-model='childForm.signature'
            placeholder='请选择'
            clearable
            filterable
            @blur='selectBlur'
            @clear='selectClear'
            @change='selectChange'
          >
            <el-option v-for='(item,index) in options' :key='index' :label='item.label' :value='item.value' />
          </el-select>
          <el-tag :key='tag' v-for='tag in dynamicTags' closable :disable-transitions='false' @close='handleClose(tag)'>
            {{ tag }}
          </el-tag>
        </div>
      </el-form-item>
      <el-form-item>
        <div>
          <span>模板示例：您的验证码是：@var(code)，请在@var(time)内输入</span>
          <span class='doc'>阅读文章变量申明方法文档></span>
          <p>营销类短信请再短信的末尾加上“退订回N”</p>
        </div>
      </el-form-item>
    </el-form>
    <span slot='footer' class='dialog-footer'>
    <el-button @click='dialogVisible = false'>取 消</el-button>
    <el-button type='primary' @click="confirm('childForm')">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import { createSmsTemplate, updateSmsTemplate, getSmsSignatureList } from '../../../api/sms-template'

export default {
  name: 'addTemplate',
  data() {
    return {
      dialogVisible: false,
      title: '',
      smsTemplateId: '',
      childForm: {
        title: '',
        content: '',
        signature: ''
      },
      options: [],
      dynamicTags: ['标签一']
    }
  },
  mounted() {

  },
  computed: {},
  methods: {
    //获取签名列表
    getSmsSignatureList() {
      let params = {}
      getSmsSignatureList(params, this).then(res => {
      })
    },
    //移除标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = { ...this.childForm }
          if (this.title === '创建新模板') {
            createSmsTemplate(data, this).then(res => {
              if (res.data.code === 1) {
                this.$message.success('添加成功')
                this.$parent.getSmsTemplateList()
                this.dialogVisible = false
                this.$refs[formName].resetFields()
              }
            })
          } else if (this.title === '编辑模板') {
            updateSmsTemplate(this.smsTemplateId, data, this).then(res => {
              if (res.data.code === 1) {
                this.$message.success('修改成功')
                this.$parent.getSmsTemplateList()
                this.dialogVisible = false
                this.$refs[formName].resetFields()
              }
            })
          }
        }
      })
    },
    selectBlur(e) {
      // 意见类型
      if (e.target.value !== '') {
        this.value = e.target.value
        let obj = {}
        obj.value = e.target.value
        obj.label = e.target.value
        this.options.push(obj)
        this.$forceUpdate()   // 强制更新
      }
    },
    selectClear() {
      this.value = ''
      this.$forceUpdate()
    },
    selectChange(val) {
      this.value = val
      this.$forceUpdate()
    }
  }
}
</script>

<style lang='scss'>
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
