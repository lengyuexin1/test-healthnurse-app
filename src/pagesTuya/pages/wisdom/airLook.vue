<template>
    <z-paging ref="paging" :auto="false" :refresher-enabled="false">
        <template #top>
            <PageTopbg :zIndex="-1"></PageTopbg>
            <bc-page-navbar :title="'匹配空调'"></bc-page-navbar>
        </template>
        <view class="contentBox">
            <view class="insd">
                <view class="bigText">依次操作以下按钮，</view>
                <view class="bigText">观察空调反应是否一致。</view>
                <view class="smallText">不同型号的空调反应情况可能有延迟，建议尝试多次。</view>
            </view>
            <view class="Listae">
                <view class="itemcs" v-for="(item, index) in allList" :key="index" @click="sendDowe(index, item)">
                    <view v-if="item.img">
                        <image v-if="item.falg" class="imgbox1" :src="getAssetsUrl(item.img2)"></image>
                        <image v-else class="imgbox1" :src="getAssetsUrl(item.img)" alt="" />
                    </view>
                    <view v-else class="temcs" :class="item.falg ? 'lvCor' : ''"> {{ item.value }}</view>
                    <view class="itemtext">{{ item.text }}</view>
                </view>
            </view>

        </view>
        <template #bottom>
            <view class="bottext">观察空调是否一致</view>
            <view class="btncs">
                <TnButton @click="hasNext" width="45%" height="90" text-color="#fff" font-size="32rpx" bg-color="#29C86F"
                    border-color="#29C86F">不完全符合，下一组</TnButton>
                <TnButton @click="nullNext" width="45%" height="90" text-color="#fff" font-size="32rpx" bg-color="#29C86F"
                    border-color="#29C86F">完全符合</TnButton>
            </view>
        </template>
    </z-paging>
</template>
<script setup lang="ts">
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref, computed } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getAssetsPic } from '@/common/setPicture'
import { sendComPd, updateBrand } from "@/api/room-api"
const allList: any = ref([
    { img: '/device/airCond/pp_kai.svg', img2: '/device/airCond/on.svg', text: '开', falg: false },
    { img: '/device/airCond/pp_xue.svg', img2: '/device/airCond/modey10.svg', text: '模式: 制冷', falg: false },
    { img: '/device/airCond/pp_feng.svg', img2: '/device/airCond/modey7.svg', text: '风速: 高', falg: false },
    { img: '', text: '温度', value: '20°C', falg: false },
])

const devId = ref('')
const redId = ref('')
const ktId = ref('')
onLoad((option: any) => {
    devId.value = option.devId
    redId.value = option.hotId
    ktId.value = option.ktId
})
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const sendDowe = (index: any, item: any) => {
    if (index == 0) {
        // 电源
        const datas = {
            commands: {
                remote_index: redId.value,
                code: 'power',
                value: '1'
            },
            infraredId: devId.value
        }
        sendComPdApi(datas, item)
    }
    if (index == 1) {
        const datas = {
            commands: {
                remote_index: redId.value,
                code: 'mode',
                value: '0'
            },
            infraredId: devId.value
        }
        sendComPdApi(datas, item)
    }
    if (index == 2) {
        const datas = {
            commands: {
                remote_index: redId.value,
                code: 'wind',
                value: '3'
            },
            infraredId: devId.value
        }
        sendComPdApi(datas, item)
    }
    if (index == 3) {
        const datas = {
            commands: {
                remote_index: redId.value,
                code: 'temp',
                value: '20'
            },
            infraredId: devId.value
        }
        sendComPdApi(datas, item)
    }
}
const sendComPdApi = (datas: any, item: any) => {
    sendComPd(datas).then(res => {
        if (res) {
            item.falg = !item.falg
        }
    })
}

const hasNext = () => {
    uni.navigateBack()
}
const nullNext = () => {
    const sendData = {
        brandId: ktId.value,
        infraredId: devId.value,
        remoteIndex: redId.value
    }
    updateBrand(sendData).then(res => {
        uni.showToast({
            icon: 'none',
            title: '保存成功'
        })
        setTimeout(() => { uni.navigateBack({ delta: 3 }) }, 1000)
    })
}
</script>
<style scoped lang="scss">
page {
    background-color: #fff;
}

.btncs {
    display: flex;
    justify-content: space-between;
    margin: 0 20rpx 80rpx 20rpx;
}

.bottext {
    margin: 0 0 30rpx 30rpx;
    text-align: center;
    font-weight: 600;
    font-size: 40rpx;
    color: #1A1A1A;
}

.contentBox {
    margin: 50rpx 30rpx 0 30rpx;

    .insd {
        .bigText {
            font-weight: 600;
            font-size: 40rpx;
            color: #1A1A1A;
        }

        .imgbox1 {
            width: 320rpx;
            height: 320rpx;
        }
    }

    .smallText {
        margin-top: 16rpx;
        font-size: 24rpx;
        color: #999999;
    }

    .Listae {
        margin-top: 60rpx;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 16rpx;

        .itemcs {
            background: #F6F6F6;
            border-radius: 18rpx 18rpx 18rpx 18rpx;
            height: 320rpx;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;

            .imgbox1 {
                width: 80rpx;
                height: 80rpx;
            }

            .itemtext {
                margin-top: 22rpx;
                color: #5D5D5D;
            }

            .temcs {
                font-weight: 600;
                font-size: 56rpx;
                color: #B1BDC8;
            }

            .lvCor {
                color: #29c86f;
            }
        }
    }
}
</style>
