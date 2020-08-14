<template>
	<view class="caigou_index">
		<view class="purchaseNote">
			<view class="head">
				<view class="inp_box flex flex_center">
					<view class="time">
						<input type="text" placeholder="请选择日期" v-model="result" disabled="true" @tap="dateVisible1=true"/>
					</view>
					<view class="btn">
						<text class="iconfont iconseach-"></text>
					</view>
				</view>
				<view class="tab_box flex flex_align_center flex_between">
					<view class="tab" :class="{'active': isActive === index}" v-for="(item,index) in list" @click="tabs(item,index)">
						<view>{{item.tab}}</view>
						<view class="xian" v-if="isActive == index"></view>
					</view>
				</view>
			</view>
			<view class="list_box">
				<view class="item" v-for="item in itemList" @click="clickTab(item.id)">
					<view class="title flex flex_align_center flex_between">
						<view class="left">单号：{{item.order_sn}}</view>
						<view class="right" v-if="item.status == 0">采购中</view>
						<view class="right" style="color: #6cca28;" v-if="item.status == 1">已完成</view>
						<view class="right" style="color: #2bcca9;" v-if="item.status == 2">已取消</view>
					</view>
					<view class="txt">
						时间：{{item.date}}
					</view>
				</view>
			</view>
		</view>
		<w-picker :visible.sync="dateVisible1" mode="date" startYear="2017" endYear="2029"
		 :current="false" fields="day" @confirm="onConfirm($event,'date1')" @cancel="onCancel" :disabled-after="false" ref="date1"></w-picker>
		<tabar :tabarIndex="tabNum"></tabar>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import un from '../../../static/js/uni.js';
	import wPicker from "../../../components/w-picker/w-picker.vue";
	import tabar from "../../../components/tabbar/gongying.vue"
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
				tabNum: 2,
				dateVisible1: false,
				result: "",
				isActive: 0,
				tabId: '',
				itemList:[],
				list: [{
						tab: "采购中",
						id: 1
					},
					{
						tab: "已完成",
						id: 2
					},
					{
						tab: "已取消",
						id: 3
					},
				]
			}
		},
		methods: {
			requestBuyerList() {
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
					status: this.isActive,
					created_at: this.result,
					page:1,
					sign: sign,
				}
				rs.getRequests("supplierList", data, (res) => {
					if (res.data.code == 200) {
						that.itemList = res.data.data;
						console.log(that.itemList);
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			onConfirm(res, type) {
				this.result = res.result;
				this.requestBuyerList()
			},
			clickTab(id) {
				uni.navigateTo({
					url: "./detail?id="+id
				})
			},
			tabs(item, index) {
				this.isActive = index;
				this.requestBuyerList()
			}

		},
		onShow() {
			this.requestBuyerList()
		}
	}
</script>

<style>
	.purchaseNote .head {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		background: #F9F9F9;
	}

	.purchaseNote .head .inp_box {
		background: #ffffff;
		padding: 15rpx 20rpx;
	}

	.purchaseNote .head .inp_box .time {
		width: 75%;
		background: #F5F5F5;
		padding: 15rpx 30rpx;
		border-radius: 50rpx 0 0 50rpx;
	}

	.purchaseNote .head .inp_box .time input {
		width: 100%;
		font-size: 28rpx;
	}

	.purchaseNote .head .inp_box .btn {
		background: #03A98E;
		color: #ffffff;
		padding: 14rpx 25rpx 14rpx 20rpx;
		border-radius: 0 50rpx 50rpx 0;
	}

	.purchaseNote .head .inp_box .btn .iconfont {
		font-size: 38rpx;
	}

	.purchaseNote .tab_box {
		padding: 0 30rpx;
		color: #666666;
		font-family: PingFang SC;
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

	.purchaseNote .list_box {
		padding-top: 175rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;
		padding-bottom: 110rpx;
	}

	.purchaseNote .list_box .item {
		background: #ffffff;
		padding: 15rpx 20rpx 0 20rpx;
		margin-bottom: 10rpx;
	}

	.purchaseNote .list_box .item .title {
		border-bottom: 1rpx solid #F0F0F0;
		padding-bottom: 15rpx;
		margin-bottom: 15rpx;
	}

	.purchaseNote .list_box .item .title .left {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}

	.purchaseNote .list_box .item .title .right {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #E8748B;
	}

	.purchaseNote .list_box .item .txt {
		padding-bottom: 15rpx;
		color: #666666;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
	}
</style>
