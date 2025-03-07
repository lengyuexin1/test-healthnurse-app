<template>
    <view class="container">
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
                <PageTopbg :zIndex="-1"></PageTopbg>
                <bc-page-navbar :title="'我的关注'"></bc-page-navbar>

                <view class="top_box">
                    <view class="author">
                        <view class="author_item" v-for="item in data.attentionList" :key="item.followId">
                            <view class="author_img_box" @click="clickauthor(item)">
                                <image
                                    class="author_img"
                                    :src="item.accountId == 999 ? getAssetsUrl(item.followImage) : item.followImage"
                                    mode="scaleToFill"
                                    :class="{ 'click_author': item.accountId == data.accountId }"
                                />
                            </view>
                            <view class="author_text">
                                {{ item.followName }}
                            </view>
                        </view>
                    </view>
                </view>

                <view class="content_title">最新内容</view>

            </template>

            <view class="page_content">
                <WaterfallsFlow :wfList="data.dataList" @waterItem="waterItem"></WaterfallsFlow>
            </view>


		    <BCNotify ref="bcNotify"></BCNotify>


        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import BCNotify from '@/components/notify/index.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { getAssetsPic } from '@/common/setPicture'
import { PlatformManage } from "@bc/sys"
import { gotoIndex } from "@/routes/public-routes"
import { getcoursefollowList, getappcontentList } from '@/api/create-api'
import WaterfallsFlow from '../../channel/components/WaterfallsFlow.vue'
import { gotovideoPreview, gotoarticledetails } from '@/routes/create-routes'
import { TempStorage } from "@bc/base"


// interface Props {
// }
// const props = defineProps<Props>()

interface Data {
    dataList:any,
    attentionList:any,
    accountId: string | null,
}
const data = reactive<Data>({
    dataList: [],
    attentionList: [],
    accountId: ''
})

onMounted(() => {


})

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})



const paging = ref()
const queryList = (pageNumber:number, pageSize:number) => {

    if (pageNumber == 1) {
        getcoursefollowList({
            query: {
                isFans: 0,
                happyType: null
            },
            pageNumber: 1,
            pageSize: 100
        }).then((res:any) => {
            data.attentionList = [
                ...res.data
            ]
        })
    }
    getappcontentList({
        query: {
            isFans: 1,
            categoryId: null,
            status: 3,
            isRecommended: null,
            happyType: null,
            accountId: !data.accountId ? null : data.accountId
        },
        pageNumber,
        pageSize
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    })
}

const bcNotify = ref()

const clickauthor = (item:any) =>  {

    console.log('关注作者', item)

    if (data.accountId == item.accountId) {
        data.accountId = null
    }
    else {
        data.accountId = item.accountId
    }
    (paging.value as any).reload()

}


const goback = () => {
    const pages = getCurrentPages()
    if (pages.length == 1) {
        gotoIndex()
        return
    }

    uni.navigateBack()
}

const waterItem = (item:any) => {
    console.log('item', item)
    if (item.type == 1 || item.type == 3) {
        gotoarticledetails({ id: item.id })
        return
    }
    if (item.type == 2) {
        const listId = TempStorage.savewx({
            videoIdlist: [item.id]
        })
        gotovideoPreview({ videoId: item.id, videoPagetype: 0, categoryId: 10 })
    }
}

</script>

<style lang="scss" scoped>
.top_box{
    margin-bottom: 30rpx;
    .author{
        display: flex;
        overflow-x: auto;
        width: 100%;
        padding: 22rpx 26rpx;
        padding-bottom: 44rpx;
        box-sizing: border-box;
        background: #fff;
        border-bottom: 2rpx solid #F2F2F2;
        .author_item{
            width: 110rpx;
            height: 104rpx;
            margin-right: 18rpx;
            .author_img_box{
                margin-bottom: 10rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                .author_img{
                    width: 92rpx;
                    height: 92rpx;
                    border-radius: 50%;
                    &.click_author{
                        border: 2rpx solid #FF3030;
                        box-sizing: border-box;
                    }
                }
            }
            .author_text{
                text-align: center;
                font-size: 26rpx;
                color: #333333;
                width: 100%;
                white-space: nowrap; /*强制一行内显示*/
                overflow: hidden;/*溢出隐藏*/
                text-overflow: ellipsis;/*超出部分现实省略号*/
            }
        }
    }
}
.content_title{
    padding: 0rpx 20rpx;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 32rpx;
    color: #333333;
    font-weight: 600;
    margin-bottom: 30rpx;
}
.page_content{
    padding: 0rpx 10rpx;
    box-sizing: border-box;
}
</style>
