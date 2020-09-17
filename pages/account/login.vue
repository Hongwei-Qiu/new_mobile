<template>
	<view class="login">
		
		<view class="title">
			<view class="xian"></view>
			<view class="txt">
				您好，<br />
				欢迎登陆
			</view>
		</view>
		<form @submit="submit">
			<view class="from">
				<view class="item_box" @click="isShow = !isShow">
					<view class="iconwidth">
						<text class="iconfont iconicon_jiaoseguanli" style="color: #C2C2C2;"></text>
					</view>
					<view class="inp inputwidth">
						<input type="text" v-model="role" name="role" placeholder="请选择角色" disabled />
					</view>
				</view>
				<view class="item_box">
					<view class="iconwidth">
						<text class="iconfont iconwode" style="color: #C2C2C2;"></text>
					</view>
					<view class="inp inputwidth">
						<block v-if="roleId!=3"><input type="text" v-model="mobile" placeholder="请输入账号" /></block>
						<block v-else>
							<view @click="visible=true">
								<text :style="{color:mobile?'':'#C2C2CC','font-size':'30rpx'}">{{mobile?mobile:'请输入账号'}}</text>
							</view>
						</block>

					</view>
				</view>
				<view class="item_box">
					<view class="iconwidth">
						<text class="iconfont iconmima" style="color: #C2C2C2;"></text>
					</view>
					<view class="inp_box inputwidth" >
						<view>
							<input name="password" :type="seen ? 'text' : 'password'" placeholder="请输入密码" />
						</view>
						<view class="eye">
							<text class="iconfont iconyanjingbiyan" style="color: #C2C2C2;" v-show='!seen' @click="changeSeen"></text>
							<text class="iconfont iconzhengyanzhuanhuan" style="color: #C2C2C2;" v-show='seen' @click="changeSeen"></text>
						</view>
					</view>
				</view>
				<view class="item_box">
					<button class="btn" form-type="submit">登录</button>
				</view>
			</view>
		</form>


		<view class="shade_box" v-if="isShow">
			<view class="shade">
				<view class="top">
					<view></view>
					<view>角色选择</view>
					<view>
						<text class="iconfont iconcha" style="color: #656565;" @click="isShow = !isShow"></text>
					</view>
				</view>
				<view class="list">
					<view class="item" v-for="(item,index) in list" @click="roleChoices(item,index)">
						<view class="left">
							<text class="img">{{(item.value).substr(0, 1)}}</text>
						</view>
						<view class="right">
							<text>{{item.value}}</text>
							<text class="iconfont iconxuanze" style="color: #C9C9C9;" v-if="item.id != status"></text>
							<text class="iconfont iconxuanze1" style="color: #03A98D;" v-if="item.id == status"></text>
						</view>
					</view>

				</view>
			</view>
		</view>
		<w-picker :visible.sync="visible" mode="selector" :default-props="driverProps" :options="driverList" @confirm="confirmDriver($event,'selector')"
		 ref="selector">
			司机账号
		</w-picker>
	</view>
</template>

<script>
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		data() {
			return {
				navBar: navBar,
				seen: false,
				status: '',
				role: '',
				mobile: '',
				usr_pwd: "",
				roleId: '',
				driverList: [],
				driverProps: {
					label: 'value',
					value: 'id'

				},
				isShow: false,
				list: '',
				visible: false
			}
		},
		methods: {
			// 手机登录
			submit(e) {
				let {mobile} =this;
				var password = e.detail.value.password;
				var type = this.roleId;
				let timeStamp = Math.round(new Date().getTime() / 1000);
				if (!mobile) {
					rs.Toast('手机号码不能为空，请输入手机号');
					return;
				}
				if (!password) {
					rs.Toast('密码不能为空，请输入密码');
					return;
				}
				let obj = {
					mobile: mobile,
					password: password,
					type: type,
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						sign: sign
					},
					obj
				);

				rs.postRequests('login', params, res => {
					let data = res.data;
					if (data.code == 200) {
						rs.Toast('登录成功，将跳转到首页');
						uni.setStorageSync('token', data.data.token);
						uni.setStorageSync('port', data.data.type);
						setTimeout(function() {
							if (data.data.type == 1) {
								//采购端
								uni.reLaunch({
									url: '/pages/caigou/index/index'
								});
								return;
							}
							if (data.data.type == 2) {
								//供应商端
								uni.reLaunch({
									url: '/pages/gongying/index/index'
								});
								return;
							}
							if (data.data.type == 3) {
								uni.reLaunch({
									url: '/pages/siji/index/index'
								});
								//司机端
								return;
							}
							if (data.data.type == 4) {
								//业务端
								uni.reLaunch({
									url: '/pages/saleman/index/index'
								});
							
								return;
							}
							if (data.data.type == 5) {
								//超级管理员端
								uni.reLaunch({
									url: '/pages/admin/index/index'
								});
								return;
							}
						}, 1000);

					} else {
						rs.Toast(data.msg);
					}
				});
			},
			roleType() {
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
				rs.getRequests("roleType", data, (res) => {
					if (res.data.code == 200) {
						that.list = res.data.data;
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			roleChoices(item, index) {
				this.role = item.value;
				this.roleId = item.id;
				this.status = index + 1;

				if (item.id == 3) {
					let that = this;
					let timeStamp = rs.timeStamp();
					var obj = {
						appid: appid,
						timeStamp: timeStamp,
					}
					var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
					let data = Object.assign({
						sign: sign
					}, obj);
					rs.getRequests("cart", data, (res) => {
						if (res.data.code == 200) {
							this.driverList = res.data.data;
						} else {
							rs.Toast(res.data.msg)
						}
					})

				}
			},
			confirmDriver(e){
				this.mobile=e.result;
			},
			changeSeen() {
				this.seen = !this.seen;
			}
		},
		onLoad() {
			var token = uni.getStorageSync("token")
			var port = uni.getStorageSync("port")

			if (token != '') {
				if (port == 1) {
					//采购端
					uni.reLaunch({
						url: '/pages/caigou/index/index'
					});
					return;
				}
				if (port == 2) {
					//供应商端
					uni.reLaunch({
						url: '/pages/gongying/index/index'
					});
					return;
				}
				if (port == 3) {
					//司机端
					uni.reLaunch({
						url: '/pages/siji/index/index'
					});
					return;
				}
				if (port == 4) {
					//业务端
					uni.reLaunch({
						url: '/pages/saleman/index/index'
					});
					return;
				}
				if (port == 5) {
					//超级管理员端
					uni.reLaunch({
						url: '/pages/admin/index/index'
					});
					return;
				}
			} else {
				this.roleType()
			}

		}
	}
</script>

<style>
	.login {
		padding: 0 50rpx;
	}

	.login .title {
		display: flex;
		padding-top: 90rpx;
	}

	.login .title .xian {
		width: 6rpx;
		height: 34rpx;
		background: rgba(3, 169, 141, 1);
		margin-top: 10rpx;
		margin-right: 15rpx;
	}

	.login .title .txt {
		font-size: 40rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.login .from {
		margin-top: 125rpx;
		padding: 0 50rpx;
	}

	.login .from .item_box {
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;
		border-bottom: 1px solid #EFEFEF;
		padding-bottom: 10rpx;
	}

	.login .from .item_box:last-child {
		border: none;
	}

	.login .from .item_box text {
		font-size: 40rpx;
		margin-right: 10rpx;
	}

	.login .from .item_box input {
		width: 100%;
	}

	.login .from .item_box .inp_box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.login .from .item_box .btn {
		width: 100%;
		text-align: center;
		/* padding: 15rpx 0; */
		background: rgba(3, 169, 141, 1);
		border-radius: 50px;
		color: #FFFFFF;
		font-size: 30rpx;
		margin-top: 40rpx;
	}

	.login .shade_box {
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.3);
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 99;
	}

	.login .shade_box .shade {
		width: 80%;
		background: #ffffff;
		padding: 10rpx;
		border-radius: 10rpx;
	}

	.login .shade_box .shade .top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 35rpx;
		padding: 20rpx 0;
	}

	.login .shade_box .shade .top .iconfont {
		font-size: 40rpx;
	}

	.login .shade_box .shade .list {
		padding: 20rpx 0;
	}

	.login .shade_box .shade .list .item {
		display: flex;
		padding: 20rpx 10rpx;
	}

	.login .shade_box .shade .list .item .left {
		width: 100rpx;
	}

	.login .shade_box .shade .list .item .left .img {
		display: inline-block;
		width: 70rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		color: #ffffff;
		border-radius: 50%;
		font-size: 35rpx;
	}

	.login .shade_box .shade .list .item:nth-child(1) .left .img {
		background: #FFDEDE;
	}

	.login .shade_box .shade .list .item:nth-child(2) .left .img {
		background: #FDE8C3;
	}

	.login .shade_box .shade .list .item:nth-child(3) .left .img {
		background: #CAFBFD;
	}

	.login .shade_box .shade .list .item:nth-child(4) .left .img {
		background: #F6DDFF;
	}

	.login .shade_box .shade .list .item:nth-child(5) .left .img {
		background: #A4F6C8;
	}

	.login .shade_box .shade .list .item .right {
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		border-bottom: 1px solid #EFEFEF;
		padding-bottom: 10rpx;
	}

	.login .shade_box .shade .list .item:last-child .right {
		border: none;
	}

	.login .shade_box .shade .list .item .iconfont {
		font-size: 40rpx;
	}
	.iconwidth{width:10%;}
	.inputwidth{width:90%;}
</style>
