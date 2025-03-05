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
            :auto-show-back-to-top="true"
        >
            <template #top>
                <PageTopbg :zIndex="-1" :addheight="250" :bgstyle="'background: #F8F8F8;'"></PageTopbg>
                <bc-page-navbar :title="'关注'" ></bc-page-navbar>
            </template>

            <view>
                <indexfollowList></indexfollowList>
                <view class="index_WaterFall_box" v-if="data.dataList.length != 0">
                    <view class="all_content_title">我关注的内容</view>
                    <indexWaterFall :wfList="data.dataList" :is_statistics="false" @waterItem="allwaterItem" :isfollow="1"></indexWaterFall>
                </view>
            </view>

            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { onLoad } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'
import { newCourseCategory, followContentList } from "@/api/create-api"

import BCNotify from '@/components/notify/index.vue'
import indexfollowList from '../platform/components/indexfollowList.vue'
import indexWaterFall from '../platform/components/indexWaterFall.vue'

// import { gotoarticleClassPage } from '@/routes/service-routes'
import { TempStorage } from "@bc/base"

import { gotoarticledetails, gotovideoPreview, gotocourseVideo, gotosalonPostsDetailPage } from '@/routes/create-routes'

interface Data {
    dataList: any
}
const data = reactive<Data>({
    dataList: []
})


const bcNotify = ref()

onMounted(async () => {

})


const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onLoad((option:any) => {
})

const paging = ref(null)
const queryList = async (pageNumber:number, pageSize:number) => {
    followContentList({
        pageNumber,
        pageSize,
        query: {}
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    })

}

const allwaterItem = (item:any) => {
    // 关注的云课堂内容
    if (item.moduleType == 2) {
        const listId = TempStorage.savewx({
            videoIdlist: [item.id]
        })
        gotocourseVideo(listId)
    }
    // 关注的沙龙内容
    if (item.moduleType == 3) {
        gotosalonPostsDetailPage({
            id: item.id
        })
    }
    // 其他板块内容
    if (item.moduleType == 98 || item.moduleType == 1 || item.moduleType == 4 || item.moduleType == 5 || item.moduleType == 6) {
        item.type == 3 && gotoarticledetails({
            id: item.id
        })
        item.type == 2 && gotovideoPreview({ videoId: item.id, videoPagetype: 2 })

        item.type == 1 && gotoarticledetails({ id: item.id })
    }

    console.log('item', item)
    return
}



defineExpose({
})

</script>

<style lang="scss" scoped>
.index_WaterFall_box{
    padding: 0rpx 10rpx;
    padding-top: 20rpx;
    box-sizing: border-box;
    background: #fff;
    .all_content_title{
        font-weight: 500;
        font-size: 30rpx;
        color: #333333;
        padding-left: 24rpx;
        padding-bottom: 10rpx;
        box-sizing: border-box;
    }
}

</style>
<style>
page{
    background: #F8F8F8;
}
</style>
