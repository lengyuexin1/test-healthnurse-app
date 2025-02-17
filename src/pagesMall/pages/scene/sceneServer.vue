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
                <customNavbar bgColor="#ffffff" pageTitle="场景服务"></customNavbar>
                <view class="utili row i-center">
                    <u-image src="/static/default_avatar.png" width="96rpx" height="96rpx" shape="circle"></u-image>
                    <view class="utiltit">{{ patientName }}</view>
                </view>
            </template>
            <template #bottom>
                <u-safe-bottom></u-safe-bottom>
            </template>
            <view class="manabox">
                <!-- <view class="manatit">卧室</view> -->
                <block v-for="(item,index) in dataList" :key="index">
                    <serverItem>
                        <template #right>
                            <view class="manarig">
                                <u-switch @change="switchChange($event, item)" v-model="item.checkout" size="23" activeColor="#29C86F" inactiveColor="#DFDFDF"></u-switch>
                            </view>
                        </template>
                    </serverItem>
                </block>
            </view>
        </z-paging>
        <!-- <view class="sceadd">
            <u-image @click="gotoSceneIncrease" src="@/Mall/static/scene-add.svg" width="108rpx" height="108rpx"></u-image>
        </view> -->
    </view>
</template>

<script>
import { getAssetsPic } from "@/common/setPicture.js"
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import serverItem from "./components/serverItem.vue"
// import { gotoSceneIncrease } from "@/route/wisdom-routes"
import { getServiceList, serviceStatus } from "@/api/wisdom-api"
export default {
    components: {
        customNavbar,
        serverItem
    },
    data() {
        return {
            dataList: [],
            patientId: '',
            patientName: ''
        }
    },
    computed: {
        getAssetsUrl() {
            return (str) => {
                return getAssetsPic(str)
            }
        }
    },
    onLoad(options) {
        this.patientId = options.patientId
        this.patientName = options.name
    },
    methods: {
        queryList(pageNumber, pageSize) {
            // this.$refs.paging.reload()
            getServiceList({
                pageNumber,
                pageSize,
                query: {
                    patientId: this.patientId
                }
            }).then(res => {
                this.$refs.paging.complete(res)
            }).catch(() => {
                this.$refs.paging.complete(false)
            })
        },
        switchChange(e, item) {
            console.log(e, item)
            serviceStatus(item.id, e ? 1 : 0).then(() => {
                uni.$u.toast("修改成功")
            }).catch(err => {
                uni.$u.toast(err)
                item.checkout = !e
            })
        }
        // gotoSceneIncrease() {
        //     gotoSceneIncrease()
        // }
    }
}
</script>

<style lang="scss" scoped>
.utili{
    height: 176rpx;
    background: #FFFFFF;
    padding: 0 40rpx;
    border-top: 2rpx solid #F2F2F2;

    .utiltit{
        font-weight: 500;
        font-size: 32rpx;
        color: #666666;
        margin-left: 20rpx;
    }
}

.manabox{
    padding: 20rpx;

    .manatit{
        font-weight: bold;
        font-size: 32rpx;
        color: #000002;
        margin-bottom: 18rpx;
    }

    .manarig{
        margin-left: 80rpx;
    }
}

.sceadd{
    width: 108rpx;
    height: 108rpx;
    position: fixed;
    right: 40rpx;
    bottom: 160rpx;
}
</style>
