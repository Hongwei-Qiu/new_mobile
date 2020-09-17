<template>
	<view class="caigou_index delivery">
		<my-apphead></my-apphead>
		<view class="purchase">
			<view class="head">

				<view class="flex flex_center search_box">
					<view class="flex flex_align_center inp_box">
						<view class="flex flex_align_center left">
							<view class="flex flex_align_center zd">
								<input type="text" placeholder="订单号、收货人、单位名称" v-model="keyword" />

							</view>
							<view class="time flex flex_align_center" @tap="dateVisible1=true">
								<text style="width: 1px;height:26rpx;background: #666;"></text>
								<input type="text" placeholder="配送日期" v-model="time2" disabled="disable" placeholder-style="font-size:28rpx;" />
							</view>
						</view>
						<view class="right" @click="requestItemList()">
							<text class="iconfont iconseach-"></text>
						</view>
					</view>
				</view>
				<view style="height:10rpx;"></view>
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
						<view class="height"><text>单位名称 :</text><text>{{item.nickname}}</text></view>
						<view class="height"><text>配送日期 :</text><text>{{item.send_time}}</text></view>

					</view>
					<view class="back_height"></view>
				</view>
				<my-loading :loading="loading"></my-loading>
			</view>
			<view v-else>
				<my-bitmap></my-bitmap>
			</view>
			<w-picker :visible.sync="dateVisible1" mode="date" startYear="2017" endYear="2029" :value="time" :current="false"
			 fields="day" @confirm="onConfirm1($event,'date1')" :disabled-after="false" ref="date1"></w-picker>
		</view>

		<tabar :tabarIndex="tabNum"v-if="showTabar"></tabar>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import un from '../../../static/js/uni.js';
	import tabar from "../../../components/tabbar/saleman.vue"
	import wPicker from "../../../components/w-picker/w-picker.vue";
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			tabar,
			wPicker
		},
		data() {
			return {
				showTabar:true,
				navBar: navBar,
				tabNum: 2,
				isShow: '空',
				loading: true,
				bitmap: true,
				dateVisible1: false,
				keyword: '',
				page: 1,
				time: '', //时间
				time2: '', //时间
				defaultProps: {
					label: "label",
					value: "value"
				},
				selectorList: [],
				itemList: [],
			}
		},
		methods: {
			detailPage(id) {
				
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
			onConfirm1(res, type) {
				this.time2 = res.result;
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
					send_time: that.time2,
					keyword: that.keyword,
					page: that.page
				}, obj)
				rs.getRequests("salesmanOrderList", data, (res) => {
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
			this.time = un.formatDate();
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
				send_time: that.time2,
				keyword: that.keyword,
				page: that.page + 1
			}, obj)
			rs.getRequests("salesmanOrderList", data, (res) => {
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
		background: white;
	}

	.purchase .head {
		width: 100%;
		position: fixed;
		font-size: 26rpx;
		background:  #F9F9FB;
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
		border-radius: 60rpx 0 0 60rpx;
	}

	.purchase .head .search_box .zd input {
		width: 350rpx;
		font-size: 28rpx;
		margin-left: 30rpx;
		margin-right: 10rpx;
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

	.purchase .list_box {
		padding-top: 205rpx;
		padding-bottom: 100rpx;
	}

	.purchase .list_box .item {
		background: #ffffff;
		padding: 15rpx 20rpx;
		color: #333333;
		margin-bottom: 15rpx;
	}

	.purchase .list_box .item .title {
		padding-bottom: 15rpx;
		border-bottom: 1px solid #F0F0F0;
		font-size: 32rpx;
		font-size: 500;
	}

	.purchase .list_box .item .body {
		font-weight: 400;
		font-size: 28rpx;
		margin-top: 15rpx;
	}

	.purchase .list_box .item .body .detail {
		padding-bottom: 15rpx;
	}

	.purchase .list_box .item .body .detail .right {
		/* width: 450rpx; */
		text-align: end;
	}

	.purchase .list_box .item .body .detail:nth-child(3) .right {
		max-width: 450rpx;
		text-align: start;
	}

	.purchase .list_box .item .body .unfold {
		text-align: end;
		padding-bottom: 20rpx;
		color: #ADADAD;
	}

	.purchase .list_box .item .inp_btn {
		margin-top: 20rpx;
	}

	.purchase .list_box .item .inp input {
		width: 150rpx;
		padding: 10rpx;
		border-radius: 10rpx;
		border: 1px solid #D6D6D6 !important;
		margin-right: 20rpx;
	}

	.purchase .list_box .item .inp input::-webkit-input-placeholder {
		color: #D6D6D6;
	}

	.purchase .list_box .item .btn {
		width: 140rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		background: #03A98E;
		color: #ffffff;
		text-align: center;
		border-radius: 10rpx;
	}

	.delivery .all_Order {
		padding: 110rpx 0rpx 120rpx;
		background: white;
	}

	.delivery .all_Order .sign_good {

		padding: 0 20rpx 20rpx;
		font-size: 28rpx;
	}

	.delivery .all_Order .border_bottom {
		border-bottom: 10rpx solid  #F9F9FB;
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

	.delivery .all_Order .good_statu text:first-child {
		margin-right: 18rpx;
	}
	.delivery .all_Order .icondianhua1{color:#04AA8E;margin-left:24rpx;}
</style>
