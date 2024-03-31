<template>
  <div class="login-container">
    <a-row>
      <a-col :span="8">
        <div class="login-form-container">
          <div class="welcome-title">你好！</div>
          <div class="welcome-desc">欢迎来到我们的世界！</div>
          <a-form-model class="login-form">
            <a-form-model-item>
              <a-input placeholder="请输入用户名/手机号"></a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input placeholder="请输入密码"></a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button>登录</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'Login1'
}
</script>

<style lang='less' scoped>
.login-container{
  height: 100vh;
  background: url("../../assets/images/login/background1.png") no-repeat;
  background-size:cover;

  .login-form-container{
    margin-top: 260px;
    margin-left: 120px;

    .welcome-title{
      font-size: 54px;
      font-family: SourceHanSansCN;
      font-weight: 500;
      color: #0E121A;
    }

    .welcome-desc{
      margin-top: 30px;
      font-size: 26px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #0E121A;
    }

    .login-form{
      margin-top: 70px;

      /deep/.ant-input{
        width: 480px;
        height: 50px;
        background: #F7F4FB;
        border-radius: 25px;
        padding: 4px 20px;
      }

      /deep/.ant-btn{
        margin-top: 20px;
        width: 180px;
        height: 50px;
        background: linear-gradient(90deg, #5A61F0 0%, #6A8EEF 100%);
        box-shadow: 0 17px 21px 0 rgba(152, 173, 241, 0.44);
        border-radius: 30px;
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
  }
}
</style>
