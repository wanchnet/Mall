<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image
							:src="encodeURI(item)" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="introduce-section">
			<text class="title">{{productInfo.name}}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{productInfo.price}}</text>
				<text class="m-price">¥{{productInfo.originalPrice}}</text>
				<text class="coupon-tip" v-for="(item, index) in services" :key="index">{{item}}</text>
			</view>
			<view class="bot-row">
				<text>销量: {{productInfo.sale}}</text>
				<text>库存: {{productInfo.stock}}</text>
				<text>赠送积分: {{productInfo.giftPoint}}</text>
			</view>
		</view>
		
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
					<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
						{{sItem.name}}
					</text>
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
				<view class="con">
					<text >
						点击查看商品参数
					</text>
				</view>
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
			<view class="d-header">
				<text>图文详情</text>
			</view>
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
		<view 
			class="popup spec" 
			:class="skuSelectInfo.specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec"
		>
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image v-bind:src="encodeURI(skuSelectInfo.specSrc)"></image>
					<view class="right">
						<text class="price">¥{{skuSelectInfo.price}}</text>
						<text class="stock">库存：{{skuSelectInfo.stock}}件</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text v-if="item.id ===1">{{item.name}}</text>
					<view v-if="item.id ===1" class="item-list">
						<text 
							v-for="(sp1Item, sp1Index) in sp1List" 
							v-if="sp1Item.pid === 0"
							:key="sp1Index" class="tit"
							:class="{selected: sp1Item.selected}"
							@click="selectSpec(sp1Item.id)"
						>
							{{sp1Item.name}}
						</text>
					</view>
					<text v-if="item.id ===2 && sp2List.length > 0">{{item.name}}</text>
					<view v-if="item.id ===2 && sp2List.length > 0" class="item-list">
						<text 
							v-for="(sp2Item, sp2Index) in sp2List" 
							v-if="sp2Item.pid === skuSelectInfo.specSelectPid"
							:key="sp2Index" class="tit"
							:class="{selected: sp2Item.selected}"
							@click="selectSp2(sp2Item.id, sp2Item.pid)"
						>
							{{sp2Item.name}}
						</text>
					</view>
				</view>
				<view class="attr-list">
					<text>数量</text>
					<view class="stepper">
						<!-- 减号 -->  
						<text @click="num_less" > - </text>  
						<!-- 数值 -->  
						<input type="number"  v-bind:value="num"  disabled="disabled"/>  
						<!-- 加号 -->  
						<text @click="num_add" >+</text>  
					</view>
				</view>
				<button class="btn" @click="toggleSpec">完成</button>
				
			</view>
		</view>
		
		<!-- 参数-模态层弹窗 -->
		<view 
			class="popup param" 
			:class="paramClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleParam"
		>
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="param-header">
					<text>产品参数</text>
				</view>
				<scroll-view class="param-content" scroll-y="true" >
					<view  class="uni-title uni-common-mt p-row"
						v-for="(param, index) in productParamList" :key="index"
						>
						<text class="p-name">{{param.name}}</text>
						<text class="p-value">{{param.value}}</text>
					</view>
				</scroll-view>
				<button class="btn" @click="toggleParam">完成</button>
			</view>
		</view>
		<!-- 优惠券模态层弹窗 -->
		<view class="coupons_opup" :class="couponsPopuop" @click="toggleCoupons" @touchmove.stop.prevent="stopPrevent">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content"  @click.stop="stopPrevent">
				<view class="param-header">
					<text>优惠</text>
				</view>
				<scroll-view class="param-content" scroll-y="true" >
					<view class="param-content_min_title">领券</view>
					<view  class="grid col-2 coupon_card" v-for="(item, index) in coupons" :key="index">
						<view class="coupon_detils">
							<view class="grid col-3 coupon_detils_first">
								<view class="coupon_amount_pre">￥</view>
								<view class="coupon_amount">{{item.amount}}</view>
								<view class="coupon_name">{{item.name}}</view>
							</view>
							<view class="coupon_second">{{item.note}},满{{item.minPoint}}可用</view>
							<view class="coupon_third">{{item.startTime}}至{{item.endTime}}</view>
						</view>
						<view class="collect_coupon" @click="collectCoupon(item.id)">立即抢</view>
					</view>
				</scroll-view>
				<button class="btn" @click="toggleCoupons">完成</button>
			</view>
		</view>
		<!-- 分享 -->
		<share 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
		></share>
	</view>
</template>

<script>
	import share from '@/components/share';
	import Api from 'common/js/model.js';
	import {mapState,mapMutations } from 'vuex';
	
	export default{
		components: {
			share
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		data() {
			return {
				num:1,
				id:null,
				skuSelectInfo:{
					specClass: 'none',
					specSrc: "",
					price:0,
					stock:0,
					specSelectPid:1,
					skuSelectId:1
				},
				
				paramClass: 'none',
				couponsPopuop: 'none',
				specSelected:[],
				favorite: true,
				shareList: [],
				productInfo:{},
				imgList: [],
				services:[],
				desc: ``,
				specList: [
					{
						id: 1,
						name: '颜色',
					},
					{	
						id: 2,
						name: '尺寸',
					}
				],
				sp1List: [],
				sp2List:[],
				productParamList:[],
				coupons:[]
			};
		},
		async onLoad(options){
			
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			this.id = options.id;
			// if(id){
			// 	this.$api.msg(`点击了${id}`);
			// }
			//获取商品信息
			this.getProductInfo();
			//获取商品规格列表
			this.getSkuStockList();
			//获取商品参数列表
			this.getProductAttributeList();
		},
		computed:{
					...mapState(['hasLogin'])
				},
		methods: {
			...mapMutations(['login','logout']),
			num_less(){
				if(this.num>1){
					this.num--
				}
			},
			num_add(){
				if(this.num<this.productInfo.stock){
					this.num++
				}
			},
			
			async getProductInfo(){
				var _self=this;
				Api.methods.getProductDetail({id:_self.id}).then(function(res){
					var data=res.data.data;
					//防止图片url中中文导致乱码
					var reg=new RegExp("http://(?!(\\.jpg|\\.png|\\.gif)).+?(\\.jpg|\\.png|\\.gif)",'g')
					var list=data.detailMobileHtml.match(reg)
					list.forEach(item=>{
						data.detailMobileHtml=data.detailMobileHtml.replace(item,encodeURI(item))
					})
					// while(data.detailMobileHtml.indexOf('src="')!=-1){
					// 	data.detailMobileHtml=data.detailMobileHtml.replace('src="','v-lazy="')
					// }
					//data.detailMobileHtml=data.detailMobileHtml.replace(new RegExp('src','gim'),'v-lazy');
					
					//data.detailMobileHtml=data.detailMobileHtml.replace(new RegExp('class="wscnph" src','gm'),'class="wscnph" v-lazy')
					//1->无忧退货；2->快速退款；3->免费包邮
					data.serviceIds.split(',').forEach(item=>{
						if(item=='1'){
							_self.services.push('无忧退货')
						}else if(item=='2'){
							_self.services.push('快速退款')
						}else if(item=='3'){
							_self.services.push('免费包邮')
						}
					})
					_self.desc=data.detailMobileHtml
					_self.productInfo=data
					_self.getCouponsByProductId();
					_self.imgList.push(data.pic)
					var imgs=data.albumPics.split(',');
					_self.imgList=_self.imgList.concat(imgs)
				})
			},
			async getSkuStockList(){
				var _self=this;
				Api.methods.getSkuStockList({id:_self.id}).then(function(res){
					//填充sp1List以及视频List
					res.data.forEach(item=>{
						var frist=item.data[0]
						var index=frist.id;
						_self.sp1List.push({id: frist.id,pid: 0,name: item.sp1,pic:frist.pic,price:frist.price,stock:frist.stock})
						item.data.forEach(obj=>{
							if(obj.sp2){
								_self.sp2List.push({id: obj.id,pid:index,name: obj.sp2,stock:obj.stock,price:obj.price})
							}
						})
					})
					//默认选中第一个
					var frist=res.data[0].data[0];
					_self.skuSelectInfo.specSelectPid=frist.id;
					_self.skuSelectInfo.skuSelectId=frist.id;
					_self.skuSelectInfo.price=frist.price;
					_self.skuSelectInfo.stock=frist.stock;
					let item=_self.sp1List[0];
					_self.$set(item, 'selected', true);
					_self.specSelected.push(item);
					_self.skuSelectInfo.specSrc=item.pic
					if(_self.sp2List.length>0){
						let cItem=_self.sp2List[0]
						_self.$set(cItem, 'selected', true);
						_self.specSelected.push(cItem);
					}
				})
				
			},
			//获取商品参数列表
			async getProductAttributeList(){
				var _self=this;
				Api.methods.getProductAttributeList({id:_self.id}).then(function(res){
					_self.productParamList=res.data
				})
			},
			// 根据商品获取当前商品可用的优惠券
			getCouponsByProductId(){
				var _self = this;
				Api.methods.getCouponsByProductId(_self.productInfo).then(res => {
					if(res.data.code == 200){
						_self.coupons = res.data.data;
						console.log(_self.coupons)
					}
				})
			},
			//领取优惠券
			collectCoupon(couponId){
				var _self = this;
				Api.methods.loadUserInfo().then(function(res){
					if(res.data.code===200){
						
					}else{
						_self.logout()
						uni.navigateTo({
							url :'/pages/public/login'
						})
					}
				})
				couponId = parseFloat(couponId)
				Api.methods.receiveCoupon({'couponId':couponId}).then(res => {
					console.log(res)
					if(res.data.data == 1){
						_self.$api.msg("领取成功！");
					}else{
						_self.$api.msg(res.data.data);
					}
				})
			},
			//规格弹窗开关
			toggleSpec() {
				if(this.skuSelectInfo.specClass === 'show'){
					this.skuSelectInfo.specClass = 'hide';
					setTimeout(() => {
						this.skuSelectInfo.specClass = 'none';
					}, 250);
				}else if(this.skuSelectInfo.specClass === 'none'){
					this.skuSelectInfo.specClass = 'show';
				}
			},
			//参数弹窗开关
			toggleParam(){
				if(this.paramClass === 'show'){
					this.paramClass = 'hide';
					setTimeout(() => {
						this.paramClass = 'none';
					}, 250);
				}else if(this.paramClass === 'none'){
					this.paramClass = 'show';
				}
			},
			// 优惠弹窗开关
			toggleCoupons(){
				if(this.couponsPopuop === 'show'){
					this.couponsPopuop = 'hide';
					setTimeout(() => {
						this.couponsPopuop = 'none';
					}, 250);
				}else if(this.couponsPopuop === 'none'){
					this.couponsPopuop = 'show';
				}
			},
			//选择规格SP!
			selectSpec(id){
				var _self=this
				this.specSelected = [];
				_self.skuSelectInfo.specSelectPid=id;
				_self.skuSelectInfo.skuSelectId=id;
				let list = this.sp1List;
				list.forEach(item=>{
					if(item.id === id){
						_self.skuSelectInfo.specSrc=item.pic
						_self.skuSelectInfo.price=item.price;
						_self.skuSelectInfo.stock=item.stock;
						this.$set(item, 'selected', true);
						this.specSelected.push(item); 
					}else{
						this.$set(item, 'selected', false);
					}
				})

				//this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.sp2List.forEach(item=>{
					if(item.id === id){
						this.$set(item, 'selected', true);
						this.specSelected.push(item); 
					}else{
						this.$set(item, 'selected', false);
					}
				})
				
			},
			//选择规格SP2
			selectSp2(id){
				var _self=this
				_self.skuSelectInfo.skuSelectId=id;
				this.sp2List.forEach(item=>{
					if(item.id === id){
						this.$set(item, 'selected', true);
						this.specSelected[1]=item;
						_self.skuSelectInfo.price=item.price;
						_self.skuSelectInfo.stock=item.stock;
					}else{
						this.$set(item, 'selected', false);
					}
				})
			},
			//分享
			share(){
				this.$refs.share.toggleMask();	
			},
			//收藏
			toFavorite(){
				this.favorite = !this.favorite;
			},
			buy(){
				this.loadUserInfo();
				if(!this.hasLogin){
					uni.navigateTo({
						url : '/pages/public/login'
					})
					return false;
				}
				uni.navigateTo({
					url: `/pages/order/createOrder?skuId=`+this.skuSelectInfo.skuSelectId+`&num=`+this.num
				})
			},
			stopPrevent(){
				
			},
			//添加到购物车
			addCartItem(){
				this.loadUserInfo();
				if(!this.hasLogin){
					uni.navigateTo({
						url : '/pages/public/login'
					})
					return false;
				}
				var _self=this
				var param={productId:_self.id,productSkuId: _self.skuSelectInfo.skuSelectId,quantity:_self.num}
				Api.methods.addCartItem(param).then(function(res){
					var result=res.data.data.res;
					if(result===1){
						_self.$api.msg(`添加成功`);
					}
				})
			},
			loadUserInfo(){
				var _self=this;
				Api.methods.loadUserInfo().then(function(res){
					if(res.data.code===200){
						if(_self.hasLogin){
							_self.login(res.data.data)
						}
					}else{
						_self.logout()
					}
				})
			},
		},

	}
</script>

<style lang='scss'>
	@import "common/scss/product/product.scss"; 
	
</style>
