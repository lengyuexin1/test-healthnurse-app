<template>
    <view class="page-view" :style="{ height: pageHeight }">
        <slot></slot>
        <view class="footer">
            <!-- <u-toast ref="uToast"></u-toast> -->
            <slot name="footer"></slot>
        </view>
        <view class="loading_mark tn-flex-center-center" v-if="props.loading">
            <TnLoading show :animation="true" mode="semicircle" time-function="ease-in-out" size="80rpx" />
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TnLoading from '@tuniao/tnui-vue3-uniapp/components/loading/src/loading.vue'

//============================
/** 接口定义 */
//============================
interface Props {
    loading: boolean
}

//============================
/** 属性定义 */
//============================
const props = defineProps<Props>()

const pageHeight = computed(() => {
    return uni.getSystemInfoSync().windowHeight + 'px'
})

</script>
<style lang='scss' scoped>
.page-view {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    // .page-view-cnt {
    //     width: 100%;
    //     height: 0;
    //     flex: 1;
    //     display: flex;
    //     flex-direction: column;
    //     box-sizing: border-box;
    // }


    .loading_mark {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: #ffffff;
    }
    .footer {

    }
}
</style>
