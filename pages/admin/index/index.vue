<template>
	<view class="admin_index">
		<my-apphead></my-apphead>
		<view style="height: 20rpx;"></view>
		<view class="num_info">
			<view><text style="color:#04AA8E;">{{orderCount.orderNum}}</text><text>订单数</text></view>
			<view><text style="color:#E73214;">{{orderCount.totalPrice}}</text><text>销售额总数</text></view>
			<view><text style="color:#E17E13;">{{orderCount.returnPrice}}</text><text>退货总额</text></view>
			<view><text style="color:#C2C2C2;">{{orderCount.memberNum}}</text><text>新增用户</text></view>

		</view>
		<view class="ring_info">
			<view class="select_date">
				<view>
					<text>{{dateRange}}</text>
					<text class="iconicon-test iconfont" @click="showDate=!showDate"></text></view>
				<view class="all_date" v-if="showDate">
					<view v-for='(item,index) in dataList' class="sign_date" @click="selectDate(index)">{{item.title}}</view>
				</view>
			</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
			</view>
		</view>

		<view class="line">
			<view>每日销售额监测</view>
			<!-- #ifndef MP-WEIXIN -->
			<view :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
			<!-- #endif -->
                   <!-- #ifdef MP-WEIXIN -->
                   <uni-ec-canvas class="uni-ec-canvas" id="line-chart" ref="canvas" canvas-id="lazy-load-chart" :ec="ec"></uni-ec-canvas>
                   <!-- #endif -->
			

		</view>
		<tabBar tabarIndex=0></tabBar>
	</view>

</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import uCharts from '../../../js_sdk/u-charts/u-charts/u-charts.min.js';
	import tabBar from '../../../components/tabbar/admin.vue'
	import uniEcCanvas from '../../../js_sdk/yanhao-echarts-for-wx/uni-ec-canvas/uni-ec-canvas.vue'

	var _self;
	var canvaRing = null;
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			tabBar,
			uniEcCanvas
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				dateRange: '一周',
				id: 1,
				margin: 0,
				showDate: false,
				dataList: [{
					title: '一周'
				}, {
					title: '半个月'
				}, {
					title: '一个月'
				}],
				orderCount: {},
				graphInfo: {},
				ec: {
					option: {
						color: ['#03A993'],
						grid: {
							left: '0.5%',
							right: '10%',
							top: '40',

							containLabel: true
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'line',
							},
							formatter:'{b0}\n金额：{c0}千元'
						},
						xAxis: {
							type: 'category',
							data: [],
							boundaryGap: false,
							axisTick: {
								show: false
							},
							axisLine: {
								show: false,
							}

						},
						yAxis: {
							type: 'value',
							name: '千元',
							nameTextStyle: {
								align: 'right',
								padding: [0, 5, 0, 0]
							},
							axisTick: {
								show: false
							},
							axisLine: {
								show: false,
							}
						},
						series: [{
							name: '数据',
							data: [],
							type: 'line',
							smooth: true,
							label: {
								normal: {
									// show: true,
									position: 'right',
									textStyle: {
										color: 'black'
									}
								}
							},
							areaStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#EEFFFC' // 0% 处的颜色
									}, {
										offset: 1,
										color: '#FFFFFF' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								}
							}
						}]
					}
				},
				option: {
					color: ['#03A993'],
					grid: {
						left: '0.5%',
						right: '10%',
						top: '40',

						containLabel: true
					},
					tooltip: {
						trigger: 'axis',
						confine:true,
						axisPointer: {
							type: 'line',
						},formatter:'{b0}\n金额：{c0}千元'
					},
					xAxis: {
						type: 'category',
						data: [],
						boundaryGap: false,
						axisTick: {
							show: false
						},
						axisLine: {
							show: false,
						}

					},
					yAxis: {
						type: 'value',
						name: '千元',

						nameTextStyle: {
							align: 'right',
							padding: [0, 30, 0, 0]
						},
						axisTick: {
							show: false
						},
						axisLine: {
							show: false,
						}
					},
					series: [{
						name: '数据',
						data: [],
						type: 'line',
						smooth: true,
						label: {
							normal: {
								// show: true,
								position: 'right',
								textStyle: {
									color: 'black'
								}
							}
						},
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: '#EEFFFC' // 0% 处的颜色
								}, {
									offset: 1,
									color: '#FFFFFF' // 100% 处的颜色
								}],
								global: false // 缺省为 false
							}
						}
					}]
				}

			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.margin = this.cWidth / 10;
			this.cHeight = uni.upx2px(470);

		},
		methods: {

			selectDate(index) {
				this.id = index + 1;
				this.showDate = false;
				this.dateRange = this.dataList[index].title;
				this.adminIndexCount();
			},
			getServerData() {
				//更换键名
				function changeTreeDate(date, newKey, oldKey) {
					date.forEach(item => {
						if (item[newKey] && item[newKey].length > 0) changeTreeDate(item[newKey], newKey, oldKey);
						else if (item[oldKey]) {
							item[newKey] = item[oldKey];
							delete item[oldKey];
							if (item[newKey].length) changeTreeDate(item[newKey], newKey, oldKey);
						}
					})
				}
				changeTreeDate(this.graphInfo.cateList, 'data', 'value');
				let series = this.graphInfo.cateList;
				_self.showRing("canvasRing", series);
				this.option.xAxis.data = this.graphInfo.dayDate;
				this.option.series[0].data = this.graphInfo.dayPrice;
				this.ec.option.xAxis.data = this.graphInfo.dayDate;
				this.ec.option.series[0].data = this.graphInfo.dayPrice;
			},
			showRing(canvasId, chartData) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					padding: [_self.margin, _self.margin, _self.margin, _self.margin],
					legend: {
						position: 'right',
						lineHeight: 20,
						float: 'top'
					},
					colors: ['#86D6CC', '#F3E5AD', '#F3C2AD', '#86D6A8'],
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 18 * _self.pixelRatio,
							// labelWidth: 15
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false
				});
			},
			touchRing(e) {
				canvaRing.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			adminIndex() {
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}

				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,

				}, obj);
				rs.getRequests("adminIndex", data, (res) => {
					if (res.data.code == 200) {
						this.orderCount = res.data.data;
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			adminIndexCount() {
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}

				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					timeType: this.id
				}, obj);
				rs.getRequests("adminIndexCount", data, (res) => {
					if (res.data.code == 200) {

						this.graphInfo = res.data.data;
						this.getServerData();
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
		},
		onShow() {
			this.adminIndex();
			this.adminIndexCount();
		}
	}
</script>

<script module="echarts" lang="renderjs">
	// #ifndef MP-WEIXIN
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/js/echarts.min.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
	// #endif
</script>






<style>
	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}



	.qiun-charts {
		width: 100%;
		height: 470rpx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 100%;
		height: 470rpx;

		background-color: #FFFFFF;
	}

	.admin_index .num_info {
		display: flex;
		background: white;
		padding: 40rpx;
		margin: 0 20rpx;
		justify-content: space-between;
	}

	.admin_index .num_info>view {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.admin_index .select_date {
		position: absolute;
		margin: 33rpx 20rpx 20rpx;
		z-index: 99;
	}

	.admin_index .num_info>view text:last-child {
		margin-top: 20rpx;
	}

	.admin_index .ring_info {
		margin: 10rpx 20rpx;
	}

	.admin_index .all_date {
		border: 1px #d6d6d6 solid;
		border-radius: 2rpx;
		margin-top: 19rpx;
	}

	.admin_index .all_date .sign_date {
		padding: 4rpx 8rpx;
	}

	.admin_index .all_date .sign_date:nth-last-child(n+2) {
		border-bottom: 1px #d6d6d6 solid;
	}

	.line {
		background: white;
		margin: 0 20rpx;
		padding: 20rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.echarts {
		width: 100%;
		height: 550rpx;
	}

	.uni-ec-canvas {
		width: 100%;
		height: 450rpx;
		display: block;
	}
</style>
