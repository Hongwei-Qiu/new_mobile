<template>
	<view class="more_record">
		<view style="position: fixed;background: white;padding-bottom:14rpx;">
			<uni-nav-bar left-icon="back"  :status-bar="navBar" title="操作记录" @clickLeft="goPage"></uni-nav-bar>
<view style="height: 49px;"></view>
			<view class="flex select_role">
				<view class="flex" style="height:100%;align-items: center;"  @click="showRole=true">
					<input type="text" v-model="roleName" placeholder="角色" placeholder-class="place_font" disabled />
					<text class="iconqingniaoxitongtubiao_xia iconfont" style="margin-right:20rpx;"></text>
					<input type="text" v-model="time" placeholder="操作时间" placeholder-class="place_font" disabled @click="dateVisible2=true" />
				</view>
				<view class="search_icon" @click="adminRowList">
					<text class="iconfont iconseach-"></text>
				</view>
			</view>
		</view>
		<view>
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar">
			
			</view>
			<!-- #endif -->
		
			<view style="height:calc(44px + 96rpx)"></view>
		</view>
		<view class="all_info" v-if="bitmap">
			<view v-for="(item,index) in rowList" class="sign_info">
				<view class="date flex flex_between">
					<text>角色：{{item.role}} </text>
					<text> {{item.date}}</text>
				</view>
				<view class="flex flex_between money_height">
					<view>
						姓名：{{item.role_name}}
					</view>
					<view>

					</view>
				</view>
				<view class="flex flex_between money_height">
					<view>
						内容：{{item.remark}}
					</view>
					<view>

					</view>
				</view>
			</view>
		    <my-loading :loading="loading"></my-loading>
		</view>
		<view v-else>
			<my-bitmap></my-bitmap>
		</view>
		<w-picker :visible.sync="showRole" mode="selector" default-type="name" :default-props="roleListProps" :options="roleList"
		 @confirm="confirmRole($event,'selector')" ref="selectortwo" @cancel="showRole=false"></w-picker>
		<w-picker :visible.sync="dateVisible2" mode="date" startYear="2017" endYear="2029" :value="time2" fields="day"
		 @confirm="confirmTime($event,'date1')" ref="date1" @cancel="dateVisible2=false"></w-picker>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import un from "../../../static/js/uni.js"
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
				time: '',
				time2: '',
				navBar: navBar,
				dateVisible2: false,
				showRole: false,
				roleId: '',
				roleName: '',
				page: 1,
				roleList: [],
				rowList: [],
				roleListProps: {
					label: 'value',
					value: 'id'
				},
				loading:true,
				bitmap:true
			}
		},
		methods: {
			confirmTime(e) {
				this.time = e.value;
			},
			confirmRole(e) {
				console.log(e)
				this.roleId = e.value;
				this.roleName = e.result;
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
			roleType() {
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}

				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,

				}, obj);
				rs.getRequests("roleType", data, (res) => {
					if (res.data.code == 200) {
						let allRole = [{
							id: '',
							value: "所有"
						}];
						this.roleList = allRole.concat(res.data.data);
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			adminRowList() {
				this.page = 1;
                this.loading=true;
				this.rowList = [];
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}

				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					type: this.roleId,
					created_at: this.time
				}, obj);
				rs.getRequests("adminRowList", data, (res) => {
					if (res.data.code == 200) {
						this.rowList = res.data.data;
						if(res.data.data.length<10){
							this.loading=false;
						}
						if(res.data.data.length==0){
							this.bitmap=false;
						}else{
							this.bitmap=true;
						}
					} else {
						rs.Toast(res.data.msg)
					}
				})
			}
		},
		onShow() {
			this.time2 = un.formatDate();
			this.roleType();
			this.adminRowList();
		},
		onReachBottom() {
			this.loading=true;
			let timeStamp = rs.timeStamp();
			let obj = {
				appid: appid,
				timeStamp: timeStamp,
			}

			var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
			let data = Object.assign({
				sign: sign,
				page: this.page + 1,
				type: this.roleId,
				created_at: this.time
			}, obj);
			rs.getRequests("adminRowList", data, (res) => {
				if (res.data.code == 200) {
					this.rowList.push(...res.data.data);
					this.page++;
					if(res.data.data.length==0){
						this.loading=false;
					}
				} else {
					rs.Toast(res.data.msg)
				}
			})

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
		height: 68rpx;
		line-height: 68rpx;
		font-size: 30rpx;
	}

	.more_record .sign_info .date text:last-child {
		font-size: 26rpx;
	}

	.more_record .sign_info:nth-last-child(n+2) {
		border-bottom: 8rpx solid #f5f5f5;
	}

	.more_record .money_height {
		margin: 15rpx 0rpx;
		color: #666;
		font-size: 26rpx;
	}

	.select_role {
		height: 64rpx;
		align-items: center;
		font-size: 26rpx;
		margin: 0 20rpx;
		background: #F5F5F5;
		border-radius: 40rpx;
	}

	.select_role .search_icon {
		height: 100%;
		border-bottom-right-radius: 40rpx;
		border-top-right-radius: 40rpx;
		line-height: 64rpx;
		width: 78rpx;
		text-align: center;
		color: white;
		background: #04AA8E;
	}

	.place_font {
		font-size: 26rpx;
	}

	.select_role input {
		padding-left: 20rpx;
		font-size: 26rpx;
	}

	.select_role input:last-child {
		border-left: 1px solid #d6d6d6 !important;
	}
</style>
