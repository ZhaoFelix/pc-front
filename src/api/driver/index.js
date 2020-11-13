import request from '@/utils/request'
import { base_path } from '@/config/config'

export function getDriverList(params) {
    return request({
        url: `${base_path}driver/query/all`,
        method: 'get',
        params
    })
}

export function getCarList(params) {
    return request({
        url: `${base_path}car/query/all`,
        method: 'get',
        params
    })
}


