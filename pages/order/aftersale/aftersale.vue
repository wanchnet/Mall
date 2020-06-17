<template>
	<view style="background-color: rgb(248, 248, 248); height: 100%;">
		<view class="goods-section">
			<!-- <view class="g-header b-b">
				<image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"></image>
				<text class="name">桃花潭商城</text>
			</view> -->
			<!-- 商品列表 -->
			<view class="g-item" v-for="(item, index) in orderInfo.items" :key="index">
				<image :src="encodeURI(item.productPic)"></image>
				<view class="right">
					<!-- <text class="title clamp">{{item.productName}}</text>
					<text class="spec">{{item.sp1}} {{item.sp2}}</text>
					<view class="price-box">
						<text class="price">￥{{item.productPrice}}</text>
						<text class="number">x {{item.productQuantity}}</text>
					</view> -->
					
					<view class="" style="">
						<text style="font-size: 28rpx; font-weight: bolder;">{{item.productName}}</text>
					</view>
					<view class="" style="margin-top: 20rpx;">
						<text style="float: left; font-size: 28rpx; font-weight: bolder;">{{item.sp1}} {{item.sp2}}</text>
						<text style="float: right; margin-right: 15rpx; font-size: 28rpx; font-weight: bolder;">x {{item.productQuantity}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 退款原因 -->
		<view style="background-color: #FFFFFF; margin-top: 20rpx;">
			<cmd-cell-item title="退货原因:" :addon="returnReason"  @click="togglePopup('center', 'reasons')" arrow/>
		</view>
		<!-- 退款金额 -->
		<view style="background-color: #FFFFFF; margin-top: 10rpx; height: 100rpx; padding-left: 25rpx;">
			<!-- <text class="title">退款金额:</text><text class="fuhao">￥</text><input type="number" class="amount-input" :value="orderInfo.omsOrder.totalAmount" data-key="returnAmount" @input="inputChange"/> -->
			<text style="line-height: 100rpx; font-size: 28rpx; float: left;">
				<span>退款金额：</span>
				<span style="font-size: 10rpx;color:#ED1C24;font-weight: bold;">￥</span>
				<span style="font-size: 28rpx; color:#ED1C24;font-weight: bold;">{{orderInfo.omsOrder.totalAmount}}</span>
			</text>
		</view>
		<!-- 退款说明 -->
		<view style="background-color: #FFFFFF; margin-top: 10rpx;height: 200rpx; padding-left: 25rpx;">
			<!-- <text class="title">退款说明:</text><input class="desc-input" :value="description" placeholder="选填" data-key="description" @input="inputChange"/> -->
			<text style="line-height: 100rpx; font-size: 28rpx; float: left;">
				<span>退款说明：</span>
			</text>
			<textarea style="float: left; width: 70%; height: 150rpx; margin-top: 30rpx; font-size: 28rpx;" :value="description" placeholder="选填" data-key="description" @input="inputChange" />
		</view>
		<!-- 注意提醒 -->
		<view class="note-div" style="padding-top: 20rpx;">
			<text class="note" style="font-size: 20rpx; ">
				注意:
				  1、所有售后申请请先与客服沟通
				  2、按照沟通结果填写售后申请单
				  3、填写完申请单后请联系客服处理后续事宜
			</text>
		</view>
		<button class="btn" style="width: 70%;" @click="applyReturnApply">提交</button>
		<view style="text-align: center;">
			<text style="font-size: 20rpx; color: #909399; ">联系客服</text>
		</view>
		
		<uni-popup ref="reasons" :type="type" :custom="true" :mask-click="true">
			<view class="uni-tip">
				<view class="uni-tip-title">退货原因</view>
				<radio-group class="radio-group"  bindchange="radioChange" @change="upTempReason">
					<label class="radio" v-for="(item, index) in reasonList" :key="index">
						{{item.name}}<radio :value= "item.name"/>
					</label>
					
				</radio-group>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="upReason">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Api from '@/common/js/model.js';
	import { mapState } from 'vuex';
	import { mapMutations} from 'vuex';
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			cmdCellItem,
			uniPopup
		},
		data() {
			return {
				show: false,
				type: '',
				returnAmount:0,
				description:"",
				tempReason:"",
				returnReason:"请选择",
				orderSn:"",
				orderInfo:{
					omsOrder:{
						status:0,
						totalAmount:0
					},
				},
				reasonList:[
					
				]
			};
		},
		onLoad(option) {
			this.orderSn=option.orderSn;
			this.loadOrderInfo();
			this.getReturnReasonList();
		},
		onShow() {
			this.loadUserInfo()
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		methods:{
			...mapMutations(['login','logout']),
			test(){
				uni.navigateTo({
					url:'../saleservice'
				})
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			upReason(){
				if(this.tempReason){
					this.returnReason=this.tempReason;
				}else{
					this.returnReason="请选择";
				}
				this.cancel('reasons')
			},
			upTempReason(event){
				this.tempReason=event.detail.value
			},
			loadOrderInfo(){
				var _self=this;
				Api.methods.getOrderDetails({"orderSn":_self.orderSn}).then(function(res){
					var result=res.data;
					if(result.code === 200){
						_self.orderInfo = result.data
					}else{
						_self.$api.msg("订单信息获取失败，请重试")
					}
				})
			},
			loadUserInfo(){
				var _self=this;
				Api.methods.loadUserInfo().then(function(res){
					if(res.data.code===200){
						_self.login(res.data.data);
						//_self.userInfo=res.data.data;
						_self.tempGender=res.data.data.gender
						_self.tempName=res.data.data.username
					}else{
						_self.logout()
						uni.navigateTo({
							url :'/pages/public/login'
						})
					}
				})
			},
			getReturnReasonList(){
				var  _self=this
				Api.methods.getReturnReasonList().then(function(res){
					var result=res.data;
					if(result.code === 200){
						_self.reasonList = result.data
					}else{
						_self.$api.msg("获取信息失败，请稍后重试")
					}
				})
			},
			togglePopup(type, open) {
				this.type = type
				if (open === 'tip') {
					this.show = true
				} else {
					this.$refs[open].open()
				}
			},
			cancel(type) {
				if (type === 'tip') {
					this.show = false
					return
				}
				this.$refs[type].close()
			},
			applyReturnApply(){
				var _self=this;
				if(_self.returnReason === "请选择"){
					_self.$api.msg("请选择退货原因");
					return false;
				}
				if(_self.returnAmount < 0){
					_self.$api.msg("退款金额不能小于0");
					return false;
				}
				var param={"productId":_self.orderInfo.items[0].productId, "orderSn":_self.orderSn,"returnAmount":_self.returnAmount,"reason":_self.returnReason,"description":_self.description}
				Api.methods.applyReturnApply(param).then(function(res){
					var result = res.data;
					if(result.code === 200){
						_self.$api.msg("申请成功，请联系客服处理后续事宜")
						setTimeout(function() {
							uni.navigateTo({
								url:"/pages/order/order?state=0"
							})
						}, 1000);
					}else{
						_self.$api.msg("操作失败，请重试！！！")
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "@/common/scss/order/details.scss";
	.uni-page-head{
		background-color: rgb(248, 248, 248);
	}
	.note-div{
		position: relative;
		left: 40upx;
		height: 300upx;
	}
	.note{
		color: #909399;
		font-size: 28upx;
		
	}
	.title{
		-webkit-box-flex: 1;
		-webkit-flex: 1 1 0%;
		-ms-flex: 1 1 0%;
		flex: 1 1 0%;
		color: #111A34;
		font-size: 32upx;
		line-height: 1.2;
		left: 22upx;
		position: relative;
	}
	.amount-input{
		position: relative;
		top: -44upx;
		left: 200upx;
		color: #ec9222;
	}
	.desc-input{
		position: relative;
		top: -44upx;
		left: 200upx;
		
	}
	.fuhao{
		margin-top: 0px;
		margin-left: 13px;
		font-size: 14px;
		color: #ec9222;
	}
	.btn{
		height: 66upx;
		line-height: 66upx;
		border-radius: 100upx;
		background: $uni-color-primary;
		font-size: $font-base + 2upx;
		color: #fff;
		margin: 30upx auto 20upx;
		bottom: 10upx;
		background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
	}
	/* 提示窗口 */
		.uni-tip {
			padding: 15px;
			width: 300px;
			background: #fff;
			box-sizing: border-box;
			border-radius: 10px;
		}
	
		.uni-tip-title {
			text-align: center;
			font-weight: bold;
			font-size: 16px;
			color: #333;
		}
	
		.uni-tip-content {
			padding: 15px;
			font-size: 14px;
			color: #666;
		}
	
		.uni-tip-group-button {
			margin-top: 10px;
			display: flex;
		}
	
		.uni-tip-button {
			width: 100%;
			text-align: center;
			font-size: 14px;
			color: #3b4144;
		}
		
		radio-group{
		  // display: flex;
		  // align-items: center;
		  // min-height: 100upx;
		  // margin-left: calc(50% - 120upx);
		}
		 radio-group .radio{
		  //margin-left: 20rpx;
		  min-height: 60upx;
		  display: block;
		}
		 radio-group radio{
		  //margin-left: 10rpx;
		  position: absolute;
		  right: 40upx;
		}
</style>
