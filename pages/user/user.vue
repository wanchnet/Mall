<template>  
    <view class="container">  
		<view class="user-section">
			<!-- <image class="bg" src="/static/user-bg.jpg"></image> -->
			<view class="bg"></view>
			<view class="user-info-box">
				<view class="portrait-box" @click="navTo('/pages/userinfo/userinfo-new')">
					<image class="portrait" :src="userInfo.portrait || '/static/icon/face.png'"></image>
				</view>
				<view class="info-box" @click="navTo('/pages/userinfo/userinfo-new')">
					<text class="username" style="font-weight: bold; color: #FFFFFF;">{{userInfo.nickname || '游客'}}</text>
				</view>
				<!-- #ifndef MP -->
				<view style="width: 45rpx; height: 45rpx; margin-top: 25rpx; float: right;">
					<image style="width: 35rpx; height: 35rpx;" src="../../static/icon/customer.png" @click="msg()" mode="aspectFill"></image>
				</view>
				<!-- #endif -->
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/icon/member.png" mode="aspectFill"></image>
				<!-- <view class="b-btn">
					立即开通
				</view> -->
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					优选会员
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
			<!-- <image class="arc" src="/static/arc.png"></image> -->
			
			<view class="tj-sction">
				<view class="tj-item">
					<text class="num">{{userInfo.balance2 || '0'}}</text>
					<text>余额</text>
				</view>
				<!-- <view class="tj-item">
					<text class="num">0</text>
					<text>优惠券</text>
				</view> -->
				<view class="tj-item">
					<text class="num">{{userInfo.integration || '0'}}</text>
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
			<u-cell-group style="margin-top: 30rpx;">
				<u-cell-item icon="rmb-circle-fill" iconSize="38" iconColor="#9789f7" title="充值卡充值" @click="navTo('/pages/money/recharge/recharge')"></u-cell-item>
				<u-cell-item icon="account-fill" iconSize="38" iconColor="#fa3534" title="个人信息" @click="navTo('/pages/userinfo/userinfo-new')"></u-cell-item>
				<u-cell-item icon="lock-fill" iconSize="38" iconColor="#ee883b" title="修改密码" @click="navTo('/pages/userinfo/modifypwd')"></u-cell-item>
				<u-cell-item icon="pushpin-fill" iconSize="38" iconColor="#54b4ef" title="地址管理" @click="navTo('/pages/address/address')"></u-cell-item>
				<u-cell-item icon="phone-fill" iconSize="38" iconColor="#5fcda2" title="联系我们" @click="togglePopup('center', 'image')"></u-cell-item>
			</u-cell-group>
		<!-- 	<view class="history-section icon">
				<list-cell icon="icon-iconfontweixin" iconColor="#e07472" title="充值卡充值" @eventClick="navTo('/pages/money/recharge/recharge')"></list-cell>
				<list-cell icon="icon-icon_signal" iconColor="#e07472" title="个人信息" @eventClick="navTo('/pages/userinfo/userinfo-new')"></list-cell>
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="修改密码" @eventClick="navTo('/pages/userinfo/modifypwd')"></list-cell>
				<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell> -->
				<!-- <list-cell icon="icon-share" iconColor="#9789f7" title="分享" tips=""></list-cell> -->
				<!-- <list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="晒单" tips="晒单抢红包"></list-cell> -->
				<!-- <list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏"></list-cell> -->
<!-- 				<list-cell icon="icon-xunjia" iconColor="#54b4ef" title="联系我们" @eventClick="togglePopup('center', 'image')"></list-cell>
				
			</view> -->
			
			
			<view v-if="userInfo.nickname" class="list-cell log-out-btn" @click="toLogout">
				<text class="cell-tit">退出登录</text>
			</view>
			
			<view v-if="! userInfo.nickname" class="list-cell log-out-btn" @click="navTo">
				<text class="cell-tit">去登录</text>
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
			msg(){
				this.$api.msg('客服系统暂未开发，请移步我的-联系我们');
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