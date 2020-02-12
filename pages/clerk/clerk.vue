<!--顾客页页 -->
<template>
	<view class="guideShopping">
			<view class="header">
				<view class="left">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{selectType}}</view>
					</picker>
				</view>
				<view class="right">
					<!-- <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					    <view class="uni-input">{{date}}</view>
					</picker> -->
					<picker @change="bindDateChange" :value="index2" :range="objectArray2">
					    <view class="uni-input">{{dateExhibition}}</view>
					</picker> 
				</view>
			</view>
			<view class="contents" v-for="(o,k) in userInfo" :key="k" @click="onchangePersonal(k)">
				<view class="guestFace">
					<image class="face" :src="o.image" mode="aspectFit"></image>
				</view>
				<view class="detail">
					<text></text>
					<text>到店：{{o.log_num}}次</text>
					<text>日期：{{(o.time_arrive).slice(0,10)}}</text>
					<text><b>{{o.tag[0] ? o.tagName:'暂无标签' }}</b></text>
					<text></text>
				</view>
			</view>
		</view>
</template>
<script>
	import service from '../../service.js';
	export default {
		data() {
			const currentDate = service.getDate({format: true})	//日期选择参数
			return {
				array: ['新客','回头客','会员','工作人员','黑名单'],
				index2: 0,								//选择时间的索引
				objectArray2: ['全部','本周','本月','本季度','本年',],				//所有时间段数据组
				dateExhibition:'全部',						//选择的时间段
				date: currentDate,							//选择的日期
				changeDate:'',						//需传的时间参数
				index: 0,	//选择类型的索引
				userInfo:[{"age":12,sex:"男","shop_id":0,typeName:"新客","app_id":50,"shop":{name:"环球一店"},"face_id":2,"type":0,"face":{"image":"../../static/img/qq.png"},"id":2067257895419904,"create_time":"2019-12-31T06:23:43Z","device":null,"gender":1,"device_id":"02"},{"age":10,sex:"男","shop_id":0,typeName:"新客","app_id":50,"shop":{name:"环球二店"},"face_id":1,"type":0,"face":{"image":"../../static/img/qq.png"},"id":2067105974321152,"create_time":"2019-12-31T02:20:44Z","device":null,"gender":0,"device_id":"50"}],
				selectType:'类型',		//选中类型
				typeNum:'',				//传参类型值
				page:1,
				totalPage:'',//总页数
				totalCount:'',//列表总数
			}
		},
		computed: {startDate() {return service.getDate('start');},endDate() {return service.getDate('end');}},
		onLoad() {
			this.faceData();
			this.getTotCount();
		},
		//下拉刷新
		onPullDownRefresh:function() {
			this.page = 1;
			this.getList();
			setTimeout(function () {
			uni.stopPullDownRefresh();
			}, 1000);
		},
		stopPullDownRefresh:function(){},
	    methods: {
			/*点击类型按钮触发的事件*/
			bindPickerChange: function(e) {
			    var that = this;
			    this.index = e.target.value;
				this.selectType = this.array[this.index];
				if(that.selectType == '新客'){
					that.typeNum = 0
				}else if(that.selectType == '回头客'){
					that.typeNum = 1
				}else if(that.selectType == '会员'){
					that.typeNum = 2
				}else if(that.selectType == '工作人员'){
					that.typeNum = 3
				}else if(that.selectType == '黑名单'){
					that.typeNum = 4
				}
				this.userInfo = [];
				this.page = 1;
				this.faceData();
				this.getTotCount();
			},
			/*点击日期按钮触发选择事件*/
			bindDateChange: function(e) {
				var that = this;
			    this.index2 = e.target.value;
				this.dateExhibition = this.objectArray2[this.index2];
				if(this.dateExhibition == '全部'){
					that.changeDate = '';
				}else if(this.dateExhibition == '本周'){
					that.changeDate = service.weekLast();
				}else if(this.dateExhibition == '本月'){
					that.changeDate = service.monthThis();
				}else if(this.dateExhibition == '本季度'){
					that.changeDate = service.quarterThis();
				}else if(this.dateExhibition == '本年'){
					that.changeDate = service.yearThis();
				}
				this.userInfo = [];
				this.page = 1;
				this.faceData();
				this.getTotCount();
			},
			/*查询所有的顾客数据*/
			faceData:function(){
				var that = this;
				this.xlsAjax({
					url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/face/all',
					data:{type:that.typeNum,'order-':'log_time>','sign-':'image','link-':'tag','range-log_time':that.changeDate},
					method:"GET",
					success:function(res){
						if(res.statusCode == 200){
							if(res.data[0]){
								let arr = res.data;
								for(let i=0;i<arr.length;i++){
									const time = arr[i].log_time;
									if(arr[i].type == 0){
										Object.assign(arr[i],{typeName:'新客'})
									}else if(arr[i].type == 1){
										Object.assign(arr[i],{typeName:'回头客'})
									}else if(arr[i].type == 2){
										Object.assign(arr[i],{typeName:'会员'})
									}else if(arr[i].type == 3){
										Object.assign(arr[i],{typeName:'工作人员'})
									}else if(arr[i].type == 4){
										Object.assign(arr[i],{typeName:'黑名单'})
									}
									for(let j=0;j<arr[i].tag.length;j++){
										if(arr[i].tag[j].name){
											Object.assign(arr[i],{tagName:arr[i].tag[j].name})
										}
									}
									Object.assign(arr[i],{time_arrive:service.fermitTime(time)})
								}
								that.userInfo = arr;
							}else{
								uni.showToast({
									icon:'none',
									title:'查询结果无数据'
								})
								that.userInfo = [];
								return
							}
						}
					},
					fail:(err) =>{
						console.log(err)
					}
				})
			},
			/*点击选中顾客并跳转至编辑页*/
			onchangePersonal:function(k){
				getApp().globalData.clerkData = [];
				getApp().globalData.userData = [];
				getApp().globalData.clerkData = this.userInfo[k];
				if(this.userInfo[k]){
					uni.navigateTo({url: '/pages/edit/edit'});
				}
			},
			/*监听退出事件*/
			onNavigationBarButtonTap:function(e){
				this.xlsAjax({
						    url : this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+'/api/user/logout',
						        data : {},
						        method : "POST",
						        success:function (res) {
						    		if(res.statusCode == 200){
						    			uni.clearStorage();
						    			uni.navigateTo({url: "/pages/login/login"})
						    		}else{
						    			uni.showToast({
						    				icon:'none',
						    				title:'网络错误'
						    			})
						    		}
						        },
						    	fail:(err) =>{
						    		console.log(err)
						    	}
						    })    
			},
			/*获取总条数*/
			getTotCount:function(){
				var that = this;
				this.xlsAjax({
					url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/face/cnt',
					data:{type:that.typeNum,'order-':'log_time>','sign-':'image','link-':'tag','range-log_time':that.changeDate},
					method:"GET",
					success:function(res){
						if(res.statusCode == 200){
							console.log(res)
							that.totalCount = res.data;
							// 如果总数除以每页数 余数为0 说明没有下一页了
							if (that.totalCount % 10 === 0) {
							    that.totalPage = parseInt(that.totalCount / 10);
							} else {
							    that.totalPage = parseInt((that.totalCount / 10)) + 1;
							}
						}
					},
					fail:(err) =>{
						console.log(err)
					}
				})
			},
			/*上拉加载下拉刷新逻辑*/
			getList:function(){
			 var that=this;
			 this.xlsAjax({
			 	url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/face/all',
			 	data:{'page-':that.page,type:that.typeNum,'order-':'log_time>','sign-':'image','link-':'tag','range-log_time':that.changeDate},
			 	method:"GET",
			 	success:function(res){
					if(res.statusCode==200){
						console.log(res)
						if(res.data[0]){
							let arr = res.data;
							for(let i=0;i<arr.length;i++){
								const time = arr[i].log_time;
								if(arr[i].type == 0){
									Object.assign(arr[i],{typeName:'新客'})
								}else if(arr[i].type == 1){
									Object.assign(arr[i],{typeName:'回头客'})
								}else if(arr[i].type == 2){
									Object.assign(arr[i],{typeName:'会员'})
								}else if(arr[i].type == 3){
									Object.assign(arr[i],{typeName:'工作人员'})
								}else if(arr[i].type == 4){
									Object.assign(arr[i],{typeName:'黑名单'})
								}else if(arr[i].gender == 0){
									Object.assign(arr[i],{sex:'女'})
								}else if(arr[i].gender == 1){
									Object.assign(arr[i],{sex:'男'})
								}
								Object.assign(arr[i],{time_arrive:service.fermitTime(time)})
							}
							// that.userInfo = arr;
							if (that.page == 1) {
							    that.userInfo = arr;
							} else {
							    that.userInfo = that.userInfo.concat(arr);
							}
						}
					// var resultList=res.data.data.rows;
					
					}
			 	},
			 	fail:(err) =>{
			 		console.log(err)
			 	}
			 })
			}
		},
		//上拉加载
			onReachBottom(){
			 if (this.page >= this.totalPage) {
				 uni.showToast({
				 	icon:'none',
					title:"没有更多内容了",
				 })
			        return
			    }
			    // 加载更多数据
			    this.page++;
			    this.getList();
		}
	}
</script>
<style>
	.guideShopping{width: 100%;display: flex;flex-wrap: wrap;}
	.header{width: 100%;height: 100rpx;display: flex;justify-content: flex-start;text-align: center;align-items: center;border-bottom: 1rpx solid #333333;}
	.left{width: 50%;border-right: 1rpx solid #333333;}
	.right{width: 50%;}
	.contents {width: 100%;height: 450rpx;display: flex;border-bottom: 1rpx solid #333333;}
	.guestFace{width: 50%;height: 450rpx;display: flex;justify-content: center;align-items: center;}
	.detail{width: 50%;display: flex;flex-wrap: wrap;justify-content: flex-start;}
	.detail text{width: 100%;display: flex;flex-wrap: wrap;}
	.detail text b{font-weight: normal;border-radius: 4rpx;font-size: 36rpx;background: #e0e0e0;}
	.face{width: 300rpx;height: 300rpx;justify-content: center;}
</style>