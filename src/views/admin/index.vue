<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- TODO: 待添加管理员权限 -->
      <el-button
        v-waves
        v-permission="['admin']"
        type="success"
        icon="el-icon-edit"
        @click="addAdmin()"
        >添加</el-button
      >
    </div>
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
      <el-table-column label="管理员姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.admin_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.admin_login_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理员角色类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.admin_type == 1">管理员</span>
          <span v-else-if="scope.row.admin_type == 2">调度员</span>
          <span v-if="scope.row.admin_type == 3">普通账号</span>
          <span v-if="scope.row.admin_type == 4">临时账号</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.admin_created_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上一次登录时间" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.admin_last_time === null
              ? "未登录过"
              : scope.row.admin_last_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
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
    <!-- 添加 -->
    <el-dialog :visible.sync="dialogFormVisible" width="25%">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="110px"
        style="width:80%;margin-left:10%"
      >
        <el-form-item label="管理员姓名" prop="admin_name">
          <el-input v-model="temp.admin_name" placeholder="请输入管理员姓名" />
        </el-form-item>
        <el-form-item label="用户类型" prop="admin_type">
          <el-select v-model="temp.admin_type" placeholder="请选择角色类型">
            <el-option
              v-for="item in typeList"
              :key="item.admin_type_id"
              :label="item.admin_type_name"
              :value="item.admin_type"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录名" prop="admin_login_name">
          <el-input
            v-model="temp.admin_login_name"
            placeholder="请输入登录名"
          />
        </el-form-item>
        <el-form-item label="登录密码" prop="admin_pwd">
          <el-input
            v-model="temp.admin_pwd"
            type="password"
            placeholder="请输入登录密码"
          />
        </el-form-item>
        <el-form-item label="密码验证" prop="admin_repwd">
          <el-input
            v-model="temp.admin_repwd"
            type="password"
            placeholder="请再次输入登录密码"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="existID === 0 ? createAdmin() : updateAdmin()"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <!-- 添加 -->
  </div>
</template>

<script>
import { addAdmin, queryAdmin, getAdminTypeList } from "@/api/admin/admin";
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
    // 密码验证
    var validatePass = (rule, value, callback) => {
      // 八个字符，必须包含一个数字和字母
      let patten = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      let pattenReg = new RegExp(patten);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!patten.test(value)) {
        callback(new Error("密码长度为八位，至少包含一个数字和字母"));
      } else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("登录名至少6个字符"));
      } else {
        callback();
      }
    };
    // 二次密码验证
    var reValidatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.temp.admin_pwd) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    //  角色类型验证
    var typeValidate = (rule, value, callback) => {
      if (value == 0) {
        callback(new Error("请选择角色类型"));
      } else {
        callback();
      }
    };
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
      rules: {
        admin_name: [{ required: true, message: "必填", trigger: "blur" }],
        admin_login_name: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        admin_pwd: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        admin_repwd: [
          { required: true, validator: reValidatePass, trigger: "blur" }
        ],
        admin_type: [
          { required: true, validator: typeValidate, trigger: "blur" }
        ]
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
      queryAdmin().then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    fetchCategoryList() {
      getAdminTypeList().then(response => {
        this.typeList = response.data;
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
