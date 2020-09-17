<template>
	<view class="more_record">
		<view style="position: fixed;background: #F5F5F5;">
			<uni-nav-bar left-icon="back" :status-bar="navBar" title="明细" @clickLeft="goPage"></uni-nav-bar>
	<view style="height: 44px;"></view>
			<view class="flex flex_around select_sort">
				<view v-for="(item,index) in titleList" class="flex top_title">
					<view>{{item.title}}</view>
					<view class="flex flex_column arrow">
						<view class="iconfont iconsanjiaoxing_shang" :class="{'green':isActive==true&&id==index}" @click="select(index)"></view>
						<view class="iconfont iconsanjiaoxing" :class="{'green':isActive==false&&id==index}" @click="select2(index)"></view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="status_bar">
			
			</view>
			<!-- #endif -->
			
			<view style="height:calc(44px + 88rpx)"></view>
		</view>
		<view class="all_info" v-if="bitmap">
			<view v-for="(item,index) in graphInfo" class="sign_info">
				<view class="date">
					<text>{{item.send_time}}</text>
					<text> </text>
				</view>
				<view class="flex flex_between money_height">
					<view>
						销售额：<text class="red_font">￥{{item.total_price }}</text>
					</view>
					<view>
						毛利：￥{{item.profit_price}}
					</view>
				</view>
				<view class="flex flex_between money_height">
					<view>
						毛利率：<text class="red_font">￥{{item.lv}}%</text>
					</view>
					<view>
						成本：￥{{item.cg_total_price}}
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
				isActive: -1,
				timeType: 1,
				sortType: '',
				cateType: '',
				navBar: navBar,
				titleList: [{
					title: '时间'
				}, {
					title: '销售额'
				}, {
					title: '毛利率'
				}],
				graphInfo:[],
				loading:true,
				bitmap:true
			}
		},
		methods: {
			select(index) {
				this.id = index;
				this.isActive = true;

				// 升序
				switch (this.id) {
					case 0:
						this.sortType = 1;
						this.cateType = 1;
						break;
					case 1:
						this.sortType = 1;
						this.cateType = 2;
						break;
					case 2:
						this.sortType = 1;
						this.cateType = 3;
						break;
				}
				this.adminProfitDetail()
			},
			select2(index) {
				this.id = index;
				this.isActive = false;
			
				// 降序
				switch (this.id) {
					case 0:
						this.sortType = 2;
						this.cateType = 1;
						break;
					case 1:
						this.sortType = 2;
						this.cateType = 2;
						break;
					case 2:
						this.sortType = 2;
						this.cateType = 3;
						break;
				}
				this.adminProfitDetail()
			},
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
			adminProfitDetail() {
				this.graphInfo=[];
				this.loading=true;
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
			
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					timeType: this.timeType,
					sortType: this.sortType,
					cateType: this.cateType
				}, obj);
				rs.getRequests("adminProfitDetail", data, (res) => {
					if (res.data.code == 200) {

						this.graphInfo = res.data.data;
						if(res.data.data.length==0){
							this.bitmap=false;
						}else{
							this.bitmap=true;
						}
                         this.loading=false;
						 
					} else {
						rs.Toast(res.data.msg)
					}
				})
			}
		},
		onShow() {
			this.adminProfitDetail()
		},
		onLoad(option) {
			this.timeType=option.id;
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
	.more_record .show_bitmap{padding-top:21%;}
</style>
