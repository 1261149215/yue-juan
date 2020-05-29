const verify = {
    // 校验手机号号码
    checkPhone: function(phone) {
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            return false;
        } else {
            return true;
        }
    },
    // 校验邮箱
    checkEmail: function(email) {
        if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(email))) {
            return false;
        } else {
            return true;
        }
    },
}
export default verify