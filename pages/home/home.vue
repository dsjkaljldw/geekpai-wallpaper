<template>
	<view class="home pageBg">
		<common-header title="推荐"></common-header>
		<view class="banner">
			<swiper 
				autoplay
				circular
				indicator-dots	
				indicator-color='#fff'
				indicator-active-color='rgba(255,255,255, .5)'
			>
				<swiper-item v-for="item in bannderList" :key="item._id">
					<image mode='aspectFill' :src="item.picurl"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="notice">
			<view class="notice-left">
				<view class="notice-icon">
					<uni-icons type="sound-filled" size="28"></uni-icons>
				</view>
				<view class="notice-desc">公告</view>
			</view>
			
			<view class="notice-right">
				<swiper
					vertical
					autoplay
					circular
					disable-touch
					interval="2000"
					duration="300"
				>
					<swiper-item v-for="item in noticeList" :key="item._id">
						<view class="notice-text"  @click="handleNotice(item._id)">
							{{item.title}}
						</view>
						<uni-icons type="right" size="18"></uni-icons>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view class="select">
			<common-title title='每日推荐'>
				<template #more>
					<view class="select-title-right">
						<uni-icons type="calendar" size="24"></uni-icons>

						<uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat>
					</view>
				</template>
			</common-title>
			
			<scroll-view 
			scroll-x	
			class="select-list">
				<view class="select-list-item" v-for="item in dayRandomList" :key="item._id">
					<image @click="handlePreview(item._id)" :src="item.smallPicurl" mode="aspectFill"></image>
				</view>
			</scroll-view>
		</view>
	
	
		<view class="theme">
			<common-title title='专题精选'>
				<template #more>
					<navigator url="/pages/classify/classify" open-type="reLaunch" >
						<text class="theme-title-text">
							More+
						</text>
					</navigator>
				</template>
			</common-title>
			
			<view class="theme-list">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item isMore></theme-item>
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import {apiGetBanner, apiGetClassify, apiGetDayRandom} from '@/api/api.js'
	import {onShareAppMessage, onShareTimeline} from '@dcloudio/uni-app'
	import { ref } from 'vue';
	
	const bannderList = ref([])
	const noticeList = ref([])
	const classifyList = ref([])
	const dayRandomList = ref([])
	
	const handleNotice = (id) => {
		uni.navigateTo({
			url:`/pages/notice/notice?id=${id}`
		})
	}
	
	const handlePreview = (id) => {
		console.log(id, 'iiii')
		uni.setStorageSync('classList', dayRandomList.value)
		uni.navigateTo({
			url: `/pages/preview/preview?id=${id}`
		})
	}
	
	const getBanner = async () => {
		const res = await apiGetBanner()
		bannderList.value = res.data
	}
	const getNotice = async () => {
		noticeList.value = [
			{"_id":"1","view_count":4394,"publish_date":1698041511788,"title":"GeekPai壁纸，版权公告","author":"GeekPai","select":true},
			{"_id":"2","view_count":3480,"publish_date":1698051468713,"title":"常见问题，自行排查","author":"GeekPai","select":false},
		]
	}
	
	const getClassify = async () => {
		const res = await apiGetClassify({pageSize: 8})
		classifyList.value = res.data
	}
	const getDayRandom = async () => {
		const res = await apiGetDayRandom()
		dayRandomList.value = res.data
	}
	
	getBanner()
	getNotice()
	getClassify()
	getDayRandom()
	
	onShareAppMessage(() => {
		return {
			title: 'GeekPai壁纸',
			path: '/pages/home/home'
		}
	})
	
	onShareTimeline(() => {
		return {
			title: 'GeekPai壁纸',
		}
	})
</script>

<style lang="scss" scoped>

.banner {
	width: 750rpx;
	height: 340rpx;
	margin-top: 30rpx;
	
	swiper {
		width: 750rpx;
		height: 340rpx;
		
		&-item {
			width: 750rpx;
			height: 340rpx;
			padding: 0 30rpx;
			
			image {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
		}
	}
	
}

.notice {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 690rpx;
	height: 80rpx;
	padding: 0 24rpx;
	margin: 30rpx auto 60rpx;
	border-radius: 80rpx;
	background-color: #f9f9f9;

	&-left {
		display: flex;
		justify-content: center;
		align-items: center;
		
		.notice-desc {
			font-size: 28rpx;
			color: $text-font-color-1;
			font-weight: bold;
		}
		:deep() {
			.uni-icons {
				color: $app-theme-color!important;
			}
		}
	}
	
	&-right {
		height: 100%;
		swiper {
			width: 500rpx;
			height: 100%;
			
			swiper-item {
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
			
			.notice-text {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #666;
				width: 500rpx;
				font-size: 26rpx;
			}
		}
	}
	
}

.select {
	margin-bottom: 60rpx;
	
	.select-title-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		color: $text-font-color-1;
	}
	:deep() {
		.uni-icons {
			color: $app-theme-color!important;
		}
	}
	.select-list {
		white-space: nowrap;
		padding-left: 30rpx;
		box-sizing: border-box;
		
		.select-list-item {
			display: inline-block;
			width: 200rpx;
			height: 440rpx;
			margin-right: 16rpx;
			
			image {
				border-radius: 8rpx;
				width: 100%;
				height: 100%;
			}
		}
		
		.select-list-item:last-child {
			margin-right: 30rpx;
		}
		
		
	}
}

.theme {
	.theme-title-text {
		font-size: 32rpx;
		color: #888;
	}
	
	.theme-list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		gap: 14rpx;
		padding: 30rpx;
	}
}
</style>
