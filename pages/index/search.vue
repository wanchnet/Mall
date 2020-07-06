<template>
	<view class="content">
		<view class="bangs"></view>
		<view class="margin grid col-2 search-row">
			<view class="grid col-2 input-group">
				<view class="search-icon">
					<image class="search-img" src="../../static/icon/search.png" mode="aspectFill"></image>
				</view>
				<view class="search-input "><input :placeholder="placeholder" confirm-type="search" v-model="keywords" @confirm="submitSearch" :placeholder-class="placeholder" /></view>
			</view>
			<view class="opt text-right">
				<view class="btn-cancel" v-if="!isSearch" @click="navigateBack">取消</view>
				<view class="btn-search" v-if="isSearch" @click="submitSearch">搜索</view>
			</view>
		</view>
		<view class="hostory">
			<view class="title">
				<text style="line-height: 70rpx;"> 搜索历史</text>
				<image class="detele" src="../../static/icon/del.png" @click="removehostory()" mode="aspectFill"></image>
			</view>
			<view class="list-keyword">
				<view class="keyword" v-for="(item, index) in oldWords" :key="index" @click="search(item)">{{ item }}</view>
			</view>
		</view>
		<view style="clear: both;"></view>
		<view class="hostory">
			<view class="title">
				<text style="line-height: 70rpx;"> 热门搜索</text>
				<image class="detele" src="../../static/icon/hot.png" mode="aspectFill"></image>
			</view>
			<view class="list-keyword">
				<view class="keyword" v-for="(item, index) in keywordlist" :key="index" @click="search(item)">{{ item }}</view>
			</view>
		</view>
<!-- 		<view class="margin  keywords">
			<view class="title">
				<text style="line-height: 50rpx;"> 搜索历史：</text>
			</view>
			<view class="list-keyword">
				<view class="keyword" v-for="(item, index) in oldWords" :key="index" @click="search(item)">{{ item }}</view>
			</view>
		</view>
		<view class="margin  keywords">
			<view class="title">热门搜索：</view>
			<view class="list-keyword">
				<view class="keyword" v-for="(item, index) in keywordlist" :key="index" @click="search(item)">{{ item }}</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import Api from '../../common/js/model.js';
export default {
	data() {
		return {
			isSearch: false,
			placeholder: '苹果',
			keywords: '',
			keywordlist: [],
			oldWords:[],
			current: 0
		};
	},
	// mounted() {
	// 	this.initHotWords();
	// },
	onShow() {
		this.initHotWords();
		this.oldWords = uni.getStorageSync("oldword");
		if(!this.oldWords){
			this.oldWords = [];
		}
	},
	methods: {
		removehostory(){
			uni.removeStorageSync("oldword");
			this.oldWords = [];
		},
		navigateBack: function() {
			uni.navigateBack();
		},
		searchInput: function(e) {
			this.keywords = e.detail.value;
		},
		submitSearch: function() {
			//热搜词存储
			Api.methods.saveHotWords({"word":this.keywords}).then(function(res){
			})
			if(this.oldWords.indexOf(this.keywords) == -1){
				this.oldWords.push(this.keywords)
			}
			uni.setStorageSync("oldword",this.oldWords);
			uni.navigateTo({
				url: '/pages/product/list?keyword=' + this.keywords
			});
		},
		search(keyword) {
			uni.navigateTo({
				url: '/pages/product/list?keyword=' + keyword
			});
		},
		initHotWords(){
			let _self = this;
			Api.methods.getHotWords({}).then(function(res){
				var result = res.data
				if(result.code === 200){
					_self.keywordlist = res.data.data;
				}else{
					_self.$api.msg("热搜词初始化失败！")
				}
			})
		}
		
		
	}
};
</script>

<style lang="scss">
@import './search.scss';
</style>
