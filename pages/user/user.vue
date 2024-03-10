<template>
	<view class="user pageBg">
		<view :style="{height: 100 + 'rpx'}"></view>	
		<view class="user-info" v-if="userInfo">
			<image src="../../static/images/logo.png" mode="aspectFill"></image>
			<view class="user-ip">
				IP:{{userInfo.IP}}
			</view>
			<view class="user-province">
				{{userInfo.address.city || userInfo.address.province || userInfo.address.country}}
			</view>
		</view>
		
		<view class="user-box" v-if="userInfo">
			<navigator url="/pages/classlist/classlist?name=我的下载&type=download">
				<view class="user-box-item">
					<view class="user-box-item-icon">
						<uni-icons type="download-filled" size="24"></uni-icons>
					</view>	
					<text class="user-box-item-text">我的下载</text>
					<text>{{userInfo.downloadSize}}</text>
					<uni-icons type="right" size="22" color="#888"></uni-icons>
				</view>
			</navigator>
			<navigator url="/pages/classlist/classlist?name=我的评分&type=score">
				<view class="user-box-item">
					<view class="user-box-item-icon">
						<uni-icons type="star-filled" size="24" ></uni-icons>
					</view>	
					<text class="user-box-item-text">我的评分</text>
					<text>{{userInfo.scoreSize}}</text>
					<uni-icons type="right" size="22" color="#888"></uni-icons>
				</view>
			</navigator>
			<view class="user-box-item">
				<view class="user-box-item-icon">
					<uni-icons type="chatboxes-filled" size="24" ></uni-icons>
				</view>	
				<text class="user-box-item-text">联系客服</text>
				<text></text>
				<uni-icons type="right" size="22" color="#888"></uni-icons>
				
				<!-- #ifdef MP -->
				<button open-type="contact">联系客服</button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<button @click="handleCallPhone">拨打电话</button>
				<!-- #endif -->
			</view>
		</view>
		
		<view class="user-box">
			<view class="user-box-item">
				<view class="user-box-item-icon">
					<uni-icons type="notification-filled" size="24" ></uni-icons>
				</view>
				<text class="user-box-item-text">订阅更新</text>
				<text></text>
				<uni-icons type="right" size="22" color="#888"></uni-icons>
			</view>
			<view class="user-box-item">
				<view class="user-box-item-icon">
					<uni-icons type="flag-filled" size="24" ></uni-icons>
				</view>
				<text class="user-box-item-text">常见问题</text>
				<text></text>
				<uni-icons type="right" size="22" color="#888"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {apiUserInfo} from "@/api/api.js"
	import { ref } from "vue";

	const userInfo = ref(null)
	const getUserInfo = async ()=>{
		const res = await apiUserInfo()
		userInfo.value = res.data
	}
	getUserInfo()
	const handleCallPhone = () => {
		uni.makePhoneCall({
			phoneNumber: "114"
		})
	}
</script>

<style lang="scss" scoped>
.user {
	padding-top: 30rpx;
	
	.user-info {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-bottom: 100rpx;
		
		image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			margin-bottom: 30rpx;
		}
		.user-ip {
			font-size: 30rpx;
			margin-bottom: 26rpx;
		}
		.user-province {
			color: #aaa;
			font-size: 30rpx;
			margin-bottom: 26rpx;
		}
	}

	.user-box {
		margin: 0 35rpx 50rpx;
		border: 1px solid #eee;
		background-color: #fff;
		border-radius: 8rpx;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
		
		
		.user-box-item {
			position: relative;
			display: flex;
			align-items: center;
			padding: 26rpx;
			border-bottom: 1px solid #eee;
			.user-box-item-text {
				margin-left: 20rpx;
				flex: 1
			}
			.user-box-item-icon {
				:deep() {
					.uni-icons {
						color: $app-theme-color!important;
					}
				}
			}
			
			button {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
		
		.user-box-item:last-child {
			border-bottom: none;
		}
	}
}


</style>
