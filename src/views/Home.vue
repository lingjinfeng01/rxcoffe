<template>
  <div class="home">
    <div class="home-nav-box">
      <div class="home-nav-time">下午好</div>
      <div class="home-nav-title">Allen</div>
      <div class="home-nav-search">
        <van-search
          v-model="searchValue"
          shape="round"
          placeholder="请输入搜索关键词"
        />
      </div>
      <!-- <van-nav-bar  left-text="返回" left-arrow>
        <template #right> -->
      <!-- <van-icon name="search" size="18" /> -->
      <!-- <van-search
          v-model="searchValue"
         shape="round"
        placeholder="请输入搜索关键词"
      /> -->
      <!-- </template>
      </van-nav-bar> -->
    </div>
    <div class="home-swiper-box">
      <div class="home-swiper-content">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#0c34ba">
          <van-swipe-item v-for="(item, index) in bannerData" :key="index"
          @click="homeViewDetail(item.pid)"
            ><img class="auto-img" :src="item.bannerImg"
          /></van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="home-hot-box">
      <div class="home-hot-title">
        <div class="home-hot-text">热卖推荐</div>
      </div>

      <div class="home-hot-buy">
        <div class="hot-buy-item" v-for="(item,index) in hotBuyData" :key="index" @click="homeViewDetail(item.pid)">
           <div class="hot-buy-text">hot</div>
          <Product :pro="item"></Product>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "../components/Product.vue";
import { Toast } from "vant";
export default {
  name: "Home",
  data() {
    return {
      searchValue: "",
      //存放轮播图片数组
      bannerData: [],
      //存储热卖数组
      hotBuyData:[],
    };
  },
  components: {
    Product,
  },
  created() {
    //调用获取轮播图数据方法
    this.getBannerData();
  //调用获取热卖推荐方法
  this.getHotBuyData();
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    //获取轮播图数据
    getBannerData() {
      this.axios({
        url: "/banner",
      })
        .then((res) => {
          // console.log(res);
          if (res.data.code === 300) {
            console.log(res.data.result);
            this.bannerData = res.data.result;
          }
          // console.log(this.bannerData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取热卖推荐的数据
    getHotBuyData() {
      this.axios({
        url: "/typeProducts",
        params: {
          key: "isHot",
          value: 1
        },
      })
        .then((res) => {
          // console.log(res);
          if(res.data.code === 500){
           
            this.hotBuyData = res.data.result;
          }
          // console.log(this.bannerData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
   //根据商品类型的pid跳转到商品详情
    homeViewDetail(pid){
         this.$router.push({name:'Detail',params:{pid}});
    }
  },
};
</script>
<style lang="less" scoped>
.home {
  .home-nav-box {
    width: 100%;
    height: 54px;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    .home-nav-time {
      margin: 0 10px;
      font-size: 14px;
      font-weight: bold;
      line-height: 54px;
    }
    .home-nav-title {
      line-height: 54px;
      font-size: 16px;
      font-weight: bold;
      color: #0c34ba;
    }
    .home-nav-search {
      box-sizing: border-box;
      margin-left: 10px;
      flex: 1;
      padding-left: 30px;
    }
  }
  .home-swiper-box {
    .home-swiper-content {
      box-sizing: border-box;
      width: 350px;
      margin: 10px auto;
      //  padding: 10px;
      //  background: #000;
      //  height: 200px;
      height: 260px;
      border-radius: 20px;
      overflow: hidden;
    }
  }
  .home-hot-box {
    box-sizing: border-box;
    width: 100%;
    padding: 12px;
    .home-hot-title {
      padding-top: 1px;
      background-color: #fff;
      height: 46px;
      .home-hot-text {
        margin-top: 6.75px;
        font-size: 14px;
        font-weight: bold;
        width: 100px;
        height: 32px;
        background-color: #0c34ba;
        line-height: 32px;
        color: #fff;
        text-align: center;
        border-top-right-radius: 20px;
      }
    }

    .home-hot-buy {
      margin-top: 10px;
       display: flex;
      flex-wrap: wrap;
      margin-bottom: 50px;
      .hot-buy-item {
        background-color: #fff;
        width: calc(~"50% - 5px");
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
        &:nth-child(2n) {
          margin-right: 0;
        }
        .hot-buy-text{
          width: 30px;
          height: 30px;
          background-color: #0c34ba;
          color: #fff;
          text-align: center;
          line-height: 30px;
          font-size: 14px;
          font-weight: bold;
          position: absolute;
          top: 0;
          left: 15px;
          border-radius: 0 0 5px 5px;
        }
      }
    }
  }
}
.my-swipe .van-swipe-item {
  // color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  height: 260px;
  // background-color: #39a9ed;
  border-radius: 20px;
}
</style>