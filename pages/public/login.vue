<template>
	<view class="content">
		<view class="first">
			<text class="lo-text">登录</text>
			<view class="lo-color"></view>
			<text class="re-text"  @click="toRegist">还没有账号，立即<span class="zc">注册</span></text>
		</view>
		<view class="second">
			<view class="phone">
				<view class="image">
					<!-- <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="64 64 896 896" width="20" height="20" style="fill: rgb(249, 117, 143);"><path d="M877.1 238.7L770.6 132.3c-13-13-30.4-20.3-48.8-20.3s-35.8 7.2-48.8 20.3L558.3 246.8c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l89.6 89.7a405.46 405.46 0 0 1-86.4 127.3c-36.7 36.9-79.6 66-127.2 86.6l-89.6-89.7c-13-13-30.4-20.3-48.8-20.3a68.2 68.2 0 0 0-48.8 20.3L132.3 673c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l106.4 106.4c22.2 22.2 52.8 34.9 84.2 34.9 6.5 0 12.8-.5 19.2-1.6 132.4-21.8 263.8-92.3 369.9-198.3C818 606 888.4 474.6 910.4 342.1c6.3-37.6-6.3-76.3-33.3-103.4zm-37.6 91.5c-19.5 117.9-82.9 235.5-178.4 331s-213 158.9-330.9 178.4c-14.8 2.5-30-2.5-40.8-13.2L184.9 721.9 295.7 611l119.8 120 .9.9 21.6-8a481.29 481.29 0 0 0 285.7-285.8l8-21.6-120.8-120.7 110.8-110.9 104.5 104.5c10.8 10.8 15.8 26 13.3 40.8z"></path></svg> -->
					<image src="../../static/icon/ph.png" class="svg-icon" mode="aspectFill"></image>
				</view>
				<view class="phone-input">
					<input 
					type="number" 
					:value="mobile" 
					style="font-size: 28rpx; height: 80rpx;" 
					placeholder="请输入手机号" 
					maxlength="11"
					data-key="mobile"
					@input="inputChange"
					/>
				</view>
			</view>
			<view class="phone">
				<view class="image">
					<!-- <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24" width="20" height="20" style="fill: rgb(249, 117, 143);"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></svg>				 -->
					<image src="../../static/icon/pw.png" class="svg-icon" mode="aspectFill"></image>
				</view>
				<view class="phone-input">
					<input 
					type="mobile" 
					value="" 
					style="font-size: 28rpx; height: 80rpx;" 
					placeholder="请输入密码" 
					maxlength="20"
					password 
					data-key="password"
					@input="inputChange"
					/>
				</view>
			</view>
			<view class="yzm" v-show="errpsdNum > 3">
				<view class="yzm-left">
					<view class="image">
						<!-- <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24" width="20" height="20" style="fill: rgb(249, 117, 143);"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path></svg>					 -->
						<image src="../../static/icon/yzm.png" class="svg-icon" mode="aspectFill"></image>
					</view>
					<view class="yzm-input">
						<input 
						type="text" 
						value="" 
						style="font-size: 28rpx; width: 200rpx; height: 80rpx;" 
						placeholder="请输入验证码" 
						maxlength="20" 
						data-key="code"
						@input="inputChange"
						@confirm="toLogin"
						/>
					</view>		
				</view>
				<view class="yzm-right">
					<img class="yzm-img" v-bind:src="vCode" alt="" @click="updateImgCode">
				</view>
			</view>
			<button class="btn-submit" @click="toLogin">
				<text class="submit-text" :disabled="logining">登录</text>			
			</button>
			<view class="forget-psd">
				<text class="forget-text" @click="navTo('/pages/public/findpwd')">忘记密码</text>			
			</view>
			<view class="wechat">
				<text class="wechat-text">
					<text class="line">—————</text> 
					第三方登录
					<text class="line">—————</text>
				</text>	
				<button class="wechat-img" @click="wxLogin" open-type="getUserInfo">
					<image class="img" src="../../static/wechat.png" mode="aspectFit"></image>
				</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {  
        mapMutations  
    } from 'vuex';
	import {mapState} from 'vuex';
	import Api from '../../common/js/model.js';
	
	export default{
		data(){
			return {
				mobile: '',
				password: '',
				code:'',
				logining: false,
				vCode:"",
				token:"",
				errpsdNum:0,
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onShow() {
			if(this.hasLogin){
				uni.switchTab({
					url: `/pages/index/index`
				})
			}
		},
		onLoad(){
			var _self=this;
			_self.updateImgCode();
			_self.errpsdNum = uni.getStorageSync('errpsdNum');
			if (!_self.errpsdNum) {
				_self.errpsdNum = 0;
			}
		},
		
		methods: {
			...mapMutations(['login']),
			updateImgCode(){
				var _self=this
				Api.methods.getImgCode().then(function(res){
					_self.vCode=res.data.data.base64;
					_self.token=res.data.data.token;
				})
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navTo(url){
				uni.navigateTo({  
					url:url
				})  
			},
			navBack(){
				uni.navigateBack();
			},
			toRegist(){
				//this.$api.msg('去注册');
				var url ='register'
				uni.navigateTo({
					url
				})
			},
			toLogin(){
				console.log("asdasd")
				var _self=this;
				this.logining = true;
				const {mobile, password} = this;
				//数据验证模块
				if(_self.errpsdNum < 4){
					if(mobile===''||password===''){
						_self.$api.msg("请输入必填参数");
						_self.logining=false
						return;
					}
				}else{
					if(mobile===''||password===''||this.code===''){
						_self.$api.msg("请输入必填参数");
						_self.logining=false
						return;
					}
				}
				// if(mobile===''||password===''||this.code===''){
				// 	_self.$api.msg("请输入必填参数");
				// 	_self.logining=false
				// 	return;
				// }

				var params={"phone":mobile,"password":password,"code":this.code,"errNum":this.errpsdNum,"token":this.token}
				Api.methods.login(params).then(function(res){
					if(res.data.res==1){
						//_self.$store.state.userInfo=res.data.user
						res.data.user.token=res.data.token
						_self.login(res.data.user)
						_self.errpsdNum = 0;
						uni.setStorage({
						    key: 'errpsdNum',
						    data: _self.errpsdNum,
						    success: function () {
						        console.log('success');
						    }
						});
						var route=getCurrentPages()[0].route
						if(route ==='pages/public/login'){
							uni.switchTab({
								url: `/pages/index/index`
							})
						}else if(route ==='pages/cart/cart'){
							uni.switchTab({
								url: `/pages/cart/cart`
							})
						}else{
							uni.navigateBack();
						}
						
					}else{
						_self.errpsdNum++;
						uni.setStorage({
						    key: 'errpsdNum',
						    data: _self.errpsdNum,
						    success: function () {
						        console.log('success');
						    }
						});
						_self.$api.msg(res.data.msg);
						_self.logining=false
						_self.updateImgCode()
					}
				})
			},
			wxLogin(){
				var _self =this
				uni.getProvider({
				    service: 'oauth',
				    success: function(res) {
				        console.log(res.provider);
				        //支持微信、qq和微博等
				        if (~res.provider.indexOf('weixin')) {
				            uni.login({
				              provider: 'weixin',
							  scopes:'auth_user',
				              success: function (loginRes) {
				  				 console.log("App微信获取用户信息成功",JSON.stringify(loginRes));
								//#ifdef APP-PLUS
				                  _self.checkWeChatUser(loginRes) //请求登录接口方法
								//#endif
								//#ifdef MP-WEIXIN
								  uni.getUserInfo({
								      provider: 'weixin',
									  scopes:'auth_base',
								      success: function (infoRes) {
										console.log(infoRes)
										infoRes.userInfo.code = loginRes.code;
										_self.MPWeChatLogin(infoRes.userInfo);
								      },
									  fail: function(infoRes){
										  console.log(infoRes)
									  }
								    });;
								//#endif
				              },
				              fail:function(res){
				              	console.log("App微信获取用户信息失败",res);
				              }
				            })
				        }
				    }
				});
			},
			MPWeChatLogin(data){
				var _self = this;
				Api.methods.MPWeChatLogin(data).then(res => {
					if(res.data.code == 200){
						if(res.data.user == null){
							_self.$api.msg("微信登录失败");
						}else{
							res.data.user.token=res.data.token
							_self.login(res.data.user)
							var route=getCurrentPages()[0].route
							if(route ==='pages/public/login'){
								uni.switchTab({
									url: `/pages/index/index`
								})
							}else if(route ==='pages/cart/cart'){
								uni.switchTab({
									url: `/pages/cart/cart`
								})
							}else{
								uni.navigateBack();
							}
						}
					}else{
						_self.$api.msg("微信登录失败");
					}
				})
			},
			checkWeChatUser(data){
				var _self = this;
				Api.methods.checkWeChatUser(data.authResult).then(res => {
					if(res.data.code == 200){
						if(res.data.user == null){
							_self.$api.msg("微信登录失败");
						}else{
							res.data.user.token=res.data.token
							_self.login(res.data.user)
							var route=getCurrentPages()[0].route
							if(route ==='pages/public/login'){
								uni.switchTab({
									url: `/pages/index/index`
								})
							}else if(route ==='pages/cart/cart'){
								uni.switchTab({
									url: `/pages/cart/cart`
								})
							}else{
								uni.navigateBack();
							}
						}
						
					}else{
						_self.$api.msg("微信登录失败");
					}
					
				})
			},
		},

	}
</script>

<style lang="scss">
	@import "pages/public/login.scss";
</style>
