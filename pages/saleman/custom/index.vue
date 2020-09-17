<template>
	<view class="caigou_index delivery">
		<my-apphead></my-apphead>
		<view class="purchase">
			<view class="head">
				<view class="flex flex_center search_box">
					<view class="flex flex_align_center inp_box">
						<view class="flex flex_align_center left">
							<view class="flex flex_align_center zd">
								<input type="text" placeholder="联系人、手机、单位名称" v-model="keyword" />
							</view>
						</view>
						<view class="right" @click="requestItemList()">
							<text class="iconfont iconseach-"></text>
						</view>
					</view>
					<view @click="addUser">添加用户</view>
				</view>
				<view style="height:10rpx;"></view>
			</view>

			<view class="all_Order" v-if="bitmap">
				<view v-for="(item,index) in itemList" class="sign_contact" @click="editUser(item.id)">
					<view>
						<view>{{item.mobile}}</view>
						<view class="flex flex_align_center">{{item.contact}}<text style="background:#D5D5D5;width:1px;display: inline-block;height: 30rpx;margin:0 20rpx;"></text>{{item.nickname}}</view>
					</view>
					<view>{{item.date}}</view>
				</view>
				<my-loading :loading="loading"></my-loading>
			</view>
			<view v-else>
				<my-bitmap></my-bitmap>
			</view>

		</view>

		<tabar tabarIndex="3" v-if="showTabar"></tabar>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import un from '../../../static/js/uni.js';
	import tabar from "../../../components/tabbar/saleman.vue"

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
				showTabar: true,
				navBar: navBar,
				loading: true,
				bitmap: true,
				keyword: '',
				page: 1,
				itemList: [],
			}
		},
		methods: {
			detailPage(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
			editUser(id) {
				uni.navigateTo({
						url:'./edituser?id=' + id
				})
			},
			addUser(){
				uni.navigateTo({
					url:'./adduser'
				})
			},
			requestItemList() {
				let that = this;
				that.itemList = [];
				that.loading = true;
				that.bitmap = true;
				that.page = 1;
				var timeStamp = rs.timeStamp();
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = Object.assign({
					sign: sign,
					keyword: that.keyword,
					page: that.page
				}, obj)
				rs.getRequests("salesmanMemberList", data, (res) => {
					if (res.data.code == 200) {
						that.itemList = res.data.data;
						if (res.data.data.length == 0) {
							that.bitmap = false;
						}
						if (res.data.data.length < 10) {
							that.loading = false;
						}
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},

		},
		onShow() {

			if (app.isReload == true) {
				this.requestItemList()
			}
			// #ifdef H5
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					if (res.platform == 'android') {
						window.onresize = () => {
							that.showTabar = !that.showTabar;
						}
					}
				}
			})
			// #endif
		},
		onLoad() {
			app.isReload = true;
		},
		onReachBottom() {
			let that = this;
			that.loading = true;
			var timeStamp = rs.timeStamp();
			var obj = {
				appid: appid,
				timeStamp: timeStamp,
			}
			var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
			var data = Object.assign({
				sign: sign,
				keyword: that.keyword,
				page: that.page + 1
			}, obj)
			rs.getRequests("salesmanMemberList", data, (res) => {
				if (res.data.code == 200) {
					that.page++;
					that.itemList.push(...res.data.data);
					if (res.data.data.length == 0) {
						this.loading = false;
					}
				} else {
					rs.Toast(res.data.msg)
				}
			})
		}
	}
</script>

<style>
	page {
		/* background: white; */
	}

	.purchase .head {
		width: 100%;
		position: fixed;
		font-size: 26rpx;
		/* background: #F5F5F5; */
		z-index: 99;
	}

	.purchase .head .search_box {
		background: #fff;
		padding: 15rpx 20rpx;
		font-size: 28rpx;
		color: #333333;
	}

	.purchase .head .search_box .left {
		background: #F5F5F5;
		/* padding: 15rpx 0; */
		border-radius: 60rpx 0 0 60rpx;
	}

	.purchase .head .search_box .left {
		background: #F5F5F5;
		/* padding: 15rpx 0; */
		height: 64rpx;
		width: 84%;
		border-radius: 60rpx 0 0 60rpx;
	}

	.purchase .head .search_box .zd input {
		width: 350rpx;
		font-size: 28rpx;
		margin-left: 30rpx;
		margin-right: 10rpx;
	}

	.purchase .inp_box {
		width: 84%;
	}

	.purchase .head .search_box .zd .zd_txt {
		color: #03A98E;
		margin-right: 30rpx;
	}

	.purchase .head .search_box .time {
		text-align: center;
		/* padding: 0 40rpx; */
		/* border-left: 1px solid #666666; */
	}

	.purchase .head .search_box .right {
		background: #03A98E;
		color: #fff;
		/* padding: 12rpx; */
		height: 64rpx;
		line-height: 64rpx;
		padding-right: 25rpx;
		border-radius: 0 60rpx 60rpx 0;
	}

	.purchase .head .search_box .right .iconfont {
		margin-left: 10rpx;
		font-size: 42rpx;
	}

	.purchase .head input {
		font-size: 28rpx;
	}

	.delivery .all_Order {
		padding: 100rpx 0rpx 120rpx;
	}

	.delivery .all_Order .sign_contact {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		background: white;
		font-size: 28rpx;
		border-bottom: 10rpx solid #f9f9fb;
	}
</style>
