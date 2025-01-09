<template>
    <z-paging 
        ref="paging"
        :fixed="true"
        :auto="false"
        v-model="data.dataList"
        @query="queryList"
        :defaultPageSize="10"
        :auto-show-system-loading="false"
        :loading-more-enabled="false"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" 
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        empty-view-text="还没有数据哦~"
        >
        <template #top>
            <view class="top tn-flex-center-between" v-if="data.dataList.length">
                <text>已禁言人数（{{ data.dataList.length }}）</text>
                <view></view>
            </view>
        </template>

        <view class="list_wrap">
            <view class="item tn-flex-center-between" v-for="(item, index) in data.dataList" :key="index">
                <view class="tn-flex-row tn-flex-center">
                    <image class="avatar" :src="item.accountAvatar" mode="scaleToFill" />
                    <text class="name">{{ item.accountName }}</text>
                </view>
                <TnButton plain width="144rpx" height="52rpx" font-size="24rpx" shape="round" border-color="#CCCCCC" text-color="#333333" :debounce="true" @tap="freeBan(item)">
                    解除禁言
                </TnButton>
            </view>
        </view>
            
        <BCNotify ref="bcNotify"></BCNotify>
    </z-paging>
    
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { liveInfo, banSpeakUserList, unBanSpeak } from '@/api/live-api'

interface Data {
    dataList: any
    liveInfoData: any
}

const data = reactive<Data>({
    dataList: [],
    liveInfoData: {}
})

const bcNotify = ref()

const paging = ref()

const getAssetsUrl = computed(()=>(src: string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    if (data.liveInfoData.id) {
        banSpeakUserList({
            pageNumber,
            pageSize,
            query: {
                channelId: data.liveInfoData.id
            }
        }).then((res: any) => {
            paging.value.complete(res.data)
        })
    }
    else {
        paging.value.complete([])
    }
}

const freeBan = (item: any) => {
    unBanSpeak({
        tid: data.liveInfoData.tid,
        id: item.id,
        userId: item.userId
    }).then(() => {
        bcNotify.value.show("解除成功")
    }).finally(() => {
        paging.value.reload()
    })
}

onMounted(() => {
    liveInfo().then((info: any) => {
        if (info == null) {
            paging.value.complete([])
        }
        else {
            data.liveInfoData = info
        }
        paging.value.reload()
    })
})

</script>

<style lang="scss" scoped>
.top {
    margin: 30rpx 30rpx 0 30rpx;
    
    text {
        font-weight: bold;
    }
}

.list_wrap {
    margin: 30rpx;
    padding: 0 40rpx;
    border-radius: 16rpx;
    background-color: #FFFFFF;

    .item {
        padding: 40rpx 0;
        border-bottom: 1rpx solid #EEEEEE;
    }

    .avatar {
        width: 72rpx;
        height: 72rpx;
        margin-right: 20rpx;
        border-radius: 50%;
    }

    .name {
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
    }

    .time {
        font-size: 26rpx;
        color: #666666;
    }
}

</style>
