<template>
    <view>
        <view class="top_navbar" :style="{ 'height' : statusBarHeight }"></view>
        <slot></slot>
    </view> 
</template>

<script setup lang="ts">
import { computed } from 'vue'

const statusBarHeight = computed(() => {
    return uni.getSystemInfoSync().statusBarHeight + 'px'
})



</script>

<style lang="scss" scoped>
.top_navbar{
    width: 100%;
}
</style>
