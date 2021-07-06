import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  }
];
export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "控制台", icon: "dashboard" }
      }
    ]
  },
  {
    path: "/current",
    component: Layout,
    meta: { title: "实时管理", icon: "guide", roles: ["1", "2", "3"] },
    children: [
      // {
      //   path: "map",
      //   name: "Map",
      //   component: () => import("@/views/current/map2"),
      //   meta: { title: "实时地图(beta)", icon: "international", roles: ["1"] }
      // },
      {
        path: "driver",
        name: "Cdriver",
        component: () => import("@/views/current/driver"),
        meta: { title: "实时司机", icon: "lock", roles: ["1", "2", "3"] }
      },
      {
        path: "order",
        name: "Corder",
        component: () => import("@/views/current/order"),
        meta: { title: "实时订单", icon: "list", roles: ["1", "2", "3"] }
      }
    ]
  },
  {
    path: "/user",
    component: Layout,
    name: "User",
    meta: { title: "用户管理", icon: "people" },
    children: [
      {
        path: "wechat",
        name: "Wechat",
        component: () => import("@/views/wechat/index"),
        meta: { title: "微信用户", icon: "wechat" }
      }
    ]
  },
  {
    path: "/driver",
    component: Layout,
    name: "DriverManage",
    meta: { title: "司机管理", icon: "people", roles: ["1", "2", "3"] },
    children: [
      {
        path: "driver",
        name: "Driver",
        component: () => import("@/views/driver/index"),
        meta: { title: "司机信息", icon: "peoples", roles: ["1", "2", "3"] }
      },
      {
        path: "car",
        name: "Car",
        component: () => import("@/views/driver/car"),
        meta: { title: "车辆信息", icon: "guide", roles: ["1", "2", "3"] }
      }
    ]
  },
  {
    path: "/estate",
    component: Layout,
    alwaysShow: true,
    meta: { title: "物业管理", icon: "peoples", roles: ["1", "2"] },
    children: [
      {
        path: "info",
        name: "info",
        component: () => import("@/views/estate/index"),
        meta: { title: "物业经理人", icon: "user" }
      }
    ]
  },
  {
    path: "/order",
    component: Layout,
    meta: { title: "订单管理", icon: "shopping", roles: ["1", "2", "3"] },
    children: [
      {
        path: "list",
        name: "list",
        component: () => import("@/views/order/index"),
        meta: { title: "订单列表", icon: "money" }
      },
      {
        path: "export",
        name: "export",
        component: () => import("@/views/order/toExcel"),
        meta: { title: "订单导出", icon: "excel", roles: ["1"] }
      },
      {
        path: "error",
        name: "error",
        component: () => import("@/views/order/error"),
        meta: { title: "异常订单", icon: "bug", roles: ["1"] }
      }
    ]
  },
  // 统计分析
  {
    path: "/analysis",
    component: Layout,
    alwaysShow: false, // 总是显示根目录
    meta: { title: "销售管理", icon: "example", roles: ["1"] },
    children: [
      {
        path: "order",
        name: "order",
        component: () => import("@/views/analysis/index"),
        meta: { title: "销售统计", icon: "component", roles: ["1"] }
      },
      {
        path: "estate",
        name: "estate",
        component: () => import("@/views/analysis/estate"),
        meta: { title: "下单统计", icon: "component", roles: ["1"] }
      }
    ]
  },
  // 仅管理员可见
  {
    path: "/admin",
    component: Layout,
    alwaysShow: true,
    meta: { title: "管理员", icon: "lock", roles: ["1", "2"] },
    children: [
      {
        path: "admin",
        name: "admin",
        component: () => import("@/views/admin/index"),
        meta: { title: "管理员", icon: "user", roles: ["1"] }
      },
      // {
      //   path: "cashier",
      //   name: "cashier",
      //   component: () => import("@/views/admin/cashier"),
      //   meta: { title: "收费员验证码", icon: "user", roles: ["1", "2"] }
      // },
      {
        path: "category",
        name: "category",
        component: () => import("@/views/admin/category"),
        meta: { title: "角色类型", icon: "tree", roles: ["1"] }
      }
    ]
  },
  // 系统服务信息
  // {
  //     path: '/system',
  //     component: Layout,
  //     alwaysShow: true, // 总是显示根目录
  //     meta: { title: '系统管理', icon: 'example', roles: ['admin'] },
  //     children: [{
  //             path: 'system',
  //             name: 'system',
  //             component: () =>
  //                 import ('@/views/admin/index'),
  //             meta: { title: '系统信息', icon: 'component', roles: ['admin'] },

  //         },
  //         {
  //             path: 'runtime',
  //             name: 'runtime',
  //             component: () =>
  //                 import ('@/views/admin/index'),
  //             meta: { title: '运行信息', icon: 'international', roles: ['admin'] }
  //         }
  //     ]
  // },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
