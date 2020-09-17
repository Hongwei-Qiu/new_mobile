<template>
	<view class="caigou_index">
		
		<uni-nav-bar left-icon="back"  :statu-bar="navBar"  title="常见问题" color="#1A1A1A" @clickLeft="goPage"></uni-nav-bar>
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
						title:'1. 为什么首页的今日完成和其他的东西点不开?',
						value:'首页的数据只是用来看的,看完成了哪些,哪些未完成,具体的操作在采购,采购单,询价里面!'
					},
					{
						title:'2. 为什么我输入的菜品不能置顶?',
						value:'只能把今天需要采购的菜品进行置顶,方便查看!'
					},
					{
						title:'3. 菜品的合计自动计算的吗?',
						value:'是的菜品的合计是根据,前面的数量乘以单价来实时计算的!'
					},
					{
						title:'4. 今日采购右边有个供应商是干嘛的?',
						value:'根据现场情况,比如供应商突然不供应了,或者一些其他的情况需要我们采购员把供应商的商品进行采购,就可以点击供应商,然后选中即可把供应商的商品,放到我们这个采购员里面,就可以采购了!'
					},
					{
						title:'5. 为什么今日采购是空白的?',
						value:'因为今日采购只会显示今天这个采购员需要采购的商品,其他日期的则不会显示!'
					},
					{
						title:'6. 可以看到以前的采购单嘛?',
						value:'可以的在采购单页面就可以看到以前所有的采购单'
					},
					{
						title:'7. 可以看到以前的采购单价嘛?',
						value:'可以的在询价页面可以看到以前的商品的采购单价!'
					},
					{
						title:'8. 为什么账单里面看不到采购单的详情?',
						value:'账单里面主要是用来核对账单的,要看采购单的详情和商品价格的话到采购单页面里面有!'
					},
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