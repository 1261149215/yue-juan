import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/common'

const user = {
    state: {
        token: getToken(),
        user: {}
    },

    mutations: {
        SET_TOKEN_ig: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        }
    },

    actions: {
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUsername(userInfo).then(response => {
                    console.log(response)
                    let token = response.UserToken
                    commit('SET_TOKEN_ig', token)
                    let user = response.Data
                    commit('SET_USER', user)
                    setToken(token)
                    resolve(response)
                }).catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(response => {
                    let user = response.Data
                    commit('SET_USER', user)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(response => {
                    commit('SET_USER', {})
                    commit('SET_TOKEN_ig', '')
                    removeToken()
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        // FedLogOut({ commit }) {
        //     return new Promise(resolve => {
        //         commit('SET_TOKEN_ig', '')
        //         removeToken()
        //         resolve()
        //     })
        // }
    }
}

export default user