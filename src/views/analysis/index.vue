<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-05-24 13:35:16
 * @LastEditTime: 2021-06-02 14:39:29
 * @FilePath: /pc-front/src/views/analysis/index.vue
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="container">
    <panel-group />
    <el-row :gutter="16">
      <el-col :span="24">
        <div class="chart-wrapper">
          <el-row>
            <el-col :sm="{ offset: 8, span: 8 }" :xl="{ offset: 9, span: 6 }">
              <el-date-picker
                v-model="timeGap"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                size="mini"
              >
              </el-date-picker>
              <span style="padding:8px"> </span>
              <el-button
                size="mini"
                @click="querySaleTimeGap"
                :type="isSearch ? 'danger' : 'success'"
                >{{ !isSearch ? "查询" : "取消" }}</el-button
              >
            </el-col>
          </el-row>
          <div style="padding:8px"></div>
          <bar-chart
            title="最近30天销售"
            :chart-data="saleLineChartData"
            :x-data="saleXData"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="chart-wrapper">
          <el-row>
            <el-col :sm="{ offset: 8, span: 8 }" :xl="{ offset: 9, span: 6 }">
              <el-date-picker
                v-model="orderTimeGap"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                size="mini"
              >
              </el-date-picker>
              <span style="padding:8px"> </span>
              <el-button
                size="mini"
                @click="queryOrderTimeGap"
                :type="isOrderSearch ? 'danger' : 'success'"
                >{{ !isOrderSearch ? "查询" : "取消" }}</el-button
              >
            </el-col>
          </el-row>
          <div style="padding:8px"></div>
          <line-chart
            title="最近30天订单量"
            :chart-data="lineChartData"
            :x-data="XData"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PanelGroup from "./components/PanelGroup";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { querySale, queryWeek } from "@/api/dashboard";
import { queryAnalysisTimeSale, queryAnalysisOrder } from "@/api/analysis";

const saleLineChartData = {
  countData: [],
  totalData: []
};
const lineChartData = {
  expectedData: []
};
const saleXData = [];
const XData = [];
export default {
  components: {
    BarChart,
    PanelGroup,
    LineChart
  },
  data() {
    return {
      saleLineChartData,
      saleXData,
      XData,
      lineChartData,
      timeGap: "",
      orderTimeGap: "",
      isSearch: false,
      isOrderSearch: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              picker.$emit("pick", [end, end]);
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, start]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    fetchData() {
      querySale({ timeGap: 30 }).then(response => {
        let result = response.data;
        this.generateBarData(result);
      });
      queryAnalysisOrder().then(response => {
        let result = response.data;
        this.generateLineData(result);
      });
    },

    generateBarData(result) {
      // 生成新数据前先置空
      this.saleLineChartData.countData = [];
      this.saleLineChartData.totalData = [];
      this.saleXData = [];
      let days = [];
      let count = [];
      let total = [];
      for (var i = 0; i < result.length; i++) {
        let item = result[i];
        days.push(item.days);
        count.push(item.count);
        total.push(item.total);
      }
      this.saleXData = days;
      this.saleLineChartData.countData = count;
      this.saleLineChartData.totalData = total;
    },
    generateLineData(result) {
      console.log(result);
      this.lineChartData.expectedData = [];
      this.XData = [];
      let days = [];
      let count = [];
      for (var i = 0; i < result.length; i++) {
        let item = result[i];
        days.push(item.days);
        count.push(item.count);
      }
      this.XData = days;
      this.lineChartData.expectedData = count;
    },
    querySaleTimeGap() {
      if (this.isSearch) {
        this.isSearch = !this.isSearch;
        this.timeGap = "";
        this.fetchData();
        return;
      }
      if (this.timeGap != "") {
        queryAnalysisTimeSale({
          startDate: this.timeGap[0],
          endDate: this.timeGap[1]
        }).then(response => {
          let result = response.data;
          if (result.length == 0) {
            this.$message("查询数据为空，请重新选择查询时间段！");
            return;
          }
          this.generateBarData(result);
          this.isSearch = true;
        });
      } else {
        this.$message("请先选择查询时间段！");
      }
    },
    queryOrderTimeGap() {
      if (this.isOrderSearch) {
        this.isOrderSearch = !this.isOrderSearch;
        this.orderTimeGap = "";
        this.fetchData();
        return;
      }
      if (this.orderTimeGap != "") {
        queryAnalysisOrder({
          startDate: this.orderTimeGap[0],
          endDate: this.orderTimeGap[1]
        }).then(response => {
          let result = response.data;
          if (result.length == 0) {
            this.$message("查询数据为空，请重新选择查询时间段！");
            return;
          }
          this.generateLineData(result);
          this.isOrderSearch = true;
        });
      } else {
        this.$message("请先选择查询时间段！");
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.container {
  padding: 16px;
  background-color: rgb(240, 242, 245);
  position: relative;
  margin: 8px;
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 20px;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
