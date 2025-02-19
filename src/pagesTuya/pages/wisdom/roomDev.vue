<template>
    <z-paging>
        <template #top>
            <customNavbar v-if="isTabSaw" :showBack="false" pageTitle=""></customNavbar>
            <view :style="{ paddingTop: data.titleTop + 'px' }">
                <view class="sBarbox" :style="{ height: data.sBarHeight + 'px' }">
                    <view class="whoHome" @click="manageDevice">老爷子的家</view>
                    <!-- <view @click="goTuya">涂鸦设备</view> -->
                    <view class="addIco">
                        <!-- <view class="addText">添加设备</view> -->
                        <TnIcon @click="addDevice" name="add-circle" size="48" color="#111214"></TnIcon>
                    </view>
                </view>
            </view>
            <view class="homeUi">
                <TnTabs @change="changtab" v-model="data.currentTabIndex" color="#959595" bg-color="transparent"
                    :bottom-shadow="false" active-color="#333333" font-size="36rpx" bar-color="transparent">
                    <TnTabsItem v-for="(item, index) in data.roomList" :key="index" :title="item.name" />
                </TnTabs>
                <view class="mornRoom" @click="openRoom">
                    <image class="more_icon" :src="getAssetsUrl('/device/home/roomlist.svg')" />
                </view>
            </view>
        </template>
        <view class="devList">
            <view class="devItem" v-for="(item, index) in devseList" :key="index" @click="gotodevDetail(item)">
                <image class="Item_img" :src="item.thumb" />
                <view class="leb">{{ item.name }}</view>
                <view class="wherom">{{ data.roomSouName }}</view>
            </view>
        </view>
        <view class="nullIMg" v-if="devseList.length == 0">
            <image class="Item_img" :src="getAssetsUrl('/empty/empty_icon_data.png')" />
        </view>
        <view class=buxnj></view>
    </z-paging>

    <uni-popup ref="popup" type="center" :animation="true">
        <view class="popupBox">
            <view v-for="(item, index) in data.roomList" :key="index" class="proItem" @click="chageRoom(item, index)">
                <view class="itemBox">
                    <view> {{ item.name }}</view>
                    <!-- <view class="numcas">{{ item.num }}</view> -->
                </view>
            </view>
            <view class="setRoom" @click="manageRoom">
                <view>房间管理</view>
                <image class="seting" :src="getAssetsUrl('/kangpin/my/my-set.svg')" mode="scaleToFill" />
            </view>
        </view>
    </uni-popup>
</template>
<script setup lang="ts">
import { PlatformManage } from '@bc/sys'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { gotoLogin } from "@/routes/public-routes"
import { onShow } from "@dcloudio/uni-app"
import { allRoomList, roomDeviceList, sendTyUid } from "@/api/room-api"
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { reactive, onMounted, computed, ref } from "vue"
import { getAssetsPic } from '@/common/setPicture'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { roomAdd, deviceAdd, gotoAirCond, gotoDeviceDetail, lightDetail, clDetail, gotoBodyTem, gotoPlayVideo, gotoDeviceManag, gotoTuYa, gotoCameraDetail, gotoTemWater } from '@/routes/active-routes'
interface Data {
    titleTop: number
    sBarHeight: number
    roomList: any
    curindex: number
    showPopup: boolean
    currentTabIndex: number
    roomSouName: string
    phone: string
}
const data = reactive<Data>({
    titleTop: 0,
    sBarHeight: 0,
    curindex: 0,
    roomList: [],
    showPopup: false,
    currentTabIndex: 0,
    roomSouName: '',
    phone: '你'
})
const TyUid = ref('')
const devseList: any = ref([])
const popup = ref()
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const isTabSaw = ref(true)

PlatformManage.isRequireLogin().then((isRequireLogin) => {
    if (isRequireLogin) {
        uni.showToast({
            icon: 'none',
            title: '请先登录'
        })
        setTimeout(() => {
            gotoLogin({})
        }, 1000)
        return
    }
})
const goTuya = () => {
    gotoTuYa()
}
const changtab = (val: any) => {
    if (data.roomList.length > 0) {
        data.curindex = val
        const id = data.roomList[val].id
        getListDevice(id)
    }
}
const manageDevice = () => {
    gotoDeviceManag(data.roomList[0].id, data.roomList[0].name)
}
const openRoom = () => {
    popup.value.open()
}
const chageRoom = (item: any, index: number) => {
    data.currentTabIndex = index
    changtab(index)
    popup.value.close()
}
const gotodevDetail = (item: any) => {
    if (item.model == 'wsdcg') {
        return gotoTemWater(item.model, item.id)
    }
    if (item.model == 'zigbeekt') {
        return gotoAirCond(item.model, item.id)
    }
    if (item.model == 'cl') {
        return clDetail(item.model, item.id)
    }
    if (item.model == 'kg' || item.model == 'cjkg') {
        return lightDetail(item.model, item.id)
    }
    if (item.model == 'TEMPERATURE') {
        return gotoBodyTem(item.mac)
    }
    if (item.model == 'CAMERA') {
        // #ifdef APP-PLUS || H5
        gotoPlayVideo(item.sn, 'LBSPVA')
        // #endif

        // #ifdef MP-WEIXIN
        gotoCameraDetail({
            deviceId: item.id,
            deviceName: item.name,
            status: item.status,
            sn: item.sn
        })
        // #endif
        return
    }
    gotoDeviceDetail({
        deviceId: item.id,
        deviceName: item.name,
        status: item.status,
        sn: item.sn
    }, item.model)
}
const addDevice = () => {
    if (data.roomList.length > 0) {
        deviceAdd(data.roomList[data.curindex].id, data.roomList[data.curindex].tuyaHomeId)
    } else {
        uni.showToast({
            icon: 'none',
            title: '请先创建房间'
        })
    }
}
const getListDevice = (id: any) => {
    roomDeviceList(id).then(res => {
        devseList.value = res
        if (res.length > 0) {
            data.roomSouName = data.roomList[data.curindex].name
        }
    })
}
const manageRoom = () => {
    roomAdd()
    popup.value.close()
}
const getAllRoom = () => {
    const pageSize = 10
    const pageNumber = 1
    allRoomList({
        pageSize,
        pageNumber,
        query: {}
    }).then(res => {
        data.roomList = res.data
        if (res.data.length > 0) {
            data.roomSouName = data.roomList[0].name
            getListDevice(res.data[0].id)
        }
    })
}
onShow(() => {

})
onMounted(async () => {
    getAllRoom()
    if (uni.getStorageSync('userList')) {
        data.phone = uni.getStorageSync('userList')[0].userMobile
    }
})
defineExpose({
    getAllRoom
})

</script>
<style scoped lang="scss">
.sBarbox {
    margin-top: 20rpx;
    padding: 0 40rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .whoHome {
        font-weight: 600;
        font-size: 32rpx;
        color: #020202;
    }

    .addIco {
        font-weight: 600;
        font-size: 32rpx;
        color: #020202;

        .addText {
            font-size: 32rpx;
            color: #020202;
            margin-right: 10rpx;
        }
    }
}

.homeUi {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 64rpx 16rpx 0 16rpx;
    position: relative;
    padding: 20rpx 20rpx 20rpx 0;

    .homeLi {
        font-size: 36rpx;
        padding-right: 36rpx;
        color: #959595;
    }

    .mornRoom {
        background: #E6E6E6;
        // position: absolute;
        // bottom: 20rpx;
        // right: 0;
        width: 70rpx;
        height: 50rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20rpx;
        padding: 10rpx 20rpx;
    }

    .more_icon {
        border-radius: 0rpx;
        width: 24rpx;
        height: 24rpx;
    }

    .activeCl {
        font-weight: 600;
        color: #333333;
    }
}

.devList {
    margin: 20rpx 20rpx 120rpx 20rpx;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16rpx;

    .devItem {
        background: #fff;
        height: 230rpx;
        border-radius: 24rpx;
        padding: 24rpx;

        .Item_img {
            width: 108rpx;
            height: 108rpx;
        }

        .leb {
            font-weight: 600;
            font-size: 22rpx;
            color: #333333;
            margin: 8rpx 0 6rpx 0;
        }

        .wherom {
            font-size: 20rpx;
            color: #999999;
        }
    }
}

:deep(.tn-popup__content) {
    width: 400rpx;
    position: absolute;
    height: 480rpx;
    border-radius: 16rpx;
    margin-top: -280rpx;
    margin-right: -100rpx;
    overflow: auto !important;
    left: 60% !important;
}

.popupBox {
    background: #fff;
    padding: 50rpx;
    overflow: scroll;
    font-size: 32rpx;
    color: #333333;
    margin-left: 330rpx;
    margin-top: -480rpx;
    border-radius: 20rpx;
    width: 360rpx;

    .proItem {
        margin-bottom: 40rpx;

        .itemBox {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .numcas {
                font-size: 36rpx;
                color: #999999;
            }
        }
    }

    .setRoom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: #F2F2F2 solid 2rpx;
        padding-top: 40rpx;
    }

    .seting {
        width: 48rpx;
        height: 48rpx;
    }
}

.nullIMg {
    display: flex;
    justify-content: center;
}
.buxnj {
    height: 50rpx;
}
</style>