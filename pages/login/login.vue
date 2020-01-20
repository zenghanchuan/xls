<template>
		<view class="login">
			<view class="header">
				<image class="logo" src="../../static/img/hzk.png" mode="aspectFit"></image>
				<text class="title"></text>
				<input class="enterprise-input" name="input" maxlength="11" v-model="enterprise" placeholder="企业名" />
				<input class="phone-input" name="input" maxlength="11" v-model="phone" placeholder="手机号" />
				<input class="password-input" type="password" name="input" v-model="password" placeholder="密码" />
				<button type="primary" class="submit" @click="handelsub" >登录</button>
			</view>
		</view>
</template>

<script>
    import service from '../../service.js';
    import {mapState,mapMutations} from 'vuex'
    // import mInput from '../../components/m-input.vue'
    export default {
        data() {
            return {
				phone:'',
				password:'',
				enterprise:'',
			}
        },
		onLoad() {
			this.loginPro();
		},
        methods: {
			/*点击提交时获取账号密码的点击事件*/
			handelsub:function() {
				var that = this;
				if(!(/^1[3456789]\d{9}$/.test(this.phone)) || this.phone == ''){
					uni.showToast({
						icon:'none',
						title:'电话号码格式不正确'
					})
				}else{this.xlsAjax({
						        url : this.$store.state.url+this.$store.state.baseUrl+'/api/user/login',
						        data : {phone : this.phone,password:this.password,app_name:this.enterprise},
						        method : "POST",
						        success:function (res) {
									if(res.statusCode == 200){
										// getApp().globalData.phone = this.phone;		//将获取的token存为全局变量
										// that.$store.commit('setbaseUrl', {baseUrl:res.data.app_id})	//根据返回的app_id改变接口
										console.log(res)
										if(res.header.session_id){
											uni.setStorage({key:'session_id',data:res.header.session_id});
										}else{
											uni.setStorage({key:'session_id',data:res.header.Session_id});
										}
										uni.setStorage({key:'userPhone',data:res.data.phone});
										uni.setStorage({key:'baseUrl',data:res.data.app_id});
										getApp().globalData.baseUrl = res.data.app_id;
										uni.switchTab({ url: "/pages/main/main"})
									}else{
										uni.showToast({
											icon:'none',
											title:'手机号或密码错误'
										})
									}
						        },
								fail:(err) =>{
									console.log(err)
								}
						    })
					}
			},
			loginPro:function(){
				if(uni.getStorageSync('session_id')){
					// console.log(uni.getStorageSync('session_id'))
					getApp().globalData.baseUrl = uni.getStorageSync('baseUrl');
					uni.switchTab({ url: "/pages/main/main"})
				}
			},
		},
        onReady() {}
    }
</script>

<style>
	.login{display: flex;width: 100%;justify-content: center;text-align: center;flex-direction: column-reverse;}
	.header image{margin-top: 25%;width: 100%;}
	.title{display: flex;width: 100%;justify-content: center;margin-top: 2%;}
	.logo{margin-top: 20%;width: 200rpx;height: 200rpx;display: flex;justify-content: center;}
	.phone-input{width: 80%;color: block;font-size: 40rpx;border-bottom: 1rpx solid #333333;margin: 10% 0 0 10%;}
	.password-input{width: 80%;color: block;font-size: 40rpx;border-bottom: 1rpx solid #333333;margin: 10% 0 0 10%;}
	.enterprise-input{width: 80%;color: block;font-size: 40rpx;border-bottom: 1rpx solid #333333;margin: 10% 0 0 10%;}
	.submit{width: 80%;margin: 20% 0 0 10%;border-radius: 20rpx;}
</style>
