<template>
	<view>
		<view class="block">
			<view class="title">
				我的账户
			</view>
			<view class="content">
				<view class="my">
					我的账户余额：{{userInfo.balance2}} 元
				</view>
			</view>
		</view>
		<view class="wrapper">
			<view class="left-top-sign">RECHARGE</view>
			<!-- <view class="welcome">
				欢迎回来！
			</view> -->
			<view class="input-content">
				<view class="input-item">
					<text class="tit">充值卡号码</text>
					<input 
						type="number" 
						:value="cardNum" 
						placeholder="充值卡号码"
						maxlength="20"
						data-key="cardNum"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">充值卡密码</text>
					<input 
						type="password" 
						:value="passwd" 
						placeholder="请输入充值卡密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="passwd"
						@input="inputChange"
						@confirm="recharge"
					/>
				</view>
			</view>
			<button class="confirm-btn" @click="recharge" :disabled="logining">充值</button>
		</view>
	</view>
</template>

<script>
	import Api from 'common/js/model.js';
	import {mapState} from 'vuex'; 
	import { mapMutations} from 'vuex';
	export default {
		data() {
			return {
				passwd:"",
				cardNum:"",
				logining: false,
				userInfo:{
					balance2:0
				}
			};
		},
		onLoad() {
			
		},
		onShow(){
			this.loadUserInfo()
		},
		methods: {
			...mapMutations(['login','logout']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			loadUserInfo(){
				var _self=this
				Api.methods.loadUserInfo().then(function(res){
					if(res.data.code===200){
						_self.login(res.data.data)
						_self.userInfo=res.data.data;
					}else{
						_self.logout();
						uni.navigateTo({
							url: '/pages/notice/notice'
						})
					}
				})
			},
			//充值
			recharge(){
				var _self=this
				Api.methods.recharge({"cardNumber":_self.cardNum,"password":_self.passwd}).then(function(res){
					var result = res.data.data;
					_self.$api.msg(result.msg)
					if(result.res === 1){
						_self.loadUserInfo()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.block{
		width: 94%;
		padding: 20upx 3%;
		.title{
			width: 100%;
			font-size: 34upx;
		}
		.content{
			.my{
				width: 100%;
				height: 120upx;
				display: flex;
				align-items: center;
				font-size: 30upx;
				border-bottom: solid 1upx #eee;
			}
			.amount{
				width: 100%;
				
				.list{
					display: flex;
					justify-content: space-between;
					padding: 20upx 0;
					.box{
						width: 30%;
						height: 120upx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 10upx;
						box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.05);
						font-size: 36upx;
						background-color: #f1f1f1;
						color: 333;
						&.on{
							background-color: #f06c7a;
							color: #fff;
						}
					}
				}
				.num{
					margin-top: 10upx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					.text{
						padding-right: 10upx;
						font-size: 30upx;
					}
					.input{
						width: 28.2vw;
						border-bottom: solid 2upx #999;
						
						justify-content: flex-end;
						align-items: center;
						input{
							margin: 0 20upx;
							height: 60upx;
							font-size: 30upx;
							color: #f06c7a;
							justify-content: flex-end;
							align-items: center;
						}
					}
				}
			}
			.pay-list{
				width: 100%;
				border-bottom: solid 1upx #eee;
				.row{
					width: 100%;
					height: 120upx;
					display: flex;
					align-items: center;
					.left{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						align-items: center;
						image{
							width: 80upx;
							height: 80upx;
						}
					}
					.center{
						width: 100%;
						font-size: 30upx;
					}
					.right{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
		img#ImagePic {
			position: absolute;
			right: calc(10%);
			height: 60upx;
			width: 240upx;
		}
	}
	
	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
		background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	
</style>
