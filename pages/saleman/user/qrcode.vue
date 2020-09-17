<template>
	<view>
		<uni-nav-bar left-icon="back"  :status-bar="navBar" title="二维码名片" @clickLeft="goPage"></uni-nav-bar>
		<view style="height: 49px;"></view>
		<view class="qr_code">
                 <image :src="qrCodeInfo.codeUrl" mode="aspectFit"></image>
				 <view>分享二维码请点击页面右上角</view>
		</view>
	</view>
</template>
<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';


	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {

		data() {
			return {
				navBar: navBar,
				qrCodeInfo:{}
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
			getQrCode() {
				let id=uni.getStorageSync('qrCodeId');
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
					
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = Object.assign({
					sign: sign,
					id:id
				}, obj);
				rs.getRequests("saleQrcode", data, (res) => {
					let {data}=res;
					if(data.code==200){
						this.qrCodeInfo=data.data;
					}else{
						rs.Toast(data.msg);
					}
				})
			}
		},
		onShow() {
			this.getQrCode();

		}
	}
</script>
<style>
	page {
		background: white;
	}

	.qr_code {
		border-top: 10rpx solid #F5F5F5;
		text-align: center;
		padding-top:150rpx;
	}
	.qr_code image{width:320rpx;height:320rpx;}
</style>
