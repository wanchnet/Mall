<template>
	<view class="content">
		<view class="bg-color-card"></view>
		<view class="image">
			<image class="heardimg" :src="userInfo.portrait || '/static/missing-face.png'" mode=""></image>
		</view>
		<view class="info-card">
			<text class="name" @click="togglePopup('center', 'tip')">{{userInfo.nickname}}</text>
			<view class="sex">
				<image v-if="userInfo.gender == 1" class="sex-img" src="../../static/man.png" @click="togglePopup('center', 'gender')" mode=""></image>
				<image v-if="userInfo.gender == 2" class="sex-img" src="../../static/woman.png" @click="togglePopup('center', 'gender')" mode=""></image>
				<image v-if="userInfo.gender == 0" class="sex-img" src="../../static/sex.png" @click="togglePopup('center', 'gender')" mode=""></image>
			</view>
			<br>
			<view class="phone">
				<image class="p-img" src="../../static/phone.png"></image>
				<text class="p-title" @click="togglePopup('center', 'phone')">{{userInfo.phone || '点击设置'}}</text>
			</view>
			<br>
			<view class="date">
				<image class="d-img" src="../../static/bir.png"></image>
				<view class="d-picker">
					<picker mode="date" style="line-height: 50rpx;" :value="userInfo.birthday" :start="startDate" :end="endDate" @change="bindDateChange">
						<!-- <input type="text" class="d-title" :value="userInfo.birthday" /> -->
						<text class="d-title">{{userInfo.birthday || '点击设置'}}</text>
					</picker>
				</view>
			</view>
			<br>
			<view class="email">
				<image class="e-img" src="../../static/email.png"></image>
				<text class="e-title" @click="togglePopup('center', 'email')">{{userInfo.email || '点击设置'}}</text>
			</view>
			
			
		</view>
		<view class="btn" @click="upUserInfo()">
			<text class="text" @click="upUserInfo()">保存</text>
		</view>
		<view class="" style="text-align: center;width: 100%;bottom: 0rpx;">
			<text style=" font-size: 20rpx ;">*点击信息进行修改*</text>
		</view>
		<!-- 修改弹出窗 -->
		<uni-popup ref="edit" type="center" :custom="true" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-title">修改</view>
				<view class="uni-tip-content">
					<text class="uni-tip-content-left">用户名：</text>
					<input class="uni-tip-content-right" :value="userInfo.nickname" @input="uptempName"/>
				</view>
				<view class="uni-tip-content">
					<text class="uni-tip-content-left">生&emsp;日：</text>
					<input class="uni-tip-content-right" :value="userInfo.birthday" @input="uptempName"/>
				</view>
				<view class="uni-tip-content">
					<text class="uni-tip-content-left">手机号：</text>
					<input class="uni-tip-content-right" :value="userInfo.birthday" @input="uptempName"/>
				</view>
				<view class="uni-tip-content">
					<text class="uni-tip-content-left">性&emsp;别：</text>
					<radio-group class="radio-group" bindchange="radioChange" @change="upTempGender">
						<label class="radio" >
							男<radio class="radio-style" value= 0 :checked="userInfo.gender == 0"/>
						</label>
						<label class="radio" >
							女<radio class="radio-style" value= 1 :checked="userInfo.gender == 1"/>
						</label>
					</radio-group>
				</view>
				<br>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel('edit')">取消</view>
					<view class="uni-tip-button" @click="upName()">确定</view>
				</view>
			</view>
		</uni-popup>
		
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
		<uni-popup ref="email" :type="type" :custom="true" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-title">修改邮箱</view>
				<view class="uni-tip-content"><input v-model="userInfo.email" @input="uptempEmail"/></view>
				<hr style="height:1px;border:none;border-top:1px solid #555555;" />
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel('email')">取消</view>
					<view class="uni-tip-button" @click="upEmail()">确定</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="gender" :type="type" :custom="true" :mask-click="true">
			<view class="uni-tip">
				<view class="uni-tip-title">性别</view>
				<radio-group class="radio-group" bindchange="radioChange" @change="upTempGender">
					<label class="radio" >
						男<radio class="radio-style" value= 1 :checked="userInfo.gender == 1"/>
					</label>
					<label class="radio" >
						女<radio class="radio-style" value= 2 :checked="userInfo.gender == 2"/>
					</label>
				</radio-group>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel('gender')">取消</view>
					<view class="uni-tip-button" @click="upGender()">确定</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="phone" type="center" :custom="true" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-title">修改</view>
				<view class="uni-tip-content">
					<text class="uni-tip-content-left">手机号：</text>
					<input class="uni-tip-content-right" :value="userInfo.phone" @input="uptempPhone"/>
				</view>
				<view class="uni-tip-content">
					<text class="uni-tip-content-left">验证码：</text>
					<input class="uni-tip-content-code" v-model="code"/>
					<!-- <button size="mini" v-if="!time" class="uni-tip-btn" type="primary">验证码</button> -->
					<text class="uni-tip-text" @tap="getsmscode">{{smsbtn.text}}</text>
				</view>
				<br>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel('phone')">取消</view>
					<view class="uni-tip-button" @click="upPhone()">确定</view>
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
				tempPhone:'',
				tempEmail:'',
				userInfo:{
					username:"",
					phone:"",
					createTime:"",
					balance2:"",
					integration:"",
					email:"",
					birthday:"",
				},
				time:false,
				code:"",
				token:"",
				smsbtn: {
					text: '验证码',
					status: false,
					codeTime: 60,
					loading: false,
				}
			}; 
		},
		computed: {
			...mapState(['hasLogin','userInfo']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
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
					if(open === 'phone'){
						this.code='';
					}
					this.$refs[open].open()
				}
			},
			bindDateChange: function(e) {
				this.userInfo.birthday = e.target.value
			},
			getsmscode: function() {
				var _self=this;
				if (this.smsbtn.status == true ) {
					this.$api.msg("别着急！短信已经发送了~");
					return false;
				}
				this.smsbtn.status = true; // 这段代码其实应该加在你request请求 短信发送成功后 
				this.smsbtn.loading = true;
				Api.methods.sendSms({"phone":this.tempPhone}).then(function(res){
					console.log(res)
					// if(res.data.res === -1){
					// 	_self.$api.msg(res.data.msg)
					// 	_self.smsbtn.loading = false;
					// }
				})
				this.timerId = setInterval(() => {
						var codeTime = this.smsbtn.codeTime;
						codeTime--;
						this.smsbtn.codeTime = codeTime;
						this.smsbtn.text = codeTime + "S";
						if (codeTime < 1 || !this.smsbtn.loading) {
							clearInterval(this.timerId);
							this.smsbtn.text = "重新获取";
							this.smsbtn.codeTime = 60;
							this.smsbtn.status = false;
							_self.smsbtn.loading = false;
						}
					},
					1000);
				return false;
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			loadUserInfo(){
				var _self=this;
				Api.methods.loadUserInfo().then(function(res){
					if(res.data.code===200){
						_self.login(res.data.data);
						_self.userInfo=res.data.data;
						_self.tempGender=res.data.data.gender
						_self.tempName=res.data.data.username
						_self.tempPhone=res.data.data.phone
						_self.tempEmail=res.data.data.email
						_self.token=res.data.data.token
						console.log(res.data.data.token)
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
			uptempEmail(event){
				this.tempEmail=event.detail.value
			},
			upEmail(){
				this.userInfo.email=this.tempEmail;
				this.cancel('email')
			},
			uptempPhone(event){
				this.tempPhone=event.detail.value
			},
			upPhone(){
				var _self = this;
				/* 验证手机号验证码 */
				Api.methods.checkSms({"code":this.code,"phone":this.tempPhone}).then(function(res){
					console.log("hdafgsjh" + JSON.stringify(res))
					if(res.data.code === 200){
						_self.userInfo.phone = _self.tempPhone;
						_self.cancel('phone');
					}else{
						_self.cancel('phone');
						_self.$api.msg("验证码输入错误！")
					}
					
				})
				
			},
			upUserInfo(){
				var _self = this;
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
@import './userinfo-new.scss';
</style>
