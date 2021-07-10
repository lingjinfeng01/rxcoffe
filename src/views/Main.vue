<template>
  <div class="main">
    <div>
      <!-- 二级路由插座 -->
      <router-view></router-view>
    </div>

    <van-tabbar
      v-model="activeTabIndex"
      inactive-color="#646566"
      active-color="#0C34BA"
      route
      fixed
    >
      <van-tabbar-item
        v-for="(item, index) in tarbbarData"
        :key="index"
        :to="item.to"
        :badge="item.badge"
        :dot="item.dot"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Main",

  data() {
    return {
      badge:0,
      activeTabIndex: 0,
      //获取到总数量
      //底部导航

    };
  },
  computed:{
     tarbbarData(){
       return  [
        {
          title: "首页",
          activeIcon: require("../assets/images/home_active.png"),
          inactiveIcon: require("../assets/images/home.png"),
          //跳转的路由
          to: { name: "Home" },
        },
        {
          title: "菜单",
          activeIcon: require("../assets/images/menu_active.png"),
          inactiveIcon: require("../assets/images/menu.png"),
          to: { name: "Menu" },
        },
        {
          title: "购物袋",
          activeIcon: require("../assets/images/shopbag_active.png"),
          inactiveIcon: require("../assets/images/shopbag.png"),
          to: { name: "Shopbag" },
          badge:this.$store.state.shopBagCount === 0?'':this.$store.state.shopBagCount,
        }, 
        {
          title: "我的",
          activeIcon: require("../assets/images/my_active.png"),
          inactiveIcon: require("../assets/images/my.png"),
          to: { name: "My" },
        },
      ]
       
     }
  },

  methods: {
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
          //  this.$store.commit('badgeValue',badgeValue);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    
  },
  created() {
    let tokenString = sessionStorage.getItem("token");
       this.getShopCarCountData(tokenString);

   
  },
};
</script>
  
<style lang="less" scoped>
</style>