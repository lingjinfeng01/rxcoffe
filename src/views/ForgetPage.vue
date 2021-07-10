<template>
  <div class="login">
    <van-nav-bar>
      <template #left>
        <div class="logo-box">
          <div class="logo">
            <img
              class="auto-img"
              src="../assets/images/home_active.png"
              alt=""
            />
          </div>
          <div class="logo-text">Luckin Coffee</div>
        </div>
      </template>
      <template #right>
        <div class="guang" @click="goPage('Menu')">先逛一逛</div>
      </template>
    </van-nav-bar>

    <div class="user-box">
      <div>
        <div class="welcome-zhtitle">找回密码！</div>
        <div class="welcome-entitle">Find password</div>
      </div>
      <div class="form-box">
        <van-form @submit="next">
          <van-field
            v-model="userInfo.email"
            name="email"
            label="邮箱"
            placeholder="邮箱号"
            autocomplete="off"
            :rules="[
              { required: true, message: '请填写邮箱号' },
              { pattern: phoneReg, message: '邮箱格式不正确' },
            ]"
          />
          <van-field
            v-model="userInfo.password"
            type='text' 
            name="number"
            label="验证码"
            placeholder="验证码(6个字符)"
            autocomplete="off"
            :rules="[
              { required: true, message: '请填写验证码' },
              {
                pattern: passwordReg,
                message: '请输入6位数字',
              },
            ]"
          >
        <template #button>
           <van-button size="small" color="#0C34BA" round block type="primary" @click="sendCode(userInfo.email)">发送验证码</van-button>
       </template>
        </van-field>
         
          <div class="login-btn">
            <van-button round block color="#0C34BA" native-type="submit"
              >下一步</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isOpen: false,

      //验证邮箱号
      phoneReg:/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,

      //验证密码(数字字母下划线组合并且以字母开头6-16位)
      passwordReg: /^\d{6}$/,
    
      userInfo: {
        email: "",
        number: "",
      },
    };
  },

  methods: {

    togglePasswordStatus() {
      this.isOpen = !this.isOpen;
    },
   //发送验证码
   sendCode(email){
       console.log(email);
       this.axios({
           url:'/emailValidCode',
           method:'post',
           data:{
               email
           }
       }).then(res=>{
           console.log(res);
       }).catch(err=>{
         console.log(err);
       })
   },
    

    //登录
    next(userInfo) {
      console.log('userInfo ==> ', userInfo);
      this.axios({
          url:'/checkValidCode',
          method:'post',
          data:{
              validCode:userInfo.number
          }
      }).then(res=>{
          if(res.data.code ==='K001'){
            this.$router.push({name:'FindPage'})
          }
      }).catch(err=>{
          console.log(err);
      })
    
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  .forgot-box {
    margin-top: 10px;
    display: flex;
  }
  .forgot-text {
    margin-left: auto;
    font-size: 14px;
    color: #666;
  }
  .login-btn {
    margin-top: 50px;
  }
  .form-box {
    margin-top: 50px;
  }
  .welcome-zhtitle {
    font-size: 22px;
    color: #666;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .welcome-entitle {
    font-size: 16px;
    color: #999;
  }
  .user-box {
    margin-top: 80px;
    padding: 15px;
  }
  .guang {
    color: #0c34ba;
    font-weight: bold;
    font-size: 14px;
  }
  .logo-box {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  .logo-text {
    margin-left: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #666;
  }
}
</style>