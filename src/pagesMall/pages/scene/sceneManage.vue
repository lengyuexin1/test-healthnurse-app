<template>
    <view class="container">
        <z-paging
            ref="paging"
            v-model="dataList"
            :auto="true"
            @query="queryList"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template #top>
                <customNavbar pageTitle="场景管理"></customNavbar>
            </template>
            <template #bottom>
                <u-safe-bottom></u-safe-bottom>
            </template>
            <view class="manabox page-public-bg">
                <block v-for="(item,index) in dataList" :key="index">
                    <view class="manali row i-center j-between" @click="gotoSceneServer">
                        <view class="row i-center">
                            <view class="manaimg">
                                <u-image :src="getAssetsUrl('/empty/empty_icon_data.png')" width="68rpx" height="68rpx" shape="circle"></u-image>
                            </view>
                            <view class="mananame">客厅</view>
                        </view>
                        <u-icon name="arrow-right" color="#BEBEBE" size="32rpx"></u-icon>
                    </view>
                </block>
            </view>
        </z-paging>
        <view @click="scanCode" style="position:fixed;right:40rpx;bottom:160rpx;width:120rpx;height:120rpx;font-size:28rpx;color:#fff;background:#bebebe;border-radius:50%;text-align:center;line-height:120rpx;">扫码绑定</view>
    </view>
</template>

<script>
import { getAssetsPic } from "@/common/setPicture.js"
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { gotoSceneServer, gotoPersonnel } from "@/route/wisdom-routes"
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
    methods: {
        queryList() {
            // this.$refs.paging.reload()
            this.$refs.paging.complete([1, 2, 3, 4])
        },
        gotoSceneServer() {
            gotoSceneServer()
        },
        scanCode() {
            /* uni.scanCode({
                success: res => {
                    console.log("扫码成功", res)
                },
                fail: err => {
                    console.log("扫码失败", err)
                }
            }) */
            gotoPersonnel()
        }
    }
}
</script>

<style lang="scss" scoped>
.manabox{
    padding: 20rpx;

    .manali{
        margin-bottom: 20rpx;
        background-color: #FFFFFF;
        border-radius: 24rpx;
        padding: 0 52rpx 0 24rpx;
        height: 132rpx;
        box-sizing: border-box;

        .mananame{
            font-weight: 400;
            font-size: 28rpx;
            color: #333333;
            margin-left: 20rpx;
        }
    }
}
</style>
