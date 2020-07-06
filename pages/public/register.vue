<template>
	<view class="content">
		<view class="first">
			<text class="lo-text">注册</text>
			<view class="lo-color"></view>
			<text class="re-text">欢迎注册！</text>
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
					placeholder="8-18位不含特殊字符的数字字母组合" 
					maxlength="20"
					password 
					data-key="password"
					@input="inputChange"
					/>
				</view>
			</view>
			<view class="yzm">
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
						/>
					</view>		
				</view>
				<view class="yzm-right">
					<img class="yzm-img" v-bind:src="vCode" alt="" @click="updateImgCode">
				</view>
			</view>
			<view class="yzm">
				<view class="yzm-left">
					<view class="image">
						<image src="../../static/icon/msg.png" class="svg-icon" mode="aspectFill"></image>
					</view>
					<view class="yzm-input">
						<input 
						type="text" 
						value="" 
						style="font-size: 28rpx; width: 250rpx; height: 80rpx;" 
						placeholder="请输入短信验证码" 
						maxlength="20" 
						data-key="code"
						@input="inputChange"
						/>
					</view>		
				</view>
				<view class="yzm-right">
					<text class="yzm-text" @tap="getsmscode">{{smsbtn.text}}</text>
				</view>
			</view>
			<button class="submit" @click="register">
				<text class="submit-text" :disabled="logining">注册</text>			
			</button>
			<view class="forget-psd">
				<text class="forget-text" @click="toLogin">我已有帐号，<span style="color: rgb(249, 117, 143);">去登录</span></text>			
			</view>
			<!-- <view class="wechat">
				<text class="wechat-text">
					<text class="line">—————</text> 
					第三方登录
					<text class="line">—————</text>
				</text>	
				<view class="wechat-img">
					<image class="img" src="../../static/wechat.png" mode="aspectFit"></image>
				</view>
			</view> -->
			
			
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
				smsbtn: {
					text: '获取验证码',
					status: false,
					codeTime: 60,
					loading: false,
				},
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onLoad(){
			if(this.hasLogin){
				uni.switchTab({
					url: `/pages/index/index`
				})
			}
			var _self=this;
			_self.updateImgCode()
		},
		methods: {
			...mapMutations(['login']),
			updateImgCode(){
				var _self = this
				Api.methods.getImgCode().then(function(res){
					_self.vCode=res.data.data.base64;
					_self.token=res.data.data.token;
				})
			},
			toLogin(){
				var url ='login'
				uni.navigateTo({
					url
				})
				
			},
			//直接登录cspan
			directLogin(){
				var _self = this;
				var params={"phone":_self.mobile,"token":_self.token}
				Api.methods.directLogin(params).then(res =>{
					if(res.data.res==1){
						res.data.user.token = res.data.token
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
					}else{
						_self.toLogin()
					}
				})
				/* var url ='login'
				uni.navigateTo({
					url: url +'?phone=' + _self.mobile+'&password='+_self.password
				}) */
			},
			navBack(){
				uni.navigateBack();
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			getsmscode: function() {
				var _self=this;
				if (this.smsbtn.status == true ) {
					this.$api.msg("别着急！短信已经发送了~");
					return false;
				}
				if(!_self.inputInvalide()){
					return false;
				}
				this.smsbtn.status = true; // 这段代码其实应该加在你request请求 短信发送成功后 
				this.smsbtn.loading = true;
				Api.methods.checkImgCode({"token":_self.token,"phone":_self.mobile,"code":_self.code}).then(function(res){
					if(res.data.res === -1){
						_self.$api.msg(res.data.msg)
						_self.smsbtn.loading = false;
					}
				})
				this.timerId = setInterval(() => {
						var codeTime = this.smsbtn.codeTime;
						codeTime--;
						this.smsbtn.codeTime = codeTime;
						this.smsbtn.text = codeTime + "S";
						
						if (codeTime < 1 || !this.smsbtn.loading) {
							clearInterval(this.timerId);
							this.smsbtn.text = "重新获取";
							this.smsbtn.codeTime = 60;
							this.smsbtn.status = false;
							_self.smsbtn.loading = false;
						}
					},
					1000);
				return false;
			},
			register(){
				var _self=this;
				if(!_self.inputInvalide()){
					return false;
				}
				
				var param={"phone":_self.mobile,"password":_self.password,"code":_self.code}
				Api.methods.register(param).then(function(res){
					if(res.data.res === -1){
						_self.$api.msg(res.data.msg)
						
					}else{
						// uni.setStorageSync("token",res.data.token);
						_self.$api.msg("注册成功")
						_self.directLogin();
					}
				})
			},
			inputInvalide(){
				var _self=this///^1(3|4|5|6|7|8|9)\d{9}$/
				// if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(_self.mobile)){
				if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(_self.mobile)){
					this.$api.msg('请输入正确的手机号码');
					return false;
				}
				if(_self.password.length === 0){
					this.$api.msg('请输入密码！');
					return false;
				}
				if(_self.password.length<8){
					this.$api.msg('密码长度不能低于8位！');
					return false;
				}
				if(_self.password.length>18){
					this.$api.msg('密码长度不能高于18位！');
					return false;
				}
				if(/^[\u0391-\uFFE5]+$/.test(_self.password)){
					this.$api.msg('密码不可输入中文！');
					return false;
				}
				if(/^[a-zA-Z]|[0-9]\w{8,18}$/.test(_self.password)){
					if(/^[a-zA-Z]{6,}$/.test(_self.password)){
						this.$api.msg('密码不可全为字母！');
						return false;
					}
					if(/^[0-9]{6,}$/.test(_self.password)){
						this.$api.msg('密码不可全为数字！');
						return false;
					}
				}
				if(this.code.length === 0){
					this.$api.msg('请输入验证码');
					return false;
				}
				return true;
			}
		},
	}
</script>

<style lang="scss">
	@import "pages/public/register.scss"; 
</style>
