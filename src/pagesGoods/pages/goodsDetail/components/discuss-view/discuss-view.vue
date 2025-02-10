<template>
	<view class="content">
		<view class="evaluateBox">
			<view class="evaluateLi" v-for="(pinitm) in mypinglist" :key="pinitm.id">
				<view class="evaluateMation row i-center">
					<image class="evaluMationPic" v-if="pinitm.userThumb" :src="pinitm.userThumb" mode="aspectFill" />
					<image class="evaluMationPic" v-else :src="getAssetsUrl('/leyou/static/default_avatar.png')"
						mode="aspectFill" />
					<view class="evaluMationRig">
						<view class="evaluMationName">{{ pinitm.userName ? pinitm.userName : '--' }}</view>
						<view class="evaluMationGrade">
							<TnRate v-model="pinitm.score" size="26rpx" readonly inactive-color="#E1E1E1"
								active-color="#F32B44"></TnRate>
						</view>
					</view>
				</view>
				<view class="evaluateContent u-line-2">{{ pinitm.comment }}</view>
				<view class="evaluateImg row i-center">
					<view class="evaluateImgLi" v-for="(ele, elx) in pinitm.pictures" :key="elx">
						<image class="images" @click="showpic(ele, pinitm.pictures)" v-if="elx < 3" :src="ele"
							mode="aspectFill"></image>
					</view>
				</view>
				<view v-if="pinitm.reply" class="replybox">商家回复: {{ pinitm.reply }}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import { ref, watch, computed } from "vue"
import { getAssetsPic } from '@/common/setPicture'

const props = defineProps({
    bgColor: {
        type: String,
        default: '#FFFFFF'
    },
    pingjia: {
        type: Array,
        default: () => []
    }
})
const mypinglist: any = ref(props.pingjia)
// 预览图片
const showpic = (index: number, imgList: any) => {
    uni.previewImage({
        current: index, //预览图片的下标
        urls: imgList //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
    })
}

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})


</script>

<style lang="scss" scoped>
.evaluateBox {
	.evaluateLi {
		padding: 30rpx 0;
		border-bottom: 2rpx solid #F2F2F2;

		&:last-child {
			border: none;
		}

		.evaluateMation {
			.evaluMationPic {
				width: 52rpx;
				height: 52rpx;
				border-radius: 52rpx;
			}

			.evaluMationRig {
				margin-left: 20rpx;

				.evaluMationName {
					margin-bottom: 4rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
				}
			}
		}

		.evaluateContent {
			margin-top: 18rpx;
			font-size: 24rpx;
			font-weight: 400;
			line-height: 36rpx;
			color: #333333;
		}

		.evaluateImg {
			margin-top: 16rpx;

			.evaluateImgLi {
				margin-right: 10rpx;

				&:nth-child(3n) {
					margin-right: 0rpx;
				}
			}
		}

		.replybox {
			background: #F6F6F6;
			border-radius: 8rpx;
			padding: 20rpx 30rpx;
			margin-top: 24rpx;
			font-size: 26rpx;
			font-weight: 400;
			line-height: 36rpx;
			color: #999999;
		}
	}
}




.each-list-box {
	.evaluate-each-list {
		margin-right: 20rpx;
		border-radius: 8rpx;
		padding: 20rpx;
		width: 548rpx;
		background-color: #F6F6F6;
		// background-image: linear-gradient(to top, #FFFFFF, #B2F3D0);
		border-radius: 16rpx;
	}

	.evaluate-each-list-avater-img {
		width: 68rpx;
		height: 68rpx;
		border-radius: 8rpx;
	}

	.evaluate-each-list-avater-right-name {
		font-size: 30rpx;
		font-weight: 400;
		color: #333333;
	}


	.evaluate-each-list-avater-right {
		padding-right: 25rpx;
		padding-left: 20rpx;
	}

	.evaluate-each-list-content {
		font-size: 28rpx;
		font-weight: 400;
		line-height: 34rpx;
		color: #666666;
		height: 70rpx;
	}

	.evaluate-each-list-img {
		flex-wrap: wrap;
	}

	.evaluate-each-list-pic {
		margin-right: 20rpx;
		margin-top: 20rpx;
		border-radius: 8rpx;
		width: 152rpx;
		height: 110rpx;
	}
}

.images {
	width: 210rpx;
	height: 150rpx;
	border-radius: 8rpx;
}
</style>
