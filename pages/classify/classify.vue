<template>
	<view class="theme pageBg">
		<common-header title="分类"></common-header>
		<view class="theme-list">
			<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
		</view>
		<uni-load-more status="noMore" :contentText="{contentnomore: '没有更多数据了~'}"></uni-load-more>

	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import {apiGetClassify} from '@/api/api.js'
	import {onShareAppMessage, onShareTimeline} from '@dcloudio/uni-app'
	
	const classifyList = ref([])
	
	const getClassify = async () => {
		const res = await apiGetClassify({pageSize: 13})
		classifyList.value = res.data
	}
	
	getClassify()
	
	onShareAppMessage(() => {
		return {
			title: 'GeekPai壁纸',
			path: '/pages/classify/classify'
		}
	})
	
	onShareTimeline(() => {
		return {
			title: 'GeekPai壁纸',
		}
	})
</script>

<style lang="scss" scoped>

.theme {
	.theme-list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		gap: 14rpx;
		padding: 30rpx;
	}
}
</style>
