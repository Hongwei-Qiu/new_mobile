<template>
	<view class="delivery">
		<my-apphead></my-apphead>
		<view class="top_search">
			<view class="search_style">
				<view>
					<input type="text" v-model="search" placeholder="订单号、收货人、手机等" />
				</view>
				<view class="istop" @click="searchTop">
					<text class="left_border"></text>
					<text>置顶</text>
				</view>
			</view>
			<view style="height:10rpx;background: #f5f5f5;"></view>
		</view>
		<view class="all_Order" v-if="bitmap">

			<view v-for="(item,index) in itemList" class="sign_good" @click="detailPage(item.id)" :class="index==itemList.length-1?'':'border_bottom'">

				<view class="good_statu">
					<view> <text>单号 :</text><text>{{item.order_sn}}</text></view>

					<text v-if="item.order_status==0" style="color: #2bcca9;">待审核</text>
					<text v-if="item.order_status==1" style="color: #74CE89;">备货中</text>
					<text v-if="item.order_status==2" style="color: #e8748b;">配送中</text>
					<text v-if="item.order_status==3" style="color: #02b1e4;">已收货</text>
					<text v-if="item.order_status==4" style="color: #df5d21;">已取消</text>
				</view>
				<view>
					<view class="height"><text>收货人 :</text><text>{{item.contact}}</text></view>
					<view class="height"><text>收货手机 :</text><text>{{item.mobile}}</text><text class="iconfont icondianhua1"
						 @click.stop="callPhone(item.mobile)"></text></view>
					<view class="height"><text>单位名称 :</text><text>{{item.nickname}}</text></view>
					<view class="height"><text>收货地址 :</text><text>{{item.address}}</text></view>
				</view>
				<view class="back_height"></view>
			</view>
			<my-loading :loading="loading"></my-loading>
		</view>
		<view v-else>
			<my-bitmap></my-bitmap>
		</view>
		<tabar tabarIndex="1" v-if="showTabar"></tabar>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import tabar from "../../../components/tabbar/siji.vue"
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
				itemList: [],
				showTabar: true,
				bitmap: true,
				loading: true,
				search: '',
				count: 0
			}
		},
		methods: {
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			detailPage(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
			searchTop() {
				let {
					search
				} = this;

				function up(a) {
					if (a.order_sn.indexOf(search) != -1) return -1
					if (a.mobile.indexOf(search) != -1) return -1
					if (a.contact.indexOf(search) != -1) return -1
					if (a.nickname.indexOf(search) != -1) return -1
					if (a.address.indexOf(search) != -1) return -1

				}
				this.itemList.sort(up)
			},
			requestItemList() {
				let that = this;
				that.itemList = [];
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
				rs.getRequests("vehicleList", data, (res) => {
					if (res.data.code == 200) {
						that.itemList = res.data.data;
						that.loading = false;
						if (res.data.data.length == 0) {
							that.bitmap = false;
						} else {
							that.bitmap = true;
						}
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},

		},
		onShow() {
			if (app.isReload) {
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
		}
	}
</script>

<style>
	page {
		background: white;
	}

	.delivery .top_search .istop .left_border {
		width: 2px;
		background: #D6d6d6;
		height: 30rpx;
		margin: 2rpx 20rpx;
	}

	.delivery .top_search .istop {
		color: #03A98E;
		display: flex;
		align-items: center;
	}

	.delivery .top_search input {
		font-size: 28rpx;
		width: 380rpx;
	}

	.delivery .top_search {
		/* padding: 15rpx 0rpx 16rpx; */
		position: fixed;
		width: 100%;
		left: 0;
		background-color: white;
	}

	.delivery .top_search .search_style {
		display: flex;
		height: 64rpx;
		background: #F5F5F5;
		align-items: center;
		margin: 14rpx 20rpx;
		padding: 0 30rpx;
		border-radius: 40rpx;
		font-size: 26rpx;
		justify-content: space-between;
	}

	.delivery .all_Order {
		padding: 110rpx 0rpx 120rpx;
	}

	.delivery .all_Order .sign_good {

		padding: 0 20rpx 20rpx;
		font-size: 28rpx;
	}

	.delivery .all_Order .sign_good .height {
		margin-top: 10rpx;
		color: #666
	}

	.delivery .all_Order .sign_good .good_statu {
		margin-top: 10rpx;
		font-size: 30rpx;
		border-bottom: 2rpx solid #F5F5F5;
		padding-bottom: 10rpx;
		display: flex;
		justify-content: space-between;
	}

	.delivery .all_Order .sign_good text:first-child {
		margin-right: 18rpx;
	}

	.delivery .all_Order .border_bottom {
		border-bottom: 10rpx solid #F5F5F5;
	}

	.delivery .all_Order .good_statu text:first-child {
		margin-right: 18rpx;
	}

	.delivery .all_Order .icondianhua1 {
		color: #04AA8E;
		margin-left: 24rpx;
	}
</style>
</style>
