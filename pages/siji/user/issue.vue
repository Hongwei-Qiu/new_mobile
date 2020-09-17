<template>
	<view class="caigou_index">
		<my-apphead></my-apphead>
		<uni-nav-bar left-icon="back" :statu-bar="navBar"  title="常见问题"  color="#1A1A1A" @clickLeft="goPage"></uni-nav-bar>
		<view style="height:49px;">
			
		</view>
		<view class="issue_item" v-for="item in list">
			<view class="title">
				{{item.title}}
			</view>
			<view class="txt">
				答：<text>{{item.value}}</text>
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
				list:[
					{
						title:'1. 司机在哪里绑定需要配送的订单?',
						value:'在移动端首页左上角扫一扫按钮，点击扫码扫配送单上的二维码进行绑定需要配送的客户。'
					},
					{
						title:'2. 订单列表如何找到我需要的订单，和查看详情？',
						value:'订单列表上方可根据订单号收货人，单位，日期查看您所配送的订单及详情。'
					},
					{
						title:'3. 配送线路可以自己调配和选择吗？',
						value:'点击线路，上下拖动可调配配送顺序。'
					},
					{
						title:'4. 我能看到车辆在哪个位置？',
						value:'可以，点击我的。查看车辆位置百度地图可实时查看车辆实时位置。'
					},
					{
						title:'5. 我如何确认送达客户？',
						value:'首页扫一扫按钮再扫一次显示商品详情可在右上角确认收货。也可在配送单你点击详情 ，及订单列表详情页右上角确认收货。'
					}
				]
			}
		},
		methods: {
			goPage(){
				// #ifdef H5
				window.history.back(-1);
				// #endif 
				// #ifndef H5
				uni.navigateBack({
					delta: 1
				});
				// #endif	
			},

		}
	}
</script>

<style>
	.issue_item{
		background: #ffffff;
		padding: 0 20rpx;
		margin-bottom: 10rpx;
	}
	.issue_item view{
		padding: 25rpx 0;
	}
	.issue_item view text{
		color: #666666;
	}
	.issue_item .title{
		border-bottom: 1px solid #F0F0F0;
	}

	
</style>

