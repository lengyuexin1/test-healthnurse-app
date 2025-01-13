<template>
    <z-paging ref="paging" :auto="false" :refresher-enabled="false">
        <template #top>
            <PageTopbg :zIndex="-1"></PageTopbg>
            <bc-page-navbar :title="'匹配空调'"></bc-page-navbar>
        </template>
        <view class="contentBox">
            <view class="insd">
                <TnIcon name="left" size="60rpx" color="#ccc" @click="hound(0)"></TnIcon>
                <image class="imgbox1" :src="getAssetsUrl('/device/airCond/airRed.svg')" alt="" />
                <TnIcon name="right" size="60rpx" @click="hound(1)" color="#ccc"></TnIcon>
            </view>
            <view class="listItem">
                <view class="nud">第{{ reindex }}/{{ allList.length }}个遥控器</view>
                <view class="idnum">ID:{{ allList[reindex - 1].remote_index }}</view>
            </view>
        </view>
        <template #bottom>
            <view class="btncs">
                <TnButton @click="sendRedCode" width="80%" height="90" text-color="#fff" font-size="32rpx"
                    bg-color="#29C86F" border-color="#29C86F">发送红外码</TnButton>
            </view>
        </template>
    </z-paging>
</template>
<script setup lang="ts">
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { onLoad } from '@dcloudio/uni-app'
import { getIndexKt } from "@/api/room-api"
import { ref, computed } from 'vue'
import { gotoAirLook } from "@/routes/active-routes"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getAssetsPic } from '@/common/setPicture'
const allList: any = ref([
    { code: 1248 },
    { code: 5878 },
    { code: 9874 }
])
const reindex = ref(1)
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const devId = ref('')
const ktId = ref('')
onLoad((option: any) => {
    devId.value = option.devId
    ktId.value = option.ktId
    getIndexKt(option.devId, option.ktId).then((res: any) => {
        console.log(res);
        allList.value = res
    })
})


const sendRedCode = () => {
    console.log(allList.value[reindex.value - 1].remote_index, devId.value)
    gotoAirLook(devId.value, allList.value[reindex.value - 1].remote_index, ktId.value)
}
const hound = (type: number) => {
    if (type == 1 && reindex.value < allList.value.length) {
        return reindex.value++
    }
    if (type == 0 && reindex.value > 1) {
        reindex.value--
    }
}
</script>
<style scoped lang="scss">
page {
    background-color: #fff;
}

.btncs {
    text-align: center;
    margin-bottom: 80rpx;
}

.contentBox {
    margin: 100rpx 30rpx 0 30rpx;

    .insd {
        display: flex;
        justify-content: space-around;

        .imgbox1 {
            width: 320rpx;
            height: 320rpx;
        }
    }

    .listItem {
        margin-top: 60rpx;
        text-align: center;
        color: #A2ACB4;
        font-size: 28rpx;

        .nud {
            margin-bottom: 10rpx;
        }
    }
}
</style>
