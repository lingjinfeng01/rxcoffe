<template>
  <div class="PersonalData">
    <div class="per-nav-box">
      <BackNav left-arrow left-text="返回" title="个人资料" />
    </div>
    <div class="per-top-box"></div>
    <div class="per-main-box">
      <div class="per-main-item">
        <div class="per-main-title">头像</div>
        <div class="per-main-right-img">
            <van-uploader class="file-submit" :after-read="changeAvatar" />
            <img class="auto-img submit-pho" :src="opt.userImg" alt="">
            
           
        </div>
      </div>
        <div class="per-main-item">
        <div class="per-main-title">用户ID</div>
        <div class="per-main-right">{{opt.userId}}</div>
      </div>
        <div class="per-main-item">
        <div class="per-main-title">昵称</div>
        <div class="per-main-right">
          <input type="text" v-model="opt.nickName"
           class="per-info" @blur="changeNickName(opt.nickName)">
        </div>
      </div>
        <div class="per-main-item">
        <div class="per-main-title">简介</div>
        <div class="per-main-right">
            <input type="text" v-model="opt.desc"
             class="per-info" @blur="changeDesc(opt.desc)">
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
import { Toast } from 'vant';
export default {
  name: "PersonalData",
  data() {
    return {
        tokenString:null,
        opt:{}
    };
  },
  components: {
    BackNav,
  },
  methods:{
      //获取用户个人信息
      getfindAccountInfo(tokenString){
          this.axios({
              url:'/findAccountInfo',
              method:'get',
              params:{
                  tokenString
              }

          }).then(res =>{
           console.log(res);
           this.opt = res.data.result[0];
           if( this.opt.desc.length==0 ){
               this.opt.desc = '这个家伙很懒，什么也没留下！';
           }
          }).catch(err=>{
       console.log(err);
          })
      },
      //修改昵称
     changeNickName(nickName){
     
        this.axios({
            url:'/updateNickName',
            method:'post',
            data:{
               tokenString:this.tokenString,
               nickName
            }
        }).then(res=>{
          console.log(res);
          Toast.success('修改昵称成功');
        }).catch(err=>{
        console.log(err);
        Toast.fail('修改昵称失败');
        })
      
      },
      //修改简介
      changeDesc(desc){
        
          this.axios({
            url:'/updateDesc',
            method:'post',
            data:{
               tokenString:this.tokenString,
               desc
            }
        }).then(res=>{
          console.log(res);
          if(this.opt.desc.length === 0){
                 this.opt.desc = '这个家伙很懒，什么也没留下！'
          }
          Toast.success('修改简介成功');
        }).catch(err=>{
        console.log(err);
        Toast.fail('修改简介失败');
        })
      },
      //修改头像
      changeAvatar(file){
          console.log(file);
          let imgType=file.file.type.split(/\//)[1];
          let serverBase64Img = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, "");
        //   console.log(imgType,base64);
         this.axios({
            url:'/updateAvatar',
            method:'post',
            data:{
               tokenString:this.tokenString,
               imgType,
               serverBase64Img 
            }
        }).then(res=>{
          console.log(res);
          Toast.success('修改头像成功');
           this.getfindAccountInfo(this.tokenString);
        }).catch(err=>{
        console.log(err);
        Toast.fail('修改头像失败');
        })
      }

  },
  created(){
  let token = sessionStorage.getItem('token');
   this.tokenString = token;
   this.getfindAccountInfo(token);
   
  }
};
</script>

<style lang="less" scoped>
.per-top-box {
  height: 100px;
  width: 100%;
  background-color: #0c34ba;
}
.per-main-box {
  margin:10px;

  background-color: #fff;
  position: relative;
  top: -35px;
  border-radius: 12px 12px 0 0;
  .per-main-item {
       height: 45px;
         display: flex;
         margin: 10px;
         padding: 5px;
         justify-content: space-between;
         align-items: center;
         font-size:12px;
          border-bottom: 1px solid #ccc;
      
          &:last-child{
            border-bottom:none;
            padding-bottom:20px ;
          }
           &:first-child{
             align-self: start;
           }
           .per-main-right{
               text-align: right;
               flex: 1;
         .per-info{
             width: 100%;
              text-align: right;
              border:none;
          }
           }
           .per-main-right-img{
               position: relative;
               width: 45px;
               height: 45px;
            border-radius: 50%;
            overflow: hidden;
            .submit-pho{
                width: 45px;
                height: 45px;
                position: absolute;
                top: 0;
            }
            .file-submit{
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                z-index: 999;
            }
           }

  }
}
</style>