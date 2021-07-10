<template>
  <div class="AddRegion">
    <div class="addregion-nav-box">
      <BackNav left-arrow left-text="返回" title="编辑地址" />
    </div>
    <div class="addregion-main-box">
      <van-address-edit
        :area-list="areaList"
        show-postal
        :address-info="opt"
        show-set-default 
        show-delete
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import BackNav from "../components/BackNav.vue";
import { Toast } from 'vant';
export default {
  name: "AddRegion",
  components: {
    BackNav,
  },
  data() {
    return {
      areaList,
      tokenString:null,
      opt:{}

    };
  },
  created(){
      let token = sessionStorage.getItem('token');
      this.tokenString = token;
      let obj = this.$route.params.item.data[0]
      obj.isDefault= obj.isDefault === 0? false : true;
      this.opt = obj ;
  },
  methods: {
      //保存新增地址内容
       onSave(content) {
      let aid = this.opt.aid;
      console.log(aid);
      console.log(content);
      content.isDefault=content.isDefault ? 1 : 0;
      this.axios({
        url:'/editAddress',
        method:'post',
        data:{
          tokenString:this.tokenString,
          aid,
          name: content.name,
          tel:content.tel,
          province: content.province,
          city:content.city,
          county: content.county,
          addressDetail:content.addressDetail,
          areaCode:content.areaCode,
          postalCode:content.postalCode,
          isDefault:content.isDefault,
        } 
      }).then(res=>{
        console.log(res);
        Toast.loading({
        message: '编辑成功...',
        forbidClick: true,
});
    setTimeout(()=>{
       this.$router.push({name:'AddressList'})
    },2000)
      }).catch(err=>{
        console.log(err);
      })
      

    },
    onDelete() {
      // Toast("delete");
      let aid = this.opt.aid;
      this.axios({
        url:'/deleteAddress',
        method:'post',
        data:{
        tokenString:this.tokenString,
        aid
        }
        
      }).then(res=>{
        console.log(res);
        Toast.loading({
        message: '删除成功...',
        forbidClick: true,
});
    setTimeout(()=>{
       this.$router.push({name:'AddressList'})
    },2000)
      }).catch(err=>{
        console.log(err);
      })
    },

  },
};
</script>

<style lang="less" scoped>
/deep/
.van-button--danger {
    color: #fff;
    background-color: #0c34ba;
    border: 0.02667rem solid #0c34ba;
}
</style>