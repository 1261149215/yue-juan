import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import createLogger from 'vuex/dist/logger'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const IGNORE_LIST = []
const syncStore = store => {
    store.subscribe((mutation, state) => {
        if (IGNORE_LIST.findIndex(e => e == mutation.type) > -1 || mutation.type.indexOf("_ig") > -1) {
            return;
        }

        if (mutation.payload !== undefined && mutation.payload !== null) {
            sessionStorage.setItem(mutation.type, JSON.stringify(mutation.payload))
        }
    })
}
const store = new Vuex.Store({
    modules: {
        user
    },
    getters,
    strict: debug,
    plugins: [syncStore], // 持久化
    // plugins: [createPersistedState({
    //     storage: window.sessionStorage,
    //     // reducer (val) {
    //     //   return {
    //     //     userinfo: val.userinfo,
    //     //     paper: val.paper
    //     //   }
    //     // }
    // })], // 持久化
})

export default store