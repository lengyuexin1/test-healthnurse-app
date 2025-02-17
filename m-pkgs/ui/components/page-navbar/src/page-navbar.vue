<template>
    <!-- #ifdef APP-PLUS || H5 -->
    <template v-if="props.title == ''">
        <view class="top_navbar" :style="{ 'height': statusBarHeight }"></view>
    </template>

    <template v-if="props.title !== ''">
        <TnNavbar
            :safe-area-inset-right="insetright"
            :bg-color="props.bgColor"
            :text-color="props.textColor"
            :frosted="props.frosted"
            :opacity="props.opacity"
            :bottom-shadow="props.bottomShadow"
            :center="props.center"
            :z-index="props.zIndex"
        >
            <template #back>
                <slot name="back">
                    <view class="nav_back" @click="goback">
                        <TnIcon name="left" :color="props.iconColor" size="38" :bold="true"/>
                    </view>
                </slot>
            </template>
            <template #default>
                <slot name="default">
                    <view class="nav_content tn-flex-center-center" :style="'color:' + textColor +';'">
                        {{ props.title }}
                        <image class="navIcon" :src="getAssetsUrl('/leyou/static/message/message_icon_clear.svg')" @tap="clickBtn" v-if="props.iconType == 'clear'" />
                    </view>
                </slot>
            </template>
        </TnNavbar>
    </template>
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN -->
    <TnNavbar
        :safe-area-inset-right="insetright"
        :bg-color="props.bgColor"
        :text-color="props.textColor"
        :frosted="props.frosted"
        :opacity="props.opacity"
        :bottom-shadow="props.bottomShadow"
        :center="props.center"
        :z-index="props.zIndex"
    >
        <template #back>
            <slot name="back">
                <view class="nav_back" @click="goback">
                    <TnIcon name="left" :color="props.iconColor" size="38" :bold="true"/>
                </view>
            </slot>
        </template>
        <template #default>
            <slot name="default">
                <view class="nav_content tn-flex-center-center" :style="'color:' + textColor +';'">
                    {{ props.title }}
                    <image class="navIcon" :src="getAssetsUrl('/leyou/static/message/message_icon_clear.svg')" @tap="clickBtn" v-if="props.iconType == 'clear'" />
                </view>
            </slot>
        </template>
    </TnNavbar>
    <!-- #endif -->

    <slot name="navBottom"></slot>
</template>

<script setup lang="ts">
import { ref, reactive, computed, defineEmits } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { pageController } from '@bc/uni-tools'


/**
 * 组件自动计算顶部安全距离
 * 自动适配小程序端 和 APP端 是否空出顶部右边胶囊安全距离
 * 引用图鸟TnNavbar组件接受部分原有设置
 * height ==> 不接受传入引用图鸟原有自动计算的高度
 * bg-color ==> 接受bgColor默认值为transparent
 * text-color ==> 接受textColor默认为#333333
 * frosted ==> 接受frosted默认为false
 * opacity ==> 接受opacity 默认为1
 * back-icon、back-text、home-icon 都不接受建议使用默认添加好的返回icon
 * bottom-shadow ==> 接受bottomShadow默认false
 * safe-area-inset-right ==> 不接受
 * right-operation-width ==> 不接受
 * center ==> 接受center默认为true
 * z-index ==> 接受zIndex 默认为20090
 * title ==> 头部导航栏文字
 */

/**
 * 插槽接受back 和 default
 * back默认返回icon并且默认事件为返回上一页 若有特殊事件处理建议引用时自定义插槽定义事件
 *
 */

const props = withDefaults(defineProps<{
    bgstyle?: string,
    bgColor?: string,
    textColor?: string,
    iconColor?: string,
    frosted?: boolean,
    opacity?: number,
    bottomShadow?: boolean,
    center?: boolean,
    zIndex?: number,
    title?: string,
    iconType: string

}>(), {
    bgstyle: 'opacity:1',
    bgColor: 'transparent',
    textColor: '#333333',
    iconColor: '#333333',
    frosted: false,
    opacity: 1,
    bottomShadow: false,
    center: true,
    zIndex: 20090,
    title: '',
    iconType: ''
})

const statusBarHeight = computed(() => {
    return uni.getSystemInfoSync().statusBarHeight + 'px'
})

const insetright = computed(() => {
    let bol = true
    // #ifdef APP-VUE || H5
    bol = false
    // #endif
    return bol
})

const getAssetsUrl = computed(() => (src : string) => {
	return getAssetsPic(src)
})

const clickBtn = () => {
    emit("clickBtn")
}

const goback = () => {
    pageController.back().catch(() => {
        console.log('返回失败: 跳转到首页')

        uni.reLaunch({
            url: '/IndexPage/pages/index/index',
        })
    })
}

const emit = defineEmits(["clickBtn"])

</script>

<style scoped>
:deep(.tn-navbar__content--center) {
    padding-left: 0!important;
}
:deep(.tn-navbar__content) {
    padding-left: 0!important;
}
:global(.tn-navbar__content--center) {
    padding-left: 0!important;
}
:global(.tn-navbar__content) {
    padding-left: 0!important;
}

:deep(.nav_back) {
    padding-left: 0!important;
}
:global(.nav_back) {
    padding-left: 0!important;
}
</style>

<style lang="scss" scoped>
.top_navbar{
    width: 100%;
}
.nav_back{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 20rpx;
    box-sizing: border-box;
    position: absolute;
}
.nav_content{
    color: #333333;
    font-size: 34rpx;
    text-align: center;
    font-weight: 500;
    width: 300rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.navIcon {
    width: 30rpx;
    height: 30rpx;
    margin-left: 10rpx;
}
</style>
