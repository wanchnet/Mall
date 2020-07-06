<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{orderInfo.totalAmount - orderInfo.rechargecardAmount}}</text>
			
		</view>

		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<!-- <text>推荐使用微信支付</text> -->
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
					<text v-if="orderInfo.rechargecardAmount > 0">已使用余额抵扣 ¥{{orderInfo.rechargecardAmount}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			<!-- #endif-->

			<view v-if="orderInfo.totalAmount <= userInfo.balance2" class="type-item b-b" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥{{userInfo.balance2}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view>
			<!-- #ifndef APP-PLUS -->
			<view v-if="userInfo.balance2 > 0 && orderInfo.totalAmount > userInfo.balance2" class="type-item b-b" @click="changePayType(4)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">组合支付</text>
					<text>使用预存款¥{{userInfo.balance2}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 4' />
					</radio>
				</label>
			</view>
			<!-- #endif -->
			<!--#ifndef MP-WEIXIN -->
			<view v-if="userInfo.balance2 > 0 && orderInfo.totalAmount > userInfo.balance2" class="type-item b-b" @click="changePayType(5)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">组合支付</text>
					<text>使用预存款¥{{userInfo.balance2}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 5' />
					</radio>
				</label>
			</view>
			<!-- #endif -->

		</view>

		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>
	import Api from 'common/js/model.js';
	import {mapState} from 'vuex';
	import {mapMutations} from 'vuex';
	import store from 'store/index';
	export default {
		data() {
			
				//#ifdef H5
				return {
					payType: 1,
					orderInfo: {},
				};
				//#endif
				//#ifdef APP-PLUS
				return {
					payType: 2,
					orderInfo: {},
				};
				//#endif
				
		},
		
		onLoad(options) {
			this.orderSn = options.orderSn;
		},
		onShow() {
			this.loadUserInfo();
			var _self = this;
			var orderSn = this.orderSn
			if (orderSn) {
				Api.methods.getOrderInfo({
					"orderSn": orderSn
				}).then(function(res) {
					var result = res.data;
					if (result.code === 200) {
						_self.orderInfo = result.data;
						if (result.data.status !== 0) {
							uni.navigateTo({
								url: '/pages/order/order?state=0'
							})
						}
					} else {
						_self.$api.msg('支付信息获取失败')
					}
				})
			} else {
				uni.navigateTo({
					url: '/pages/order/order?state=0'
				})
			}

		},
		computed:{
					...mapState(['hasLogin','userInfo'])
				},
		methods: {
			...mapMutations(['login','logout']),
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirm: async function() {
				var _self = this;
				var param = {
					"orderSn": _self.orderInfo.orderSn,
					"isgift": false
				}
				if (_self.payType === 1) {

					//#ifdef H5
					Api.methods.wxH5Pay(param).then(function(res) {
						var url = res.data.data
						window.location.href = url
					})
					//#endif

					//#ifdef MP-WEIXIN
					Api.methods.wxAppletsPay(param).then(function(res) {
						console.log(res)
					})
					//#endif
					// #ifdef APP-PLUS
					Api.methods.wxAppPay(param).then(function(res) {
						var result=res.data
						if(result.code ==200){
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: result.data,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									uni.redirectTo({
										url: '/pages/money/paySuccess?orderSn='+_self.orderInfo.orderSn
									})
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									uni.redirectTo({
										url: '/pages/money/paySuccess?orderSn='+_self.orderInfo.orderSn
									})
								}
							});
						}
					})
					// #endif

				} else if (_self.payType === 2) {
					//#ifdef H5
					window.location.href = 'https://www.taohuatannj.com/mallApi/payCenter/alipay/intercept/wapPay?orderSn=' + _self.orderInfo
						.orderSn + '&isgift=false'
					//#endif

					//#ifdef APP-PLUS
					
					Api.methods.AliAppPay(param).then(function(res){
						var result=res.data
						console.log(res.data)
						if(result.code ==200){
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: result.data, //微信、支付宝订单数据
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									uni.redirectTo({
										url: '/pages/money/paySuccess?orderSn='+_self.orderInfo.orderSn
									})
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									uni.redirectTo({
										url: '/pages/money/paySuccess?orderSn='+_self.orderInfo.orderSn
									})
								}
							});
						}
					})
					
					//#endif
				} else if (_self.payType === 3) {
					Api.methods.giftPay(param).then(function(res) {
						if (res.data.code === 200) {
							uni.redirectTo({
								url: '/pages/money/paySuccess?orderSn='+_self.orderInfo.orderSn
							})
						} else {
							_self.$api.msg('支付失败')
						}
					})
				} else if (_self.payType === 4) {
					param.isgift = true
					Api.methods.wxH5Pay(param).then(function(res) {
						var url = res.data.data;
						window.location.href = url;
					})
				} else if (_self.payType === 5) {
					//#ifdef H5 
					window.location.href = 'https://www.taohuatannj.com/mallApi/payCenter/alipay/intercept/wapPay?orderSn=' + _self.orderInfo
						.orderSn + '&isgift=true'
					//#endif
					//#ifdef APP-PLUS
					param.isgift = true
					Api.methods.AliAppPay(param).then(function(res){
						var result=res.data
						if(result.code ==200){
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: result.data, //微信、支付宝订单数据
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									uni.redirectTo({
										url: '/pages/money/paySuccess?orderSn='+_self.orderInfo.orderSn
									})
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									uni.redirectTo({
										url: '/pages/money/paySuccess?orderSn='+_self.orderInfo.orderSn
									})
								}
							});
						}
					})
					//#endif
				}

			},
			loadUserInfo(){
				var _self=this;
				Api.methods.loadUserInfo().then(function(res){
					if(res.data.code===200){
						_self.login(res.data.data)
					}else{
						_self.logout()
					}
				})
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.icon {
			width: 100upx;
			font-size: 52upx;
		}

		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}

		.icon-weixinzhifu {
			color: #36cb59;
		}

		.icon-alipay {
			color: #01aaef;
		}

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}

	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
