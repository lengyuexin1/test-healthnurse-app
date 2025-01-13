<template>
    <view class="container">
        <view class="item tn-flex-column" @tap="clickLiveCard">
            <video class="livePlayer" :src="item.m3u8Play" object-fit="fill" :controls="false" :show-fullscreen-btn="false" :show-play-btn="false" autoplay muted v-if="item.m3u8Play"></video>
            <image class="thumb" :src="getAssetsUrl(item.thumb)" mode="aspectFill" v-else-if="item.tag == 'demo'" />
            <image class="thumb" :src="item.thumb" mode="aspectFill" v-else />
            <view class="bottom">
                <view class="title tn-text-ellipsis-1">{{ item.name }}</view>
                <view class="info tn-flex-center-between tn-flex-1">
                    <view class="name-wrap tn-flex-row">
                        <image :src="getAssetsUrl(item.accountAvatar)" mode="scaleToFill" v-if="item.tag == 'demo'" />
                        <image :src="item.accountAvatar" mode="scaleToFill" v-else />
                        <view class="name tn-flex-1 tn-text-ellipsis-1">{{ item.accountName }}</view>
                    </view>
                    <view class="num tn-flex-row">
                        <image class="icon" :src="getAssetsUrl('/leyou/icon/pepole.png')" mode="scaleToFill" />
                        {{ item.cntUser || 0 }}
                    </view>
                </view>
            </view>
        </view>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { gotoLiveShow, gotoSalonDetail, gotowxLive } from '@/routes/create-routes'
import BCNotify from '@/components/notify/index.vue'

interface Props {
    item: any
}

const bcNotify = ref()

const props = defineProps<Props>()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const clickLiveCard = () => {
    if (props.item.businessType == 8 && props.item.isMember == 0 && props.item.salonId !== '') {
        bcNotify.value.show('您还没加入该沙龙')
        setTimeout(() => {
            gotoSalonDetail({ id: props.item.salonId })
        }, 1200)
        return
    }
    // #ifdef APP-PLUS
    gotoLiveShow({
        id: props.item.id,
        frontCamera: {},
        beatySetting: JSON.stringify({})
    })
    // #endif

    // #ifdef MP-WEIXIN
    gotowxLive({
        id: props.item.id,
    })
    // #endif
}

onMounted(() => {

})

</script>
  
<style lang="scss" scoped>
.container {
    .item {
        position: relative;
        width: 100%;
        border-radius: 8rpx 8rpx 0 0;

        .thumb {
            width: 100%;
            height: 420rpx;
            border: solid 1rpx #FFFFFF;
        }

        .livePlayer {
            width: 100%;
            z-index: -1;
            background-color: black;
        }

        .bottom {
            background-color: #FFFFFF;
            padding: 0 20rpx 20rpx 20rpx;
            border-radius: 0 0 8rpx 8rpx;

            .title {
                margin-top: 20rpx;
                font-weight: 500;
                font-size: 32rpx;
                color: #1A1A1A;
                text-align: left;
            }

            .info {
                margin-top: 20rpx;
                align-items: center;

                .name-wrap {
                    align-items: center;
                }

                image {
                    width: 34rpx;
                    height: 34rpx;
                    border-radius: 50%;
                }
                .name {
                    margin-left: 10rpx;
                    font-size: 24rpx;
                    color: #666666;
                }
                .num {
                    align-items: center;
                    justify-content: flex-end;
                    width: 100rpx;
                    font-size: 24rpx;
                    color: #989898;
                    text-align: right;

                    .icon {
                        width: 34rpx;
                        height: 34rpx;
                        margin-right: 10rpx;
                    }
                }
            }
        }
    }
}
</style>
