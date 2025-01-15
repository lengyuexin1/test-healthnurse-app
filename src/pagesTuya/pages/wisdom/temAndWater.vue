<template>
    <z-paging ref="paging" :auto="false" :refresher-enabled="false">
        <template #top>
            <PageTopbg :zIndex="-1"></PageTopbg>
            <bc-page-navbar :title="'温湿度计'"></bc-page-navbar>
        </template>
        <view class="contentBox">
            <view class="tewbox">
                <image class="imgcs3" :src="getAssetsUrl('/device/airCond/quan3.svg')"></image>
                <view class="textBox">
                    <view class="temcs">
                        <view class="textnum">{{ howTem }}</view>
                        <view class="title">
                            <image class="iconCs1" :src="getAssetsUrl('/device/airCond/temgs.svg')"></image>温度(°C)
                        </view>
                    </view>
                    <view class="watercs">
                        <view class="textnum">{{ howWat }}</view>
                        <view class="title">
                            <image class="iconCs1" :src="getAssetsUrl('/device/airCond/wimg.svg')"></image>湿度(%)
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </z-paging>
</template>
<script setup lang="ts">
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { tuyaDetail } from "@/api/room-api"

const howTem = ref('19.5')
const howWat = ref('45.2')
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

onLoad((option: any) => {
    tuyaDetail(option.id).then((res: any) => {
        const temList = res.attributes.filter((item:any) => item.code == 'va_temperature')
        howTem.value = temList[0].state.substring(0, 2) + '.' + temList[0].state.substring(2, 3)
        const watList = res.attributes.filter((item:any) => item.code == 'va_humidity')
        howWat.value = watList[0].state.substring(0, 2) + '.' + temList[0].state.substring(2, 3)
        console.log(res)
    })
})

</script>

<style scoped lang="scss">
.tewbox {
    position: relative;
    margin-top: 40%;
    display: flex;
    justify-content: center;
}

.textBox {
    position: absolute;
    bottom: 18%;

    .temcs {
        padding-bottom: 38rpx;
        border-bottom: 2rpx solid #E5E5E5;
        width: 340rpx;
        text-align: center;
    }

    .watercs {
        margin-top: 20rpx;
        text-align: center;
    }

    .textnum {
        font-size: 72rpx;
        font-weight: 600;
        margin-bottom: 10rpx;
    }

    .title {
        font-size: 28rpx;
        color: #666666;
        display: flex;
        align-items: center;
        justify-content: center;
        .iconCs1 {
            width: 28rpx;
            height: 28rpx;
        }
    }
}

.imgBox {
    position: relative;
}

.imgcs3 {
   width: 560rpx;
   height: 560rpx;
}
</style>