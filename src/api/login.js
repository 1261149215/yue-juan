import request from '@/utils/request'

export function loginByUsername(data) {
    return request({
        url: `/Login/LoginSystem`,
        method: 'post',
        data: data
    })
}

export function logout(AccessToken) {
    return request({
        url: `/Login/ExitSystem?AccessToken=${AccessToken}`,
        method: 'get',
    })
}

export function getUserInfo(AccessToken) {
    return request({
        url: `/Login/GetUserInfo?AccessToken=${AccessToken}`,
        method: 'get',
    })
}