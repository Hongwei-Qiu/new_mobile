(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-caigou-user-user"],{"0a6a":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"tabbar"},[n("v-uni-view",{staticClass:"list"},[n("v-uni-view",{staticClass:"item"},t._l(t.userList,(function(e,a){return n("v-uni-view",{key:a,class:t.tabarIndex==a?"color":"incolor",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.pageUrl(e,a)}}},[n("v-uni-view",{class:"iconfont "+e.icon}),n("v-uni-view",{staticClass:"name"},[t._v(t._s(e.name))])],1)})),1)],1)],1)},o=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))},"1abe":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:["tabarIndex"],data:function(){return{userList:[{icon:"iconindex",name:"首页",url:"/pages/caigou/index/index"},{icon:"iconcart",name:"采购",url:"/pages/caigou/purchase/purchase"},{icon:"iconhedui",name:"采购单",url:"/pages/caigou/purchaseNote/purchaseNote"},{icon:"iconxunjia",name:"询价",url:"/pages/caigou/enquiry/enquiry"},{icon:"iconUserpersonalinform",name:"我的",url:"/pages/caigou/user/user"}]}},created:function(t){},methods:{pageUrl:function(t,e){getApp().globalData.isReload=!0,uni.reLaunch({url:t.url})}}};e.default=a},"21a8":function(t,e,n){"use strict";var a=n("abbd"),i=n.n(a);i.a},2742:function(t,e,n){"use strict";n.r(e);var a=n("0a6a"),i=n("f062");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("21a8");var c,u=n("f0c5"),r=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,"097cc13e",null,!1,a["a"],c);e["default"]=r.exports},2839:function(t,e,n){"use strict";n.r(e);var a=n("f8bf"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},3516:function(t,e,n){var a=n("9b08");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("71b8c07f",a,!0,{sourceMap:!1,shadowMode:!1})},"43a2":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"caigou_index"},[n("v-uni-view",{staticClass:"status_bar"}),n("v-uni-view",{staticClass:"user"},[n("v-uni-view",{staticClass:"top flex flex_align_center"},[n("v-uni-view",{staticClass:"logo"},[t._v("个人中心")]),n("v-uni-view",[n("v-uni-view",{staticClass:"nickname"},[t._v(t._s(t.mineData.name))]),n("v-uni-view",{staticClass:"phone"},[t._v("手机："+t._s(t.mineData.mobile))])],1)],1),n("v-uni-view",{staticClass:"list"},t._l(t.userList,(function(e){return n("v-uni-view",{staticClass:"item flex flex_between",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.toPage(e)}}},[n("v-uni-view",{staticClass:"left"},[n("v-uni-text",{class:"iconfont "+e.icon}),n("v-uni-text",[t._v(t._s(e.name))])],1),n("v-uni-view",{staticClass:"right"},[n("v-uni-text",{staticClass:"iconfont iconyou"})],1)],1)})),1)],1),n("tabar",{attrs:{tabarIndex:t.tabNum}})],1)},o=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))},"4f8d":function(t,e,n){"use strict";n.r(e);var a=n("43a2"),i=n("2839");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("a4d2");var c,u=n("f0c5"),r=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,"1c5eb544",null,!1,a["a"],c);e["default"]=r.exports},"7fee":function(t,e,n){n("4160"),n("4e82"),n("b64b"),n("d3b7"),n("25f0"),n("159b");var a=getApp(),i=a.globalData.rootUrl+"/mobileAdmin/";if(uni.getStorageSync("token"))var o={Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("token")};function c(){return Math.round((new Date).getTime()/1e3)}function u(t,e,n){uni.showLoading({title:"加载中...",duration:1e3,mask:!0,success:function(a){uni.request({url:i+t,method:"GET",header:{Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("token")},data:Object.assign(e),success:function(t){n(t),void 0!=t.header.authorization&&uni.setStorageSync("token",t.header.authorization),400==t.data.code&&uni.showToast({title:t.data.msg,icon:"none",duration:1e3,success:function(){}}),401==t.data.code&&uni.clearStorage({success:function(t){uni.navigateTo({url:"/pages/account/login"})}}),404==t.data.code&&uni.navigateTo({url:"/pages/account/404"}),uni.hideLoading()},fail:function(t){uni.showModal({title:t.data,content:"网络出错，请刷新重试",showCancel:!1})}})},fail:function(t){},complete:function(t){}})}function r(t,e,n){uni.request({url:i+t,method:"GET",header:{Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("token")},data:Object.assign(e),success:function(t){n(t),void 0!=t.header.authorization&&uni.setStorageSync("token",t.header.authorization),401==t.data.code&&uni.clearStorage({success:function(t){uni.navigateTo({url:"/pages/account/login"})}}),404==t.data.code&&uni.navigateTo({url:"/pages/account/404"}),408==t.data.code&&uni.navigateTo({url:"/pages/account/service"})},fail:function(t){uni.showModal({title:t.data,content:"网络出错，请刷新重试",showCancel:!1})}})}function s(t,e,n){uni.showLoading({title:"加载中",mask:!0,success:function(a){uni.request({url:i+t,method:"POST",header:{Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("token")},data:Object.assign(e),success:function(t){n(t),void 0!=t.header.authorization&&uni.setStorageSync("token",t.header.authorization),400==t.data.code&&uni.showToast({title:t.data.msg,icon:"none",duration:1e3,success:function(){}}),401==t.data.code&&uni.clearStorage({success:function(t){uni.navigateTo({url:"/pages/account/login"})}}),403==t.data.code&&uni.showToast({title:"账号已禁用",icon:"none",duration:1e3,success:function(){uni.clearStorage({success:function(t){uni.navigateTo({url:"/pages/account/login"})}})}}),404==t.data.code&&uni.navigateTo({url:"/pages/account/404"}),408==t.data.code&&uni.showToast({title:"抱歉，您的服务已到期，请联系《菜东家》工作人员续费！",icon:"none",duration:2e3}),uni.hideLoading()},fail:function(t){uni.showModal({title:"网络错误",content:"网络出错，请刷新重试",showCancel:!1})}})},fail:function(t){},complete:function(t){}})}function d(t,e,n){uni.request({url:i+t,method:"POST",header:{Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("token")},data:Object.assign(e),success:function(t){n(t),void 0!=t.header.authorization&&uni.setStorageSync("token",t.header.authorization),401==t.data.code&&uni.clearStorage({success:function(t){uni.navigateTo({url:"/pages/account/login"})}})},fail:function(t){uni.showModal({title:"网络错误",content:"网络出错，请刷新重试",showCancel:!1})}})}function f(t){for(var e=Object.keys(t).sort(),n={},a="",i=0;i<e.length;i++)n[e[i]]=t[e[i]];return Object.keys(n).forEach((function(t){a+="&"+t+"="+n[t]})),a.substr(1)}function l(t){uni.showToast({title:t,icon:"none",duration:1e3})}function g(){var t=new Date,e=t.getMonth(),n=++e,a=new Date(t.getFullYear(),n,1),i=864e5;return new Date(a.getTime()-i)}function p(){var t=new Date,e=t.getFullYear().toString(),n=(t.getMonth()+1).toString(),a="";a=n<10?"0"+n:n;t.getDate().toString();var i=g().getDate(),o=e+"-"+a+"-01",c=e+"-"+a+"-"+i,u=[o,c];return u}function h(t){return new Promise((function(e,n){window.init=function(){e(BMap)};var a=document.createElement("script");a.type="text/javascript",a.src="http://api.map.baidu.com/api?v=2.0&ak="+t+"&callback=init",a.onerror=n,document.head.appendChild(a)}))}t.exports={getRequest:u,getRequests:r,postRequest:s,postRequests:d,timeStamp:c,Toast:l,header:o,objKeySort:f,thedefaulttime:p,MP:h}},"9b08":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,"uni-page-body[data-v-1c5eb544]{background:#fff}.user .top[data-v-1c5eb544]{padding:%?50?% %?30?%;border-bottom:%?10?% solid #fbf8fb}.user .top .logo[data-v-1c5eb544]{width:%?90?%;height:%?90?%;background:rgba(3,169,142,.5);color:#fff;border-radius:50%;padding:%?10?%;font-size:%?32?%;text-align:center;margin-right:%?30?%}.user .top .nickname[data-v-1c5eb544]{margin-bottom:%?10?%}.user .top .phone[data-v-1c5eb544]{font-size:%?28?%;font-weight:400}.user .list[data-v-1c5eb544]{padding:%?20?% %?25?%}.user .list .item[data-v-1c5eb544]{font-size:%?28?%;font-weight:400;padding-bottom:%?25?%;border-bottom:1px solid #f0f0f0;margin-bottom:%?25?%}.user .list .item[data-v-1c5eb544]:last-child{border:none}.user .list .item .iconfont[data-v-1c5eb544]{font-size:%?28?%;font-weight:400;margin-right:%?20?%;color:#c2c2c2}.user .list .item .right .iconfont[data-v-1c5eb544]{font-size:%?28?%;font-weight:400;margin-right:%?20?%;color:#c2c2c2}body.?%PAGE?%[data-v-1c5eb544]{background:#fff}",""]),t.exports=e},a4d2:function(t,e,n){"use strict";var a=n("3516"),i=n.n(a);i.a},abbd:function(t,e,n){var a=n("c7a6");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("761df2e3",a,!0,{sourceMap:!1,shadowMode:!1})},baa5:function(t,e,n){var a=n("23e7"),i=n("e58c");a({target:"Array",proto:!0,forced:i!==[].lastIndexOf},{lastIndexOf:i})},c7a6:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".color[data-v-097cc13e]{color:#03a98d}.incolor[data-v-097cc13e]{color:#d5d5d5}.tabbar[data-v-097cc13e]{position:fixed;width:100%;bottom:0;left:0;background:#fffeff}.tabbar .list[data-v-097cc13e]{width:100%;font-size:%?28?%;text-align:center;padding:%?10?% 0}.tabbar .list .item[data-v-097cc13e]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around}.tabbar .list .item .iconfont[data-v-097cc13e]{font-size:%?40?%;margin-bottom:%?5?%}",""]),t.exports=e},f062:function(t,e,n){"use strict";n.r(e);var a=n("1abe"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},f8bf:function(t,e,n){"use strict";var a=n("ee27");n("c975"),n("baa5"),n("ac1f"),n("841c"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("fa94")),o=a(n("7fee")),c=a(n("2742")),u=getApp().globalData,r=u.navBar,s=u.appid,d=u.appsecret,f={components:{tabar:c.default},data:function(){return{navBar:r,tabNum:4,mineData:"",token:"",userinfo:"",userList:[{icon:"iconmima",name:"修改密码",url:"/pages/caigou/user/forget"},{icon:"iconwenti",name:"常见问题",url:"/pages/caigou/user/issue"},{icon:"iconwodezhangdan",name:"各月账单",url:"/pages/caigou/user/bill"},{icon:"icontuihuo",name:"退货单",url:"/pages/caigou/user/refund"},{icon:"iconbangdingweixin",url:"bindWeChat",name:"绑定微信"},{icon:"icontuichudenglu",name:"退出登录"}]}},methods:{toPage:function(t){if("退出登录"==t.name){uni.showModal({content:"是否退出登录？",cancelText:"取消",cancelColor:"#999",confirmText:"确认",confirmColor:"#04A98E",success:function(t){if(t.confirm){var e=Math.round((new Date).getTime()/1e3),n={appid:s,timeStamp:e},a=i.default.hexMD5(o.default.objKeySort(n)+d),c={appid:s,timeStamp:e,sign:a};o.default.getRequests("logout",c,(function(t){200==t.data.code?(o.default.Toast(t.data.data),setTimeout((function(){uni.clearStorage({success:function(t){uni.navigateTo({url:"/pages/account/login"})}})}),1e3)):o.default.Toast(t.data.msg)}))}else t.cancel}})}else"bindWeChat"==t.url?this.adminisus_weixin():uni.navigateTo({url:t.url})},mine:function(){var t=this,e=Math.round((new Date).getTime()/1e3),n={appid:s,timeStamp:e},a=i.default.hexMD5(o.default.objKeySort(n)+d),c={appid:s,timeStamp:e,sign:a};o.default.getRequests("mine",c,(function(e){200==e.data.code?t.mineData=e.data.data:o.default.Toast(e.data.msg)}))},adminisus_weixin:function(){var t=this;uni.showModal({content:1==this.is_bind?"是否微信改绑":"是否绑定微信",cancelText:"取消",cancelColor:"#999",confirmText:"确认",confirmColor:"#DEC17C",success:function(e){if(e.confirm){uni.setStorageSync("isWeixin",!0);var n=location.search,a=n.substring(n.indexOf("=")+1,n.lastIndexOf("&"));if(!a){var i=window.location.href,o=encodeURIComponent(i),c="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+t.userinfo.appId+"&redirect_uri="+o+"&response_type=code&scope=snsapi_userinfo#wechat_redirect";window.location.href=c}}else e.cancel}})},wxConfig:function(){var t=this;if(this.token){var e=Math.round((new Date).getTime()/1e3),n={appid:s,timeStamp:e},a=i.default.hexMD5(o.default.objKeySort(n)+d),c={appid:s,type:1,timeStamp:e,sign:a};o.default.getRequests("wxParams",c,(function(e){200==e.data.code&&(t.userinfo=e.data.data)}))}}},onShow:function(){var t=this;this.token=uni.getStorageSync("token"),t.mine(),t.wxConfig();var e=location.search,n=e.substring(e.indexOf("=")+1,e.lastIndexOf("&")),a=uni.getStorageSync("isWeixin");if(a&&n){var c=Math.round((new Date).getTime()/1e3),r={appid:s,timeStamp:c,code:n},f=i.default.hexMD5(o.default.objKeySort(r)+d),l={appid:s,code:n,timeStamp:c,sign:f};o.default.postRequests("buyerBind",l,(function(t){uni.clearStorageSync("isWeixin"),n="",200==t.data.code?(o.default.Toast("绑定微信成功"),setTimeout((function(){uni.clearStorage({success:function(t){window.location.href=u.rootUrl+"/Mobile#/pages/caigou/user/user"}})}),1e3)):o.default.Toast(t.data.msg)}))}}};e.default=f},fa94:function(t,e,n){n("d3b7"),n("ac1f"),n("25f0"),n("5319");var a=function(t,e){return t<<e|t>>>32-e},i=function(t,e){var n,a,i,o,c;return i=2147483648&t,o=2147483648&e,n=1073741824&t,a=1073741824&e,c=(1073741823&t)+(1073741823&e),n&a?2147483648^c^i^o:n|a?1073741824&c?3221225472^c^i^o:1073741824^c^i^o:c^i^o},o=function(t,e,n){return t&e|~t&n},c=function(t,e,n){return t&n|e&~n},u=function(t,e,n){return t^e^n},r=function(t,e,n){return e^(t|~n)},s=function(t,e,n,c,u,r,s){return t=i(t,i(i(o(e,n,c),u),s)),i(a(t,r),e)},d=function(t,e,n,o,u,r,s){return t=i(t,i(i(c(e,n,o),u),s)),i(a(t,r),e)},f=function(t,e,n,o,c,r,s){return t=i(t,i(i(u(e,n,o),c),s)),i(a(t,r),e)},l=function(t,e,n,o,c,u,s){return t=i(t,i(i(r(e,n,o),c),s)),i(a(t,u),e)},g=function(t){var e,n=t.length,a=n+8,i=(a-a%64)/64,o=16*(i+1),c=Array(o-1),u=0,r=0;while(r<n)e=(r-r%4)/4,u=r%4*8,c[e]=c[e]|t.charCodeAt(r)<<u,r++;return e=(r-r%4)/4,u=r%4*8,c[e]=c[e]|128<<u,c[o-2]=n<<3,c[o-1]=n>>>29,c},p=function(t){var e,n,a="",i="";for(n=0;n<=3;n++)e=t>>>8*n&255,i="0"+e.toString(16),a+=i.substr(i.length-2,2);return a},h=function(t){t=t.replace(/\x0d\x0a/g,"\n");for(var e="",n=0;n<t.length;n++){var a=t.charCodeAt(n);a<128?e+=String.fromCharCode(a):a>127&&a<2048?(e+=String.fromCharCode(a>>6|192),e+=String.fromCharCode(63&a|128)):(e+=String.fromCharCode(a>>12|224),e+=String.fromCharCode(a>>6&63|128),e+=String.fromCharCode(63&a|128))}return e};function v(t){var e,n,a,o,c,u,r,v,m,b=Array(),w=7,S=12,x=17,y=22,C=5,T=9,k=14,_=20,j=4,M=11,D=16,z=23,A=6,O=10,q=15,E=21;for(t=h(t),b=g(t),u=1732584193,r=4023233417,v=2562383102,m=271733878,e=0;e<b.length;e+=16)n=u,a=r,o=v,c=m,u=s(u,r,v,m,b[e+0],w,3614090360),m=s(m,u,r,v,b[e+1],S,3905402710),v=s(v,m,u,r,b[e+2],x,606105819),r=s(r,v,m,u,b[e+3],y,3250441966),u=s(u,r,v,m,b[e+4],w,4118548399),m=s(m,u,r,v,b[e+5],S,1200080426),v=s(v,m,u,r,b[e+6],x,2821735955),r=s(r,v,m,u,b[e+7],y,4249261313),u=s(u,r,v,m,b[e+8],w,1770035416),m=s(m,u,r,v,b[e+9],S,2336552879),v=s(v,m,u,r,b[e+10],x,4294925233),r=s(r,v,m,u,b[e+11],y,2304563134),u=s(u,r,v,m,b[e+12],w,1804603682),m=s(m,u,r,v,b[e+13],S,4254626195),v=s(v,m,u,r,b[e+14],x,2792965006),r=s(r,v,m,u,b[e+15],y,1236535329),u=d(u,r,v,m,b[e+1],C,4129170786),m=d(m,u,r,v,b[e+6],T,3225465664),v=d(v,m,u,r,b[e+11],k,643717713),r=d(r,v,m,u,b[e+0],_,3921069994),u=d(u,r,v,m,b[e+5],C,3593408605),m=d(m,u,r,v,b[e+10],T,38016083),v=d(v,m,u,r,b[e+15],k,3634488961),r=d(r,v,m,u,b[e+4],_,3889429448),u=d(u,r,v,m,b[e+9],C,568446438),m=d(m,u,r,v,b[e+14],T,3275163606),v=d(v,m,u,r,b[e+3],k,4107603335),r=d(r,v,m,u,b[e+8],_,1163531501),u=d(u,r,v,m,b[e+13],C,2850285829),m=d(m,u,r,v,b[e+2],T,4243563512),v=d(v,m,u,r,b[e+7],k,1735328473),r=d(r,v,m,u,b[e+12],_,2368359562),u=f(u,r,v,m,b[e+5],j,4294588738),m=f(m,u,r,v,b[e+8],M,2272392833),v=f(v,m,u,r,b[e+11],D,1839030562),r=f(r,v,m,u,b[e+14],z,4259657740),u=f(u,r,v,m,b[e+1],j,2763975236),m=f(m,u,r,v,b[e+4],M,1272893353),v=f(v,m,u,r,b[e+7],D,4139469664),r=f(r,v,m,u,b[e+10],z,3200236656),u=f(u,r,v,m,b[e+13],j,681279174),m=f(m,u,r,v,b[e+0],M,3936430074),v=f(v,m,u,r,b[e+3],D,3572445317),r=f(r,v,m,u,b[e+6],z,76029189),u=f(u,r,v,m,b[e+9],j,3654602809),m=f(m,u,r,v,b[e+12],M,3873151461),v=f(v,m,u,r,b[e+15],D,530742520),r=f(r,v,m,u,b[e+2],z,3299628645),u=l(u,r,v,m,b[e+0],A,4096336452),m=l(m,u,r,v,b[e+7],O,1126891415),v=l(v,m,u,r,b[e+14],q,2878612391),r=l(r,v,m,u,b[e+5],E,4237533241),u=l(u,r,v,m,b[e+12],A,1700485571),m=l(m,u,r,v,b[e+3],O,2399980690),v=l(v,m,u,r,b[e+10],q,4293915773),r=l(r,v,m,u,b[e+1],E,2240044497),u=l(u,r,v,m,b[e+8],A,1873313359),m=l(m,u,r,v,b[e+15],O,4264355552),v=l(v,m,u,r,b[e+6],q,2734768916),r=l(r,v,m,u,b[e+13],E,1309151649),u=l(u,r,v,m,b[e+4],A,4149444226),m=l(m,u,r,v,b[e+11],O,3174756917),v=l(v,m,u,r,b[e+2],q,718787259),r=l(r,v,m,u,b[e+9],E,3951481745),u=i(u,n),r=i(r,a),v=i(v,o),m=i(m,c);var L=p(u)+p(r)+p(v)+p(m);return L.toLowerCase()}t.exports={hexMD5:v}}}]);