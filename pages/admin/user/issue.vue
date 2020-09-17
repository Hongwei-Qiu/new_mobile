<template>
	<view class="caigou_index">
		
		<uni-nav-bar left-icon="back" :statu-bar="navBar"  title="常见问题"  color="#1A1A1A" @clickLeft="goPage"></uni-nav-bar>
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
						title:'1. 首页的数据是根据哪里来计算的?',
						value:'首页的数据跟我们系统后台的首页是一样的!'
					},
					{
						title:'2. 可以按时间来查看吗?',
						value:'可以按一周来查,也可以按月来查。'
					},
					{
						title:'3. 我可以增加和审核我的用户吗？',
						value:'可以在用户列表首页右上角增加用户按钮，可以自己新增用户，点击自己的客户也可审核和修改客户资料。'
					},
					{
						title:'4. 用户明细可以看到吗?',
						value:'在右上角有个明细,点击进去就可以看到了!'
					},
					{
						title:'5. 采购员每天买的金额看的到吗?',
						value:'点击采购员,就可以看到,当天的和本月的还有上个月的!'
					},
					{
						title:'6. 可以看到有谁在我们系统操作了嘛?',
						value:'可以的在我的页面有个操作记录可以看到有谁在后天系统里面进行了操作!'
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