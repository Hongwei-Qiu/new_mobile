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
						url: '/pages/siji/index/index'
					},
					{
						icon: 'icon-_peisongshang',
						name: '配送',
						url: '/pages/siji/delivery/delivery'
					},
					{
						icon: 'iconhedui',
						name: '订单',
						url: '/pages/siji/order/order'
					},
					{
						icon: 'icongongjiaoxianlu',
						name: '线路',
						url: '/pages/siji/path/path'
					},
					{
						icon: 'iconUserpersonalinform',
						name: '我的',
						url: '/pages/siji/user/user'
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
				// this.tabarIndex = index;
				// if (!uni.getStorageSync("cdj_token")) {
				// } else {
				// uni.switchTab({
				// url: data.url
				// });
				// }
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
