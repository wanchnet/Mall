import request from 'plugins/request/js/index';
import store from 'store/index';

export default {
	data(){
		return {
			
		}
	},

	methods: {		
		
		getAdvertiseList(data){
			const instance = new request();		
			return instance.get({
				url: "/recommend/getAdvertiseList",
				data: data,
				contentType: 'json',
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		getNewProductList(data){
			const instance = new request();
			return instance.get({
				url: "/recommend/getNewProductList",
				data: data,
				contentType: 'json',
				header: {
					"token":store.state.token
				}
				
			});
		},
		getNewProductId(data){
			const instance = new request();
			return instance.get({
				url: "/recommend/getNewProductId",
				data: data,
				contentType: 'json',
				header: {
					"token":store.state.token
				}
				
			});
		},
		getPopularityList(data){
			const instance = new request();
			return instance.get({
				url: "/recommend/getPopularityList",
				data: data,
				contentType: 'json',
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		
		getPopularityId(data){
			const instance = new request();
			return instance.get({
				url: "/recommend/getPopularityId",
				data: data,
				contentType: 'json',
				header: {
					"token":store.state.token
				}
				
			});
		},
		getNavList(data){
			const instance = new request();
			return instance.post({
				url: "/nav/getNavList",
				data: data,
				contentType: 'json',
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//获取第一级分类
		getFirstLevelList(data){
			const instance = new request();
			return instance.get({
				url: "/category/getFirstLevelList",
				data: data,
				contentType: 'json',
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//获取二级分类
		getSecondaryLevelList(data){
			const instance = new request();
			return instance.get({
				url: "/category/getSecondaryLevelList",
				data: data,
				contentType: 'json',
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		login(data){
			const instance = new request();
			return instance.post({
				url: "/user/login",
				type: 'post',
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		checkWeChatUser(data){
			const instance = new request();
			return instance.post({
				url: "/user/checkWeChatUser",
				type: 'post',
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		MPWeChatLogin(data){
			const instance = new request();
			return instance.post({
				url: "/user/MPWeChatLogin",
				type: 'post',
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		directLogin(data){
			const instance = new request();
			return instance.get({
				url: "/user/directLogin",
				type: 'get',
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		logout(data){
			const instance = new request();
			return instance.get({
				url: "/user/outLogin",
				data: data,
				contentType: 'json',
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		getImgCode(data){
			const instance = new request();
			return instance.get({
				url: "/code/getImgCode",
				type: 'get',
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		// 商品搜索
		complex(data){
			const instance = new request();
			return instance.post({
				url: "/search/complex",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//获取商品详情
		getProductDetail(data){
			const instance = new request();
			return instance.get({
				url: "/product/getProductDetail",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		// 根据商品获取当前商品可用的优惠券
		getCouponsByProductId(data){
			const instance = new request();
			return instance.post({
				url: "/coupon/getCouponsByProductId",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//领取优惠券
		receiveCoupon(data){
			const instance = new request();
			return instance.get({
				url: "/coupon/receiveCoupon",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//获取商品sku列表
		getSkuStockList(data){
			const instance = new request();
			return instance.get({
				url: "/skuStock/getSkuStockList",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//获取商品属性列表
		getProductAttributeList(data){
			const instance = new request();
			return instance.get({
				url: "/attribute/getProductAttributeList",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//加载用户信息
		loadUserInfo(data){
			const instance = new request();
			return instance.get({
				url: "user/getMyInfo",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//获取购物车列表
		getCartList(data){
			const instance = new request();
			return instance.get({
				url: "cart/intercept/getCartList",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//添加到购物车
		addCartItem(data){
			const instance = new request();
			return instance.post({
				url: "/cart/intercept/addCartItem",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//从购物车删除
		removeCartItem(data){
			const instance = new request();
			return instance.get({
				url: "cart/intercept/removeCartItem",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//修改购物车中商品数量
		upCartNum(data){
			const instance = new request();
			return instance.post({
				url: "cart/intercept/upCartNum",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//清空购物车
		clearCart(data){
			const instance = new request();
			return instance.get({
				url: "cart/intercept/clearCart",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//获取默认收货地址
		getDefaultReceiptInfo(data){
			const instance = new request();
			return instance.get({
				url: "receipt/intercept/getDefaultReceiptInfo",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//获取用户收获地址列表
		getReceiptInfoList(data){
			const instance = new request();
			return instance.get({
				url: "receipt/intercept/getReceiptInfoList",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//添加收货地址
		addReceipt(data){
			const instance = new request();
			return instance.post({
				url: "receipt/intercept/addReceipt",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//修改收货地址
		upReceipt(data){
			const instance = new request();
			return instance.post({
				url: "receipt/intercept/upReceipt",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//获取收货地址信息
		getReceiptInfoById(data){
			const instance = new request();
			return instance.get({
				url: "receipt/intercept/getReceiptInfoById",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//解析收货地址
		addressResolution(data){
			const instance = new request();
			return instance.get({
				url: "receipt/addressResolution",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//确认订单信息
		confirmOrder(data){
			const instance = new request();
			return instance.post({
				url: "/order/intercept/confirmOrder",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//检查当前用户当前商品可用优惠券
		checkCouponsUsable(data){
			const instance = new request();
			return instance.post({
				url: "/coupon/checkCouponsUsable",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//创建普通订单
		createOrder(data){
			const instance = new request();
			return instance.post({
				url: "/order/intercept/createOrder",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//创建购物车订单
		addCartOrder(data){
			const instance = new request();
			return instance.post({
				url: "/order/intercept/addCartOrder",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//获取订单信息
		getOrderInfo(data){
			const instance = new request();
			return instance.get({
				url: "/order/intercept/getOrderInfo",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//获取订单详情
		getOrderDetails(data){
			const instance = new request();
			return instance.get({
				url: "/order/intercept/getOrderDetails",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		getAllOrderList(data){
			const instance = new request();
			return instance.get({
				url: "/order/intercept/getAllOrderList",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		getWaitingPayList(data){
			const instance = new request();
			return instance.get({
				url: "/order/intercept/getWaitingPayList",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		getCompletedList(data){
			const instance = new request();
			return instance.get({
				url: "/order/intercept/getCompletedList",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		getWaitingReceiptList(data){
			const instance = new request();
			return instance.get({
				url: "/order/intercept/getWaitingReceiptList",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		getWaitingShipList(data){
			const instance = new request();
			return instance.get({
				url: "/order/intercept/getWaitingShipList",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//取消订单
		cancelOrder(data){
			const instance = new request();
			return instance.get({
				url: "/order/intercept/cancelOrder",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//取消支付
		cancelPay(data){
			const instance = new request();
			return instance.get({
				url: "/order/intercept/cancelPay",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//删除订单
		deleteOrder(data){
			const instance = new request();
			return instance.get({
				url: "/order/intercept/deleteOrder",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//确认收货
		confirmReceipt(data){
			const instance = new request();
			return instance.get({
				url: "/order/intercept/confirmReceipt",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		wxH5Pay(data){
			const instance = new request();
			return instance.get({
				url: "/payCenter/wxpay/intercept/wapPay",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		wxAppletsPay(data){
			const instance = new request();
			return instance.get({
				url: "/payCenter/wxpay/intercept/appletsPay",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		wxAppPay(data){
			const instance = new request();
			return instance.get({
				url: "/payCenter/wxpay/intercept/appPay",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		giftPay(data){
			const instance = new request();
			return instance.get({
				url: "/payCenter/giftPay/intercept/wapPay",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		AliH5Pay(data){
			const instance = new request();
			return instance.get({
				url: "/payCenter/alipay/intercept/wapPay",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		AliAppPay(data){
			const instance = new request();
			return instance.get({
				url: "/payCenter/alipay/intercept/appPay",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		checkImgCode(data){
			const instance = new request();
			return instance.get({
				url: "/code/checkImgCode",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		register(data){
			const instance = new request();
			return instance.post({
				url: "/user/register",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		getOrderDetails(data){
			const instance = new request();
			return instance.get({
				url: "/order/intercept/getOrderDetails",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		upUserInfo(data){
			const instance = new request();
			return instance.post({
				url: "/user/intercept/upUser",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		findpwd(data){
			const instance = new request();
			return instance.post({
				url: "/user/findpwd",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		upPwd(data){
			const instance = new request();
			return instance.get({
				url: "/user/intercept/upPwd",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		recharge(data){
			const instance = new request();
			return instance.post({
				url: "/rechargeCard/intercept/recharge",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		getReturnReasonList(data){
			const instance = new request();
			return instance.get({
				url: "/return/intercept/getReturnReasonList",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		//申请退款
		applyReturnApply(data){
			const instance = new request();
			return instance.post({
				url: "/returnApply/intercept/applyReturnApply",
				contentType: 'json',
				data: JSON.stringify(data),
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		sendSms(data){
			const instance = new request();
			return instance.get({
				url: "/user/sendSms",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		checkSms(data){
			const instance = new request();
			return instance.get({
				url: "/user/checkSms",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		getProductFlashById(data){
			const instance = new request();
			return instance.get({
				url: "/product/getProductFlashById",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		saveHotWords(data){
			const instance = new request();
			return instance.get({
				url: "/HotSearch/saveHotWords",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
		getHotWords(data){
			const instance = new request();
			return instance.get({
				url: "/HotSearch/getHotWords",
				contentType: 'json',
				data: data,
				header: {
					"token":store.state.token
				},
				xhrFields: {
					withCredentials: true // 这里设置了withCredentials
				}
			});
		},
	},
	
	
}
