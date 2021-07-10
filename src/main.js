import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'
import dayjs from 'dayjs'
import {validateTokenUrls} from '../src/assets/js/url.js'

//从vant导入组件
import {
  Tabbar,
  TabbarItem,
  Search,
  Toast,
  NavBar,
  Stepper,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Form,
  Field ,
  Button,
  Swipe,
  SwipeItem,
  Empty,
  Checkbox,
    // 滑动单元格
    SwipeCell,
      // 提交订单栏
  SubmitBar,
  Icon,
  Card,
  Popup,
  AddressList,
  AddressEdit ,
  Tab,
  Tabs,
  Cell, 
  CellGroup,
  Uploader,
  Dialog 

 

} from 'vant';
// import { config } from 'vue/types/umd'


Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Toast)
  .use(NavBar)
  .use(Stepper)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Form)
  .use(Field )
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Empty)
  .use(Icon)
  .use(Checkbox)
  .use(SwipeCell)
  .use(SubmitBar)
  .use(Card)
  .use(Popup)
  .use(AddressList)
  .use(AddressEdit)
  .use(Tab)
  .use(Tabs)
  .use(Cell)
  .use(CellGroup)
  .use(Uploader)
  .use(Dialog)
  
  

//设置请求路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'



// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么



  //发送请求之前，显示加载中
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  });

  //判断
  let appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

  let token = sessionStorage.getItem('token');

  if (config.method === 'post') {

    //进行post请求参数序列化
    config.data = config.data || {};
    let dataString = '';
    for (let key in config.data) {
      dataString += `${key}=${config.data[key]}&`
    }

    config.data = dataString + 'appkey=' + appkey;

    //找到需要验证的token
    if(validateTokenUrls.indexOf(config.url)>-1){
      config.data += `&tokenString=${token}`;
    }

  } else if (config.method === 'get') {
    config.params = config.params || {};
    config.params.appkey = appkey;
        //找到需要验证的token
  if(validateTokenUrls.indexOf(config.url)>-1){
          config.params.tokenString = token;
        }
  }

  return config;
}, error => {
  // 对请求错误做些什么
  Toast.clear();
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  //服务器响应数据后,关闭加载提示
  Toast.clear();
  return response;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.prototype.dayjs = dayjs;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
