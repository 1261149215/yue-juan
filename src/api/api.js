/**
 * @Project Name: vue-admin
 * @Author: cjw
 * @Date: 2019-09-29 10:09
 * @Email: 
 * @Idea: VSCode
 */
import request from '@/utils/request.js'
const base = 'app-yuejuan-base'

// 获取省列表
const getProvinceSelect = async function () {
    const result = await request({
        url: `${base}/api/common/getProvinceSelect`,
        method: 'get'
      })
      return result
}
// 获取省市区三级
const getAreaTree = async function () {
    const result = await request({
        url: `${base}/api/common/getAreaTree`,
        method: 'get'
    })
    return result
}
// 获取学校列表
const getSchoolList = async function (params) {
    const result = await request({
        url: `${base}/api/school/getSchoolList`,
        method: 'post',
        data: params
    })
    return result
}
// 获取学校列表2
const getSchoolList2 = async function (params) {
    const result = await request({
        url: `${base}/api/school/getBackSchoolList`,
        method: 'post',
        data: params
    })
    return result
}
// 获取年级列表
const getGradeList = async function (params) {
    const result = await request({
        url: `${base}/api/grade/getGradeSelect?schoolId=${params}`,
        method: 'get'
    })
    return result
}
// 获取学科列表
const getSubjectList = async function (params) {
    const result = await request({
        url: `${base}/api/subject/getSubjectSelect?schoolId=${params}`,
        method: 'get'
    })
    return result
}
// 获取行政班列表
const getClasslist =  async function (schoolId,gradeId) {
    const result = await request({
        url: `${base}/api/clazz/getClassSelect?schoolId=${schoolId}&gradeId=${gradeId}`,
        method: 'get'
    })
    return result
}
// 获取教学班列表
const getSubjectClasslist =  async function (schoolId,gradeId, subjectId) {
    const result = await request({
        url: `${base}/api/clazz/getSubjectClassSelect?schoolId=${schoolId}&gradeId=${gradeId}&subjectId=${subjectId}`,
        method: 'get'
    })
    return result
}
// 获取用户列表
const getUserList = async function(params) {
    const result = await request({
        url: `${base}/api/user/getUserList`,
        method: 'post',
        data: params
    })
    return result
}
// 新增/编辑校外用户 
const addSchoolOutUser = async function(params) {
    const result = await request({
        url: `${base}/api/user/insertSchoolOutUser`,
        method: 'post',
        data: params
    })
    return result
}
// 根据老师id获取详情
const getTeacherById =  async function (id) {
    const result = await request({
        url: `${base}/api/teacher/getTeacherById?teacherId=${id}`,
        method: 'get'
    })
    return result
}
// 根据老师id获取详情
const getUserById =  async function (id) {
    const result = await request({
        url: `${base}/api/user/getUserById?userId=${id}`,
        method: 'get'
    })
    return result
}
// 删除用户
const deleteUser =  async function (id) {
    const result = await request({
        url: `${base}/api/user/deleteUser?id=${id}`,
        method: 'post'
    })
    return result
}
// 删除教师
const deleteTeacher = async function (params) {
    const result = await request({
        url: `${base}/api/teacher/deleteTeacher`,
        method: 'post',
        data: params
    })
    return result
}
// 修改密码
const resetUserPassword =  async function (params) {
    const result = await request({
        url: `${base}/api/user/resetUserPassword`,
        method: 'post',
        data: params
    })
    return result
}
// 增加校内用户
const addTeacher =  async function (params) {
    const result = await request({
        url: `${base}/api/teacher/insertOrUpdateTeacher`,
        method: 'post',
        data: params
    })
    return result
}
// 新增/编辑后台用户 
const addBackUser = async function(params) {
    const result = await request({
        url: `${base}/api/user/insertOrUpdateBackUser`,
        method: 'post',
        data: params
    })
    return result
}
// 新增学校
const addSchool = async function(params) {
    const result = await request({
        url: `${base}/api/school/insertOrUpdateSchool`,
        method: 'post',
        data: params
    })
    return result
}
// 登入
const login = async function(params) {
    const result = await request({
        url: `/service-sso/login`,
        method: 'post',
        data: params
    })
    return result
}
// 获取用户信息
const userInfo = async function () {
    const result = await request({
        url: `/service-sso/current/user`,
        method: 'get'
    })
    return result
}
// 获取权限菜单树
const findMenuTree = async function (type) {
    const result = await request({
        url: `/service-sso/menu/findMenuTree?sysType=${type}`,
        method: 'get'
    })
    return result
}
// 新增权限菜单
const addMenu = async function (params) {
    const result = await request({
        url: `/service-sso/menu/save`,
        method: 'post',
        data: params
    })
    return result
}
// 新增权限菜单
const editMenu = async function (params) {
    const result = await request({
        url: `/service-sso/menu/update`,
        method: 'post',
        data: params
    })
    return result
}
// 删除菜单
const deleteMenu = async function (params) {
    const result = await request({
        url: `/service-sso/menu/delete`,
        method: 'post',
        data: params
    })
    return result
}
// 获取角色
const getRoleList = async function (type) {
    const result = await request({
        url: `/service-sso/role/findAll?type=${type}`,
        method: 'get'
    })
    return result
}
// 获取角色权限
const getRoleMenu = async function (id) {
    const result = await request({
        url: `/service-sso/role/findRoleMenus?roleId=${id}`,
        method: 'get'
    })
    return result
}
// 保存角色权限
const saveRoleMenu = async function (params) {
    const result = await request({
        url: `/service-sso/role/saveRoleMenus`,
        method: 'post',
        data: params
    })
    return result
}
// 新增 或编辑角色
const saveRole = async function (params) {
    const result = await request({
        url: `/service-sso/role/save`,
        method: 'post',
        data: params
    })
    return result
}
// 删除角色
const deleteRole = async function (params) {
    const result = await request({
        url: `/service-sso/role/delete`,
        method: 'post',
        data: params
    })
    return result
}
export default {
    getProvinceSelect,
    getAreaTree,
    getSchoolList,
    getSchoolList2,
    getGradeList,
    getSubjectList,
    getClasslist,
    getSubjectClasslist,
    getUserList,
    addSchoolOutUser,
    getTeacherById,
    deleteUser,
    resetUserPassword,
    addTeacher,
    addBackUser,
    addSchool,         
    deleteTeacher,
    getUserById,
    login,
    userInfo,
    findMenuTree,
    addMenu,
    editMenu,
    deleteMenu,
    getRoleList,
    getRoleMenu,
    saveRole,
    deleteRole,
    saveRoleMenu
}