<template>
    <view class="avatar-box">
        <image :src="getAssetsUrl('/leyou/static/robot-def-avatar.png')" class="img" mode="aspectFill" v-if="isRobot" />
        <image :src="avatar" class="img" mode="aspectFill" v-else-if="showAvatar" />
        <image :src="getAssetsUrl('/leyou/static/user-def-avatar.png')" class="img" mode="aspectFill" v-else />
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

//============================
/** 接口定义 */
//============================
interface Props {
    isRobot?: boolean
    avatar?: string
    size?: number
}

//============================
/** 属性定义 */
//============================
const props = withDefaults(defineProps<Props>(), {
    size: 80,
    isRobot: false
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const showAvatar = computed(() => {
    return props.avatar
})


</script>

<style lang="scss" scoped>
.avatar-box {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
}
.img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
}
</style>
