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
            :refresher-enabled="false"
            :loading-more-enabled="false"
        >
            <template #top>
                <customNavbar pageTitle="添加场景服务"></customNavbar>
            </template>
            <template #bottom>
                <view class="manafot">
                    <view class="manabtn">
                        <u-button @click="gotoSceneFactor" :customStyle="{ height: '90rpx' }" shape="circle" color="#29C86F" text="下一步"></u-button>
                    </view>
                    <u-safe-bottom></u-safe-bottom>
                </view>
            </template>
            <view class="manabox page-public-bg">
                <view class="manatit">卧室</view>
                <u-checkbox-group
                    v-model="checkboxValue1"
                    placement="column"
                    @change="checkboxChange"
                >
                    <block v-for="(item,index) in dataList" :key="index">
                        <serverItem>
                            <template #left>
                                <view class="manacheck">
                                    <u-checkbox :name="item.id" shape="circle" activeColor="#29C86F"></u-checkbox>
                                </view>
                            </template>
                        </serverItem>
                    </block>
                </u-checkbox-group>
            </view>
        </z-paging>
    </view>
</template>

<script>
import { getAssetsPic } from "@/common/setPicture.js"
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import serverItem from "./components/serverItem.vue"
import { gotoSceneFactor } from "@/route/wisdom-routes"
export default {
    components: {
        customNavbar,
        serverItem
    },
    data() {
        return {
            dataList: [],
            checkboxValue1: []
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
            this.$refs.paging.complete([{ id: 1, checkout: false }, { id: 2, checkout: true }])
        },
        checkboxChange(e) {
            console.log(e)
        },
        gotoSceneFactor() {
            gotoSceneFactor()
        }
    }
}
</script>

<style lang="scss" scoped>
.manabox{
    padding: 20rpx;

    .manatit{
        font-weight: bold;
        font-size: 32rpx;
        color: #000002;
        margin-bottom: 18rpx;
    }

    .manacheck{
        margin-right: 30rpx;
    }
}
.manafot{
    background-color: #FFFFFF;
    .manabtn{
        padding: 20rpx 30rpx;
    }
}
</style>
