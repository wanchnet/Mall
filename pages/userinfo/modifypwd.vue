<template>
	<view class="container">
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="input-content">
				<view class="input-item">
					<text class="tit">旧密码</text>
					<input 
						type="text" 
						value="" 
						placeholder="请输入旧密码"
						maxlength="18"
						data-key="oldpwd"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">新密码</text>
					<input 
						type="text" 
						value="" 
						placeholder="8-18位不含特殊字符的数字、字母组合"
						placeholder-class="input-empty"
						maxlength="18"
						password 
						data-key="password"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">重复密码</text>
					<input 
						type="text" 
						value="" 
						placeholder="请再输入一次"
						placeholder-class="input-empty"
						maxlength="18"
						password 
						data-key="confirmpwd"
						@input="inputChange"
					/>
				</view>
			</view>
			<button class="confirm-btn" @click="modify" :disabled="logining">修改</button>
			
		</view>
	</view>
</template>

<script>
	import {
	    mapMutations  
	} from 'vuex';
	import {mapState} from 'vuex';
	import Api from '@/common/js/model.js';
	
	export default{
		data(){
			return {
				oldpwd:'',
				password: '',
				confirmpwd:'',
				logining:false
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onLoad(){
			// if(this.hasLogin){
			// 	uni.switchTab({
			// 		url: `/pages/index/index`
			// 	})
			// }
		},
		methods: {
			...mapMutations(['login','logout']),
			
			toLogin(){
				uni.navigateTo({
					url:'../public/login'
				})
			},
			navBack(){
				uni.navigateBack();
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			loadUserInfo(){
				var _self=this;
				Api.methods.loadUserInfo().then(function(res){
					if(res.data.code===200){
						_self.login(res.data.data);
					}else{
						_self.logout()
						uni.navigateTo({
							url :'/pages/user/user'
						})
					}
				})
			},
			modify(){
				var _self=this;
				if(!_self.inputInvalide()){
					return false;
				}
				
				var param={"oldPassword":_self.oldpwd,"newPassword":_self.password}
				Api.methods.upPwd(param).then(function(res){
					if(res.data.res === -1){
						_self.$api.msg(res.data.msg)
					}else{
						_self.$api.msg("密码修改成功")
						_self.toLogin();
					}
				})
			},
			inputInvalide(){
				var _self=this
				if(_self.oldpwd.length === 0){
					this.$api.msg('请输入旧密码！');
					return false;
				}
				if(_self.password.length === 0){
					this.$api.msg('请输入密码！');
					return false;
				}
				if(_self.confirmpwd.length === 0){
					this.$api.msg('请输入确认密码！');
					return false;
				}
				if(_self.password !== _self.confirmpwd){
					this.$api.msg('两次密码输入不同！');
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
