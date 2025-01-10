<template>
    <view class="content">
        <TnNavbar :title="prop.pageTitle" :bottom-shadow="false" :bg-color="colorCs" :autoBack="true"
            :fixed="true">
            <view class="topText">{{ prop.pageTitle }}</view>
            <template #back>
                <view @click="leftClick" v-if="prop.showBack">
                    <TnIcon name="left" color="#333333" size="38"></TnIcon>
                </view>
                <view v-if="prop.showCar" class="carCs">购物车</view>
            </template>
            <!-- #ifdef MP-WEIXIN -->
            <view slot="right" style="right: 200rpx;position: fixed;">
                <!-- #endif -->
                <!-- #ifndef MP-WEIXIN -->
                <view slot="right">
                    <!-- #endif -->
                    <slot name="right"></slot>
                </view>
        </TnNavbar>
    </view>
</template>

<script lang="ts" setup>
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
import { withDefaults } from 'vue'
// interface Props {
// leftIconColor: {
//     type: String,
//     default: '#333'
// }
// pageTitle: {
//     type: String,
//     default: ''
// },
// showBack: {
//     type: Boolean,
//     default: true
// },
// bgColor: {
//     type: String,
//     default: '#DFF7EF'
// },
// leftIcon: {
//     type: String,
//     default: "arrow-left"
// }
// }
const prop = defineProps({
    pageTitle: {
        type: String,
        default: ''
    },
    showBack: {
        type: Boolean,
        default: true
    },
    showCar: {
        type: Boolean,
        default: false
    },
    colorCs: {
        type: String,
        default: 'rgba(241, 243, 245, 0)'
    }
})

const leftClick = () => {
    // this.CHANGE_SHOPORDER(0)
    uni.navigateBack()
}
</script>

<style lang="scss" scoped>
:deep(.tn-navbar-back) {
    display: flex;
    align-items: center;
    height: 1005;
}
 // #ifdef APP-VUE || H5
:deep(.tn-navbar__content--center) {
    padding-right: 0!important;
}
// #endif

.topText {
    font-size: 34rpx;
    color: #18181A;
}

.carCs {
    margin-left: 30rpx;
    font-size: 40rpx;
    font-weight: 600;
}</style>
