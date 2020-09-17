<template>
	<view class="tabbar">
		<view class="list">
			<view class="item">
				<view @click="pageUrl(item,index)" v-for="(item, index) in userList" :key="index" :class="tabarIndex==index?'color':'incolor'">
					<view :class="'iconfont ' + item.icon"></view>
					<view class="name">{{ item.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		//属性
		props: ['tabarIndex'],
		data() {
			return {
				userList: [{
						icon: 'iconindex',
						name: '首页',
						url: '/pages/admin/index/index'
					},
					{
						icon: 'icon-_peisongshang',
						name: '毛利',
						url: '/pages/admin/profit/index'
					},
					{
						icon: 'iconhedui',
						name: '用户',
						url: '/pages/admin/custom/index'
					},
					{
						icon: 'iconcart',
						name: '采购',
						url: '/pages/admin/procure/index'
					},
					{
						icon: 'iconUserpersonalinform',
						name: '我的',
						url: '/pages/admin/user/index'
					}

				],
			}
		},
		//组件生命周期
		created: function(e) {
			// console.log(this.tabarIndex)
		},
		methods: {
			pageUrl(data, index) {
				uni.reLaunch({
					url: data.url
				});
			}
		}
	}
</script>

<style>
	.color {
		color: #03A98D;
	}

	.incolor {
		color: #D5D5D5;
	}

	.tabbar {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		background: #FFFEFF;
	}

	.tabbar .list {
		width: 100%;
		font-size: 28rpx;
		text-align: center;
		padding: 10rpx 0;
	}

	.tabbar .list .item {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

	.tabbar .list .item .iconfont {
		font-size: 40rpx;
		margin-bottom: 5rpx;
	}
</style>
