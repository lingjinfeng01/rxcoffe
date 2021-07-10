<template>
  <div class="AddRegion">
    <div class="addregion-nav-box">
      <BackNav left-arrow left-text="返回" title="新增地址" />
    </div>
    <div class="addregion-main-box">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default 
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
      tokenString:null

    };
  },
  created(){
 let token = sessionStorage.getItem('token');
 this.tokenString = token;
 console.log(token);
 
  },
  methods: {
      //保存新增地址内容
    onSave(content) {
     content.isDefault = content.isDefault ? 1 : 0;
     console.log(content.isDefault);
       console.log(content);
       //处理的数据
         let data ={
            tokenString:this.tokenString,
            name: content.name,
            tel: content.tel,
            province: content.province,
            city: content.city,
            county: content.county,
            addressDetail: content.addressDetail,
            areaCode: content.areaCode,
            postalCode: content.postalCode,
            isDefault:content.isDefault
         }
         console.log(data);
         this.addAdressData(data);

    },
    onDelete() {
      Toast("delete");
    },
   //提交新增的地址
   addAdressData(data){
       this.axios({
           url:'/addAddress',
           method:'post',
           data,
       }).then(res =>{
           console.log(res);
            Toast("新增地址成功");
            setTimeout(()=>{
             this.$router.push({name:'AddressList'})
            },2000)
            
       }).catch(err=>{
          Toast("新增地址失败");
           console.log(err);
       })
   }
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