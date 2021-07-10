<template>
  <div class="cleaning">
    <div class="clearning-nav-box">
      <BackNav left-arrow left-text="返回" title="订单结算" />
    </div>
    <div class="cleaning-main-box">
      <div class="cleaning-address-box">
        <div class="select-address" @click="popup">选择地址 ></div>
        <div class="contact-info-box">
          <div class="contact-info-detail">
            <div class="info-name">{{opt.name}}</div>
            <div class="info-tel">{{opt.tel}}</div>
            <div class="info-default" v-if="opt.isDefault">默认</div>
          </div>
          <div class="info-address">{{opt.address}}</div>
        </div>
      </div>
      <div class="order-info-box">
        <div class="order-info-title">订单信息</div>
        <div class="order-info-item" v-for ="(item,index) in commitList" :key="index">
          <van-card
            :num="item.count"
            :price="item.price"
            :desc="item.desc"
           
            :thumb="item.small_img"
            >
             <template #title>
               <div class="info-type" style="display:flex;">
                 <div class="info-type-title" style="margin:5px;font-weight:bold;font-size:13px;">{{item.name}}</div>
                 <div class="info-type-rule" style="margin:5px;color:#ccc;" >{{item.rule}}</div>
                </div>
                <div class="info-enname">
                  {{item.enname}}
                </div>
          </template>
          </van-card>
        </div>
       
      </div>
      <div class="clearning-bottom-box">
        <div class="bottom-time">{{createTime}}</div>
        <div class="bottom-total-box">
          <div class="total-left">共计{{count}}件</div>
          <div class="total-right">合计￥{{total}}元</div>
        </div>
      </div>
      <div class="bottom-button">
        <van-button type="primary" block round color="#0c34ba"
          @click="pay">立即结算</van-button>
      </div>
    </div>
    <van-popup
      v-model="isShow"
      closeable
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        switchable
        default-tag-text="默认"
        @add="onAdd"
        @select="selectAddress"
        color="#0c34ba"
        @click-item="toggleAddress"
      />
    </van-popup>
  </div>
</template>
<script>
import BackNav from "../components/BackNav.vue";
import { Toast } from 'vant';
export default {
  data() {
    return {
      isShow: false,
      chosenAddressId: '100',
      tokenString:null,
      list: [
      ],
      createTime:'',
      commitList:[],
      opt:{},
      sids:null,
      //数量
      count:0,
       //总计金额
       total:0,
    };
  },
  watch:{
        isShow(){
          if(!this.isShow){
            this.list = [];
          }
        }
  },
  components: {
    BackNav,
  },
  created() {
    this.sids = sessionStorage.getItem('sids');
    console.log(this.sids);
    let tokenString = sessionStorage.getItem('token');
    this.tokenString = tokenString;
    this.getCommitShopCar(tokenString,this.sids);
  },
  methods: {
    //点击选择地址底部弹窗
    popup() {
      this.isShow = true;
      //获取地址信息
       this.axios({
         url:'/findAddress',
         method:'get',
         params:{
            tokenString:this.tokenString
         }
       }).then(res=>{
        if(res.data.code === 20000){
          res.data.result.forEach((item,index)=>{
            this.list.push({
               id: `${index}`,
               name:  item.name,
               tel: item.tel,
               address: `${item.province}${item.city}${item.county}${item.addressDetail}`,
               isDefault:item.isDefault,
               aid:item.aid,
               data:[item]
            })
          })
        }
        console.log(this.list);

  
       }).catch(err=>{
       console.log(err);
       })
    }, 
     //新增地址
      onAdd() {
     
      this.$router.push({name: 'AddressList'});
    },
    //选择的地址
    selectAddress(item,index){
    console.log(item,index);
    this.opt = item;
    console.log(this.opt);
    },
    toggleAddress(){
   this.isShow= false;
    },
    //获取提交购物车的数据
    getCommitShopCar(tokenString,sids){
      this.axios({
        method:'get',
        url:'/commitShopcart',
        params:{
       tokenString,
       sids,
        }
      }).then(res=>{
    
     if(res.data.code ==50000){
       console.log(res);
        res.data.result.forEach(v=>{
                  this.count += v.count;
                  this.total +=v.count*v.price; 
        })
         this.commitList = res.data.result;
         this.createTime = res.data.result[0].created_at;
       
         this.createTime = this.dayjs(this.createTime).format("YYYY-MM-DD HH:mm:ss");
         
     }
      }).catch(err=>{
        console.log(err);
      })
    },
    //立即结算
    pay(){
      if(JSON.stringify(this.opt) === '{}'){
        Toast.fail('请选择地址');
      }else{
      this.axios({
        url:'/pay',
        method:'post',
        data:{
        tokenString:this.tokenString,
        phone:this.opt.tel,
        address:this.opt.address,
        receiver:this.opt.name,
        sids:this.sids
           }
      }).then(res=>{
        if(res.data.code === 60000){
           this.$router.push({name:'MyOrder'});
        }
         console.log(res);
      }).catch(err=>{
        console.log(err);
      }) 
      }
    }

  },
  
};
</script>

<style lang="less" scoped>
.cleaning-main-box {
    margin: 10px 10px 100px 10px;
    
  .bottom-button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .order-info-box {
    background-color: #fff;
    border-radius: 12px 12px 0 0;
    .order-info-title {
      padding: 10px;

      font-size: 13px;
      .info-type{
        display: flex;
      }
    }
  }
  .cleaning-address-box {
    background-color: #fff;
    border-radius: 12px 12px 0 0;
    .select-address {
      padding-top: 5px;
      margin: 10px;
      font-size: 14px;
    }
    .contact-info-box {
      .info-address {
        margin-top: 10px;
        padding-bottom: 10px;
        font-size: 12px;
      }
      margin: 10px;
      .contact-info-detail {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .info-name {
          font-size: 13px;
          color: #0c34ba;
          margin-right: 10px;
        }
        .info-tel {
          margin-right: 10px;
          font-size: 12px;
        }
        .info-default {
          width: 28px;
          height: 16px;
          text-align: center;
          line-height: 16px;
          border-radius: 12px;
          background-color: #0c34ba;
          color: #fff;
        }
      }
    }
  }
  .clearning-bottom-box {
    margin-top: 1px;
    background-color: #fff;
    .bottom-time {
      padding: 10px 0 5px 10px;
      font-size: 13px;
    }
    .bottom-total-box {
      display: flex;
      justify-content: space-between;
      .total-left {
        padding: 10px 0 10px 10px;
      }
      .total-right {
        padding: 10px;
        font-size: 13px;
        font-weight: bold;
        color: #0c34ba;
      }
    }
  }
  /*deep*/
  .van-card {
    background-color: #fff;
    .van-card__price {
      color: #0c34ba;
    }
  }


}
  /deep/.van-button--danger {
    color: #fff;
    background-color: #0c34ba;
    border: 0.02667rem solid #0c34ba;
}
  /deep/.van-button--danger{
    background-color: #0c34ba;
    border-color: #0c34ba;
  }
   /deep/.van-tag--danger{
    background-color: #0c34ba;
  }
  /deep/.van-address-item .van-radio__icon--checked .van-icon{
    background-color: #0c34ba;
    border-color: #0c34ba;
  }
</style>