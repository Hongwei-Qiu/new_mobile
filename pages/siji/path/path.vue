<template>
	<view>
		路线
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
				tabNum: 3,
			}
		},
		watch: {
		
		},
		methods: {
	

		},
		onShow() {
	
		}
	}
</script>

<style>

</style>


