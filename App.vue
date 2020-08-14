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
			// #ifdef APP-PLUS |MP-WEIXIN |MP-ALIPAY
			rootUrl: 'https://test.caidj.cn', //主接口地址
			imgRemote: 'https://test.caidj.cn',
			// #endif
			// #ifdef H5
			isWeixin: false,
			rootUrl: '/api', //主接口地址
			// rootUrl: window.location.protocol + "//" + window.location.hostname, //线上地址
			imgRemote: 'http://test.caidj.cn',
			// #endif
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@font-face {font-family: "iconfont";
	  src: url('//at.alicdn.com/t/font_1957858_2fxwfw1cmqa.eot?t=1597383963292'); /* IE9 */
	  src: url('//at.alicdn.com/t/font_1957858_2fxwfw1cmqa.eot?t=1597383963292#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
	  url('//at.alicdn.com/t/font_1957858_2fxwfw1cmqa.woff?t=1597383963292') format('woff'),
	  url('//at.alicdn.com/t/font_1957858_2fxwfw1cmqa.ttf?t=1597383963292') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('//at.alicdn.com/t/font_1957858_2fxwfw1cmqa.svg?t=1597383963292#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
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


	page{
		font-family:PingFang SC;
	}
	input{  
		background:none;  
		outline:none;  
		border:none !important;
	}
	input:focus{   
		border:none !important;
	}
	page{
		background: #F9F9FB;
		font-size: 30rpx;
		color: #333333;
	}
	.red_font{
		color: #FF4949;
	}
	.green_font{
		color: #03A98E;
	}
	.uni-navbar--border{
		border: none !important;
	}
	.uni-navbar__header{
		position: fixed !important;
	}
	.uni-input-placeholder{
		color: #C2C2C2;
	}
	.flex{
		display: flex;
	}
	.flex_column{
		display: flex;
		flex-direction: column;
	}
	.flex_center{
		align-items: center;
		justify-content: center;
	}
	.flex_align_center{
		align-items: center;
	}
	.flex_start{
		align-items: flex-start;
	}
	.flex_end{
		align-items: flex-end;
	}
	.flex_around{
		justify-content: space-around;
	}
	.flex_between{
		justify-content: space-between;
	}

</style>
