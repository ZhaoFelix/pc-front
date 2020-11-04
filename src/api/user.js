import request from '@/utils/request'
import { base_path } from '@/config/config'
// 登录
export function login(data) {
  return request({
    url: `${base_path}login/login`,
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: `${base_path}login/info`,
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout() {
  return request({
    url: `${base_path}login/logout`,
    method: 'post'
  })
}
