(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{4123:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(a("7ab7"));function s(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){n.default.getDate({format:!0});return{index:0,date:"日期",changeDate:"",objectArray:["中国"],shopArray:[],selctShopid:"",shopName:"门店",userInfo:[],selectorPersonal:"",page:1,totalPage:"",totalCount:""}},computed:{startDate:function(){return n.default.getDate("start")},endDate:function(){return n.default.getDate("end")}},onLoad:function(){this.shopData(),this.faceData(),this.getTotCount()},onPullDownRefresh:function(){this.page=1,this.getList(),setTimeout(function(){t.stopPullDownRefresh()},1e3)},stopPullDownRefresh:function(){},methods:{bindPickerChange:function(t){this.index=t.target.value,this.selctShopid=this.shopArray[this.index].id,this.shopName=this.objectArray[this.index],this.userInfo=[],this.page=1,this.faceData(),this.getTotCount()},bindDateChange:function(t){this.date=t.target.value,this.changeDate=t.target.value,this.changeDate=t.target.value+"~"+n.default.singleDay(this.changeDate),this.userInfo=[],this.page=1,this.date&&this.faceData(),this.getTotCount()},shopData:function(){var e=this;this.xlsAjax({url:this.$store.state.url+"/"+t.getStorageSync("baseUrl")+"/api/shop/all-name",data:{},method:"GET",success:function(t){if(e.shopArray=t.data,200==t.statusCode){if(!t.data[0])return;e.shopArray=t.data,e.objectArray=[];for(var a=0;a<t.data.length;a++)e.objectArray.push(t.data[a].name)}},fail:function(t){console.log(t)}})},faceData:function(){var e=this;this.xlsAjax({url:this.$store.state.url+"/"+t.getStorageSync("baseUrl")+"/api/facelog/alls",data:{"sign-":"face.image",shop_id:e.selctShopid,"range-create_time":e.changeDate},method:"GET",success:function(a){if(200==a.statusCode){if(!a.data[0])return t.showToast({icon:"none",title:"查询结果无数据"}),void(e.userInfo=[]);for(var s=a.data,o=0;o<s.length;o++){var i=s[o].create_time;0==s[o].type?Object.assign(s[o],{typeName:"新客"}):1==s[o].type?Object.assign(s[o],{typeName:"回头客"}):2==s[o].type?Object.assign(s[o],{typeName:"会员"}):3==s[o].type?Object.assign(s[o],{typeName:"工作人员"}):4==s[o].type?Object.assign(s[o],{typeName:"黑名单"}):0==s[o].gender?Object.assign(s[o],{sex:"女"}):1==s[o].gender&&Object.assign(s[o],{sex:"男"}),Object.assign(s[o],{time_arrive:n.default.fermitTime(i)})}e.userInfo=s}},fail:function(t){console.log(t)}})},onchangePersonal:function(e){getApp().globalData.clerkData=[],getApp().globalData.userData=[],getApp().globalData.userData=this.userInfo[e],this.userInfo[e]&&t.navigateTo({url:"/pages/edit/edit"})},getTotCount:function(){var e=this;this.xlsAjax({url:this.$store.state.url+"/"+t.getStorageSync("baseUrl")+"/api/facelog/cnt",data:{"sign-":"face.image"},method:"GET",success:function(t){200==t.statusCode&&(console.log(t),e.totalCount=t.data,e.totalCount%10===0?e.totalPage=parseInt(e.totalCount/10):e.totalPage=parseInt(e.totalCount/10)+1)},fail:function(t){console.log(t)}})},getList:function(){var e=this;this.xlsAjax({url:this.$store.state.url+"/"+t.getStorageSync("baseUrl")+"/api/facelog/alls",data:{"page-":e.page,"sign-":"face.image",shop_id:e.selctShopid,create_time:e.changeDate},method:"GET",success:function(t){if(200==t.statusCode&&t.data[0]){for(var a=t.data,s=0;s<a.length;s++){var o=a[s].create_time;0==a[s].type?Object.assign(a[s],{typeName:"新客"}):1==a[s].type?Object.assign(a[s],{typeName:"回头客"}):2==a[s].type?Object.assign(a[s],{typeName:"会员"}):3==a[s].type?Object.assign(a[s],{typeName:"工作人员"}):4==a[s].type?Object.assign(a[s],{typeName:"黑名单"}):0==a[s].gender?Object.assign(a[s],{sex:"女"}):1==a[s].gender&&Object.assign(a[s],{sex:"男"}),Object.assign(a[s],{time_arrive:n.default.fermitTime(o)})}1==e.page?e.userInfo=a:e.userInfo=e.userInfo.concat(a)}},fail:function(t){console.log(t)}})}},onReachBottom:function(){this.page>=this.totalPage?t.showToast({icon:"none",title:"没有更多内容了"}):(this.page++,this.getList())}};e.default=o}).call(this,a("543d")["default"])},6853:function(t,e,a){"use strict";var n,s=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"b",function(){return s}),a.d(e,"c",function(){return o}),a.d(e,"a",function(){return n})},"6ded":function(t,e,a){"use strict";a.r(e);var n=a("6853"),s=a("8c30");for(var o in s)"default"!==o&&function(t){a.d(e,t,function(){return s[t]})}(o);a("c172");var i,r=a("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);e["default"]=c.exports},"8c30":function(t,e,a){"use strict";a.r(e);var n=a("4123"),s=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);e["default"]=s.a},"8d16":function(t,e,a){"use strict";(function(t){a("36f6"),a("921b");n(a("66fd"));var e=n(a("6ded"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"8e33":function(t,e,a){},c172:function(t,e,a){"use strict";var n=a("8e33"),s=a.n(n);s.a}},[["8d16","common/runtime","common/vendor"]]]);