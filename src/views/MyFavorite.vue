<template>
    <div class="MyFavorite">
         <div class="mf-nav-box">
              <BackNav left-arrow left-text="返回" title="我的收藏" />
         </div>
         <div class="mf-top-box"></div>
         <div class="mf-main-box">
             <div class="mf-box-item" v-for="(item,index) in likeList" :key="index" @click="myfavDetail(item.pid,$event)">
                <Product :pro="item">
                    <template #del>
                       <van-icon name="delete-o" />
                    </template>
                </Product>
             </div>
            
         </div>
    </div>
</template>

<script>

import BackNav from "../components/BackNav.vue";
import Product from "../components/Product.vue";
    export default {
        data(){
            return{
             likeList:[],
             tokenString:null
            }
        },
        components:{
            BackNav,
            Product
        },
        methods:{
            //查询收藏
            findAllLike(tokenString){
                this.axios({
                   url:'/findAllLike',
                   method:'get',
                   params:{
                       tokenString
                   }
                }).then(res=>{
                 console.log(res);
                 if(res.data.code === 2000){
                     this.likeList = res.data.result;
                    //  console.log(res.data.result);
                 }
                //  console.log(this.likeList);
                }).catch(err=>{
                   console.log(err);
                })
            },
            //根据收藏pid跳转商品详情和取消收藏
            myfavDetail(pid,e){
                let token = sessionStorage.getItem('token');
                if(e.target.className === 'auto-img'){
                    this.$router.push({name:'Detail',params:{pid}});
                }else if(e.target.className === 'van-icon van-icon-delete-o'){
                  this.axios({
                      url:'/notlike',
                      method:'post',
                      data:{
                          token,
                          pid,
                          
                      }
                  }).then(res=>{
                      if(res.data.code ===900){
            
                       this.findAllLike(token);
                      }
               
                  }).catch(err=>{
                 console.log(err);
                  })
                }
            },
          
        },
        created(){
            let token = sessionStorage.getItem('token');
            this.tokenString = token;
            this.findAllLike(token);
        }
    }
</script>

<style lang="less" scoped>
.mf-top-box{
    width: 100%;
   height: 100px;  
   background-color: #0C34BA;
}
.mf-main-box{
    // height: 300px;
    margin: 10px;
    position: relative;
    top: -35px;
    background-color: #fff;
    border-radius: 12px 12px 0  0;
    overflow: hidden;
    display: flex;
    padding: 10px;
     flex-wrap: wrap;
    .mf-box-item{
    width: calc(~"30%");
    margin: 5px;
     
    }
}
/deep/.van-icon{
    vertical-align: bottom;
    margin-left: 36px;
     color: #c0c0c0;
}
</style>