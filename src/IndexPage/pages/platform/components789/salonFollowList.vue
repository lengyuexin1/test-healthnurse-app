<template>
    <view class="container">
        <view class="my_follow_box" v-if="followList.length > 0">
            <view class="my_follow_title">我的关注</view>
            <view class="my_follow_scroll">
                <view class="scroll_box">
                    <view class="author_box" v-for="item in followList" :key="item.id" @click="changeauthor(item)">
                        <view class="author_img_box">
                            <image
                                class="avatar_img"
                                :class="{ 'is_follow' : data.followId == item.followId }"
                                :src="item.followImage"
                                mode="aspectFill"
                            />
                            <view class="isRedBot" v-if="item.redDotCnt > 0"></view>

                        </view>
                        <view class="author_name">{{ item.followName }}</view>
                    </view>
                </view>
            </view>
        </view>

        <view class="discussList">
			<view class="discuss_item" v-for="(item,index) in props.dataList" :key="index" @click="tosalonPostsDetailPage(item)"> 
				<view class="discuss_item_left">
					<view class="discuss_item_left_icon">
						<image :src="getAssetsUrl('/leyou/icon/ly_msg.png')" mode=""></image>
					</view>
					<view class="discuss_item_left_num">
						<!-- {{ item.cntComment }} -->
                        {{ Math.floor(Math.random() * 900) + 100 }}

					</view>
				</view>
				<view class="discuss_item_content">
					<view class="discuss_item_content_title">
						#{{item.title}}
					</view>
					<view class="discuss_item_content_box">
						<view class="discuss_item_content_img">
							<image :src="item.accountThumb" mode=""></image>
						</view>
						<view class="discuss_item_content_name">
							{{ item.accountName }}
						</view>
						<view class="discuss_item_content_time">
							{{ timeformat(item.utcCreated) }} 发布
						</view>
					</view>
				</view>
				<view class="discuss_item_right">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>

			</view>
		</view>
        
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

import { getAssetsPic } from '@/common/setPicture'
import { gotocourseVideo, gotosalonPostsDetailPage } from '@/routes/create-routes'
import { TempStorage } from "@bc/base"
import { formattime } from '@/common/formatTime'

interface Props {
    followList:any,
    dataList:any,
}
const props = defineProps<Props>()

interface Data {
    followId:string
}
const data = reactive<Data>({
    followId:''
})

interface Events {
    (e: 'change', item: any): void
}
const emit = defineEmits<Events>()

const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY-MM-DD')
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(() => {
    console.log('传入列表1',props.dataList);
})

const changeauthor = (item:any) => {
    data.followId = item.followId
    emit('change',item)
}



const tosalonPostsDetailPage = (item:any) => {
	gotosalonPostsDetailPage({
		id:item.id
	})
}


</script>
  
<style lang="scss" scoped>
.container{
    padding: 10rpx;
    padding-top: 0rpx;
    box-sizing: border-box;
    .class_preview{
        padding: 20rpx;
        box-sizing: border-box;
        border-radius: 6rpx;
        background: #FFFFFF;
        .preview_box_top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20rpx;
            .preview_title{
                font-size: 30rpx;
                color: #333333;
                font-weight: 500;
            }
            .more_box{
                display: flex;
                align-items: center;
                font-weight: 400;
                font-size: 28rpx;
                color: #999999;
            }
        }
    }
    .my_follow_box{
        width: 100%;
        background: #FFFFFF;
        border-radius: 6rpx;
        padding: 20rpx 0rpx 30rpx 20rpx;
        box-sizing: border-box;
        margin-bottom: 20rpx;
         .my_follow_title{
            font-weight: 500;
            font-size: 30rpx;
            color: #333333;
            margin-bottom: 24rpx;

         }
         .my_follow_scroll{
            width: 710rpx;
            overflow-x: scroll;
            .scroll_box{
                display: flex;
                align-items: center;
                .author_box{
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    margin-right: 24rpx;
                }
                .author_img_box{
                    flex-shrink: 0;
                    box-sizing: border-box;
                    margin-bottom: 6rpx;
                    position: relative;
                    .avatar_img{
                        width: 92rpx;
                        height: 92rpx;
                        border-radius: 50%;
                        overflow: hidden;
                        &.is_follow{
                            border: 4rpx solid #EA3E1A;
                        }
                    }
                    .author_name{
                        font-size: 24rpx;
                        font-weight: 400;
                        color: #333333;
                        white-space: nowrap;
                    }
                    .isRedBot{
                        position: absolute;
                        top: 10rpx;
                        right: 0;
                        width: 20rpx;
                        height: 20rpx;
                        border-radius: 50%;
                        background: #FF3030;
                    }
                }
            }
         }
    }
    .course_box{
        padding: 0rpx 10rpx;
        box-sizing: border-box;
        .course_item{
            width: 100%;
            background: #FFFFFF;
            border-radius: 12rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20rpx 24rpx;
            box-sizing: border-box;
            margin-bottom: 20rpx;
            .course_information{
                display: flex;
                .course_img{
                    width: 120rpx;
                    height: 120rpx;
                    border-radius: 8rpx;
                    margin-right: 20rpx;
                }
                .course_text{
                    width: 344rpx;
                    .course_title{
                        font-size: 30rpx;
                        color: #1A1A1A; 
                        font-weight: 500;
                        margin-bottom: 16rpx;
                        width: 100%;
                        white-space: nowrap; 
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .course_author{
                        font-weight: 400;
                        font-size: 20rpx;
                        color: #666666;
                    }
                }
            }
            .course_btn{
                padding: 10rpx 16rpx;
                box-sizing: border-box;
                border-radius: 6rpx;
                background: #EA3E1A;
                font-size: 26rpx;
                font-weight: 400;
                color: #FFFFFF;
            }
        }
        

    }
}
.discussList {
	display: flex;
	flex-direction: column;
	.discuss_item {
		background: #fff;
		border-radius: 16rpx;
		opacity: 0.75;
		padding: 24rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row;
		.discuss_item_left {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 6rpx;
			margin-right: 30rpx;
			.discuss_item_left_icon {
				width: 32rpx;
				height: 32rpx;
				margin-bottom: 4px;
				image {
					width: 32rpx;
					height: 32rpx;
				}
			}
			.discuss_item_left_num {
				font-weight: 400;
				font-size: 10px;
				color: #666666;
			}
		}
		.discuss_item_content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.discuss_item_content_title {
				font-size: 28rpx;
				color: #333333;
				margin-bottom: 10rpx;
				font-weight: 600;
				width: 420rpx;
				line-height: 20px !important;
				display: -webkit-box;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
			.discuss_item_content_box {
				display: flex;
				flex-direction: row;
				align-items: center;
				.discuss_item_content_img {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
					
					image{
						width: 30rpx;
						height: 30rpx;
						border-radius: 50%;
					}
				}
				.discuss_item_content_name {
					font-weight: 400;
					font-size: 12px;
					color: #666666;
					margin-right: 24rpx;
                    width: 150rpx;
                    white-space: nowrap; 
                    overflow: hidden;
                    text-overflow: ellipsis;
				}
				.discuss_item_content_time {
					font-weight: 400;
					font-size: 12px;
					color: #999999;
				}
			}
		}
		.discuss_item_right {
			width: 132rpx;
			height: 132rpx;
			border-radius: 8rpx;
			margin-left: 20rpx;
			image {
				width: 132rpx;
				height: 132rpx;
				border-radius: 8rpx;
			}
		}
        
	}
}
</style>
  