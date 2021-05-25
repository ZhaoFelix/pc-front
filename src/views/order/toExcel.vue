<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-05-14 14:27:14
 * @LastEditTime: 2021-05-25 09:27:15
 * @FilePath: /pc-front/src/views/order/toExcel.vue
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="app-container">
    <!-- TODO：待添加搜索部分的内容 -->
    <el-row :gutter="10">
      <el-col :span="4">
        <el-input
          v-model="keyword"
          placeholder="请输入姓名、小区、手机号进行查询"
        ></el-input
      ></el-col>
      <el-col
        :xl="{ offset: 0, span: 1 }"
        :lg="{ offset: 1, span: 2 }"
        :md="{ offset: 1, span: 3 }"
        ><el-button
          :type="isSearch ? 'danger' : 'success'"
          @click="searchByKeyword"
          >{{ isSearch ? "取消" : "搜索" }}</el-button
        ></el-col
      >
      <el-col :span="2" v-if="multipleSelection.length != 0">
        <el-button type="primary" @click="handleDownloadData"
          >导出选中的数据</el-button
        >
      </el-col>
      <el-col :span="1">
        <el-button @click="moreExport = !moreExport" type="info"
          >数据导出</el-button
        >
      </el-col>
    </el-row>
    <el-row v-if="moreExport" style="line-height:32px;margin-top:4px;">
      <el-col :xl="{ span: 1 }" :lg="{ span: 2 }" :md="{ span: 3 }">
        <span style="font-weight:bold">按时间段导出:</span>
      </el-col>
      <el-col :xl="{ span: 3 }" :lg="{ span: 4 }" :md="{ span: 3 }"
        ><div class="block">
          <el-date-picker
            size="small"
            v-model="exportQuery.startDate"
            type="date"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </el-col>

      <el-col :xl="{ span: 3 }" :lg="{ span: 4 }" :md="{ span: 4 }"
        ><div class="block">
          <el-date-picker
            size="small"
            v-model="exportQuery.endDate"
            type="date"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col
        :xl="{ offset: 0, span: 1 }"
        :lg="{ offset: 0, span: 2 }"
        :md="{ offset: 0, span: 3 }"
      >
        <el-button type="primary" size="small" @click="exportGapData"
          >导出该时间段内的数据</el-button
        >
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top:10px"
      height="760"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column align="center" label="物业姓名" fixed>
        <template slot-scope="scope"
          ><span>
            {{ scope.row.estate_name }}
          </span></template
        >
      </el-table-column>
      <!-- <el-table-column align="center" label="用户名">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.order_user_name }}
          </span></template
        >
      </el-table-column> -->

      <el-table-column align="center" label="订单地址" min-width="250">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.user_address + "（" + scope.row.estate_plot + "）" }}
          </span></template
        >
      </el-table-column>
      <el-table-column align="center" label="物业小区" min-width="100">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.estate_plot }}
          </span></template
        >
      </el-table-column>
      <el-table-column align="center" label="接单司机">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.driver_name }}
          </span></template
        >
      </el-table-column>
      <el-table-column label="订单价格" align="center">
        <template slot-scope="scope">
          <span style="color:red;font-weight:bold">{{
            "¥&nbsp;" + scope.row.order_price.toFixed(2)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付价格" align="center">
        <template slot-scope="scope">
          <span style="color:red;font-weight:bold">{{
            "¥&nbsp;" +
              (
                scope.row.order_final_price + scope.row.second_pay_price
              ).toFixed(2)
          }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="下单形式">
        <template slot-scope="scope"
          ><el-tag
            :type="scope.row.order_user_type == 1 ? 'success' : 'danger'"
          >
            {{ scope.row.order_user_type == 1 ? "物业下单" : "普通下单" }}
          </el-tag></template
        >
      </el-table-column> -->
      <el-table-column align="center" label="用户预约时间" min-width="130">
        <template slot-scope="scope"
          ><span>
            {{
              scope.row.user_reserve_time
                | parseTime("{y}-{m}-{d} {h}:{i}")
                | timeToAM
            }}
          </span></template
        >
      </el-table-column>
      <el-table-column align="center" label="订单类型" min-width="110">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.order_type == 1">
            居民装修
          </el-tag>
          <el-tag type="warning" v-if="scope.row.order_type == 2">
            商业装修
          </el-tag>
          <el-tag type="success" v-if="scope.row.order_type == 3">
            垃圾箱清运
          </el-tag>
          <el-tag v-if="scope.row.order_type == 11">
            二次清运
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单完成时间" min-width="130">
        <template slot-scope="scope"
          ><span v-if="scope.row.driver_complete_time != null">
            {{
              scope.row.driver_complete_time | parseTime("{y}-{m}-{d} {h}:{i}")
            }}
          </span>
          <el-tag v-else type="danger">
            未完成
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_status == 2" type="info">
            已取消
          </el-tag>
          <el-tag v-else-if="scope.row.order_status == 6" type="sucess">
            已完成
          </el-tag>
          <el-tag v-else-if="scope.row.order_status == 7" type="sucess">
            补差价
          </el-tag>
          <el-tag v-else type="warning">进行中 </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单号" min-width="180">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.order_number }}
          </span></template
        >
      </el-table-column>
      <el-table-column align="center" label="下单手机号" min-width="110">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.user_phone }}
          </span></template
        >
      </el-table-column>
      <el-table-column align="center" label="司机手机号" min-width="110">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.driver_phone }}
          </span></template
        >
      </el-table-column>
      <el-table-column align="center" label="用户微信">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.wechat_nickname }}
          </span></template
        >
      </el-table-column>
      <!-- 操作 -->
      <!-- TODO:待添加用户角色权限 -->
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
        v-if="isOperateable"
      >
        <template slot-scope="scope">
          <el-button plain size="small" @click="orderDetial(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="page"
      :page-size="15"
      :page-sizes="[15, 30, 45, 60]"
      :limit.sync="limit"
      @pagination="fetchData"
    />
    <!-- 说明 -->
    <div class="comment">
      <span class="comment-title">说明</span>
      <ul>
        <li>
          此页面只显示已完成和已指派司机的订单。
        </li>
      </ul>
    </div>
    <!-- 订单详情 -->
    <el-dialog title="订单详情" :visible.sync="detailVisible" width="25%">
      <el-card
        class="cardTable"
        v-for="(item, index) in orderDetail"
        :key="index"
      >
        <div slot="header" class="clearfix">
          <span>{{ "订单号：" + item.order_number }}</span>
          <span class="order-status" v-if="item.order_status == 3">
            已指派司机
          </span>
          <span class="order-status" v-if="item.order_status == 4">
            司机前往目的地
          </span>
          <span class="order-status" v-if="item.order_status == 5">
            渣土运输中
          </span>
          <span class="order-status" v-if="item.order_status == 6">
            已完成
          </span>
        </div>
        <div v-for="o in 1" :key="o" class="text item">
          <el-collapse v-model="activeNames" :accordion="true">
            <el-collapse-item title="用户信息" name="1">
              <div>
                <span class="title-style">
                  用户名：
                </span>
                <span>
                  {{ item.order_user_name }}
                </span>
              </div>
              <div>
                <span class="title-style">
                  订单地址：
                </span>
                <span>
                  {{ item.user_address }}
                </span>
              </div>
              <div>
                <span class="title-style">
                  预约时间：
                </span>
                <span style="color:red">
                  {{ item.user_reserve_time }}
                </span>
              </div>
              <div>
                <span class="title-style">渣土图片:</span>
                <center>
                  <viewer :images="[JSON.parse(item.user_place_order_img)]">
                    <el-image
                      v-for="(item, index) in JSON.parse(
                        item.user_place_order_img
                      )"
                      :key="index"
                      :src="item.url"
                      fit="cover"
                      class="image-thumb"
                    />
                  </viewer>
                </center>
              </div>
            </el-collapse-item>
            <el-collapse-item title="司机信息" name="2">
              <div>
                <span class="title-style">
                  司机姓名：
                </span>
                <span>
                  {{ item.driver_name }}
                </span>
              </div>
              <div>
                <span class="title-style">
                  车牌号：
                </span>
                <span>
                  {{ item.car_number }}
                </span>
              </div>
              <div>
                <span class="title-style">
                  司机电话：
                </span>
                <span>
                  {{ item.driver_phone }}
                </span>
              </div>
            </el-collapse-item>
            <el-collapse-item title="实时行程" name="3">
              <div v-if="item.driver_go_des != null">
                <span class="title-style">
                  司机接单时间：
                </span>
                <span style="color:red">
                  {{ item.driver_go_des }}
                </span>
              </div>
              <div v-if="item.driver_reach_des != null">
                <span class="title-style">
                  到达目的地时间：
                </span>
                <span style="color:red">
                  {{ item.driver_reach_des }}
                </span>
              </div>
              <div v-if="item.driver_reach_img != null" class="divider"></div>
              <div v-if="item.driver_reach_img != null">
                <span class="title-style">渣土现场:</span>
                <center>
                  <viewer :images="[item.driver_reach_img]">
                    <el-image
                      v-for="(item, index) in JSON.parse(item.driver_reach_img)"
                      :key="index"
                      :src="item.url"
                      fit="cover"
                      class="image-thumb"
                    ></el-image>
                  </viewer>
                </center>
                <span class="title-style">处理时间：</span>
                <span>{{ item.driver_reach_time }}</span>
              </div>
              <div v-if="item.driver_reach_img != null" class="divider"></div>
              <div v-if="item.driver_get_img != null">
                <span class="title-style">渣土装车:</span>
                <center>
                  <viewer :images="[item.driver_get_img]">
                    <el-image
                      v-for="(item, index) in JSON.parse(item.driver_get_img)"
                      :key="index"
                      :src="item.url"
                      fit="cover"
                      class="image-thumb"
                    />
                  </viewer>
                </center>
                <span class="title-style">处理时间：</span>
                <span>{{ item.driver_get_time }}</span>
              </div>
              <div
                v-if="item.driver_complete_time != null"
                class="divider"
              ></div>
              <div v-if="item.driver_complete_time != null">
                <span class="title-style">
                  完成时间：
                </span>
                <span style="color:red">
                  {{ item.driver_complete_time }}
                </span>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrderAll,
  getOrderDetail,
  getOrderListByKeyword,
  getOrderListByTime
} from "@/api/order";
import { parseTime } from "@/utils";
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination";
import md5 from "js-md5";
import { callbackify } from "util";
let MD5 = function(pwd) {
  pwd = pwd.toUpperCase();
  pwd = md5(pwd);
  return pwd;
};
const tHeader = [
  "订单号",
  "用户名",
  "订单地址",
  "下单手机号",
  "物业小区",
  "接单司机",
  "支付价格",
  "订单类型",
  "用户预约时间",
  "订单生成时间"
];
const filterVal = [
  "order_number",
  "order_user_name",
  "user_address",
  "user_phone",
  "estate_plot",
  "driver_name",
  "order_final_price",
  "order_type",
  "user_reserve_time",
  "order_created_time"
];
export default {
  components: { Pagination },

  data() {
    return {
      list: [],
      orderDetail: [],
      multipleSelection: [],
      listLoading: false,
      total: 9,
      limit: 15,
      page: 1,
      keyword: "",
      isSearch: false,
      existID: 0,
      activeNames: ["1", "2", "3"],
      isOperateable: true,
      detailVisible: false,
      moreExport: false,
      temp: {
        admin_name: "",
        admin_login_name: "",
        admin_pwd: "",
        admin_repwd: "",
        admin_type: ""
      },

      imageUrl: "",
      typeList: null,
      listQuery: {
        limit: 10,
        offset: 0,
        status: undefined,
        keyword: ""
      },
      exportQuery: {
        startDate: "",
        endDate: ""
      },
      filename: "",
      autoWidth: true,
      bookType: "xlsx"
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.list = [];
      this.listQuery.limit = this.limit;
      this.listQuery.offset = (this.page - 1) * this.limit;
      this.listLoading = true;
      getOrderAll(this.listQuery).then(response => {
        this.list = response.data;
        this.total = response.total;
        this.listLoading = false;
      });
    },
    searchByKeyword() {
      if (this.keyword == "" && !this.isSearch) {
        this.$message("请先输入搜索关键字");
      } else if (this.keyword != "" && !this.isSearch) {
        this.isSearch = !this.isSearch;
        getOrderListByKeyword({ keyword: this.keyword }).then(response => {
          this.list = response.data;
          this.total = this.list.length;
        });
      } else if (this.isSearch) {
        this.isSearch = !this.isSearch;
        this.fetchData();
        this.keyword = "";
      }
    },
    //  编辑
    handleEdit(row) {
      console.log(row);
    },
    // 撤销
    handleCancel() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.temp.avatar_url = res.data;
    },
    orderDetial(row) {
      console.log(row);
      getOrderDetail({ order_number: row.order_number }).then(response => {
        this.detailVisible = true;
        this.orderDetail = response.data;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    exportGapData() {
      if (this.exportQuery.startDate == "" || this.exportQuery.endDate == "") {
        this.$message("请先选择时间段");
      } else {
        getOrderListByTime(this.exportQuery).then(response => {
          let list = response.data;
          import("@/vendor/Export2Excel").then(excel => {
            const data = this.formatJson(filterVal, list);
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: parseTime(Date()),
              autoWidth: this.autoWidth,
              bookType: this.bookType
            });
          });
        });
      }
    },

    // 导出的方法
    handleDownloadData() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const list = this.multipleSelection;
        const data = this.formatJson(filterVal, list);
        console.log(list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: parseTime(Date()),
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "order_created_time" || j === "user_reserve_time") {
            return parseTime(v[j]);
          } else if (j === "order_type") {
            return v[j] == 1
              ? "居民装修"
              : v[j] == 3
              ? "垃圾箱清运"
              : v[j] == 11
              ? "二次清运"
              : "商业装修";
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 89px;
}

.image-thumb {
  width: 25%;
  height: 80px;
  padding: 5px;
}

.title-style {
  font-weight: bold;
}

.divider {
  height: 1px;
  background: rgb(0, 0, 0, 0.05);
  width: 100%;
  margin: 4px 0;
}

.order-status {
  float: right;
  color: red;
}
>>> .el-dialog__body {
  padding: 10px 10px;
}

>>> .el-collapse-item__content {
  padding-bottom: 5px;
}

.comment-title {
  font-weight: bold;
  font-size: 15px;
}
</style>
