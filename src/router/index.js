import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),

    //二级路由
    children: [
      {
        path: 'home',
        //别名
        alias: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue'),
      },
      {
        path: 'shopbag',
        name: 'Shopbag',
        component: () => import('../views/Shopbag.vue'),
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('../views/My.vue'),
      }
    ]
  },

  {
    path: '/detail/:pid',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/clearing',
    name: 'Clearing',
    component: () => import('../views/Clearing.vue'),
  },
  {
    path: '/addresslist',
    name: 'AddressList',
    component: () => import('../views/AddressList.vue'),
  },
  {
    path: '/addregion',
    name: 'AddRegion',
    component: () => import('../views/AddRegion.vue'),
  },
  {
    path: '/editaddress',
    name: 'EditAddress',
    component: () => import('../views/EditAddress.vue'),
  },
  {
    path: '/myorder',
    name: 'MyOrder',
    component: () => import('../views/MyOrder.vue'),
  },
  {
    path: '/personaldata',
    name: 'PersonalData',
    component: () => import('../views/PersonalData.vue'),
  },
  {
    path: '/safetycenter',
    name: 'SafetyCenter',
    component: () => import('../views/SafetyCenter.vue'),
  },
  {
    path: '/myfavorite',
    name: 'MyFavorite',
    component: () => import('../views/MyFavorite.vue'),
  },
  {
    path: '/forgetpage',
    name: 'ForgetPage',
    component: () => import('../views/ForgetPage.vue'),
  },
  {
    path: '/findpage',
    name: 'FindPage',
    component: () => import('../views/FindPage.vue'),
  }


  
]

const router = new VueRouter({
  routes
})

export default router
