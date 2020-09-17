<template>
	<view class="detail">
		<uni-nav-bar left-icon="back"  title="采购单详情" :status-bar="navBar" color="#1A1A1A" @clickLeft="goPage"></uni-nav-bar>
		<view style="height: 100rpx;"></view>
		<view class="list_box">
			<view class="top_item">
				<view class="txt">
					<view>单号</view>
					<view>{{listDetail.order_sn}}</view>
				</view>
				<view class="txt">
					<view>创建时间</view>
					<view>{{listDetail.created_at}}</view>
				</view>
				<view class="txt">
					<view>供应商</view>
					<view>{{listDetail.suppler_name}}</view>
				</view>
				<view class="txt">
					<view>类型</view>
					<view v-if="listDetail.type==1">计划采购</view>
					<view v-if="listDetail.type==2">临时采购</view>
				</view>
				<view class="txt">
					<view>状态</view>
					<view v-if="listDetail.status==0">采购中</view>
					<view v-if="listDetail.status==1">已完成</view>
					<view v-if="listDetail.status==2">已取消</view>
				</view>
				<view class="txt">
					<view>采购金额</view>
					<view class="red_font">¥{{listDetail.amout}}</view>
				</view>
			</view>
			<view class="item" v-for="(item,index) in listDetail.purchase_list">
				<view class="title">
					<view class="left">
						{{item.item_title}}
					</view>
					<!-- <view class="right green_font" v-if="item.status == 0">
						录入
					</view>
					<view class="right green_font" v-if="item.status == 1">
						保存
					</view> -->
					<view class="right green_font" @click="item.enter?save(item,index):entering(item,index)">
						{{item.enter==true?'保存':'录入'}}
					</view>
				</view>
				<view class="txt">
					<view>规格</view>
					<view v-if="item.attr_title != ''">
						{{item.attr_title}}
					</view>
					<view v-if="item.attr_title == ''">
						/
					</view>
				</view>
				<view class="txt">
					<view>需采量</view>
					<view>
						{{item.amount}}{{item.item_unit}}
					</view>
				</view>
				<view class="rr_txt">
					<text>实采量：{{item.p_num}}</text>
					<text>单价：{{item.p_price}}</text>
					<text>合计：{{item.total_price}}</text>
				</view>
			</view>
		</view>

		<view class="shade_box" v-show="isShow">
			<view class="shade">
				<view class="top flex flex_between">
					<view></view>
					<view @click="close">
						<text class="iconfont iconcha"></text>
					</view>
				</view>

				<view class="inp_box flex flex_between">
					<view>数量</view>
					<view class="right">
						<input type="number" placeholder="请输入数量" :focus="isShow" v-model="number" />
					</view>
				</view>
				<view class="inp_box flex flex_between">
					<view>单价</view>
					<view class="right">
						<input type="number" placeholder="请输入单价" v-model="price" />
					</view>
				</view>
				<view class="inp_box flex flex_between">
					<view>合计</view>
					<view class="right">
						{{price*number}}
					</view>
				</view>
				<view class="btn_box" @click="determine">
					<view>确定</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
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
				tabNum: 0,
				isShow: false,
				id: '',
				listDetail: [],
				number: '',
				price: '',
				total: '',
				getIndex: ''
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
			requestListDetail() {
				let that = this;
				that.listDetail = '';
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					id: this.id,
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					timeStamp: timeStamp,
					id: this.id,
					sign: sign,
				}
				rs.getRequests("buyerListDetail", data, (res) => {
					if (res.data.code == 200) {
						that.listDetail = res.data.data;
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			entering(item, index) {
				this.isShow = true;
				this.getIndex = index;
			},
			close() {
				this.isShow = false;
				this.number = "";
				this.price = "";
			},
			determine() {
					let {number,price}=this;
					if(!number){
						rs.Toast('数量不能为空');
						return;
					}
					if(!price){
						rs.Toast('单价不能为空');
						return;
					}
				let detailPurchase = this.listDetail.purchase_list[this.getIndex];
				detailPurchase.enter = true;
				detailPurchase.p_num = Number(this.number).toFixed(2);
				detailPurchase.p_price = Number(this.price).toFixed(2);
				detailPurchase.total_price = Number(this.number * this.price).toFixed(2);
				this.close();
			},
			save(item, index) {
				
				var timeStamp = rs.timeStamp();
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = Object.assign({
					sign: sign,
					detail_id: item.id,
					num:item.p_num,
					total:item.total_price,
					price:item.p_price
				}, obj);
				rs.postRequests("purchaseEntry", data, (res) => {
					 let {data}=res;
					if(data.code==200){
						rs.Toast('保存成功');
						let detailPurchase = this.listDetail.purchase_list[index];
						detailPurchase.enter=false;
						let newMoney=0;
						for(let i of this.listDetail.purchase_list){
							newMoney+=parseFloat(i.total_price);
							
						}
						// console.log(newMoney)
					this.listDetail.amout=newMoney.toFixed(2);
					}else{
						rs.Toast(data.msg)
					}
				})
			},
			twoClick(){
			alert(45)
			}
		},
		onLoad(data) {
			this.id = data.id;
			app.isReload = false;
			this.requestListDetail()
		}
	}
</script>

<style>
	.detail .list_box .top_item {
		background: #ffffff;
		padding: 15rpx 20rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		margin-bottom: 15rpx;
	}

	.detail .list_box .top_item .txt {
		display: flex;
		justify-content: space-between;
		padding-bottom: 20rpx;
		font-size: 28rpx;
	}

	.detail .list_box .top_item .txt:last-child {
		padding-bottom: 0;
	}

	.detail .list_box .item {
		background: #ffffff;
		padding: 15rpx 20rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		margin-bottom: 15rpx;
	}

	.detail .list_box .item .title {
		display: flex;
		justify-content: space-between;
		padding-bottom: 15rpx;
		border-bottom: 1px solid #F0F0F0;
		font-weight: 500;
		margin-bottom: 15rpx;
	}

	.detail .list_box .item .txt {
		font-weight: 400;
		display: flex;
		justify-content: space-between;
		padding-bottom: 20rpx;
		font-size: 26rpx;
	}

	.detail .list_box .item .rr_txt text {
		margin-right: 35rpx;
	}

	.detail .shade_box {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	.detail .shade_box .shade {
		background: #ffffff;
		margin: 0 100rpx;
		margin-top: 35%;
		padding: 18rpx;
		border-radius: 8rpx;
		text-align: end;
	}

	.detail .shade_box .top {
		padding-bottom: 40rpx;
	}

	.detail .shade_box .top .iconfont {
		font-size: 40rpx;
		color: #666666;
	}

	.detail .shade_box .inp_box {
		font-size: 28rpx;
		padding-bottom: 50rpx;
	}

	.detail .shade_box .inp_box input {
		color: #333333;
	}

	.detail .shade_box .btn_box {
		text-align: center;
		padding-bottom: 50rpx;
		margin-top: 20rpx;
	}

	.detail .shade_box .btn_box view {
		background: #03A98E;
		color: #ffffff;
		font-size: 30rpx;
		border-radius: 50rpx;
		padding: 15rpx 0;
	}
</style>
