<template>
  <div class="login">
    <div class="middle-wrapper">
      <div class="left_bg"><img src="../../../static/image/login-l.png"></div>
      <div class="login-form">
        <div class="title-wrapper">
          <i class="logo"></i>
          <div class="title">阅卷后台管理系统</div>
        </div>
        <el-form
          ref="loginForm"
          :model="form"
          label-width="60px"
          :rules="rules">
          <el-form-item prop="username" label="账号" >
            <el-input v-model="form.username" placeholder="请输入账号" autoComplete="off" @keyup.enter.native="loginHandle('loginForm')" clearable>
              <i slot="prefix" class="el-input__icon user_icon" style="font-size: 18px;"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input :type="passwordType" v-model="form.password" placeholder="请输入密码" @keyup.enter.native="loginHandle('loginForm')" >
              <i slot="prefix" class="el-input__icon password_icon" style="font-size: 18px;"></i>
              <i slot="suffix" class="el-input__icon el-icon-view" style="cursor: pointer;"
                 @click="_togglePasswordType"></i>
            </el-input>
          </el-form-item>
          <!-- <el-form-item prop="yanzhengma">
            <div class="check-code-wrapper">
              <div class="yanzhengma-wrapper">
                <el-input v-model="form.yanzhengma" @keyup.enter.native="loginHandle('loginForm')" placeholder="请输入验证码">
                  <i slot="prefix" class="el-input__icon el-icon-adm-vertification" style="font-size: 18px;"></i>
                </el-input>
              </div>
              <div class="validate-code-wrapper">
                <validate-code ref="validate-code" @change="_setCheckCode"></validate-code>
              </div>
            </div>
          </el-form-item> -->
          <el-form-item style="margin-bottom: 0;">
            <div class="login-btn" @click="loginHandle('loginForm')">登录</div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import validateCode from '@/components/ValidateCode/index';
  import {setToken} from '@/utils/common';
  import api from '@/api/api.js';
  export default {
    data () {
      return {
        passwordType: 'password',
        checkCode: '',
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
          // yanzhengma: [
          //   { validator: checkYanzhengma, trigger: 'blur' }
          // ]
        }
      };
    },
    methods: {
      _setCheckCode (value) {
        this.checkCode = value;
      },
      _togglePasswordType () {
        if (this.passwordType === 'password') {
          this.passwordType = 'text';
        } else {
          this.passwordType = 'password';
        }
      },
      loginHandle (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.login();
          }
        });
      },
      async login () {
        /*
         *  在这边可以进行登陆请求
         *  将请求返回的Token对象存到store中
         *  @Token  token对象
        */
        // let token = 'a94756da-2962-40ae-bdea-787fd02c9d92';
        let params = {
          account: this.form.username,
          password: this.$md5(this.form.password),
          platform: 2
        };
        let res = await api.login(params);
        if (res.code === 0) {
          setToken(res.data.token)
          this.$store.commit('SET_TOKEN_ig', res.data.token);
          let path = this.$route.query.redirct ? this.$route.query.redirct : 'home'
          this.$router.replace(path);
        }
      }
    },
    components: {
      validateCode
    }
  };
</script>
<style lang="scss" scoped>
  .login {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url('/static/image/bg.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .middle-wrapper {
      width: 1200px;
      height: 520px;
      display: flex;
      .left_bg {
        width: 600px;
      }
      .title-wrapper {
        margin-top: 50px;
        margin-bottom: 60px;
        text-align: center;
        font-size: 32px;
        font-weight: 500;
        color: rgba(23,22,62,1);
        display: flex;
        align-content: center;
        justify-content: center;
        .logo {
          width: 36px;
          height: 36px;
          background: url('/static/logo.png') center no-repeat;
          background-size: 100%;
          margin-right: 20px;
        }
      }
      
      .login-form {
        position: relative;
        margin: 0 auto;
        width: 600px;
        padding: 30px 50px;
        box-sizing: border-box;
        background-color: #ffffff;
        display: flex;
        flex-flow: column;
        align-items: center;
        .login-btn {
          width: 100%;
          height: 52px;
          line-height: 52px;
          background: #464C79;
          text-align: center;
          color: #fff;
          font-size: 16px;
          letter-spacing: 2px;
          margin-top: 30px;
          background: linear-gradient(to right, #464C79 60%,#3071AC 100%);
          background: -webkit-gradient(linear, left, right, 60%, from(#464C79), to(#3071AC) );
          &:hover {
            background: linear-gradient(to right, #5C6289 60%, #4E7BAC 100%);
            cursor: pointer;
          }
        }
        .check-code-wrapper {
          display: flex;
          justify-content: space-between;
          height: 40px;

          .yanzhengma-wrapper {
            flex: 0 1 auto;
          }

          .validate-code-wrapper {
            flex: 0 0 160px;
          }
        }
      }
    }
  }
  .el-input {
    width: 280px;
    border-radius: none;
    background: #ffffff;
  }
  .user_icon {
    background: url('/static/image/user_icon.png') center no-repeat;
    background-size: 16px;
    display: block;
  }
  .password_icon {
    background: url('/static/image/password_icon.png') center no-repeat;
    background-size: 16px;
    display: block;
  }
</style>
<style lang="scss">
.login-form .el-form-item__label {
  padding-right: 20px;
}
.login-form  .el-input--prefix .el-input__inner {
  padding-left: 35px;
}
</style>
