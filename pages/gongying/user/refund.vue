<template>
	<view class="caigou_index">
		<view class="fix_top">

			<uni-nav-bar left-icon="back"  title="退货单"  color="#1A1A1A" @clickLeft="goPage"></uni-nav-bar>
				<view style="height: 44px;background: #F9F9F9;"></view>
			<view class="head">
				<view class="inp_box flex flex_center">
					<view class="time">
						<input type="text" v-model="time" placeholder="请选择日期" disabled="true" @click="dateVisible1=true" />
					</view>
					<view class="btn" @click="search()">
						<text class="iconfont iconseach-"></text>
					</view>
				</view>
			</view>
		</view>
		<view style="height: calc(44px + 100rpx);background: #F9F9F9;"></view>


		<view class="refund" v-if="bitmap">
			<view class="item" v-for="item in list" @click="clickTab(item.id)">
				<view class="title">
					单号：{{item.order_sn}}
				</view>
				<view class="txt">
					时间：{{item.created_at}}
				</view>

			</view>
			<my-loading :loading="loading"></my-loading>
		</view>
		<view v-else>
			<my-bitmap></my-bitmap>
		</view>
		<e-picker :visible.sync="dateVisible1" mode="date" startYear="2017" endYear="2029" :value="time2" :current="false"
		 fields="day" @confirm="onConfirm($event,'date1')" :disabled-after="true" ref="date"></e-picker>

	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import un from '../../../static/js/uni.js';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import wPicker from "../../../components/w-picker/w-picker.vue";
	import ePicker from "../../../components/w-picker3/w-picker.vue"
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			uniNavBar,
			ePicker
		},
		data() {
			return {
				showDate: 'today',
				navBar: navBar,
				time: '',
				list: [],
				dateVisible1: false,
				bitmap: true,
				page: 1,
				loading: true
			}
		},
		methods: {
			onConfirm(res, type) {
				// console.log(res)
				this.time = res.value
			},
			goPage() {
				// #ifdef H5
				window.history.back(-1);
				// #endif 
				// #ifndef H5
				uni.navigateBack({
					delta: 1
				});
				// #endif	
			},
			search() {
				this.requestReturns()
			},
			requestReturns() {
				let that = this;
				that.list = [];
				that.page = 1;
				that.loading = true;
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					timeStamp: timeStamp,
					created_at: that.time,
					sign: sign,
				}
				rs.getRequests("supplierPurchaseReturns", data, (res) => {
					// console.log(res.data.data)
					if (res.data.code == 200) {
						that.list = res.data.data;
						if (res.data.data.length == 0) {
							this.bitmap = false;
						} else {
							this.bitmap = true;
							if (res.data.data.length < 10) {
								this.loading = false;
							}
						}
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			clickTab(id) {
				uni.navigateTo({
					url: "./refundDetail?id=" + id
				})
			}

		},
		onLoad() {
			this.time2 = un.formatDate();
			this.requestReturns()
		},
		onReachBottom() {
			this.loading = true;
			var timeStamp = rs.timeStamp();
			var obj = {
				appid: appid,
				timeStamp: timeStamp,
			}
			var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
			var data = {
				appid: appid,
				timeStamp: timeStamp,
				created_at: this.time,
				sign: sign,
				page: this.page + 1
			}
			rs.getRequests("supplierPurchaseReturns", data, (res) => {
				// console.log(res.data.data)
				if (res.data.code == 200) {
					this.list.push(...res.data.data);
					this.page++;
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
	.head {
		/* position: fixed; */
		top: 80rpx;
		left: 0;
		width: 100%;
		background: #FFFFFF;
		z-index: 99;
	}

	.head .inp_box {


		background: #ffffff;
		padding: 0 0 15rpx 0;
	}

	.head .inp_box .time {
		width: 75%;
		background: #F5F5F5;
		padding: 15rpx 30rpx;
		border-radius: 50rpx 0 0 50rpx;
	}

	.head .inp_box .time input {
		width: 100%;
		font-size: 28rpx;
	}

	.head .inp_box .btn {
		background: #03A98E;
		color: #ffffff;
		padding: 14rpx 25rpx 14rpx 20rpx;
		border-radius: 0 50rpx 50rpx 0;
	}

	.head .inp_box .btn .iconfont {
		font-size: 38rpx;
	}

	.refund .item {
		background: #FFFFFF;
		padding: 15rpx 20rpx;
		margin-bottom: 10rpx;
	}

	.refund .item .title {
		font-size: 28rpx;
		padding-bottom: 15rpx;
		border-bottom: 1px solid #F0F0F0;
	}

	.refund .item .txt {
		font-size: 26rpx;
		padding-top: 20rpx;
	}

	.caigou_index .show_bitmap {
		padding-top: 21%;
	}

	.fix_top {
		position: fixed;
	}

	.caigou_index .heightScroll {

		height: var(--status-bar-height);

	}
</style>
