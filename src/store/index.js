import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      //购物袋数量
    shopBagCount:0
  },
  mutations: {
 
  //购物袋数量
  badgeValue(state,value){
    state.shopBagCount = value;
  }
    
  },
  actions: {
  },
  modules: {
  }
})
