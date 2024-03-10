<template>
	<view class="classlist">
		<view class="classlist-item" v-for="item in classList" :key="item._id">
			<image :src="item.smallPicurl" mode="aspectFill" @click="handlePreview(item._id)"></image>
		</view>
	</view>
	
	<uni-load-more :status="status"></uni-load-more>
	
	<view class="safe-area-inset-bottom"></view>
</template>

<script setup>
	import {apiGetClassList, apiGetHistoryList} from '@/api/api.js'
	import { computed, ref } from 'vue';
	import { onLoad, onReachBottom, onPullDownRefresh, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'

	const classList = ref([])
	const params = { pageNum : 1, pageSize: 12}
	let pageName;
	const total = ref(0)
	const loading = ref(false)
	const isBottom = computed(() => classList.value.length >= total.value)
	const status = computed(() => {
		if(isBottom.value && total.value > 0) {
			return 'no-more'
		} else if (loading.value) {
			return 'loading'
		} else {
			return 'more'
		}
	})
	
	onLoad((e) => {
		const { id, name, type} = e
		pageName = name
		uni.setNavigationBarTitle({
			title: name
		})
		if(type) params.type = type;
		if(id) params.classid = id;	
		getClassList()
	})
	const getClassList = async () => {
		loading.value = true
		const api = params.classid ? apiGetClassList : apiGetHistoryList
		const res = await api({...params})
		classList.value = [...classList.value, ...res.data]
		uni.setStorageSync('classList', classList.value)
		total.value = res.total
		loading.value = false
	}
	
	const handlePreview = (id) => {
		uni.navigateTo({
			url: `/pages/preview/preview?id=${id}`
		})
	}
	
	onReachBottom((e) => {
		if (isBottom.value) return
		params.pageNum++
		getClassList()
	})
	
	onPullDownRefresh(async () => {
		params.pageNum = 1
		await getClassList()
		uni.stopPullDownRefresh();
	})
	
	onShareAppMessage(() => {
		return {
			title: `GeekPai壁纸-${pageName}`,
			path: `/pages/classlist/classlist?id=${params.classid}&name=${pageName}`
		}
	})
	
	onShareTimeline(() => {
		return {
			title: `GeekPai壁纸-${pageName}`,
			query: `id=${params.classid}&name=${pageName}`
		}
	})
</script>

<style lang="scss" scoped>
.classlist {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 5rpx;
	padding: 5rpx;
	
	.classlist-item {
		height: 440rpx;
		
		image {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
}
</style>
