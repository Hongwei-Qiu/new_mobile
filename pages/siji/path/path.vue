<template>
	<view class="path_line">
		<my-apphead></my-apphead>
		<view v-if="bitmap">
			<view class="sort_tip">
				按住列表左侧圆圈并上下拖动，即可调整配送顺序
			</view>
			<view>
				<!-- <view v-for="(item,index) in itemList" class="sign_line">
					<view class="custom_info">
						<view class="username"><text class="first_str">{{item.nickname.substring(0,1)}}</text><text>{{item.nickname}}</text></view>
						<view class="">
							<text class="iconfont " @click="changeStatus(index)" :class="item.status==false?'iconqingniaoxitongtubiao_xia':'iconicon-test'"></text>
						</view>
					</view>
					<view v-if="item.status" class="more_info">
						<view>
							<text>收货人 :</text>
							<text>{{item.attr.contact}}</text>
						</view>
						<view>
							<text>收货手机 :</text>
							<text @click="call(item.attr.phone)">{{item.attr.phone}}</text>
						</view>
						<view>
							<text>收货地址 :</text>
							<text>{{item.attr.address}}</text>
						</view>
						<view class="flex_between flex">
							<text>导航</text>
							<text class="iconfont iconyou" style="color:#C2C2C2;"></text>
						</view>
					</view>
				</view> -->
				<!-- #ifndef MP-WEIXIN -->
				<HM-dragSorts :list="itemList" @onclick="onclick" @confirm="confirm"></HM-dragSorts>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<bw-drag-sort style="width:100%" :list="itemList" @change="change">
				</bw-drag-sort>
				<!-- #endif -->
				
			
			</view>
		</view>
		<view v-else>
			<my-bitmap></my-bitmap>
		</view>
		<tabar :tabarIndex="tabNum"></tabar>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import tabar from "../../../components/tabbar/siji.vue"
	import dragSorts from '@/components/HM-dragSorts/HM-dragSorts.vue'
	import bwDragSort from '@/wxcomponents/bw-drag-sort/bw-drag-sort.vue'
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			tabar,
			'HM-dragSorts': dragSorts,
			bwDragSort

		},
		data() {
			return {
				showMore: false,
				navBar: navBar,
				tabNum: 3,
				bitmap: true,
				itemList: []
			}
		},
		methods: {
			
			change(e) {
				
				uni.setStorageSync('path', e);
				let changeTime = new Date().getTime() + 5 * 60 * 60 * 1000;
				uni.setStorageSync('changeTime', changeTime);
			},
			confirm(e) {

				uni.setStorageSync('path', e.list);
				let changeTime = new Date().getTime() + 5 * 60 * 60 * 1000;
				uni.setStorageSync('changeTime', changeTime);
			},
			changeStatus(index) {
				this.itemList[index].status = !this.itemList[index].status;
			},
			carLine() {
				let that = this;
				var timeStamp = rs.timeStamp();
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = Object.assign({
					sign: sign
				}, obj)
				rs.getRequests("vehicleLine", data, (res) => {
					if (res.data.code == 200) {
						let cacheLine = uni.getStorageSync('path');
						let changeTime = uni.getStorageSync('changeTime');

						if (res.data.data.length == 0) {
							that.bitmap = false;
						} else {
                                   
							if (cacheLine.length != 0) {
								if (new Date().getTime() > changeTime) {
									uni.removeStorageSync('path');
									uni.removeStorageSync('changeTime');
									let newList = [];
									
									that.itemList = newList;
								} else {

									if (res.data.data.length == cacheLine.length) {
										that.itemList = cacheLine;
									} else {
										let newList = [];
										for (let i of res.data.data) {
											i.status = false;
											newList.push(i);
										}
										that.itemList = newList;
									}

								}
							} else {

								let newList = [];
								for (let i of res.data.data) {
									i.status = false;
									newList.push(i);
								}
								that.itemList = newList;
							}
						}

					} else {
						rs.Toast(res.data.msg)
					}
				})
			}
		},
		onShow() {
			this.carLine();
		}
	}
</script>

<style>
	page {
		background: white;
	}

	.path_line .custom_info {
		display: flex;
		height: 100rpx;
		align-items: center;
		justify-content: space-between;


	}

	.path_line .username {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.path_line .first_str {
		width: 58rpx;
		height: 58rpx;
		background-color: #04A98E;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		margin-right: 31rpx;
		justify-content: center;

	}

	.path_line .sign_line {
		border-bottom: 1px solid #F0F0F0;
		padding: 0 20rpx 10rpx;
	}

	.path_line .sort_tip {
		color: #FF4A4A;
		text-align: center;
		font-size: 24rpx;
		height: 60rpx;
		background: #F9F9F9;
		line-height: 60rpx;
	}

	.path_line .more_info>view {
		margin-bottom: 15rpx;
	}

	.path_line .more_info>view text:first-child {
		margin-right: 18rpx;
	}
</style>
