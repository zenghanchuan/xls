(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/edit/edit"],{"4bf8":function(e,t,a){"use strict";var n=a("c046"),o=a.n(n);o.a},"630d":function(e,t,a){"use strict";a.r(t);var n=a("8df4"),o=a("7e81");for(var i in o)"default"!==i&&function(e){a.d(t,e,function(){return o[e]})}(i);a("4bf8");var s,r=a("f0c5"),u=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);t["default"]=u.exports},"7e81":function(e,t,a){"use strict";a.r(t);var n=a("eb58"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);t["default"]=o.a},"8df4":function(e,t,a){"use strict";var n,o=function(){var e=this,t=e.$createElement;e._self._c},i=[];a.d(t,"b",function(){return o}),a.d(t,"c",function(){return i}),a.d(t,"a",function(){return n})},"8f3f":function(e,t,a){"use strict";(function(e){a("36f6"),a("921b");n(a("66fd"));var t=n(a("630d"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},c046:function(e,t,a){},eb58:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{userInfo:{age:10,shop_id:0,typeName:"新客",app_id:50,shop:{name:"环球二店"},face_id:1,type:0,face:{image:"../../static/img/qq.png"},id:0x758059d500000,create_time:"2019-12-31T02:20:44Z",device:null,gender:0,device_id:"50"},age:"",shop_name:"男",phone:"15882004659",typeName:"",portraitHead:"../../static/img/qq.png",userPhone:"",index:0,array:["女","男"],index1:0,array1:["新客","回头客","会员","工作人员","黑名单"],flag:"true"}},onLoad:function(){this.initial()},methods:{initial:function(){var t=this;e.getStorage({key:"userPhone",success:function(e){t.userPhone=e.data}}),console.log(getApp().globalData.clerkData,getApp().globalData.userData),""!=getApp().globalData.clerkData?(this.flag=!0,t.userInfo=getApp().globalData.clerkData,t.portraitHead=t.userInfo.image,this.age=t.userInfo.log_num,this.shop_name="点击前往",t.userInfo.tag[0]?(console.log(t.userInfo.tag),t.typeName=t.userInfo.tag[0].name):t.typeName="暂无标签"):""!=getApp().globalData.userData&&(this.flag=!1,t.userInfo=getApp().globalData.userData,t.portraitHead=t.userInfo.face.image,this.shop_name=t.userInfo.shop.name,this.typeName=t.userInfo.typeName),this.phone=t.userPhone},updataPicture:function(){e.chooseImage({success:function(e){e.tempFilePaths}})},recordShop:function(){console.log(111),e.showToast({icon:"none",title:"等待开发"})},bindPickerType:function(e){var t=this;(this.flag=!1)&&(t.index1=e.target.value,t.typeName=t.array1[t.index1])},cancell:function(){this.age="",this.sex="",this.phone="",this.typeName="",this.portraitHead="",getApp().globalData.clerkData=[],getApp().globalData.userData=[],this.userInfo=[],e.navigateBack({delta:1})},submit:function(){var t=this,a=getApp().globalData.clerkData.app_id,n=getApp().globalData.clerkData.id;this.xlsAjax({url:this.$store.state.url+"/"+e.getStorageSync("baseUrl")+"/api/face/put",data:{age:this.age,app_id:a,create_time:"",device_id:"",face_id:"",gender:t.index,id:n,shop_id:"",type:t.index1},method:"POST",success:function(t){200==t.statusCode?(e.showToast({icon:"success",title:"修改成功"}),getApp().globalData.clerkData=[],getApp().globalData.userData=[],this.userInfo=[],e.navigateBack({delta:1})):e.showToast({icon:"none",title:"数据异常"})},fail:function(e){console.log(e)}})}}};t.default=a}).call(this,a("543d")["default"])}},[["8f3f","common/runtime","common/vendor"]]]);