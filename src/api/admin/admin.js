import request from '@/utils/request'
import { base_path } from '@/config/config'

export function getAdminTypeList() {
    return request({
        url: `${base_path}admin/type/query/all`,
        method: 'get',
    })
}
