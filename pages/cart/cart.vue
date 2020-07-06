<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<!-- <image src="/static/emptyCart.jpg" mode="aspectFit"></image> -->
			<u-empty mode="car" text="空空如也" style="height: auto;"></u-empty>
			<view v-if="hasLogin" class="empty-tips">
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				<view class="navigator" @click="navToLogin" style="font-weight: bold;">去登录></view>
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view class="cart-item" :class="{'b-b': index!==cartList.length-1}">
						<view class="image-wrapper">
							<image :src="encodeURI(item.productPic)" 
								:class="['loaded']"
								mode="aspectFill" 
								lazy-load 
								@load="onImageLoad('cartList', index)" 
								@error="onImageError('cartList', index)"
							></image>
							<view 
								class="yticon icon-xuanzhong2 checkbox"
								:class="{checked: item.checked}"
								@click="check('item', index)"
							></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.productName}}</text>
							<text class="attr">{{item.attr}}</text>
							<view class="price-num">
								<u-row>
									<u-col span="7">
										<text class="price" style="color:#fa3534;font-weight: bold;">¥{{item.price}}</text>
									</u-col>
									<u-col span="5">
										<u-number-box 
										:input-width="50" 
										:input-height="40"
										:min="1"
										:value="item.quantity"
										:index="index"
										@change="numberChange"
										:size="20"
										:disabledInput="true"
										></u-number-box>
										<!-- <uni-number-box
											:min="1" 
											:max="item.stock"
											:value="item.quantity>item.stock?item.stock:item.quantity"
											:isMax="item.quantity>=item.stock?true:false"
											:isMin="item.quantity===1"
											:index="index"
											@eventChange="numberChange"
										></uni-number-box> -->
									</u-col>
								</u-row>
							</view>
							<!-- <text class="price">¥{{item.price}}</text>
							<uni-number-box 
								class="step"
								style="width: 120rpx;height: 32rpx;"
								:min="1" 
								:max="item.stock"
								:value="item.quantity>item.stock?item.stock:item.quantity"
								:isMax="item.quantity>=item.stock?true:false"
								:isMin="item.quantity===1"
								:index="index"
								@eventChange="numberChange"
							></uni-number-box> -->
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="bottom-bar">
				<u-row>
					<u-col span="4">
						<image class="check-img"
							:src="allChecked?'/static/selected.png':'/static/select.png'" 
							mode="aspectFit"
							@click="check('all')"
						></image>
						<view class="check-text">
							<text>全选</text>
						</view>
					</u-col>
					<u-col span="4">
						<text class="price" style="line-height: 100rpx;">
							合计：
							<text style="color: #fa3534;font-size: 30rpx; font-weight: bold;">¥{{total}}</text>
						</text>
					</u-col>
					<u-col span="4">
						<view style="text-align: center; margin: 20rpx 25rpx;width: 160rpx; height: 60rpx; background-color: #ff0844; border-radius: 60rpx;">
							<text style="color: #FFFFFF;font-size: 30rpx;font-weight: bold;line-height: 60rpx;" @click="createOrder">去结算</text>
						</view>
					</u-col>
				</u-row>
			</view>
			
<!-- 			<view class="action-section">
				<view class="checkbox">
					<image 
						:src="allChecked?'/static/selected.png':'/static/select.png'" 
						mode="aspectFit"
						@click="check('all')"
					></image>
					<text style="line-height: 100rpx ;">全选</text> -->
					<!-- <view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view> -->
			<!-- 	</view>
				<view class="total-box">
					<text class="price">合计：<span style="color: #fa3534; font-weight: bold;">¥{{total}}</span></text> -->
					<!-- <text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text> -->
<!-- 				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {
	    mapMutations  
	} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue'
	import Api from '@/common/js/model.js';
	export default {
		components: {
			uniNumberBox
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [], 
			};
		},
		onLoad(){
		},
		onShow(){
			this.loadUserInfo();
		},
		watch:{
			//显示空白页
			cartList(e){
				let empty = e.length === 0 ? true: false;
				if(this.empty !== empty){
					this.empty = empty;
				}
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			...mapMutations(['login','logout']),
			//请求数据
			async loadData(){
				var _self=this
				Api.methods.getCartList().then(function(res){
					let list = res.data.data
					let cartList = list.map(item=>{
						item.checked = true;
						if(item.productAttr){
							let attr = JSON.parse(item.productAttr)
							item.attr = ''
							for(var i =0;i<attr.length;i++){
								item.attr += attr[i].value+" "
							}
						}
						return item;
					});
					_self.cartList = cartList;
					_self.calcTotal();  //计算总价
				})
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			navToLogin(){
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			 //选中状态处理
			check(type, index){
				if(type === 'item'){
					this.cartList[index].checked = !this.cartList[index].checked;
				}else{
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item=>{
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data){
				var _self=this
				console.log(data)
				var id=_self.cartList[data.index].id
				var quantity = data.value
				var param={"id":id,"quantity":quantity}
				Api.methods.upCartNum(param).then(function(res){
					var result=res.data.data.res
					if(result === 1){
						_self.cartList[data.index].quantity = quantity;
						_self.calcTotal();
					}else{
						_self.$api.msg("修改失败")
					}
				})
				
			},
			//删除
			deleteCartItem(index){
				var _self=this
				let list = this.cartList;
				let row = list[index];
				let id = row.id;
				Api.methods.removeCartItem({"id":id}).then(function(res){
					var result=res.data.data.res;
					if(result ===1){
						_self.cartList.splice(index, 1);
						_self.calcTotal();
						uni.hideLoading();
					}
				})
				
			},
			//清空
			clearCart(){
				var _self=this;
				uni.showModal({
					content: '清空购物车？',
					success: (e)=>{
						if(e.confirm){
							Api.methods.clearCart().then(function(res){
								if(res.data.code === 200){
									_self.cartList = [];
								}else{
									_self.$api.msg(res.data.message)
								}
							})
							
						}
					}
				})
			},
			//计算总价
			calcTotal(){
				let list = this.cartList;
				if(list.length === 0){
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item=>{
					if(item.checked === true){
						total += item.price * item.quantity;
					}else if(checked === true){
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createOrder(){
				let list = this.cartList;
				let cartIds = [];
				list.forEach(item=>{
					if(item.checked){
						cartIds.push(item.id)
					}
				})

				uni.navigateTo({
					url: `/pages/order/createOrder?cartIds=`+cartIds.join(',')
				})
				//this.$api.msg('跳转下一页 sendData');
			},
			loadUserInfo(){
				var _self=this;
				Api.methods.loadUserInfo().then(function(res){
					if(res.data.code===200){
						if(_self.hasLogin){
							_self.loadData();
						}
					}else{
						_self.logout()
					}
				})
			},
		}
	}
</script>

<style lang='scss'>
	customStyle{
		color: '#fc4f7c'
	}
	.container{
		padding-bottom: 134upx;
		/* 空白页 */
		.empty{
			position:fixed;
			left: 0;
			top:0;
			width: 100%;
			height: 100vh;
			padding-bottom:100upx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 240upx;
				height: 160upx;
				margin-bottom:30upx;
			}
			.empty-tips{
				display:flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;
				.navigator{
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}
	/* 购物车列表项 */
	.cart-item{
		display:flex;
		position:relative;
		padding:30upx 40upx;
		.image-wrapper{
			/* width: 230upx;
			height: 230upx; */
			width: 110rpx;
			height: 110rpx;
			flex-shrink: 0;
			position:relative;
			image{
				border-radius:8upx;
			}
		}
		.checkbox{
			position:absolute;
			left:-16upx;
			top: -16upx;
			z-index: 8;
			font-size: 40upx;
			line-height: 1;
			padding: 2upx;
			color: $font-color-disabled;
			background:#fff;
			border-radius: 50px;
		}
		.item-right{
			display:flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position:relative;
			padding-left: 30upx;
			.title,.price{
				font-size:26upx;
				color: $font-color-dark;
				height: 30upx;
				line-height: 30upx;
			}
			.attr{
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 30upx;
				line-height: 30upx;
			}
			.price-num{
				.price{
					height: 50upx;
					line-height:50upx;
				}
			}
			.price{
				height: 50upx;
				line-height:50upx;
			}
		}
		.del-btn{
			padding:4upx 10upx;
			font-size:28upx; 
			height: 50upx;
			color: $font-color-light;
		}
	}
	/* 底部栏 */
	.bottom-bar{
		/* #ifdef H5 */
		margin-bottom:100upx;
		/* #endif */
		position:fixed;
		/* left: 30upx; */
		bottom:0upx;
		z-index: 95;
		/* display: flex; */
		/* align-items: center; */
		width: 100%;
		height: 100upx;
		/* padding: 0 30upx; */
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 40upx 0 rgba(141, 141, 141, 0.5);
		.check-img{
			float: left;
			margin-left: 30rpx;
			margin-top: 30rpx;
			width: 40rpx;
			height: 40rpx;
		}
		.check-text{
			float: left;
			padding-left: 10rpx;
			font-size: 30rpx;
			font-weight: bold;
			line-height: 100rpx;
		}
		.price{
			line-height: 50rpx;
		}

	}
	.action-section{
		/* #ifdef H5 */
		margin-bottom:100upx;
		/* #endif */
		position:fixed;
		/* left: 30upx; */
		bottom:0upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 10upx 0 rgba(89, 89, 89, 0.5);
		/* border-radius: 16upx; */
		.checkbox{
			height:40upx;
			bottom:30rpx;
			/* position:relative; */
			image{
				width: 52upx;
				height: 100%;
				/* position:relative; */
				z-index: 5;
			}
		}
		.clear-btn{
			position:absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius:0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			&.show{
				opacity: 1;
				width: 120upx;
			}
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40upx;
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.coupon{
				font-size: $font-sm;
				color: $font-color-light;
				text{
					color: $font-color-dark;
				}
			}
		}
		.confirm-btn{
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72);
			background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
		}
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: $uni-color-primary;
	}
</style>
