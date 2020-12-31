/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-10-26 13:36:47
 * @LastEditTime: 2020-12-31 09:13:37
 * @FilePath: /pc-front/src/store/getters.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  third: state => state.user.third,
  permission_routes: state => state.permission.routes
};
export default getters;
