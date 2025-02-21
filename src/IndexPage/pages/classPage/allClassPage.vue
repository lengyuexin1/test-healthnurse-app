<template>
    <view class="container">
        <z-paging ref="paging" :auto="true" :fixed="true" :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }" :auto-show-back-to-top="true">
            <template #top>

                <PageTopbg :zIndex="-1" :addheight="160"
                    :bgstyle="'background: linear-gradient( 180deg, #e4f6f0 0%, #dff7ef 100%);'"></PageTopbg>
                <bc-page-navbar :title="'全部分类'"></bc-page-navbar>
            </template>

            <view class="menu_list" v-if="showList">
                <view class="menu_item" v-for="(item, index) in dataListTwo" :key="index">
                    <view class="menu_title">{{ item.name }}</view>
                    <view class="icon_list">
                        <view class="icon_item" v-for="(sonItem, ind) in item.sonList" :key="ind"
                            @click="toClassPage(sonItem, sonItem)">
                            <image class="item_img" :src="sonItem.icon" mode="scaleToFill" />
                            <view class="item_text">{{ sonItem.name }}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="noneData" v-else>
                <image class="imgBox" :src="getAssetsUrl('/empty/empty_icon_data.png')"></image>
            </view>
        </z-paging>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAssetsPic } from '@/common/setPicture'
import { allColm, setPageBank } from "@/api/setite-api"
import { gotoZone } from "@/routes/active-routes"

interface Data {
    dataList: any
}
const data = reactive<Data>({
    dataList: [],
})

const dataListTwo: any = ref([])
const showList = ref(false)

onMounted(async () => {

})


const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

onLoad((option: any) => {
    getData(option.type)
})

const getData = (num: number) => {
    setPageBank(num).then(res => {
        const dataList = res.recordList.filter((item: any) => item.moduleId == 2)
        if (dataList.length > 0) {
            const sendData = {
                ids: dataList[0].dataIds
            }
            allColm(sendData).then(res => {
                dataListTwo.value = res
                showList.value = res.some(item => item.sonList.length > 0)
            })
        }
    })
}

const paging = ref(null)

const toClassPage = (item: any, sonItem: any) => {
    gotoZone(item.id, item.name)
}


defineExpose({
})

</script>

<style lang="scss" scoped>

.noneData {
    width: 100%;
    display: flex;
    justify-content: center;
}
.imgBox {
    width: 600rpx;
    height: 500rpx;
}
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
