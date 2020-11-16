<template>
  <div class="app-container">
    <div>
      <span class="title">
        {{ currentMonth + "月司机值班信息" }}
      </span>
    </div>
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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="司机姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.driver_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="司机休息时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.driver_schedule.replaceAll(".", ", ") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="司机运输路线" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.driver_is_substitutes == 1
              ? "替班" + scope.row.router_note
              : scope.row.router_note
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否是替班司机" align="center" width="95">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.driver_is_substitutes == 1 ? 'success' : 'danger'"
            >{{
              scope.row.driver_is_substitutes == 1 ? "替班司机" : "否"
            }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.schedule_created_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
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
  </div>
</template>

<script>
import { getScheduleList } from "@/api/driver";
import { parseTime } from "@/utils";
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination";
import md5 from "js-md5";
import { callbackify } from "util";
import { returnStatement } from "@babel/types";
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
      total: 34,
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
        offset: 0,
        status: undefined,
        keyword: ""
      }
    };
  },
  computed: {
    ...mapGetters(["roles"]),
    currentMonth: function() {
      let date = new Date();
      return date.getMonth() + 1;
    }
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
      getScheduleList(this.listQuery).then(response => {
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
.title {
  font-size: 17px;
  font-weight: bold;
}
</style>
