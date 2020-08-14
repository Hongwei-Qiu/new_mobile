<template>
	<view class="caigou_index">
		<uni-nav-bar left-icon="back" right-text="供应商" title="月账单" color="#1A1A1A" @clickLeft="goPage"></uni-nav-bar>
		<view class="head">
			<view class="inp_box flex flex_center">
				<view class="time">
					<input type="text" v-model="time" placeholder="请选择日期" disabled="true"  @tap="dateVisible1=true"/>
				</view>
				<view class="btn" @click="search()">
					<text class="iconfont iconseach-"></text>
				</view>
			</view>
		</view>
		<view style="height: 190rpx;background: #F9F9F9;"></view>

		<view class="bill">
			<view class="top">
				月采购金额总计(元)：<text class="red_font">¥{{total}}</text>
			</view>
			<view class="item" v-for="item in list">
				<view>{{item.order_sn}}</view>
				<view class="red_font">¥{{item.total_price}}</view>
			</view>
		</view>
		<w-picker
			:visible.sync="dateVisible1"
			mode="date" 
			startYear="2017" 
			endYear="2029"
			:value="time"
			:current="false"
			fields="month"
			@confirm="onConfirm($event,'date1')"
			:disabled-after="false"
			ref="date1"
		></w-picker>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import un from '../../../static/js/uni.js';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import wPicker from "../../../components/w-picker/w-picker.vue";
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			uniNavBar,
			wPicker
		},
		data() {
			return {
				navBar: navBar,
				time:'',
				dateVisible1:false,
				total:'',
				list:[]
			}
		},
		methods: {
			onConfirm(res,type){
				// this.result=res;
				// console.log(res)
				this.time = res.value
			},
			goPage() {
				uni.navigateBack({
					delta: 1
				})
			},
			search(){
				this.requestBill()
			},
			requestBill() {
				let that = this;
				that.list = [];
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					timeStamp: timeStamp,
					created_at:that.time,
					sign: sign,
				}
				rs.getRequests("buyerMonthBill", data, (res) => {
					// console.log(res.data.data)
					if (res.data.code == 200) {
						that.list = res.data.data.data;
						that.total = res.data.data.total;
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},


		},
		onLoad(){
			this.time = un.doHandleDate();
			this.requestBill()
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.head {
		position: fixed;
		top: 80rpx;
		left: 0;
		width: 100%;
		background: #FFFFFF;
		z-index: 99;
	}

	.head .inp_box {


		background: #ffffff;
		padding: 15rpx 0;
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

	.bill .top {
		font-size: 28rpx;
		font-weight: 500;
		padding: 15rpx 20rpx;
		border-bottom: 10rpx solid #F9F9F9;
	}

	.bill .item {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		font-weight: 400;
		font-size: 26rpx;
		border-bottom: 1px solid #F0F0F0;
	}

	.bill .item:last-child {
		border: none;
	}
</style>


<!-- <view class="bill">
	<view class="top">
		月采购金额总计(元)：<text class="red_font">¥499.30</text>
	</view>
	<view class="item">
		<view>GG2020070300000001</view>
		<view class="red_font">¥346.80</view>
	</view>
</view>
 -->
