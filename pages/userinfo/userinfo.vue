<template>
	<view>
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<text class="bg-upload-btn yticon icon-paizhao"></text>
			<view class="portrait-box">
				<image class="portrait" :src="userInfo.portrait || '/static/missing-face.png'"></image>
				<text class="pt-upload-btn yticon icon-paizhao"></text>
			</view>
		</view>
		<uni-list>
			<uni-list-item title="会员昵称" :note="userInfo.nickname" @click="togglePopup('center', 'tip')"/>
			<uni-list-item v-if="userInfo.gender == 0" show-arrow="false" title="性别"  note="男" @click="togglePopup('center', 'gender')"></uni-list-item>
			<uni-list-item v-if="userInfo.gender == 1" show-arrow="false" title="性别"  note="女" @click="togglePopup('center', 'gender')"></uni-list-item>
			<uni-list-item :show-arrow="false" disabled="true" title="手机号" :note="userInfo.phone" />
			<uni-list-item :show-arrow="false" disabled="true" title="注册时间" :note="userInfo.createTime | time" />
		</uni-list>
		<button class="btn" @click="upUserInfo()">保存</button>
		<button class="btn" @click="ceshi()">ceshi</button>
		
		<uni-popup :show="show" :type="type" :custom="true" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-title">修改用户名</view>
				<view class="uni-tip-content"><input :value="userInfo.nickname" @input="uptempName"/></view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel('tip')">取消</view>
					<view class="uni-tip-button" @click="upName()">确定</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="gender" :type="type" :custom="true" :mask-click="true">
			<view class="uni-tip">
				<view class="uni-tip-title">性别</view>
				<radio-group class="radio-group" bindchange="radioChange" @change="upTempGender">
					<label class="radio" >
						男<radio value= 0 :checked="userInfo.gender == 0"/>
					</label>
					<label class="radio" >
						女<radio value= 1 :checked="userInfo.gender == 1"/>
					</label>
				</radio-group>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel('gender')">取消</view>
					<view class="uni-tip-button" @click="upGender">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {mapState,mapMutations } from 'vuex';
	import Api from 'common/js/model.js';
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniList,
			uniListItem,
			uniPopup
		},
		data() {
			return {
				show: false,
				type: '',
				tempName:'',
				tempGender:0,
				userInfo:{
					username:"",
					phone:"",
					createTime:"",
					balance2:"",
					integration:""
				}
			}; 
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		filters: {
				time: function time(value) {
					if(!value){
						return ''
					}
					var year = value.substr(0, 4)
					var month = value.substr(5, 2)
					var day = value.substr(8, 2)
					var hour = value.substr(11, 2)
					var min = value.substr(14, 2)
					var seconds = value.substr(17, 2)
					return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + seconds;
				}
		},
		onShow(){
			this.loadUserInfo();
		},
		methods:{
			...mapMutations(['login','logout']),
			togglePopup(type, open) {
				this.type = type
				if (open === 'tip') {
					this.show = true
				} else {
					this.$refs[open].open()
				}
			},
			ceshi(){
				uni.navigateTo({
					url:'./userinfo-new'
				})
			},
			loadUserInfo(){
				var _self=this;
				Api.methods.loadUserInfo().then(function(res){
					if(res.data.code===200){
						_self.login(res.data.data);
						_self.userInfo=res.data.data;
						_self.tempGender=res.data.data.gender
						_self.tempName=res.data.data.username
					}else{
						_self.logout()
						uni.navigateTo({
							url :'/pages/public/login'
						})
					}
				})
			},
			cancel(type) {
				if (type === 'tip') {
					this.show = false
					return
				}
				this.$refs[type].close()
			},
			uptempName(event){
				this.tempName=event.detail.value
			},
			upName(){
				this.userInfo.nickname=this.tempName;
				this.cancel('tip')
			},
			upUserInfo(){
				var _self=this;
				Api.methods.upUserInfo(_self.userInfo).then(function(res){
					var result = res.data
					if(result.code === 200){
						_self.$api.msg("修改成功")
					}else{
						_self.$api.msg("修改失败，请重试")
					}
				})
			},
			upTempGender(event){
				this.tempGender=event.detail.value
			},
			upGender(){
				this.userInfo.gender=this.tempGender;
				this.cancel('gender')
			}
		}
	}
</script>

<style lang="scss">
	@import "common/scss/userinfo/userinfo.scss"; 
</style>
