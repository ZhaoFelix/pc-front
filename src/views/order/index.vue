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
      <el-table-column align="center" label="订单号" min-width="200" fixed>
        <template slot-scope="scope"
          ><span>
            {{ scope.row.order_number }}
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
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.order_user_name }}
          </span></template
        >
      </el-table-column>
      <el-table-column align="center" label="用户手机号" min-width="110">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.user_phone }}
          </span></template
        >
      </el-table-column>
      <el-table-column align="center" label="订单地址" min-width="150">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.user_address }}
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
      <el-table-column align="center" label="司机手机号" min-width="110">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.driver_phone }}
          </span></template
        >
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
      <el-table-column align="center" label="订单类型">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.order_type == 1">
            居民装修清运
          </el-tag>
          <el-tag type="warning" v-if="scope.row.order_type == 2">
            商业装修清运
          </el-tag>
          <el-tag type="success" v-if="scope.row.order_type == 3">
            垃圾箱清运
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户预约时间" min-width="120">
        <template slot-scope="scope"
          ><span>
            {{ scope.row.user_reserve_time | parseTime("{y}-{m}-{d} {h}:{i}") }}
          </span></template
        >
      </el-table-column>
      <el-table-column align="center" label="订单完成时间" min-width="120">
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
      <el-table-column label="价格" align="center">
        <template slot-scope="scope">
          <span style="color:red">{{
            "￥ " + (scope.row.order_final_price + scope.row.second_pay_price)
          }}</span>
        </template>
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
    <el-dialog
      title="订单详情"
      :visible.sync="detailVisible"
      width="20%"
      center
    >
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
          <el-collapse v-model="activeNames">
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
                  <viewer :images="[]">
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
                  <viewer :images="[]">
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
                  <viewer :images="[]">
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
import { getOrderAll, getOrderDetail } from "@/api/order";
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

export default {
  components: { Pagination },

  data() {
    return {
      list: [],
      orderDetail: [],
      listLoading: false,
      total: 9,
      limit: 10,
      page: 1,
      keyword: "",
      existID: 0,
      activeNames: ["1", "2", "3"],
      isOperateable: true,
      detailVisible: false,
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
    orderDetial(row) {
      console.log(row);
      getOrderDetail({ order_number: row.order_number }).then(response => {
        this.detailVisible = true;
        this.orderDetail = response.data;
      });
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
