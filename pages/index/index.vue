<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" disabled @click="navTo('/pages/index/search')"/>
		</view>
		<!-- #endif -->
		
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<!-- <view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view> -->
			<view class="titleNview-background"></view>
			<swiper class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToNewPage({url:item.url})">
					<image :src="item.pic" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item"  v-for="(nav,index) in navList" :key="index" @click="navClick(nav)">
				<image :src="nav.imgurl"></image>
				<text>{{nav.navName}}</text>
			</view>
			<!--<view class="cate-item">
				<image src="/static/temp/c3.png"></image>
				<text>时令水果</text>
			</view>
			<view class="cate-item">
				<image src="/static/img/xianshi.png"></image>
				<text>限时团购</text>
			</view>
			<view class="cate-item">
				<image src="/static/img/shengxian.png"></image>
				<text>星淘生鲜</text>
			</view>
			<view class="cate-item">
				<image src="/static/img/guoji.png"></image>
				<text>星淘国际</text>
			</view>
			<view class="cate-item">
				<image src="/static/img/youxuan.png"></image>
				<text>星淘优选</text>
			</view> -->
		</view>
		
		<view class="ad-1">
			<image src="/static/temp/ad1.jpg" mode="scaleToFill"></image>
		</view>
		
		<!-- 秒杀楼层 -->
		<!-- <view class="seckill-section m-t">
			<view class="s-header">
				<image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix"></image>
				<text class="tip">8点场</text>
				<text class="hour timer">07</text>
				<text class="minute timer">13</text>
				<text class="second timer">55</text>
				<text class="yticon icon-you"></text>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view 
						v-for="(item, index) in goodsList" :key="index"
						class="floor-item"
						@click="navToDetailPage(item)"
					>
						<image :src="item.image" mode="aspectFill"></image>
						<text class="title clamp">{{item.title}}</text>
						<text class="price">￥{{item.price}}</text>
					</view>
				</view>
			</scroll-view>
		</view> -->
		
		<!-- 新品楼层 -->
		<!-- <view class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">新品上市</text>
				<text class="tit2">New Listing</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		<view class="group-section">
			<swiper class="g-swiper" :duration="500">
				<swiper-item
					class="g-swiper-item"
					v-for="(item, index) in goodsList" :key="index"
					v-if="index%2 === 0"
					@click="navToDetailPage(item)"
				>
					<view class="g-item left">
						<image :src="item.image" mode="aspectFill"></image>
						<view class="t-box">
							<text class="title clamp">{{item.title}}</text>
							<view class="price-box">
								<text class="price">￥{{item.price}}</text> 
								<text class="m-price">￥188</text> 
							</view>
							
							<view class="pro-box">
							  	<view class="progress-box">
							  		<progress percent="72" activeColor="#fa436a" active stroke-width="6" />
							  	</view>
								<text>6人成团</text>
							</view>
						</view>
						            
					</view>
					<view class="g-item right">
						<image :src="goodsList[index+1].image" mode="aspectFill"></image>
						<view class="t-box">
							<text class="title clamp">{{goodsList[index+1].title}}</text>
							<view class="price-box">
								<text class="price">￥{{goodsList[index+1].price}}</text> 
								<text class="m-price">￥188</text> 
							</view>
							<view class="pro-box">
							  	<view class="progress-box">
							  		<progress percent="72" activeColor="#fa436a" active stroke-width="6" />
							  	</view>
								<text>10人成团</text>
							</view>
						</view>
					</view>
				</swiper-item>

			</swiper>
		</view> -->
		
		
		
		<!-- 分类推荐楼层 -->
		<view class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">新品上市</text>
				<text class="tit2">New Listing</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		<view class="hot-floor">
			<view class="floor-img-box">
				<image class="floor-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409398864&di=4a12763adccf229133fb85193b7cc08f&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F19%2F20170319150032_MNwmn.jpeg" mode="scaleToFill"></image>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view 
						v-for="(item, index) in newProductList" :key="index"
						class="floor-item"
						@click="navToDetailPage(item)"
					>
						<image :src="encodeURI(item.pic)" mode="aspectFill"></image>
						<text class="title clamp">{{item.productName}}</text>
						<text class="price">￥{{item.price}}</text>
					</view>
					<!-- <view class="more">
						<text>查看全部</text>
						<text>More+</text>
					</view> -->
				</view>
			</scroll-view>
		</view>
		
		

		<!-- 猜你喜欢 -->
		<view class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">热卖中</text>
				<text class="tit2">On Sale</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		
		<view class="guess-section">
			<view 
				v-for="(item, index) in popularityList" :key="index"
				class="guess-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="encodeURI(item.pic)" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.productName}}</text>
				<text class="price">￥{{item.price}}</text>
			</view>
		</view>
		

	</view>
</template>

<script>

	import Api from '../../common/js/model.js';
	
	export default {

		data() {
			return {
				titleNViewBackground: '#FB586A',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				newProductList:[],
				popularityList:[],
				navList:[],
				cateList:[
					{
						title:'',
						icon:'',
						
					}
				]
			};
		},

		onLoad() {
			this.loadData();
			// setTimeout(function () {
			// 	console.log('start pulldown');
			// }, 1000);
			// uni.startPullDownRefresh();
		},
		onPullDownRefresh() { // 下拉监听事件
			var _self = this
			_self.refresh();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			async loadData() {
				var _self = this
				//广告位
				Api.methods.getAdvertiseList({}).then(function(res){
					_self.titleNViewBackground = "#FB586A";
					_self.swiperLength = res.data.length;
					_self.carouselList = res.data;
				})
				
				//新品上市
				Api.methods.getNewProductList({}).then(function(res){
					_self.newProductList=res.data
				})
				
				//热卖中
				Api.methods.getPopularityList({}).then(function(res){
					_self.popularityList=res.data
				})
				//获取导航
				Api.methods.getNavList({}).then(function(res){
					_self.navList = res.data.data; 
					console.log(_self.navList)
				})
				
			},
			refresh(){
				var _self = this
				//广告位
				Api.methods.getAdvertiseList({}).then(function(res){
					_self.titleNViewBackground = "#FB586A";
					_self.swiperLength = res.data.length;
					_self.carouselList = res.data;
				})
				
				//新品上市
				Api.methods.getNewProductList({}).then(function(res){
					_self.newProductList=res.data
				})
				
				//热卖中
				Api.methods.getPopularityList({}).then(function(res){
					_self.popularityList=res.data
				})
			},
			//点击nav
			navClick(nav){
				if(nav.type == 1){
					// 跳转应用页面
					uni.navigateTo({
						url: nav.url
					})
				}else if(nav.type == 2){
					// 跳转到搜索结果界面
					if(nav.c2 == 0){
						uni.navigateTo({
							url: `/pages/product/list?categoryId=${nav.c1}`
						})
					}else if(nav.c2 == 1){
						uni.navigateTo({
							url: `/pages/product/list?categoryId=${nav.url}`
						})
					}
				}
			},
			//轮播图切
			swiperChange(e) {
				 const index = e.detail.current;
				 this.swiperCurrent = index;
				// this.titleNViewBackground = this.carouselList[index].background;
			},
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.productId;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			navToNewPage(item){
				uni.navigateTo({
					url: item.url
				})
			},
			navTo(url){
				uni.navigateTo({  
					url
				})  
			}
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			uni.navigateTo({
				url: '/pages/index/search'
			})
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('客服系统暂未开发，请移步我的-联系我们');
			} else if (index === 1) {
				// // #ifdef APP-PLUS
				// const pages = getCurrentPages();
				// const page = pages[pages.length - 1];
				// const currentWebview = page.$getAppWebview();
				// currentWebview.hideTitleNViewButtonRedDot({
				// 	index
				// });
				// // #endif
				// uni.navigateTo({
				// 	url: '/pages/notice/notice'
				// })
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	@import "common/scss/index/index.scss";  
</style>
