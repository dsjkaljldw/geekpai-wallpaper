<template>
	<view class="notice">
		<view class="notice-title">
			GeekPai壁纸，版权公告
		</view>
		
		<view class="notice-info">
			GeekPai 2023-01-10 11:11:11
		</view>
		
		<view class="notice-main">
			<view class="notice-main-title">
				壁纸是否可以免费下载使用？
			</view>
			<view class="notice-main-text">
				小程序/H5,内的所有图片均可免费下载，但是图片版权属于上传者或者图片来源作者，下载后仅可自己欣赏或个人使用，不能用作业用途。
			</view>
			
			<view class="notice-main-title">
				下载壁纸提示请求频繁？
			</view>
			<view class="notice-main-text">
				同一张壁纸，不能重复下载，防止有些用户误操作，重复对一张图片下载而浪费你的存储空间，也是为了防止被恶意频繁请求。
			</view>
			
			<view class="notice-main-title">
				进入图片预览后，大图无法展现？
			</view>
			<view class="notice-main-text">
				有时壁纸会比较大，收到服务器带宽及你的网络环境影响，有时间加载会比较慢，需要用户耐心等待，或者返回上一层后重新进入再查看。
			</view>
			
			<view class="notice-main-title">
				如果你觉得图片侵权了？
			</view>
			<view class="notice-main-text">
				图片来自于网络，由用户自行上传，所有监管不能及时，如果被侵权了，请提供侵权证据，反馈给管理VX:this_wz,进行删除。
			</view>
			
		</view>
		
		<view class="notice-count">
			阅读 781
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.notice {
	padding: 50rpx 30rpx;
	&-title {
		font-size: 36rpx;
		margin-bottom: 30rpx;
	}
	
	&-info {
		color: $text-font-color-2;
		font-size: 24rpx;
		margin-bottom: 50rpx;
	}
	
	&-main {
		&-title {
			font-size: 40rpx;
			font-weight: 600;
			margin-bottom: 10rpx;
		}
		
		&-text {
			line-height: 40rpx;
			margin-bottom: 50rpx;
		}
	}
	
	&-count {
		color: $text-font-color-2;
		font-size: 24rpx;
	}
	
}
</style>
