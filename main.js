import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.xlsAjax = function(param,backpage, backtype){
    var _self = this, 
        url = param.url,
        method = param.method,
        header = {},
        data = param.data || {}, 
        token = "";
	withCredentials: true;
	token = uni.getStorageSync('session_id');
	// console.log(uni.getStorageSync('session_id'))
    //请求方式:GET或POST(POST需配置header: {'content-type' : "application/x-www-form-urlencoded"},)
    if(method){
        method = method.toUpperCase();//小写改为大写
        if(method=="POST"){
            header = {'content-type' : "application/x-www-form-urlencoded",'session_id' : token};
        }else{
            header = {'content-type' : "application/json",'session_id' : token};
        }
    }else{
        method = "GET";
        header = {'content-type' : "application/json",'session_id' : token};
    }
	// headers.common['Authorization'] = userInfo;
    //用户交互:加载圈
    if (!param.hideLoading) {
        uni.showLoading({title:'加载中...'});
    }
    //网络请求
    uni.request({
        url: url,
        method: method,
        header: header,
        data: data,
        success: res => {
            typeof param.success == "function" && param.success(res);
        },
        fail: (err) => {
			console.log(err)
            typeof param.fail == "function" && param.fail(err.data);
        },
        complete: () => {
            uni.hideLoading();
            typeof param.complete == "function" && param.complete();
            return;
        }
    });
}
// Vue.prototype.xlsAjax.headers.common['Authorization'] = userInfo;

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
