<template>
	<view class="caigou_index">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="status_bar" style="position: fixed;top:0;background:white;">
			<!-- 这里是状态栏 -->
		</view>
		<uni-nav-bar left-icon="back" left-text="" title="常见问题"  color="#1A1A1A" @clickLeft="goPage"></uni-nav-bar>
		<view style="height: 49px;background: #F9F9F9;"></view>
		
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
						title:'1. 今日配送金额指的是什么金额？',
						value:'是您自己所有的客户当天总的下单金额。'
					},
					{
						title:'2. 我要怎么查看我的客户订单配送情况？',
						value:'在配送单页面及订单列表根据订单号收货人和手机号置顶查看。'
					},
					{
						title:'3. 我可以增加和审核我的用户吗？',
						value:'可以在用户列表首页右上角增加用户按钮，可以自己新增用户，点击自己的客户也可审核和修改客户资料。'
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

<!-- 	<view class="issue_item">
			<view class="title">
				1.首页的数据是根据哪里来计算的？
			</view>
			<view class="txt">
				<text>答：</text>首页的数据跟我们系统后台的首页一样的！
			</view>
		</view> -->