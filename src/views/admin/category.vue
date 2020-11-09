<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="角色名" width="110">
        <template slot-scope="scope">
          {{ scope.row.admin_type_name }}
        </template>
      </el-table-column>
      <el-table-column label="角色说明" align="center">
        <template slot-scope="scope">
          <!-- 管理员 -->
          <span v-if="scope.row.admin_type == 1">
            可以查看、操作所有的页面数据
          </span>
          <!-- 调度员 -->
          <span v-else-if="scope.row.admin_type == 2">
            仅能查看和操作指定的数据和页面
          </span>
          <!-- 普通账号 -->
          <span v-else-if="scope.row.admin_type == 3">
            仅能查看指定的数据和页面
          </span>
          <span v-else>
            临时创建的账号
          </span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200" align="center">
        <template slot-scope="scope">
          <span>
            {{
              scope.row.admin_type_created_time
                | parseTime("{y}-{m}-{d} {h}:{i}")
            }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAdminTypeList } from "@/api/admin/admin";

export default {
  data() {
    return {
      listLoading: true,
      list: null
    };
  },
  methods: {
    featchData() {
      getAdminTypeList().then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    }
  },
  created() {
    this.featchData();
  }
};
</script>

<style scoped></style>
