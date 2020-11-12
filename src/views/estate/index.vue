<template>
  <div class="app-container">
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
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="物业经理人姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物业经理人手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属公司" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属物业" align="center">
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
          <el-tag type="scope.row.estate_is_auth==1 ? success : danger">{{
            scope.row.estate_is_auth == 1 ? "已认证" : "未认证"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="绑定的微信号" align="center">
        <template slot-scope="scope">
          <el-tag type="scope.row.wechat_id !=null ? success : danger">{{
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
      <el-table-column
        label="操作"
        align="center"
        v-if="roles == 2"
        width="290"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-tooltip
            class="item"
            effect="dark"
            v-if="author == row.admin_id"
            content="密码修改"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="handleDelete(row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            v-if="author == row.admin_id"
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
    <div slot="tip" style="color:red;margin-top:20px">
      管理员最多只能添加5个
    </div>
  </div>
</template>

<script>
import { getEstateList } from "@/api/estate";
import { parseTime } from "@/utils";
import { mapGetters } from "vuex";
import md5 from "js-md5";
import { callbackify } from "util";
let MD5 = function(pwd) {
  pwd = pwd.toUpperCase();
  pwd = md5(pwd);
  return pwd;
};

export default {
  components: {},

  data() {
    return {
      list: [],
      listLoading: false,
      total: 2,
      limit: 20,
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
      typeList: null
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
      // this.listQuery.offset = this.page * this.limit;
      this.listLoading = true;
      getEstateList().then(response => {
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
    addAdmin() {
      console.log(this.roles);
      if (this.list.length >= 5) {
        this.$message.error("管理员用户最多不能超过5个");
      } else {
        // 获取角色类型列表
        this.fetchCategoryList();
        this.dialogFormVisible = true;
      }
    },
    createAdmin() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          // 密码使用md5加密
          this.temp.admin_pwd = MD5(this.temp.admin_pwd);
          this.temp.admin_repwd = MD5(this.temp.admin_repwd);

          addAdmin(this.temp).then(response => {
            if (response.message == "success") {
              this.$message({
                message: "创建成功",
                type: "success"
              });
              this.dialogFormVisible = false;
              this.fetchData();
              // 重置表单内容
              this.temp = {
                admin_name: "",
                admin_login_name: "",
                admin_pwd: "",
                admin_repwd: "",
                admin_type: ""
              };
            } else {
              this.$message.error("创建失败，请创新尝试！");
            }
          });
        }
      });
    },
    updateAdmin() {}
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
</style>
