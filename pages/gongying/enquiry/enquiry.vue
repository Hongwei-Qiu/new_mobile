<template>
	<view class="caigou_index" v-if="searchKey"  :class="{caigou_index_height:isActive==0}">
		<my-apphead></my-apphead>
		<view class="purchaseNote">
			<view class="head">
				<view class="tab_box flex flex_align_center flex_around">
					<view class="tab" :class="{'active': isActive === index}" v-for="(item,index) in list" @click="tabs(item,index)">
						<view>{{item.tab}}</view>
						<view class="xian" v-if="isActive == index"></view>
					</view>
				</view>
			</view>
			<view class="list_box">
				<view class="inp_box flex flex_center" v-if="isActive == 0">
					<view class="left" style="margin-right: 30rpx;">
						<view class="flex flex_center">
							<view class="time">
								<input type="text" v-model="wareName" placeholder="请选择商品" disabled="true" @click="searchKey=false" />
							</view>
							<view class="btn" @click="searchGood">
								<text class="iconfont iconseach-"></text>
							</view>
						</view>
					</view>
					<view class="right" @click="firstWare=true">
						规格：<text>{{wareAttr}}</text>
					</view>
				</view>
				<view class="inp_box flex flex_center" v-if="isActive == 1">
					<view class="left">
						<view class="flex flex_center">
							<view class="time">
								<input class="time_inp" type="text" v-model="time" placeholder="请选择日期" disabled="true" @click="$refs.date.show()" />
							</view>
							<view class="btn" @click="SupplierList">
								<text class="iconfont iconseach-"></text>
							</view>
						</view>
					</view>
				</view>

				<view class="record_item" v-if="isActive == 0">
					<view class="record_title">
						近5次供应单价（元）
					</view>
					<view v-if="bitmap">
						<view class="item flex flex_center flex_between" v-for="(item,index) in purchases">
							<view>{{item.created_at}}</view>
							<view class="red_font">¥{{item.p_price}}</view>
						</view>
					</view>
					<view v-else>
						<my-bitmap></my-bitmap>
					</view>
				
					
				</view>

				<view class="enquiry_item" v-if="isActive == 1">
					<view class="" v-if="bitmaptwo">
						<my-bitmap></my-bitmap>
					</view>
					<view v-else class="supplier_style">
						<view v-for="(item,index) in supplierList" class="single_ask">
							<view>{{item.item_title}}{{item.attr_title?'('+item.attr_title+')':''}}</view>
							<view class="flex flex_align_center">
								<input type="number" placeholder="报价" v-model="item.price" v-if="item.is_exist==0" class="input">
								<text v-else class="input">{{item.price}}</text>
							
								<text :class="item.is_exist?'iconshanchu':'iconxuanzhong'" class="iconfont" :style="{'color':item.is_exist?'#666':'#04AA8E'}"
								 @click="item.is_exist?deletePrice(item,index):addPrice(item,index)"></text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="enquiry_bottom" v-if="isActive == 1&&showTabar==true">
				<view class="btm flex flex_around">

					<view @click="exportPrice">
						导入价格
					</view>
					<view @click="deleteAll">
						批量清除
					</view>
				</view>

			</view>

		</view>

		<e-picker mode="date" :value="time" fields="day" @confirm="onConfirm($event, 'date')" :startYear="2020" endYear="2029"
		 :disabled-before="true" ref="date">
			采购日期
		</e-picker>
		
		<!-- <w-picker :visible.sync="dateVisible1" mode="date" startYear="2017" endYear="2029" :value="time" :current="false"
		 fields="day" @confirm="onConfirm($event,'date1')" :disabled-after="false" ref="date">采购日期</w-picker> -->
		<!-- 选取导入价格 -->
		<w-picker :visible.sync="firstWare" mode="selector" default-type="name" :default-props="wareListProps" :options="wareList"
		 @confirm="confirmWare($event,'selector')"  ref="selector"></w-picker>
		<w-picker :visible.sync="dateVisible2" mode="date" startYear="2017" endYear="2029" :value="time2" :current="true"
		 fields="day" @confirm="confirmHistory($event,'date1')" :disabled-after="true" ref="date2"></w-picker>
		
		
		<tabar :tabarIndex="tabNum" v-if="showTabar"></tabar>
	</view>
    <view class="query_price" v-else>
    	<my-apphead></my-apphead>
    	<view class="bar_title">
    		<view @click="searchKey=true">
    			<uni-icons type="arrowleft" size="30"></uni-icons>
    		</view>
    		<view class="search_style">
    			<uni-icons type="search" size="20"></uni-icons>
    			<input type="text" :focus="searchKey==false" v-model="search" placeholder="请输入商品" @input="getWord" />
    		</view>
    	</view>
    	<view style="height:5px;background: #f6f6f6;"></view>
    	<view class="search_content">
    		<view v-for="(item,index) in keyList" @click="deterMine(item)">{{item.title}}</view>
    	</view>
    </view>
    
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import un from '../../../static/js/uni.js';
	import wPicker from "../../../components/w-picker/w-picker.vue";
	import tabar from "../../../components/tabbar/gongying.vue"
	import ePicker from "../../../components/w-picker2/w-picker.vue"
	import nPicker from "../../../components/w-picker3/w-picker.vue"
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			tabar,
			wPicker,
			ePicker,
			nPicker,

		},
		data() {
			return {
				navBar: navBar,
				showTabar:true,
				bitmap:false,
				bitmaptwo: true,
				searchKey:true,
				search:'',
				firstWare:false,
				wareName:'',
				wareAttr:'请选择',
				wareList:[],
				attr_id:'',
				item_id:'',
				purchases:[],
				isActive: 1,
				tabNum: 3,
				time: '',
				time2: '',
				wareListProps: {
					label: 'value',
					value: 'item_id'
				},
				dateVisible1: false,
				dateVisible2: false,
				list: [{
						tab: "历史记录",
						id: 1
					},
					{
						tab: "开始报价",
						id: 2
					}
				],
				supplierList: [],
				keyList:[],
			}
		},
		methods: {
			// 历史记录
			getWord(e) {
				this.search= e.detail.value;
				if (e.detail.value.length) {
					let timeStamp = rs.timeStamp();
					var obj = {
						appid: appid,
						timeStamp: timeStamp,
						keyword: this.search
					}
					var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
					let data = Object.assign({
						sign: sign
					}, obj);
					rs.getRequests("searchItem", data, (res) => {
						if (res.data.code == 200) {
							this.keyList = res.data.data;
							if (res.data.data.length == 0) {
								rs.Toast('搜索的商品不存在')
							}
						} else {
							rs.Toast(res.data.msg)
						}
					})
			
				}
			
			},
			deterMine(item) {
				this.search = item.title;
				this.searchKey = true;
				this.wareName = item.title;
				if (item.attr.length == 0) {
					item.attr[0] = {
						id: 0,
						item_id: item.id,
						value: '/'
					}
				}
			
				this.wareList = item.attr;
				this.wareAttr = item.attr[0].value;
				this.attr_id = item.attr[0].id;
				this.item_id = item.attr[0].item_id;
				this.bitmap = false;
			
			},
			confirmWare(e) {
				
				this.wareAttr = e.result;
				this.attr_id = e.obj.id;
				this.item_id = e.obj.item_id;
			},
			searchGood() {
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					attr_id: this.attr_id,
					item_id: this.item_id
				}
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign
				}, obj);
				rs.getRequests("enquiry", data, (res) => {
					if (res.data.code == 200) {
						this.purchases = res.data.data;
						if (res.data.data.length != 0) {
							this.bitmap = true;
						} else {
							this.bitmap = false;
						}
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			// 开始报价
			onConfirm(res, type) {
				// this.result=res;
				// console.log(res)
				this.time = res.value
			},
			exportPrice() {
              this.$refs.date2.show();
				// this.dateVisible2 = true;
			},
			addPrice(item,index){
				let timeStamp = rs.timeStamp();
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					list_id: item.id,
					price: item.price
				}, obj);
				rs.postRequests("addCommoditySupplier", data, (res) => {
					if (res.data.code == 200) {
						rs.Toast('修改成功');
						this.supplierList[index].is_exist=1;
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			// 删除价格
			deletePrice(item,index){
				let that = this;
					uni.showModal({
						title: '',
						content: '是否删除该商品的报价？',
						confirmColor: '#03A98E',
						success: function(res) {
							if (res.confirm) {
								let timeStamp = rs.timeStamp();
								let obj = {
									appid: appid,
									timeStamp: timeStamp,
								}
								let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
								let data = Object.assign({
									sign: sign,
									list_id:item.id
								}, obj);
								rs.getRequests("delSupplierPrice", data, (res) => {
									if (res.data.code == 200) {
										rs.Toast('成功删除价格');
										that.supplierList[index].is_exist=0;
										that.supplierList[index].price="";
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
			confirmHistory(res, type) {
				// this.result=res;
				let timeStamp = rs.timeStamp();

				var obj = {
					appid: appid,
					timeStamp: timeStamp,

				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					date: this.time,
					history_date: res.value
				}, obj);
				rs.getRequests("importSupplierPrice", data, (res) => {
					if (res.data.code == 200) {
						this.supplierList = res.data.data;
						// #ifdef H5
						 window.location.reload()
						// #endif
						// #ifndef H5
						  this.SupplierList();
						// #endif
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			tabs(item, index) {
				this.isActive = index;
			},
			SupplierList() {
				let timeStamp = rs.timeStamp();
				this.supplierList = [];
				var obj = {
					appid: appid,
					timeStamp: timeStamp,

				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					date: this.time
				}, obj);
				rs.getRequests("commoditySupplierList", data, (res) => {
					if (res.data.code == 200) {
						this.supplierList = res.data.data;
						if (res.data.data.length == 0) {
							this.bitmaptwo = true;
							rs.Toast('无商品信息');
						} else {
							this.bitmaptwo = false;
						}
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
		
			// 批量删除
			deleteAll(){
				let that = this;
				uni.showModal({
					title: '',
					content: '将清空列表中所有的报价,确认吗？',
					confirmColor: '#03A98E',
					success: function(res) {
						if (res.confirm) {
							let timeStamp = rs.timeStamp();
							let obj = {
								appid: appid,
								timeStamp: timeStamp,
							}
							let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
							let data = Object.assign({
								sign: sign,
								date: that.time
							}, obj);
							rs.getRequests("delSupplierPrice", data, (res) => {
								if (res.data.code == 200) {
									rs.Toast('操作成功');
									let newArr=[];
									for(let i of that.supplierList){
										i.price="";
										i.is_exist=0;
										newArr.push(i);
									}
									that.suplierList=newArr;
								} else {
									rs.Toast(res.data.msg)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}

		},
		onShow() {
			this.SupplierList();
			// #ifdef H5
			window.onresize = () => {
				this.showTabar = !this.showTabar;
			}
			// #endif
		},
		onLoad() {
			this.time = un.formatDate();
			this.time2 = un.formatDate(0);
		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}

	.purchaseNote .head {
		position: fixed;
		width: 100%;
		/* top: 0; */
		left: 0;
		background: #F9F9F9;
	}

	.purchaseNote .tab_box {
		padding: 0 30rpx;
		color: #666666;
		font-family: PingFang SC;
		margin-bottom: 20rpx;
	}

	.purchaseNote .tab_box .tab {
		height: 60rpx;
		line-height: 60rpx;
		padding-bottom: 10rx;
		text-align: center;
	}

	.purchaseNote .tab_box .tab.active {
		color: #03A98E;
	}

	.purchaseNote .tab_box .tab .xian {
		width: 38rpx;
		height: 5rpx;
		background: rgba(3, 169, 142, 1);
		border-radius: 10rpx;
		position: relative;
		left: 50%;
		margin-left: -19rpx;
	}

	.purchaseNote .inp_box {
		background-color: #FFFFFF;
		padding: 15rpx;
		border-bottom: 10rpx solid #F9F9F9;
	}

	.purchaseNote .inp_box .time {
		background-color: #F5F5F5;
		padding: 15rpx 20rpx;
		border-radius: 50rpx 0 0 50rpx;
	}

	.purchaseNote .inp_box .time input {
		width: 350rpx;
		margin-left: 20rpx;
	}

	.purchaseNote .inp_box .time .time_inp {
		width: 550rpx;
	}

	.purchaseNote .inp_box .btn {
		background-color: #03A98E;
		padding: 15rpx 30rpx;
		border-radius: 0 50rpx 50rpx 0;
		color: #FFFFFF;
	}

	.purchaseNote .inp_box .right {
		font-size: 28rpx;
	}

	.purchaseNote .inp_box .right .text {
		color: #666666;
	}

	.purchaseNote .list_box {
		padding-top: 85rpx;
		padding-bottom: 110rpx;
	}

	.purchaseNote .list_box .record_item {
		padding: 0 20rpx 0 20rpx;
		background: #ffffff;
	}

	.purchaseNote .list_box .record_item .item {
		background: #ffffff;
		padding: 10rpx 0;
		font-size: 28rpx;
	}

	.purchaseNote .list_box .record_item .record_title {
		background: #ffffff;
		padding: 15rpx 0;
		border-bottom: 1px solid #F0F0F0;
	}

	.purchaseNote .enquiry_item .item {
		padding: 0 20rpx;
		background: #FFFFFF;
		border-bottom: 1px solid #F0F0F0;
		padding-bottom: 20rpx;
	}

	.purchaseNote .enquiry_item .item .title {
		padding: 20rpx 0;
		background: #FFFFFF;
	}

	.purchaseNote .enquiry_item .item .title .right .iconfont {
		font-size: 40rpx;
	}

	.purchaseNote .enquiry_item .item .title .left .badge {
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		color: #FFFFFF;
		background: #03A98E;
		font-size: 15rpx;
		text-align: center;
		line-height: 30rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.purchaseNote .enquiry_item .item .title .left .iconfont {
		font-size: 26rpx;
		color: #666666;
		margin-right: 10rpx;
	}

	.purchaseNote .enquiry_item .item .content {
		padding-left: 30rpx;
	}

	.purchaseNote .enquiry_item .item .content .txt {
		font-size: 26rpx;
		margin-bottom: 15rpx;
	}

	.enquiry_bottom {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 100rpx;
		z-index: 99;
		background: #FFFFFF;
		border-bottom: 1rpx solid #F0F0F0;
	}

	.enquiry_bottom .btm {
		padding: 15rpx 0;
		color: #666666;
		font-size: 28rpx;
	}

	.enquiry_bottom .btm .iconfont {
		font-size: 36rpx;
		color: #666666;
	}

	.enquiry_bottom .btm view {
		padding: 10rpx 80rpx;
	}

	.enquiry_bottom .btm view:nth-child(1) {
		border-right: 1px solid #F0F0F0;
	}

	.enquiry_bottom .btm view:nth-child(2) {
		border-right: 1px solid #F0F0F0;
	}

	.enquiry_item .show_bitmap {
		padding-top: 20%;
	}

	.enquiry_item .supplier_style .single_ask {
		background: white;
		padding: 0 30rpx;
		height: 88rpx;
		background: white;
		padding: 0 15px;
		display: flex;
		height: 44px;
		align-items: center;
		justify-content: space-between;
	}

	.enquiry_item .supplier_style .single_ask .input {
		border: 1px solid #d6d6d6 !important;
		width: 166rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
		padding: 10rpx;
		font-size: 26rpx;
	
	}
	.query_price {
		background: white;
		height: 100vh;
	}
	
	.query_price .bar_title {
		display: flex;
	
		height: 47px;
		line-height: 47px;
		align-items: center;
	
	}
	
	.query_price .search_style {
		width: 80%;
		display: flex;
		align-items: center;
		background: #F6F6F6;
		border-radius: 20px;
		padding: 0 10px;
		height: 32px;
		margin-left: 1%;
	}
	.search_content {
		padding: 20rpx;
		height:90vh;overflow-y: scroll;
	}
	
	.search_content>view {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		color: #343434;
	}
	.caigou_index_height{height:100vh;background: white;}
	.caigou_index_height .record_item .show_bitmap{padding-top:21%;}
</style>
