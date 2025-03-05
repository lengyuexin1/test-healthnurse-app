<template>
    <view class="container">
        <!-- 左侧菜单 -->
        <TnPopup v-model="showLeftMenu" open-direction="left" :z-index="30000">
            <view class="left_popup_box">
                <view class="left_popup_top have_bottom">
                    <view class="top_item" v-for="item in data.topMenu1" :key="item.id" @click="topmenu(item)">
                        <image
                            class="item_img"
                            :src="getAssetsUrl(item.icon)"
                            mode="scaleToFill"
                        />
                        <view class="item_text">
                            {{ item.name }}
                        </view>
                    </view>
                </view>
                <view class="left_popup_top have_bottom">
                    <view class="top_item" v-for="item in data.topMenu2" :key="item.id" @click="topmenu(item)">
                        <image
                            class="item_img"
                            :src="getAssetsUrl(item.icon)"
                            mode="scaleToFill"
                        />
                        <view class="item_text">
                            {{ item.name }}
                        </view>
                    </view>
                </view>
                <view class="left_popup_top">
                    <view class="top_item" v-for="item in data.topMenu3" :key="item.id" @click="topmenu(item)">
                        <image
                            class="item_img"
                            :src="getAssetsUrl(item.icon)"
                            mode="scaleToFill"
                        />
                        <view class="item_text">
                            {{ item.name }}
                        </view>
                    </view>
                </view>
                <view class="left_popup_bottom" v-if="false">
                    <view class="bottom_item" v-for="item in data.bottomMenu" :key="item.id" @click="botMenu(item)">
                        <image
                            class="item_img"
                            :src="getAssetsUrl(item.icon)"
                            mode="scaleToFill"
                        />
                        <view class="item_text" >
                            {{ item.name }}
                        </view>
                    </view>
                </view>
            </view>

            <BCNotify ref="bcNotify"></BCNotify>

        </TnPopup>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, defineEmits, defineProps } from 'vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import { gotoSetting, gotoLogin } from "@/routes/public-routes"
import { gotoChatPage } from "@/routes/nim-routes"
import { createTeam } from "@/api/nim-api"
import { PlatformManage } from '@bc/sys'
import { gotocreationPage, gotoDraftList } from '@/routes/create-routes'
import { gotoShoppingCart } from '@/routes/goods-routes'
import { gotoCommentList, gotoaddFriend, gotoWatchHistory, gotocommunityIndex, gotouserCore, gotocommunityFriend } from '@/routes/user-routes'
import { gotoorderList } from "@/routes/order-routes"

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])

const showLeftMenu = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})

interface Data {
    topMenu1: any,
    topMenu2: any,
    topMenu3: any,
    bottomMenu:any,
}
const data = reactive<Data>({
    topMenu1: [
        { id: 1, name: '发现好友', icon: '/leyou/menu/findfriend_icon.svg' },
        // {id:2,name:'会员频道',icon:'/leyou/menu/member_icon.svg'},
        { id: 3, name: '社区朋友', icon: '/leyou/menu/communityFriend_icon.svg' },
        // {id:13,name:'创意短片',icon:'/leyou/menu/create_video.svg'},
        { id: 4, name: '社区公约', icon: '/leyou/menu/community_icon.svg' }
    ],
    topMenu2: [
        { id: 5, name: '订单', icon: '/leyou/menu/order_icon.svg' },
        { id: 6, name: '购物车', icon: '/leyou/menu/card_icon.svg' }
        // {id:7,name:'钱包',icon:'/leyou/menu/wallet_icon.svg'},
    ],
    topMenu3: [
        { id: 8, name: '账号中心', icon: '/leyou/menu/myuser_icon.svg' },
        { id: 9, name: '创作中心', icon: '/leyou/menu/create_icon.svg' },
        { id: 10, name: '我的草稿', icon: '/leyou/menu/draft_icon.svg' },
        { id: 11, name: '我的评价', icon: '/leyou/menu/comment_icon.svg' },
        { id: 12, name: '浏览记录', icon: '/leyou/menu/browse_icon.svg' }
    ],


    bottomMenu: [
        { id: 1, name: '听一听', icon: '/leyou/home/broadcast-icon.svg' },
        { id: 2, name: '看一看', icon: '/leyou/home/look_icon.svg' },
        { id: 3, name: '玩一玩', icon: '/leyou/home/game-icon.svg' }
    ]
})

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const bcNotify = ref()

const topmenu = (item:any) => {

    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        item.id == 1 && gotoaddFriend()
        item.id == 2 && bcNotify.value.show('敬情期待')
        item.id == 3 && gotocommunityFriend()
        item.id == 4 && gotocommunityIndex()

        item.id == 5 && gotoorderList({ sub: 0, taborIndex: 0 })
        item.id == 6 && gotoShoppingCart()
        item.id == 7 && bcNotify.value.show('敬情期待')

        item.id == 8 && gotouserCore()
        item.id == 9 && gotocreationPage()
        item.id == 10 && gotoDraftList()
        item.id == 11 && gotoCommentList(1)
        item.id == 12 && gotoWatchHistory('course')

    })

}

const botMenu = (item:any) => {

    bcNotify.value.show('敬情期待')

}


</script>

<style lang="scss" scoped>

.left_popup_box{
    width: 500rpx;
    height: 100%;
    padding: 120rpx 52rpx 100rpx 52rpx;
    box-sizing: border-box;
    .left_popup_top{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        &.have_bottom{
            border-bottom: 2rpx solid #F2F2F2;
            margin-bottom: 46rpx;
        }
        .top_item{
            display: flex;
            align-items: center;
            margin-bottom: 46rpx;
            .item_img{
                width: 40rpx;
                height: 40rpx;
                margin-right: 30rpx;
            }
            .item_text{
                font-size: 28rpx;
                color: #333434;
                font-weight: 500;
            }
        }
    }
    .left_popup_bottom{
        padding: 0rpx 12rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .bottom_item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            margin-bottom: 12rpx;
            .item_img{
                width: 64rpx;
                height: 64rpx;
                margin-bottom: 8rpx;
            }
            .item_text{
                font-size: 28rpx;
                color: #666666;
                font-weight: 500;
            }
        }
    }
}
</style>
