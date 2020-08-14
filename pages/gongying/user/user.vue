<template>
	<view class="caigou_index">
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
		<tabar :tabarIndex="tabNum"></tabar>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import tabar from "../../../components/tabbar/gongying.vue"
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
				tabNum: 4,
				mineData: '',
				token: '',
				userinfo: '',
				userList: [{
						icon: 'iconmima',
						name: '修改密码',
						url: '/pages/gongying/user/forget'
					},
					{
						icon: 'iconwenti',
						name: '常见问题',
						url: '/pages/gongying/user/issue'
					},
					{
						icon: 'iconwodezhangdan',
						name: '各月账单',
						url: '/pages/gongying/user/bill'
					},
					{
						icon: 'icontuihuo',
						name: '退货单',
						url: '/pages/gongying/user/refund'
					},
					{
						icon: 'iconbangdingweixin',
						url: 'bindWeChat',
						name: '绑定微信',
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
						cancelText: "我再想想",
						cancelColor: "#999",
						confirmText: "确认",
						confirmColor: "#DEC17C",
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
				} else if (data.url == 'bindWeChat') {
					// #ifdef H5
					this.adminisus_weixin()
					// #endif

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
			// h5绑定微信
			adminisus_weixin() {
				console.log("H5绑定")
				var that = this;
				uni.showModal({
					content: this.is_bind == 1 ? '是否微信改绑' : '是否绑定微信',
					cancelText: "我再想想",
					cancelColor: "#999",
					confirmText: "确认",
					confirmColor: "#DEC17C",
					success: function(res) {
						if (res.confirm) {
							uni.setStorageSync('isWeixin', true)
							let code = location.search;
							let getCode = code.substring(code.indexOf('=') + 1, code.lastIndexOf('&'));
							if (!getCode) {
								let url = window.location.href;
								let redirect_uri = encodeURIComponent(url);
								let a = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
									"appid=" + that.userinfo.appId + "&redirect_uri=" + redirect_uri +
									"&response_type=code&scope=snsapi_userinfo#wechat_redirect"
								window.location.href = a;
							}
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			wxConfig() {
				if (this.token) {
					var that = this
					var timeStamp = Math.round(new Date().getTime() / 1000);
					var obj = {
						appid: appid,
						timeStamp: timeStamp,
					}
					var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
					var data = {
						appid: appid,
						type: 1,
						timeStamp: timeStamp,
						sign: sign,
					}
					rs.getRequests("wxParams", data, (res) => {
						if (res.data.code == 200) {
							this.userinfo = res.data.data;
							wx.config({
								debug: false, // 开启调试模式
								appId: res.data.data.appId, // 必填，公众号的唯一标识
								timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
								nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
								signature: res.data.data.signature, // 必填，签名，见附录1
								jsApiList: [
									'updateAppMessageShareData', 'onMenuShareAppMessage'
								] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});
						}
					})
				}

			}


		},
		onShow() {
			var that = this;
			this.token = uni.getStorageSync("token")
			that.mine();
			//H5
			// #ifdef H5
			that.wxConfig();
			let code = location.search;
			let getCode = code.substring(code.indexOf('=') + 1, code.lastIndexOf('&'));
			let isWeixin = uni.getStorageSync('isWeixin');
			if (isWeixin && getCode) {
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
					code: getCode,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					code: getCode,
					timeStamp: timeStamp,
					sign: sign,
				}
				rs.postRequests("buyerBind", data, (res) => {
					uni.clearStorageSync('isWeixin')
					getCode = '';
					// console.log(res)
					if (res.data.code == 200) {
						rs.Toast('绑定微信成功')
						setTimeout(function() {
							uni.clearStorage({
								success: function(reg) {
									uni.navigateTo({
										url: '/pages/account/login'
									});
								}
							})
						}, 1000);
						// uni.setStorageSync('is_miniBind', 1)
						// that.is_bind = uni.getStorageSync("is_miniBind")
					} else {
						rs.Toast(res.data.msg)
					}
				})

			}
			// #endif
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
<!-- <view class="user">
	<view class="list">
		<view class="item">
			<view class="left">
				<text class="iconfont iconwodezhangdan"></text>
				<text>修改密码</text>
			</view>
			<view class="right">
				<text class="iconfont iconyou"></text>
			</view>
		</view>
	</view>
</view>
 -->
