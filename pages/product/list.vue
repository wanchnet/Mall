<template>
	<view class="content">
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				综合排序
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				销量优先
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				<text>价格</text>
				<view class="p-box">
					<text :class="{active: priceOrder === 1 && filterIndex === 2}" class="yticon icon-shang"></text>
					<text :class="{active: priceOrder === 2 && filterIndex === 2}" class="yticon icon-shang xia"></text>
				</view>
			</view>
			<!-- <text class="cate-item yticon icon-fenlei1" @click="toggleCateMask('show')"></text> -->
		</view>
		<view class="goods-list">
			<view 
				v-for="(item, index) in goodsList" :key="index"
				class="goods-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="encodeURI(item.pic)" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.name}}</text>
				<view class="price-box">
					<text class="price">{{item.price}}</text>
					<text>已售 {{item.sale}}</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		
		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y class="cate-list">
					<view v-for="item in cateList" :key="item.id">
						<view class="cate-item b-b two">{{item.name}}</view>
						<view 
							v-for="tItem in item.child" :key="tItem.id" 
							class="cate-item b-b" 
							:class="{active: tItem.id==cateId}"
							@click="changeCate(tItem)">
							{{tItem.name}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import Api from 'common/js/model.js';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 0, 
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				goodsList: [],
				queryParam:{
					pageNum: 1,
					pageSize: 6,
					sort: 0,
				}
			};
		},
		
		onLoad(options){
			// this.queryParam.categoryId=this.getQueryString("categoryId");
			// this.queryParam.keyword=this.getQueryString("keyword");
			this.queryParam.productCategoryId=options.categoryId;
			this.queryParam.productId=options.productId;
			this.queryParam.keyword=options.keyword;
			this.cateId = options.tid;
			this.loadCateList(options.fid,options.sid);
			this.loadData();
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			//加载分类
			async loadCateList(fid, sid){
				let list = await this.$api.json('cateList');
				let cateList = list.filter(item=>item.pid == fid);
				
				cateList.forEach(item=>{
					let tempList = list.filter(val=>val.pid == item.id);
					item.child = tempList;
				})
				this.cateList = cateList;
			},
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type='add', loading) {
				var _self=this
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
					_self.queryParam.pageNum++
				}
				
				let goodsList = [];
				Api.methods.complex(_self.queryParam).then(function(res){
					var data=res.data.data
					goodsList=res.data.data.list
					//_self.goodsList = _self.goodsList.concat(goodsList);
					if(type === 'refresh'){
						_self.goodsList = [];
					}
					//筛选，测试数据直接前端筛选了
					if(_self.filterIndex === 1){
						goodsList.sort((a,b)=>b.sales - a.sales)
					}
					if(_self.filterIndex === 2){
						goodsList.sort((a,b)=>{
							if(_self.priceOrder == 1){
								return a.price - b.price;
							}
							return b.price - a.price;
						})
					}
					
					_self.goodsList = _self.goodsList.concat(goodsList);
					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					_self.loadingType  = _self.goodsList.length >= data.total ? 'nomore' : 'more';
					if(_self.loadingType=='more'){
						_self.queryParam.pageNum++
					}
					if(type === 'refresh'){
						if(loading == 1){
							uni.hideLoading()
						}else{
							uni.stopPullDownRefresh();
						}
					}
				})
				
			},
			//筛选点击
			tabClick(index){
				if(this.filterIndex === index && index !== 2){
					return;
				}
				this.filterIndex = index;
				if(index === 2){
					this.priceOrder = this.priceOrder === 1 ? 2: 1;
					this.queryParam.sort=this.priceOrder===1 ? 3: 4;
				}else{
					this.priceOrder = 0;
					this.queryParam.sort=index ===0? 0: 2
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.queryParam.pageNum=0;
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			//显示分类面板
			toggleCateMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(()=>{
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(item){
				this.cateId = item.id;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			//详情
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			getQueryString (variable) {
				 var reg = new RegExp("(^|&)" + variable + "=([^&]*)(&|$)");
				 var params=window.location.href.split('?')
				 if(params[1]){
					 var r = params[1].match(reg)
					 if (r!= null) {  
						return decodeURI(r[2]);  
					 }else{  
						return null;  
					 }  
				 }
				 return null
			},
			stopPrevent(){}
		},
	}
</script>

<style lang="scss">
	@import "common/scss/product/list.scss"; 
</style>
