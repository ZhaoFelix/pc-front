<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-04-21 09:04:32
 * @LastEditTime: 2021-04-21 10:05:15
 * @FilePath: /pc-front/src/views/admin/cashier.vue
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- TODO: 待添加管理员权限 -->
      <el-button
        v-waves
        v-if="list.length == 0"
        type="success"
        icon="el-icon-edit"
        @click="generateCode()"
        >生成</el-button
      >
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top:10px"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="收费员姓名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.cashier_name }}
        </template>
      </el-table-column>
      <el-table-column label="收费员验证码" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.cashier_code }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="有效期" width="200" align="center">
        <template slot-scope="scope">
          <span style="color:red">
            {{ scope.row.expired_time | parseTime("{y}-{m}-{d} {h}:{i}") }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.created_time | parseTime("{y}-{m}-{d} {h}:{i}") }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCashierCodeList, generateCashierCode } from "@/api/admin/admin";

export default {
  data() {
    return {
      listLoading: true,
      list: []
    };
  },
  methods: {
    fetchData() {
      getCashierCodeList().then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    generateCode() {
      generateCashierCode().then(response => {
        this.$message({
          message: "验证码生成成功",
          type: "success"
        });
        this.fetchData();
      });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped></style>
