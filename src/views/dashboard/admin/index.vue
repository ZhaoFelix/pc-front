<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-11-09 12:49:16
 * @LastEditTime: 2021-06-05 08:15:08
 * @FilePath: /pc-front/src/views/dashboard/admin/index.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <el-row>
            <el-col :span="8" :offset="8">
              <div class="div-center">
                <el-radio-group
                  v-model="increaseRadio"
                  size="mini"
                  @change="increaseChange"
                >
                  <el-radio-button label="1">订单增长</el-radio-button>
                  <el-radio-button label="2">用户增长</el-radio-button>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <line-chart
            :title="
              type == 'wechat'
                ? '最近一周用户增长'
                : type == 'order'
                ? '最近一周订单量'
                : '其他'
            "
            :chart-data="lineChartData"
            :x-data="XData"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <el-row>
            <el-col :span="8" :offset="8">
              <div class="div-center">
                <el-radio-group
                  v-model="saleRadio"
                  size="mini"
                  @change="saleChange"
                >
                  <el-radio-button label="1">最近一周</el-radio-button>
                  <el-radio-button label="2">今日</el-radio-button>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <bar-chart
            v-if="saleRadio == 1"
            title="销售"
            :chart-data="saleLineChartData"
            :x-data="saleXData"
            :legendData="legendData"
          />
          <today-bar-chart
            v-if="saleRadio == 2"
            title="销售"
            :chart-data="saleLineChartData"
            :x-data="saleXData"
            :legendData="legendData"
          />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :xs="12" :sm="12" :xl="8">
        <div class="chart-wrapper">
          <pie-chart
            :tipData="tipData"
            :dataArr="todayDataArr"
            title="今日订单类型占比"
          ></pie-chart>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :xl="8">
        <div class="chart-wrapper">
          <pie-chart
            :tipData="tipData"
            :dataArr="dataArr"
            title="累计订单类型占比"
          ></pie-chart>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :xl="8">
        <div class="chart-wrapper">
          <pie-chart
            :tipData="driverData"
            :dataArr="todayOrderStatusArr"
            title="今日订单状态占比"
          ></pie-chart>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :xl="8">
        <div class="chart-wrapper">
          <pie-chart
            :tipData="driverData"
            :dataArr="orderStatusArr"
            title="累计订单状态占比"
          ></pie-chart>
        </div>
      </el-col>
      <!-- 
      <el-col :xs="12" :sm="12" :xl="8">
        <div class="chart-wrapper">
          <pie-chart
            :tipData="estateData"
            :dataArr="estateDataArr"
            title="物业认证占比"
          ></pie-chart>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :xl="8">
        <div class="chart-wrapper">
          <pie-chart
            :tipData="driverData"
            :dataArr="driverDataArr"
            title="司机认证占比"
          ></pie-chart>
        </div>
      </el-col>
       -->
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import TodayBarChart from "./components/TodayBarChart";
import {
  queryWeek,
  queryOrderRatio,
  queryEstateRatio,
  querySale,
  queryOrderStatusRatio,
  queryToday
} from "@/api/dashboard";
import { request } from "http";
const lineChartData = {
  expectedData: []
};
const saleLineChartData = {
  actual: [],
  total: [],
  box: [],
  usual: [],
  business: []
};
const XData = [];
const saleXData = [];
const legendData = [];
export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    LineChart,
    PieChart,
    BarChart,
    TodayBarChart
  },
  data() {
    return {
      lineChartData: lineChartData,
      XData,
      saleRadio: "1",
      increaseRadio: "1",
      saleLineChartData: saleLineChartData,
      saleXData: saleXData,
      type: "order",
      tipData: ["商业装修", "居民装修", "垃圾箱清运"],
      dataArr: [],
      todayDataArr: [],
      orderStatusTipData: [],
      orderStatusArr: [],
      todayOrderStatusArr: [],
      legendData: legendData,
      estateData: ["已认证", "未认证"],
      driverData: ["已认证", "未认证"],
      estateDataArr: [],
      driverDataArr: []
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.type = type;
      queryWeek({ type: this.type }).then(response => {
        let result = response.data;
        let days = [];
        let count = [];
        let total = [];
        for (var i = 0; i < result.length; i++) {
          let item = result[i];
          days.push(item.days);
          count.push(item.count);
        }
        this.XData = days;
        this.lineChartData.expectedData = count;
      });
    },
    fetchData() {
      queryWeek({ type: this.type }).then(response => {
        let result = response.data;
        let days = [];
        let count = [];
        for (var i = 0; i < result.length; i++) {
          let item = result[i];
          days.push(item.days);
          count.push(item.count);
        }
        this.XData = days;
        this.lineChartData.expectedData = count;
      });
      var _this = this;
      queryOrderRatio().then(response => {
        let result = response.data[0];
        Object.keys(result).forEach(function(key) {
          let temp = {
            value: result[key],
            name: key
          };
          _this.dataArr.push(temp);
        });
      });
      queryOrderRatio({ type: "today" }).then(response => {
        let result = response.data[0];
        Object.keys(result).forEach(function(key) {
          let temp = {
            value: result[key],
            name: key
          };
          _this.todayDataArr.push(temp);
        });
      });
      //queryOrderStatusRatio
      queryOrderStatusRatio().then(response => {
        let result = response.data[0];
        Object.keys(result).forEach(function(key) {
          if (result[key] != 0) {
            let temp = {
              value: result[key],
              name: key
            };
            _this.orderStatusArr.push(temp);
          }
        });
      });
      queryOrderStatusRatio({ type: "today" }).then(response => {
        let result = response.data[0];
        Object.keys(result).forEach(function(key) {
          // if (result[key] != 0) {
          let temp = {
            value: result[key],
            name: key
          };
          _this.todayOrderStatusArr.push(temp);
          // }
        });
      });
      // queryEstateRatio().then(response => {
      //   let result = response.data[0];
      //   _this.estateDataArr = [
      //     {
      //       value: result["total"] - result["auth_count"],
      //       name: "未认证"
      //     },
      //     {
      //       value: result["auth_count"],
      //       name: "已认证"
      //     }
      //   ];
      // });
      // queryEstateRatio({ type: "driver" }).then(response => {
      //   let result = response.data[0];
      //   _this.driverDataArr = [
      //     {
      //       value: result["total"] - result["auth_count"],
      //       name: "未认证"
      //     },
      //     {
      //       value: result["auth_count"],
      //       name: "已认证"
      //     }
      //   ];
      // });
      querySale().then(response => {
        let result = response.data;
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
        this.saleLineChartData.actual = count;
        this.saleLineChartData.total = total;
        this.legendData = ["实际收入", "总收入"];
      });
    },
    increaseChange(value) {
      queryWeek({ type: value == "1" ? "order" : "" }).then(response => {
        let result = response.data;
        let days = [];
        let count = [];
        for (var i = 0; i < result.length; i++) {
          let item = result[i];
          days.push(item.days);
          count.push(item.count);
        }
        this.XData = days;
        this.lineChartData.expectedData = count;
      });
    },
    saleChange(value) {
      this.saleLineChartData = {
        actual: [],
        total: [],
        box: [],
        usual: [],
        business: []
      };
      if (value == "1") {
        querySale().then(response => {
          let result = response.data;
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
          this.saleLineChartData.actual = count;
          this.saleLineChartData.total = total;
          this.legendData = ["实际收入", "总收入"];
        });
      } else if (value == "2") {
        queryToday().then(response => {
          let result = response.data;
          let days = [];
          let usual = [];
          let box = [];
          let business = [];
          for (var i = 0; i < result.length; i++) {
            let item = result[i];
            days.push(item.days);
            usual.push(item.usual);
            box.push(item.box);
            business.push(item.business);
          }
          this.saleXData = days;
          this.saleLineChartData.usual = usual;
          this.saleLineChartData.box = box;
          this.saleLineChartData.business = business;
          this.legendData = ["居民", "垃圾箱", "商业"];
        });
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 16px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 20px;
  }

  .title-style {
    font-weight: bold;
  }

  .div-center {
    text-align: center;
    margin-bottom: 16px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
