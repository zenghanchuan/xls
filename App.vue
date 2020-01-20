<script>
	export default {
		globalData: {
		    token: '',
			baseUrl:"0",
			userData:{},		//客流页点击传值
			clerkData:{},		//顾客页点击传值
		  },
		onLaunch: function() {
			console.log('App Launch');
			//let token = this.$options.globalData.token
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>
<style>
</style>
