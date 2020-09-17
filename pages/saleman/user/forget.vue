<template>
	<view class="caigou_index">
		<uni-nav-bar left-icon="back" left-text="" title="修改密码" :status-bar="navBar" color="#1A1A1A" @clickLeft="goPage"></uni-nav-bar>
		<view style="height: 90rpx;background: #F9F9F9;"></view>
		<view class="inp_box">
			<view class="item">
				<text>原密码</text>
				<input type="password" placeholder="请输入原密码" v-model="old_pwd"/>
			</view>
			<view class="item">
				<text>新密码</text>
				<input type="password" placeholder="请输入新密码" v-model="password"/>
			</view>
			<view class="item">
				<text>确定密码</text>
				<input type="password" placeholder="请再次输入新密码" v-model="password_confirmation" />
			</view>
			<view class="btn" @click="submit">确定</view>
		</view>


	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				navBar: navBar,
				old_pwd:"",
				password:"",
				password_confirmation:"",
				count:0
			}
		},
		methods: {
			goPage(){
			// #ifdef H5
			window.history.back(-1);
			// #endif 
			// #ifndef H5
			uni.navigateBack({
				delta: 1
			});
			// #endif	
			},
			// 手机登录
			submit() {
				var that = this;
				let timeStamp = Math.round(new Date().getTime() / 1000);
				if (!that.old_pwd) {
					rs.Toast('旧密码不能为空');
					return;
				}
				if (!that.password) {
					rs.Toast('请输入新密码');
					return;
				}
				if (!that.password_confirmation) {
					rs.Toast('请确认新密码');
					return;
				}
				if (that.password_confirmation != that.password) {
					rs.Toast('两次输入的密码不一致，请重新确认密码');
					return;
				}
				this.count++;
				if(this.count!=1)return;
				setTimeout(()=>{
					this.count=1
				},1000)
				let obj = {
					old_pwd: that.old_pwd,
					password: that.password,
					password_confirmation: that.password_confirmation,
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						sign: sign
					},
					obj
				);
				rs.postRequests('salesmanModifyPassword', params, res => {
					let data = res.data;
					if (data.code == 200) {
						rs.Toast('修改成功');
						setTimeout(function() {
							uni.clearStorage({
								success: function(reg) {
									uni.navigateTo({
										url: '/pages/account/login'
									});
								}
							})
						}, 1000);
					} else {
						rs.Toast(data.msg);
					}
				});
			},

		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	.inp_box{
		padding: 0 15rpx;
	}
	.inp_box .item{
		display: flex;
		padding: 25rpx 0;
		border-bottom: 1px solid #F0F0F0;
	}
	.inp_box .item text:nth-child(1){
		width: 160rpx;
	}
	.inp_box .btn{
		color: #ffffff;
		background: #03A98E;
		text-align: center;
		padding: 15rpx 0;
		border-radius: 50rpx;
		margin: 0 80rpx;
		margin-top: 60rpx;
	}

	
</style>
