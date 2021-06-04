<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-11-17 13:09:00
 * @LastEditTime: 2021-06-04 15:43:56
 * @FilePath: /pc-front/src/views/wechat/index.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
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
      <el-table-column label="openID" align="center" width="260">
        <template slot-scope="scope">
          <span>{{ scope.row.wechat_open_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信昵称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.wechat_nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信头像" align="center" width="80">
        <template slot-scope="scope">
          <viewer :images="[scope.row.wechat_avatar]">
            <img :src="scope.row.wechat_avatar" alt="" class="wechat-avatar" />
          </viewer>
        </template>
      </el-table-column>
      <el-table-column label="微信注册地" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.wechat_region }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.user_type == 1" type="success">
            物业经理人
          </el-tag>
          <el-tag v-else-if="scope.row.user_type == 2" type="danger">
            注册司机
          </el-tag>
          <el-tag v-else>
            普通用户
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center" width="200">
        <template slot-scope="scope">
          <span>{{
            scope.row.wechat_created_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近登录时间" align="center" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.wechat_last_time != null">
            {{
              scope.row.wechat_last_time | parseTime("{y}-{m}-{d} {h}:{i}")
            }}</span
          >
          <span v-else>
            {{
              scope.row.wechat_created_time | parseTime("{y}-{m}-{d} {h}:{i}")
            }}
          </span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <!-- TODO:待添加用户角色权限 -->
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { getWechatList } from "@/api/wechat";
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
      listLoading: false,
      total: 0,
      limit: 10,
      page: 1,
      keyword: "",
      existID: 0,

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
        offset: 0
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
      getWechatList(this.listQuery).then(response => {
        this.list = response.data;
        this.listLoading = false;
        this.total = response.total;
      });
    }
  }
};
</script>

<style scoped>
.wechat-avatar {
  width: 58px;
  height: 58px;
  display: block;
  border-radius: 29px;
}
</style>
