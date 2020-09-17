<template>
	<view class="add_user">
		<uni-nav-bar left-icon="back" title="保存用户信息" :status-bar="navBar"  color="#1A1A1A" @clickLeft="goPage"></uni-nav-bar>
<view style="height: 49px;"></view>
		<view class="file_info">
			<form @submit="save">
				<view class="user_info">
					<view>
						<view>单位名称</view>
						<view>
							<input type="text" v-model="salemanInfo.nickname" placeholder="请输入单位名称" placeholder-class="place_style" name="nickname">
							<text></text>
						</view>
					</view>
					<view>
						<view>用户手机</view>
						<view>
							<input type="number" v-model="salemanInfo.mobile" placeholder="请输入手机号码" placeholder-class="place_style" name="mobile">
							<text></text>
						</view>
					</view>
					<view>
						<view>用户密码</view>
						<view>
							<input password="true" v-model="salemanInfo.password" placeholder="请输入6位(含)以上" placeholder-class="place_style"
							 name="password">
							<text></text>
						</view>
					</view>
					<view>
						<view>用户分组</view>
						<view>
							<input type="text" v-model="salemanInfo.group_title" placeholder="请选择分组" disabled placeholder-class="place_style"
							 name="group">
							<text class="iconfont iconyou" @click="showGroup=true"></text>
						</view>
					</view>
					<view>
						<view>用户区域</view>
						<view>
							<input type="text" v-model="salemanInfo.region_title" placeholder="请选择区域" disabled placeholder-class="place_style"
							 name="area">
							<text class="iconfont iconyou" @click="showArea=true"></text>
						</view>
					</view>
					<view>
						<view>用户编码</view>
						<view>
							<input type="text" v-model="salemanInfo.code" placeholder="输入用户编码" placeholder-class="place_style" name="code">
							<text></text>
						</view>
					</view>
					<view>
						<view>信用金</view>
						<view>
							<input type="number" v-model="salemanInfo.credit" placeholder="请输入信用金(元)" placeholder-class="place_style" name="credit">
							<text></text>
						</view>
					</view>
					<view>
						<view>审核状态</view>
						<view>
							<input type="text">
							<evan-switch v-model="status"></evan-switch>
						</view>
					</view>
					<view>
						<view>查看价格</view>
						<view>
							<input type="text">
							<evan-switch v-model="is_look"></evan-switch>
						</view>
					</view>
					<view>
						<view>收货人</view>
						<view>
							<input type="text" v-model="salemanInfo.contact" placeholder="请输入收货人姓名" placeholder-class="place_style" name="contact">
							<text></text>
						</view>
					</view>
					<view>
						<view>收货手机</view>
						<view>
							<input type="number" v-model="salemanInfo.phone" placeholder="请输入收货人手机号" placeholder-class="place_style" name="takePhone">
							<text></text>
						</view>
					</view>
					<view>
						<view>详细地址</view>
						<view>
							<input type="text" v-model="salemanInfo.address" style="width: 100%;" placeholder="请输入详情地址信息" placeholder-class="place_style"
							 name="address">
							<text></text>
						</view>
					</view>

				</view>
				<view class="save">
					<button form-type="submit" class="save">保存</button>
				</view>
			</form>

		</view>
		<w-picker :visible.sync="showGroup" mode="selector" value="女" default-type="name" :default-props="groupProps"
		 :options="groupList" @confirm="confirmGroup($event,'selector')"  ref="selector"></w-picker>
		<w-picker :visible.sync="showArea" mode="selector" default-type="name" :default-props="areaProps" :options="areaList"
		 @confirm="confirmArea($event,'selector')"  ref="selector"></w-picker>
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
				id: '',
				memberInfo: {},
				salemanInfo: {},
				status: false,
				is_look: false,
				group_id: '',
				showGroup: false,
				groupList: [],
				groupProps: {
					label: 'value',
					value: 'id'
				},
				area_id: '',
				showArea: false,
				areaList: [],
				areaProps: {
					label: 'value',
					value: 'id'
				},
			}
		},
		methods: {
			confirmArea(e) {
				this.area_id = e.value;
				this.salemanInfo.region_title = e.result;
			},
			confirmGroup(e) {
				this.group_id = e.value;
				this.salemanInfo.group_title = e.result;
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
			save(e) {
				// console.log(e);
				let {
					address,
					code,
					contact,
					credit,
					mobile,
					nickname,
					password,
					takePhone
				} = e.detail.value;
				let phoneReg = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
				if (!nickname) {
					rs.Toast('单位名称不能为空');
					return;
				}
				if (!mobile) {
					rs.Toast('用户手机不能为空');
					return;
				}
				if (!phoneReg.test(mobile)) {
					rs.Toast('请输入正确的用户手机');
					return;
				}
				if (password.length > 0 && password.length < 5) {
					rs.Toast('密码必须六位(含)以上');
					return;
				}
				if (!this.group_id) {
					rs.Toast('用户分组不能为空');
					return;
				}
				if (!this.area_id) {
					rs.Toast('用户区域不能为空');
					return;
				}
				if (!contact) {
					rs.Toast('收货人不能为空');
					return;
				}
				if (!takePhone) {
					rs.Toast('收货手机不能为空');
					return;
				}
				if (!phoneReg.test(takePhone)) {
					rs.Toast('请输入正确的收货手机');
					return;
				}
				if (!address) {
					rs.Toast('详细地址不能为空');
					return;
				}
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					mobile: mobile
				}
				let newStatu, newis_look;
				if (this.status == false) {
					newStatu = 0
				} else {
					newStatu = 1;
				}
				if (this.is_look == false) {
					newis_look = 0
				} else {
					newis_look = 1;
				}
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					id: this.id,
					sign: sign,
					nickname: nickname,
					mobile: mobile,
					group_id: this.group_id,
					region_id: this.area_id,
					code: code,
					contact: contact,
					phone: takePhone,
					address: address,
					is_look: newis_look,
					status: newStatu,
					credit: credit
				}, obj)
				if (password) {
					data.password = password;
				}
				rs.postRequests("salesmanMemberUpdate", data, (res) => {
					let {
						code
					} = res.data;
					if (code == 200) {
						rs.Toast('修改成功');
						setTimeout(() => {
							uni.navigateTo({
								url: './index'
							})
						}, 1000)

					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			memberParam() {
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign
				}, obj)
				rs.getRequests("memberParams", data, (res) => {
					this.groupList = res.data.data.group;
					this.areaList = res.data.data.region;
				})
			},
			salemanMember() {
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					id: this.id
				}
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign
				}, obj)
				rs.getRequests("salesmanMember", data, (res) => {
					let {
						data
					} = res;
					if (data.code == 200) {
						this.salemanInfo = data.data;
						this.area_id = data.data.region_id;
						this.group_id = data.data.group_id;
						if (data.data.status == 0) {
							this.status = false;
						} else {
							this.status = true;
						}
						if (data.data.is_look == 0) {
							this.is_look = false;
						} else {
							this.is_look = true;
						}
					} else {
						rs.Toast(data.msg);
					}
				})
			}
		},
		onShow() {
			app.isReload = false;
		},
		onLoad(option) {

			this.id = option.id;
			this.memberParam();
			this.salemanMember();
		}


	}
</script>

<style>
	.add_user {
		background: white;
		height: 100vh;
	}

	.add_user .user_info input {
		font-size: 26rpx;
	}

	.add_user .user_info {
		background: white;
		padding: 0 20rpx;
	}

	.add_user .user_info>view {
		border-bottom: 1px solid #F0F0F0;
		display: flex;
		align-items: center;
		height: 80rpx;
		font-size: 26rpx;
	}

	.add_user .user_info>view view:first-child {
		width: 150rpx;
	}

	.add_user .user_info>view view:last-child {
		width: 95%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.add_user .place_style {
		font-size: 26rpx;
	}

	.add_user .file_info {
		border-top: 10rpx solid #F5f5f5;
	}

	.add_user .save {
		width: 539rpx;
		height: 68rpx;
		background: #04AA8E;
		border-radius: 34rpx;
		color: white;
		line-height: 68rpx;
		text-align: center;
		margin: 55rpx auto 0;
		font-size: 28rpx;
	}

	.add_user .iconfont {
		font-size: 26rpx;
		color: #c2c2c2;
	}
</style>
