/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-30 10:26:26
 * @LastEditTime: 2020-12-31 09:15:08
 * @FilePath: /pc-front/src/views/current/js/order.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import {
  getCurrentOrderList,
  cancelOrderByAdmin,
  assignDriver,
  assignPrice,
  getDriverList
} from "@/api/order";

import { getDriverLeader, setDriverLeader } from "@/api/driver";
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
    ...mapGetters(["roles", "third"])
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
      this.listQuery.third_id = this.third;
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
      console.log(row);
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
      if (this.third_temp.driver_id == "") {
        this.$message({
          message: "请先选择车队",
          type: "error"
        });
        return;
      }
      setDriverLeader(this.third_temp).then(response => {
        this.driverLeaderVisible = false;
        this.$message({
          message: "订单分派成功！",
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
