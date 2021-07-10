<template>
  <div class="addresslist">
    <div class="add-list-nav">
      <van-nav-bar
        title="地址列表"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="add-main-box">
      <div class="add-top-box"></div>
      <div class="add-detail-box">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          :switchable="false"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
export default {
  name: "AddressList",
  data() {
    return {
      chosenAddressId: "1",
      list: [],
    };
  },
  methods: {
    //点击返回
    onClickLeft(){
      this.$router.go(-1);
    },
    //跳转到新增地址网页
    onAdd() {
      this.$router.push({ name: "AddRegion" });
    },
    //跳转到地址编辑网页
    onEdit(item, index) {
      // console.log(item);
      this.$router.push({ name: "EditAddress", params: { item } });
    },
    //查询地址
    findAddressData(tokenString) {
      this.axios({
        url: "/findAddress",
        method: "get",
        params: {
          tokenString,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 20000) {
            res.data.result.forEach((item, index) => {
              this.list.push({
                id: `${index}`,
                name: item.name,
                tel: item.tel,
                address: `${item.province}${item.city}${item.county}${item.addressDetail}`,
                isDefault: item.isDefault,
                aid: item.aid,
                data: [item],
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    let tokenString = sessionStorage.getItem("token");
    console.log(tokenString);

    this.findAddressData(tokenString);
  },
  components: {
    BackNav,
  },
};
</script>

<style lang="less" scoped>
.add-main-box {
  .add-top-box {
    width: 100%;
    height: 100px;
    background-color: #0c34ba;
  }
  .add-detail-box {
    position: relative;
    height: 350px;
    margin: 10px;

    top: -35px;
    border-radius: 12px 12px 0 0;
  }
}
/deep/.van-button--danger {
  color: #fff;
  background-color: #0c34ba;
  border: 0.02667rem solid #0c34ba;
}
/deep/.van-button--danger {
  background-color: #0c34ba;
  border-color: #0c34ba;
}
/deep/.van-tag--danger {
  background-color: #0c34ba;
}
/deep/.van-address-item .van-radio__icon--checked .van-icon {
  background-color: #0c34ba;
  border-color: #0c34ba;
}
/deep/.van-nav-bar__text{
   color: #0c34ba;
}
.van-icon .van-icon-arrow-left .van-nav-bar__arrow{
   color: #0c34ba;

}
</style>