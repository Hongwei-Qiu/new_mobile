<template>
	<movable-area class="drag-sort" :style="{height: movableHeight + 'px'}" id="drag">

		<movable-view v-for="(item, index) in currentList" :key="index" :x="item.x" :y="item.y" :style="{'height':itemHeight+'px','width':itemWidth+'px',}"
		 :class="['drag-sort-item', {'active': active == item.index},{'activeId': id == item.data.id}]" :id="'act'+item.index"
		 :animation="animationBoolean" :inertia="true" direction="all" damping="30" friction="10" @touchstart="touchstart($event, item.index)"
		 @touchmove.stop="touchmove" @touchend="touchend">
			<view class="item">


				<view class="itemself">
					<!-- 	<slot :mydata="item.data" :index="index"></slot> -->
					<view class="custom_info">
						<view class="username"><text class="first_str">{{item.data.nickname.substring(0,1)}}</text><text>{{item.data.nickname}}</text></view>
						<view class="">
							<text class="iconfont " @click="changeStatus(item.data.id)" :class="item.data.id!=id?'iconqingniaoxitongtubiao_xia':'iconicon-test'"></text>
						</view>
					</view>
					<view v-if="item.data.id==id" class="more_info">
						<view>
							<text>收货人 :</text>
							<text>{{item.data.attr.contact}}</text>
						</view>
						<view>
							<text>收货手机 :</text>
							<text @click="call(item.data.attr.phone)">{{item.data.attr.phone}}</text>
						</view>
						<view>
							<text>收货地址 :</text>
							<text>{{item.data.attr.address}}</text>
						</view>
						<view class="flex_between flex">
							<text>导航</text>
							<text class="iconfont iconyou" style="color:#C2C2C2;" @click="openMap(item.data)"></text>
						</view>
					</view>
				</view> <!-- 添加需要的视图UI -->

			</view>
		</movable-view>

	</movable-area>
</template>

<script>
	import rs from '../../static/js/request.js';
	export default {
		name: 'drag-sort',
		mixins: [],
		components: {},
		data() {
			return {
				id: '',
				atcIndex: -1,
				endIndex: -1,
				itemHeight: 0,
				itemWidth: 0,
				movableHeight: 0,
				movableWidth: 0,
				tempPosition: [],
				itemH_W: 1, // item  高宽比
				active: -1, // 当前激活的item
				currentList: [],
				xBreakPoints: [],
				yBreakPoints: [],
				moveEndxpoint: 0,
				moveEndypoint: 0,
				moveStartX: 0,
				moveStartY: 0,
				animationBoolean: false
			}
		},
		props: {
			autoHeight: { // 设置ture  和  rowNum  求最大最
				type: Boolean,
				default: true
			},
			rowNum: {
				type: Number, // 行数
				default: 2
			},
			colNum: {
				type: Number, // 列数  目前h4 4列有bug
				default: 1
			},
			list: {
				type: Array,
				default: () => {
					return [1, 2, 3, 4, 5, 6, 7, 8, 9]
				}
			},
			isDel: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			list(val) {
				this.uplocationsize()
			}
		},
		computed: {
			initArray: function() {
				var colIndex = 0;
				let doubleArray = []
				for (var i = 0; i < this.list.length; i++) {
					if (i % this.colNum == 0 && i !== 0) {
						colIndex++
					}
					doubleArray.push({
						colIndex: i - colIndex * this.colNum,
						rowIndex: colIndex
					})
				}
				return doubleArray;
			}
		},
		mounted() {
			this.xBreakPoints = [];
			this.yBreakPoints = [];
			let wrap = uni.createSelectorQuery().in(this).select('#drag')
			wrap.boundingClientRect(data => {
				this.itemWidth = data.width / this.colNum;
				// console.log(data)
				// this.itemHeight = this.itemWidth * this.itemH_W;
				this.itemHeight = 60;
				for (var i = 0; i < this.colNum; i++) {
					this.xBreakPoints.push(this.itemWidth * (i + 1))
				}
				for (var i = 0; i < (this.rowNum + 1); i++) {
					this.yBreakPoints.push(this.itemHeight * (i + 1))
				}
				this.movableWidth = data.width;
				let numberRowNum = Math.max(Math.ceil(this.list.length / this.colNum), this.rowNum);
				if (this.autoHeight) {
					this.movableHeight = this.itemHeight * Math.max(Math.ceil(this.list.length / this.colNum), 1);


				} else {

					this.movableHeight = this.itemHeight * numberRowNum;
				}
				this.uplocationsize()
			}).exec();

		},
		methods: {
			changeStatus(item) {
				if (this.id == item) {
					this.id = '';
				} else {
					this.id = item;
				}
			},
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			openMap(item) {

				if (item.latitude == '' && item.longitude == '') {
					rs.Toast('该用户不存在定位信息')
				} else {
					uni.openLocation({
						latitude: item.latitude,
						longitude: item.longitude,
						name: item.attr.address
					})
				}
			},
			uplocationsize() {
				var tempArr = [];
				var colIndex = 0;
				let len = this.list.length;
				let resultPosition = this.initArray;
				for (var i = 0; i < len; i++) {
					if (i % this.colNum == 0 && i !== 0) {
						colIndex++
					}
					tempArr.push({
						data: this.list[i],
						index: i,
						y: this.itemHeight * resultPosition[i].rowIndex,
						x: this.itemWidth * resultPosition[i].colIndex
					})
				}
				let numberRowNum = Math.max(Math.ceil(this.list.length / this.colNum), this.rowNum);
				if (this.autoHeight) {
					this.movableHeight = this.itemHeight * Math.max(Math.ceil(this.list.length / this.colNum), 1);
				} else {
					this.movableHeight = this.itemHeight * numberRowNum;
				}

				this.$emit('change', this.list);
				//console.log(this.list)
				this.currentList = tempArr;
			},
			returnIndex: function(item, arr) {
				for (var i = 0; i < arr.length; i++) {
					if (i == 0 && arr[0] >= item) {
						return 0;
					} else if (item <= arr[i] && item > arr[i - 1]) {
						return i
					}
				}
			},
			touchstart(e, index) {
				this.active = index;
				this.moveStartX = 0;
				this.moveStartY = 0;
			},

			touchmove(e) {
				this.animationBoolean = false;
				let resultPosition = this.initArray;
				if (this.moveStartX == 0) {
					this.moveStartX = e.mp.touches[0].pageX;
				} else {
					let x = this.itemWidth * resultPosition[this.active].colIndex;
					!!this.currentList[this.active] && this.$set(this.currentList[this.active], 'x', x + e.mp.touches[0].pageX - this.moveStartX);
					this.moveEndxpoint = this.currentList[this.active].x + this.itemWidth / 2;
				}
				if (this.moveStartY == 0) {
					this.moveStartY = e.mp.touches[0].pageY;
				} else {
					let y = this.itemHeight * resultPosition[this.active].rowIndex;
					!!this.currentList[this.active] && this.$set(this.currentList[this.active], 'y', y + e.mp.touches[0].pageY - this.moveStartY);
					this.moveEndypoint = this.currentList[this.active].y + this.itemHeight / 2;
				}

			},
			changePosition: function(preIndex, nextIndex) {
				this.animationBoolean = true;
				let that = this;
				//console.log('preIndex=='+preIndex,'nextIndex=='+nextIndex)
				let resultPosition = this.initArray;
				let sumLen = this.currentList.length - 1;
				let tempCurrentList = this.currentList;
				if (preIndex <= sumLen && nextIndex <= sumLen) {
					if (preIndex == nextIndex) {
						// #ifdef H5
						setTimeout(() => {
							this.$set(this.currentList[preIndex], 'x', this.itemWidth * resultPosition[preIndex].colIndex);
							this.$set(this.currentList[preIndex], 'y', this.itemHeight * resultPosition[preIndex].rowIndex);
						}, 30)
						// #endif
						// #ifndef H5
						this.$set(this.currentList[preIndex], 'x', this.itemWidth * resultPosition[preIndex].colIndex);
						this.$set(this.currentList[preIndex], 'y', this.itemHeight * resultPosition[preIndex].rowIndex);
						// #endif
					}
					if (preIndex !== nextIndex) {


						//  console.log('初始',{
						// 	 'xoinit':this.currentList[preIndex].x,
						// 	 'yoinit':this.currentList[preIndex].y,
						// 	 'x2oinit':this.currentList[nextIndex].x,
						// 	 'y2oinit':this.currentList[nextIndex].y
						// })
						// this.$set(this.currentList[nextIndex],'x',this.itemWidth * resultPosition[preIndex].colIndex);
						// this.$set(this.currentList[nextIndex],'y',this.itemHeight * resultPosition[preIndex].rowIndex);
						// this.$set(this.currentList[nextIndex],'index',preIndex);		 				
						// 
						// this.$set(this.currentList[preIndex],'x',this.itemWidth * resultPosition[nextIndex].colIndex);
						// this.$set(this.currentList[preIndex],'y',this.itemHeight * resultPosition[nextIndex].rowIndex);
						// this.$set(this.currentList[preIndex],'index',nextIndex);

						let arr = [preIndex, nextIndex].sort((a, b) => a - b);
						// this.currentList.splice(arr[0], 0, this.currentList.splice(arr[1], 1)[0]);
						// this.currentList.splice(arr[1], 0, this.currentList.splice(arr[0] + 1, 1)[0]);
						this.list.splice(arr[0], 0, this.list.splice(arr[1], 1)[0]);
						this.list.splice(arr[1], 0, this.list.splice(arr[0] + 1, 1)[0]);
						this.uplocationsize()
						// console.log('设置后',{
						//  	 'xoo':this.currentList[preIndex].x,
						//  	 'yoo':this.currentList[preIndex].y,
						//  	 'x2oo':this.currentList[nextIndex].x,
						//  	 'y2oo':this.currentList[nextIndex].y
						//  })
						//  console.log('理论设置值',{
						// 		 'xset':this.itemWidth * resultPosition[preIndex].colIndex,
						// 		 'yset':this.itemHeight * resultPosition[preIndex].rowIndex,
						// 		 'x2set':this.itemWidth * resultPosition[nextIndex].colIndex,
						// 		 'y2set':this.itemHeight * resultPosition[nextIndex].rowIndex
						//  })
					}
				} else {
					// #ifdef H5
					setTimeout(function() {
						that.$set(that.currentList[preIndex], 'x', that.itemWidth * resultPosition[preIndex].colIndex);
						that.$set(that.currentList[preIndex], 'y', that.itemHeight * resultPosition[preIndex].rowIndex);
						that.$set(that.currentList[preIndex], 'index', preIndex);
					}, 20)
					// #endif
					// #ifndef H5
					that.$set(that.currentList[preIndex], 'x', that.itemWidth * resultPosition[preIndex].colIndex);
					that.$set(that.currentList[preIndex], 'y', that.itemHeight * resultPosition[preIndex].rowIndex);
					that.$set(that.currentList[preIndex], 'index', preIndex);
					// #endif

				}
				//console.log(this.list)
				this.clearStatus();
			},
			touchend(e) {
				if (this.moveEndypoint != 0 || this.moveEndxpoint != 0) {
					let endRowNum = this.returnIndex(this.moveEndypoint, this.yBreakPoints);
					let endColNum = this.returnIndex(this.moveEndxpoint, this.xBreakPoints);
					let resultPosition = this.initArray;

					this.endIndex = endColNum + this.colNum * endRowNum;
					if (!(this.active == -1 || this.endIndex == -1)) {
						this.changePosition(this.active, this.endIndex);
					} else {
						this.clearStatus();
					}
				} else {
					this.clearStatus();
				}
			},
			clearStatus: function() {
				this.active = -1;
				this.endIndex = -1;
				this.moveEndxpoint = 0;
				this.moveEndypoint = 0;
			}
		}
	}
</script>

<style scoped>
	.drag-sort {
		width: 100%;
		/* background: palegoldenrod; */
	}

	.drag-sort-item {
		background: white;
		padding: 4upx;
		box-sizing: border-box;
		/* border:1upx solid #DDDDDD; */
		cursor: move;
		display: flex;
		justify-content: center;
		align-content: center;
	}


	.active {
		box-shadow: 0 0 40rpx #DDDDDD;
		transform: scale(1.2);
		z-index: 100;
		transition: all 0.1s ease-in 0s;
		color: red
	}

	.item {
		flex: 1;
		position: relative;
	}

	.delItem {
		position: absolute;
		right: 6upx;
		top: 6upx;
		display: inline-block;
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		/* background: #ededed; */
		color: red;
		line-height: 30upx;
		text-align: center;
		border: none;
		font-size: 30upx;
		z-index: 99;
	}

	.itemself {
		width: 95%;
		padding: 0 20rpx;
		border-bottom: 1px solid #f0f0f0;
		/* height:100%; */
	}

	.activeId+.drag-sort-item {
		margin-top: 128px;
	}
</style>
