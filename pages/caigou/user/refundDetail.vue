<template>
	<view class="detail">
		<uni-nav-bar left-icon="back" left-text="" title="退货单详情" color="#1A1A1A"></uni-nav-bar>
		<view style="height: 90rpx;"></view>
		<view class="list_box">
			<view class="top_box">
				<view class="title">
					单号：GGTH2020062800000003
				</view>
				<view class="content">
					供应商：自采
				</view>
				<view class="content">
					退货金额：<text class="red_font">¥0.00</text>
				</view>
				<view class="content">
					支付状态：<text class="red_font">¥0.00</text>
				</view>
				<view class="content">
					创建时间：2020-06-08 09:44
				</view>
			</view>

			<view class="item">
				<view class="name">
					小牛
				</view>
				<view class="txt">
					<view>规格</view>
					<view class="right">/</view>
				</view>
				<view class="txt">
					<view>退货数量</view>
					<view class="right">2.00斤</view>
				</view>
				<view class="txt">
					<view>退货单价</view>
					<view class="right">¥0.00</view>
				</view>
				<view class="txt">
					<view>规格</view>
					<view class="right">
						这是备注这是备注这是备注这是备注
						这是备注这是备注这是备注
					</view>
				</view>
			</view>

		</view>
	</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
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
				list: [{
					title: "空心菜",
					status: 1,
					unit: "斤",
					spec: "/",
					need: "367.00",
				}, {
					title: "白菜",
					status: 2,
					unit: "斤",
					spec: "/",
					need: "367.00",
					practical: "200",
					price: "2.00",
					total: "400"
				}, ]
			}
		},
		methods: {
			entering(item, index) {

			}

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

