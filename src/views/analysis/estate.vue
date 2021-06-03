<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-06-02 16:24:00
 * @LastEditTime: 2021-06-03 09:03:13
 * @FilePath: /pc-front/src/views/analysis/estate.vue
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="app-container">
    <div class="shaixuan">
      <el-row>
        <el-col :xl="{ span: 3 }" :lg="{ span: 4 }" :md="{ span: 5 }">
          <el-input
            v-model="keyword"
            placeholder="请输入物业姓名、小区查询"
            size="small"
          ></el-input
        ></el-col>

        <el-col :xl="{ span: 2 }" :lg="{ span: 2 }" :md="{ span: 2 }">
          <el-button
            :type="isSearch ? 'danger' : 'success'"
            @click="searchByKeyword"
            size="small"
            >{{ isSearch ? "取消" : "搜索" }}</el-button
          ></el-col
        >
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      show-summary
      style="margin-top:10px"
      height="800"
      :default-sort="{ prop: 'total_count', order: 'descending' }"
    >
      <el-table-column align="center" label="物业姓名" fixed>
        <template slot-scope="scope"
          ><span>
            {{ scope.row.estate_name }}
          </span></template
        >
      </el-table-column>
      <el-table-column align="center" label="物业小区" fixed>
        <template slot-scope="scope"
          ><span>
            {{ scope.row.estate_plot }}
          </span></template
        >
      </el-table-column>
      <el-table-column align="center" label="物业公司" fixed>
        <template slot-scope="scope"
          ><span>
            {{ scope.row.estate_company }}
          </span></template
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="居民装修"
        prop="usual_count"
        sortable
        fixed
      >
        <template slot-scope="scope"
          ><span>
            {{ scope.row.usual_count }}
          </span></template
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="二次清运"
        prop="second_count"
        sortable
        fixed
      >
        <template slot-scope="scope"
          ><span>
            {{ scope.row.second_count }}
          </span></template
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="垃圾箱清运"
        prop="box_count"
        sortable
        fixed
      >
        <template slot-scope="scope"
          ><span>
            {{ scope.row.box_count }}
          </span></template
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="合计"
        prop="total_count"
        sortable
        fixed
      >
        <template slot-scope="scope"
          ><span>
            {{ scope.row.total_count }}
          </span></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { queryAnalysisEstate } from "@/api/analysis";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    fetchData() {
      queryAnalysisEstate().then(response => {
        this.list = response.data;
      });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
<style scoped></style>
