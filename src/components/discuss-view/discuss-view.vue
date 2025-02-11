<template>
	<view class="content">
		<!-- <view class="evaluate-each" v-if="false">
			<u-scroll-list :indicator="false">
				<view class="each-list-box" v-for="(pinitm) in mypinglist" :key="pinitm.id">
					<view class="evaluate-each-list" :style="{ backgroundColor: bgColor }">
						<view class="evaluate-each-list-avater row" style="margin-bottom: 20rpx;">
							<u--image :src="pinitm.userAvatar" width="34" height="34" shape="circle" mode="aspectFill">
								<image slot="error" class="evaluate-each-list-avater-img" src="/static/default_avatar.png" mode="aspectFill" resize="cover"></image>
							</u--image>
							<view class="evaluate-each-list-avater-right">
								<text class="evaluate-each-list-avater-right-name">{{pinitm.userName || '--'}}</text>
							</view>
						</view>
						<text class="evaluate-each-list-content u-line-2">
							{{pinitm.comment}}
						</text>
						<view class="evaluate-each-list-img row">
							<block v-for="(itm,ind) in pinitm.pictures"  :key="ind">
								<image class="evaluate-each-list-pic"
									:src="itm" mode="aspectFill"
									@click.stop="showpic(ind,pinitm.pictures)">
								</image>
							</block>
						</view>
					</view>
				</view>
			</u-scroll-list>
		</view> -->

		<view class="evaluateBox">
			<view class="evaluateLi" v-for="(pinitm) in mypinglist" :key="pinitm.id">
				<view class="evaluateMation row i-center">
					<u-image :src="pinitm.userThumb" width="52rpx" height="52rpx" shape="circle" mode="aspectFill">
						<image slot="error" class="evaluMationPic" src="/static/default_avatar.png" mode="aspectFill" resize="cover"></image>
					</u-image>
					<view class="evaluMationRig">
						<view class="evaluMationName">{{pinitm.userName ? pinitm.userName : '--'}}</view>
						<view class="evaluMationGrade">
							<u-rate
								readonly
								:gutter="0"
								active-icon="star-fill"
								inactive-icon="star-fill"
								size="32rpx"
								:count="5"
								:value="pinitm.score"
								inactiveColor="#E1E1E1"
								activeColor="#F32B44"
							></u-rate>
						</view>
					</view>
				</view>
				<view class="evaluateContent u-line-2">{{pinitm.comment}}</view>
				<view class="evaluateImg row i-center">
					<view class="evaluateImgLi" v-for="(ele,elx) in pinitm.pictures" :key="elx">
						<u-image @click="showpic(ele,pinitm.pictures)" v-if="elx < 3" :src="ele" width="210rpx" height="150rpx" radius="8rpx" mode="aspectFill"></u-image>
					</view>
				</view>
                <view v-if="pinitm.reply" class="replybox">商家回复: {{pinitm.reply}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
    name: 'discussView', //讨论/评论组件
    data() {
        return {
            mypinglist: []
        }
    },
    props: {
        bgColor: {
            type: String,
            default: '#FFFFFF'
        },
        pingjia: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        pingjia: {
            handler(val) {
                this.mypinglist = val
            },
            immediate: true
        }
    },
    mounted() {

    },
    methods: {
        // 预览图片
        showpic(index, imgList) {
            uni.previewImage({
                current: index, //预览图片的下标
                urls: imgList //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.evaluateBox{
	.evaluateLi{
		padding: 30rpx 0;
		border-bottom: 2rpx solid #F2F2F2;

		&:last-child{
			border: none;
		}
		.evaluateMation{
			.evaluMationPic{
				width: 52rpx;
				height: 52rpx;
				border-radius: 52rpx;
			}
			.evaluMationRig{
				margin-left: 20rpx;
				.evaluMationName{
					margin-bottom: 4rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
				}
			}
		}
		.evaluateContent{
			margin-top: 18rpx;
			font-size: 24rpx;
			font-weight: 400;
			line-height: 36rpx;
			color: #333333;
		}
		.evaluateImg{
			margin-top: 16rpx;

			.evaluateImgLi{
				margin-right: 10rpx;
				&:nth-child(3n){
					margin-right: 0rpx;
				}
			}
		}
        .replybox{
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




	.each-list-box{
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
		.evaluate-each-list-pic{
			margin-right: 20rpx;
            margin-top: 20rpx;
			border-radius: 8rpx;
			width: 152rpx;
			height: 110rpx;
		}
	}
</style>
