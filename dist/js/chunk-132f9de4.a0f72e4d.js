(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-132f9de4"],{"205d":function(t,e,s){"use strict";s("79a0")},5233:function(t,e,s){},"678d":function(t,e,s){"use strict";s("5233")},"79a0":function(t,e,s){},"9a0b":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"menu"},[s("div",{staticClass:"seach-box"},[s("van-search",{attrs:{shape:"round",placeholder:"请输入搜索关键词"},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}})],1),s("div",{staticClass:"menu-box"},[s("div",{staticClass:"menu-list"},t._l(t.menuList,(function(e,n){return s("div",{key:n,staticClass:"menu-list-item",class:{active:t.activeIndex===n},on:{click:function(s){return t.toggleMenuList(n,e.type)}}},[t._v(t._s(e.typeDesc))])})),0),s("div",{staticClass:"menu-content"},[s("div",{staticClass:"menu-products"},t._l(t.products,(function(e,n){return s("div",{key:n,staticClass:"menu-pro",on:{click:function(s){return t.viewDetail(e.pid)}}},[s("Product",{attrs:{pro:e}})],1)})),0)])])])},a=[],c=s("be6f"),i={name:"Menu",data:function(){return{searchValue:"",activeIndex:0,menuList:[],products:[]}},components:{Product:c["a"]},created:function(){this.getProductType()},methods:{getProductType:function(){var t=this;this.axios({method:"get",url:"/type"}).then((function(e){console.log("getProductType res ==> ",e),400===e.data.code&&(e.data.result.unshift({type:"isHot",typeDesc:"热卖推荐"}),t.menuList=e.data.result,t.getProductByType(e.data.result[t.activeIndex].type))})).catch((function(t){console.log("err ==> ",t)}))},getProductByType:function(t){var e=this,s="",n="";"isHot"===t?(s="isHot",n=1):(s="type",n=t),this.axios({method:"get",url:"/typeProducts",params:{key:s,value:n}}).then((function(t){console.log("getProductByType res ==> ",t),500===t.data.code&&(e.products=t.data.result)})).catch((function(t){console.log("err ==> ",t)}))},toggleMenuList:function(t,e){this.activeIndex!==t&&(this.activeIndex=t,this.getProductByType(e))},viewDetail:function(t){this.$router.push({name:"Detail",params:{pid:t}})}}},o=i,u=(s("205d"),s("2877")),r=Object(u["a"])(o,n,a,!1,null,"4054a99c",null);e["default"]=r.exports},be6f:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"product"},[s("div",{staticClass:"product-img"},[s("img",{staticClass:"auto-img",attrs:{src:t.pro.smallImg,alt:""}})]),s("div",{staticClass:"product-zhname one-text"},[t._v(t._s(t.pro.name))]),s("div",{staticClass:"product-enname one-text"},[t._v(t._s(t.pro.enname))]),s("div",{staticClass:"product-price"},[t._v("¥"+t._s(t.pro.price)+" "),t._t("del")],2)])},a=[],c={name:"Product",props:{pro:{type:Object,default:function(){return{}}}}},i=c,o=(s("678d"),s("2877")),u=Object(o["a"])(i,n,a,!1,null,"1800df97",null);e["a"]=u.exports}}]);
//# sourceMappingURL=chunk-132f9de4.a0f72e4d.js.map