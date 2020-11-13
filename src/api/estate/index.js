import request from '@/utils/request'
import { base_path } from '@/config/config'

export function getEstateList(params) {
    return request({
        url: `${base_path}estate/query/all`,
        method: 'get',
        params
    })
}

