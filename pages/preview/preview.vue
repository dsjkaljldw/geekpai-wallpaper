<template>
	<view class="preview" v-if="currentInfo">
		<swiper
			circular
			:current="currentIndex"
			@change="handleChange"
		>
			<swiper-item v-for="(item, index) in classList" :key="item._id">
				<image v-if="cacheList.includes(index)" @click="handleMask" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<view class="mask" v-if="maskStatus">
			<view class="back" :style="{top: statusBarHeight + 'px'}" @click="handleBack">
				<uni-icons type="left" size="20" color="rgba(255,255,255, 0.7)"></uni-icons>
			</view>
			<view class="top">
				<view class="count">{{currentIndex  + 1}} / {{classList.length}}</view>
				<view class="time">
					<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
				</view>
				<view class="date">
					<uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat>
				</view>
			</view>
			
			<view class="bottom">
				<view class="bottom-item" @click="handlePopup">
					<uni-icons type="info" size="24"></uni-icons>
					<view>信息</view>
				</view>
				<view class="bottom-item" @click="handleStarPopup">
					<uni-icons type="star" size="24"></uni-icons>
					<view>{{currentInfo.score}}分</view>
				</view>
				<view class="bottom-item" @click="handleDownload">
					<uni-icons type="download" size="24"></uni-icons>
					<view>下载</view>
				</view>
			</view>
		</view>
	</view>
	
	<uni-popup ref="starPopup"  v-if="currentInfo">
		<view class="star-popup">
			<view class="popup-title">
				<view class="popup-title-text">
					{{isScore ? '您已评分~' : '壁纸评分'}}
				</view>
				<view class="popup-title-close" @click="closeStarPopup">
					<uni-icons type="closeempty" size="20" color="#888"></uni-icons>
				</view>
			</view>
			
			<view class="popup-main">
				<uni-rate :readonly="isScore" v-model="scoreVal" @change="changeScore" size="30"/>
				<text>{{scoreVal}}分</text>
			</view>
			
			<view class="popup-btn">
				<button size="mini" type="default" :disabled="!scoreVal || isScore" plain @click="submitScore">确认评分</button>
			</view>
		</view>
	</uni-popup>
	
	<uni-popup  v-if="currentInfo" ref="infoPopup" type="bottom" background-color="#fff">
		<view class="popup-content">
			<view class="popup-title">
				<view class="popup-title-text">
					壁纸信息
				</view>
				<view class="popup-title-close" @click="closePopup">
					<uni-icons type="closeempty" size="20" color="#888"></uni-icons>
				</view>
			</view>
			
			<scroll-view scroll-y class="popup-main">
				<view class="popup-main-item">
					<view class="label">壁纸ID:</view>
					<view class="desc">{{currentInfo._id}}</view>
				</view>
				<view class="popup-main-item">
					<view class="label">发布者:</view>
					<view class="desc">{{currentInfo.nickname}}</view>
				</view>
				<view class="popup-main-item">
					<view class="label">评分:</view>
					<view class="desc">
						<uni-rate :value="currentInfo.score" :size="18" readonly/> 
						<text class="desc-score">{{currentInfo.score}}分</text>
					</view>
				</view>
				<view class="popup-main-item">
					<view class="label">摘要:</view>
					<view class="desc">{{currentInfo.description}}</view>
				</view>
				<view class="popup-main-item">
					<view class="label">标签:</view>
					<view class="desc" v-for="item in currentInfo.tabs" :key="item">
						<uni-tag inverted circle :text="item" type="primary" custom-style="color: #78A89A; borderColor: #78A89A" />
					</view>
				</view>
			</scroll-view>
			
			<view class="copyright">
				<text>
					声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸D举报至平台，邮箱1161437123@qq.com,管理将删除侵权壁纸，维护您的权益。
				</text>
			</view>
			<view class="safe-area-inset-bottom"></view>
		</view>
	</uni-popup>
</template>

<script setup>
import { ref } from 'vue';
import {onLoad, onUnload, onShareAppMessage, onShareTimeline} from '@dcloudio/uni-app'
import { apiGetSetupScore, apiDetailWall, apiWriteDownload } from'@/api/api.js'

	const currentIndex = ref(0)
	const maskStatus = ref(true)
	const infoPopup = ref(null)
	const starPopup = ref(null)
	const scoreVal = ref(0)
	const classList = ref([])
	const cacheList = ref([])
	const currentInfo = ref(null)
	const isScore = ref(false)
	
	const SYETEM_INFO = uni.getSystemInfoSync()
	const statusBarHeight = ref(SYETEM_INFO.statusBarHeight || 15)
	
	classList.value = handleData(uni.getStorageSync('classList'))
	
	onLoad(async (e) => {
		const {id, type} = e
		if (type === 'share') {
			const res = await apiDetailWall({id})
			classList.value = handleData(res.data)
		}
		currentIndex.value = classList.value.findIndex(item => item._id === id)
		currentInfo.value = classList.value[currentIndex.value] || {}
		setCacheList()
	})
	
	function handleData(arr) {
		return (arr || []).map((item) => {
			return {
				...item,
				picurl: item.smallPicurl.replace('_small.webp', '.jpg')
			}
		})
	}
	
	onUnload(() => {
		// uni.removeStorageSync('classList')
	})
	
	// 返回
	const  handleBack = () => {
		uni.navigateBack({
			fail(err) {
				uni.reLaunch({
					url: '/pages/home/home'
				})
			}
		})
	}
	const handleChange = (e) => {
		currentIndex.value = e.detail.current
		currentInfo.value = classList.value[currentIndex.value] || {}
		setCacheList()
	}
	
	// 评分
	const changeScore = (e) => {
		scoreVal.value = e.value
	}
	
	// 遮罩层
	const handleMask = () => {
		maskStatus.value = !maskStatus.value
	}
	
	// 评分弹窗
	const handleStarPopup = () => {
		if (currentInfo.value.userScore) {
			isScore.value = true
			scoreVal.value = currentInfo.value.userScore
		}
		starPopup.value.open()
	}
	
	const closeStarPopup = () => {
		isScore.value = false
		scoreVal.value = 0
		starPopup.value.close()
		
	}
	
	// 信息弹窗
	const handlePopup = () => {
		infoPopup.value.open()
	}
	
	const closePopup = () => {
		infoPopup.value.close()
	}
	// 提交评分
	const submitScore = async () => {
		await apiGetSetupScore({
			classid: currentInfo.value.classid,
			wallId: currentInfo.value._id,
			userScore: scoreVal.value
		})
		classList.value[currentIndex.value].userScore = scoreVal.value;
		
		uni.setStorageSync('classList', classList.value)
		uni.showToast({
			title:'评分成功',
		})
		closeStarPopup()
	}
	
	// 下载
	const handleDownload = () => {
		// #ifdef H5
		uni.showModal({
			content: "请长按保存壁纸",
			showCancel: false
		})
		// #endif
		
		// #ifndef H5
		uni.showLoading({
			title: '下载中',
			mask: true
		})
		uni.getImageInfo({
				src: currentInfo.value.picurl,
				success: function (res) {
					console.log(res)
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success: async () => {
							uni.showToast({
								title:'下载成功',
								icon: 'none'
							})
							let {classid,_id: wallId} = currentInfo.value;
							let res = await apiWriteDownload({
								classid,
								wallId
							})
						},
						fail(err) {
							console.log(err, 'err');
							if (err.errMsg === 'saveImageToPhotosAlbum:fail cancel') {
								uni.showToast({
									title:'下载失败，请重新点击下载~',
									icon: 'none'
								})
								return 
							}
							if(err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
								uni.showModal({
									title: '提示',
									content: '需要授权保存相册',
									success(res) {
										if(res.confirm) {
											uni.openSetting({
												success(setting) {
													console.log('setting', setting)
													if(setting.authSetting['scope.writePhotosAlbum']) {
														uni.showToast({
															title:'获取授权成功',
															icon: 'none'
														})
													} else {
														uni.showToast({
															title:'获取授权失败',
															icon: 'none'
														})
													}
												}
											})
										}
										
									}
								})
							}
							
						},
						complete() {
							uni.hideLoading()
						}
					});
				}
			});
		// #endif
	}
	
	
	onShareAppMessage(() => {
		return {
			title: 'GeekPai壁纸',
			path: `/pages/preview/preview?id=${currentInfo.value._id}&type=share`
		}
	})
	
	onShareTimeline(() => {
		return {
			title: 'GeekPai壁纸',
			query: `id=${currentInfo.value._id}&type=${share}`
		}
	})
	
	const setCacheList = () => {
		cacheList.value.push(
			currentIndex.value > 0 ? currentIndex.value - 1 : classList.value.length - 1, 
			currentIndex.value, 
			currentIndex.value < classList.value.length - 1 ? currentIndex.value + 1 : 0
		)
		cacheList.value = [...new Set(cacheList.value)]
	}
</script>

<style lang="scss" scoped>
.preview {
	width: 100%;
	height: 100vh;
	
	swiper {
		width: 100%;
		height: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.mask {
		.back {
			position: absolute;
			left: 50rpx;
			border-radius: 50%;
			border: 1rpx solid #888;
			width: 60rpx;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		
		.top {
			position: absolute;
			top: 150rpx;
			left: 50%;
			transform: translate(-50%);
			color: #fff;
			
			.count{
				padding: 8rpx 20rpx;
				width: fit-content;
				margin: 10rpx auto;
				font-size: 26rpx;
				background: rgba(0,0,0,0.1);
				border-radius: 30rpx;
				text-align: center;
				backdrop-filter: blur(10rpx);
			}
			
			.time {
				width: fit-content;
				font-size: 110rpx;
				text-shadow: 0 4rpx rgba(0,0,0,0.3);
			}
			
			.date {
				font-size: 34rpx;
				text-align: center;
				text-shadow: 0 4rpx rgba(0,0,0,0.3);
			}
		}
		
		.bottom {
			position: absolute;
			bottom: 10vh;
			left: 50%;
			transform: translateX(-50%);
			width: 480rpx;
			height: 120rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-radius: 120rpx;
			background-color: #fff;
			
			.bottom-item{
				text-align: center;
				font-size: 28rpx;
				color: $text-font-color-2;
			}
		}
	}
}

.popup-title {
		position: relative;
		height: 110rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		
		&-text {
			font-size: 30rpx;
			color: $text-font-color-2;
		}
		
		&-close {
			position: absolute;
			right: 20rpx;
			top: 26rpx;
			padding: 10rpx;
		}
	}
	


.popup-content {
	max-height: 80vh;
	padding-bottom: 50rpx;
	.popup-main {
		&-item {
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			margin-bottom: 44rpx;
			
			.label {
				text-align: right;
				width: 220rpx;
				font-size: 30rpx;
				color: $text-font-color-3;
			}
			.desc {
				max-width: 500rpx;
				display: flex;
				justify-content: flex-start;
				font-size: 30rpx;
				padding-left: 20rpx;
				
				.desc-score {
					padding-left: 10rpx;
					color: #ffca3e;
				}
			
			}
		}
	}

	.copyright {
		width: 700rpx;
		background-color: #F6F6F6;
		border-radius: 8rpx;
		margin: 0 auto;
		padding: 20rpx 14rpx;
		word-wrap: break-word;
	}
}

.star-popup {
	background-color: #fff;
	height: 340rpx;
	width: 520rpx;
	
	.popup-main {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.popup-btn {
		display: flex;
		justify-content: center;
		margin-top: 30rpx;
	}
}
</style>
