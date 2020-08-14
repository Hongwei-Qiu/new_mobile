<template>
	<view class="caigou_index">
		<view class="purchase">
			<view class="head">
				<view class="tab_box">
					<ms-tabs :list="type" v-model="active" itemColor="#03A98E"></ms-tabs>
				</view>
				<view class="flex flex_center search_box">
					<view class="flex flex_align_center inp_box">
						<view class="flex flex_align_center left">
							<view class="flex flex_align_center zd">
								<input type="text" placeholder="输入置顶商品" />
								<text class="zd_txt">置顶</text>
							</view>
							<view class="time" @tap="dateVisible1=true">
								{{time}}
							</view>
						</view>
						<view class="right" @click="requestItemList()">
							<text class="iconfont iconseach-"></text>
						</view>
					</view>
				</view>
			</view>


			<view class="list_box">
				<view class="item" v-for="(item,index) in itemList">
					<view class="title">{{item.title}}</view>
					<view class="body">
						<view class="flex flex_between detail">
							<view class="left">规格</view>
							<view class="right" v-if="item.attr_title==''">/</view>
							<view class="right" v-if="item.attr_title!=''">{{item.attr_title}}</view>
						</view>
						<view class="flex flex_between detail">
							<view class="left">需采量</view>
							<view class="right">{{item.amount}}{{item.unit}}</view>
						</view>
						<view class="flex flex_between detail">
							<view class="left">备注</view>
							<view class="right">{{item.remark}}</view>
						</view>
						<view class="unfold" v-if="isShow == item" @click="isShow = '空'">
							<text>展开更多</text>
							<text class="iconfont iconicon-test"></text>
						</view>
						<view class="unfold" v-if="isShow != item" @click="isShow = item">
							<text>展开更多</text>
							<text class="iconfont iconqingniaoxitongtubiao_xia"></text>
						</view>
						<view class="flex flex_between detail" v-if="isShow == item">
							<view class="left">采购量</view>
							<block v-for="(remarks,index) in item.remark.split(',')">
								<view class="right">{{remarks.split("（")[0]}}</view>
								<view v-if="remarks.substring(remarks.indexOf('（') + 1, remarks.indexOf('）')) != ''" style="color:#999;">备注：{{remarks.substring(remarks.indexOf("（") + 1, remarks.indexOf("）"))}}</view>
							</block>
						</view>
					</view>
					<form @submit="submit">
						<view class="flex flex_between inp_btn">
							<view class="inp" style="display: none;">
								<input type="number" name="list_id" placeholder="数量" v-model="item.list_id" />
							</view>
							<view class="inp">
								<input type="number" name="number" placeholder="数量" v-model="item.num" />
							</view>
							<view class="inp">
								<input type="number" name="price" placeholder="单价" v-model="item.price" />
							</view>
							<view class="inp" v-if="(item.num * item.price) <= 0">
								<input type="number" name="total" placeholder="合计" />
							</view>
							<view class="inp" v-else>
								<input type="number" name="total" placeholder="合计" v-model="item.num * item.price" />
							</view>
							<button class="btn" form-type="submit">完成</button>
						</view>
					</form>

				</view>
			</view>

			<w-picker :visible.sync="selectorVisible" mode="selector" value="女" default-type="name" :default-props="defaultProps"
			 :options="selectorList" @confirm="onConfirm($event,'selector')" ref="selector"></w-picker>
			<w-picker :visible.sync="dateVisible1" mode="date" startYear="2017" endYear="2029" :value="time" :current="false"
			 fields="day" @confirm="onConfirm1($event,'date1')" :disabled-after="false" ref="date1"></w-picker>
		</view>

		<tabar :tabarIndex="tabNum"></tabar>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import un from '../../../static/js/uni.js';
	import tabar from "../../../components/tabbar/siji.vue"
	import msTabs from "../../../components/ms-tabs/ms-tabs.vue"
	import wPicker from "../../../components/w-picker/w-picker.vue";
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			tabar,
			msTabs,
			wPicker
		},
		data() {
			return {
				navBar: navBar,
				tabNum: 1,
				isShow: '空',
				type: [],
				active: '',
				cate_id: '', //商品分类ID
				selectorVisible: false,
				dateVisible1: false,
				supplier: [], //供应商ID
				time: '', //时间
				defaultProps: {
					label: "label",
					value: "value"
				},
				selectorList: [],
				itemList: [],
			}
		},
		watch: {
			active() {
				this.cate_id = this.type[this.active].id; // 0
				this.requestItemList()
			}
		},
		methods: {
			submit(e){
				let id = e.detail.value.list_id;
				let num = e.detail.value.number;
				let price = e.detail.value.price;
				let total = e.detail.value.total;
				let timeStamp = Math.round(new Date().getTime() / 1000);
				if (!num) {
					rs.Toast('请输入数量');
					return;
				}
				if (!price) {
					rs.Toast('请输入单价');
					return;
				}
				let obj = {
					id: id,
					num: num,
					price: price,
					total: total,
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						sign: sign
					},
					obj
				);
				rs.postRequests('buyerInputPrice', params, res => {
					let data = res.data;
					if (data.code == 200) {
						rs.Toast('完成');
						this.requestItemList()
					} else {
						rs.Toast(data.msg);
					}
				});
			},
			onConfirm(res, type) {
				this.supplier.push(res.value);
				console.log(this.supplier)
				this.requestItemList()
			},
			onConfirm1(res, type) {
				this.time = res.result;
				this.requestItemList()
			},
			requestItemCate() {
				let that = this;
				that.list = [];
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					timeStamp: timeStamp,
					sign: sign,
				}
				rs.getRequests("firstItemCate", data, (res) => {
					if (res.data.code == 200) {
						that.type = res.data.data;
						// console.log(that.type)
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			requestItemList() {
				let that = this;
				that.itemList = [];
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					timeStamp: timeStamp,
					supplier_id: that.supplier,
					created_at: that.time,
					cate_id: that.cate_id,
					sign: sign,
				}
				rs.getRequests("supplierItemList", data, (res) => {
					if (res.data.code == 200) {
						res.data.data.list.map(((item, index) => {
							that.itemList.push(Object.assign({}, item, {
								num: '',
								price: ''
							}))
						}))
						// console.log(that.itemList);
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},

		},
		onShow() {
			this.time = un.formatDate();
			// this.requestItemCate()
			// this.requestItemList()
		}
	}
</script>

<style>
	.purchase .head {
		width: 100%;
		position: fixed;
		top: 0;
		background: #F5F5F5;
		z-index: 99;
	}

	.purchase .head .search_box {
		background: #fff;
		margin-top: 10rpx;
		padding: 15rpx 20rpx;
		font-size: 28rpx;
		color: #333333;
	}

	.purchase .head .search_box .left {
		background: #F5F5F5;
		padding: 15rpx 0;
		border-radius: 60rpx 0 0 60rpx;
	}

	.purchase .head .search_box .left {
		background: #F5F5F5;
		padding: 15rpx 0;
		border-radius: 60rpx 0 0 60rpx;
	}

	.purchase .head .search_box .zd input {
		width: 250rpx;
		font-size: 28rpx;
		margin-left: 30rpx;
		margin-right: 10rpx;
	}

	.purchase .head .search_box .zd .zd_txt {
		color: #03A98E;
		margin-right: 30rpx;
	}

	.purchase .head .search_box .time {
		text-align: center;
		padding: 0 40rpx;
		border-left: 1px solid #666666;
	}

	.purchase .head .search_box .right {
		background: #03A98E;
		color: #fff;
		padding: 12rpx;
		padding-right: 25rpx;
		border-radius: 0 60rpx 60rpx 0;
	}

	.purchase .head .search_box .right .iconfont {
		margin-left: 10rpx;
		font-size: 42rpx;
	}

	.purchase .list_box {
		padding-top: 205rpx;
		padding-bottom: 100rpx;
	}

	.purchase .list_box .item {
		background: #ffffff;
		padding: 15rpx 20rpx;
		color: #333333;
		margin-bottom: 15rpx;
	}

	.purchase .list_box .item .title {
		padding-bottom: 15rpx;
		border-bottom: 1px solid #F0F0F0;
		font-size: 32rpx;
		font-size: 500;
	}

	.purchase .list_box .item .body {
		font-weight: 400;
		font-size: 28rpx;
		margin-top: 15rpx;
	}

	.purchase .list_box .item .body .detail {
		padding-bottom: 15rpx;
	}

	.purchase .list_box .item .body .detail .right {
		/* width: 450rpx; */
		text-align: end;
	}

	.purchase .list_box .item .body .detail:nth-child(3) .right {
		max-width: 450rpx;
		text-align: start;
	}

	.purchase .list_box .item .body .unfold {
		text-align: end;
		padding-bottom: 20rpx;
		color: #ADADAD;
	}

	.purchase .list_box .item .inp_btn {
		margin-top: 20rpx;
	}

	.purchase .list_box .item .inp input {
		width: 150rpx;
		padding: 10rpx;
		border-radius: 10rpx;
		border: 1px solid #D6D6D6 !important;
		margin-right: 20rpx;
	}

	.purchase .list_box .item .inp input::-webkit-input-placeholder {
		color: #D6D6D6;
	}

	.purchase .list_box .item .btn {
		width: 140rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		background: #03A98E;
		color: #ffffff;
		text-align: center;
		border-radius: 10rpx;
	}
</style>


