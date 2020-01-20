<!--客流页 -->
<template>
    <view class="guest">
		<view class="header">
			<view class="left">
				<picker @change="bindPickerChange" :value="index" :range="objectArray">
					<view class="uni-input">{{shopName}}</view>
				</picker>
			</view>
			<view class="right">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				    <view class="uni-input">{{date}}</view>
				</picker>                    
			</view>
		</view>
		<view class="contents" v-for="(o,k) in userInfo" :key="k" @click="onchangePersonal(k)">
			<view class="guestFace">
				<image class="face" :src="o.face.image" mode="aspectFit"></image>
			</view>
			<view class="detail">
				<text></text>
				<text>{{o.typeName}}</text>
				<text>{{o.shop.name}}</text>
				<text>{{o.time_arrive}}</text>
				<text></text>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
    export default {
		data() {
			const currentDate = service.getDate({format: true})	//当前时间
			return {
				index:0,									//选中的门店的索引值
				date: '日期',							//选择的日期
				changeDate:'',						//需传的时间参数
				objectArray: ['中国'],				//所有门店数据组
				shopArray:[],								//门店接口获取的原数据
				selctShopid:'',								//选择的门店的门店id
				shopName:'门店',
				userInfo:[],								//特定日期到店用户信息
				selectorPersonal:'',				//点击选中的顾客
				page:1,
				totalPage:'',//总页数
				totalCount:'',//列表总数
			}
		},
		computed: {startDate() {return service.getDate('start');},endDate() {return service.getDate('end');}},
		onLoad(){
			this.shopData();
			this.faceData();
			this.getTotCount();
		},
		//刷新
		onPullDownRefresh:function() {
			this.page = 1;
			this.getList();
			setTimeout(function () {
			uni.stopPullDownRefresh();
			}, 1000);
		},
		stopPullDownRefresh:function(){},
        methods: {
			/*点击门店按钮触发的事件*/
			bindPickerChange: function(e) {
			    this.index = e.target.value      
				this.selctShopid = this.shopArray[this.index].id;
				this.shopName = this.objectArray[this.index];
				this.userInfo = [];
				this.page = 1;
				this.faceData();
				this.getTotCount();
			},
			/*点击日期按钮触发选择事件*/
			bindDateChange: function(e) {
				var that = this;
			    this.date = e.target.value;
				this.changeDate = e.target.value;
				this.changeDate = e.target.value + '~' + service.singleDay(this.changeDate)
				this.userInfo = [];
				this.page = 1;
				if(this.date){this.faceData();}
				this.getTotCount();
			},
			/*所有门店信息获取*/
			shopData:function(){
				var that = this;
				this.xlsAjax({
					url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/shop/all-name',
					data:{},
					method:"GET",
					success:function(res){
						that.shopArray = res.data;
						if(res.statusCode == 200){
							if(res.data[0]){
								that.shopArray = res.data;
								that.objectArray = [];
								for(let i=0;i<res.data.length;i++){
									that.objectArray.push(res.data[i].name)
								}
							}else{
								return
							}
						}
					},
					fail:(err) =>{
						console.log(err)
					}
				});
			},
			/*查询所有的顾客数据*/
			faceData:function(){
				var that = this;
				this.xlsAjax({
					url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/facelog/alls',
					data:{'sign-':'face.image',shop_id:that.selctShopid,'range-create_time':that.changeDate},
					method:"GET",
					success:function(res){
						if(res.statusCode == 200){
							if(res.data[0]){
								let arr = res.data;
								for(let i=0;i<arr.length;i++){
									const time = arr[i].create_time;
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
									// console.log(arr[i].create_time)
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
				getApp().globalData.userData = [];
				getApp().globalData.userData = this.userInfo[k];
				if(this.userInfo[k]){
					uni.navigateTo({url: '/pages/edit/edit'});
				}
			},
			/*获取总条数*/
			getTotCount:function(){
				var that = this;
				this.xlsAjax({
					url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/facelog/cnt',
					data:{'sign-':'face.image'},
					method:"GET",
					success:function(res){
						if(res.statusCode == 200){
							console.log(res)
							that.totalCount = res.data;
							// 如果总数除以limit 余数为0 说明没有下一页了
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
			 	url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/facelog/alls',
			 	data:{'page-':that.page,'sign-':'face.image',shop_id:that.selctShopid,create_time:that.changeDate},
			 	method:"GET",
			 	success:function(res){
					if(res.statusCode==200){
						if(res.data[0]){
							let arr = res.data;
							for(let i=0;i<arr.length;i++){
								const time = arr[i].create_time;
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
.guest{width: 100%;display: flex;flex-wrap: wrap;}
.header{width: 100%;height: 100rpx;display: flex;justify-content: flex-start;text-align: center;align-items: center;border-bottom: 1rpx solid #333333;}
	.left{width: 50%;border-right: 1rpx solid #333333;}
	.right{width: 50%;}
	.contents {width: 100%;height: 450rpx;display: flex;border-bottom: 1rpx solid #333333;}
	.guestFace{width: 50%;height: 450rpx;display: flex;justify-content: center;align-items: center;}
	.detail{width: 50%;display: flex;flex-wrap: wrap;justify-content: flex-start;}
	.detail text{width: 100%;display: flex;flex-wrap: wrap;}
	.face{width: 300rpx;height: 300rpx;justify-content: center;}
</style>
