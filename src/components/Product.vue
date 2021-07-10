<template>
  <div class="product">
    <div class="product-img">
      <img class="auto-img" :src="pro.smallImg" alt="">
    </div>
    <div class="product-zhname one-text">{{pro.name}}</div>
    <div class="product-enname one-text">{{pro.enname}}</div>
    <div class="product-price">&yen;{{pro.price}}
      <slot name="del"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Product',
    props: {
      pro: {
        type: Object,

        //默认值, 当属性的值为数组或者对象时, 默认值需要使用函数返回
        default() {
          return {};
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-img{
    background-color: #e8e8e8;
  }

  .product-zhname{
    font-size: 14px;
    margin-top: 10px;
  }

  .product-enname{
    color: #999;
  }

  .product-price{
    color: #0c34ba;
    font-size: 14px;
    margin-top: 5px;
    font-weight: bold;
  }

</style>