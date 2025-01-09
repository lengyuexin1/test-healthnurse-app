<template>
    <!-- 小程序统一头部背景色 默认为绿色渐变 -->
    <view class="top_bg_box" :style="props.bgstyle+';'+statusBarHeight+';'+'z-index:'+zIndex+';'"></view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

/**
 * 统一顶部背景色组件
 * bgstyle 接受传入自定义背景色 默认绿色渐变
 * zIndex 接受传入自定义层级
 */
const props = withDefaults(defineProps<{
    bgstyle?: string,
    zIndex?:number,
    addheight?:number
}>(), {
    bgstyle: 'opacity:1',
    zIndex:0,
    addheight: 288
})

const statusBarHeight = computed(() => {
    let Height = uni.getSystemInfoSync().statusBarHeight
    return 'height:' + (Height! + (props.addheight * 0.5)) + 'px'
})
</script>

<style lang="scss" scoped>
.top_bg_box{
    width: 100%;
    height: 288rpx;
    position: absolute;
    top: 0;
    left: 0;
    // background: linear-gradient(180deg, #DFF7EF 0%, #F2F3F5 100%);
    background: linear-gradient(180deg, #FDD9CD 0%, #F2F3F5 100%);
    z-index: 0;
    
}
</style>
