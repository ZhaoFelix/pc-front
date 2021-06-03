<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-06-02 16:24:00
 * @LastEditTime: 2021-06-03 11:50:19
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
        <el-col :span="2" v-if="multipleSelection.length != 0">
          <el-button type="primary" @click="handleDownloadData" size="small"
            >导出选中的数据</el-button
          >
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      show-summary
      style="margin-top:10px"
      height="800"
      :default-sort="{ prop: 'total_count', order: 'descending' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        label="序号"
        align="center"
        type="index"
        width="50"
        fixed
        sortable
      >
      </el-table-column>
      <el-table-column align="center" label="物业姓名" prop="estate_name" fixed>
        <template slot-scope="scope"
          ><span>
            {{ scope.row.estate_name }}
          </span></template
        >
      </el-table-column>
      <el-table-column align="center" label="物业小区" prop="estate_plot" fixed>
        <template slot-scope="scope"
          ><span>
            {{ scope.row.estate_plot }}
          </span></template
        >
      </el-table-column>
      <el-table-column
        align="center"
        prop="estate_company"
        label="物业公司"
        fixed
      >
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
import { parseTime } from "@/utils";
import { async } from "q";
import { sync } from "glob";
const tHeader = [
  "物业姓名",
  "物业小区",
  "物业公司",
  "居民装修",
  "二次清运",
  "垃圾箱清运",
  "合计"
];
const filterVal = [
  "estate_name",
  "estate_plot",
  "estate_company",
  "usual_count",
  "second_count",
  "box_count",
  "total_count"
];
export default {
  data() {
    return {
      list: [],
      isSearch: false,
      keyword: "",
      multipleSelection: []
    };
  },
  methods: {
    fetchData() {
      queryAnalysisEstate().then(response => {
        this.list = response.data;
      });
    },
    searchByKeyword() {
      if (this.keyword == "" && !this.isSearch) {
        this.$message("请先输入搜索关键字");
      } else if (this.keyword != "" && !this.isSearch) {
        this.isSearch = !this.isSearch;
        queryAnalysisEstate({ keyword: this.keyword }).then(response => {
          this.list = response.data;
        });
      } else if (this.isSearch) {
        this.isSearch = !this.isSearch;
        this.fetchData();
        this.keyword = "";
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 导出选中的数据
    handleDownloadData() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const list = this.multipleSelection;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: parseTime(Date()),
          autoWidth: true,
          bookType: "xlsx"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j];
        })
      );
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
<style scoped></style>
