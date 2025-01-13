<template>
	<view class="container">
		<view class="converli row">
			<view class="converlef row">
				<image class="converimg" src="" mode="aspectFill" resize="cover"></image>
				<view class="converinfo column">
					<text class="infotit">上门免费评估一次</text>
					<text class="infotme">有效期至 2022.04.21 11:00</text>
					<view class="infosay row">
						<text class="saytex">仅限门店使用</text>
					</view>
				</view>
			</view>
			<view class="converbtn">
				<u-button text="立即领取" color="linear-gradient(to bottom, #FF795B, #E4382B)" size="small" shape="circle" @click="employ"></u-button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
// export default {
//     data() {
//         return {

//         }
//     },
//     methods: {
//         employ() {
//             this.$emit('employ', {
//                 coupon_id: 3,
//                 success: (res) => {

//                 }
//             })
//         }
//     }
// }
</script>

<style lang="scss" scoped>
	.converli{
		width: 702rpx;
		height: 190rpx;
		background-image: linear-gradient(to bottom right, #FFFFFF, #FFACAC);
		border-radius: 12rpx;
		padding: 30rpx;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		.converlef{
			align-items: center;
			.converimg{
				width: 130rpx;
				height: 130rpx;
				border-radius: 8rpx;
				margin-right: 24rpx;
			}
			.converinfo{
				.infotit{
					font-size: 32rpx;
					font-weight: bold;
					color: #333333;
				}
				.infotme{
					font-size: 28rpx;
					font-weight: 400;
					color: #666666;
					margin-top: 4rpx;
				}
				.infosay{
					height: 32rpx;
					border-radius: 4rpx;
					margin-top: 18rpx;
					justify-content: flex-start;
					.saytex{
						text-align: center;
						line-height: 32rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #E51E1E;
					}
				}
			}
		}
	}
</style>
