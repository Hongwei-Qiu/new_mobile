<template>
	<view class="more_record">
		<view style="position: fixed;background: white;">
			<uni-nav-bar left-icon="back"  :status-bar="navBar" title="明细" @clickLeft="goPage"></uni-nav-bar>
			<view style="height:44px;">
				
			</view>
			<view class="flex flex_align_center input_style">
				<input type="text" v-model="searchKey" placeholder="请输入单位名称" />
				<text class="top_position" @click="search">置顶</text>
			</view>

		</view>
		<view>
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar">

			</view>
			<!-- #endif -->

			<view style="height: calc(44px + 74rpx);"></view>
		</view>
		<view class="all_info" v-if="bitmap">
			<view v-for="(item,index) in graphInfo" class="sign_info">
				<view class="date">
					<text>单位名称：</text>
					<text>{{item.nickname}} </text>
				</view>
				<view class="flex flex_between money_height">
					<view>
						销售额：<text class="red_font">￥{{item.price}}</text>
					</view>
					<view>
						毛利：￥{{item.profit_price}}
					</view>
				</view>
				<view class="flex flex_between money_height">
					<view>
						毛利率：<text class="red_font">{{item.lv}}%</text>
					</view>
					<view>
						成本：￥{{item.cg_price}}
					</view>
				</view>
			</view>
			<my-loading :loading="loading"></my-loading>
		</view>
		<view v-else>
			<my-bitmap></my-bitmap>
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
				id: '',
				navBar: navBar,
				graphInfo: [],
				loading: true,
				bitmap: true,
				searchKey: ''
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
			search() {
				let name = this.searchKey;

				function up(x, y) {
					if (x.nickname.indexOf(name) != -1) {
						return -1
					}
				}
				this.graphInfo.sort(up)
			},
			adminListDetail() {


				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}

				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					timeType: this.id,

				}, obj);
				rs.getRequests("adminListDetail", data, (res) => {
					if (res.data.code == 200) {

						this.graphInfo = res.data.data;
						if (res.data.data.length == 0) {
							this.bitmap = false;
						} else {
							this.bitmap = true;
						}
						this.loading = false;

					} else {
						rs.Toast(res.data.msg)
					}
				})
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.adminListDetail()

		}
	}
</script>

<style>
	.more_record .select_sort {
		background: white;
		margin: 10rpx 0rpx;
		height: 66rpx;
		line-height: 66rpx;
	}

	.more_record .top_title .arrow {
		margin-top: -10rpx;
		margin-left: 5rpx;
	}

	.more_record .green {
		color: #03A98e !important;
	}

	.more_record .top_title .iconfont {
		width: 30rpx;
		height: 20rpx;
		display: block;
		font-size: 40rpx;
		color: #c2c2c2;
	}

	.more_record .all_info {
		background-color: white;
		font-size: 28rpx;
	}

	.more_record .sign_info {
		padding: 0 20rpx;
	}

	.more_record .sign_info .date {
		border-bottom: 1px solid #F5F5F5;
		height: 50rpx;
		line-height: 50rpx;
	}

	.more_record .sign_info:nth-last-child(n+2) {
		border-bottom: 8rpx solid #f5f5f5;
	}

	.more_record .money_height {
		margin: 15rpx 0rpx;
	}

	.more_record .top_position {
		color: #04AA8E;
		border-left: 1px solid #d6d6d6;
		padding-left: 20rpx;
		font-size: 25rpx;
	}

	.more_record .input_style {
		height: 64rpx;
		margin: 0 20rpx 20rpx;
		background: #f5f5f5;
		border-radius: 50rpx;
	}

	.more_record .input_style input {
		width: 80%;
		padding-left: 40rpx;
		font-size: 26rpx;
	}
</style>
