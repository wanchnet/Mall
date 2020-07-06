<template>
	<view class="content">
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="loadData"
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					
					<!-- 订单列表 -->
					<view 
						v-for="(item,index) in tabItem.orderList" :key="index"
						class="order-item"
					>
						<view class="i-top b-b">
							<text class="time">{{item.omsOrder.createTime|time}}</text>
							<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
							<text 
								v-if="item.omsOrder.status===5 ||item.omsOrder.status===4" 
								class="del-btn yticon icon-iconfontshanchu1"
								@click="deleteOrder(item,index)"
							></text>
						</view>
						
						<scroll-view v-if="item.items && item.items.length > 1" class="goods-box" scroll-x >
							<view
								v-for="(goodsItem, goodsIndex) in item.items" :key="goodsIndex"
								class="goods-item" @click="navTo('details?orderSn='+item.omsOrder.orderSn)"
							>
								<image class="goods-img" :src="encodeURI(goodsItem.productPic)" mode="aspectFill" ></image>
							</view>
						</scroll-view>
						<view 
							v-if="item.items.length === 1" 
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in item.items" :key="goodsIndex" @click="navTo('details?orderSn='+item.omsOrder.orderSn)"
						>
							<image class="goods-img" :src="encodeURI(goodsItem.productPic)" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.productName}}</text>
								<text class="attr-box">{{goodsItem.attr}}  x {{goodsItem.productQuantity}}</text>
								<text class="price">{{goodsItem.productPrice}}</text>
							</view>
						</view>
						
						<view v-if="item.omsOrder.status === 1 ||item.omsOrder.status === 2 ||item.omsOrder.status === 3" class="price-box">
							<!-- 共
							<text class="num">7</text>
							件商品 --> 
							实付款
							<text class="price">{{item.omsOrder.totalAmount}}</text>
						</view>
						<view class="action-box b-t">
							<button class="action-btn" v-if="item.omsOrder.status === 0" @click="cancelOrder(item)">取消订单</button>
							<button class="action-btn recom" v-if="item.omsOrder.status === 0" @click="toPay(item.omsOrder.orderSn)">立即支付</button>
							<button class="action-btn recom" v-if="item.omsOrder.status === 2" @click="confirmReceipt(item)">确认收货</button>
							<button class="action-btn recom" v-if="item.omsOrder.status === 2 || item.omsOrder.status === 3" @click="navTo('/pages/order/aftersale/aftersale?orderSn='+item.omsOrder.orderSn)">申请售后</button>
						</view>
					</view>
					 
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
					
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template> 

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import Json from '@/Json';
	import Api from '@/common/js/model.js';
	import { mapState } from 'vuex';
	import { mapMutations} from 'vuex';
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: [],
						pageNo:0,
						pageSize:10,
						totalPage:1
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: [],
						pageNo:0,
						pageSize:10,
						totalPage:1
					},
					{
						state: 2,
						text: '待发货',
						loadingType: 'more',
						orderList: [],
						pageNo:0,
						pageSize:10,
						totalPage:1
					},
					{
						state: 3,
						text: '待收货',
						loadingType: 'more',
						orderList: [],
						pageNo:0,
						pageSize:10,
						totalPage:1
					},
					{
						state: 4,
						text: '已完成',
						loadingType: 'more',
						orderList: [],
						pageNo:0,
						pageSize:10,
						totalPage:1
					}
				],
			};
		},

		onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = +options.state;
			
		},
		onShow(){
			this.loadUserInfo();
			// #ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if(this.tabCurrentIndex == 0){
				this.loadData()
			}
			// #endif
		},
		filters: {
			//2019-04-06 11:37
			time: function time(value) {
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
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		methods: {
			...mapMutations(['login','logout']),
			//获取订单列表
			loadData(source){
				var _self=this;
				//这里是将订单挂载到tab列表下
				let index = _self.tabCurrentIndex;
				let navItem = _self.navList[index];
				let state = navItem.state;
				
				if(source === 'tabChange' && navItem.loaded === true){
					//tab切换只有第一次需要加载数据
					return;
				}
				if(navItem.loadingType === 'loading' || navItem.loadingType === 'noMore'){
					//防止重复加载
					return;
				}
				
				navItem.loadingType = 'loading';
				
				setTimeout(()=>{
					var param={"pageSize":navItem.pageSize,"pageNum":navItem.pageNo}
					if(index === 0){
						Api.methods.getAllOrderList(param).then(function(res){
							if(res.data.code === 200){
								var result=res.data.data;
								_self.orderListHandle(navItem,result,state);
								navItem.pageNo++
							}else{
								_self.$api.msg("加载失败，请重试")
							}
						})
					}else if(index === 1){
						Api.methods.getWaitingPayList(param).then(function(res){
							if(res.data.code === 200){
								var result=res.data.data;
								_self.orderListHandle(navItem,result,state);
								navItem.pageNo++
							}else{
								_self.$api.msg("加载失败，请重试")
							}
						})
					}else if(index === 2){
						Api.methods.getWaitingShipList(param).then(function(res){
							if(res.data.code === 200){
								var result=res.data.data;
								_self.orderListHandle(navItem,result,state);
								navItem.pageNo++
							}else{
								_self.$api.msg("加载失败，请重试")
							}
						})
					}else if(index === 3){
						Api.methods.getWaitingReceiptList(param).then(function(res){
							if(res.data.code === 200){
								var result=res.data.data;
								_self.orderListHandle(navItem,result,state);
								navItem.pageNo++
							}else{
								_self.$api.msg("加载失败，请重试")
							}
						})
					}else if(index === 4){
						Api.methods.getCompletedList(param).then(function(res){
							if(res.data.code === 200){
								var result=res.data.data;
								_self.orderListHandle(navItem,result,state);
								navItem.pageNo++
							}else{
								_self.$api.msg("加载失败，请重试")
							}
						})
					}
					
				}, 600);	
			},
			//订单列表处理
			orderListHandle(navItem,result,state){
				// let orderList = result.list.filter(item=>{
				// 	//添加不同状态下订单的表现形式
				// 	item = Object.assign(item, this.orderStateExp(item.omsOrder.status));
				// 	//演示数据所以自己进行状态筛选
				// 	return item
				// });
				result.list.forEach(item=>{
					item.items.forEach(product =>{
						if(product.productAttr){
							let attr = JSON.parse(product.productAttr)
							product.attr = ''
							for(var i =0;i<attr.length;i++){
								product.attr += attr[i].value+" "
							}
						}
					})
					item = Object.assign(item, this.orderStateExp(item.omsOrder.status));
					navItem.orderList.push(item);
				})
				//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
				this.$set(navItem, 'loaded', true);
				navItem.pageNo=result.pageNum;
				var loadingType='more';
				if(result.pageNum+1 >= result.totalPage){
					loadingType='noMore';
				}
				//判断是否还有数据， 有改为 more， 没有改为noMore 
				navItem.loadingType = loadingType;
			},
			//swiper 切换
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			//删除订单
			deleteOrder(item,index){
				var _self=this;
				uni.showLoading({
					title: '请稍后'
				})
				Api.methods.deleteOrder({"orderId":item.omsOrder.id}).then(function(res){
					console.log(res)
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
				setTimeout(function() {
					let {stateTip, stateTipColor} = _self.orderStateExp(5);
					Api.methods.cancelOrder({"orderId":item.omsOrder.id}).then(function(res){
						if(res.data.code === 200){
							//取消订单后删除待付款中该项
							let list = _self.navList[1].orderList;
							let index = list.findIndex(val=>val.omsOrder.id === item.omsOrder.id);
							index !== -1 && list.splice(index, 1);
						}else{
							uni.hideLoading();
							_self.$api.msg("取消失败")
							return;
						}
						let list = _self.navList[0].orderList;
						let index = list.findIndex(val=>val.omsOrder.id === item.omsOrder.id);
						index !== -1 && list.splice(index, 1);
						uni.hideLoading();
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
						if(res.data.code === 200){
							//取消订单后删除待付款中该项
							let list = _self.navList[3].orderList;
							let index = list.findIndex(val=>val.omsOrder.id === item.omsOrder.id);
							index !== -1 && list.splice(index, 1);
						}else{
							_self.$api.msg("操作失败")
						}
						
						item = Object.assign(item, {
							state: 3
						})
						uni.hideLoading();
					})
				}, 600)
			},
			//订单状态文字和颜色
			orderStateExp(state){
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch(+state){
					case 0:
						stateTip = '待付款'; break;
					case 1:
						stateTip = '待发货'; break;
					case 2:
						stateTip = '已发货'; break;
					case 3:
						stateTip = '已完成'; break;
					case 4:
						stateTip = '订单已关闭'; 
						stateTipColor = '#909399';
						break;
					case 5:
						stateTip = '无效订单'; 
						stateTipColor = '#909399';
						break;
					//更多自定义
				}
				return {stateTip, stateTipColor};
			},
			loadUserInfo(){
				var _self=this;
				Api.methods.loadUserInfo().then(function(res){
					if(res.data.code===200){
						_self.login(res.data.data)
					}else{
						_self.logout()
						uni.navigateTo({
							url :'/pages/public/login'
						})
					}
				})
			},
			navTo(url){
				if(!this.hasLogin){
					url = '/pages/public/login';
				}
				uni.navigateTo({  
					url
				})  
			},
		},
	}
</script>

<style lang="scss">
	@import "common/scss/order/order.scss"; 
</style>
