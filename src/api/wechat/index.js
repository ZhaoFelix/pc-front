import request from '@/utils/request'
import { base_path } from '@/config/config'

// 分页查询微信用户的信息
export function getWechatList(params){
    return request(
        {
            url:`${base_path}users/query/all`,
            method:'get',
            params
        }
    )
}