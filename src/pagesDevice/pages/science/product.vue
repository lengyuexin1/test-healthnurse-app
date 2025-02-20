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
                <view style="background:linear-gradient(180deg, #DFF7EF 20%, #F8F9F9 100%);">
                    <customNavbar bgColor="transparent" :pageTitle="data.pageTitle"></customNavbar>
                    <view style="padding: 30rpx 20rpx;">
                        <TnSearchBox placeholder="请输入产品信息" bg-color="#fff" v-model="data.keyword"
                                     @search="custom"
                        ></TnSearchBox>
                    </view>
                </view>
            </template>
            <template #bottom>
                <!--                <u-safe-bottom></u-safe-bottom>-->
            </template>

            <view class="asortbox">
                <view class="asortli row i-center" v-for="item in data.dataList" :key="item.id"
                      @click="linkScienceProduct(item.id)">
                    <image :src="item.productThumb" style="width: 44rpx;height: 44rpx;"></image>
                    <view class="asortxt u-line-1">{{ item.productName }}</view>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script lang="ts" setup>
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import TnSearchBox from '@tuniao/tnui-vue3-uniapp/components/search-box/src/search-box.vue'
import { gotoScienceDetail } from "@/routes/care-routes"
import { getAssetsPic } from "@/common/setPicture.ts"
import { productshowList } from "@/api/smart-api"
import { computed, reactive, ref } from "vue"
import { onLoad } from '@dcloudio/uni-app'

interface Data {
    pageTitle: string;
    godsId: string;
    keyword: string;
    dataList: any[]
}

const data = reactive<Data>({
    pageTitle: "",
    godsId: "",
    keyword: "",
    dataList: []
})
const getAssetsUrl = computed(() => {
    return (str: string) => {
        return getAssetsPic(str)
    }
})
const paging = ref()
onLoad((options) => {
    data.pageTitle = options.name
    data.godsId = options.id
})
const linkScienceProduct = (id) => {
    gotoScienceDetail({ id })
}
const queryList = (pageNumber, pageSize) => {
    productshowList({
        pageNumber,
        pageSize,
        query: {
            name: data.keyword,
            categoryId: data.godsId
        }
    }).then(res => {
        paging.value.complete(res.data)
        data.keyword = ""
    }).catch(() => {
        paging.value.complete(false)
    })
}
const custom = (e) => {
    console.log(e)
    paging.value.reload()
}
</script>

<style lang="scss" scoped>
.asortbox {
    padding: 30rpx 20rpx;

    .asortli {
        height: 148rpx;
        background: #FFFFFF;
        border-radius: 16rpx;
        box-sizing: border-box;
        padding: 30rpx;
        margin-bottom: 16rpx;

        .asortxt {
            font-weight: bold;
            font-size: 30rpx;
            color: #333333;
            margin-left: 24rpx;
        }
    }
}
</style>
