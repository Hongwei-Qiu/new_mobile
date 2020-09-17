<template>
	<view class="profit">
		<my-apphead></my-apphead>
		<ms-tabs :list="dateList" v-model="active" itemColor="#04AA8E" lineColor="#04AA8E"></ms-tabs>
		<view>
			<view class="flex flex_between more_info">
				<text></text>
				<text @click="moreInfoPage">明细</text>
			</view>
			<view class="profit_img">
				<image src="../../../static/img/adminis_pic10.png" mode="aspectFit"></image>
			</view>
			<view class="text_info">
				<view class="" >
					{{graphInfo.price}}
				</view>
				<view class="" >
					{{graphInfo.purchase_price}}
				</view>
				<view class="" >
					{{graphInfo.profit_price}}
				</view>
				<view class="" >
					{{graphInfo.lv}}%
				</view>
			</view>
		</view>
		<!-- #ifdef H5 -->
			<view style="height: 62vh;background: white;margin:0 20rpx;"></view>
		<!-- #endif -->
	<!-- #ifdef MP-WEIXIN -->
		<view style="height: 60vh;background: white;margin:0 20rpx;"></view>
	<!-- #endif -->
		<view class="describe_info">
			<view>
				<view style="background: #20ce9c;"></view>
				<text>配送金额</text>
			</view>
			<view>
				<view style="background: #f75555;"></view>
				<text>毛利金额</text>
			</view>
			<view>
				<view style="background: #f7a83e;"></view>
				<text>成本金额</text>
			</view>
			<view>
				<view style="background: #e6e6e6;"></view>
				<text>毛利率</text>
			</view>
		</view>
		<tabBar tabarIndex=1></tabBar>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import msTabs from "@/components/ms-tabs/ms-tabs.vue"
	import tabBar from '../../../components/tabbar/admin.vue'
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			tabBar,
			msTabs
		},
		watch:{
			active(val){
				this.id=val+1;
				this.adminProfit();
			}
		},
		data() {
			return {
				id: 1,
				active: 0,
				graphInfo:{
					price:0,
					lv:'0%',
					profit_price:0,
					purchase_price:0
				},
				dateList: [{
						name: '今天',
						id: 1
					}, {
						name: '本月',
						id: 2
					},
					{
						name: '上月',
						id: 3
					}
				]
			}
		},
		methods: {
			moreInfoPage() {
				uni.navigateTo({
					url: './detail?id='+this.id
				})
			},
			adminProfit() {
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}

				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					timeType: this.id
				}, obj);
				rs.getRequests("adminProfit", data, (res) => {
					if (res.data.code == 200) {

						this.graphInfo = res.data.data;

					} else {
						rs.Toast(res.data.msg)
					}
				})
			},

		},
		onShow() {
			this.adminProfit();
		}
	}
</script>

<style>
	.profit .date {
		display: flex;
		justify-content: space-around;
		height: 65rpx;
		align-items: center;
		font-size: 28rpx;
	}

	.profit .date>view {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 45rpx;
	}

	.profit .date .activeDate {
		height: 3rpx;
		width: 34rpx;
		background: #04AA8E;
		margin: 5rpx 0 0 0rpx;
		border-radius: 1.5rpx;
	}

	.profit .profit_img {
	
		/* #ifdef H5 */
			height: 60vh;
		/* #endif */
		/* #ifdef MP-WEIXIN */
			height: 53vh;
		/* #endif */
		display: flex;
		justify-content: center;
		position: absolute;
		width: 100%;
	}

	.profit .profit_img image {
		width: 80%;
		height: 100%;
	}

	.profit .text_info {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		position: absolute;
		z-index: 99;
		width: 100%;
		font-size: 50rpx;
		color: white;

		
		/* #ifdef H5 */
		margin-top: 8.5vh;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		margin-top: 5.5vh;font-size: 40rpx;
		/* #endif */
	}

	.profit .text_info>view {
		height: 8vh;
		margin-bottom: 1vh;
		line-height: 8vh;
	}

	.profit .describe_info {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		font-size: 28rpx;
		margin: 20rpx;
		background: white;
	}

	.profit .describe_info>view {
		flex-basis: 30%;
		padding-left: 80rpx;
		height: 100rpx;
		line-height: 100rpx;
	}

	.profit .more_info {
		margin: 0 20rpx;
		background-color: white;
		padding: 20rpx 20rpx 0 0;
		color: rgb(4, 170, 142)
	}

	.profit .tabBlock {
		background: none;
	}
.profit .describe_info>view{display: flex;align-items: center;}
	.profit .describe_info>view>view {
		width: 15rpx;
		height: 15rpx;
		margin-right: 10rpx;
		border-radius: 50%;
	}
</style>
