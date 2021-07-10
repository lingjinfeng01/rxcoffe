<template>
  <div class="SafetyCenter">
    <div class="safe-nav-box">
      <BackNav left-arrow left-text="返回" title="安全中心" />
    </div>
    <div class="safe-main-top"></div>
    <div class="safe-main-box">
      <div class="safe-content-item" @click="popup">
        <div class="safe-content-title">修改密码</div>
        <div class="safe-content-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="safe-content-item" @click="destroyAccount">
        <div class="safe-content-title">注销账号</div>
        <div class="safe-content-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="log-out-box">
        <van-button type="primary" color="#0C34BA" round block
           @click="logout">退出登录</van-button
        >
      </div>
    </div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '40%' }"
      closeable
    >
      <div class="updataPsw">修改密码</div>
      <van-form>
        <van-field
          v-model="password"
          :type="isOpen ? 'text' : 'password'"
          name="password"
          label="旧密码"
          placeholder="旧密码(6-16位)"
          :right-icon="isOpen ? 'eye-o' : 'closed-eye'"
          autocomplete="off"
          @click-right-icon="togglePasswordStatus"
          :rules="[
            { required: true, message: '请填写密码' },
            {
              pattern: passwordReg,
              message: '支持数字字母下划线组合并且以字母开头',
            },
          ]"
        />
        <van-field
          v-model="newpsw"
          :type="isOpen2 ? 'text' : 'password'"
          name="password"
          label="新密码"
          placeholder="新密码(6-16位)"
          :right-icon="isOpen2 ? 'eye-o' : 'closed-eye'"
          autocomplete="off"
          @click-right-icon="togglePasswordStatus2"
          :rules="[
            { required: true, message: '请填写密码' },
            {
              pattern: passwordReg,
              message: '支持数字字母下划线组合并且以字母开头',
            },
          ]"
        />
        <van-button
          type="primary"
          style="margin-top: 70px"
          color="#0C34BA"
          round
          block
          @click="updatePassword"
          >确认密码</van-button
        >
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import BackNav from "../components/BackNav.vue";
import { Dialog } from "vant";
export default {
  data() {
    return {
      show: false,
      password: "",
      isOpen: false,
      //验证密码(数字字母下划线组合并且以字母开头6-16位)
      passwordReg: /^[A-Za-z]\w{5,15}$/,
      newpsw: "",
      isOpen2: false,
      tokenString: null,
    };
  },

  components: {
    BackNav,
  },
  methods: {
    //展示弹出层
    popup() {
      this.show = true;
    },
    //点击小眼睛查看密码
    togglePasswordStatus() {
      this.isOpen = !this.isOpen;
    },
    //点击小眼睛查看密码
    togglePasswordStatus2() {
      this.isOpen2 = !this.isOpen2;
    },
    //提交新密码
    updatePassword() {
      let oldPassword = this.password;
      let password = this.newpsw;
      this.axios({
        url: "updatePassword",
        method: "post",
        data: {
          tokenString: this.tokenString,
          password,
          oldPassword,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === "E001") {
            Toast.success("修改密码成功,请重新登录");
            this.show = false;
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 1000);
          } else if (res.data.code === "E003") {
            Toast.fail(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //注销账号
    destroyAccount() {
      Dialog.confirm({
        title: "注销账号",
        message: "是否确定注销账号，一旦注销账号无法恢复",
        confirmButtonColor: "#0c34ba",
      })
        .then(() => {
          this.axios({
            url: "/destroyAccount",
            method: "post",
            data: {
              tokenString: this.tokenString,
            },
          })
            .then((res) => {
              console.log(res);
              if (res.data.code === "G001") {
                Toast.success("注销成功,返回登录");
                setTimeout(() => {
                  this.$router.push({ name: "Login" });
                }, 1000);
              }else{
              Toast('你还没登录，返回登录页面');
                setTimeout(() => {
                  this.$router.push({ name: "Login" });
                }, 1000);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    //退出登录
    logout(){
        this.axios({
            url: '/logout',
            method: "post",
            data: {
              tokenString: this.tokenString,
            },
          })
            .then((res) => {
              console.log(res);
              if (res.data.code === "F001") {
                Toast.success("退出登录成功,返回登录页面");
                setTimeout(() => {
                  this.$router.push({ name: "Login" });
                }, 1000);
              }else{
              Toast('你还没登录，返回登录页面');
                setTimeout(() => {
                  this.$router.push({ name: "Login" });
                }, 1000);
              }
            })
            .catch((err) => {
              console.log(err);
            }); 
    }
  },
  created() {
    let token = sessionStorage.getItem("token");
    this.tokenString = token;
  },
};
</script>

<style lang="less" scoped>
.safe-main-top {
  width: 100%;
  height: 100px;
  background: #0c34ba;
}
.safe-main-box {
  margin: 10px;

  background-color: #fff;
  position: relative;
  top: -35px;
  border-radius: 12px 12px 0 0;
  .safe-content-item {
    display: flex;
    height: 56px;
    justify-content: space-between;
    margin: 10px;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
    .safe-content-title {
      font-size: 13px;
      padding-left: 10px;
    }
    .safe-content-right {
      padding-right: 10px;
    }
  }
}
.log-out-box {
  margin-top: 150px;
}
.updataPsw {
  margin-top: 15px;
  padding: 10px;
  font-size: 15px;
}
</style>