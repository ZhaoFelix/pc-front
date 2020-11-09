import request from '@/utils/request'
import { base_path } from '@/config/config'

export function getAdminTypeList() {
    return request({
        url: `${base_path}admin/type/query/all`,
        method: 'get',
    })
}


export function queryAdmin() {
    return request({
        url:`${base_path}admin/query/all`,
        method:'get'
    })
}


export function addAdmin(data) {
    return request({
        url:`${base_path}admin/update/add`,
        method:'post',
        data
    })    
}