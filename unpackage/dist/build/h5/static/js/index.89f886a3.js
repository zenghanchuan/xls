(function(e){function n(n){for(var a,r,u=n[0],s=n[1],c=n[2],l=0,f=[];l<u.length;l++)r=u[l],o[r]&&f.push(o[r][0]),o[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);g&&g(n);while(f.length)f.shift()();return i.push.apply(i,c||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],a=!0,r=1;r<t.length;r++){var s=t[r];0!==o[s]&&(a=!1)}a&&(i.splice(n--,1),e=u(u.s=t[0]))}return e}var a={},o={index:0},i=[];function r(e){return u.p+"static/js/"+({"pages-clerk-clerk":"pages-clerk-clerk","pages-edit-edit":"pages-edit-edit","pages-login-login":"pages-login-login","pages-main-main":"pages-main-main","pages-reg-reg":"pages-reg-reg","pages-user-user":"pages-user-user"}[e]||e)+"."+{"pages-clerk-clerk":"1c5b64df","pages-edit-edit":"46e79e5f","pages-login-login":"72c0b2b8","pages-main-main":"3dbe74b1","pages-reg-reg":"6a963cea","pages-user-user":"d169bfbb"}[e]+".js"}function u(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.e=function(e){var n=[],t=o[e];if(0!==t)if(t)n.push(t[2]);else{var a=new Promise(function(n,a){t=o[e]=[n,a]});n.push(t[2]=a);var i,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=r(e),i=function(n){s.onerror=s.onload=null,clearTimeout(c);var t=o[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src,r=new Error("Loading chunk "+e+" failed.\n("+a+": "+i+")");r.type=a,r.request=i,t[1](r)}o[e]=void 0}};var c=setTimeout(function(){i({type:"timeout",target:s})},12e4);s.onerror=s.onload=i,document.head.appendChild(s)}return Promise.all(n)},u.m=e,u.c=a,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)u.d(t,a,function(n){return e[n]}.bind(null,a));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=n,s=s.slice();for(var l=0;l<s.length;l++)n(s[l]);var g=c;i.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("e677")},"0a3b":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={pages:{"pages/login/login":{navigationBarTitleText:"登录"},"pages/main/main":{navigationBarTitleText:"首页"},"pages/user/user":{navigationBarTitleText:"客流",enablePullDownRefresh:!0},"pages/reg/reg":{navigationBarTitleText:"注册"},"pages/edit/edit":{navigationBarTitleText:"编辑顾客页"},"pages/clerk/clerk":{navigationBarTitleText:"顾客",navigationBarTextStyle:"white",enablePullDownRefresh:!0,titleNView:{buttons:[{text:"退出  ",fontSize:"15px",float:"right"}]}}},globalStyle:{navigationBarTextStyle:"white",navigationBarBackgroundColor:"#00abfd",backgroundColor:"#fbf9fe"}};n.default=a},"36f6":function(e,n,t){"use strict";(function(e){var n=t("288e"),a=n(t("5176")),o=n(t("e143"));e["____859BC2C____"]=!0,delete e["____859BC2C____"],e.__uniConfig={tabBar:{color:"#7a7e83",selectedColor:"#0faeff",backgroundColor:"#ffffff",list:[{pagePath:"pages/main/main",text:"统计",iconPath:"static/img/home.png",selectedIconPath:"static/img/homeHL.png",redDot:!1,badge:""},{pagePath:"pages/user/user",text:"客流",iconPath:"static/img/user.png",selectedIconPath:"static/img/userHL.png",redDot:!1,badge:""},{pagePath:"pages/clerk/clerk",text:"顾客",iconPath:"static/img/home.png",selectedIconPath:"static/img/homeHL.png",redDot:!1,badge:""}],borderStyle:"black"},globalStyle:{navigationBarTextStyle:"white",navigationBarBackgroundColor:"#00abfd",backgroundColor:"#fbf9fe"}},e.__uniConfig.router={mode:"hash",base:"/"},e.__uniConfig["async"]={loading:"AsyncLoading",error:"AsyncError",delay:200,timeout:3e3},e.__uniConfig.debug=!1,e.__uniConfig.networkTimeout={request:6e3,connectSocket:6e3,uploadFile:6e3,downloadFile:6e3},e.__uniConfig.sdkConfigs={maps:{}},e.__uniConfig.qqMapKey="XVXBZ-NDMC4-JOGUS-XGIEE-QVHDZ-AMFV2",e.__uniConfig.nvue={"flex-direction":"column"},o.default.component("pages-login-login",function(e){var n={component:t.e("pages-login-login").then(function(){return e(t("1fce"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n}),o.default.component("pages-main-main",function(e){var n={component:t.e("pages-main-main").then(function(){return e(t("d74f"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n}),o.default.component("pages-user-user",function(e){var n={component:t.e("pages-user-user").then(function(){return e(t("6ded"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n}),o.default.component("pages-reg-reg",function(e){var n={component:t.e("pages-reg-reg").then(function(){return e(t("c011"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n}),o.default.component("pages-edit-edit",function(e){var n={component:t.e("pages-edit-edit").then(function(){return e(t("630d"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n}),o.default.component("pages-clerk-clerk",function(e){var n={component:t.e("pages-clerk-clerk").then(function(){return e(t("b776"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n}),e.__uniRoutes=[{path:"/",alias:"/pages/login/login",component:{render:function(e){return e("Page",{props:(0,a.default)({isQuit:!0,isEntry:!0},__uniConfig.globalStyle,{navigationBarTitleText:"登录"})},[e("pages-login-login",{slot:"page"})])}},meta:{id:1,name:"pages-login-login",isNVue:!1,pagePath:"pages/login/login",isQuit:!0,isEntry:!0,windowTop:44}},{path:"/pages/main/main",component:{render:function(e){return e("Page",{props:(0,a.default)({isQuit:!0,isTabBar:!0,tabBarIndex:0},__uniConfig.globalStyle,{navigationBarTitleText:"首页"})},[e("pages-main-main",{slot:"page"})])}},meta:{id:2,name:"pages-main-main",isNVue:!1,pagePath:"pages/main/main",isQuit:!0,isTabBar:!0,tabBarIndex:0,windowTop:44}},{path:"/pages/user/user",component:{render:function(e){return e("Page",{props:(0,a.default)({isQuit:!0,isTabBar:!0,tabBarIndex:1},__uniConfig.globalStyle,{navigationBarTitleText:"客流",enablePullDownRefresh:!0})},[e("pages-user-user",{slot:"page"})])}},meta:{id:3,name:"pages-user-user",isNVue:!1,pagePath:"pages/user/user",isQuit:!0,isTabBar:!0,tabBarIndex:1,windowTop:44}},{path:"/pages/reg/reg",component:{render:function(e){return e("Page",{props:(0,a.default)({},__uniConfig.globalStyle,{navigationBarTitleText:"注册"})},[e("pages-reg-reg",{slot:"page"})])}},meta:{name:"pages-reg-reg",isNVue:!1,pagePath:"pages/reg/reg",windowTop:44}},{path:"/pages/edit/edit",component:{render:function(e){return e("Page",{props:(0,a.default)({},__uniConfig.globalStyle,{navigationBarTitleText:"编辑顾客页"})},[e("pages-edit-edit",{slot:"page"})])}},meta:{name:"pages-edit-edit",isNVue:!1,pagePath:"pages/edit/edit",windowTop:44}},{path:"/pages/clerk/clerk",component:{render:function(e){return e("Page",{props:(0,a.default)({isQuit:!0,isTabBar:!0,tabBarIndex:2},__uniConfig.globalStyle,{navigationBarTitleText:"顾客",navigationBarTextStyle:"white",enablePullDownRefresh:!0,titleNView:{buttons:[{text:"退出  ",fontSize:"15px",float:"right"}]}})},[e("pages-clerk-clerk",{slot:"page"})])}},meta:{id:4,name:"pages-clerk-clerk",isNVue:!1,pagePath:"pages/clerk/clerk",isQuit:!0,isTabBar:!0,tabBarIndex:2,windowTop:44}},{path:"/preview-image",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-preview-image",{slot:"page"})])}},meta:{name:"preview-image",pagePath:"/preview-image"}},{path:"/choose-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-choose-location",{slot:"page"})])}},meta:{name:"choose-location",pagePath:"/choose-location"}},{path:"/open-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-open-location",{slot:"page"})])}},meta:{name:"open-location",pagePath:"/open-location"}}]}).call(this,t("c8ba"))},"5b56":function(e,n,t){"use strict";t.r(n);var a=t("936c"),o=t.n(a);for(var i in a)"default"!==i&&function(e){t.d(n,e,function(){return a[e]})}(i);n["default"]=o.a},"6c59":function(e,n,t){"use strict";t.r(n);var a=t("d84b"),o=t("5b56");for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);var r,u=t("f0c5"),s=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);n["default"]=s.exports},"70f7":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={appid:"__UNI__859BC2C"};n.default=a},"936c":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={globalData:{token:"",baseUrl:"0",userData:{},clerkData:{}},onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};n.default=a},ce2c:function(e,n,t){"use strict";var a=t("288e");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t("e143")),i=a(t("2f62"));o.default.use(i.default);var r=new i.default.Store({state:{forcedLogin:!1,hasLogin:!1,userName:"",url:"https://huizhike.cn",baseUrl:"/0"},mutations:{login:function(e,n){e.userName=n||"新用户",e.hasLogin=!0},logout:function(e){e.userName="",e.hasLogin=!1},setbaseUrl:function(e,n){n.hasOwnProperty("baseUrl")&&(e.baseUrl=n.baseUrl)}}}),u=r;n.default=u},d84b:function(e,n,t){"use strict";var a,o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("App",{attrs:{keepAliveInclude:e.keepAliveInclude}})},i=[];t.d(n,"b",function(){return o}),t.d(n,"c",function(){return i}),t.d(n,"a",function(){return a})},e677:function(e,n,t){"use strict";var a=t("288e"),o=a(t("cebc"));t("cadf"),t("551c"),t("097d"),t("36f6"),t("1c31"),t("921b");var i=a(t("e143")),r=a(t("6c59")),u=a(t("ce2c"));i.default.config.productionTip=!1,i.default.prototype.$store=u.default,i.default.prototype.xlsAjax=function(e,n,t){var a=e.url,o=e.method,i={},r=e.data||{},u="";u=uni.getStorageSync("session_id"),o?(o=o.toUpperCase(),i="POST"==o?{"content-type":"application/x-www-form-urlencoded",session_id:u}:{"content-type":"application/json",session_id:u}):(o="GET",i={"content-type":"application/json",session_id:u}),e.hideLoading||uni.showLoading({title:"加载中..."}),uni.request({url:a,method:o,header:i,data:r,success:function(n){"function"==typeof e.success&&e.success(n)},fail:function(n){console.log(n),"function"==typeof e.fail&&e.fail(n.data)},complete:function(){uni.hideLoading(),"function"==typeof e.complete&&e.complete()}})},r.default.mpType="app";var s=new i.default((0,o.default)({store:u.default},r.default));s.$mount()}});