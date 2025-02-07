<template>
    <view>
        <TnTabbar fixed :frosted="false" :placeholder="false" safe-area-inset-bottom>
            <template #default>
                <view class="tabbar_box">
                    <view class="tabbar_item" v-for="(item,index) in props.tabbarData" :key="item.id" @tap="clickTabbar(item,index)">
                        <!-- <image class="recommend_icon" :src="data.showrecommend ?  item.activeIcon : item.icon" v-if="index == 0" /> -->
                        <!-- v-else-if -->
                        <image class="tabbar_health" :src="data.currentTabbar == index ? getAssetsUrl(item.activeIcon) : getAssetsUrl(item.activeIcon)" v-if="index == 1" />
                        <image class="tabbar_item_icon" :src="data.currentTabbar == index ? getAssetsUrl(item.activeIcon) : getAssetsUrl(item.icon)"  v-else-if="index == 2" />
                        <view class="tabbar_item_text" :class="{ 'activeText': data.currentTabbar == index }" v-else>
                            <view style="position: relative; z-index: -1;">
                                {{ item.name }}
                                <template v-if="index == 3 && data.allBadge > 0">
                                    <TnBadge dot :value="data.allBadge" type="primary" size="20rpx" bg-color="#FF4A4A" />
                                </template>
                            </view>
                            <image class="hot_icon" :src="getAssetsUrl(item.hoticon)" mode="scaleToFill" v-if="index == 4" />
                        </view>
                    </view>
                </view>
            </template>
        </TnTabbar>
    </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue'
import TnTabbar from '@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar.vue'
import { getAssetsPic } from '@/common/setPicture'
import { addWEventsListener, GlobalEvents } from '@/events/event-registry'
import { SessionSDK, useNoticeSessions, useSessionsList } from "@bc/msg"
import TnBadge from '@tuniao/tnui-vue3-uniapp/components/badge/src/badge.vue'

interface Data {
    currentTabbar: number
    allBadge: number
    showrecommend:boolean
}

interface Props {
    tabbarData: any
}

interface Events {
    (e: 'changeTabbar', tabbarId: number, showrecommend:boolean): void
}

const emit = defineEmits<Events>()

const props = defineProps<Props>()

const data = reactive<Data>({
    currentTabbar: 0,
    allBadge: 0,
    showrecommend: true
})


// 通知 - 未读消息
const noticeSession = useNoticeSessions()

// 会话列表
const sessionList = useSessionsList()

// 监听未读数事件
SessionSDK.onMsg('MSG__UpdateUnRead', () => {
    console.warn('通知未读数更新: ')
    getUnreadBadge()
}, false)

const getUnreadBadge = () => {
    // 总的 - 未读消息
    data.allBadge = noticeSession.unread + sessionList.unread
}

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const clickTabbar = (item:any, index:number) => {

    if (data.currentTabbar == index && data.currentTabbar == 0) {
        data.showrecommend = !data.showrecommend
    }

    if (index == 0) {
        emit('changeTabbar', item.id, data.showrecommend)
    }
    else {
        data.showrecommend = true
        emit('changeTabbar', item.id, true)
    }


    if (index == 2) {
        data.currentTabbar = data.currentTabbar
        return
    }
    data.currentTabbar = index

}

const listen = () => {
    addWEventsListener(GlobalEvents.Refresh_Badge, () => {
        getUnreadBadge()
    })
}

onMounted(() => {
    /** 注册监听事件 */
    listen()

    getUnreadBadge()
})

</script>

<style lang="scss" scoped>
.tabbar_box{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    .tabbar_item{
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .recommend_icon{
            width: 72rpx;
            height: 72rpx;
        }
        .tabbar_health{
            width: 112rpx;
            height: 36rpx;
        }
        .tabbar_item_icon{
            width: 88rpx;
            height: 68rpx;
        }
        .tabbar_item_text{
            text-align: center;
            font-size: 34rpx;
            line-height: 20rpx;
            font-weight: 600;
            color: #999999;
            position: relative;

            &.activeText{
                color: #333333;

            }
            .hot_icon{
                position: absolute;
                top: -26rpx;
                right: 50rpx;
                width: 66rpx;
                height: 26rpx;
                z-index: 100;
            }

        }

    }

}


</style>
