import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: "",
		// url:"http://47.93.61.253:9000",
		url:"https://huizhike.cn",
		baseUrl:"/0",
    },
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        },
		setbaseUrl(state, payload) {
		        if (payload.hasOwnProperty('baseUrl')) {
		            state.baseUrl = payload.baseUrl
		        }
		    },
    }
})

export default store
