(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/edit/edit"],{"4bf8":function(e,t,a){"use strict";var n=a("c046"),i=a.n(n);i.a},"630d":function(e,t,a){"use strict";a.r(t);var n=a("d203"),i=a("7e81");for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);a("4bf8");var o,r=a("f0c5"),u=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);t["default"]=u.exports},"7e81":function(e,t,a){"use strict";a.r(t);var n=a("eb58"),i=a.n(n);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);t["default"]=i.a},"8f3f":function(e,t,a){"use strict";(function(e){a("36f6"),a("921b");n(a("66fd"));var t=n(a("630d"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},c046:function(e,t,a){},d203:function(e,t,a){"use strict";var n,i=function(){var e=this,t=e.$createElement;e._self._c},s=[];a.d(t,"b",function(){return i}),a.d(t,"c",function(){return s}),a.d(t,"a",function(){return n})},eb58:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{userInfo:{age:10,shop_id:0,typeName:"新客",app_id:50,shop:{name:"环球二店"},face_id:1,type:0,face:{image:"../../static/img/qq.png"},id:0x758059d500000,create_time:"2019-12-31T02:20:44Z",device:null,gender:0,device_id:"50"},age:"10",sex:"男",phone:"15882004659",typeName:"",portraitHead:"../../static/img/qq.png",userPhone:"",index:0,array:["女","男"],index1:0,array1:["新客","回头客","会员","工作人员","黑名单"]}},onLoad:function(){this.initial()},methods:{initial:function(){var t=this;e.getStorage({key:"userPhone",success:function(e){t.userPhone=e.data}}),""!=getApp().globalData.clerkData?(t.userInfo=getApp().globalData.clerkData,t.portraitHead=t.userInfo.image):""!=getApp().globalData.userData&&(t.userInfo=getApp().globalData.userData,t.portraitHead=t.userInfo.face.image),0==t.userInfo.gender?Object.assign(t.userInfo,{sex:"女"}):1==t.userInfo.gender&&Object.assign(t.userInfo,{sex:"男"}),this.age=t.userInfo.age,this.sex=t.userInfo.sex,this.phone=t.userPhone,this.typeName=t.userInfo.typeName},updataPicture:function(){e.chooseImage({success:function(e){e.tempFilePaths}})},bindPickerChange:function(e){this.index=e.target.value,this.sex=this.array[this.index]},bindPickerType:function(e){this.index1=e.target.value,this.typeName=this.array1[this.index1]},cancell:function(){this.age="",this.sex="",this.phone="",this.typeName="",this.portraitHead="",getApp().globalData.clerkData=[],getApp().globalData.userData=[],this.userInfo=[],e.navigateBack({delta:1})},submit:function(){var t=this,a=getApp().globalData.clerkData.app_id,n=getApp().globalData.clerkData.id;this.xlsAjax({url:this.$store.state.url+"/"+e.getStorageSync("baseUrl")+"/api/face/put",data:{age:this.age,app_id:a,create_time:"",device_id:"",face_id:"",gender:t.index,id:n,shop_id:"",type:t.index1},method:"POST",success:function(t){200==t.statusCode?(e.showToast({icon:"success",title:"修改成功"}),getApp().globalData.clerkData=[],getApp().globalData.userData=[],this.userInfo=[],e.navigateBack({delta:1})):e.showToast({icon:"none",title:"数据异常"})},fail:function(e){console.log(e)}})}}};t.default=a}).call(this,a("543d")["default"])}},[["8f3f","common/runtime","common/vendor"]]]);