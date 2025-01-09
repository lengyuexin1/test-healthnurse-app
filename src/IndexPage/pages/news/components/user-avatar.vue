<template>
    <view>
        <template v-if="groupChat">
            <view class="groupImg">
                <template v-if="processAvatar && processAvatar.length == 1">
                    <image class="img1" :src="item" mode="scaleToFill" v-for="(item, index) in processAvatar" :key="index" />
                </template>
                <template v-else-if="processAvatar && processAvatar.length == 2">
                    <image class="img2" :src="item" mode="scaleToFill" v-for="(item, index) in processAvatar" :key="index" />
                </template>
                <template v-else-if="processAvatar && processAvatar.length == 3">
                    <image class="img3" :src="item" mode="scaleToFill" v-for="(item, index) in processAvatar" :key="index" />
                </template>
                <template v-else-if="processAvatar && processAvatar.length == 4">
                    <image class="img4" :src="item" mode="scaleToFill" v-for="(item, index) in processAvatar" :key="index" />
                </template>
                <template v-else-if="processAvatar && processAvatar.length == 5">
                    <image class="img5" :src="item" mode="scaleToFill" v-for="(item, index) in processAvatar" :key="index" />
                </template>
                <template v-else-if="processAvatar && processAvatar.length == 6">
                    <image class="img6" :src="item" mode="scaleToFill" v-for="(item, index) in processAvatar" :key="index" />
                </template>
                <template v-else-if="processAvatar && processAvatar.length == 7">
                    <image class="img7" :src="item" mode="scaleToFill" v-for="(item, index) in processAvatar" :key="index" />
                </template>
                <template v-else-if="processAvatar && processAvatar.length == 8">
                    <image class="img8" :src="item" mode="scaleToFill" v-for="(item, index) in processAvatar" :key="index" />
                </template>
                <template v-else-if="processAvatar && processAvatar.length == 9">
                    <image class="img9" :src="item" mode="scaleToFill" v-for="(item, index) in processAvatar" :key="index" />
                </template>
            </view>
        </template>

        <template v-else>
            <view class="avatar-box">
                <image :src="processAvatar" class="img" v-if="showAvatar" />
                <image :src="getAssetsUrl('/leyou/static/sh_logo.png')" class="img" v-else-if="plateFormService" />
                <image :src="getAssetsUrl('/leyou/static/user-def-avatar.png')" class="img" v-else-if="!isRobot" />
                <image :src="getAssetsUrl('/leyou/static/robot-def-avatar.png')" class="img" v-else />
            </view>
        </template>
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
    avatar?: any
    size?: number
    subjectType: number
}

//============================
/** 属性定义 */
//============================
const props = withDefaults(defineProps<Props>(), {
    size: 90,
    isRobot: false
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const showAvatar = computed(() => {
    return props.avatar 
})

// 处理会话头像
const processAvatar = computed(() => {
    if (props.subjectType == 6) {
        try {
            const obj = JSON.parse(props.avatar)

            if (Array.isArray(obj)) {
                return obj.slice(0, 9)
            }
        }
        catch(e) {

        }
    }
    else {
        return props.avatar
    }
})

// 平台客服
const plateFormService = computed(() => {
    return props.subjectType == 1
})

// 兴趣群聊
const groupChat = computed(() => {
    return props.subjectType == 6
})


</script>

<style lang="scss" scoped>
.groupImg {
    width: 96rpx;
    height: 96rpx;
    border-radius: 8rpx;
    border: solid 3rpx #D8DFDD;
    background-color: #E9E9E7;
    justify-content: center;
    align-items: center;
    box-sizing: content-box;
    display: flex;
    flex-wrap: wrap;
    
    image {
        border: solid 1rpx #E9E9E7;
    }

    .img1 {
        width: 90rpx;
        height: 90rpx;
    }

    .img2 {
        width: 44rpx;
        height: 44rpx;
    }

    .img3 {
        width: 44rpx;
        height: 44rpx;

        &:first-child {
            margin: 0 10rpx;
        }
    }

    .img4 {
        width: 44rpx;
        height: 44rpx;
    }

    .img5 {
        width: 32rpx;
        height: 32rpx;

        &:first-child {
            margin-left: 10rpx;
        }
        &:nth-child(2) {
            margin-right: 10rpx;
        }
    }

    .img6 {
        width: 32rpx;
        height: 32rpx;
    }

    .img7 {
        width: 32rpx;
        height: 32rpx;

        &:first-child {
            margin: 0 25rpx;
        }
    }

    .img8 {
        width: 32rpx;
        height: 32rpx;

        &:first-child {
            margin-left: 10rpx;
        }
        &:nth-child(2) {
            margin-right: 10rpx;
        }
    }
}

.avatar-box {
    width: 96rpx;
    height: 96rpx;

    .img {
        width: 96rpx;
        height: 96rpx;
        border-radius: 50%;
        border: solid 1rpx rgba(0, 0, 0, .1);
    }
}
</style>
