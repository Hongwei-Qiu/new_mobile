<script>
	export default {
		//全局共享数据
		globalData: {
			// #ifdef APP-PLUS
			navBar: true,
			// #endif
			// #ifdef MP-WEIXIN |H5
			navBar: false,
			// #endif
			appid: '2',
			appsecret: '123456',
			isReload: true,
			// #ifdef APP-PLUS |MP-WEIXIN |MP-ALIPAY
			rootUrl: 'https://test.caidj.cn', //主接口地址
			imgRemote: 'https://test.caidj.cn',
			// #endif
			// #ifdef H5
			isWeixin: false,
			// rootUrl: '/api', //主接口地址
			// imgRemote: 'http://test.caidj.cn',
			rootUrl: window.location.protocol + "//" + window.location.hostname, //线上地址
			imgRemote: window.location.protocol + "//" + window.location.hostname,
			// #endif
		},
		onLaunch: function() {

		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style>
	@font-face {
	  font-family: 'iconfont';  /* project id 1957858 */
	  src: url('https://at.alicdn.com/t/font_1957858_cmdc7qu7uzw.eot');
	  src: url('https://at.alicdn.com/t/font_1957858_cmdc7qu7uzw.eot?#iefix') format('embedded-opentype'),
	  url('https://at.alicdn.com/t/font_1957858_cmdc7qu7uzw.woff2') format('woff2'),
	  url('https://at.alicdn.com/t/font_1957858_cmdc7qu7uzw.woff') format('woff'),
	  url('https://at.alicdn.com/t/font_1957858_cmdc7qu7uzw.ttf') format('truetype'),
	  url('https://at.alicdn.com/t/font_1957858_cmdc7qu7uzw.svg#iconfont') format('svg');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.iconsanjiaoxing:before {
	  content: "\e6e6";
	}
	
	.iconsanjiaoxing_shang:before {
	  content: "\e6e7";
	}
	
	.iconshoukuan-copy:before {
	  content: "\e745";
	}
	
	.iconshoukuan:before {
	  content: "\e668";
	}
	
	.iconsaoyisao:before {
	  content: "\e611";
	}
	
	.iconyonghuguanli:before {
	  content: "\e6aa";
	}
	
	.icongongjiaoxianlu:before {
	  content: "\e644";
	}
	
	.icon-_peisongshang:before {
	  content: "\e63a";
	}
	
	.icondianhua1:before {
	  content: "\e66f";
	}
	
	.iconxuanzhong:before {
	  content: "\e60a";
	}
	
	.iconshanchu:before {
	  content: "\e61a";
	}
	
	.iconzuobiao:before {
	  content: "\e618";
	}
	
	.iconjia:before {
	  content: "\e609";
	}
	
	.iconxiala:before {
	  content: "\e607";
	}
	
	.iconyou:before {
	  content: "\e64a";
	}
	
	.iconicon-test:before {
	  content: "\e606";
	}
	
	.iconqingniaoxitongtubiao_xia:before {
	  content: "\e66d";
	}
	
	.iconseach-:before {
	  content: "\e677";
	}
	
	.iconcha:before {
	  content: "\e604";
	}
	
	.iconxuanze:before {
	  content: "\e602";
	}
	
	.iconxuanze1:before {
	  content: "\e610";
	}
	
	.iconcart:before {
	  content: "\e737";
	}
	
	.iconicon_jiaoseguanli:before {
	  content: "\e626";
	}
	
	.icontuihuo:before {
	  content: "\e744";
	}
	
	.iconwenti:before {
	  content: "\e608";
	}
	
	.iconzhengyanzhuanhuan:before {
	  content: "\e617";
	}
	
	.iconindex:before {
	  content: "\e65c";
	}
	
	.iconwodezhangdan:before {
	  content: "\e635";
	}
	
	.iconbangdingweixin:before {
	  content: "\e603";
	}
	
	.iconhedui:before {
	  content: "\e688";
	}
	
	.iconmima:before {
	  content: "\e60f";
	}
	
	.iconyanjingbiyan:before {
	  content: "\e61d";
	}
	
	.iconwode:before {
	  content: "\e605";
	}
	
	.iconUserpersonalinform:before {
	  content: "\e600";
	}
	
	.iconxunjia:before {
	  content: "\e613";
	}
	
	.icontuichudenglu:before {
	  content: "\e601";
	}
	


	page {
		font-family: PingFang SC;
	}

	input {
		background: none;
		outline: none;
		border: none !important;
	}

	input:focus {
		border: none !important;
	}

	page {
		background: #F9F9FB;
		font-size: 30rpx;
		color: #333333;
	}

	.red_font {
		color: #FF4949;
	}

	.green_font {
		color: #03A98E;
	}

	.uni-navbar--border {
		border: none !important;
	}

	.uni-navbar__header {
		position: fixed !important;
	}

	.uni-input-placeholder {
		color: #C2C2C2;
	}

	.flex {
		display: flex;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.flex_center {
		align-items: center;
		justify-content: center;
	}

	.flex_align_center {
		align-items: center;
	}

	.flex_start {
		align-items: flex-start;
	}

	.flex_end {
		align-items: flex-end;
	}

	.flex_around {
		justify-content: space-around;
	}

	.flex_between {
		justify-content: space-between;
	}

	.status_bar {
		/* background: white; */

		height: var(--status-bar-height);
		width: 100%;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 888;
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%
	}

	.weight {
		font-weight: 600;
	}

	.uni-scroll-view::-webkit-scrollbar {
		display: none;
	}

	.supplier_style .supplier_list {
		padding: 12px;
		position: fixed;
		width: 75%;
		top: 20%;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 999;
		border-radius: 2px;
		background: white;
		flex-direction: column;

	}

	.supplier_style .supplier_list .all_supplier {
		height: 40vh;
		overflow-y: scroll;
	}

	.supplier_style .supplier_list .supplier_title {
		display: flex;
		font-size: 40rpx;
		justify-content: space-between;
		align-items: center;
	}

	.supplier_style .supplier_list .sign_supplier {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		font-size: 32rpx;
	}

	.supplier_style .iconfont {
		font-size: 40rpx;
	}
	.index_top_image{position: absolute;height:500rpx;width:100%;top:0;}
</style>
