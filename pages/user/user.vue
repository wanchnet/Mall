<template>  
    <view class="container">  
		
		<view class="user-section">
			<!-- <image class="bg" src="/static/user-bg.jpg"></image> -->
			<view class="bg"></view>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.portrait || '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">{{userInfo.nickname || '游客'}}</text>
				</view>
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
				<!-- <view class="b-btn">
					立即开通
				</view> -->
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					星淘优选会员
				</view>
				<!-- <text class="e-m">DCloud Union</text>
				<text class="e-b">开通会员开发无bug 一测就上线</text> -->
			</view>
		</view>
		
		<view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="/static/arc.png"></image>
			
			<view class="tj-sction">
				<view class="tj-item">
					<text class="num">{{userInfo.balance2}}</text>
					<text>余额</text>
				</view>
				<!-- <view class="tj-item">
					<text class="num">0</text>
					<text>优惠券</text>
				</view> -->
				<view class="tj-item">
					<text class="num">{{userInfo.integration}}</text>
					<text>积分</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-shouye"></text>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')"  hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-daifukuan"></text>
					<text>待付款</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-fahuo1"></text>
					<text>待发货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-yishouhuo"></text>
					<text>待收货</text>
				</view>
				
				
				<!-- <view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-shouhoutuikuan"></text>
					<text>退款/售后</text>
				</view> -->
			</view>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<!-- <view class="sec-header">
					<text class="yticon icon-lishijilu"></text>
					<text>浏览历史</text>
				</view>
				<scroll-view scroll-x class="h-list">
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105231218&di=09534b9833b5243296630e6d5b728eff&imgtype=0&src=http%3A%2F%2Fimg002.hc360.cn%2Fm1%2FM05%2FD1%2FAC%2FwKhQcFQ3iN2EQTo8AAAAAHQU6_8355.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105320890&di=c743386be51f2c4c0fd4b75754d14f3c&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fhb%2FMTQ1OTg4ODY0MDA3Ny05OTQ4ODY1NDQ%3D.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2691146630,2165926318&fm=26&gp=0.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105443324&di=8141bf13f3f208c61524d67f9bb83942&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ac9a5548d29b0000019ae98e6d98.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=191678693,2701202375&fm=26&gp=0.jpg" mode="aspectFill"></image>
				</scroll-view> -->
				<list-cell icon="icon-iconfontweixin" iconColor="#e07472" title="充值卡充值" @eventClick="navTo('/pages/money/recharge/recharge')"></list-cell>
				<list-cell icon="icon-icon_signal" iconColor="#e07472" title="个人信息" @eventClick="navTo('/pages/userinfo/userinfo-new')"></list-cell>
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="修改密码" border="" @eventClick="navTo('/pages/userinfo/modifypwd')"></list-cell>
				<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
				<!-- <list-cell icon="icon-share" iconColor="#9789f7" title="分享" tips=""></list-cell> -->
				<!-- <list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="晒单" tips="晒单抢红包"></list-cell> -->
				<!-- <list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏"></list-cell> -->
				<list-cell icon="icon-xunjia" iconColor="#54b4ef" title="联系我们" @eventClick="togglePopup('center', 'image')"></list-cell>
				
			</view>
			
			
			<view v-if="userInfo.nickname" class="list-cell log-out-btn" @click="toLogout">
				<text class="cell-tit">退出登陆</text>
			</view>
			
			<view v-if="! userInfo.nickname" class="list-cell log-out-btn" @click="navTo">
				<text class="cell-tit">去登陆</text>
			</view>
		</view>
			
		
		 <!-- 插屏弹窗 -->
		 <uni-popup ref="image" :type="type" :custom="true" :mask-click="true" @change="change">
		 	<view class="uni-image">
		 		<image class="image" src="/static/image/wx_lianxi.jpg"/>
		 	</view>
		 </uni-popup>
    </view> 
	 
</template>  
<script>  
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import listCell from '@/components/mix-list-cell';
	import Api from 'common/js/model.js';
    import {mapState} from 'vuex';  
	import { mapMutations} from 'vuex';
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			uniPopup,
			listCell,
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				popShow:true,
				show: false,
				type: '',
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.loadUserInfo();
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('客服系统暂未开发，请移步我的-联系我们');
				//this.navTo('/pages/set/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		
		// #endif
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
        methods: {
			...mapMutations(['login','logout']),
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			 togglePopup(type, open) {
			 	switch (type) {
			 		case 'top':
			 			this.content = '顶部弹出 popup'
			 			break
			 
			 		case 'bottom':
			 			this.content = '底部弹出 popup'
			 			break
			 		case 'center':
			 			this.content = '居中弹出 popup'
			 			break
			 	}
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
			 change(e) {
			 	(e.show)
			 },
			loadUserInfo(){
				var _self=this
				Api.methods.loadUserInfo().then(function(res){
					if(res.data.code===200){
						_self.login(res.data.data);
					}else{
						_self.logout()
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
			
			//退出登录
			toLogout(){
				var _self=this;
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.logout();
							Api.methods.logout().then(function(res){
								uni.navigateBack();
							})
				    	}
				    }
				});
			},
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
		
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
        }  
    }  
</script>  
<style lang='scss'>
	@import "common/scss/user/user.scss"; 
	
	.image{
		height: 800upx;
		width: 550upx;
	}
</style>