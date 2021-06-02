<template>
  <div class="app-container">
    <div class="shaixuan">
      <el-row>
        <el-col :xl="{ span: 4 }" :lg="{ span: 5 }" :md="{ span: 6 }">
          <el-input
            v-model="keyword"
            placeholder="请输入姓名、小区、手机号、地址进行查询"
          ></el-input
        ></el-col>

        <el-col :xl="{ span: 2 }" :lg="{ span: 2 }" :md="{ span: 2 }">
          <el-button
            :type="isSearch ? 'danger' : 'success'"
            @click="searchByKeyword"
            >{{ isSearch ? "取消" : "搜索" }}</el-button
          ></el-col
        >
        <el-col
          :xl="{ offset: 0, span: 1 }"
          :lg="{ offset: 1, span: 2 }"
          :md="{ offset: 1, span: 3 }"
        >
          <span style="font-weight:bold;font-size:14px;">条件筛选：</span>
        </el-col>
        <el-col :span="14">
          <el-radio-group v-model="selectRadio" @change="selectRadioEvent()">
            <el-radio
              v-for="(item, index) in radioOptions"
              :key="index"
              :label="index"
              >{{ item }}</el-radio
            >
          </el-radio-group>
        </el-col>
      </el-row>
    </div>
    <!-- TODO：待添加搜索部分的内容 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      stripe
      highlight-current-row
      style="margin-top:10px;width:100%;"
      height="800"
      :default-sort="{ prop: 'order_created_time', order: 'descending' }"
    >
      <el-table-column
        label="序号"
        align="center"
        type="index"
        width="50"
        fixed
        sortable
      >
      </el-table-column>
      <el-table-column label="指派司机" align="center" min-width="80" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.driver_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户地址" align="center" width="240">
        <template slot-scope="scope">
          <span>
            {{ scope.row.user_address + "（" + scope.row.estate_plot + "）" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="面积/箱数" align="center" width="80">
        <template slot-scope="scope">
          <span></span>
          <span v-if="scope.row.order_type == 1">
            {{ scope.row.order_size + " m²" }}
          </span>
          <span v-if="scope.row.order_type == 2 || scope.row.order_type == 11">
            无
          </span>
          <span v-if="scope.row.order_type == 3">
            {{ scope.row.box_number + " 箱" }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="渣土图片" align="center" width="120">
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
          <span style="font-weight:bold">
            {{
              scope.row.user_reserve_time
                | parseTime("{y}-{m}-{d} {h}:{i}")
                | timeToAM
            }}
          </span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="下单类型" align="center" min-width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.order_user_type == 0 ? 'success' : 'danger'"
            >{{
              scope.row.order_user_type == 0 ? "居民下单" : "物业下单"
            }}</el-tag
          >
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="指定清运点" align="center" min-width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.order_is_assign == 1 ? 'success' : 'danger'"
            >{{ scope.row.order_is_assign == 1 ? "是" : "否" }}</el-tag
          >
        </template>
      </el-table-column> -->
      <el-table-column label="订单价格" align="center" min-width="100">
        <template slot-scope="scope">
          <span style="color:red;font-weight:bold">{{
            scope.row.order_price == null
              ? "待确定"
              : "¥&nbsp;" + scope.row.order_price.toFixed(2)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付价格" align="center" min-width="90">
        <template slot-scope="scope">
          <span style="color:red;font-weight:bold">{{
            "¥&nbsp;" +
              (
                scope.row.order_final_price + scope.row.second_pay_price
              ).toFixed(2)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物业姓名" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.estate_name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="装修类型" align="center" min-width="95">
        <template slot-scope="scope">
          <span></span>
          <el-tag type="danger" v-if="scope.row.order_type == 1">
            居民
          </el-tag>
          <el-tag type="warning" v-if="scope.row.order_type == 2">
            商业
          </el-tag>
          <el-tag type="success" v-if="scope.row.order_type == 3">
            垃圾箱
          </el-tag>
          <el-tag v-if="scope.row.order_type == 11">
            二次清运
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" width="100">
        <template slot-scope="scope">
          <span></span>
          <el-tag v-if="scope.row.order_status == 0" type="danger">
            {{ scope.row.order_price == null ? "待定价" : "待支付" }}
          </el-tag>
          <el-tag v-if="scope.row.order_status == 7" type="danger">
            待补差价
          </el-tag>
          <el-tag v-if="scope.row.order_status == 1" type="success"
            >待派单</el-tag
          >
          <el-tag v-if="scope.row.order_status == 2" type="warning"
            >已取消</el-tag
          >
          <el-tag v-if="scope.row.order_status == 4" type="info"
            >到达现场</el-tag
          >
          <el-tag v-if="scope.row.order_status == 3" type="info">待出发</el-tag>
          <el-tag v-if="scope.row.order_status == 5" type="info">运输中</el-tag>
          <el-tag v-if="scope.row.order_status == 6" type="sucess"
            >已完成</el-tag
          >
        </template>
      </el-table-column>

      <!-- <el-table-column label="二级指派" align="center" min-width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.third_name }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="下单时间"
        prop="order_created_time"
        align="center"
        min-width="180"
        sortable
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.order_created_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物业手机号" align="center" min-width="110">
        <template slot-scope="scope">
          <span>
            {{ scope.row.estate_phone }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="下单手机号" align="center" min-width="110">
        <template slot-scope="scope">
          <span>
            {{ scope.row.user_phone }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="微信昵称" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.wechat_nickname }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center" min-width="185">
        <template slot-scope="scope">
          <span>{{ scope.row.order_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="二次支付订单号" align="center" min-width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.new_order_number }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <!-- TODO:待添加用户角色权限 -->
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="120"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <span></span>
          <!-- 仅未完成支付的订单可以被取消 -->
          <el-button
            plain
            size="mini"
            type="danger"
            v-permission="['1', '2']"
            v-if="row.order_status == 0"
            @click="cancelOrder(row)"
            >取消订单</el-button
          >
          <!-- 仅完成支付的订单可以指派司机 -->
          <el-button
            plain
            size="mini"
            v-permission="['1', '2', '3']"
            v-if="row.order_status == 1 && row.order_third_id == third"
            @click="showDriverDialog(row)"
            >指派司机</el-button
          >

          <!-- <el-button
            plain
            size="mini"
            type="info"
            v-permission="['1', '2']"
            v-if="row.order_status == 1 && row.order_third_id == 0"
            @click="showDriverLeaderDialog(row)"
            >指派车队长</el-button
          > -->
          <!-- 支付后与实际不符的可以调整价格 -->
          <el-button
            plain
            size="mini"
            type="danger"
            v-permission="['1', '2']"
            v-if="row.order_type == 1 && row.order_price == null"
            @click="assignPriceDialog(row)"
            >确定价格</el-button
          >
          <el-button
            plain
            size="mini"
            type="danger"
            v-permission="['1', '2']"
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
        <!-- <li>
          调整差价：该操纵仅能操作普通装修的订单，且只有当司机到达现场确定后才能进行价格调整，每个订单只能调整一次差价；
        </li>
        <li>
          确定价格：该操作仅对商业装修的订单有效，且每个订单只能进行一次价格确定；
        </li> -->
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
    <el-dialog title="订单价格" :visible.sync="priceVisible" width="20%">
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
            v-model="third_temp.third_id"
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
import index from "./js/order.js";
import { defaults } from "codemirror";
export default index;
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
.shaixuan {
  line-height: 48px;
}
</style>
