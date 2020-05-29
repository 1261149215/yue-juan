import request from '@/utils/request'

const projectName = 'app-yuejuan-base'
export default {
    dragProvinceOrder: async function (params) {
        const res = await request({
            url: `${projectName}/api/common/dragProvinceOrder`,
            method: 'post',
            data: params
        })
        return res
    },
    dragCityOrder: async function (params) {
        const res = await request({
            url: `${projectName}/api/common/dragCityOrder`,
            method: 'post',
            data: params
        })
        return res
    },
    dragDistrictOrder: async function (params) {
        const res = await request({
            url: `${projectName}/api/common/dragDistrictOrder`,
            method: 'post',
            data: params
        })
        return res
    },
    getProvince: async function () {
        const res = await request({
        url: `${projectName}/api/common/getProvinceSelect`,
        method: 'get'
        })
        return res
    },
    getCity: async function (params) {
        const res = await request({
        url: `${projectName}/api/common/getCitySelect?provinceId=${params}`,
        method: 'get'
        })
        return res
    },
    getDistrict: async function (params) {
        const res = await request({
        url: `${projectName}/api/common/getDistrictSelect?cityId=${params}`,
        method: 'get'
        })
        return res
    },
    addProvince: async function (params) {
        const res = await request({
            url: `${projectName}/api/common/insertProvince`,
            method: 'post',
            data: params
        })
        return res
    },
    getProvinceDialog: async function () {
        const res = await request({
            url: `${projectName}/api/common/getAreaTree`,
            method: 'get'
        })
        return res
    },
    editCity: async function (params) {
        const res = await request({
            url: `${projectName}/api/common/updateCity`,
            method: 'post',
            data: params
        })
        return res
    },
    addDistrict: async function (params) {
        const res = await request({
            url: `${projectName}/api/common/insertDistrict`,
            method: 'post',
            data: params
        })
        return res
    },
    editProvince: async function (params) {
        const res = await request({
            url: `${projectName}/api/common/updateProvince`,
            method: 'post',
            data: params
        })
        return res
    },
    addCity: async function (params) {
        const res = await request({
            url: `${projectName}/api/common/insertCity`,
            method: 'post',
            data: params
        })
        return res
    },
    editDistrict: async function (params) {
        const res = await request({
            url: `${projectName}/api/common/updateDistrict`,
            method: 'post',
            data: params
        })
        return res
    },
    deleteProvince: async function (params) { // 删除省
        const res = await request({
            url: `${projectName}/api/common/deleteProvince?provinceId=${params}`,
            method: 'post',
            data: params
        })
        return res
    },
    deleteCity: async function (params) { // 删除市
        const res = await request({
            url: `${projectName}/api/common/deleteCity?cityId=${params}`,
            method: 'post',
            data: params
        })
        return res
    },
    deleteDistrict: async function (params) { // 删除区
        const res = await request({
            url: `${projectName}/api/common/deleteDistrict?districtId=${params}`,
            method: 'post',
            data: params
        })
        return res
    }
}