<template>
	<view class="commont-title">
		<view class="commont-title-text">{{title}}</view>
		<view class="commont-title-more">
			<slot name="more"></slot>
		</view>
	</view>
</template>

<script setup>

defineProps({
	title: {
		type: String,
		default: '标题'
	}
})
</script>

<style scoped lang="scss">
	.commont-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 36rpx;
		padding:0 30rpx;
		&-text {
			font-size: 36rpx;
			font-weight: bold;
		}
	}
	
	
</style>