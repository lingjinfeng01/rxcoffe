<template>
  <div class="myorder">
    <div class="myorder-nav-box">
      <van-nav-bar
        title="我的订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="myorder-main-top"></div>
    <div class="myorder-main-box">
      <div class="myorder-status-box">
        <van-tabs
          v-model="active"
          title-active-color="#0c34ba"
          color="#0c34ba"
          @click="toggle(active)"
        >
          <van-tab
            :title="v.title"
            :name="v.name"
            v-for="(v, i) in cardList"
            :key="i"
          >
            <div
              class="myorder-status-item"
              v-for="(item, index) in orderList"
              :key="index"
            >
              <div class="myorder-item-top">
                <div class="myorder-item-book">{{ item.oid }}</div>
                <div
                  class="myorder-item-status"
                  @click="receipt(item.oid, item.data[0].status, active)"
                >
                  {{
                    item.data[0].status === 1
                      ? "确认收货"
                      : item.data[0].status === 2
                      ? "已完成"
                      : ""
                  }}
                </div>
                <div
                  class="myorder-item-del"
                  v-if="item.data[0].status === 2"
                  @click="deleteOrder(item.oid, active)"
                >
                  <van-icon name="delete-o" />
                </div>
              </div>
              <div
                class="myorder-info-item"
                v-for="(opt, ind) in item.data"
                :key="ind"
              >
                <van-card
                  :num="opt.count"
                  :price="opt.price"
                  :desc="opt.desc"
                  :thumb="opt.smallImg"
                >
                  <template #title>
                    <div class="info-type" style="display: flex">
                      <div
                        class="info-type-title"
                        style="margin: 5px; font-weight: bold; font-size: 13px"
                      >
                        {{ opt.name }}
                      </div>
                      <div
                        class="info-type-rule"
                        style="margin: 5px; color: #ccc"
                      >
                        {{ opt.rule }}
                      </div>
                    </div>
                    <div class="info-enname">
                      {{ opt.enname }}
                    </div>
                  </template>
                </van-card>
              </div>
              <div class="myorder-item-bottom">
                <div class="bottom-time">{{ item.data[0].updatedAt }}</div>
                <div class="bottom-total-box">
                  <div class="total-left">共计{{ item.count }}件</div>
                  <div class="total-right">合计￥{{ item.total }}元</div>
                </div>
              </div>
            </div>
              <div class="not-info" v-if="orderList.length ===0"><van-empty description="没有订单信息，赶紧下一单" /></div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tokenString: null,
      orderList: [],
      //卡片数组
      cardList: [
        {
          title: "全部",
        },
        {
          title: "进行中",
        },
        {
          title: "已完成",
        },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 切换状态
    toggle(status) {
      console.log(status);
      let tokenString = this.tokenString;
      this.getfindOrder(tokenString, status);
    },
    // 查询订单详细
    getfindOrder(tokenString, status) {
      this.axios({
        url: "/findOrder",
        method: "get",
        params: {
          tokenString,
          status,
        },
      })
        .then((res) => {
          console.log(res);
          // console.log(res.data.result);
          let arr = [];
          let orderArr = res.data.result;
          orderArr.forEach((v) => {
            arr.push(v.oid);
          });
          arr = Array.from([...new Set(arr)]);
          console.log(arr);
          let oidList = [];
          for (let i = 0; i < arr.length; i++) {
            oidList.push({
              oid: arr[i],
              data: [],
              count: 0,
              total: 0,
            });
            orderArr.forEach((v) => {
              if (arr[i] == v.oid) {
                console.log(v);
                oidList[i].data.push(v);
              }
            });
          }
          console.log(oidList);
          this.orderList = oidList;
          for (let i = 0; i < this.orderList.length; i++) {
            for (let j = 0; j < this.orderList[i].data.length; j++) {
              this.orderList[i].count += this.orderList[i].data[j].count;
              this.orderList[i].total +=
                this.orderList[i].data[j].count *
                this.orderList[i].data[j].price;
              this.orderList[i].data[j].updatedAt = this.dayjs(
                this.createTime
              ).format("YYYY-MM-DD HH:mm");
            }
            this.orderList[i].total = Number(this.orderList[i].total).toFixed(
              2
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //确认收货
    receipt(oid, statu, status) {
      console.log(oid);
      console.log(status);
      let tokenString = this.tokenString;
      this.$dialog.confirm({
        title: '确认收货',
        message: '是否确认收货？',
      confirmButtonColor: "#0c34ba",
      })
        .then(() => {
              if (statu === 1) {
        this.axios({
          url: "/receive",
          method: "post",
          data: {
            tokenString,
            oid,
          },
        })
          .then((res) => {
            console.log(res);
            this.getfindOrder(tokenString, status);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return;
      }

        })
        .catch(() => {
          // on cancel
        })


    },
    //删除订单
    deleteOrder(oid, status) {
      //  console.log(oid);
      console.log(status);
      let tokenString = this.tokenString;
        this.$dialog.confirm({
        title: '删除订单',
        message: '是否确认删除订单？',
      confirmButtonColor: "#0c34ba",
      }).then(()=>{
      this.axios({
        url: "/removeOrder",
        method: "post",
        data: {
          tokenString,
          oid,
        },
      })
        .then((res) => {
          console.log(res);
          this.getfindOrder(tokenString, status);
        })
        .catch((err) => {
          console.log(err);
        });
        }).catch(()=>{

        })
    },
  },
  created() {
    let tokenString = sessionStorage.getItem("token");
    this.tokenString = tokenString;
    this.getfindOrder(tokenString, 0);
  },
};
</script>

<style lang="less" scoped>
.myorder-main-top {
  height: 100px;
  width: 100%;
  background-color: #0c34ba;
}
.myorder-main-box {
  margin: 10px;
  position: relative;
  top: -35px;

  .myorder-status-box {
    overflow: hidden;
    border-radius: 12px 12px 0 0;
    .myorder-status-item {
      margin-top: 10px;
      background-color: #fff;
      margin-bottom: 10px;
      .myorder-item-top {
        display: flex;

        .myorder-item-book {
          flex: 1;
          padding: 10px;
          font-size: 13px;
          align-items: center;
        }
        .myorder-item-status {
          padding: 10px;
        }
        .myorder-item-del {
          padding: 10px;
          align-self: center;
        }
      }
      .myorder-item-bottom {
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
    }
  }
}
/deep/.van-card {
  background-color: #fff;
}
/deep/
.van-card__price{
  color:#0c34ba ;
}
</style>