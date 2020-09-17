<template>
	<view class="show_bitmap">
		<image src="../../static/img/no_content.png" mode="" class="bitmap_style" mode="aspectFit"></image>
		<text class="text_message">亲，目前暂无数据~</text>
	</view>
</template>

<script>
</script>

<style>
	.show_bitmap .text_message{margin-left:5%;color: #999;}
	.show_bitmap .bitmap_style{width:40%;}
	.show_bitmap{display: flex;flex-direction: column;justify-content: center;align-items: center;padding-top:40%;}
	
	
</style>
