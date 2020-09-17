<template>
	<view class="HM-drag-sort" >
		<view class="list color" :class="[listSwitch?'show':'hide']">
			<block v-for="(row,index) in dragListA" :key="index">
				<view class="rowA" :id="'rowA'+index">
					<view class="modules" @tap="triggerClick(index,row)">
						<view class="drag" :data-index="index" data-type="A" :data-isdelay="isdelay" :data-rownum="dragListA.length"
							<!-- #ifndef MP-WEIXIN -->
							 @touchstart.stop.prevent="drag.touchstart" @touchmove.stop.prevent="drag.touchmove" @touchend.stop.prevent="drag.touchend"
							<!-- #endif -->
							<!-- #ifdef MP-WEIXIN -->
							 @touchstart="drag.touchstart" @touchmove="drag.touchmove" @touchend="drag.touchend"
							<!-- #endif -->
						>
							<text class="first_str">{{row.nickname.substring(0,1)}}</text>
							<text class="text">{{row.nickname}}</text>
						</view>
						<view class="content">
							
								<text class="iconfont" @click="changeStatus(index,row.id)" 
								:class="row.id!=id?'iconqingniaoxitongtubiao_xia':'iconicon-test'"></text>
							
						</view>
						
					</view>
				    <view v-if="id==row.id" class="more_info">
				    		<view>
				    			<text>收货人 :</text>
				    			<text>{{row.attr.contact}}</text>
				    		</view>
				    		<view>
				    			<text>收货手机 :</text>
				    			<text @click="call(row.attr.phone)">{{row.attr.phone}}</text>
				    		</view>
				    		<view>
				    			<text>收货地址 :</text>
				    			<text>{{row.attr.address}}</text>
				    		</view>
				    		<view class="flex_between flex">
				    			<text>导航</text>
				    			<text class="iconfont iconyou" style="color:#C2C2C2;" @click="openMap(row)"></text>
				    		</view>
				    	</view>
				    
				</view>
			
			</block>
		</view>
		<!-- #ifndef H5 -->
		<!-- 非H5端，直接切换list，避免看到排序渲染的过程(闪动) 原谅我找不到更好的方法了 ╮(╯▽╰)╭ -->
		
		<view class="list color" :class="[listSwitch?'hide':'show']">
			<block v-for="(row,index) in dragListB" :key="index">
				<view class="rowB" :id="'rowB'+index">
					<view class="modules" @tap="triggerClick(index,row)">
						<view class="drag" :data-index="index" data-type="B" :data-isdelay="isdelay" :data-rownum="dragListB.length"
							<!-- #ifndef MP-WEIXIN -->
							 @touchstart.stop.prevent="drag.touchstart" @touchmove.stop.prevent="drag.touchmove" @touchend.stop.prevent="drag.touchend"
							<!-- #endif -->
							<!-- #ifdef MP-WEIXIN -->
							 @touchstart="drag.touchstart" @touchmove="drag.touchmove" @touchend="drag.touchend"
							<!-- #endif -->
						>
							<text class="first_str">{{row.nickname.substring(0,1)}}{{row.status}}</text>
							<text class="text">{{row.nickname}}</text>
						</view>
						<view class="content">
							
								<text class="iconfont" @click="changeStatus(index)" 
								:class="row.id!=id?'iconqingniaoxitongtubiao_xia':'iconicon-test'"></text>
							
						</view>
						
					</view>
					
				</view>
			</block>
		</view>
		<!-- #endif -->
	</view>
</template>
<script src="./drag.wxs" module="drag" lang="wxs"></script>
<script>
	import rs from '../../static/js/request.js';
	export default {
		name: 'HM-dragSort',
		data() {
			return {
				dragListA:[],
				dragListB:[],
				listSwitch: true,
				isdelay: false,
				id:''
			}
		},
		props: {
			list: {
				value: Array,
				default: []
			}
		},
		watch: {
			list: {
				handler(val) {
					this.initList(); //数据变化重新初始化list
				},
				immediate: true
			}
		},
		mounted() {
			// #ifndef H5
			this.isdelay = true;
			// #endif
		},
		methods: {
			call(phone){
				uni.makePhoneCall({
				    phoneNumber: phone //仅为示例
				});
			},
			openMap(item){
			
				if(item.latitude==''&&item.longitude==''){
					rs.Toast('该用户不存在定位信息')
				}else {
					uni.openLocation({
						latitude:item.latitude,
						longitude:item.longitude,
						name:item.attr.address
					})
					}
			},
			changeStatus(index,id) {
				// this.dragListA[index].status = !this.dragListA[index].status;
				if(this.id!=id){
					this.id=id;
				}else{
					this.id=""
				}
			
			},
			initList(){
				if(this.dragListA.length>0){
					//一个延迟，防止闪动
					setTimeout(()=>{
						this.dragListA = this.list;
						this.dragListB = this.list;
					},50)
				}else{
					this.dragListA = this.list;
					this.dragListB = this.list;
				}
			},
			triggerClick(index,row){
				this.$emit('onclick', {index:index,value:row});
			},
			//兼容微信小程序震动
			vibrate(){
				uni.vibrateShort()
			},
			sort(e) {
				let tmpList = JSON.parse(JSON.stringify(this.dragListA));
				tmpList.splice(e.offset, 0, tmpList.splice(e.index, 1)[0]);
			
				this.dragListA = [];
				this.dragListA = tmpList;
				
				// #ifndef H5
				return;
					if(this.listSwitch){
						this.dragListB = [];
						this.dragListB = tmpList;
						// #ifdef MP-WEIXIN
						setTimeout(()=>{
						// #endif
							// #ifndef MP-WEIXIN
							this.$nextTick(()=>{
							// #endif
								this.listSwitch = !this.listSwitch;
								this.$nextTick(()=>{
									this.dragListA = [];
									this.dragListA = tmpList;
								})
							// #ifndef MP-WEIXIN
							})
							// #endif
						// #ifdef MP-WEIXIN
						},50)
						// #endif
					}else{
						this.dragListA = [];
						this.dragListA = tmpList;
						// #ifdef MP-WEIXIN
						setTimeout(()=>{
						// #endif
						// #ifndef MP-WEIXIN
						this.$nextTick(()=>{
						// #endif
							this.listSwitch = !this.listSwitch; 
							this.$nextTick(()=>{
								this.dragListB = [];
								this.dragListB = tmpList; 
							})
						// #ifdef MP-WEIXIN
						},50)
						// #endif
						// #ifndef MP-WEIXIN
						})
						// #endif
					}
				// #endif
				this.$emit('confirm', {list:tmpList});
			}
		}
	}
</script>

<style lang="scss">
	$row-Height: 45px;
	//默认
	$text-color : #000000;
	$border-color :#c8c7cb;
	$background-color :rgba(255, 255, 255, 1);
	$background-color-moveing :rgba(255, 255, 255, 0.8);
	$shadow-background-color-moveing :rgba(0, 0, 0, 0.5);
	$icon-drag-color:#c7c7cb;
	//Dark模式
	$Dark-text-color : #ffffff;
	$Dark-border-color :#3d3d40;
	$Dark-background-color :rgba(28, 28, 29, 1);
	$Dark-background-color-moveing :rgba(28, 28, 29, 0.8);
	$Dark-shadow-background-color-moveing :rgba(0, 0, 0, 0.5);
	$Dark-icon-drag-color:#5a5a5e;
	
	.HM-drag-sort {
		// touch-action: none;
		display: flex;
		flex-direction: column;

		.list {
			display: flex;
			flex-direction: column;
			transform-style: preserve-3d;
			-webkit-transform-style: preserve-3d;
			transform: translateY(0px) translateZ(5px);
			-webkit-transform: translateY(0px) translateZ(5px);
			//默认颜色
			&.color{
				// border-bottom: 1rpx $border-color solid;
				// border-top: 1rpx $border-color solid;
				.rowA,
				.rowB {
					border-bottom: 1px solid #F0F0F0;
					background-color: $background-color;
					&.move {
						background-color: $background-color-moveing;
						box-shadow: 0 1px 5px $shadow-background-color-moveing;
					}
					.modules {
						// border-bottom: 1rpx $border-color solid;
						.content{
							.text{
								color: $text-color;
							}
						}
						.iconfont {
							color: $icon-drag-color;
						}
					}
				}
			}
			// 暗黑模式
			@media (prefers-color-scheme: dark){
			    //Dark模式
			    &.color{
			    	border-bottom: 1rpx $Dark-border-color solid;
			    	border-top: 1rpx $Dark-border-color solid;
			    	.rowA,
			    	.rowB {
			    		background-color: $Dark-background-color;
			    		&.move {
			    			background-color: $Dark-background-color-moveing;
			    			box-shadow: 0 1px 5px $Dark-shadow-background-color-moveing;
			    		}
			    		.modules {
			    			// border-bottom: 1rpx $Dark-border-color solid;
			    			.content{
			    				.text{
			    					color: $Dark-text-color;
			    				}
			    			}
			    			.iconfont {
			    				color: $Dark-icon-drag-color;
			    			}
			    		}
			    	}
			    }
			}
			&.show {
				display: flex;
			}

			&.hide {
				display: none;
			}

			.rowA,
			.rowB {
				// display: flex;
				// flex-direction: row;
				width: 100%;
				// height: $row-Height;
				
				transform: translateY(0px) translateZ(5px);
				-webkit-transform: translateY(0px) translateZ(5px);

				&:last-child {
					.modules {
						// border-bottom-width: 0;
					}
				}

				&.ani {
					transition: all 0.2s;
					-webkit-transition: all 0.2s;
				}

				&.move {
					

					.modules {
						// border-bottom-width: 0;
					}
				}

				.modules {
					// margin-left: 12px;
					// padding-right: 12px;
					padding:0 20rpx;
					// width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					.content{
						display: flex;
						flex-direction: row;
						align-items: center;
						.icon{
							width: 30px;
							height: 30px;
							border-radius: 6px;
							margin-right: 13px;
						}
						.text{
							font-size: 13px;
						}
					}
					.drag {
						// width: 22px;
						height: $row-Height;
						flex-shrink: 0;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						.iconfont{
							font-size: 22px;
						}
					}
				}
				
			}
		}

	}
	@font-face {
		font-family:"HM-DS-font";
		src: url('data:font/truetype;charset=utf-8;base64,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') format('truetype');
	}
	// .iconfont {
	// 	font-family: "HM-DS-font" !important;
	// 	font-style: normal;
	// 	&.icon-drag {
	// 		&:before {
	// 			content: "\e6e4";
	// 		}
	// 	}
		
	// }
	.first_str {
		width: 58rpx;
		height: 58rpx;
		background-color: #04A98E;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		margin-right: 31rpx;
		justify-content: center;
	
	}
	.more_info{padding:0 20rpx;}
	.more_info>view {
		margin-bottom: 15rpx;
	}
	
	 .more_info>view text:first-child {
		margin-right: 18rpx;}
</style>
