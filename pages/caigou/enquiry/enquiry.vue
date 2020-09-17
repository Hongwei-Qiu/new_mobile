<template>
	<view>
		<view class="caigou_index" :class="{caigou_index_height:isActive==0}" v-if="searchKey==0">
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
								<view class="time" @click="queryPrice">
									<input type="text" v-model="wareName" placeholder="请选择商品" disabled="true" />
								</view>
								<view class="btn" @click="searchGood">
									<text class="iconfont iconseach-"></text>
								</view>
							</view>
						</view>
						<view class="right">
							规格：<text @click="showWare=true">{{wareAttr}}</text>
						</view>
					</view>
					<view class="inp_box flex flex_center" v-if="isActive == 1">
						<view class="left">
							<view class="flex flex_center">
								<view class="time">
									<input class="time_inp" type="text" v-model="time" placeholder="请选择日期" disabled="true" @click="showPurchase" />
								</view>
								<view class="btn" @click="commodityBuyerList">
									<text class="iconfont iconseach-"></text>
								</view>
							</view>
						</view>
					</view>

					<view class="record_item" v-if="isActive == 0">
						<view class="record_title">
							近5次采购单价（元）
						</view>
						<block v-if="bitmap">
							<view class="item flex flex_center flex_between" v-for="(item,index) in purchases" :key="index">
								<view>{{item.created_at}}</view>
								<view class="red_font">¥{{item.p_price}}</view>
							</view>
						</block>
						<block v-else>
							<my-bitmap style="padding-top:25%;"></my-bitmap>
						</block>

					</view>

					<view class="enquiry_item" v-if="isActive == 1">
						<block v-if="bitmaptwo">
							<my-bitmap></my-bitmap>
						</block>
						<block v-else>
							
							<view class="item" v-for="(item,index) in enquiryList" :key="index">
								<view class="title flex flex_between">
									<view class="left">
										<text class="badge">
											{{item.supplier_num}}
										</text>
										<text class="iconfont " :class="item.look_more?'iconyou':'iconxiala'" @click="lookMore(index)"></text>
										<text class="name">
											{{item.item_title}}{{item.attr_title?'('+item.attr_title+')':''}}
										</text>
									</view>
									<view class="right" @click="deleteSign(item.id,index)">
										<text class="iconfont iconcha"></text>
									</view>
								</view>
								<view class="content" v-if="item.look_more">
									<view class="txt" v-for="(supplier,first) in item.supplier_list ">
										{{supplier.supplier_name}}:￥{{supplier.price}}
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
                   <view style="height:80rpx;">
                   	
                   </view>
				<view class="enquiry_bottom" v-if="isActive == 1">
					<view class="find_good flex_align_center" v-if="showFind">
						<view class="flex flex_align_center">
							<input type="text" placeholder="商品名称" v-model="goodname" disabled="true" @click="searchKey=2" />
							<view>规格：<text style="color:#666;" @click="firstWare=true">{{wareAttrtwo}}</text></view>
						</view>
						<view style="color:#03A98E;" @click="submitAdd">确定</view>
					</view>
					<view class="btm flex flex_around">
						<view>
							<text class="iconfont" :class="showFind?'iconcha':'iconjia'" @click="changeIcon"></text>
						</view>
						<view @click="copyAction">
							复制商品
						</view>
						<view @click="deleteAll">
							批量清除
						</view>
					</view>

				</view>
				<view v-if="showCopy">
					<view class="mask"></view>
					<view class="inp_box flex mask_info">
						<view class="left">

							<view class="flex flex_center">
								<view class="time" @click="dateVisible2=true">
									<input type="text" v-model="historyDate" placeholder="历史日期" disabled="true" />
								</view>
								<view class="btn" @click="historySearch">
									<text class="iconfont iconseach-"></text>
								</view>
							</view>
							<text class="iconfont iconcha" @click="closeCopy"></text>
						</view>
						<view>
							<view class="all_copy">
								<view v-for="(item,index) in historyList" class="copy_quiry">
									<view class="flex_align_center flex">
										<text class="iconfont iconxuanze" style="color: #C9C9C9;" v-if="item.status==false" @click="checkedIndex(index)"></text>
										<text class="iconfont iconxuanze1" style="color: #03A98D;" v-else @click="checkedIndex(index)"></text>
										<text class="weight">{{item.item_title}}{{item.attr_title?'('+item.attr_title+')':''}}</text>
									</view>
									<text style="color:#03A98E;" @click="copySign(item,index)">选择</text>
								</view>
							</view>
							<view class="batch_selects" @click="copyAll">
								批量选择
							</view>
						</view>
					</view>

				</view>
			</view>
			<!-- 发起询价 -->
			<!-- 	<w-picker :visible.sync="dateVisible1" mode="date" startYear="2017" endYear="2029" :value="time" :current="false"
			 fields="day" @confirm="onConfirm($event,'date1')" :disabled-after="false" ref="date1"></w-picker> -->
			<e-picker mode="date" :value="time" fields="day" @confirm="onConfirm($event, 'date')" :startYear="2020" endYear="2029"
			 :disabled-before="true" ref="date">
				采购日期
			</e-picker>
			<!-- 历史记录 -->
			<w-picker :visible.sync="showWare" mode="selector" default-type="name" :default-props="wareListProps" :options="wareList"
			 @confirm="confirmWare($event,'selector')" @cancel="showWare=false" ref="selector"></w-picker>
			<!-- 发起询价 -->
			<w-picker :visible.sync="firstWare" mode="selector" default-type="name" :default-props="wareListtwoProps" :options="wareListtwo"
			 @confirm="confirmWaretwo($event,'selector')" @cancel="showWaretwo=false" ref="selectortwo"></w-picker>
			<!-- 复制商品 -->
			<w-picker :visible.sync="dateVisible2" mode="date" startYear="2017" endYear="2029" :value="time2" fields="day"
			 @confirm="confirmHistory($event,'date1')" :disabled-after="true" ref="date1"></w-picker>

			<tabar :tabarIndex="tabNum"></tabar>
		</view>
		<view class="query_price" v-show="searchKey==1">
			<my-apphead></my-apphead>
			<view class="bar_title">
				<view @click="backPage">
					<uni-icons type="arrowleft" size="30"></uni-icons>
				</view>
				<view class="search_style">
					<uni-icons type="search" size="20"></uni-icons>
					<input type="text" v-model="search" :focus="searchKey==1" placeholder="请输入商品" @input="getWord" />
				</view>
			</view>
			<view style="height:5px;background: #f6f6f6;"></view>
			<view class="search_content">
				<view v-for="(item,index) in keyList" @click="deterMine(item)">{{item.title}}</view>
			</view>
		</view>
		<view class="query_price" v-show="searchKey==2">
			<my-apphead></my-apphead>
			<view class="bar_title">
				<view @click="searchKey=0">
					<uni-icons type="arrowleft" size="30"></uni-icons>
				</view>
				<view class="search_style">
					<uni-icons type="search" size="20"></uni-icons>
					<input type="text" v-model="searchtwo" :focus="searchKey==2" placeholder="请输入商品" @input="getWordtwo" />
				</view>
			</view>
			<view style="height:5px;background: #f6f6f6;"></view>
			<view class="search_content">
				<view v-for="(item,index) in keyListtwo" @click="deterMinetwo(item)">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import un from '../../../static/js/uni.js';
	import wPicker from "../../../components/w-picker/w-picker.vue";
	import tabar from "../../../components/tabbar/caigou.vue"
	import ePicker from "../../../components/w-picker2/w-picker.vue"
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
			ePicker
		},
		data() {
			return {
				navBar: navBar,
				bitmap: false,
				bitmaptwo: true,
				showWare: false,
				firstWare: false,
				showCopy: false,
				searchKey: 0,
				wareName: '',
				isActive: 1,
				tabNum: 3,
				time: '',
				time2: '',
				dateVisible1: false,
				dateVisible2: false,
				list: [{
						tab: "历史记录",
						id: 1
					},
					{
						tab: "发起询价",
						id: 2
					}
				],
				wareList: [],
				wareListtwo: [],
				wareAttr: '请选择',

				wareListProps: {
					label: 'value',
					value: 'item_id'
				},
				wareListtwoProps: {
					label: 'attr_title',
					value: 'item_id'
				},
				search: '',
				searchtwo: '',
				keyList: [],
				keyListtwo: [],
				attr_id: '',
				item_id: '',
				attr_idtwo: '',
				item_idtwo: '',
				purchases: '',

				enquiryList: [],
				showFind: false,
				wareAttrtwo: '请选择',
				goodname: '',
				historyDate: '',
				historyList: []
			}
		},
		methods: {
			closeCopy(){
				this.showCopy=false;
				this.commodityBuyerList()},
			// 复制单个
			copySign(item,index){
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					date:this.time,
					list_ids:String(item.id)
				}, obj);
				rs.postRequests("copyItem", data, (res) => {
					if (res.data.code == 200) {
						rs.Toast('复制成功');
						this.historyList.splice(index,1);
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			// 复制多个
			copyAll(item){
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				let {historyList}=this;
				let countCheck=0;
				let list_id=[];
				for(let i of historyList){
					if(i.status){
						countCheck++;
						list_id.push(i.id)
					}
				}
				if(countCheck==0){
					rs.Toast('未选择复制的商品');
					return;}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					date:this.time,
					list_ids:list_id.join(',')
				}, obj);
				rs.postRequests("copyItem", data, (res) => {
					if (res.data.code == 200) {
						rs.Toast('复制成功');
						this.historySearch();
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			showPurchase() {
				this.$refs.date.show();
			},
			onConfirm(res, type) {
				this.time = res.value
			},
			tabs(item, index) {
				this.isActive = index;
			},
			queryPrice() {
				this.searchKey = 1;
			},
			backPage() {
				this.searchKey = 0;
			},
			getWord(e) {
				this.search = e.detail.value;
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
			getWordtwo(e) {
				this.searchtwo = e.detail.value;
				if (e.detail.value.length) {
					let timeStamp = rs.timeStamp();
					var obj = {
						appid: appid,
						timeStamp: timeStamp,

					}
					var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
					let data = Object.assign({
						sign: sign,
						keyword: this.searchtwo
					}, obj);
					rs.getRequests("searchItemCommodity", data, (res) => {
						if (res.data.code == 200) {
							this.keyListtwo = res.data.data;
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
				this.searchKey = 0;
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
			deterMinetwo(item) {
				this.goodname = item.title;
				this.searchKey = 0;

				if (item.attr.length == 0) {
					item.attr[0] = {
						id: 0,
						item_id: item.id,
						attr_title: '/'
					}
				}

				this.wareListtwo = item.attr;
				this.wareAttrtwo = item.attr[0].attr_title;
				this.attr_idtwo = item.attr[0].id;
				this.item_idtwo = item.attr[0].item_id;
			},
			confirmWare(e) {
				
				this.wareAttr = e.result;
				this.attr_id = e.obj.id;
				this.item_id = e.obj.item_id;
			},
			confirmWaretwo(e) {
				
				this.wareAttrtwo = e.result;
				this.attr_idtwo = e.obj.id;
				this.item_idtwo = e.obj.item_id;
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
							rs.Toast('未查询到相关商品');
							this.bitmap = false;
						}
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			//询价列表
			commodityBuyerList() {
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					date: this.time
				}, obj);
				rs.getRequests("commodityBuyerList", data, (res) => {
					if (res.data.code == 200) {
						// this.enquiryList=res.data.data;
						this.enquiryList = [];
						for (let i of res.data.data) {
							i.look_more = false;
							this.enquiryList.push(i)
						}

						if (res.data.data.length == 0) {
							this.bitmaptwo = true;
						} else {
							this.bitmaptwo = false;
						}
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			lookMore(index) {
				if (this.enquiryList[index].look_more) {
					this.enquiryList[index].look_more = false;
				} else {
					this.enquiryList[index].look_more = true;
				}
			},
			changeIcon() {
				this.showFind = !this.showFind;
			},
			// 添加询价
			submitAdd() {
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					date: this.time,
					item_id: this.item_idtwo,
					attr_id: this.attr_idtwo
				}, obj);
				rs.postRequests("addCommodity", data, (res) => {
					if (res.data.code == 200) {
						rs.Toast('添加成功');
						this.commodityBuyerList();
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			// 单个删除
			deleteSign(id, index) {
				let that = this;
				uni.showModal({
					title: '',
					content: '是否删除该询价？',
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
								date: that.time,
								ids: id
							}, obj);
							rs.getRequests("removeCommodity", data, (res) => {
								if (res.data.code == 200) {
									rs.Toast('删除成功');
									that.enquiryList.splice(index, 1);
									if (that.enquiryList.length == 0) {
										that.bitmaptwo = true;
									}

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
			// 批量删除
			deleteAll() {
				let that = this;
				uni.showModal({
					title: '',
					content: '将清空列表中供应商未报价的商品,确认吗？',
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
							rs.getRequests("removeCommodity", data, (res) => {
								if (res.data.code == 200) {
									rs.Toast('删除成功');
									that.enquiryList = [];
									that.bitmaptwo = true;
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
			//复制商品操作
			confirmHistory(e) {
				// console.log(e);
				this.historyDate = e.value;
			},
			historySearch() {
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					date: this.time,
					history_date: this.historyDate
				}, obj);
				rs.getRequests("historyList", data, (res) => {
					if (res.data.code == 200) {
						this.historyList = [];
						for (let i of res.data.data) {
							i.status = false;
						}
						if (res.data.data.length == 0) {
							rs.Toast('无商品信息')
						}
						this.historyList.push(...res.data.data);
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			checkedIndex(index) {
				this.historyList[index].status = !this.historyList[index].status;
			},
			copyAction() {
				this.showCopy = true;
			}
		},
		onShow() {
			// 询价列表
			this.commodityBuyerList();
		},
		onLoad(option) {
			this.time = un.formatDate(2);
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
		padding: 15rpx 0;
		position: fixed;width: 100%;
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
.purchaseNote  .enquiry_item{margin-top:100rpx;}
	.purchaseNote .inp_box .time .time_inp {
		width: 550rpx;
	}

	.purchaseNote .inp_box .btn {
		background-color: #03A98E;
		padding: 16rpx 30rpx;
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
		padding-top: 78rpx;
		padding-bottom: 110rpx;
	}

	.purchaseNote .list_box .record_item {
		padding: 120rpx 20rpx 0 20rpx;
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
		padding: 10rpx 20rpx;
		background: #FFFFFF;
		border-bottom: 1px solid #F0F0F0;
		/* padding-bottom: 20rpx; */
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
		margin: 0 0 15rpx 45rpx;
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

	.caigou_index_height {
		background: white;
		height: 100vh;
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
	}

	.search_content>view {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		color: #343434;
	}

	.bitmap_style {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.bitmap_style image {
		width: 44%;
	}

	.bitmap_style text {
		margin-left: 5%;
		color: gray;
	}

	.enquiry_item .show_bitmap {
		padding-top: 20%;
	}

	.enquiry_bottom .find_good {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.enquiry_bottom .find_good input {
		border: 1px solid #d9d9d9 !important;
		margin-right: 20rpx;
		padding-left: 10rpx;
		height: 60rpx;
	}

	.purchaseNote .mask_info {
		padding: 12px;
		position: fixed;
		width: 75%;
		top: 80rpx;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 999;
		border-radius: 4rpx;
		flex-direction: column;
	}

	.purchaseNote .mask_info .left {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 80rpx;
	}

	.purchaseNote .mask_info .left .iconcha {
		font-size: 50rpx;
		color: #666;
	}

	.purchaseNote .mask_info .left .btn {
		height: 80rpx;
		padding: 0 24rpx;
		line-height: 80rpx;
	}

	.purchaseNote .mask_info .left .time {
		height: 80rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
	}

	.purchaseNote .mask_info .left .time input {
		width: 350rpx;
	}

	.purchaseNote .mask_info .copy_quiry {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.purchaseNote .mask_info .copy_quiry .iconfont {
		font-size: 40rpx;
		height: 21px;
		margin-right: 20rpx;
	}

	.purchaseNote .mask_info .all_copy {
		height: 57vh;
		overflow-y: scroll;
	}

	.purchaseNote .mask_info .batch_selects {
		background: #03A98E;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
	}
</style>
