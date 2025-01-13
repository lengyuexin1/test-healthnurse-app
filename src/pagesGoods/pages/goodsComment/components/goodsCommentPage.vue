<template>
    <view class="contraner">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'评论列表'"></bc-page-navbar>
            </template>
            <div class="comment_box">
                <div class="comment_box_title_box">
                    <div class="comment_box_title">全部评论({{data.total}})</div>
                </div>
                <div class="comment_box_item" :class="{ 'not_bottom': data.dataList.length == (index + 1) }" v-for="(item,index) in data.dataList" :key="item.id">
                    <div class="comment_top">
                        <image
                            class="comment_top_img"
                            :src="item.userThumb"
                            mode="scaleToFill"
                        />
                        <div>
                            <div class="comment_top_name">{{ item.userName }}</div>
                            <div class="comment_top_rate">
                                <TnRate v-model="item.score" readonly active-color="#FCCF0A" size="32rpx"></TnRate>
                            </div>
                        </div>
                    </div>
                    <div class="comment_text">
                        {{item.comment}}
                    </div>
                    <div class="comment_img_list" v-if="item.pictures.length > 0">
                        <image
                            v-for="(imgItem,imgIndex) in item.pictures"
                            :key="imgIndex"
                            class="comment_img"
                            :src="imgItem"
                            mode="aspectFill"
                            @click="preImage(imgIndex,item.pictures)"
                        />
                    </div>
                    <div class="shop_reply_comment" v-if="item.reply">
                        商家回复:{{ item.reply }}
                    </div>
                    <div class="comment_time">
                        发布于{{formatTime(item.utcCreated)}}
                    </div>
                </div>
            </div>

        </z-paging>
    </view>
</template>


<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'

import { getAssetsPic } from '@/common/setPicture'
import { agoTime } from '@/common/formatTime'
import { TempStorage } from "@bc/base"
import { PlatformManage } from "@bc/sys"
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'

import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { godsCommList } from "@/api/service-api"


interface Data{
    dataList:any,
    total:number,
}
const data = reactive<Data>({
    dataList:[],
    total:0,
})

interface Props {
    id:string,
    shopId:string
}
const props = defineProps<Props>()


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})
const formatTime = computed(()=>(time:number)=>{
    return agoTime(time)
})


onMounted(()=>{
})


const paging = ref()
const queryList = (pageNumber:number, pageSize:number)=>{
    console.log('刷新');

    godsCommList({
        pageNumber,
        pageSize,
        query: {
            itemId:  props.id,
            shopId:  props.shopId
        }
    }).then((res:any)=>{
        console.log('res',res);
        (paging.value as any).complete(res.data)
        data.total = res.total
    })
    
}

const bcNotify = ref()

// 图片预览
const preImage = (current:number, urls:any) => {
    uni.previewImage({
        current,
        urls
    })
}


</script>

<style lang="scss" scoped>
.contraner{
    .comment_box{
        padding: 36rpx 30rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;
        .comment_box_title_box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 40rpx;
            .comment_box_title{
                color: #333333;
                font-size: 32rpx;
            }
        }
        .comment_box_item{
            margin-bottom: 30rpx;
            padding-bottom: 30rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #F2F2F2;
            &.not_bottom{
                margin-bottom: 0rpx;
                padding-bottom: 0rpx;
                border-bottom: none;
            }
            .comment_top{
                display: flex;
                align-items: center;
                margin-bottom: 28rpx;
                .comment_top_img{
                    width: 68rpx;
                    height: 68rpx;
                    border-radius: 50%;
                    margin-right: 20rpx;
                }
                .comment_top_name{
                    color: #333333;
                    font-size: 28rpx;
                }
            }
            .comment_text{
                margin-bottom: 28rpx;
                line-height: 44rpx;
                color: #333333;
                font-size: 28rpx;
            }
            .comment_img_list{
                width: 100%;
                margin-bottom: 28rpx;
                // display: flex;
                // align-items: center;
                // justify-content: space-between;
                .comment_img{
                    width: 206rpx;
                    height: 150rpx;
                    border-radius: 8rpx;
                    margin-right: 10rpx;
                }
            }
            .shop_reply_comment{
                padding: 24rpx;
                box-sizing: border-box;
                background: #F5F5F5;
                border-radius: 6rpx;
                margin-bottom: 28rpx;
                font-size: 26rpx;
                color: #666;
            }
            .comment_time{
                font-size: 24rpx;
                color: #999999;
            }
        }
    }
}

</style>
