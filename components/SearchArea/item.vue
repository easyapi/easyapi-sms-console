<template>
  <el-col
    :xxl='6'
    :xl="item.size !== 'large' ? 8 : 16"
    :lg="item.size !== 'large' ? 8 : 16"
    :md="item.size !== 'large' ? 12 : 24"
    :sm='12'
    :xs='24'
    v-if="item.type !== 'buttons'"
    class='search-item'
  >
    <el-form>
      <el-form-item :label='item.label' label-width='100px' size='small'>
        <el-input v-if="item.type === 'input'" v-model='item.value'
                  :placeholder="item.placeholder || '请填写' + item.label" @on-enter='search' />
        <el-select
          v-if="item.type === 'select'"
          v-model='item.value'
          :placeholder="item.placeholder || '请选择' + item.label"
          clearable>
          <el-option v-for='(item, index) in items' :key='index + item.value' :value='item.value'>
            {{ item.label }}
          </el-option>
        </el-select>
        <el-date-picker
          v-if="item.type === 'datePicker'"
          v-model='item.value'
          :type='item.pickerType'
          :placeholder="item.placeholder || '请选择' + item.label"
          @on-change='timeFormat'
          :editable='false'
          :value-format='item.format'
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </el-col>
  <el-col
    v-else
    :xxl='6'
    :xl='8'
    :lg='8'
    :md='12'
    :sm='12'
    :xs='24'
    class='buttons'
  >
    <el-button @click='search' type='primary' size='small' class='ea-info-btn'>查询</el-button>
    <el-button @click='reset' type='warning' size='small'>重置</el-button>
    <el-button @click='open' size='small' v-if='ifShow'>{{ allShow ? '收起' : '展开' }}
      <i class='el-icon-arrow-down' v-if='!allShow' />
      <i class='el-icon-arrow-up' v-else />
    </el-button>
  </el-col>
</template>
<script>
export default {
  data() {
    return {
      items: []
    }
  },
  watch: {
    item: {
      handler(nv) {
        if (nv.items) {
          this.items = nv.items
        }
        this.$emit('event')
      },
      deep: true
    }
  },
  props: ['item', 'allShow', 'ifShow'],
  created() {
    if (this.item.items) {
      this.items = this.item.items
    }
  },
  methods: {
    timeFormat(item) {
      this.item.value = item
      this.$emit('event')
    },
    open() {
      this.$emit('open')
    },
    reset() {
      this.$emit('reset')
    },
    search() {
      this.$emit('search')
    }
  }
}
</script>
<style scoped>

.search-item .buttons {
  display: flex;
  margin: 10px 0;
}

.buttons button {
  margin-left: 10px;
}
</style>
