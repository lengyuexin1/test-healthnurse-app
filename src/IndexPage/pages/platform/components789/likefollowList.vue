<template>
    <view class="container">
        <view class="content_follow">
            <view class="my_follow_box" v-if="followList.length">
                <view class="my_follow_title">我的关注</view>
                <view class="my_follow_scroll">
                    <view class="scroll_box">
                        <view class="author_box" v-for="(item,index) in followList" :key="item.id" @click="changeauthor(item,index)">
                            <view class="author_img_box">
                                <image
                                    class="avatar_img"
                                    :class="{ 'is_follow' : data.followIndex == index }"
                                    :src="item.followImage"
                                    mode="aspectFill"
                                />
                            </view>
                            <view class="author_name">{{ item.followName }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        
        <view class="course_box">
            <likeWaterFall ref="likechatList" :wfList="props.dataList" @waterItem="clickwaterItem"></likeWaterFall>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

import likeWaterFall from './likeWaterFall.vue'
import { getAssetsPic } from '@/common/setPicture'
import { gotocourseVideo, gotochatDetail, gotovideoPreview } from '@/routes/create-routes'
import { TempStorage } from "@bc/base"

interface Props {
    followList:any,
    dataList:any,
}
const props = defineProps<Props>()

interface Data {
    followId:string,
    followIndex: number,
}
const data = reactive<Data>({
    followId:'',
    followIndex: 0
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
})

const changeauthor = (item:any,index:number) => {
    data.followIndex = index
    emit('change',item)
}

const clickwaterItem = (item:any) =>{
    // const listId = TempStorage.savewx({
    //     videoIdlist:[item.id],
    // })
    // gotocourseVideo(listId)
    item.type == 3 && gotochatDetail({id:item.id});
    item.type == 2 && gotovideoPreview({videoId:item.id,videoPagetype:1});
}


const likechatList = ref()
const loadList = () => {
    (likechatList.value as any).loadList()
}

defineExpose({
    loadList
})

</script>
  
<style lang="scss" scoped>
.container{
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
    .content_follow{
        padding: 0rpx 10rpx;
        box-sizing: border-box;
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
                    }
                    .author_name{
                        font-size: 24rpx;
                        font-weight: 400;
                        color: #333333;
                        white-space: nowrap;
                        width: 110rpx;
                        white-space: nowrap; 
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }
    
}
</style>
  