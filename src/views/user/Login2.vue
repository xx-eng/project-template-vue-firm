<template>
  <div class="login-container">
    <a-row class="login-main">
      <a-col :span="12" class="login-carousel">
        <img src="@/assets/images/login/mylogo1.png">
      </a-col>
      <a-col :span="12" class="login-form-container">
        <div class="title">欢迎登录我的后台</div>
        <a-form-model ref="form" :model="form" :rules="rules" class="form">
          <a-form-model-item prop="account">
            <span class="gray">您的账号</span>
            <a-input
              v-model="form.account"
              size="large"
              clearable
              autocomplete="false"
              tabindex="1"
              placeholder="请输入用户名"
            >
              <a-icon slot="prefix" type="user" class="gray"/>
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <span class="gray">您的密码</span>
            <a-input
              v-model="form.password"
              clearable
              size="large"
              type="password"
              autocomplete="false"
              tabindex="2"
              password
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            >
              <a-icon slot="prefix" type="lock" class="gray"/>
            </a-input>
          </a-form-model-item>
        </a-form-model>

        <a-row type="flex" justify="space-between">
          <a-checkbox v-model="form.keepLogin" size="large">自动登录</a-checkbox>
          <a>忘记密码</a>
        </a-row>
        <a-row>
          <a-button
            size="large"
            type="primary"
            class="login-btn"
            tabindex="5"
            @click="handleLogin"
            block
          >
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </a-button>
        </a-row>
        <a-row type="flex" justify="space-between">
          <a @click="gotoRegister" style="position: absolute; right: 50px;">注册>></a>
        </a-row>
      </a-col>
    </a-row>

    <a-row class="foot">
      <a-row type="flex" justify="space-around" class="help">
        <a class="item" href="#" target="_blank">帮助</a>
        <a class="item" href="#" target="_blank">隐私</a>
        <a class="item" href="#" target="_blank">条款</a>
      </a-row>
      <a-row type="flex" justify="center">
        Copyright © 2020 - Present
        <a href="javascript:void(0);" target="_blank" style="margin:0 5px;">XXXXXXX</a>
        版权所有
      </a-row>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      redirect: undefined,
      loading: false,
      form: {
        account: '',
        password: '',
        keepLogin: false
      },
      rules: {
        account: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      }
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    gotoRegister () {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/user/register' })
    },
    handleLogin () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.form).then(() => {
            this.$router.push({ path: this.redirect || '/' })
          }).finally(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login-container{
  height: 100vh;
  background: url("../../assets/images/login/mylogo1.png") no-repeat;
  background-size:cover;

  .login-main {
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 8px 19px 2px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    background: #FFFFFF;
    width: 800px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    .login-carousel {
      height: 500px;

      img {
        border-radius: 18px 0 0 18px;
        display: inline-block;
        height: 100%;
        width: 100%;
        background-size: cover;
      }
    }

    .login-form-container {
      margin-top: 30px;
      padding: 0 50px;

      .title {
        padding: 36px 0 20px 0;
        font-size: 30px;
        text-align: center;
        color: #333333;
      }

      /deep/.ant-form-item{
        margin-bottom: 14px;
      }

      .forget-pass,
      .other-way {
        font-size: 14px;
      }

      .login-btn,
      .other-login {
        margin-top: 5vh;
      }
    }
  }

  .foot {
    position: absolute;
    left: 50%;
    bottom: 10px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);

    .help {
      margin: 0 auto 2vh;
      width: 60%;

      .item {
        color: rgba(0, 0, 0, 0.45);
      }

      :hover {
        color: rgba(0, 0, 0, 0.65);
      }
    }

    a {
      color: #2d8cf0;
      background: 0 0;
      text-decoration: none;
      outline: 0;
      cursor: pointer;
      transition: color 0.2s ease;
      font-size: 14px;
    }
  }
}
</style>
