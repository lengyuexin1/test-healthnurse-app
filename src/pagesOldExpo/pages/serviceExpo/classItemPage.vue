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
                <pageTopbg :zIndex="-1" ></pageTopbg>
                <bc-page-navbar :title="data.categoryName" ></bc-page-navbar>


                <view class="top_inp_box">
                    <view class="inp_box" @click="tosearch">
                        <TnIcon name="search" color="#666" size="26"></TnIcon>
                        <view class="inp_text">搜索</view>
                    </view>
                </view>

            </template>

            <view class="content_box">
                <view class="institution_item" v-for="item in data.dataList" :key="item" @click="toServiceStore(item)">
                    <image
                        class="item_left_img"
                        :src="item.shopThumb"
                        mode="aspectFill"
                    />
                    <view class="item_right_text">
                        <view class="right_title">{{ item.shopName }}</view>


                        <view class="price_box">
                            <text class="price_left" v-if="true">
                                <text class="price_number">主要品类: {{ item.categoryNames }}</text>
                            </text>
                            <text v-else></text>
                        </view>
                        <!-- item.itemList -->
                        <view class="package_list" v-if="false">
                            <!-- <view class="package_item" v-for="sonItem in item.itemList" :key="sonItem.id">
                                <image
                                    class="package_icon"
                                    :src="getAssetsUrl('/leyou/serviceIcon/preferential-icon.svg')"
                                    mode="scaleToFill"
                                />
                                <view class="package_text">{{ sonItem.name }}</view>
                            </view> -->
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
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { onLoad } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'
import { healthContentList } from "@/api/create-api"

import { gotosearch,
    gotoServiceExpoClass,
    gotoShopDetail,
    gotoServiceStore
} from '@/routes/service-routes'


import BCNotify from '@/components/notify/index.vue'
import { oldExpoCategory, oldExpolist } from '@/api/goods-api'

import { productList } from '@/api/goods-api'


interface Data {
    dataList: any
    categoryId: string
    categoryName: string
}
const data = reactive<Data>({
    dataList: [],
    categoryId: '',
    categoryName: ''
})


const bcNotify = ref()


onMounted(async () => {
})


onLoad((option:any) => {
    data.categoryId = option.categoryId
    data.categoryName = option.categoryName
})

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})


const paging = ref()
const queryList = async (pageNumber:number, pageSize:number) => {
    oldExpolist({
        pageNumber,
        pageSize,
        query: {
            isRecommend: 0,
            isFavorite: 0,
            categoryId: data.categoryId
        }
    }).then((res:any) => {
        console.log('res', res.data);
        (paging.value as any).complete(res.data)
    }).catch(() => {
        (paging.value as any).complete([])
    })
}


const toServiceStore = (item:any) => {
    console.log('item', item)
    if (item.shopSource == 32) {
        gotoShopDetail(item.shopId)
        return
    }
    gotoServiceStore({ itemId: item.shopId, isAd: 0 })

}

const tosearch = () => {
    gotosearch()
}

defineExpose({
})

</script>

<style lang="scss" scoped>
.top_inp_box{
    padding: 14rpx 20rpx;
    box-sizing: border-box;

    .inp_box{
        width: 100%;
        background: #FFFFFF;
        border-radius: 36rpx;
        display: flex;
        align-items: center;
        padding: 16rpx 20rpx;
        .inp_text{
            font-size: 24rpx;
            font-weight: 400;
            color: #666666;
            margin-left: 8rpx;
        }
    }
}
.content_box{
    background: #FFFFFF;
    border-radius: 32rpx;
    padding: 30rpx;
    box-sizing: border-box;
    .institution_item{
        padding: 20rpx;
        padding-bottom: 0rpx;
        box-sizing: border-box;
        display: flex;

        .item_left_img{
            width: 132rpx;
            height: 132rpx;
            margin-right: 20rpx;
            border-radius: 12rpx;
            overflow: hidden;
        }
        .item_right_text{
            flex:1;
            padding-bottom:12rpx;
            border-bottom:2rpx solid #F0F0F0;
            .right_title{
                color: #333333;
                font-size: 30rpx;
                font-weight: 500;
                margin-bottom: 12rpx;
            }


            .price_box{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 14rpx;
                .price_left{
                    display: flex;
                    align-items: center;
                    color: #8C8C8C;

                    font-size: 20rpx;
                    font-weight: 400;
                }
                .distance{
                    font-size: 24rpx;
                    color: #999999;
                    font-weight: 400;
                }
            }
            .package_list{
                .package_item{
                    display: flex;
                    align-items: center;
                    margin-bottom: 12rpx;

                    .package_icon{
                        width: 30rpx;
                        height: 30rpx;
                        border-radius: 8rpx;
                        margin-right: 12rpx;
                    }
                    .package_text{
                        font-weight: 400;
                        font-size: 22rpx;
                        color: #333333;
                    }
                }
            }

        }
    }
}

</style>
