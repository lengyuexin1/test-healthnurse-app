<template>
    <view class="container">
        <view class="class_preview" v-if="false">
            <view class="preview_box_top">
                <view class="preview_title">课程预告</view>
                <view class="more_box">
                    <view>全部</view>
                    <TnIcon name="right" color="#999999" size="28"></TnIcon>
                </view>
            </view>
            <view class="preview_swiper_box"></view>
        </view>
        <view class="my_follow_box" v-if="followList.length">
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
                        </view>
                        <view class="author_name">{{ item.followName }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="course_box">

            <WaterfallsFlow :wfList="dataList" @waterItem="clickwaterItem"></WaterfallsFlow>

        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getAssetsPic } from '@/common/setPicture'
import { gotocourseVideo } from '@/routes/create-routes'
import { TempStorage } from "@bc/base"
import WaterfallsFlow from './WaterfallsFlow.vue'

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


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(() => {
    console.log('传入列表1',props.dataList);
    console.log('传入关注列表',props.followList);
    
})

const changeauthor = (item:any) => {
    data.followId = item.followId
    emit('change',item)
}

const clickwaterItem = (item:any) =>{
    const listId = TempStorage.savewx({
        videoIdlist:[item.id],
    })
    gotocourseVideo(listId)
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
                    border-radius: 50%;
                    box-sizing: border-box;
                    overflow: hidden;
                    margin-bottom: 6rpx;
                    .avatar_img{
                        width: 92rpx;
                        height: 92rpx;
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
                }
            }
         }
    }
    .course_box{
        // padding: 0rpx 10rpx;
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
</style>
  