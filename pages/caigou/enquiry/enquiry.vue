<template>
	<view class="caigou_index">
		<view class="purchaseNote">
			<view class="head">
				<view class="tab_box flex flex_align_center flex_around">
					<view class="tab" :class="{'active': isActive === index}" v-for="(item,index) in list" @click="tabs(item,index)">
						<view>{{item.tab}}</view>
						<view class="xian" v-if="isActive == index"></view>
					</view>
				</view>
			</view>
			<view class="list_box">
				<view class="inp_box flex flex_center" v-if="isActive == 0">
					<view class="left" style="margin-right: 30rpx;">
						<view class="flex flex_center">
							<view class="time">
								<input type="text" v-model="time" placeholder="请选择商品" disabled="true" @tap="dateVisible1=true" />
							</view>
							<view class="btn" @click="search()">
								<text class="iconfont iconseach-"></text>
							</view>
						</view>
					</view>
					<view class="right">
						规格：<text>请选择</text>
					</view>
				</view>
				<view class="inp_box flex flex_center" v-if="isActive == 1">
					<view class="left">
						<view class="flex flex_center">
							<view class="time">
								<input class="time_inp" type="text" v-model="time" placeholder="请选择日期" disabled="true" @tap="dateVisible1=true" />
							</view>
							<view class="btn" @click="search()">
								<text class="iconfont iconseach-"></text>
							</view>
						</view>
					</view>
				</view>

				<view class="record_item" v-if="isActive == 0">
					<view class="record_title">
						近5次采购单价（元）
					</view>
					<view class="item flex flex_center flex_between">
						<view>2020-06-15</view>
						<view class="red_font">¥1.00</view>
					</view>
					<view class="item flex flex_center flex_between">
						<view>2020-06-15</view>
						<view class="red_font">¥1.00</view>
					</view>
				</view>

				<view class="enquiry_item" v-if="isActive == 1">
					<view class="item">
						<view class="title flex flex_between">
							<view class="left">
								<text class="badge">
									99
								</text>
								<!-- <text class="iconfont iconyou"></text> -->
								<text class="iconfont iconxiala"></text>
								<text class="name">
									小白菜(三斤装）
								</text>
							</view>
							<view class="right">
								<text class="iconfont iconcha"></text>
							</view>
						</view>
						<view class="content">
							<view class="txt">
								老三蔬菜供应：¥1.20
							</view>
							<view class="txt">
								老三蔬菜供应：¥1.20
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="enquiry_bottom" v-if="isActive == 1">
				<view class="btm flex flex_around">
					<view>
						<text class="iconfont iconjia"></text>
					</view>
					<view>
						复制商品
					</view>
					<view>
						批量清除
					</view>
				</view>

			</view>

		</view>
		<w-picker :visible.sync="dateVisible1" mode="date" startYear="2017" endYear="2029" :value="time" :current="false"
		 fields="day" @confirm="onConfirm($event,'date1')" :disabled-after="false" ref="date1"></w-picker>
		<tabar :tabarIndex="tabNum"></tabar>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import un from '../../../static/js/uni.js';
	import wPicker from "../../../components/w-picker/w-picker.vue";
	import tabar from "../../../components/tabbar/caigou.vue"
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
				navBar: navBar,
				isActive: 1,
				tabNum: 3,
				time: '',
				dateVisible1: false,
				list: [{
						tab: "历史记录",
						id: 1
					},
					{
						tab: "发起询价",
						id: 2
					}
				]
			}
		},
		methods: {
			onConfirm(res, type) {
				// this.result=res;
				// console.log(res)
				this.time = res.value
			},
			tabs(item, index) {
				this.isActive = index;
			}

		},
		onLoad() {
			this.time = un.formatDate();
		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}

	.purchaseNote .head {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		background: #F9F9F9;
	}

	.purchaseNote .tab_box {
		padding: 0 30rpx;
		color: #666666;
		font-family: PingFang SC;
		margin-bottom: 20rpx;
	}

	.purchaseNote .tab_box .tab {
		height: 60rpx;
		line-height: 60rpx;
		padding-bottom: 10rx;
		text-align: center;
	}

	.purchaseNote .tab_box .tab.active {
		color: #03A98E;
	}

	.purchaseNote .tab_box .tab .xian {
		width: 38rpx;
		height: 5rpx;
		background: rgba(3, 169, 142, 1);
		border-radius: 10rpx;
		position: relative;
		left: 50%;
		margin-left: -19rpx;
	}

	.purchaseNote .inp_box {
		background-color: #FFFFFF;
		padding: 15rpx;
		border-bottom: 10rpx solid #F9F9F9;
	}

	.purchaseNote .inp_box .time {
		background-color: #F5F5F5;
		padding: 15rpx 20rpx;
		border-radius: 50rpx 0 0 50rpx;
	}

	.purchaseNote .inp_box .time input {
		width: 350rpx;
		margin-left: 20rpx;
	}

	.purchaseNote .inp_box .time .time_inp {
		width: 550rpx;
	}

	.purchaseNote .inp_box .btn {
		background-color: #03A98E;
		padding: 15rpx 30rpx;
		border-radius: 0 50rpx 50rpx 0;
		color: #FFFFFF;
	}

	.purchaseNote .inp_box .right {
		font-size: 28rpx;
	}

	.purchaseNote .inp_box .right .text {
		color: #666666;
	}

	.purchaseNote .list_box {
		padding-top: 85rpx;
		padding-bottom: 110rpx;
	}

	.purchaseNote .list_box .record_item {
		padding: 0 20rpx 0 20rpx;
		background: #ffffff;
	}

	.purchaseNote .list_box .record_item .item {
		background: #ffffff;
		padding: 10rpx 0;
		font-size: 28rpx;
	}

	.purchaseNote .list_box .record_item .record_title {
		background: #ffffff;
		padding: 15rpx 0;
		border-bottom: 1px solid #F0F0F0;
	}

	.purchaseNote .enquiry_item .item {
		padding: 0 20rpx;
		background: #FFFFFF;
		border-bottom: 1px solid #F0F0F0;
		padding-bottom: 20rpx;
	}

	.purchaseNote .enquiry_item .item .title {
		padding: 20rpx 0;
		background: #FFFFFF;
	}

	.purchaseNote .enquiry_item .item .title .right .iconfont {
		font-size: 40rpx;
	}

	.purchaseNote .enquiry_item .item .title .left .badge {
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		color: #FFFFFF;
		background: #03A98E;
		font-size: 15rpx;
		text-align: center;
		line-height: 30rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.purchaseNote .enquiry_item .item .title .left .iconfont {
		font-size: 26rpx;
		color: #666666;
		margin-right: 10rpx;
	}

	.purchaseNote .enquiry_item .item .content {
		padding-left: 30rpx;
	}

	.purchaseNote .enquiry_item .item .content .txt {
		font-size: 26rpx;
		margin-bottom: 15rpx;
	}
	.enquiry_bottom{
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 100rpx;
		z-index: 99;
		background: #FFFFFF;
		border-bottom: 1rpx solid #F0F0F0;
	}
	.enquiry_bottom .btm{
		padding: 15rpx 0;
		color: #666666;
		font-size: 28rpx;
	}
	.enquiry_bottom .btm .iconfont{
		font-size: 36rpx;
		color: #666666;
	}
	.enquiry_bottom .btm view{
		padding: 10rpx 80rpx;
	}
	.enquiry_bottom .btm view:nth-child(1){
		border-right: 1px solid #F0F0F0;
	}
	.enquiry_bottom .btm view:nth-child(2){
		border-right: 1px solid #F0F0F0;
	}
</style>



