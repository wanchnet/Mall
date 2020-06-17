import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		token:""
	},
	mutations: {
		
		login(state,provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			if(provider.hasOwnProperty("token")){
				state.token = provider.token;
				uni.setStorage({//缓存用户登陆状态
				    key: 'userInfo',  
				    data: provider  
				})
				uni.setStorage({//缓存用户登陆状态
					 key: 'token',  
					 data: provider.token  
				})
			}
			
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			state.token = "";
			uni.removeStorage({  
                key: 'userInfo'  
            })
			uni.removeStorage({
			    key: 'token'  
			})
		},
	},
	actions: {
	
	},
	getters:{
		getUserInfo:state => state.userInfo
	}
})

export default store
