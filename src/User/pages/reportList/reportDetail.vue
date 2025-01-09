<template>
    <view>
        <view class="bar"></view>
        <view class="item pd70 tn-flex-column tn-flex-center">
            <image class="icon" :src="getAssetsUrl('/leyou/icon/report-wait.png')" mode="scaleToFill" v-if="data.detail.status == 0" />
            <image class="icon" :src="getAssetsUrl('/leyou/icon/report-do.png')" mode="scaleToFill" v-else-if="data.detail.status == 1" />
            <text class="status">{{ status }}</text>
        </view>
        <view class="bar"></view>
        <view class="item">
            <view class="title">举报详情</view>
            <view class="list">
                <view class="tn-flex-row tn-mt-sm">
                    <view class="arr">举报内容：</view>
                    <view class="tn-flex-1">{{ data.detail.objectName }}</view>
                </view>
                <view class="tn-flex-row tn-mt-sm">
                    <view class="arr">举报时间：</view>
                    <view class="tn-flex-1">{{ formatDatetime }}</view>
                </view>
                <view class="tn-flex-row tn-mt-sm">
                    <view class="arr">举报理由：</view>
                    <view class="tn-flex-1">{{ data.detail.reasonTypeName }}</view>
                </view>
                <view class="tn-flex-row tn-mt-sm">
                    <view class="arr">举报描述：</view>
                    <view class="tn-flex-1">{{ data.detail.desc || '无' }}</view>
                </view>
                <view class="tn-mt-sm" v-if="data?.detail?.images?.length">
                    <TnPhotoAlbum :data="data.detail.images" :column="4" />
                </view>
            </view>
        </view>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import TnPhotoAlbum from '@tuniao/tnui-vue3-uniapp/components/photo-album/src/photo-album.vue'
import { reportDetail } from '@/api/user-api'
import dayjs from 'dayjs'

interface Data {
    detail: any
}

const data = reactive<Data>({
    detail: {}
})

const bcNotify = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

// 状态
const status = computed(() => {
    if (data.detail.status === 0) {
        return '举报受理中'
    }
    return '已处理'
})

// 时间
const formatDatetime = computed(() => {
    const datetime = dayjs(data.detail.utcCreated * 1000)
    return datetime.format('YYYY-MM-DD HH:mm:ss')
})

onLoad((options) => {
    reportDetail(options?.id).then((res: any) => {
        data.detail = res
        uni.setNavigationBarTitle({ title: data.detail.typeName + '举报' })
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
})

</script>

<style lang="scss" scoped>
.item {
    padding: 30rpx;
    background-color: white;

    .icon {
        width: 160rpx;
        height: 160rpx;
    }

    .status {
        margin-top: 20rpx;
        font-weight: bold;
        font-size: 36rpx;
        color: #333333;
    }

    .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
    }

    .list {
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #666666;

        .arr {
            width: 146rpx;
        }
    }
}

.bar {
    width: 100%;
    height: 15rpx;
    background-color: #F2F4F5;
}

.pd70 {
    padding: 70rpx 0;
}
</style>
