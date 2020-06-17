<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">REGISTER</view>
			<view class="welcome">
				欢迎注册！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input 
						type="number" 
						:value="mobile" 
						placeholder="请输入手机号码"
						maxlength="11"
						data-key="mobile"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input 
						type="mobile" 
						value="" 
						placeholder="8-18位不含特殊字符的数字、字母组合"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">验证码</text>
					<input 
						type="input" 
						value="" 
						placeholder="请输入验证码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="code"
						@input="inputChange"
					/>
					
					<img id="ImagePic"  v-bind:src="vCode" alt="" @click="updateImgCode">
				</view>
				<view class="input-item">
					<text class="tit">短信验证码</text>
					<input 
						type="input" 
						value="" 
						placeholder="请输入验证码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="code"
						@input="inputChange"
					/>
					<view class="codeimg" @tap="getsmscode">{{smsbtn.text}}</view>
				</view>
			</view>
			<button class="confirm-btn" @click="register" :disabled="logining">注册</button>
			
		</view>
		<view class="register-section">
			我已有账号
			<text @click="toLogin">去登陆</text>
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

<style lang='scss'>
	@import "common/scss/public/register.scss"; 
	.codeimg {
		position: absolute;
		right: calc(10%);
		height: 60upx;
		width: 240upx;
		font-size: 28rpx;
		z-index: 999;
		width: 200rpx;
		text-align: center;
		color: #353535;
		background: #f8f6fc;
		border-top-right-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
</style>
