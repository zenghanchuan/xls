(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/clerk/clerk"],{"24e1":function(t,e,a){"use strict";var n=a("bb35"),i=a.n(n);i.a},"5f71":function(t,e,a){"use strict";var n,i=function(){var t=this,e=t.$createElement,a=(t._self._c,t.__map(t.userInfo,function(e,a){var n=e.time_arrive.slice(0,10);return{$orig:t.__get_orig(e),g0:n}}));t.$mp.data=Object.assign({},{$root:{l0:a}})},o=[];a.d(e,"b",function(){return i}),a.d(e,"c",function(){return o}),a.d(e,"a",function(){return n})},"95b5":function(t,e,a){"use strict";a.r(e);var n=a("a422"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);e["default"]=i.a},a422:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("7ab7"));function i(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){var t=n.default.getDate({format:!0});return{array:["新客","回头客","会员","工作人员","黑名单"],index2:0,objectArray2:["全部","本周","本月","本季度","本年"],dateExhibition:"全部",date:t,changeDate:"",index:0,userInfo:[{age:12,sex:"男",shop_id:0,typeName:"新客",app_id:50,shop:{name:"环球一店"},face_id:2,type:0,face:{image:"../../static/img/qq.png"},id:0x75828fc840000,create_time:"2019-12-31T06:23:43Z",device:null,gender:1,device_id:"02"},{age:10,sex:"男",shop_id:0,typeName:"新客",app_id:50,shop:{name:"环球二店"},face_id:1,type:0,face:{image:"../../static/img/qq.png"},id:0x758059d500000,create_time:"2019-12-31T02:20:44Z",device:null,gender:0,device_id:"50"}],selectType:"类型",typeNum:"",page:1,totalPage:"",totalCount:""}},computed:{startDate:function(){return n.default.getDate("start")},endDate:function(){return n.default.getDate("end")}},onLoad:function(){this.faceData(),this.getTotCount()},onPullDownRefresh:function(){this.page=1,this.getList(),setTimeout(function(){t.stopPullDownRefresh()},1e3)},stopPullDownRefresh:function(){},methods:{bindPickerChange:function(t){var e=this;this.index=t.target.value,this.selectType=this.array[this.index],"新客"==e.selectType?e.typeNum=0:"回头客"==e.selectType?e.typeNum=1:"会员"==e.selectType?e.typeNum=2:"工作人员"==e.selectType?e.typeNum=3:"黑名单"==e.selectType&&(e.typeNum=4),this.userInfo=[],this.page=1,this.faceData(),this.getTotCount()},bindDateChange:function(t){var e=this;this.index2=t.target.value,this.dateExhibition=this.objectArray2[this.index2],"全部"==this.dateExhibition?e.changeDate="":"本周"==this.dateExhibition?e.changeDate=n.default.weekLast():"本月"==this.dateExhibition?e.changeDate=n.default.monthThis():"本季度"==this.dateExhibition?e.changeDate=n.default.quarterThis():"本年"==this.dateExhibition&&(e.changeDate=n.default.yearThis()),this.userInfo=[],this.page=1,this.faceData(),this.getTotCount()},faceData:function(){var e=this;this.xlsAjax({url:this.$store.state.url+"/"+t.getStorageSync("baseUrl")+"/api/face/all",data:{type:e.typeNum,"order-":"log_time>","sign-":"image","link-":"tag","range-log_time":e.changeDate},method:"GET",success:function(a){if(200==a.statusCode){if(!a.data[0])return t.showToast({icon:"none",title:"查询结果无数据"}),void(e.userInfo=[]);for(var i=a.data,o=0;o<i.length;o++){var s=i[o].log_time;0==i[o].type?Object.assign(i[o],{typeName:"新客"}):1==i[o].type?Object.assign(i[o],{typeName:"回头客"}):2==i[o].type?Object.assign(i[o],{typeName:"会员"}):3==i[o].type?Object.assign(i[o],{typeName:"工作人员"}):4==i[o].type&&Object.assign(i[o],{typeName:"黑名单"});for(var r=0;r<i[o].tag.length;r++)i[o].tag[r].name&&Object.assign(i[o],{tagName:i[o].tag[r].name});Object.assign(i[o],{time_arrive:n.default.fermitTime(s)})}e.userInfo=i}},fail:function(t){console.log(t)}})},onchangePersonal:function(e){getApp().globalData.clerkData=[],getApp().globalData.userData=[],getApp().globalData.clerkData=this.userInfo[e],this.userInfo[e]&&t.navigateTo({url:"/pages/edit/edit"})},onNavigationBarButtonTap:function(e){this.xlsAjax({url:this.$store.state.url+"/"+t.getStorageSync("baseUrl")+"/api/user/logout",data:{},method:"POST",success:function(e){200==e.statusCode?(t.clearStorage(),t.navigateTo({url:"/pages/login/login"})):t.showToast({icon:"none",title:"网络错误"})},fail:function(t){console.log(t)}})},getTotCount:function(){var e=this;this.xlsAjax({url:this.$store.state.url+"/"+t.getStorageSync("baseUrl")+"/api/face/cnt",data:{type:e.typeNum,"order-":"log_time>","sign-":"image","link-":"tag","range-log_time":e.changeDate},method:"GET",success:function(t){200==t.statusCode&&(console.log(t),e.totalCount=t.data,e.totalCount%10===0?e.totalPage=parseInt(e.totalCount/10):e.totalPage=parseInt(e.totalCount/10)+1)},fail:function(t){console.log(t)}})},getList:function(){var e=this;this.xlsAjax({url:this.$store.state.url+"/"+t.getStorageSync("baseUrl")+"/api/face/all",data:{"page-":e.page,type:e.typeNum,"order-":"log_time>","sign-":"image","link-":"tag","range-log_time":e.changeDate},method:"GET",success:function(t){if(200==t.statusCode&&(console.log(t),t.data[0])){for(var a=t.data,i=0;i<a.length;i++){var o=a[i].log_time;0==a[i].type?Object.assign(a[i],{typeName:"新客"}):1==a[i].type?Object.assign(a[i],{typeName:"回头客"}):2==a[i].type?Object.assign(a[i],{typeName:"会员"}):3==a[i].type?Object.assign(a[i],{typeName:"工作人员"}):4==a[i].type?Object.assign(a[i],{typeName:"黑名单"}):0==a[i].gender?Object.assign(a[i],{sex:"女"}):1==a[i].gender&&Object.assign(a[i],{sex:"男"}),Object.assign(a[i],{time_arrive:n.default.fermitTime(o)})}1==e.page?e.userInfo=a:e.userInfo=e.userInfo.concat(a)}},fail:function(t){console.log(t)}})}},onReachBottom:function(){this.page>=this.totalPage?t.showToast({icon:"none",title:"没有更多内容了"}):(this.page++,this.getList())}};e.default=o}).call(this,a("543d")["default"])},b776:function(t,e,a){"use strict";a.r(e);var n=a("5f71"),i=a("95b5");for(var o in i)"default"!==o&&function(t){a.d(e,t,function(){return i[t]})}(o);a("24e1");var s,r=a("f0c5"),c=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=c.exports},bb35:function(t,e,a){},fee3:function(t,e,a){"use strict";(function(t){a("36f6"),a("921b");n(a("66fd"));var e=n(a("b776"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])}},[["fee3","common/runtime","common/vendor"]]]);