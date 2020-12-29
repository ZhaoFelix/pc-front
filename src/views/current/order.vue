<template>
  <div class="app-container">
    <!-- TODO：待添加搜索部分的内容 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top:10px;width:100%;"
    >
      <el-table-column label="订单号" align="center" min-width="190" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.order_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信昵称" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.wechat_nickname }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="用户手机号" align="center" min-width="110">
        <template slot-scope="scope">
          <span>
            {{ scope.row.user_phone }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="用户地址" align="center" width="200">
        <template slot-scope="scope">
          <span>
            {{ scope.row.user_address }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="渣土面积" align="center" min-width="100">
        <template slot-scope="scope">
          <span>
            {{ scope.row.order_size + " m²" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="渣土图片" align="center" min-width="200">
        <template slot-scope="scope">
          <viewer :images="[scope.row.wechat_avatar]">
            <el-image
              v-for="(item, index) in JSON.parse(
                scope.row.user_place_order_img
              )"
              :key="index"
              :src="item.url"
              fit="cover"
              class="image-thumb"
            />
          </viewer>
        </template>
      </el-table-column>
      <el-table-column label="用户预约时间" align="center" min-width="150">
        <template slot-scope="scope">
          <span style="color:red">
            {{ scope.row.user_reserve_time | parseTime("{y}-{m}-{d} {h}:{i}") }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="下单类型" align="center" min-width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.order_user_type == 0 ? 'success' : 'danger'"
            >{{
              scope.row.order_user_type == 0 ? "居民下单" : "物业下单"
            }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="装修类型" align="center" min-width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.order_type == 0 ? 'success' : 'danger'">{{
            scope.row.order_type == 0 ? "普通装修" : "商业装修"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="订单价格" align="center">
        <template slot-scope="scope">
          <span style="color:red">{{
            scope.row.order_price == null
              ? "待确定"
              : scope.row.order_price.toFixed(2)
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="支付价格" align="center">
        <template slot-scope="scope">
          <span style="color:red">{{
            scope.row.order_final_price + scope.row.second_pay_price
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_status == 0" type="danger">
            {{ scope.row.order_price == null ? "待定价" : "待支付" }}
          </el-tag>
          <el-tag v-if="scope.row.order_status == 7" type="danger">
            待补差价
          </el-tag>
          <el-tag v-if="scope.row.order_status == 1" type="success"
            >已支付待派单</el-tag
          >
          <el-tag v-if="scope.row.order_status == 2" type="warning"
            >已取消</el-tag
          >
          <el-tag v-if="scope.row.order_status == 4" type="info"
            >司机到达现场</el-tag
          >
          <el-tag v-if="scope.row.order_status == 3" type="info"
            >待司机出发</el-tag
          >
          <el-tag v-if="scope.row.order_status == 5" type="info"
            >司机运输中</el-tag
          >
          <el-tag v-if="scope.row.order_status == 6" type="sucess"
            >已完成</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center" min-width="180">
        <template slot-scope="scope">
          <span>{{
            scope.row.order_created_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <!-- TODO:待添加用户角色权限 -->
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="300"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <!-- 仅未完成支付的订单可以被取消 -->
          <el-button
            plain
            size="mini"
            type="danger"
            v-permission="['1']"
            v-if="row.order_status == 0"
            @click="cancelOrder(row)"
            >取消订单</el-button
          >
          <!-- 仅完成支付的订单可以指派司机 -->
          <el-button
            plain
            size="mini"
            v-if="row.order_status == 1"
            @click="showDriverDialog(row)"
            >指派司机</el-button
          >
          <el-button
            plain
            size="mini"
            type="info"
            v-if="row.order_status == 1"
            @click="showDriverLeaderDialog(row)"
            >指派车队长</el-button
          >
          <!-- 支付后与实际不符的可以调整价格 -->
          <el-button
            plain
            size="mini"
            type="danger"
            v-permission="['1']"
            v-if="row.order_type == 1 && row.order_price == null"
            @click="assignPriceDialog(row)"
            >确定价格</el-button
          >
          <el-button
            plain
            size="mini"
            type="danger"
            v-permission="['1']"
            v-if="
              row.order_type == 0 &&
                row.order_gap_price == 0 &&
                row.order_status == 4
            "
            @click="assignPriceDialog(row)"
            >调整差价</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 使用注意 -->
    <div class="tip">
      <h3 style="color:red">注意：</h3>
      <ul>
        <li>
          调整差价：该操纵仅能操作普通装修的订单，且只有当司机到达现场确定后才能进行价格调整，每个订单只能调整一次差价；
        </li>
        <li>
          确定价格：该操作仅对商业装修的订单有效，且每个订单只能进行一次价格确定；
        </li>
        <li>
          取消订单：取消订单对所有类型的未支付订单有效，订单取消后将无法进行恢复和支付。
        </li>
      </ul>
    </div>
    <!-- TODO:取消订单 -->

    <!-- 指派司机 -->
    <el-dialog
      title="请选择指派的司机"
      :visible.sync="driverVisible"
      width="20%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="选择司机">
          <el-select
            v-model="temp.driver_id"
            clearable
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in driverTable"
              :key="item.driver_id"
              :label="item.driver_name"
              :value="item.driver_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="driverVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignDriver">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 调整价格 -->
    <el-dialog title="请订单价格" :visible.sync="priceVisible" width="20%">
      <el-input
        v-model="assignInfo.assignPrice"
        placeholder="请输入价格"
        type="Number"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="priceVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignPrice">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 指定车队长 -->
    <el-dialog
      title="请选择车队长"
      :visible.sync="driverLeaderVisible"
      width="20%"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="选择车队长">
          <el-select
            v-model="temp.third_id"
            clearable
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in thirdTable"
              :key="item.dthird_id"
              :label="item.third_name"
              :value="item.third_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="driverLeaderVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignDriverLeader">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCurrentOrderList,
  cancelOrderByAdmin,
  assignDriver,
  assignPrice,
  getDriverList
} from "@/api/order";

import { getDriverLeader } from "@/api/driver";
import { parseTime } from "@/utils";
import { mapGetters } from "vuex";

let form = {
  driverId: null,
  orderNumber: null
};
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      total: 103,
      limit: 10,
      page: 1,
      keyword: "",
      form,
      carRadio: "",
      driverRadio: "",
      driverTable: [],
      thirdTable: [],
      selectedDriver: "",
      carTable: [],
      driverVisible: false,
      driverLeaderVisible: false,
      dialogFormVisible: false,
      priceVisible: false,
      temp: {
        order_id: "",
        driver_id: ""
      },
      third_temp: {
        order_id: "",
        third_id: ""
      },
      assignInfo: {
        orderId: null,
        orderType: null,
        assignPrice: null
      },
      imageUrl: "",
      typeList: null,
      listQuery: {
        limit: 10,
        offset: 0,
        status: undefined,
        keyword: ""
      }
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    this.fetchData();
  },
  watch: {
    driverVisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.fetchDriverList();
        }
      }
    },
    driverLeaderVisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.fetchDriverLeaderList();
        }
      }
    }
  },
  methods: {
    fetchData() {
      this.list = [];
      this.listQuery.limit = this.limit;
      this.listQuery.offset = (this.page - 1) * this.limit;
      this.listLoading = true;
      getCurrentOrderList(this.listQuery).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    fetchDriverList() {
      console.log("获取司机列表");
      getDriverList().then(response => {
        this.driverTable = response.data;
      });
    },
    fetchDriverLeaderList() {
      getDriverLeader().then(response => {
        this.thirdTable = response.data;
      });
    },
    // 取消未支付的订单
    cancelOrder(row) {
      this.$confirm("此操作将永久取消订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          cancelOrderByAdmin({ order_id: row.order_id }).then(response => {
            this.$message({
              type: "success",
              message: "取消成功!"
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    showDriverDialog(row) {
      this.driverVisible = true;
      this.temp.order_id = row.order_id;
    },
    showDriverLeaderDialog(row) {
      this.driverLeaderVisible = true;
      this.third_temp.order_id = row.order_id;
    },
    // 指派司机
    assignDriver() {
      if (this.temp.driver_id == "") {
        this.$message({
          message: "请先选择司机和车辆",
          type: "error"
        });
        return;
      }
      assignDriver(this.temp).then(response => {
        this.driverVisible = false;
        this.$message({
          message: "订单指派司机成功！",
          type: "success"
        });
        // 重新获取数据
        this.fetchData();
      });
    },
    assignDriverLeader() {
      if (this.temp.driver_id == "") {
        this.$message({
          message: "请先选择司机和车辆",
          type: "error"
        });
        return;
      }
      assignDriver(this.temp).then(response => {
        this.driverVisible = false;
        this.$message({
          message: "订单指派司机成功！",
          type: "success"
        });
        // 重新获取数据
        this.fetchData();
      });
    },
    // 调整价格
    assignPriceDialog(row) {
      this.priceVisible = true;
      this.assignInfo.orderId = row.order_id;
      this.assignInfo.orderType = row.order_type;
    },
    assignPrice() {
      assignPrice(this.assignInfo).then(response => {
        this.priceVisible = false;
        this.$message({
          message: response.data.message,
          type: "success"
        });
        // 重新获取数据
        this.fetchData();
      });
    }
  }
};
</script>

<style scoped>
.image-thumb {
  width: 40px;
  height: 40px;
  padding: 5px;
}
.tip li {
  line-height: 18px;
}
</style>
