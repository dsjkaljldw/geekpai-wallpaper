<template>
	
	<navigator :url="`/pages/classlist/classlist?id=${item._id}&name=${item.name}`" v-if="!isMore">
		<view class="theme-item">
			<image :src="item.picurl" mode="aspectFill"></image>
			<view class="theme-item-desc">
				{{item.name}}
			</view>
			<view class="theme-item-tips" v-if="item.updateTime">
				{{getTimeDifference(item.updateTime)}}更新
			</view>
		</view>
	</navigator>
	
	<navigator url="/pages/classify/classify" open-type="reLaunch" v-if="isMore">
		<view class="theme-item theme-more">
			<image src="../../common/images/more.jpg" mode="aspectFill"></image>
			<view class="theme-more-mask">
				<view class="theme-more-text">更多</view>
				<uni-icons type="more-filled" size="26" color="#fff"></uni-icons>
			</view>
			
		</view>
	</navigator>
</template>

<script setup>
	function getTimeDifference(timestamp) {
	    const now = Date.now();
	    const diffInMs = now - timestamp;
	    const diffInSec = Math.floor(diffInMs / 1000);
	    const diffInMin = Math.floor(diffInSec / 60);
	    const diffInHour = Math.floor(diffInMin / 60);
	    const diffInDay = Math.floor(diffInHour / 24);
	    const diffInMonth = Math.floor(diffInDay / 30);
	    const diffInYear = Math.floor(diffInMonth / 12);
	
	    if (diffInMin < 60) {
	        return `${diffInMin} 分钟内`;
	    } else if (diffInHour < 24) {
	        return `${diffInHour} 小时内`;
	    } else if (diffInDay < 30) {
	        return `${diffInDay} 天内`;
	    } else if (diffInMonth < 12) {
	        return `${diffInMonth} 月内`;
	    } else if (diffInYear < 1) {
	        return `${diffInYear} 年内`;
	    } else {
	        return null;
	    }
	}
	
	defineProps({
		item: {
			type: Object,
			default: {
				name: '壁纸',
				picurl: '../../common/images/classify1.jpg',
				_id: 'xxx',
				updateTime: Date.now()
			}
		},
		isMore: {
			type: Boolean,
			default: false
		}
	})
</script>

<style lang="scss" scoped>
	.theme-item {
		position: relative;
		width: 220rpx;
		height: 340rpx;
		border-radius: 8rpx;
		overflow: hidden;
		
		image {
			width: 100%;
			height: 100%;
		}
		
		&-desc {
			position: absolute;
			bottom: 0;
			width: 220rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			color: #fff;
			background: rgba(0, 0, 0, 0.2);
			backdrop-filter: blur(50rpx);
			font-weight: 600;
			font-size: 36rpx;
		}
		
		&-tips {
			position: absolute;
			left: 0;
			top: 0;
			padding: 4rpx 10rpx;
			background-color: rgba(250, 129, 90, 0.7);
			font-size: 22rpx;
			color: #fff;
			border-bottom-right-radius: 14rpx;
		}
	}
	
	.theme-more {
		.theme-more-mask {
			position: absolute;
			top: 0;
			left: 0;
			button: 0;
			right: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.2);
			backdrop-filter: blur(30rpx);
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		
		
		.theme-more-text {
			color: #fff;
			font-size: 30rpx;
		}
	}
</style>