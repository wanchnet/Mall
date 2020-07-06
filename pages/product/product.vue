<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular="true" duration="400">
				<swiper-item class="swiper-item" v-for="(item, index) in imgList" :key="index">
					<view class="image-wrapper"><image :src="encodeURI(item)" class="loaded" mode="aspectFill"></image></view>
				</swiper-item>
			</swiper>
		</view>

		<view class="detail-text">
			<!-- 秒杀 -->
			<view class="spike" v-if="spike">
				<text class="price-tip">¥</text>
				<text class="price">{{ productInfo.price }}</text>
				<text class="price-tip" style="padding-left: 10rpx;text-decoration: line-through;font-size: 27rpx;">¥{{ productInfo.originalPrice }}</text>
				<text class="price-tip" style="float: right; padding-right: 20rpx;">{{ timing }}</text>
				<text class="price-tip" style="font-size: 27rpx; float: right;">距离结束还剩：</text>
			</view>
			<!-- 不妙杀 -->
			<view class="no-spike" v-if="!spike">
				<text class="price-tip">¥</text>
				<text class="price">{{ productInfo.price }}</text>
				<text class=" price-tip" style="padding-left: 10rpx;text-decoration: line-through;font-size: 27rpx;">¥{{ productInfo.originalPrice }}</text>
			</view>
			<!-- 名称 -->
			<view class="product-info">
				<text class="coupon-tip" v-for="(item, index) in services" :key="index">{{ item }}</text>
				<text class="title">{{ productInfo.name }}</text>
			</view>
			<!-- 销量 库存 -->
			<view class="bot-row">
				<text class="bot-text">销量: {{ productInfo.sale }}</text>
				<text class="bot-text">库存: {{ productInfo.stock }}</text>
				<!-- <text class="bot-text">赠送积分: {{productInfo.giftPoint}}</text> -->
			</view>
		</view>

		<!-- 		<view class="introduce-section">
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{productInfo.price}}</text>
				<text class="m-price">¥{{productInfo.originalPrice}}</text>
				<text class="coupon-tip" v-for="(item, index) in services" :key="index">{{item}}</text>
			</view>
			<text class="title">{{productInfo.name}}</text>
			<view class="bot-row">
				<text>销量: {{productInfo.sale}}</text>
				<text>库存: {{productInfo.stock}}</text>
				<text>赠送积分: {{productInfo.giftPoint}}</text>
			</view>
		</view> -->

		<!--  分享 -->
		<!-- <view class="share-section" @click="share">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				 享
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<text class="yticon icon-you"></text>
			</view>
		</view> -->

		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">{{sItem}}</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<!-- <view class="c-row b-b">
				<text class="tit">优惠券</text>
				<text class="con t-r red">领取优惠券</text>
				<text class="yticon icon-you"></text>
			</view> -->

			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>商品如有问题请尽快和客服联系</text>
					<!-- <text>假一赔十 ·</text> -->
				</view>
			</view>

			<view class="c-row b-b" @click="toggleParam">
				<text class="tit">参数</text>
				<view class="con"><text>点击查看商品参数</text></view>
				<text class="yticon icon-you"></text>
			</view>
		</view>

		<view class="coupons" @click="toggleCoupons">
			<text class="coupon_title">优惠</text>
			<view class="coupons_name">
				<text class="coupon_name">点击查看优惠券</text>
				<!-- <view class="coupon_name" v-for="(coupon,index) in coupons" :key="index">{{coupon.name}},</view> -->
			</view>
			<text class="yticon icon-you"></text>
		</view>
		<!-- 评价 -->
		<!-- <view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="yticon icon-you"></text>
			</view> 
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view> -->

		<view class="detail-desc">
			<view class="d-header"><text>图文详情</text></view>
			<rich-text :nodes="desc" class="d-desc"></rich-text>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<!-- <view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view> -->

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn" @click="addCartItem">加入购物车</button>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="skuSelectInfo.specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image v-bind:src="encodeURI(skuSelectInfo.specSrc)"></image>
					<view class="right">
						<text class="price">¥{{ skuSelectInfo.price }}</text>
						<text class="stock">库存：{{ skuSelectInfo.stock }}件</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">{{ sItem }}</text>
						</view>
					</view>
				</view>
				<view v-for="(item, index) in specList" :key="index" class="attr-list">
					<text >{{ item.name }}</text>
					<!-- <view class="item-list">
						<text
							v-for="(sp1Item, sp1Index) in getChildSkuList(sp1List,index)"
							:key="sp1Index"
							class="tit"
							:class="{ selected: sp1Item.selected }"
							@click="selectSpec(sp1Item,getChildSkuList(sp1List,index),index,sp1Index)"
						>
							{{ sp1Item.name }}
						</text>
					</view> -->
					<view class="item-list" v-if="index==0">
						<text
							v-for="(sp1Item, sp1Index) in sp1List"
							:key="sp1Index"
							class="tit"
							:class="{ selected: sp1Item.selected }"
							@click="selectSpec(sp1Item,sp1List,index,sp1Index)"
						>
							{{ sp1Item.name }}
						</text>
					</view>
					<view class="item-list" v-if="index==1">
						<text
							v-for="(sp1Item, sp1Index) in sp2List"
							:key="sp1Index"
							class="tit"
							:class="{ selected: sp1Item.selected }"
							@click="selectSpec(sp1Item,sp2List,index,sp1Index)"
						>
							{{ sp1Item.name }}
						</text>
					</view>
					<view class="item-list" v-if="index==2">
						<text
							v-for="(sp1Item, sp1Index) in sp3List"
							:key="sp1Index"
							class="tit"
							:class="{ selected: sp1Item.selected }"
							@click="selectSpec(sp1Item,sp3List,index,sp1Index)"
						>
							{{ sp1Item.name }}
						</text>
					</view>
				</view>
				<view class="attr-list">
					<text>数量</text>
					<view class="stepper">
						<!-- 减号 -->
						<text @click="num_less">-</text>
						<!-- 数值 -->
						<input type="number" v-bind:value="num" disabled="disabled" />
						<!-- 加号 -->
						<text @click="num_add">+</text>
					</view>
				</view>
				<button class="btn" @click="toggleSpec">完成</button>
			</view>
		</view>

		<!-- 参数-模态层弹窗 -->
		<view class="popup param" :class="paramClass" @touchmove.stop.prevent="stopPrevent" @click="toggleParam">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="param-header"><text>产品参数</text></view>
				<scroll-view class="param-content" scroll-y="true">
					<view class="uni-title uni-common-mt p-row" v-for="(param, index) in productParamList" :key="index">
						<text class="p-name">{{ param.name }}</text>
						<text class="p-value">{{ param.value }}</text>
					</view>
				</scroll-view>
				<button class="btn" @click="toggleParam">完成</button>
			</view>
		</view>
		<!-- 优惠券模态层弹窗 -->
		<view class="coupons_opup" :class="couponsPopuop" @click="toggleCoupons" @touchmove.stop.prevent="stopPrevent">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="param-header"><text>优惠</text></view>
				<scroll-view class="param-content" scroll-y="true">
					<view class="param-content_min_title">领券</view>
					<view class="grid col-2 coupon_card" v-for="(item, index) in coupons" :key="index">
						<view class="coupon_detils">
							<view class="grid col-3 coupon_detils_first">
								<view class="coupon_amount_pre">￥</view>
								<view class="coupon_amount">{{ item.amount }}</view>
								<view class="coupon_name">{{ item.name }}</view>
							</view>
							<view class="coupon_second">{{ item.note }},满{{ item.minPoint }}可用</view>
							<view class="coupon_third">{{ item.startTime }}至{{ item.endTime }}</view>
						</view>
						<view class="collect_coupon" @click="collectCoupon(item.id)">立即抢</view>
					</view>
				</scroll-view>
				<button class="btn" @click="toggleCoupons">完成</button>
			</view>
		</view>
		<!-- 分享 -->
		<share ref="share" :contentHeight="580" :shareList="shareList"></share>
	</view>
</template>

<script>
import share from '@/components/share';
import Api from 'common/js/model.js';
import { mapState, mapMutations } from 'vuex';

export default {
	components: {
		share
	},
	computed: {
		...mapState(['hasLogin', 'userInfo'])
	},
	data() {
		return {
			num: 1,
			id: null,
			skuSelectInfo: {
				specClass: 'none',
				specSrc: '',
				price: 0,
				stock: 0,
				specSelectPid: 1,
				skuSelectId: 1
			},
			paramClass: 'none',
			couponsPopuop: 'none',
			specSelected: [],
			favorite: true,
			shareList: [],
			productInfo: {},
			imgList: [],
			services: [],
			desc: ``,
			specList: [
				{
					id: 1,
					name: '颜色'
				},
				{
					id: 2,
					name: '尺寸'
				}
			],
			sp1List: [],
			sp2List: [],
			sp3List: [],
			sp4List: [],
			spLog:{},
			productParamList: [],
			coupons: [],
			spike: false,
			timing: '',
			end: ''
		};
	},
	async onLoad(options) {
		//接收传值,id里面放的是标题，因为测试数据并没写id
		this.id = options.id;
		// if(id){
		// 	this.$api.msg(`点击了${id}`);
		// }
		//获取商品信息
		this.getProductInfo();
		//获取商品秒杀信息
		this.getProductFlashById();
		//获取商品规格列表
		this.getSkuStockList();
		//获取商品参数列表
		this.getProductAttributeList();
	},
	computed: {
		...mapState(['hasLogin'])
	},
	methods: {
		...mapMutations(['login', 'logout']),
		num_less() {
			if (this.num > 1) {
				this.num--;
			}
		},
		num_add() {
			if (this.num < this.productInfo.stock) {
				this.num++;
			}
		},
		getChildSkuList(list,index){
			var child = list
			for(var i =0;i<index;i++){
				if(child[this.spLog[''+index]]){
					child = child[this.spLog[''+index]].childList
				}
			}
			return child
		},
		async getProductInfo() {
			var _self = this;
			Api.methods.getProductDetail({ id: _self.id }).then(function(res) {
				var data = res.data.data;
				//防止图片url中中文导致乱码
				var reg = new RegExp('http://(?!(\\.jpg|\\.png|\\.gif)).+?(\\.jpg|\\.png|\\.gif)', 'g');
				var list = data.detailMobileHtml.match(reg);
				list.forEach(item => {
					data.detailMobileHtml = data.detailMobileHtml.replace(item, encodeURI(item));
				});
				// while(data.detailMobileHtml.indexOf('src="')!=-1){
				// 	data.detailMobileHtml=data.detailMobileHtml.replace('src="','v-lazy="')
				// }
				//data.detailMobileHtml=data.detailMobileHtml.replace(new RegExp('src','gim'),'v-lazy');

				//data.detailMobileHtml=data.detailMobileHtml.replace(new RegExp('class="wscnph" src','gm'),'class="wscnph" v-lazy')
				//1->无忧退货；2->快速退款；3->免费包邮
				if(data.serviceIds){
					data.serviceIds.split(',').forEach(item => {
						if (item == '1') {
							_self.services.push('无忧退货');
						} else if (item == '2') {
							_self.services.push('快速退款');
						} else if (item == '3') {
							_self.services.push('免费包邮');
						}
					});
				}
				_self.desc = data.detailMobileHtml;
				_self.productInfo = data;
				_self.getCouponsByProductId();
				_self.imgList.push(data.pic);
				var imgs = data.albumPics.split(',');
				_self.imgList = _self.imgList.concat(imgs);
			});
		},
		async getProductFlashById() {
			var _self = this;
			_self.spike = false;
			Api.methods.getProductFlashById({ id: _self.id }).then(function(res) {
				console.log('秒杀数据：' + JSON.stringify(res.data));
				//到达开始时间就显示秒杀模式
				if (res.data.data) {
					let endtime = res.data.data.end_date + ' ' + res.data.data.end_time;
					let env = uni.getSystemInfoSync().platform;
					if ('ios' == env || 'android' == env) {
						endtime = endtime.replace(new RegExp(/-/gm), '/');
					}
					_self.end = endtime;
					_self.countTime();
					_self.spike = true;
					_self.productInfo.price = res.data.data.flash_promotion_price;
				} else {
					console.log('没有秒杀数据');
				}
			});
		},
		countTime() {
			//获取当前时间
			var date = new Date();
			var now = date.getTime();
			//设置截止时间
			var endDate = new Date(this.end);
			var end = endDate.getTime();
			//时间差
			var leftTime = end - now;
			//定义变量 d,h,m,s保存倒计时的时间
			var d, h, m, s;
			if (leftTime >= 0) {
				d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
				if (d < 10) {
					d = '0' + d;
				}
				h = Math.floor(leftTime / 1000 / 60 / 60);
				if (h < 10) {
					h = '0' + h;
				}
				m = Math.floor((leftTime / 1000 / 60) % 60);
				if (m < 10) {
					m = '0' + m;
				}
				s = Math.floor((leftTime / 1000) % 60);
				if (s < 10) {
					s = '0' + s;
				}
			}
			//将倒计时赋值到div中
			this.timing = h + ':' + m + ':' + s;
			//递归每秒调用countTime方法，显示动态时间效果
			setTimeout(this.countTime, 1000);
		},
		async getSkuStockList() {
			var _self = this;
			Api.methods.getSkuStockList({ id: _self.id }).then(function(res) {
				//填充sp1List以及视频List
				console.log(res.data.data);
				let spList = JSON.parse(res.data.data[0].spData);
				_self.specList=[]
				spList.forEach((item, index) => {
					_self.specList.push({
						id: index+1,
						name: item.key
					});
					_self.spLog[''+index]=0
				});
				let length = _self.specList.length;
				let sp1List =[]
				res.data.data.forEach((item,index) => {
					let list = JSON.parse(item.spData);
					let sp={
						name:list[0].value,
						childList:[],
						selected:false,
						sku:item
					}
					if(!_self.getIsContain(sp1List,sp.name)){
						sp1List.push(sp)
					}
					sp1List.forEach(item =>{
						if(item.name == sp.name){
							sp =item
						}
					})
					for(var i=1;i<length;i++){
						let childData={
							name:list[i].value,
							childList:[],
							selected:false,
							sku:item
						}
						var child = sp.childList
						for(var j=1;j<i;j++){
							child = child[child.length-1].childList
						}
						if(!_self.getIsContain(child,childData.name)){
							child.push(childData)
						}
						
					}
				});
				_self.sp1List =sp1List
				// //默认选中第一个
				_self.selectSpec(sp1List[0],sp1List,0,0)
			});
		},
		//查看list中是否包含此元素
		getIsContain(list,name){
		    var flag=false
			list.forEach(item =>{
				if(item.name == name){
					flag =true
				}
			})
			return flag
		},
		//获取商品参数列表
		async getProductAttributeList() {
			var _self = this;
			Api.methods.getProductAttributeList({ id: _self.id }).then(function(res) {
				_self.productParamList = res.data;
			});
		},
		// 根据商品获取当前商品可用的优惠券
		getCouponsByProductId() {
			var _self = this;
			Api.methods.getCouponsByProductId(_self.productInfo).then(res => {
				if (res.data.code == 200) {
					_self.coupons = res.data.data;
					console.log(_self.coupons);
				}
			});
		},
		//领取优惠券
		collectCoupon(couponId) {
			var _self = this;
			Api.methods.loadUserInfo().then(function(res) {
				if (res.data.code === 200) {
				} else {
					_self.logout();
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}
			});
			couponId = parseFloat(couponId);
			Api.methods.receiveCoupon({ couponId: couponId }).then(res => {
				console.log(res);
				if (res.data.data == 1) {
					_self.$api.msg('领取成功！');
				} else {
					_self.$api.msg(res.data.data);
				}
			});
		},
		//规格弹窗开关
		toggleSpec() {
			if (this.skuSelectInfo.specClass === 'show') {
				this.skuSelectInfo.specClass = 'hide';
				setTimeout(() => {
					this.skuSelectInfo.specClass = 'none';
				}, 250);
			} else if (this.skuSelectInfo.specClass === 'none') {
				this.skuSelectInfo.specClass = 'show';
			}
		},
		//参数弹窗开关
		toggleParam() {
			if (this.paramClass === 'show') {
				this.paramClass = 'hide';
				setTimeout(() => {
					this.paramClass = 'none';
				}, 250);
			} else if (this.paramClass === 'none') {
				this.paramClass = 'show';
			}
		},
		// 优惠弹窗开关
		toggleCoupons() {
			if (this.couponsPopuop === 'show') {
				this.couponsPopuop = 'hide';
				setTimeout(() => {
					this.couponsPopuop = 'none';
				}, 250);
			} else if (this.couponsPopuop === 'none') {
				this.couponsPopuop = 'show';
			}
		},
		//选择规格SP!
		selectSpec(item,list,index,spIndex) {
			if(list!=null){
				list.forEach(item1 =>{
					item1.selected = false
					if(item1.childList.length>0){
						this.selectSpec(null,item1.childList)
					}
				})
			}
			if(spIndex!=null&&list&&list.length>0){
				this['sp'+(index+2)+'List']=list[spIndex].childList
				this.specSelected[index] = item.name
				if(item.childList.length>0){
					this.selectSpec(item.childList[0],item.childList,(index+1),0)
				}
			}
			if(item!=null){
				item.selected = true;
				this.skuSelectInfo.specSrc = item.sku.pic
				this.skuSelectInfo.skuSelectId = item.sku.id
				this.skuSelectInfo.price = item.sku.price
				this.skuSelectInfo.stock = item.sku.stock
			}
		},
		
		//分享
		share() {
			this.$refs.share.toggleMask();
		},
		//收藏
		toFavorite() {
			this.favorite = !this.favorite;
		},
		buy() {
			this.loadUserInfo();
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '/pages/public/login'
				});
				return false;
			}
			uni.navigateTo({
				url: `/pages/order/createOrder?skuId=` + this.skuSelectInfo.skuSelectId + `&num=` + this.num
			});
		},
		stopPrevent() {},
		//添加到购物车
		addCartItem() {
			this.loadUserInfo();
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '/pages/public/login'
				});
				return false;
			}
			var _self = this;
			var param = { productId: _self.id, productSkuId: _self.skuSelectInfo.skuSelectId, quantity: _self.num };
			Api.methods.addCartItem(param).then(function(res) {
				var result = res.data.data.res;
				if (result === 1) {
					_self.$api.msg(`添加成功`);
				}
			});
		},
		loadUserInfo() {
			var _self = this;
			Api.methods.loadUserInfo().then(function(res) {
				if (res.data.code === 200) {
					if (_self.hasLogin) {
						_self.login(res.data.data);
					}
				} else {
					_self.logout();
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import 'common/scss/product/product.scss';
</style>
