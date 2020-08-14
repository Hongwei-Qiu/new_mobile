<template>
	<view class="caigou_index">
		<view class="index">
			<view class="top flex_column">
				<view class="pop">
					<cmd-progress type="circle" :percent="buyerIndex.buyerNum" :width="150" :stroke-width="7" stroke-color="#EBF8FB"></cmd-progress>
				</view>
				<view class="number_box">
					<view class="number flex flex_align_center">
						<view class="left">
							未采数量 {{buyerIndex.unBuyerNum}}
						</view>
						<view class="right">
							应采数量 {{buyerIndex.total}}
						</view>
					</view>
				</view>
			</view>
			<view class="list_box">
				<view class="item flex flex_align_center flex_between">
					<view class="left">
						<view class="title">
							今日完成
						</view>
						<view class="time">
							{{nowTimes}}
						</view>
					</view>
					<view class="right">{{buyerIndex.finsh}}</view>
				</view>
				<view class="item flex flex_align_center flex_between">
					<view class="left">
						<view class="title">
							今日未完成
						</view>
						<view class="time">
							{{nowTimes}}
						</view>
					</view>
					<view class="right">{{buyerIndex.unfinsh}}</view>
				</view>
				<view class="item flex flex_align_center flex_between">
					<view class="left">
						<view class="title">
							今日采购品种
						</view>
						<view class="time">
							{{nowTimes}}
						</view>
					</view>
					<view class="right">{{buyerIndex.cateCount}}</view>
				</view>
			</view>

		</view>
		<tabar :tabarIndex="tabNum"></tabar>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import tabar from "../../../components/tabbar/caigou.vue"
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
			timeFormate() {
				let timeStamp = new Date()
				let year = new Date(timeStamp).getFullYear()
				let month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(
					timeStamp).getMonth() + 1
				let date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
				let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
				let mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
				// let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
				// return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
				this.nowTimes = year + '-' + month + '-' + date
			},
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
				rs.getRequests("buyerIndex", data, (res) => {
					if (res.data.code == 200) {
						that.buyerIndex = res.data.data;
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},

		},
		onLoad() {
			this.timeFormate()
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

