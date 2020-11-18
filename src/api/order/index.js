import request from '@/utils/request'
import { base_path } from '@/config/config'

export function getCurrentOrderList(params) {
    return request({
        url: `${base_path}operatedOrder/order/query`,
        method: 'get',
        params
    })
}


// 按照路线类型查询当前可指派的司机
export function getCurrentDriverByType(params) {
    return request({
        url: `${base_path}operatedOrder/driver/query`,
        method: 'get',
        params
    })
}

export function getCurrentCarByType(params) {
    return request({
        url: `${base_path}operatedOrder/car/query`,
        method: 'get',
        params
    })
}
