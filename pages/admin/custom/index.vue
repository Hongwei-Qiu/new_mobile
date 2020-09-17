<template>
	<view class="admin_index">

		<my-apphead></my-apphead>
		<ms-tabs :list="dateList" v-model="active" itemColor="#04AA8E" lineColor="#04AA8E"></ms-tabs>

		<view class="self_echart" :class="{hideEchart:bitmap==false}">
			<view class="more_info"><text @click="detailPage">明细</text></view>
			<!-- #ifndef MP-WEIXIN -->
			<view :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN -->
			<uni-ec-canvas class="uni-ec-canvas" id="line-chart" ref="canvas" canvas-id="lazy-load-chart" :ec="ec"></uni-ec-canvas>
			<!-- #endif -->
		</view>

		<view class="flex flex_around custom_state" :class="{hideEchart:bitmap==false}">
			<view class="">
				<view style="color:#16AD94;" class="text_center"> {{graphInfo.member_num}}</view>
				<view>总用户 </view>
			</view>
			<view class="">
				<view style="color:#E8432B;" class="text_center"> {{graphInfo.hy_num}}</view>
				<view> 活跃量</view>
			</view>
			<view class="">
				<view style="color:#E28221;" class="text_center"> {{graphInfo.cz_num}}</view>
				<view>沉淀量 </view>
			</view>
			<view class="">
				<view style="color:#C5C5C5;" class="text_center">{{graphInfo.wsh_num}}</view>
				<view> 未审核</view>
			</view>
		</view>


		<my-bitmap :class="{hideEchart:bitmap}"></my-bitmap>


		<tabBar tabarIndex=2></tabBar>
	</view>

</template>

<script>
	import md5 from '../../../static/js/md5.js';
	import rs from '../../../static/js/request.js';
	import msTabs from "@/components/ms-tabs/ms-tabs.vue"
	import tabBar from '../../../components/tabbar/admin.vue'
	import uniEcCanvas from '../../../js_sdk/yanhao-echarts-for-wx/uni-ec-canvas/uni-ec-canvas.vue'
	import * as echarts from '../../../js_sdk/yanhao-echarts-for-wx/uni-ec-canvas/echarts'
	let chart = null;
	const app = getApp().globalData;
	const {
		navBar,
		appid,
		appsecret,
	} = app;
	export default {
		components: {
			tabBar,
			msTabs,
			uniEcCanvas
		},
		watch: {
			active(val) {
				this.timeType = val + 1;
				this.adminList();
			}
		},
		data() {
			return {
				active: 0,
				bitmap: true,
				timeType: 1,
				graphInfo: {},
				dateList: [{
						name: '今天',
						id: 1
					}, {
						name: '本月',
						id: 2
					},
					{
						name: '上月',
						id: 3
					}
				],
				ec: {
					option: {
						color: function(params) {
							console.log(123)
							let color = ['#FF7B7B', '#FFCF85', '#58DBC6', '#58C1DB', '#CA9FFF', '#FDBDA9', '#FFA0D6', '#E4FA97',
								'#E4FA97'
							];
							return color[params.dataIndex]

						},
						tooltip: {
							show: true,
							// formatter: '{b0}: {c0}<br />{b1}: {c1}',
							trigger: 'axis',
							axisPointer: {
								type: 'shadow'
							}
						},
						grid: {
							left: '0.5%',
							right: '6%',
							top: '3.5%',
							bottom: '10%',
							containLabel: true
						},
						xAxis: {
							offset: 5,
							axisLabel: {
								formatter: '{value}',
								textStyle: {
									color: '#757575'
								}
							},
							type: 'value',
							boundaryGap: false,
							axisTick: {
								show: false
							},
							axisLine: {
								show: false,
							}
						},
						yAxis: {
							type: 'category',
							inverse: true,
							data: ['NO.1', 'NO.2', 'NO.3', 'NO.4', 'NO.5', 'NO.6', 'NO.7', 'NO.8', 'NO.9'],
							boundaryGap: false,
							axisTick: {
								show: false
							},
							axisLine: {
								show: false,
							},
							axisLabel: {
								formatter: '{value}',
								textStyle: {
									color: function(params) {
										let color = ['#FF7B7B', '#FFCF85', '#58DBC6', '#757575', '#757575', '#757575', '#757575', '#757575',
											'#757575'
										];

										return color[params.substring(3) - 1]
									},
								}
							}

						},
						series: [{
							name: '金额',
							type: 'bar',
							barWidth: 20,
							data: [],
							label: {
								normal: {
									show: true,
									position: [10, 5],
									"formatter": '{b}',
									textStyle: {
										color: '#666' //color of value
									}
								}
							},
							itemStyle: {
								normal: {
									color: function(params) {
										let color = ['#FF7B7B', '#FFCF85', '#58DBC6', '#58C1DB', '#CA9FFF', '#FDBDA9', '#FFA0D6', '#E4FA97',
											'#E4FA97'
										];
										return color[params.dataIndex]

									},

								}
							}
						}]
					}
				},
				option: {
					color: ['#FF7B7B', '#FFCF85', '#58DBC6', '#757575', '#757575', '#757575', '#757575', '#757575', '#757575'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						left: '0.5%',
						right: '6%',
						top: '3.5%',
						bottom: '10%',
						containLabel: true
					},
					xAxis: {
						offset: 5,
						axisLabel: {
							formatter: '{value}',
							textStyle: {
								color: '#757575'
							}
						},
						type: 'value',
						boundaryGap: false,
						axisTick: {
							show: false
						},
						axisLine: {
							show: false,
						}
					},
					yAxis: {
						type: 'category',
						inverse: true,
						data: ['NO.1', 'NO.2', 'NO.3', 'NO.4', 'NO.5', 'NO.6', 'NO.7', 'NO.8', 'NO.9'],
						boundaryGap: false,
						axisTick: {
							show: false
						},
						axisLine: {
							show: false,
						},
						axisLabel: {
							formatter: '{value}',
							textStyle: {
								color: function(params) {
									let color = ['#FF7B7B', '#FFCF85', '#58DBC6', '#757575', '#757575', '#757575', '#757575', '#757575',
										'#757575'
									];

									return color[params.substring(3) - 1]
								},
							}
						}

					},
					series: [{
						name: '金额',
						type: 'bar',
						barWidth: 20,
						data: [],
						label: {
							normal: {
								show: true,
								position: [10, 5],
								"formatter": function(params) {
									return params.data.name;
								},
								textStyle: {
									color: '#666' //color of value
								}
							}
						},
						itemStyle: {
							normal: {
								color: function(params) {
									let color = ['#FF7B7B', '#FFCF85', '#58DBC6', '#58C1DB', '#CA9FFF', '#FDBDA9', '#FFA0D6', '#E4FA97',
										'#E4FA97'
									];

									return color[params.dataIndex]

								},

							}
						}
					}]
				}

			}
		},
		methods: {
			detailPage() {
				uni.navigateTo({
					url: `./detail?id=${this.active+1}`
				})
			},
			adminList() {
				let timeStamp = rs.timeStamp();
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				}

				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let data = Object.assign({
					sign: sign,
					timeType: this.timeType
				}, obj);
				rs.getRequests("adminList", data, (res) => {
					if (res.data.code == 200) {
						this.graphInfo = res.data.data;
						this.option.series[0].data = res.data.data.orderPrice;
						this.ec.option.series[0].data = res.data.data.orderPrice;

						if (res.data.data.orderPrice.length == 0) {
							this.bitmap = false;
						} else {
							this.bitmap = true;
						}
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},

		},

		onShow() {
			this.adminList()
		}

	}
</script>

<!-- #ifndef MP-WEIXIN -->
<script module="echarts" lang="renderjs">
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
</script>


<!-- #endif -->


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



	.admin_index .num_info {
		display: flex;
		background: white;
		padding: 40rpx;
		margin: 20rpx;
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


	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.echarts {
		width: 100%;
		height: 600rpx;
	}

	.uni-ec-canvas {
		width: 100%;
		height: 600rpx;
		background-color: #FFFFFF;
		display: block;
	}

	.admin_index .tabBlock {
		background: none;
	}

	.admin_index .self_echart {
		background: white;
		margin: 0 20rpx 20rpx;
		/* #ifdef H5 */
		height: 70vh;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 67.5vh;
		/* #endif */
	}

	.admin_index .self_echart .more_info {
		text-align: right;
		padding: 30rpx 20rpx 20rpx;
		display: flex;
		justify-content: flex-end;
		color: #03A98E;
	}

	.admin_index .text_center {
		text-align: center;
		margin-bottom: 20rpx;
	}

	.admin_index .custom_state {
		background-color: white;
		margin: 20rpx;
		height: 160rpx;
	}

	.admin_index .custom_state>view {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.admin_index .show_bitmap {
		padding-top: 21%;
	}

	.admin_index .show_bitmap {
		padding-top: 21%;
	}

	.hideEchart {
		display: none;
	}
</style>
