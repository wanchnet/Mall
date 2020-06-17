<template>
	<view class="content">
		<view class="bangs"></view>
		<view class="margin grid col-2 search-row">
			<view class="grid col-2 input-group">
				<view class="search-icon"></view>
				<view class="search-input "><input :placeholder="placeholder" confirm-type="search" v-model="keywords" @confirm="submitSearch" :placeholder-class="placeholder" /></view>
			</view>
			<view class="opt text-right">
				<view class="btn-cancel" v-if="!isSearch" @click="navigateBack">取消</view>
				<view class="btn-search" v-if="isSearch" @click="submitSearch">搜索</view>
			</view>
		</view>
		<view class="margin  keywords">
			<view class="title">热门搜索：</view>
			<view class="list-keyword">
				<view class="keyword" v-for="(item, index) in keywordlist" :key="index" @click="search(item.value)">{{ item.value }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isSearch: false,
			placeholder: 'iphone 11',
			keywords: '',
			keywordlist: [
				{ value: '抽纸' },
				{ value: '洗面奶' },
				{ value: '洗衣液' },
				{ value: '卫生巾' },
				{ value: '短袜' },
				{ value: '垃圾袋' },
				{ value: '行李箱' },
				{ value: '洗发水' }
			],
			current: 0
		};
	},
	methods: {
		navigateBack: function() {
			uni.navigateBack();
		},
		searchInput: function(e) {
			this.keywords = e.detail.value;
		},
		submitSearch: function() {
			uni.navigateTo({
				url: '/pages/product/list?keyword=' + this.keywords
			});
		},
		search(keyword) {
			uni.navigateTo({
				url: '/pages/product/list?keyword=' + keyword
			});
		}
	}
};
</script>

<style lang="scss">
@import './search.scss';
</style>
