<template>
    <view class="container">
        <z-paging
            ref="paging"
            :auto="true"
            v-model="dataList"
            @query="queryList"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="暂无数据~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template #top><customNavbar pageTitle="智慧场景"></customNavbar></template>
            <template #bottom><u-safe-bottom></u-safe-bottom></template>

            <view class="smartbox page-public-bg row i-center j-between">
                <block v-for="(item) in dataList" :key="item.id">
                    <view class="smartli" @click="linkSmartDetail(item.id)">
                        <u-image :src="item.thumb" width="346rpx" height="230rpx" radius="16rpx 16rpx 0 0"></u-image>
                        <view class="smartmore">
                            <view class="smartit u-line-1">{{ item.name }}</view>
                            <view class="smartdec u-line-2">{{ item.desc }}</view>
                        </view>
                    </view>
                </block>
            </view>
        </z-paging>
    </view>
</template>

<script>
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { getAssetsPic } from "@/common/setPicture"
import { gotoSmartGoods, gotoSmartDetail } from "@/routes/wisdom-routes"
import { sceneList } from "@/api/smart-api"
export default {
    components: {
        customNavbar
    },
    data() {
        return {
            dataList: []
        }
    },
    computed: {
        getAssetsUrl() {
            return (str) => {
                return getAssetsPic(str)
            }
        }
    },
    onLoad() {

    },
    methods: {
        queryList(pageNumber, pageSize) {
            sceneList({
                pageSize,
                pageNumber,
                query: {}
            }).then(res => {
                this.$refs.paging.complete(res)
            }).catch(() => {
                this.$refs.paging.complete([])
            })
        },
        linkSmartDetail(id) {
            gotoSmartDetail(id)
            // gotoSmartGoods(index)
        }
    }
}
</script>

<style lang="scss" scoped>
.smartbox{
    padding: 1rpx 20rpx;
    flex-wrap: wrap;

    .smartli{
        width: 346rpx;
        background: #FFFFFF;
        border-radius: 16rpx 24rpx;
        overflow: hidden;
        box-sizing: border-box;
        margin-bottom: 20rpx;

        .smartmore{
            padding: 20rpx;
            .smartit{
                font-weight: 500;
                font-size: 28rpx;
                color: #090909;
            }
            .smartdec{
                font-weight: 400;
                font-size: 24rpx;
                color: #999999;
                margin-top: 12rpx;
            }
        }
    }

}
</style>
