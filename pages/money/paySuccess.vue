<template>
	<view class="content">
		<text v-if="orderInfo.status === 1" class="success-icon yticon icon-xuanzhong2"></text>
		<text v-if="orderInfo.status === 1" class="tit">支付成功</text>
		
		<text v-if="orderInfo.status === 0" class="success-icon yticon icon-xuanzhong"></text>
		<text v-if="orderInfo.status === 0" class="tit">支付失败</text>
		
		<view class="btn-group">
			<navigator :url="detailsUrl+orderSn" open-type="redirect" class="mix-btn">查看订单</navigator>
			<navigator url="/pages/index/index" open-type="switchTab" class="mix-btn hollow">返回首页</navigator>
		</view>
	</view>
</template>

<script>
	import Api from 'common/js/model.js';
	export default {
		data() {
			return {
				detailsUrl:"/pages/order/details?orderSn=",
				orderSn:"",
				orderInfo:{
					
				}
			}
		},
		onLoad(option) {
			this.orderSn=option.orderSn;
			this.getOrderInfo();
		},
		methods: {
			getOrderInfo(){
				var _self =this;
				Api.methods.getOrderInfo({"orderSn":_self.orderSn}).then(function(res){
					var result=res.data
					if(result.code === 200){
						_self.orderInfo=result.data
					}else{
						_self.$api.msg("订单信息获取失败")
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.success-icon{
		font-size: 160upx;
		color: #fa436a;
		margin-top: 100upx;
	}
	.tit{
		font-size: 38upx;
		color: #303133;
	}
	.btn-group{
		padding-top: 100upx;
	}
	.mix-btn {
		margin-top: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600upx;
		height: 80upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		&.hollow{
			background: #fff;
			color: #303133;
			border: 1px solid #ccc;
		}
	}
</style>
