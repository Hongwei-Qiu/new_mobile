(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/saleman/user/qrcode"],{"16e2":function(t,e,n){"use strict";(function(t){n("df48");a(n("66fd"));var e=a(n("f272"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"222f":function(t,e,n){"use strict";var a=n("ac59"),u=n.n(a);u.a},3452:function(t,e,n){"use strict";n.r(e);var a=n("c03b"),u=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=u.a},"3b1a":function(t,e,n){"use strict";var a={uniNavBar:function(){return n.e("components/uni-nav-bar/uni-nav-bar").then(n.bind(null,"42d9"))}},u=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))},ac59:function(t,e,n){},c03b:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("fa94")),u=r(n("7fee"));function r(t){return t&&t.__esModule?t:{default:t}}var o=getApp().globalData,c=o.navBar,f=o.appid,i=o.appsecret,d={data:function(){return{navBar:c,qrCodeInfo:{}}},methods:{goPage:function(){t.navigateBack({delta:1})},getQrCode:function(){var e=this,n=t.getStorageSync("qrCodeId"),r=Math.round((new Date).getTime()/1e3),o={appid:f,timeStamp:r},c=a.default.hexMD5(u.default.objKeySort(o)+i),d=Object.assign({sign:c,id:n},o);u.default.getRequests("saleQrcode",d,(function(t){var n=t.data;200==n.code?e.qrCodeInfo=n.data:u.default.Toast(n.msg)}))}},onShow:function(){this.getQrCode()}};e.default=d}).call(this,n("543d")["default"])},f272:function(t,e,n){"use strict";n.r(e);var a=n("3b1a"),u=n("3452");for(var r in u)"default"!==r&&function(t){n.d(e,t,(function(){return u[t]}))}(r);n("222f");var o,c=n("f0c5"),f=Object(c["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=f.exports}},[["16e2","common/runtime","common/vendor"]]]);