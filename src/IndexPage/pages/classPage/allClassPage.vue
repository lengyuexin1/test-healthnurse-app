<template>
    <view class="container">
        <z-paging ref="paging" v-model="data.dataList" :auto="true" :fixed="true" @query="queryList" :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }" :auto-show-back-to-top="true">
            <template #top>

                <PageTopbg :zIndex="-1" :addheight="250"
                    :bgstyle="'background: linear-gradient( 180deg, #e4f6f0 0%, #dff7ef 100%);'"></PageTopbg>
                <bc-page-navbar :title="'全部分类'"></bc-page-navbar>
            </template>

            <view class="menu_list">
                <view class="menu_item" v-for="(item) in data.dataList" :key="item.id">

                    <view class="menu_title">{{ item.name }}</view>
                    <view class="icon_list">
                        <view class="icon_item" v-for="(sonItem) in item.sonCategoryShows" :key="sonItem.id"
                            @click="toClassPage(item, sonItem)">
                            <image class="item_img" :src="sonItem.icon" mode="scaleToFill" />
                            <view class="item_text">{{ sonItem.name }}</view>
                        </view>
                    </view>
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
// import { newCourseCategory } from "@/api/create-api"

import BCNotify from '@/components/notify/index.vue'

// import { gotoarticleClassPage } from '@/routes/service-routes'


interface Data {
    dataList: any
}
const data = reactive<Data>({
    dataList: [],
})

const dataListTwo = [
    {
        name: '4654',
        sonCategoryShows: [{
            sonItem: '74979',
            id: 464,
            name: '7987',
            icon: 'https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_prod/marketing-manage/otherCenter/classManage/2024423174526668.png'
        }, {
            sonItem: '74979',
            id: 464,
            name: '7987',
            icon: 'https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_prod/marketing-manage/otherCenter/classManage/2024423174526668.png'
        }]
    },
    {
        name: '4654',
        sonCategoryShows: [{
            sonItem: '74979',
            id: 464,
            name: '7987',
            icon: 'https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_prod/marketing-manage/otherCenter/classManage/2024423174526668.png'
        }]
    },

]


const bcNotify = ref()

onMounted(async () => {

})


const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

onLoad((option: any) => {
})

const paging = ref(null)
const queryList = async (pageNumber: number, pageSize: number) => {
    // if (pageNumber == 1) {
    //     newCourseCategory({
    //         id: 7
    //     }).then((res:any) => {
    (paging.value as any).complete(dataListTwo);
    //         console.log('data.dataList',data.dataList);
    //     }).catch((err:any)=>{
    //         console.log('err类目',err);
    //         (paging.value as any).complete([])

    //     })
    //     return
    // }

}

const toClassPage = (item: any, sonItem: any) => {
    gotoarticleClassPage({
        title: item.name,
        id: item.id,
        sonId: sonItem.id
    })
}


defineExpose({
})

</script>

<style lang="scss" scoped>
.menu_list {
    padding: 20rpx 0rpx;
    box-sizing: border-box;

    .menu_item {
        padding: 30rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 32rpx;
        margin-bottom: 20rpx;

        .menu_title {
            font-weight: 500;
            color: #333333;
            font-size: 32rpx;
            margin-bottom: 30rpx;
        }

        .icon_list {
            display: grid;
            grid-gap: 30rpx;
            grid-template-columns: auto auto auto auto auto;
            padding: 0rpx 16rpx;
            box-sizing: border-box;

            .icon_item {
                width: 96rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                .item_img {
                    width: 100%;
                    height: 96rpx;
                    margin-bottom: 8rpx;
                }

                .item_text {
                    font-size: 28rpx;
                    color: #333333;
                    font-weight: 400;
                }
            }
        }

    }
}
</style>
<style>
page {
    background: #F8F8F8;
}
</style>
