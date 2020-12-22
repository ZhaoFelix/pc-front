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
          <!-- TODO:待显示图片 -->
          <viewer :images="[scope.row.wechat_avatar]">
            <img
              v-for="(item, index) in JSON.parse(
                scope.row.user_place_order_img
              )"
              :key="index"
              :src="item.url"
              alt=""
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
            size="small"
            type="danger"
            v-if="row.order_status == 0"
            @click="cancelOrder(row)"
            >取消订单</el-button
          >
          <!-- 仅完成支付的订单可以指派司机 -->
          <el-button
            plain
            size="small"
            v-if="row.order_status == 1"
            @click="showDriverDialog(row)"
            >指派司机</el-button
          >
          <!-- 支付后与实际不符的可以调整价格 -->
          <el-button
            plain
            size="small"
            type="danger"
            v-if="row.order_type == 1 && row.order_price == null"
            @click="assignPriceDialog(row)"
            >确定价格</el-button
          >
          <el-button
            plain
            size="small"
            type="danger"
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
      width="40%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="路线类型">
          <el-radio-group v-model="selected_type">
            <el-radio
              v-for="item in router_type"
              :label="item.type"
              :key="item.type"
              @change="selectType"
              >{{ item.note }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择司机">
          <el-table
            ref="singleTable"
            :data="driverTable"
            highlight-current-row
            style="width: 100%"
            height="250"
          >
            <el-table-column label="选择" align="center" width="65">
              <template scope="scope">
                <el-radio
                  :label="scope.$index"
                  v-model="driverRadio"
                  @change.native="getDriverCurrentRow(scope.row)"
                  >{{ "" }}</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column label="姓名" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.driver_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="路线" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.router_note }}</span>
              </template>
            </el-table-column>
            <el-table-column label="替班说明">
              <template slot-scope="scope">
                <span>{{
                  scope.row.driver_is_substitutes == 1 ? "替班" : "非替班"
                }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="选择车辆">
          <el-table
            ref="singleTable"
            :data="carTable"
            highlight-current-row
            style="width: 100%"
            height="250"
          >
            <el-table-column label="选择" align="center" width="65">
              <template scope="scope">
                <el-radio
                  :label="scope.$index"
                  v-model="carRadio"
                  @change.native="getCarCurrentRow(scope.row)"
                  >{{ "" }}</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column label="车牌号" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.car_number }}</span>
              </template>
            </el-table-column>
            <el-table-column label="尺寸" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.car_size }}</span>
              </template>
            </el-table-column>
            <el-table-column label="载重" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.car_load_weight }}</span>
              </template>
            </el-table-column>
            <el-table-column label="路线说明" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.car_router_note }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备车说明">
              <template slot-scope="scope">
                <span>{{
                  scope.row.car_is_substitutes == 1 ? "备车" : "非备车"
                }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignDriver">确 定</el-button>
      </span>
    </el-dialog>
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
  </div>
</template>

<script>
import {
  getCurrentOrderList,
  getCurrentDriverByType,
  getCurrentCarByType,
  cancelOrderByAdmin,
  assignDriver,
  assignPrice
} from "@/api/order";
import { parseTime } from "@/utils";
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination";
import md5 from "js-md5";
import { callbackify } from "util";
import { thistle } from "color-name";
let MD5 = function(pwd) {
  pwd = pwd.toUpperCase();
  pwd = md5(pwd);
  return pwd;
};

let router_type = [
  { type: 1, note: "东风" },
  { type: 2, note: "网格" },
  { type: 3, note: "拉臂" },
  { type: 4, note: "第三方" },
  { type: 5, note: "桶装" }
];

let form = {
  driverId: null,
  orderNumber: null
};
export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      listLoading: false,
      total: 103,
      limit: 10,
      page: 1,
      keyword: "",
      existID: 0,
      router_type,
      selected_type: 0,
      form,
      carRadio: "",
      driverRadio: "",
      driverTable: [],
      carTable: [],
      driverVisible: false,
      dialogFormVisible: false,
      priceVisible: false,
      selected_reserve_time: null,
      temp: {
        order_id: "",
        car_id: "",
        driver_id: ""
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
    selectType() {
      this.driverTable = []; // 防止数据累加，每次查询前置空数据
      getCurrentDriverByType({
        type: this.selected_type,
        time: this.selected_reserve_time
      }).then(response => {
        this.driverTable = response.data;
      });
      getCurrentCarByType({ type: this.selected_type }).then(response => {
        this.carTable = response.data;
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
      this.selected_reserve_time = row.user_reserve_time;
    },
    getDriverCurrentRow(row) {
      this.temp.driver_id = row.driver_id;
    },
    getCarCurrentRow(row) {
      this.temp.car_id = row.car_id;
    },
    // 指派司机
    assignDriver() {
      if (this.temp.car_id == "" || this.temp.driver_id == "") {
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
