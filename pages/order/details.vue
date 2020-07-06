<template>
	<view class="body">
		<view class="header">
			<view v-if="orderInfo.omsOrder.status === 0" class="order-status">
				<text>等待买家付款</text>
				<image src="../../static/image/order_waitpay.jpg"></image>
			</view>
			<view v-if="orderInfo.omsOrder.status === 1" class="order-status">
				<text>等待商家发货</text>
				<image src="../../static/image/order_fahuo.jpg"></image>
			</view>
			<view v-if="orderInfo.omsOrder.status === 2" class="order-status">
				
				<text>等待买家收货</text>
				<image src="../../static/image/order_fahuo.jpg"></image>
			</view>
			<view v-if="orderInfo.omsOrder.status === 3" class="order-status">
				<text>订单已完成</text>
				<image src="../../static/image/order_success.jpg"></image>
			</view>
			<view v-if="orderInfo.omsOrder.status === 4" class="order-status">
				<text>订单已关闭</text>
				<image src="../../static/image/order_closed.jpg"></image>
			</view>
		</view>
		<navigator url="/pages/address/address?source=1" class="address-section">
			<view class="order-content">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen">
					<view class="top">
						<text class="name">{{orderInfo.omsOrder.receiverName}}</text>
						<text class="mobile">{{orderInfo.omsOrder.receiverPhone}}</text>
					</view>
					<text class="address">{{orderInfo.omsOrder.receiverProvince}} {{orderInfo.omsOrder.receiverCity}} {{orderInfo.omsOrder.receiverRegion}} {{orderInfo.omsOrder.receiverDetailAddress}}</text>
				</view>
			</view>
		</navigator>
		
		<view class="goods-section">
			<view class="g-header b-b">
				<image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"></image>
				<text class="name">万诚小店</text>
			</view>
			<!-- 商品列表 -->
			<view class="g-item" v-for="(item, index) in orderInfo.items" :key="index">
				<image :src="encodeURI(item.productPic)"></image>
				<view class="right">
					<text class="title clamp">{{item.productName}}</text>
					<text class="spec">{{item.attr}} </text>
					<view class="price-box">
						<text class="price">￥{{item.productPrice}}</text>
						<text class="number">x {{item.productQuantity}}</text>
					</view>
				</view>
			</view>
			<!--付款-->
			<view class="pay-info" v-if="orderInfo.omsOrder.rechargecardAmount > 0">
				<text v-if="orderInfo.omsOrder.status == 0" class="pay-name">余额支付(取消返还)</text>
				<text v-if="orderInfo.omsOrder.status != 0" class="pay-name">余额支付&emsp;</text>
				<text class="pay-value">￥{{orderInfo.omsOrder.rechargecardAmount}}</text>
			</view>
			<view class="pay-info" v-if="orderInfo.omsOrder.payAmount > 0">
				<text v-if="orderInfo.omsOrder.payType ==1" class="pay-name">支付宝支付</text>
				<text v-if="orderInfo.omsOrder.payType ==2" class="pay-name">微信支付&emsp;</text>
				<text class="pay-value">￥{{orderInfo.omsOrder.payAmount}}</text>
			</view>
			<view class="operation">
				<view class="action-box b-t">
					<button class="action-btn" v-if="orderInfo.omsOrder.status === 0" @click="cancelOrder(orderInfo)">取消订单</button>
					<button class="action-btn recom" v-if="orderInfo.omsOrder.status === 0" @click="toPay(orderInfo.omsOrder.orderSn)">立即支付</button>
					<button class="action-btn recom" v-if="orderInfo.omsOrder.status === 2" @click="confirmReceipt(orderInfo)">确认收货</button>
					<button class="action-btn recom" v-if="orderInfo.omsOrder.status === 2 || orderInfo.omsOrder.status === 3" @click="confirmReceipt(orderInfo.omsOrder.id)">申请售后</button>
				</view>
			</view>
		</view>

		<view class="example-title">订单信息</view>
		<uni-list>
			<uni-list-item :show-arrow="false" title="订单编号" :note="orderInfo.omsOrder.orderSn ||'暂无'" />
			<uni-list-item :show-arrow="false" title="物流单号" :note="orderInfo.omsOrder.deliverySn  ||'暂无'" />
			<uni-list-item :show-arrow="false" title="创建时间" :note="orderInfo.omsOrder.createTime|time" />
			<uni-list-item :show-arrow="false" title="付款时间" :note="orderInfo.omsOrder.paymentTime|time" />
			<uni-list-item :show-arrow="false" title="发货时间" :note="orderInfo.omsOrder.deliveryTime|time" />
		</uni-list>
	</view>
</template>

<script>
	import Api from '@/common/js/model.js';
	import { mapState } from 'vuex';
	import { mapMutations} from 'vuex';
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				orderSn:"",
				orderInfo:{
					omsOrder:{
						status:0
					},
				}
			};
		},
		onLoad(option) {
			this.orderSn=option.orderSn;
			this.loadOrderInfo();
		},
		filters: {
			time: function time(value) {
				if(!value){
					return '暂无'
				}
				var year = value.substr(0, 4)
				var month = value.substr(5, 2)
				var day = value.substr(8, 2)
				var hour = value.substr(11, 2)
				var min = value.substr(14, 2)
				var seconds = value.substr(17, 2)
				return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + seconds;
			},
			isEmpty:function isEmpty(value){
				if(value){
					return value;
				}else{
					return "";
				}
			}
		},
		methods:{
			loadOrderInfo(){
				var _self=this;
				Api.methods.getOrderDetails({"orderSn":_self.orderSn}).then(function(res){
					var result=res.data;
					if(result.code === 200){
						_self.orderInfo = result.data
						_self.orderInfo.items.forEach(item =>{
							let attr = JSON.parse(item.productAttr)
							item.attr = ''
							for(var i =0;i<attr.length;i++){
								item.attr += attr[i].value+" "
							}
						})
					}else{
						_self.$api.msg("订单信息获取失败，请重试")
					}
				})
			},
			//删除订单
			deleteOrder(item,index){
				var _self=this;
				uni.showLoading({
					title: '请稍后'
				})
				Api.methods.deleteOrder({"orderId":item.omsOrder.id}).then(function(res){
					if(res.data.code === 200){
						_self.navList[_self.tabCurrentIndex].orderList.splice(index, 1);
					}else{
						_self.$api.msg("删除失败")
					}
					uni.hideLoading();
				})
			},
			//取消订单
			cancelOrder(item){
				var _self=this;
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(()=>{
					Api.methods.cancelOrder({"orderId":item.omsOrder.id}).then(function(res){
						//uni.hideLoading();
						if(res.data.code === 200){
							//取消订单后删除待付款中该项
							_self.navTo('/pages/order/order?state=0')
						}else{
							_self.$api.msg("取消失败")
						}
						
					})
					
				}, 600)
			},
			toPay(orderSn){
				uni.redirectTo({
					url: '/pages/money/pay?orderSn='+orderSn
				})
			},
			confirmReceipt(item){
				var _self=this;
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(()=>{
					Api.methods.confirmReceipt({"orderId":item.omsOrder.id}).then(function(res){
						uni.hideLoading();
						if(res.data.code === 200){
							//取消订单后删除待付款中该项
							item.omsOrder.status = 3
						}else{
							_self.$api.msg("操作失败")
						}
					})
				}, 600)
			},
			navTo(url){
				if(!this.hasLogin){
					url = '/pages/public/login';
				}
				uni.navigateTo({  
					url
				})  
			},
		}
	}
</script>

<style lang="scss">
	@import "@/common/scss/order/details.scss";
	.body{
		background: #f4f4f4;
	}
	.header{
		height: 200upx;
		background:url('../../static/image/detail_header.jpg') no-repeat 0px 0px;
		.order-status{
			text{
				position: absolute;
				top: 80upx;
				left: 60upx;
				font-size: 32upx;
				color: rgba(255,255,255,1);
			}
			image{
				position: absolute;
				top: 10upx;
				right: 60upx;
				width: 300upx;
				height: 200upx;
			}
			
		}
	}
	.order-info{
		margin-top: 20upx;
		background: #fff;
		.info-title{
			position: relative;
			left: 30upx;
			font-size: 28upx;
		}
		.p-row{
			position: relative;
			left: 40upx;
			min-height: 50upx;
			.p-name{
				display: block;
				color: #908181;
				font-size: 20upx;
				min-width: 150upx;
				float: left;
				margin-top: 15upx;
			}
			.p-value{
				display: block;
				color: black;
				float: left;
				font-size: 20upx;
				margin-top: 15upx;
			}
		}
		
	}
	.operation{
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $base-color;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
	}
	
	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}
	
	.example-title__after {
		position: relative;
		color: #031e3c
	}
	
	.example-title:after {
		content: '';
		position: absolute;
		left: 30upx;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 6upx;
		height: 32upx;
		background-color: #ccc
	}
	
	.example .example-title {
		margin: 40upx 0
	}
	
</style>
