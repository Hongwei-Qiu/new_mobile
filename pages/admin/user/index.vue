<template>
	<view class="caigou_index">
		<!-- #ifdef APP-PLUS |H5 -->
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<!-- #endif -->
		<view class="user">
			<view class="top flex flex_align_center">
				<view class="logo">
					个人中心
				</view>
				<view>
					<view class="nickname">{{mineData.name}}</view>
					<view class="phone">手机：{{mineData.mobile}}</view>
				</view>
			</view>
			<view class="list">
				<view class="item flex flex_between" v-for="item in userList" @click="toPage(item)">
					<view class="left">
						<text :class="'iconfont ' + item.icon"></text>
						<text>{{item.name}}</text>
					</view>
					<view class="right">
						<text class="iconfont iconyou"></text>
					</view>
				</view>
			</view>
		</view>
		<tabar tabarIndex="4"></tabar>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import tabar from "../../../components/tabbar/admin.vue"
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			tabar
		},
		data() {
			return {
				navBar: navBar,
				mineData: '',
				token: '',
				userinfo: '',
				userList: [{
						icon: 'iconmima',
						name: '修改密码',
						url: '/pages/admin/user/forget'
					},
					{
						icon: 'iconwenti',
						name: '常见问题',
						url: '/pages/admin/user/issue'
					},
					{
						icon: 'iconwodezhangdan',
						name: '操作记录',
						url: '/pages/admin/user/record'
					},

					{
						icon: 'icontuichudenglu',
						name: '退出登录',
					}

				],
			}
		},
		methods: {
			toPage(data) {
				if (data.name == "退出登录") {
					var that = this;
					uni.showModal({
						content: '是否退出登录？',
						cancelText: "取消",
						cancelColor: "#999",
						confirmText: "确认",
						confirmColor: '#04A98E',
						success: function(res) {
							if (res.confirm) {
								var timeStamp = Math.round(new Date().getTime() / 1000);
								var obj = {
									appid: appid,
									timeStamp: timeStamp,
								}
								var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
								var data = {
									appid: appid,
									timeStamp: timeStamp,
									sign: sign,
								}
								rs.getRequests("logout", data, (res) => {
									if (res.data.code == 200) {
										rs.Toast(res.data.data)
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
										rs.Toast(res.data.msg)
									}
								})

							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
				} else {
					uni.navigateTo({
						url: data.url
					});
				}

			},
			mine() {
				let that = this;
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					timeStamp: timeStamp,
					sign: sign,
				}
				rs.getRequests("mine", data, (res) => {
					if (res.data.code == 200) {
						that.mineData = res.data.data;
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
		},
		onShow() {
			var that = this;
			this.token = uni.getStorageSync("token")
			that.mine();
			}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.user .top {
		padding: 50rpx 30rpx;
		border-bottom: 10rpx solid #FBF8FB;
	}

	.user .top .logo {
		width: 90rpx;
		height: 90rpx;
		background: rgba(3, 169, 142, 0.5);
		color: #ffffff;
		border-radius: 50%;
		padding: 10rpx;
		font-size: 32rpx;
		text-align: center;
		margin-right: 30rpx;
	}

	.user .top .nickname {
		margin-bottom: 10rpx;
	}

	.user .top .phone {
		font-size: 28rpx;
		font-weight: 400;
	}

	.user .list {
		padding: 20rpx 25rpx;
	}

	.user .list .item {
		font-size: 28rpx;
		font-weight: 400;
		padding-bottom: 25rpx;
		border-bottom: 1px solid #F0F0F0;
		margin-bottom: 25rpx;
	}

	.user .list .item:last-child {
		border: none;
	}

	.user .list .item .iconfont {
		font-size: 28rpx;
		font-weight: 400;
		margin-right: 20rpx;
		color: #C2C2C2;
	}

	.user .list .item .right .iconfont {
		font-size: 28rpx;
		font-weight: 400;
		margin-right: 20rpx;
		color: #C2C2C2;
	}
</style>
