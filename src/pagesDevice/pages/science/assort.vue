<template>
    <view class="container">
        <z-paging
              ref="paging"
              :auto="true"
              v-model="data.dataList"
              @query="queryList"
              :defaultPageSize="10"
              :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
              empty-view-text="暂无数据~"
              :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template #top>
                <!--                <customNavbar pageTitle="康品百科"></customNavbar>-->
                <bc-page-navbar title="产品百科">
                    <template #back>
                        <view @click="goback">
                            <TnIcon name="left" size="38" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>
            </template>
            <template #bottom>
                <!--                <u-safe-bottom></u-safe-bottom>-->
            </template>
            <view class="asortbox row i-center j-between">
                <view class="asortli row i-center" v-for="item in data.dataList" :key="item.id"
                      @click="linkScienceProduct(item.id, item.name)">
                    <image :src="item.icon" style="width: 44rpx;height: 44rpx;"></image>
                    <view class="asortxt u-line-1">{{ item.name }}</view>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script lang="ts" setup>
import { gotoScienceProduct } from "@/routes/care-routes"
import { productCategoryList } from "@/api/smart-api"
import { getAssetsPic } from "@/common/setPicture"
import { computed, reactive, ref } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

interface asorItem {
    id: number,
    name: string,
    img: string
}

interface Data {
    dataList: any,
    asortList: asorItem[]
}

const data = reactive({
    dataList: [],
    asortList: [
        { id: 1, name: '手机数码', img: '/static/browse.svg' },
        { id: 2, name: '手机数码', img: '/static/browse.svg' },
        { id: 3, name: '手机数码', img: '/static/browse.svg' },
        { id: 4, name: '手机数码', img: '/static/browse.svg' },
        { id: 5, name: '手机数码', img: '/static/browse.svg' },
        { id: 6, name: '手机数码', img: '/static/browse.svg' },
        { id: 7, name: '手机数码', img: '/static/browse.svg' }
    ]
})
const paging = ref()

const getAssetsUrl = computed(() => {
    return (str: string) => {
        return getAssetsPic(str)
    }
})
const linkScienceProduct = (id, name) => {
    gotoScienceProduct({ id, name })
}
const goback = () => {
    uni.navigateBack()
}
const queryList = (pageNumber, pageSize) => {
    productCategoryList({
        pageSize,
        pageNumber,
        query: {}
    }).then(res => {
        paging.value.complete(res.data)
    }).catch(() => {
        paging.value.complete(false)
    })
}
</script>

<style lang="scss" scoped>
.asortbox {
    padding: 30rpx 20rpx;
    flex-wrap: wrap;

    .asortli {
        width: 346rpx;
        height: 136rpx;
        background: #FFFFFF;
        border-radius: 12rpx;
        box-sizing: border-box;
        padding: 24rpx;
        margin-bottom: 20rpx;

        .asortxt {
            font-weight: bold;
            font-size: 30rpx;
            color: #333333;
            margin-left: 24rpx;
        }
    }
}
</style>
