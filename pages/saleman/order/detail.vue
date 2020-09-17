<template>
	<view class="detail">
		<uni-nav-bar left-icon="back" :right-text="rightText" :status-bar="navBar" @clickRight="determineGood"
		 title="订单详情" :rightColor="rightColor" @clickLeft="goPage"></uni-nav-bar>
		<view style="height: 49px;"></view>
		<view class="list_box">
			<view class="top_box">
				<view class="title">
					<text>单号</text>
					<text>{{listDetail.order_sn}}</text>
				</view>
				<view class="content">
					<text>配送时间</text>
					<text>{{listDetail.send_time}}</text>
				</view>
				<view class="content">
					<text>单位名称</text>
					<text>{{listDetail.nickname}}</text>
				</view>
				<view class="content">
					<text>收货人</text>
					<text>{{listDetail.contact}}</text>
				</view>
				<view class="content">
					<text>手机</text>
					<view class="">
						<text>{{listDetail.mobile}}</text>
						<text class="iconfont icondianhua1" @click="callPhone(listDetail.mobile)"></text>
					</view>
					
				</view>
				<view class="content">
					<text>收货地址</text>
					<text class="address">{{listDetail.address}}</text>
				</view>
				<view class="content border_bottom">
					<text>配送金额</text>
					<text style="color:#FF4949;">￥{{listDetail.total_price}}</text>
				</view>
				<view class="content remark">
					<text>备注</text>

					<text>{{listDetail.remark}}</text>

				</view>
			</view>

			<view class="item" v-for="(item,index) in listDetail.order_list">
				<view class="name txt">
					<view> {{item.item_title}}</view>
					<view class="right" :style="{'color':item.status==1?'#75cb37':'#E8748B'}">{{item.status==1?'已分拣':'未分拣'}}</view>
				</view>
				<view class="txt">
					<view>规格</view>
					<view class="right">{{item.attr_title?item.attr_title:'/'}}</view>
				</view>
				<view class="txt">
					<view>预定量</view>
					<view class="right">{{item.num+item.item_unit}}</view>
				</view>
				<view class="txt">
					<view>配送量</view>
					<view class="right">{{item.weight+item.item_unit}}</view>
				</view>
				<view class="txt">
					<view>备注</view>
					<view class="right">
						{{item.remark}}
					</view>
				</view>
			</view>

		</view>
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
				navBar: navBar,
				list: [],
				listDetail: [],
				id: '',
				rightText: '',
				rightColor: ''
			}
		},
		methods: {
			callPhone(phone){
				uni.makePhoneCall({
				    phoneNumber: phone 
				});
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
			determineGood() {
				let that = this;
				
				if(that.rightText!='确认收货')return;
				uni.showModal({
					title: '提示',
					content: '确定要收货吗？',
					confirmColor: '#03A98E',
					success: function(res) {
						if (res.confirm) {
							let timeStamp = rs.timeStamp();
							let obj = {
								appid: appid,
								timeStamp: timeStamp,
								id: that.id
							}
							let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
							let data = Object.assign({
								sign: sign
							}, obj);
							rs.getRequests("vehicleModifyOrderStatus", data, (res) => {
								if (res.data.code == 200) {
									rs.Toast('收货成功');
									app.isReload = true;
									that.returnDetail();

								} else {
									rs.Toast(res.data.msg)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			returnDetail() {
				let that = this;
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
					id: that.id
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign
				}, obj);
				rs.getRequests("salesmanListDetail", data, (res) => {
					let {
						data
					} = res.data;
					if (res.data.code == 200) {
						that.listDetail = res.data.data;
					
							if (data.order_status == 0) {
								this.rightText = '待审核';
								this.rightColor = '#FF4949';
							}
							if (data.order_status == 1) {
								this.rightText = '备货中';
								this.rightColor = '#03A98D';
							}
							if (data.order_status == 2) {
								this.rightText = '配送中';
								this.rightColor = '#03A98D';
							}
							if (data.order_status == 3) {
								this.rightText = '已收货';
								this.rightColor = '#02b1e4';
							}
							if (data.order_status == 4) {
								this.rightText = '已取消';
								this.rightColor = '#FF4949';
							}
						
						
					} else {
						rs.Toast(res.data.msg)
					}
				})
			}
		},
		onShow() {
			this.returnDetail();
			getApp().globalData.isReload=false;
			// app.isReload = false;
		},
		onLoad(option) {
			this.id = option.id;
		}
	}
</script>

<style>
	.list_box .top_box {
		margin-bottom: 15rpx;
		background: #ffffff;
		padding: 0rpx 20rpx;
		padding-bottom: 10rpx;
	}

	.list_box .top_box .border_bottom {
		border-bottom: 1px solid #F0F0F0;
		padding-bottom: 18rpx !important;
	}

	.list_box .top_box .remark {
		padding: 24rpx 0 !important;
	}

	.list_box .top_box>view {
		display: flex;
		justify-content: space-between;
	}

	.list_box .top_box .title {
		padding: 15rpx 0 0;

	}

	.list_box .top_box .content {
		padding: 10rpx 0;
		font-size: 26rpx;
		font-weight: 400;
	}

	.list_box .item {
		margin-bottom: 15rpx;
		background: #ffffff;
		padding: 0rpx 20rpx;
		padding-bottom: 10rpx;
	}

	.list_box .item .name {
		padding: 15rpx 0;
		/* border-bottom: 1px solid #F0F0F0; */
	}

	.list_box .item .txt {
		padding: 10rpx 0;
		font-size: 26rpx;
		font-weight: 400;
		display: flex;
		justify-content: space-between;
	}
 .list_box .address{width:55%;display: flex;justify-content: flex-end;}
	.list_box .item .txt .right {
		text-align: end;
		width: 500rpx;
	}
	.list_box .icondianhua1{color:#04AA8E;margin-left:24rpx;}
</style>
