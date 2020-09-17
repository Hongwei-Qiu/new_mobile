<template>
	<view class="caigou_index">
		<view class="index">
			<view class="top flex_column">
					<image src="../../../static/img/caigou_index.png" class="index_top_image"></image>
				<view class="pop">
					<cmd-progress type="circle" :percent="buyerIndex.buyerNum" :width="150" :stroke-width="7" stroke-color="#EBF8FB"></cmd-progress>
				</view>
				<view class="number_box">
					<view class="number flex flex_align_center">
						<view class="left">
							未配送 {{buyerIndex.unBuyerNum}}
						</view>
						<view class="right">
							应该配送 {{buyerIndex.total}}
						</view>
					</view>
				</view>
			</view>
			<view class="list_box">
				<view class="item flex flex_align_center flex_between">
					<view class="left">
						<view class="title">
							备货中
						</view>
						<view class="time">
							{{nowTimes}}
						</view>
					</view>
					<view class="right">{{buyerIndex.stock}}</view>
				</view>
				<view class="item flex flex_align_center flex_between">
					<view class="left">
						<view class="title">
							配送中
						</view>
						<view class="time">
							{{nowTimes}}
						</view>
					</view>
					<view class="right">{{buyerIndex.distribution}}</view>
				</view>
				<view class="item flex flex_align_center flex_between">
					<view class="left">
						<view class="title">
							配货单位
						</view>
						<view class="time">
							{{nowTimes}}
						</view>
					</view>
					<view class="right">{{buyerIndex.cateCount}}</view>
				</view>
				<view class="item flex flex_align_center flex_between">
					<view class="left">
						<view class="title">
							历史未收货
						</view>
						<view class="time">
							{{nowTimes}}
						</view>
					</view>
					<view class="right">{{buyerIndex.beforeUnfinsh}}</view>
				</view>
			</view>

		</view>
		<view style="height:110rpx;"></view>
		<tabar :tabarIndex="tabNum"></tabar>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import un from '../../../static/js/uni.js';
	import tabar from "../../../components/tabbar/siji.vue"
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			tabar,
			cmdProgress
		},
		data() {
			return {
				navBar: navBar,
				tabNum: 0,
				num: 25,
				nowTimes:0,
				buyerIndex:'',
			}
		},
		methods: {
			requestIndex() {
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
				rs.getRequests("vehicleIndex", data, (res) => {
					if (res.data.code == 200) {
						that.buyerIndex = res.data.data;
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},

		},
		onLoad() {
			this.nowTimes =un.formatDate();
			this.requestIndex()
		}
	}
</script>

<style>
	.caigou_index .index .top {
		height: 400rpx;
		background: url('../../../static/img/caigou_index.png') no-repeat;
		background-size: 100% 100%;
		text-align: center;
		padding-top: 100rpx;
		position: relative;
	}

	.caigou_index .index .top .number_box {
		width: 100%;
		position: absolute;
		bottom: -40rpx;
	}

	.caigou_index .index .top .number_box .number {
		background: #FFFFFF;
		margin: 0 90rpx;
		box-shadow: 0px 2px 10px 0px rgba(71, 131, 144, 0.16);
		border-radius: 50rpx;
		padding: 20rpx 0;
		font-size: 28rpx;
	}

	.caigou_index .index .top .number_box .number .left {
		width: 50%;
		color: #03A98E;
		border-right: 1px solid #d6d6d6;
	}

	.caigou_index .index .top .number_box .number .right {
		width: 50%;
		color: #FEB733;
	}

	.caigou_index .index .list_box {
		margin-top: 90rpx;
		padding: 0 30rpx;
	}

	.caigou_index .index .list_box .item {
		box-shadow: 0px 2px 18px 0px rgba(54, 54, 54, 0.16);
		border-radius: 10rpx;
		background: #FFFFFF;
		padding: 20rpx 40rpx 20rpx 30rpx;
		margin-bottom: 40rpx;
	}

	.caigou_index .index .list_box .item .title {
		font-size: 34rpx;
		color: #666666;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.caigou_index .index .list_box .item .time {
		font-size: 28rpx;
		color: #666666;
		font-weight: 400;
	}

	.caigou_index .index .list_box .item .right {
		font-size: 40rpx;
		color: #FEB733;
		font-weight: 500;
	}
</style>

