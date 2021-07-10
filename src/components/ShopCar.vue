<template>
  <div class="shopcar">
    <div class="shopcar-box">
      <div class="shop-detail">
        <div class="shop-detail-img">
          <img class="auto-img" :src="opt.small_img" alt="" />
        </div>
        <div class="shop-detail-box">
          <div class="detail-title">
            <div class="detail-title-text">{{ opt.name }}</div>
            <div class="detail-title-types">{{ opt.rule }}</div>
          </div>
          <div class="detail-title-enname">{{ opt.enname }}</div>
          <div class="detail-price">￥{{ opt.price }}</div>
        </div>
      </div>
      <div class="shop-right">
        <slot name="add"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value:0
    }

  },
  watch:{
    

  },
  props: {
    opt: {
      type: Object,
    },
  },
  methods:{

   
  },
}
</script>

<style lang="less" scoped>
.shopcar-box {
  height: 100px;
  display: flex;
  .shop-left {
    align-self: center;
    padding: 0 10px;
  }

  .shop-detail {
    align-self: center;
    display: flex;
    .shop-detail-img {
      width: 70px;
      height: 70px;
      margin-top: 5px;
      background-color: #ccc;
      margin-right: 10px;
      box-sizing: border-box;
    }
    .shop-detail-box {
      width: 120px;
      height: 73px;
      .detail-title {
        display: flex;
        .detail-title-text {
          display: block; /*内联对象需加*/
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow: ellipsis;
          font-size: 14px;
        
        }
        .detail-title-types {
          margin-left: 15px;
          margin-top: 3px;
          color: #ccc;
          display: block; /*内联对象需加*/
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow: ellipsis;
          font-size: 14px;
         
        }
      }
      .detail-title-enname {
        margin: 5px 0;
        color: #ccc;
        display: block; /*内联对象需加*/
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis;
      }
      .detail-price {
        margin: 10px 0 0 0;
        color: #0c34ba;
        font-weight: bold;
      }
    }
  }
  .shop-right {
    align-self: flex-end;
    margin: 0 auto 10px;
  }
  /deep/ .van-stepper--round .van-stepper__plus {
    background-color: #0c34ba;
  }
  /deep/ .van-stepper--round .van-stepper__minus {
    color: #0c34ba;
    border-color: #0c34ba;
  }
}
</style>