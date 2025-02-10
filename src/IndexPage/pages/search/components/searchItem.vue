<template>
    <view class="container">
        <block v-for="(item, index) in props.list" :key="index">
            <serveSearch v-if="isServer(item)" :info="item"></serveSearch>
            <shopSearch v-if="isShop(item)" :info="item"></shopSearch>
            <articleSearch v-if="isArticle(item)" :info="item"></articleSearch>
        </block>
    </view>
</template>

<script lang="ts" setup>
import serveSearch from './serveSearch.vue'
import shopSearch from './shopSearch.vue'
import articleSearch from './articleSearch.vue'
import { computed } from 'vue'


const props = defineProps({
    list: {
        type: Array,
        default: () => []
    }
})
// 服务列表/商品列表
const isServer = computed(() => {
    return (item: any) => {
        console.log(item.sourceType)

        return [1, 2].includes(item.sourceType)
    }
})
// 店铺列表
const isShop = computed(() => {
    return (item: any) => {
        return item.sourceType === 3
    }
})
// 频道列表
const isArticle = computed(() => {
    return (item: any) => {
        return item.sourceType === 4
    }
})
</script>

<style lang="scss" scoped>
.container {
    padding: 16rpx 20rpx;
}
</style>
