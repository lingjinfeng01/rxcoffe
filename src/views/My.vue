<template>
  <div class="my">
   <div class="my-top-bg">
     <van-uploader class="file-bg-submit" :after-read="changeBg" show-upload />
     <img class="auto-img bg-img" :src="info.userBg" >
   </div>
   <div class="my-content">
     <div class="my-card">
      <div class="my-card-top">
        <div class="my-card-img">
          <img class="auto-img card-img" :src="info.userImg" alt="">
          
        </div>
        <div class="my-card-detail">
          <div class="my-card-title">{{info.nickName}}</div>
          <div class="my-card-remark">{{info.desc == ''?'这个家伙很懒，什么也没留下!':info.desc}}</div>
        </div>
      </div>
      <div class="my-card-item" v-for="(item,index) in tabList" :key="index" @click="goto(item.to)">
          <div class="my-card-msg">{{item.title}}</div>
            <van-icon name="arrow" />
      </div> 
     </div>
   </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
  export default {
    name: 'My',
    data(){
      return{
        
       tabList:[
         {
           title:"个人资料",
           to:{
              name:'PersonalData'
           }
         },
          {
           title:"我的订单",
           to:{
              name:'MyOrder'
           }
         },
          {
           title:"我的收藏",
           to:{
              name:'MyFavorite'
           }
         },
         {
           title:"地址管理",
           to:{
              name:'AddressList'
           }
         },
          {
           title:"安全中心",
           to:{
              name:'SafetyCenter'
           }
         }
       ],
        info:{},
        tokenString:null
      }
    },
    methods:{
      //跳转页面
      goto(to){
      this.$router.push(to);
      },
      //获取我的信息
      getfindMy(tokenString){
        this.axios({
          url:'/findMy',
          method:'get',
          params:{
            tokenString
          }
        }).then(res=>{
          console.log(res);
          this.info = res.data.result[0];
        }).catch(err=>{

        })
      },
      //更换背景图
      changeBg(file){
          let imgType=file.file.type.split(/\//)[1];
          let serverBase64Img = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, "");
        //   console.log(imgType,base64);
         this.axios({
            url:'/updateUserBg',
            method:'post',
            data:{
               tokenString:this.tokenString,
               imgType,
               serverBase64Img 
            }
        }).then(res=>{
          console.log(res);
          Toast.success('修改背景成功');
           this.getfindMy(this.tokenString);
        }).catch(err=>{
        console.log(err);
        Toast.fail('修改背景失败');
        })
      },
      
    },
    
    created(){
       let token = sessionStorage.getItem('token');
       this.tokenString = token;
       this.getfindMy(token);
    }
   
  }
</script>

<style lang="less" scoped>
  .my{
    .my-top-bg{
      width: 100%;
      height: 200px;
      // background-color: #e8e8;
      position: relative;
      .bg-img{
        width: 100%;
        height: 100%;
      }
      .file-bg-submit{
        background-color: #0C34BA;
      position: absolute;
       width: 100%;
        height: 200px;
        top: 0;
        opacity: 0;
      }
    }
    .my-content{
        width: 95%;
        margin: 0 10px;
        box-sizing: border-box;
    
         position: relative;
         top: -35px;
         border-radius: 10px 10px 0 0 ;
         background-image: linear-gradient(
          to bottom,
          rgba(255,255,255,0.45) 0px,
          rgba(255,255,255,0.45) 45px,
          #fff
        );
      .my-card{
       
       .my-card-top{

         display: flex;
         opacity: 0.8;
         .my-card-img{
           margin: 10px;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #e8e8e8;
          .card-img{
            width: 100%;
            height: 100%;
          }
         }
         .my-card-title{
           margin: 10px;
           color:#0C34BA;
           font-weight: bold;
           font-size: 15px;
         }
         .my-card-remark{
           margin: 10px;
           color: #ccc;
         }
       }
       .my-card-item{
         height: 32px;
         display: flex;
         margin: 10px;
         padding: 5px;
         justify-content: space-between;
         font-size:14px;
          border-bottom: 1px solid #ccc;
          &:last-child{
            border-bottom:none;
          }
       }
      }
    }
  }
</style>