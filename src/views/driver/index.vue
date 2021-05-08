<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="2" v-if="roles.includes('1')"
        ><el-button type="success" @click="dialogFormVisible = true"
          >添加</el-button
        ></el-col
      >
      <el-col :span="6">
        <el-input v-model="keyword" placeholder="请输入司机手机号"></el-input
      ></el-col>
      <el-col :span="4"
        ><el-button
          :type="isSearch ? 'danger' : 'success'"
          @click="searchByKeyword"
          >{{ isSearch ? "取消" : "搜索" }}</el-button
        ></el-col
      >
    </el-row>
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
      <el-table-column label="司机手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.driver_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="司机身份证号" align="center" width="170">
        <template slot-scope="scope">
          <span>{{
            scope.row.driver_card_id.replace(
              /^(.{4})(?:\d+)(.{4})$/,
              "$1********$2"
            )
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否是替班司机" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.driver_is_substitutes == 1 ? 'success' : 'danger'"
            >{{
              scope.row.driver_is_substitutes == 1 ? "替班司机" : "否"
            }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="是否已完成认证" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.driver_is_auth == 1 ? 'success' : 'danger'"
            >{{ scope.row.driver_is_auth == 1 ? "已认证" : "未认证" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="绑定的微信号" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.wechat_id != null ? 'success' : 'danger'">{{
            scope.row.wechat_id != null ? "已绑定" : "未绑定"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.driver_created_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="绑定微信号时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.driver_wechat_time != null">{{
            scope.row.driver_wechat_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
          <el-tag v-else>未绑定微信号</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        v-if="roles.includes('1')"
        width="190"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="handleEdit(row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            v-if="row.driver_is_auth == 0"
            class="item"
            effect="dark"
            content="删除"
            placement="top"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="handleDelete(row)"
            ></el-button>
          </el-tooltip>
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
    <el-dialog title="修改信息" :visible.sync="dialogVisible" width="20%">
      <el-form ref="edit_info" :model="edit_info" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="edit_info.driver_name" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="edit_info.driver_phone" width="100px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateInfo">立即更新</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加物业 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible" width="25%">
      <el-form
        ref="add_info"
        :rules="rules"
        :model="add_info"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="driver_name">
          <el-input v-model="add_info.driver_name" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="driver_phone">
          <el-input v-model="add_info.driver_phone" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="driver_card_id">
          <el-input v-model="add_info.driver_card_id" width="100px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDriver">立即添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDriverList,
  getDriverListByKeyword,
  getDeleteDriver,
  getEditDriver,
  getAddDriver
} from "@/api/driver";
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
      isSearch: false,
      dialogFormVisible: false,
      dialogVisible: false,
      temp: {
        admin_name: "",
        admin_login_name: "",
        admin_pwd: "",
        admin_repwd: "",
        admin_type: ""
      },
      edit_info: {
        driver_name: "",
        driver_phone: ""
      },
      add_info: {
        driver_name: "",
        driver_phone: "",
        driver_card_id: ""
      },
      rules: {
        driver_name: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        driver_phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号长度为11", trigger: "blur" }
        ],
        driver_card_id: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            min: 18,
            max: 18,
            message: "请输入长度为18位的身份正好",
            trigger: "blur"
          }
        ]
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
      getDriverList(this.listQuery).then(response => {
        this.list = response.data;
        this.listLoading = false;
        this.total = response.total;
      });
    },
    searchByKeyword() {
      if (this.keyword == "" && !this.isSearch) {
        this.$message("请先输入手机号");
      } else if (this.keyword != "" && !this.isSearch) {
        this.isSearch = !this.isSearch;
        getDriverListByKeyword({ keyword: this.keyword }).then(response => {
          this.list = response.data;
          this.total = this.list.length;
        });
      } else if (this.isSearch) {
        this.isSearch = !this.isSearch;
        this.fetchData();
        this.keyword = "";
      }
    },
    handleDelete(row) {
      this.$confirm("删除后将无法进行恢复，是否继续？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getDeleteDriver({ driver_id: row.driver_id }).then(response => {
            if (response.code == 20000) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.fetchData();
            } else {
              this.$message({
                type: "error",
                message: "删除失败！"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除!"
          });
        });
    },
    handleEdit(row) {
      if (row != null) {
        this.edit_info = row;
        this.dialogVisible = true;
      }
    },

    updateInfo() {
      getEditDriver(this.edit_info).then(response => {
        if (response.code == 20000) {
          this.$message({
            type: "success",
            message: "更新成功!"
          });
          this.dialogVisible = false;
          this.fetchData();
        }
      });
    },
    addDriver() {
      this.$refs["add_info"].validate(valid => {
        if (valid) {
          getAddDriver(this.add_info).then(response => {
            if (response.code == 20000) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.dialogFormVisible = false;
              this.fetchData();
            }
          });
        } else {
          this.$message({
            type: "info",
            message: "信息填写不完整!"
          });
        }
      });
    }
  }
};
</script>

<style scoped></style>
