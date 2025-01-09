<template>
    <view>
        <web-view :src="data.link"></web-view>
    </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { onLoad } from "@dcloudio/uni-app"

interface Data {
    /** 标题 */
    title: string
    /** 详情链接 */
    link: string
}

const data = reactive<Data>({
    title: '',
    link: ''
})

onLoad((options) => {
    if (options?.type == 'userAgreement') {
        uni.setNavigationBarTitle({ title: '用户协议' })
        data.link = 'https://res.baochuncare.com/web/protocol/user_agreement_ly_app.html'
    }
    else if (options?.type == 'userProtect') {
        uni.setNavigationBarTitle({ title: '保椿个人信息保护政策' })
        data.link = 'https://res.baochuncare.com/web/protocol/privacy_persion_ly_app.html'
    }
    else if (options?.type == 'privacyPolicy') {
        uni.setNavigationBarTitle({ title: '隐私政策' })
        data.link = 'https://res.baochuncare.com/web/protocol/user_privacy_agreement_ly_app.html'
    }
})

</script>

<style lang="scss" scoped>

</style>
