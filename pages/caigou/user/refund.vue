<template>
	<view class="caigou_index">
		<uni-nav-bar left-icon="back" left-text="" title="退货单" color="#1A1A1A" @clickLeft="goPage"></uni-nav-bar>
		<view class="head">
			<view class="inp_box flex flex_center">
				<view class="time">
					<input type="text" v-model="time" placeholder="请选择日期" disabled="true" @tap="dateVisible1=true"/>
				</view>
				<view class="btn" @click="search()">
					<text class="iconfont iconseach-"></text>
				</view>
			</view>
		</view>
		<view style="height: 190rpx;background: #F9F9F9;"></view>

		<view class="refund">
			<view class="item" v-for="item in list" @click="clickTab(item.id)">
				<view class="title">
					单号：{{item.order_sn}}
				</view>
				<view class="txt">
					时间：{{item.created_at}}
				</view>
				<view class="txt">
					供应商：{{item.supplier_name}}
				</view>
			</view>
		</view>
		<w-picker
			:visible.sync="dateVisible1"
			mode="date" 
			startYear="2017" 
			endYear="2029"
			:value="time"
			:current="false"
			fields="day"
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
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
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
				list:[],
				dateVisible1:false,
			}
		},
		methods: {
			onConfirm(res,type){
				// console.log(res)
				this.time = res.value
			},
			goPage() {
				uni.navigateBack({
					delta: 1
				})
			},
			search(){
				this.requestReturns()
			},
			requestReturns() {
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
				rs.getRequests("purchaseReturns", data, (res) => {
					// console.log(res.data.data)
					if (res.data.code == 200) {
						that.list = res.data.data;
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			clickTab(id){
				uni.navigateTo({
					url:"./refundDetail"
				})
			}

		},
		onLoad(){
			this.requestReturns()
		}
	}
</script>

<style>
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
	.refund .item{
		background: #FFFFFF;
		padding: 15rpx 20rpx;
		margin-bottom: 10rpx;
	}
	.refund .item .title{
		font-size: 28rpx;
		padding-bottom: 15rpx;
		border-bottom: 1px solid #F0F0F0;
	}
	.refund .item .txt{
		font-size: 26rpx;
		padding-top: 20rpx;
	}
</style>

