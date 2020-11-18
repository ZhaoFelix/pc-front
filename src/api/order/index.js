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

// 调度员取消订单
export function cancelOrderByAdmin(params) {
    return request({
        url: `${base_path}operatedOrder/order/cancel`,
        method: 'get',
        params
    })
}

// 指派司机
export function assignDriver(params) {
    return request({
        url: `${base_path}operatedOrder/order/assign`,
        method: 'get',
        params
    })
}
