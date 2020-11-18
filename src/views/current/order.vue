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
      style="margin-top:10px"
    >
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="订单号" align="center" width="110">
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
      <el-table-column label="用户手机号" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.user_phone }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="用户地址" align="center" width="200">
        <template slot-scope="scope">
          <span>
            {{ scope.row.user_adress }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="渣土面积" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.order_size }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="渣土图片" align="center">
        <template slot-scope="scope">
          <!-- TODO:待显示图片 -->
          <span>
            {{ scope.row.user_place_order_img }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="用户预约时间" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.user_reserve_time }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="订单价格" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.order_price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="最终支付价格" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.order_final_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前订单状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.order_status == 1 ? 'success' : 'danger'">{{
            scope.row.wechat_id === 1 ? "已支付待派单" : "待支付"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
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
      >
        <template slot-scope="{ row }">
          <!-- 仅未完成支付的订单可以被取消 -->
          <el-button
            plain
            size="small"
            type="danger"
            v-if="row.order_status == 0"
            >取消订单</el-button
          >
          <!-- 仅完成支付的订单可以指派司机 -->
          <el-button plain size="small" v-if="row.order_status == 1"
            >指派司机</el-button
          >
          <!-- 支付后与实际不符的可以调整价格 -->
          <el-button
            plain
            size="small"
            type="danger"
            v-if="row.order_status == 1"
            >调整价格</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
                  @change.native="getCurrentRow(scope.row)"
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
                  @change.native="getCurrentRow(scope.row)"
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
    </el-dialog>
  </div>
</template>

<script>
import {
  getCurrentOrderList,
  getCurrentDriverByType,
  getCurrentCarByType
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
      driverVisible: true,
      dialogFormVisible: false,
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
      }
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    // console.log(this.roles, this.author);
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.list = [];
      this.listQuery.limit = this.limit;
      this.listQuery.offset = (this.page - 1) * this.limit;
      this.listLoading = true;
      console.log(this.listQuery);
      getCurrentOrderList(this.listQuery).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
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
    selectType() {
      this.driverTable = []; // 防止数据累加，每次查询前置空数据
      getCurrentDriverByType({ type: this.selected_type }).then(response => {
        this.driverTable = response.data;
      });
      console.log("测试");
      getCurrentCarByType({ type: this.selected_type }).then(response => {
        this.carTable = response.data;
      });
    },
    getCurrentRow(row) {
      // 获取选中数据   row表示选中这一行的数据，可以从里面提取所需要的值
      console.log(row);
    }
  }
};
</script>

<style scoped></style>
