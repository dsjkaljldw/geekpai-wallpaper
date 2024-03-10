<template>
	<view class="common-header">
		<view class="status-bar" :style="{height: statusBarHeight + 'px', marginLeft: leftIconLeft + 'px'}"></view>
		<view class="header-bar" :style="{height: headerBarHeight + 'px'}">
			<view class="header-bar-title">
				{{title}}
			</view>
			<view class="header-bar-search" @click="handleSearch">
				<uni-icons type="search" size="22" color="#B3BDB8"></uni-icons>
				<text>搜索</text>
			</view>
		</view>
	</view>
	
	<view class="fill" :style="{height: statusBarHeight + headerBarHeight + 'px'}"></view>
</template>

<script setup>
	import { ref } from 'vue';
	
	defineProps({
		title: {
			type: String,
			default: '壁纸'
		}
	})
	
	const handleSearch = () => {
		uni.navigateTo({
			url: '/pages/search/search'
		})
	}
	
	const SYETEM_INFO = uni.getSystemInfoSync()
	const statusBarHeight = ref(SYETEM_INFO.statusBarHeight || 15)
	
	const {top, height} = uni.getMenuButtonBoundingClientRect ? uni.getMenuButtonBoundingClientRect() : {}
	
	const headerBarHeight = ref(height + (top - statusBarHeight.value) * 2 || 40)
	
	const leftIconLeft = ref(0)
	
	// #ifdef MP-TOUTIAO
		let {leftIcon:{left,width}}  = tt.getCustomButtonBoundingClientRect();
		leftIconLeft.value = left + parseInt(width);
	// #endif
</script>

<style lang="scss" scoped>
.common-header {
	width: 750rpx;
	position: fixed;
	top: 0;
	z-index: 10;
	background: 
		linear-gradient(to bottom, rgba(0,0,0,0) 0%, #fff 400rpx),
		linear-gradient(to right, #beecd8 20%, #f4e2d8);
	padding: 0 30rpx;
	.header-bar {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		
		.header-bar-title {
			font-size: 50rpx;
			font-weight: bold;
			margin-right: 30rpx;
		}
		
		.header-bar-search {
			width: 230rpx;
			height: 60rpx;
			border: 1ps rolid #fff;
			background: #E9F6EF;
			border-radius: 60rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0 20rpx;
			font-size: 30rpx;
			color: #B3BDB8;
		}
	}
}
</style>