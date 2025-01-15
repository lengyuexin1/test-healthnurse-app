<template>
    <z-paging ref="paging" :auto="false" :refresher-enabled="false">
        <template #top>
            <PageTopbg :zIndex="-1"></PageTopbg>
            <bc-page-navbar :title="'照明开关'"></bc-page-navbar>
        </template>
        <view class="bigBox">
            <view class="lightBox">
                <view v-for="(item, index) in listNum" class="itemCs" :class="item.state == 1 ? 'colorcs' : ''"
                    @click="trunOp(item, index)">
                    <image v-if="item.state == 1" class="imgBox" :src="getAssetsUrl('/device/home/ligop.svg')" alt="" />
                    <image v-else class="imgBox" :src="getAssetsUrl('/device/home/lighu.svg')" alt="" />
                    <view>{{ item.name }}</view>
                </view>
            </view>
            <view class="midbox">
                <view class="headcs">按键设置</view>
                <view @click="goName">
                    <vew class="entcs">点击进入</vew>
                    <TnIcon name="right" color="#6E6E6E" size="28" :bold="true" />
                </view>
            </view>
            <view class="lastBox">
                <view class="listBox" v-for="(item, index) in listNum" :key="index" @click="trunOp(item, index)">
                    <view class="smalcs">
                        <image class="imgBox" :src="getAssetsUrl('/device/home/lighu.svg')" alt="" />
                        <view>{{ item.name }}</view>
                    </view>
                    <image v-if="item.state == 1" class="imgBox" :src="getAssetsUrl('/device/home/ligtred.svg')" alt="" />
                    <image v-else class="imgBox" :src="getAssetsUrl('/device/home/ligthed.svg')" alt="" />
                </view>
            </view>
        </view>
    </z-paging>
</template>
   
<script setup lang="ts">
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getAssetsPic } from '@/common/setPicture'
import { ref, reactive, computed } from 'vue'
import { tuyaDetail, tuyaCommand } from "@/api/room-api"
import { onLoad } from '@dcloudio/uni-app'
import { gotoEditName } from "@/routes/active-routes"
const bgColor = ref('#000')
const listNum: any = ref([])
const devId = ref('')
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

onLoad((option: any) => {
    devId.value = option.id
    tuyaDetail(option.id).then((res: any) => {
        listNum.value = res.attributes.filter((item: any) => {
            return item.code.includes('switch')
        })
        console.log(listNum.value)
    })
})

const goName = () => {
    gotoEditName(devId.value)
}

const trunOp = (item: any, index: number) => {
    const sendData = {
        "commands": [
            {
                "code": item.code,
                "value": !item.state
            }
        ],
        "deviceId": devId.value
    }
    tuyaCommand(sendData).then(res => {
        item.state = !item.state
    })
}

</script>
   
<style scoped lang="scss">
page {
    background: #F8F9F9;
}

.bigBox {
    margin:20rpx 20rpx 0 20rpx;
}

.lightBox {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
}

.itemCs {
    height: 240rpx;
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.imgBox {
    width: 60rpx;
    height: 60rpx;
}

.colorcs {
    background: linear-gradient(180deg, #55A0F9 0%, #1F86EF 100%);
    border-radius: 16rpx 16rpx 16rpx 16rpx;
}

.midbox {
    margin: 46rpx 0 20rpx 0;
    display: flex;
    justify-content: space-between;

    .headcs {
        font-weight: 600;
        font-size: 32rpx;
        color: #363636;
    }

    .entcs {
        font-size: 30rpx;
        color: #999999;
    }
}

.lastBox {
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    overflow: hidden;
}

.listBox {
    height: 150rpx;
    background-color: #FFFFFF;
    padding: 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2rpx solid #F2F2F2;

    .smalcs {
        display: flex;
        align-items: center;

        .imgBox {
            width: 44rpx;
            height: 44rpx;
            margin-right: 16rpx;
        }
    }
}
</style>
  