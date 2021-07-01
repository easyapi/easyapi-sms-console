<template>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="moblie" label="手机号">
      <template slot-scope="scope">
        <el-input v-model="scope.row.moblie"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="name值">
      <template slot-scope="scope">
        <el-input v-model="scope.row.name"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="address">
      <template slot-scope="scope">
        <el-input v-model="scope.row.address"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          @click="addLine"
          type="primary"
          v-if="scope.$index == tableData.length - 1"
        >添加
        </el-button>

        <el-button
          type="danger"
          v-if="tableData.length > 1"
          @click="handleDelete(scope.$index, scope.row)"
          class="del-btn"
        >删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "edit_table",
    props: {
      "tableData": Array,
    },
    methods: {
      addLine() {
        //添加行数
        let newValue = {
          mobile: "",
          name: "",
          address: "",
        };
        //添加新的行数
        this.tableData.push(newValue);
      },
      handleDelete(index) {
        //删除行数
        this.tableData.splice(index, 1);
      },
    }
  }
</script>

<style scoped>
  .tb-edit .el-input, .tb-edit .el-select {
    display: none
  }

  .tb-edit .current-row .el-input, .tb-edit .current-row .el-select {
    display: block
  }

  .tb-edit .current-row .el-input + span, .tb-edit .current-row .el-select + span {
    display: none
  }
</style>
