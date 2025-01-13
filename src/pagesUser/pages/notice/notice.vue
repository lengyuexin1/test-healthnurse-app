<template>
    <view class="container">
        <PageTopbg></PageTopbg>
        <bc-page-navbar :title="'通用设置'"></bc-page-navbar>
        <view class="page_content">
            <view class="notice_switch_box">
                <view class="notice_text_box">
                    <view class="notice_title">接收消息通知</view>
                    <view class="notice_bace">关闭后，手机将不再接收新的消息通知</view>
                </view>
                <TnSwitch v-model="data.selectValue" active-color="#EA3E1A" @change="changeSwitch"/>
            </view>
        </view>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive ,onMounted } from 'vue'
import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'

import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { getNoticeConfig, setNoticeConfig } from '@/api/user-api'

interface Data {
    selectValue:boolean
}
const data = reactive<Data>({
    selectValue:true
})

onMounted(()=>{
    getNoticeConfig().then((res)=>{
        if (res.isPush == 1) {
            data.selectValue = true
        }else{
            data.selectValue = false
        }
    })
})

const changeSwitch = (value: boolean)=>{
    let isPush = value ? 1 : 0
    setNoticeConfig(isPush)
}


</script>

<style lang="scss" scoped>
.page_content{
    padding: 20rpx;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    .notice_switch_box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 40rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;
        .notice_text_box{
            .notice_title{
                font-size: 30rpx;
                color: #333333;
                margin-bottom: 12rpx;
            }
            .notice_bace{
                font-size: 24rpx;
                color: #666666;
            }
        }
    }
}



</style>
