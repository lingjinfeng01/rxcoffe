<template>
  <div class="shogbag">
    <div class="shogbag-nav-box">
      <van-nav-bar
        left-arrow
        left-text="返回"
        title="购物袋"
        :right-text="isShow?'编辑':'完成'"
        @click-right="toggleText"
   />
    </div>
    <div class="shogbag-bg-box">
      <img class="auto-img" src="../assets/images/shopbag_bg.png" alt="">
    </div>
    <div class="shogbag-buy-box">
      <div class="shogbag-buy-item" v-for="(item) in shopList" :key="item.sid">
        <div class="shopbag-left-check">
          <van-checkbox v-model="item.isChecked" @change="simpleSelect" checked-color="#0c34ba">
          </van-checkbox>
          </div>
        <ShopCar :opt="item" >
          <template #add>
          <van-stepper
          v-model="item.count"
          theme="round"
          button-size="22"
          disable-input
          @change="onChange(item.count,item.sid)"
        />
          </template>
        </ShopCar>
      </div>
    </div>
    <div v-if="shopList.length >0" class="shopbag-buy-submit">
      <van-submit-bar :price="count" :button-text="isShow?'提交订单':'删除选择'" :button-color="isShow?'#0c34ba':'red'"
      @submit="addDel(isShow)"
      >
        <van-checkbox checked-color="#0c34ba" v-model="allSelect" @change="allselectChange" >全选</van-checkbox>
      </van-submit-bar>
    </div>
        <div class="not-info" v-if="shopList.length ===0"><van-empty description="购物袋没有商品，赶紧逛一下" /></div>
  </div>
   
</template>
<script>
import BackNav from "../components/BackNav.vue";
import ShopCar from "../components/ShopCar.vue";
export default {
  data(){
    return{
    shopList:[],
    //显示文本
      isShow:true,
    // shopList:[]
      allSelect:false,
     count:0,
    }
  },
  created(){
   let tokenString = sessionStorage.getItem('token');
  // this.getShopCarCountData(tokenString);
    this.getShopCarData(tokenString);
  },
  components: {
    BackNav,
    ShopCar,
  },
  methods: {

    // 获取购物车数据
    getShopCarData(tokenString){
      this.axios({
          method: 'get',
          url:'/findAllShopcart',
          params:{
            tokenString
          }
      }).then(res=>{
           res.data.result.forEach(v=>{
             v.isChecked = false;
           })
           this.shopList = res.data.result;
      }).catch(err=>{
        console.log(err);
      })
    },
    //切换top右边状态
    toggleText(){
      this.isShow = !this.isShow;
    },
    //点击提交订单或者是删除所选
    addDel(isShow){
      let carList = this.shopList;
      let sids = [];
      carList.forEach(v=>{
          if(v.isChecked){
            sids.push(v.sid);
          }
        })
     let tokenString = sessionStorage.getItem('token');
     sids = JSON.stringify(sids);
    //提交订单
    if(isShow){
    //跳转到订单结算页面
         if(this.shopList.length=! 0){
             sessionStorage.setItem('sids',sids);
              this.shopList.forEach(v=>{
                 if(v.isChecked){
                    this.$router.push({name: 'Clearing',query: {sids}});
                 }
              })

         }else{
           return;
         }
    }else{
      //删除所选
       if(this.shopList.length==0){
           return;
           }else{
    this.axios({
      method:'post',
      url:'/removeShopcart',
      data:{
        tokenString,
        sids,
      }
    }).then(res=>{
      console.log(res);
           if(res.data.code ===7000){
           this.getShopCarData(tokenString);
           this.getShopCarCountData(tokenString);
           }
    }).catch(err=>{
      console.log(err);
    })
           }
    }

   },
  //单选是否都选中
   simpleSelect(){
     this.total();
   
     for(let i = 0;i<this.shopList.length;i++){
         if(!this.shopList[i].isChecked){ 
           this.allSelect = false;
            console.log(this.shopList);
           return;
         }
     }
      this.allSelect = true;
        console.log(this.shopList);
   },
     //点击是否全选
   allselectChange(){
       this.shopList.forEach(v=>{
         v.isChecked = this.allSelect;
       })
   },
    //改变数量
    onChange(count,sid){
      let tokenString = sessionStorage.getItem('token');
    this.axios({
      method:'post',
      url:'/modifyShopcartCount',
      data:{
        tokenString,
        sid,
        count
      }
    }).then(res=>{
      console.log(res);
      if(res.data.code===6000){
        this.total()
      this.getShopCarCountData(tokenString);
      }
    }).catch(err=>{
  console.log(err);
    })
  
    },
    //计算总金额
    total(){
      let t = 0;
       this.shopList.forEach(v=>{
          if(v.isChecked){
            t+=v.count*v.price;
          }
       })
       this.count=t*100;
    },
   //  获取商品购物车的总数量
  getShopCarCountData(tokenString) {
      this.axios({
        method: "get",
        url: "/shopcartCount",
        params: {
          tokenString,
        },
      })
        .then((res) => {
          // console.log(res);
                  // console.log(res.data.result); 
              if(res.data.code===4000){
                 console.log(res.data.result);
                 this.$store.commit('badgeValue',res.data.result);
              }

        })
        .catch((err) => {
          console.log(err);
        });
    },
  
  },
};
</script>

<style lang="less" scoped>
.shogbag {
  .shogbag-nav-box {
  }
  .shogbag-bg-box{
    width: 100%;
  }
  .shogbag-buy-box {
    margin-bottom: 120px;
    width: 100%;
    .shogbag-buy-item {
      display: flex;
      align-items: center;
      border-radius: 10px;
      margin: 5px;
      background-color: #fff;
      margin-bottom: 10px;
      .shopbag-left-check{
         margin: 10px;
      }
    }
  }
}
.van-card {
  background-color: #fff;
}
/deep/.van-submit-bar{
  bottom: 50px;
}

    /deep/ .van-nav-bar .van-icon{
      color: #0C34BA;
    }

    /deep/ .van-nav-bar__text{
      color: #0C34BA;
    }

</style>