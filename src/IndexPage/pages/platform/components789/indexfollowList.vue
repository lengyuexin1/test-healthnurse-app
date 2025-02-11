<template>
    <view class="container">
        <view class="my_follow_box" @click="todataManage" v-if="data.followList.length != 0">
            <view class="my_follow_title" >
                <view>我的关注</view>
                <view>
                    <TnIcon name="right" size="32" color="#999999"></TnIcon>
                </view>
            </view>
            <view class="my_follow_scroll">
                <view class="scroll_box">
                    <view class="author_box" v-for="item in data.followList" :key="item.id" @click.stop="changeauthor(item)">
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

        <view class="my_follow_salo" v-if="data.saloList.length != 0">
            <view class="my_salo_title">
                <view>我关注的沙龙</view>
                <!-- <view>
                    <TnIcon name="right" size="32" color="#999999"></TnIcon>
                </view> -->
            </view>
            <view class="my_salo_list">
                <view class="discuss_item" v-for="(item,index) in data.saloList" :key="index" @click.stop="tosalonPostsDetailPage(item)"> 
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

    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getAssetsPic } from '@/common/setPicture'
import { gotosalonPostsDetailPage } from '@/routes/create-routes'
import { TempStorage } from "@bc/base"
import { getcoursefollowList, getFollowsalonList } from '@/api/create-api'
import { formattime } from '@/common/formatTime'
import { gotodataManage } from "@/routes/create-routes"

interface Props {
}
const props = defineProps<Props>()


interface Data {
    followId: string
    followList: any
    saloList: any
}
const data = reactive<Data>({
    followId: '',
    followList: [],
    saloList: [],
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
    getcoursefollowList({
        pageNumber: 1,
        pageSize: 20,
        query: {}
    }).then((res:any) => {
        data.followList = res.data
    })

    getFollowsalonList({
        pageNumber: 1,
        pageSize: 3,
        query: {},
        sorts: [{isAsc: false, key: "utcModified"}]
    }).then((res:any) => {
        data.saloList = res.data
    })

})

const changeauthor = (item:any) => {
    todataManage()
}

const todataManage = () => {
    gotodataManage({type: 1,isuser:1})
}

const tosalonPostsDetailPage = (item:any) => {
    gotosalonPostsDetailPage({
		id:item.id
	})
}


</script>
  
<style lang="scss" scoped>
.container{
    .my_follow_box{
        width: 100%;
        background: #FFFFFF;
        border-radius: 6rpx;
        padding: 20rpx 0rpx 30rpx 20rpx;
        box-sizing: border-box;
        margin: 12rpx 0rpx;
        .my_follow_title{
           width: 708rpx;
           font-weight: 500;
           font-size: 30rpx;
           color: #333333;
           margin-bottom: 24rpx;
           display: flex;
           align-items: center;
           justify-content: space-between;
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
                   width: 92rpx;

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
                        width: 100%;
                        white-space: nowrap; /*强制一行内显示*/
                        overflow: hidden;/*溢出隐藏*/
                        text-overflow: ellipsis;/*超出部分现实省略号*/
                    }
               }
           }
        }
    }
    .my_follow_salo{
        background: #fff;
        padding-top: 20rpx;
        // padding-bottom: 12rpx;
        box-sizing: border-box;
        .my_salo_title{
            padding: 0rpx 24rpx;
            box-sizing: border-box;
            width: 100%;
            font-weight: 500;
            font-size: 30rpx;
            color: #333333;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .my_salo_list{
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
        
    }
}
</style>
  