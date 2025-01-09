<template>
    <view class="wrap tn-flex-column">
        <image class="animate__animated animate__jackInTheBox" :src="getAssetsUrl('/leyou/static/icon/check.svg')" mode="scaleToFill" />
        <view class="txt">提交完成</view>
        <view class="sub">具体注册情况，请留意短信通知~</view>
        <TnButton shape="round" width="240rpx" height="76rpx" font-size="32rpx" plain border-color="#F3F3F3" text-color="#333333" @tap="clickBtn">
            返回首页
        </TnButton>
    </view>
</template>

<script setup lang="ts">
import { onBackPress } from "@dcloudio/uni-app"
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { gotoIndex } from '@/routes/public-routes'
import { computed } from "vue"
import { getAssetsPic } from '@/common/setPicture'


onBackPress((options) => {
    if (options.from === 'navigateBack' || options.from === 'backbutton') {
        // 来自于导航条返回按钮或者系统返回按钮
        // 在这里处理你的逻辑
        // 返回 true 会阻止默认行为，即不会返回上一页面
        // 返回 false 会继续默认行为，即返回上一页面
        gotoIndex()
        return true
    }
    return false
})

const getAssetsUrl = computed(() => (src : string) => {
	return getAssetsPic(src)
})

const clickBtn = () => {
    gotoIndex()
}

</script>

<style lang="scss" scoped>
.wrap {
    margin: 20rpx;
    padding: 50rpx;
    align-items: center;
    background-color: #FFFFFF;
}

image {
    width: 160rpx;
    height: 160rpx;
}

.txt {
    margin: 30rpx 0 50rpx 0;
    font-size: 34rpx;
    font-weight: bold;
    color: #333333;
}

.sub {
    margin: 0 0 50rpx 0;
    font-size: 28rpx;
    color: #666666;
}
</style>
