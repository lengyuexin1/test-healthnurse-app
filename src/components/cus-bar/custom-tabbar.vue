<template>
    <view class="page_tabbar">
        <!-- <TnTabbar fixed :frosted="false" :placeholder="false" safe-area-inset-bottom height="242rpx"> -->
            <!-- <template #default> -->
                <!-- <view class="tabbar_menu" v-if="data.showMenu">
                    <view class="tabbar_menuItem" @click="tabbatMenu(item)" :class="{ 'is_first' : index == 0 }" v-for="(item,index) in data.menuList" :key="item.id">
                        <image
                            class="menuImg"
                            :src="getAssetsUrl(item.img)"
                            mode="scaleToFill"
                        />
                        <view class="menu_name" v-if="item.name" >{{ item.name }}</view>
                    </view>
                </view> -->
                <view class="tabbar_box">
                    <view class="tabbar_item" v-for="(item,index) in props.tabbarData" :key="item.id" @tap="clickTabbar(item,index)">
                        <!-- <image class="recommend_icon" :src="data.showrecommend ?  item.activeIcon : item.icon" v-if="index == 0" /> -->
                        <!-- v-else-if -->
                        <image class="tabbar_health" :src="data.currentTabbar == index ? getAssetsUrl(item.activeIcon) : getAssetsUrl(item.activeIcon)" v-if="index == 1" />
                        <image class="tabbar_item_icon" :src="data.currentTabbar == index ? getAssetsUrl(item.activeIcon) : getAssetsUrl(item.icon)"  v-if="index == 2" />
                        
                        <view class="tabbar_item_text" :class="{ 'activeText' : data.currentTabbar == index }" v-else>
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
            <!-- </template> -->
        <!-- </TnTabbar> -->
    </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed, defineExpose } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { addWEventsListener, GlobalEvents } from '@/events/event-registry'
import { SessionSDK, useNoticeSessions, useSessionsList } from "@bc/msg"
import TnBadge from '@tuniao/tnui-vue3-uniapp/components/badge/src/badge.vue'
import { gotoChannel } from '@/routes/create-routes'
// import { gotofinList } from '@/routes/user-routes'
// import { gotoallFollowPage } from '@/routes/service-routes'

interface Data {
    currentTabbar: number
    allBadge: number
    showrecommend:boolean
    menuList: any
    showMenu: boolean
}

interface Props {
    tabbarData: any
}

interface Events {
    (e: 'changeTabbar', tabbarId: number, showrecommend:boolean): void
    (e: 'showLifeMenu'): void,

}

const emit = defineEmits<Events>()

const props = defineProps<Props>()

const data = reactive<Data>({
    currentTabbar: 0,
    allBadge: 0,
    showrecommend: true,
    menuList: [
        { id: 1, name: '', img: '/leyou/newpagemenu/tabbar_leftMenu.png' },
        { id: 2, name: '关注', img: '/leyou/newpagemenu/tabbar_follow.png' },
        { id: 3, name: '百科', img: '/leyou/newpagemenu/tabbar_channel.png' },
        { id: 4, name: '发现', img: '/leyou/newpagemenu/tabbar_find.png' },
        { id: 5, name: '附近', img: '/leyou/newpagemenu/tabbar_attachment.png' },
    ],
    showMenu: true
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

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const clickTabbar = (item:any,index:number)=>{

    if (data.currentTabbar == index && data.currentTabbar == 0) {
        data.showrecommend = !data.showrecommend
    }

    if (index == 0) {
        emit('changeTabbar',item.id,data.showrecommend)
    }else{
        data.showrecommend = true
        emit('changeTabbar',item.id,true)
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

const tabbatMenu = (item:any) => {
    item.id == 1 && emit('showLifeMenu')
    item.id == 2 && gotoallFollowPage()
    item.id == 3 && gotoChannel()
    item.id == 4 && gotofinList({isfin:1})
    item.id == 5 && gotofinList({isfin:0})

}

const hideTop = (val:boolean) => {
    console.log('val22',val);
    
    data.showMenu = val
}

onMounted(() => {
    /** 注册监听事件 */
    listen()

    getUnreadBadge()
})

defineExpose({
    hideTop
})

</script>

<style lang="scss" scoped>
.page_tabbar{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 46rpx;
    box-sizing: border-box;
    background: #FFFFFF;


}
.tabbar_menu{
    padding: 16rpx;
    background: #FFF2E4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .tabbar_menuItem{
        padding: 10rpx 42rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        &.is_first{
            padding: 28rpx;
        }
        .menuImg{
            width: 56rpx;
            height: 56rpx;
        }
        .menu_name{
            font-size: 26rpx;
            font-weight: 400;
            color: #333333;
            margin-top: 4rpx;
        }
    }

}
.tabbar_box{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding: 16rpx 0rpx;
    box-sizing: border-box;

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
