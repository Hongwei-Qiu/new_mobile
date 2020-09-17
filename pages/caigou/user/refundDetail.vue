<template>
	<view class="detail">
		<uni-nav-bar left-icon="back"  title="退货单详情" color="#1A1A1A" @clickLeft="goPage"></uni-nav-bar>
		<view style="height: 50px;"></view>
		<view class="list_box">
			<view class="top_box">
				<view class="title">
					单号：{{listDetail.order_sn}}
				</view>
				<view class="content">
					供应商：{{listDetail.supplier_name}}
				</view>
				<view class="content">
					退货金额：<text class="red_font">¥{{listDetail.net_receipts}}</text>
				</view>
				<view class="content">
					支付状态：<text class="red_font" v-if="listDetail.pay_status==0">未支付</text>
					<text class="red_font" v-if="listDetail.pay_status==1">实收:{{listDetail.net_receipts }}</text>
				</view>
				<view class="content">
					创建时间：{{listDetail.create_time}}
				</view>
			</view>

			<view class="item" v-for="(item,index) in listDetail.list">
				<view class="name">
					{{item.title}}
				</view>
				<view class="txt">
					<view>规格</view>
					<view class="right">{{item.attr_title?item.attr_title:'/'}}</view>
				</view>
				<view class="txt">
					<view>退货数量</view>
					<view class="right">{{item.num+item.unit}}</view>
				</view>
				<view class="txt">
					<view>退货单价</view>
					<view class="right">¥{{item.price}}</view>
				</view>
				<view class="txt">
					<view>备注</view>
					<view class="right">
					{{item.remark}}
					</view>
				</view>
			</view>

		</view>
	</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				navBar: navBar,
				list: [ ],
				listDetail:[],
				id:''
			}
		},
		methods: {
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
			entering(item, index) {

			},
         returnDetail(){
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
			 	id: this.id,
			 	sign: sign,
			 }
			 rs.getRequests("purchaseReturnsDetail", data, (res) => {
			 	if (res.data.code == 200) {
			 		that.listDetail = res.data.data;
			 	} else {
			 		rs.Toast(res.data.msg)
			 	}
			 })
		 }
		},
		onShow() {
			this.returnDetail();
		},
		onLoad(option) {
			this.id=option.id;
		}
	}
</script>

<style>
	.list_box .top_box {
		margin-bottom: 15rpx;
		background: #ffffff;
		padding: 0rpx 20rpx;
		padding-bottom: 10rpx;
	}

	.list_box .top_box .title {
		padding: 15rpx 0;
		border-bottom: 1px solid #F0F0F0;
	}

	.list_box .top_box .content {
		padding: 10rpx 0;
		font-size: 26rpx;
		font-weight: 400;
	}

	.list_box .item {
		margin-bottom: 15rpx;
		background: #ffffff;
		padding: 0rpx 20rpx;
		padding-bottom: 10rpx;
	}

	.list_box .item .name {
		padding: 15rpx 0;
		border-bottom: 1px solid #F0F0F0;
	}

	.list_box .item .txt {
		padding: 10rpx 0;
		font-size: 26rpx;
		font-weight: 400;
		display: flex;
		justify-content: space-between;
	}
	.list_box .item .txt .right{
		text-align: end;
		width:500rpx;
	}

</style>

