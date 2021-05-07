<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="2" v-if="roles.includes('1')"
        ><el-button type="success" @click="dialogFormVisible = true"
          >添加</el-button
        ></el-col
      >
      <el-col :span="6">
        <el-input
          v-model="keyword"
          placeholder="请输入手机号进行查询"
        ></el-input
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
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="物业经理人姓名" align="center" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物业经理人手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_phone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物业经理人身份证号" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.estate_card_id.replace(
              /^(.{4})(?:\d+)(.{4})$/,
              "$1********$2"
            )
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属物业公司" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属小区" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_plot }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属街道居委会" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_region }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否已完成认证" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.estate_is_auth == 1 ? 'success' : 'danger'"
            >{{ scope.row.estate_is_auth == 1 ? "已认证" : "未认证" }}</el-tag
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
            scope.row.estate_created_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="绑定微信号时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.estate_wechat_time != null">{{
            scope.row.estate_wechat_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
          <el-tag v-else>未绑定微信号</el-tag>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <!-- TODO:待添加用户角色权限 -->
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
            v-if="row.estate_is_auth == 0"
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
          <el-input v-model="edit_info.estate_name" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="edit_info.estate_phone" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="物业公司">
          <el-input v-model="edit_info.estate_company" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="所属小区">
          <el-input v-model="edit_info.estate_plot" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="所属居委">
          <el-input v-model="edit_info.estate_region" width="100px"></el-input>
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
        <el-form-item label="姓名" prop="estate_name">
          <el-input v-model="add_info.estate_name" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="estate_phone">
          <el-input v-model="add_info.estate_phone" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="estate_card_id">
          <el-input v-model="add_info.estate_card_id" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="estate_gender">
          <el-radio-group v-model="add_info.estate_gender">
            <el-radio v-model="add_info.estate_gender" label="1">男</el-radio>
            <el-radio v-model="add_info.estate_gender" label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="物业公司" prop="estate_company">
          <el-input v-model="add_info.estate_company" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="所属小区" prop="estate_plot">
          <el-input v-model="add_info.estate_plot" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="所属居委" prop="estate_region">
          <el-input v-model="add_info.estate_region" width="100px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addEstate">立即添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEstateList,
  getEstateListByKeyword,
  getDeleteEstate,
  getEditEstate,
  getAddEstate
} from "@/api/estate";
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
      total: 103,
      limit: 10,
      page: 1,
      keyword: "",
      isSearch: false,
      dialogFormVisible: false,
      dialogVisible: false,
      edit_info: {
        estate_name: "",
        estate_phone: "",
        estate_compnay: "",
        estate_plot: "",
        estate_region: "",
        esatet_gender: ""
      },
      add_info: {
        estate_name: "",
        estate_phone: "",
        estate_card_id: "",
        estate_company: "",
        estate_plot: "",
        estate_region: "",
        estate_gender: ""
      },
      rules: {
        estate_name: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        estate_phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号长度为11", trigger: "blur" }
        ],
        estate_card_id: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            min: 18,
            max: 18,
            message: "请输入长度为18位的身份正好",
            trigger: "blur"
          }
        ],
        estate_company: [
          { required: true, message: "请输入所属物业公司", trigger: "blur" }
        ],
        estate_plot: [
          { required: true, message: "请输入物业小区", trigger: "blur" }
        ],
        estate_region: [
          { required: true, message: "请输入物业所属居委", trigger: "blur" }
        ],
        esatet_gender: [
          { required: true, message: "请选择性别", trigger: "blur" }
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
      console.log(this.roles.includes("1"));
      this.list = [];
      this.listQuery.limit = this.limit;
      this.listQuery.offset = (this.page - 1) * this.limit;
      this.listLoading = true;
      console.log(this.listQuery);
      getEstateList(this.listQuery).then(response => {
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
        getEstateListByKeyword({ keyword: this.keyword }).then(response => {
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
          getDeleteEstate({ estate_id: row.estate_id }).then(response => {
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
      getEditEstate(this.edit_info).then(response => {
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
    addEstate() {
      getAddEstate(this.add_info).then(response => {
        if (response.code == 20000) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.dialogFormVisible = false;
          this.fetchData();
        }
      });
      console.log(this.add_info);
    }
  }
};
</script>

<style scoped></style>
