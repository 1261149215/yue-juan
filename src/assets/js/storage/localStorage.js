/**
 * @Project Name: vue-admin
 * @Author: cjw
 * @Date: 2019-09-29 10:09
 * @Email: 
 * @Idea: VSCode
 */
const localStorage = window.localStorage;
export default {
    getItem(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (err) {
            return null;
        }
    },
    setItem(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    },
    removeItem(key) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    },
    keys() {
        return localStorage.keys();
    }
};