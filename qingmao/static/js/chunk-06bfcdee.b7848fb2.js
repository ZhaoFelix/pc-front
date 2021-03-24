(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06bfcdee"],{2953:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"},{name:"permission",rawName:"v-permission",value:["1"],expression:"['1']"}],attrs:{type:"success",icon:"el-icon-edit"},on:{click:function(t){return e.addAdmin()}}},[e._v("添加")])],1),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{"margin-top":"10px"},attrs:{data:e.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"ID",width:"95"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.$index))]}}])}),n("el-table-column",{attrs:{label:"管理员姓名",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.admin_name))])]}}])}),n("el-table-column",{attrs:{label:"登录名",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.admin_login_name))])]}}])}),n("el-table-column",{attrs:{label:"管理员角色类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.admin_type?n("span",[e._v("管理员")]):2==t.row.admin_type?n("span",[e._v("调度员")]):e._e(),3==t.row.admin_type?n("span",[e._v("二级调度员")]):e._e(),4==t.row.admin_type?n("span",[e._v("临时账号")]):e._e()]}}])}),n("el-table-column",{attrs:{label:"添加时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("parseTime")(t.row.admin_created_time,"{y}-{m}-{d} {h}:{i}")))])]}}])}),n("el-table-column",{attrs:{label:"上一次登录时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("parseTime")(null===t.row.admin_last_time?"未登录过":t.row.admin_last_time,"{y}-{m}-{d} {h}:{i}")))])]}}])}),2==e.roles?n("el-table-column",{attrs:{label:"操作",align:"center",width:"290","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e.author==a.admin_id?n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"密码修改",placement:"top"}},[n("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",plain:""},on:{click:function(t){return e.handleDelete(a)}}})],1):e._e(),e.author==a.admin_id?n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"删除",placement:"top"}},[n("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:"",plain:""},on:{click:function(t){return e.handleDelete(a)}}})],1):e._e()]}}],null,!1,1368893460)}):e._e()],1),n("el-dialog",{attrs:{visible:e.dialogFormVisible,width:"25%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"dataForm",staticStyle:{width:"80%","margin-left":"10%"},attrs:{rules:e.rules,model:e.temp,"label-position":"left","label-width":"110px"}},[n("el-form-item",{attrs:{label:"管理员姓名",prop:"admin_name"}},[n("el-input",{attrs:{placeholder:"请输入管理员姓名"},model:{value:e.temp.admin_name,callback:function(t){e.$set(e.temp,"admin_name",t)},expression:"temp.admin_name"}})],1),n("el-form-item",{attrs:{label:"用户类型",prop:"admin_type"}},[n("el-select",{attrs:{placeholder:"请选择角色类型"},model:{value:e.temp.admin_type,callback:function(t){e.$set(e.temp,"admin_type",t)},expression:"temp.admin_type"}},e._l(e.typeList,(function(e){return n("el-option",{key:e.admin_type_id,attrs:{label:e.admin_type_name,value:e.admin_type}})})),1)],1),e.isThird?n("el-form-item",{attrs:{label:"第三方车队",prop:"admin_third_id"}},[n("el-select",{attrs:{placeholder:"请指定第三方车队"},model:{value:e.temp.admin_third_id,callback:function(t){e.$set(e.temp,"admin_third_id",t)},expression:"temp.admin_third_id"}},e._l(e.thirdList,(function(e){return n("el-option",{key:e.third_id,attrs:{label:e.third_name,value:e.third_id}})})),1)],1):e._e(),n("el-form-item",{attrs:{label:"登录名",prop:"admin_login_name"}},[n("el-input",{attrs:{placeholder:"请输入登录名"},model:{value:e.temp.admin_login_name,callback:function(t){e.$set(e.temp,"admin_login_name",t)},expression:"temp.admin_login_name"}})],1),n("el-form-item",{attrs:{label:"登录密码",prop:"admin_pwd"}},[n("el-input",{attrs:{type:"password",placeholder:"请输入登录密码"},model:{value:e.temp.admin_pwd,callback:function(t){e.$set(e.temp,"admin_pwd",t)},expression:"temp.admin_pwd"}})],1),n("el-form-item",{attrs:{label:"密码验证",prop:"admin_repwd"}},[n("el-input",{attrs:{type:"password",placeholder:"请再次输入登录密码"},model:{value:e.temp.admin_repwd,callback:function(t){e.$set(e.temp,"admin_repwd",t)},expression:"temp.admin_repwd"}})],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){0===e.existID?e.createAdmin():e.updateAdmin()}}},[e._v("确定")])],1)],1)],1)},i=[],r=(n("d3b7"),n("4d63"),n("ac1f"),n("25f0"),n("3ca3"),n("ddb0"),n("2b3d"),n("5530")),l=n("5ec0"),d=(n("ed08"),n("2f62")),o=n("8237"),s=n.n(o),m=(n("3022"),function(e){return e=e.toUpperCase(),e=s()(e),e}),c={components:{},data:function(){var e=this,t=function(e,t,n){var a=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;new RegExp(a);""===t?n(new Error("请输入密码")):a.test(t)?n():n(new Error("密码长度为八位，至少包含一个数字和字母"))},n=function(e,t,n){t.length<6?n(new Error("登录名至少6个字符")):n()},a=function(t,n,a){""===n?a(new Error("请再次输入密码")):n!==e.temp.admin_pwd?a(new Error("两次输入的密码不一致")):a()},i=function(e,t,n){console.log("角色类型验证",t),null==t?n(new Error("请选择角色类型")):n()},r=function(e,t,n){null==t?n(new Error("请指定第三方车队")):n()};return{list:[],listLoading:!1,total:2,limit:20,page:1,keyword:"",existID:0,dialogFormVisible:!1,temp:{admin_name:"",admin_login_name:"",admin_pwd:"",admin_repwd:"",admin_type:null,admin_third_id:null},rules:{admin_name:[{required:!0,message:"必填",trigger:"blur"}],admin_login_name:[{required:!0,trigger:"blur",validator:n}],admin_pwd:[{required:!0,validator:t,trigger:"blur"}],admin_repwd:[{required:!0,validator:a,trigger:"blur"}],admin_type:[{required:!0,validator:i,trigger:"change"}],admin_third_id:[{required:!0,validator:r,trigger:"change"}]},imageUrl:"",typeList:null,thirdList:null,isThird:!1}},watch:{"temp.admin_type":{handler:function(e,t){3==e?(this.isThird=!0,this.fetchThirstList()):this.isThird=!1}}},computed:Object(r["a"])({},Object(d["b"])(["roles"])),created:function(){this.fetchData()},methods:{fetchData:function(){var e=this;this.listLoading=!0,Object(l["c"])().then((function(t){e.list=t.data,e.listLoading=!1}))},fetchCategoryList:function(){var e=this;Object(l["b"])().then((function(t){e.typeList=t.data}))},fetchThirstList:function(){var e=this;Object(l["d"])().then((function(t){e.thirdList=t.data}))},handleEdit:function(e){console.log(e)},handleCancel:function(){},handleAvatarSuccess:function(e,t){this.imageUrl=URL.createObjectURL(t.raw),this.temp.avatar_url=e.data},addAdmin:function(){console.log(this.roles),this.list.length>=25?this.$message.error("管理员用户最多不能超过5个"):(this.fetchCategoryList(),this.dialogFormVisible=!0)},createAdmin:function(){var e=this;this.$refs["dataForm"].validate((function(t){t&&(e.temp.admin_pwd=m(e.temp.admin_pwd),e.temp.admin_repwd=m(e.temp.admin_repwd),e.temp.admin_third_id=null==e.temp.admin_third_id?0:e.temp.admin_third_id,Object(l["a"])(e.temp).then((function(t){"success"==t.message?(e.$message({message:"添加成功",type:"success"}),e.dialogFormVisible=!1,e.fetchData(),e.temp={admin_name:"",admin_login_name:"",admin_pwd:"",admin_repwd:"",admin_type:null,admin_third_id:null}):e.$message.error("添加失败，请创新尝试！")})))}))},updateAdmin:function(){}}},u=c,p=(n("f064"),n("2877")),_=Object(p["a"])(u,a,i,!1,null,"2b3ef5f2",null);t["default"]=_.exports},4282:function(e,t,n){},"5ec0":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return l})),n.d(t,"a",(function(){return d})),n.d(t,"d",(function(){return o}));var a=n("b775"),i=n("a078");function r(){return Object(a["a"])({url:"".concat(i["base_path"],"admin/type/query/all"),method:"get"})}function l(){return Object(a["a"])({url:"".concat(i["base_path"],"admin/query/all"),method:"get"})}function d(e){return Object(a["a"])({url:"".concat(i["base_path"],"admin/update/add"),method:"post",data:e})}function o(){return Object(a["a"])({url:"".concat(i["base_path"],"admin/query/third"),method:"get"})}},f064:function(e,t,n){"use strict";var a=n("4282"),i=n.n(a);i.a}}]);