<!--顾客编辑页-->
<template>
	<view class="edit">
		<view class="detailsPersonal">
			<view class="guestFace">
				<text class="titPicture">照片</text>
				<image class="face" :src="portraitHead" mode="aspectFit" @click="updataPicture"></image>
			</view>
		</view>
		<view class="age">
			<text class="selectAge">{{flag ? '到店次数:':''}}</text>
			<input type="text" disabled="flag ? 'disabled':''" class="ageEdite" value="" v-model="age"/>
		</view>
		<view class="age">
			<!-- <picker @change="bindPickerChange" :value="index" :range="array">
				<view class="selectSex"><text class="selectAge">{{flag ? '到店记录:':'门店信息:'}}</text><input type="text" class="changeSex" value="" v-model="shop_name"/></view>
			</picker> -->
			<view class="selectSex" @click="recordShop "><text class="selectAge">{{flag ? '到店记录:':'门店信息:'}}</text><input type="text" disabled="flag ? 'disabled':''" class="changeSex" value="" v-model="shop_name"/></view>
		</view>
		<view class="age">
			<!-- <picker @change="bindPickerType" :value="index1" :range="array1">
				<view class="selectType"><text class="selectAge">{{flag ? '标签信息:':'顾客类型'}}</text><input type="text" class="typeLie" value="" v-model="typeName"/></view>
			</picker> -->
			<view class="selectType"><text class="selectAge">{{flag ? '标签信息:':'顾客类型'}}</text><input disabled="disabled" type="text" class="typeLie" value="" v-model="typeName"/></view>
		</view>
		<view class="age">
			<text class="selectAge">登陆手机:</text>
			<input type="text" class="ageEdite" value="" v-model="phone"/>
		</view>
		<view class="buttonBottom">
			<button @click="cancell">取消</button>
			<button @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			userInfo:{"age":10,"shop_id":0,typeName:"新客","app_id":50,"shop":{name:"环球二店"},"face_id":1,"type":0,"face":{"image":"../../static/img/qq.png"},"id":2067105974321152,"create_time":"2019-12-31T02:20:44Z","device":null,"gender":0,"device_id":"50"},
			age:'',			//编辑数据中的年龄
			shop_name:'男',			//编辑数据中的门店信息
			phone:'15882004659',//编辑数据中的电话
			typeName:'',			//编辑数据中的顾客类型
			portraitHead:'../../static/img/qq.png',	//编辑数据中的顾客头像
			userPhone:'',
			index:0,					//性别下拉框选择索引		1为男  0为女
			array:['女','男'],					//性别数组
			index1:0,					//类型下拉框选择索引		0 新客 1 回头客 2 会员 3 工作人员 4 黑名单
			array1:['新客','回头客','会员','工作人员','黑名单'],					//类型数组
			flag:'true',					//判断是客流还是顾客点击进入的
		}
	},
	onLoad() {
		this.initial();
	},
	methods:{
		/*页面创建时的数据初始化*/
		initial(){
			var that = this;
			uni.getStorage({key: 'userPhone',success: function (res) {that.userPhone = res.data;}});
			console.log(getApp().globalData.clerkData,getApp().globalData.userData)
			if(getApp().globalData.clerkData != ''){
				this.flag = true;
				that.userInfo = getApp().globalData.clerkData;
				that.portraitHead = that.userInfo.image;
				this.age = that.userInfo.log_num;
				this.shop_name = '点击前往';
				if(that.userInfo.tag[0]){
					console.log(that.userInfo.tag)
					that.typeName = that.userInfo.tag[0].name;	
				}else{
					that.typeName = '暂无标签';	
				}
			}else if(getApp().globalData.userData != ''){
				this.flag = false;
				that.userInfo = getApp().globalData.userData;
				that.portraitHead = that.userInfo.face.image;
				this.shop_name = that.userInfo.shop.name;
				this.typeName = that.userInfo.typeName;	
			}
			// if(that.userInfo.gender == 0){Object.assign(that.userInfo,{sex:'女'})}else if(that.userInfo.gender == 1){Object.assign(that.userInfo,{sex:'男'})}
			// this.age = that.userInfo.age;
			this.phone = that.userPhone;
		},
		/*点击头像的上传事件*/
		updataPicture(){
			uni.chooseImage({
			    success: (chooseImageRes) => {
			        const tempFilePaths = chooseImageRes.tempFilePaths;
					return
			        const uploadTask = uni.uploadFile({
			            url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
			            filePath: tempFilePaths[0],
			            name: 'file',
			            formData: {
			                'user': 'test'
			            },
			            success: (uploadFileRes) => {
			                console.log(uploadFileRes.data);
			            },
						fail:(err)=>{
							console.log(err)
						}
			        });
			    }
			});
		},
		/*性别下拉框选择事件*/
		// bindPickerChange:function(e){
		// 	var that = this;
		// 	this.index = e.target.value;
		// 	this.sex = this.array[this.index];
		// },
		/*点击到店记录跳转列表*/
		recordShop:function(){
			console.log(111)
			uni.showToast({
				icon:'none',
				title:"等待开发",
			})
		},
		/*类型下拉框选择事件*/
		bindPickerType:function(e){
			var that = this;
			if(this.flag = false){
				that.index1 = e.target.value;
				that.typeName = that.array1[that.index1];
			}else{
				return
			}
		},
		/*点击取消当前页将要提交的信息，并返回上一页*/
		cancell(){
			this.age = '',this.sex = '',this.phone = '',this.typeName = '',this.portraitHead = '';
			getApp().globalData.clerkData = [];
			getApp().globalData.userData = [];
			this.userInfo = [];
			uni.navigateBack({delta: 1});
		},
		/*点击提交按钮修改选中数据*/
		submit(){
			var that = this;
			var appId = getApp().globalData.clerkData.app_id;		//当前选中的数据的app_id
			var id = getApp().globalData.clerkData.id;
			this.xlsAjax({
				url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/face/put',
				data:{age:this.age,app_id:appId,create_time:'',device_id:'',face_id:'',gender:that.index,id:id,shop_id:'',type:that.index1},
				method:"POST",
				success:function(res){
					if(res.statusCode == 200){
						uni.showToast({
							icon:'success',
							title:'修改成功',
						})
						getApp().globalData.clerkData = [];
						getApp().globalData.userData = [];
						this.userInfo = [];
						uni.navigateBack({delta: 1});
					}else{
						uni.showToast({
							icon:'none',
							title:"数据异常",
						})
					}
				},
				fail:(err)=>{
					console.log(err)
				}
			})
		}
	},
}
</script>

<style>
	.edit{width: 100%;display: flex;justify-content: center;flex-wrap: wrap;}
	.detailsPersonal{width: 70%;display: flex;height: 300rpx;margin-top: 10%;justify-content: center;}
	.titPicture{width: 100%;display: flex;height: 300rpx;align-items: center;}
	.guestFace{width: 80%;display: flex;height: 300rpx;}
	.face{width: 100%;height: 300rpx;}
	.age{width: 60%;height: 100rpx;display: flex;align-items: center;flex-wrap: nowrap;margin-top: 10%;}
	.selectAge{width: 44%;display: flex;justify-content: flex-start;}
	.selectSex{width: 100%;display: flex;justify-content: flex-start;}
	.changeSex{width:68%;font-size: 42rpx;font-weight: normal;display: flex;justify-content: flex-end;text-align: right;margin-left: 10%;}
	.selectType{width:100%;display: flex;justify-content: center;}
	.typeLie{width:68%;font-size: 42rpx;font-weight: normal;display: flex;justify-content: flex-end;text-align: right;margin-left: 10%;}
	.typeLie text{border: 1px solid #E0E0E0;}
	.ageEdite{width: 80%;display: flex;height: 60rpx;font-size: 42rpx;text-align: right;}
	.buttonBottom{width:100%;position: absolute;height: 100rpx;text-align: center;bottom: 0;display: flex;}
	.buttonBottom button{width: 50%;border-radius: none;}
</style>
