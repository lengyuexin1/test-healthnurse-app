<template>
    <view class="container">
        <z-paging ref="paging" :auto="false" v-model="dataList" :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="暂无数据~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }">
            <template #top>
                <view style="background:linear-gradient(180deg, #DFF7EF 20%, #FFFFFF 100%);">
                    <customNavbar :pageTitle="'设备管理'"></customNavbar>
                    <view class="tabox" v-if="room.id === 0">
                        <TnTabs v-model="current" @change="changeTab" active-color="rgb(41, 200, 111)" font-size="28rpx" 
                        active-font-size="30rpx" bg-color="rgba(0,0,0, 0)" bar-color="rgb(41, 200, 111)" bottom-shadow="false">
                            <TnTabsItem @click="changeTab" v-for="(item, index) in roomList" :key="index" :title="item.name" />
                        </TnTabs>
                    </view>
                </view>
            </template>
            <TnCheckboxGroup v-model="delRimId" placement="column" shape="circle" activeColor="#29C86F"
                @change="checkboxChange">
                <view class="devicebox row i-center j-between">
                    <block v-for="(item, index) in dataList" :key="index">
                        <view class="deviceli" @click="linkAlarmDetail(item)">
                            <view class="row j-between">
                                <image :src="item.thumb" class="more_icon"></image>
                                <view class="roomcheck" v-if="delShow">
                                    <TnCheckbox :label="item.id"></TnCheckbox>
                                </view>
                            </view>
                            <view class="devicetitle u-line-1">{{ item.name }}</view>
                            <view class="devicemore row i-center">
                                <view class="devicename u-line-1 row i-center">{{ item.roomName || "" }}</view>
                            </view>
                        </view>
                    </block>
                </view>
            </TnCheckboxGroup>
            <template #bottom>
                <view class="fotbox">
                    <view class="fotbtn" v-if="dataList.length > 0">
                        <TnButton v-if="!delShow" @click="delShow = true" width="100%" height="90" text-color="#fff"
                            font-size="32rpx" bg-color="#111214" border-color="#E3E3E3">管理</TnButton>
                        <view class="row i-center j-between" v-if="delShow">
                            <TnCheckboxGroup v-model="allList" placement="row" shape="circle" activeColor="#29C86F"
                                @change="unanimous">
                                <TnCheckbox label="全选" name="全选"></TnCheckbox>
                            </TnCheckboxGroup>
                            <view class="fotflx row i-center j-between">
                                <view class="romnagbtn btn">
                                    <TnButton @click="abolish" border-color="#E3E3E3" plain text-color="#535353"
                                        font-size="32rpx" width="100%" height="90" bg-color="#fff">取消</TnButton>
                                </view>
                                <view class="romnagbtn btns">
                                    <TnButton border-color="#E3E3E3" text-color="#fff" font-size="32rpx" width="100%"
                                        height="90" bg-color="#111214" @click="openRemove">删除</TnButton>
                                </view>
                            </view>
                        </view>
                    </view>
                    <u-safe-bottom></u-safe-bottom>
                </view>
            </template>
        </z-paging>

        <!-- <view class="deviceadd column i-center j-center" @click="linkDeviceCreate" v-if="isShowAddBtn">
            <u-icon name="plus" bold size="14" color="#ffffff"></u-icon>
            <view class="devicetxt">添加</view>
        </view> -->
        <TnModal ref="modalRef" />
    </view>
</template>

<script lang="ts" setup>
import TnModal from '@tuniao/tnui-vue3-uniapp/components/modal/src/modal.vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import TnCheckboxGroup from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox-group.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { getAssetsPic } from "@/common/setPicture"
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { ref, computed } from "vue"
import { onLoad, onShow } from "@dcloudio/uni-app"
import { gotoDeviceDetail, gotoBodyTem } from "@/routes/wisdom-routes"
import { allRoomList, roomDeviceList, deviceDelete } from "@/api/room-api"

const modalRef = ref()
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const isShowAddBtn = computed(() => {
    return (roomList.value.length > 1 || room.value.id > 0) && !delShow.value
})
const dataList: any = ref([])
const roomList: any = ref([{ id: 0, name: "全部" }])
const current = ref(0)
const room = ref({
    id: 0,
    name: ""
})
const paging = ref()
const delShow = ref(false)
const delRimId: any = ref([])
const allList = ref([])
const removeShow = ref(false)
onLoad((option: any) => {
    if (option.roomId) {
        room.value = {
            id: option.roomId, name: option.roomName
        }
    }
    else {
        getRoomList()
    }
})
onShow(() => {
    queryList(0)
})

// 删除设备
const removeCaler = () => {
    if (delRimId.value.length <= 0) {
        // this.$u.toast("请选择需要删除的设备")
        return
    }
    const datasd = {
        deviceIds: delRimId.value
    }
    deviceDelete(datasd).then(() => {
        // this.$u.toast("删除成功")
        delRimId.value = []
        allList.value = []
        removeShow.value = false
        paging.value.reload()
    }).catch(err => {
        console.log(err);
    })
}
const unanimous = (e: any) => {
    if (e.length === 0) {
        delRimId.value = []
    }
    else {
        delRimId.value = dataList.value.map((x: any) => x.id)
        console.log(delRimId.value);
    }
}
const abolish = () => {
    delShow.value = false
    delRimId.value = []
    allList.value = []
}
const openRemove = () => {
    if (delRimId.value.length <= 0) {
        // this.$u.toast("请选择需要删除的设备")
        return
    }
    removeShow.value = true
    modalRef.value?.showModal({
        title: '操作提示',
        content: '确定删除该设备？',
        showCancel: true,
        cancel: () => {
            console.log('点击了取消按钮')
        },
        confirm: () => {
            removeCaler()
        },
    })
}
const checkboxChange = (e: any) => {
    if (e.length === dataList.value.length) {
        allList.value = ["全选"]
    }
    else {
        allList.value = []
    }
}
// 房间列表
const getRoomList = () => {
    allRoomList({
        pageSize: 100,
        pageNumber: 1,
        query: {}
    }).then((res: any) => {
        roomList.value = roomList.value.concat(res.data.map((x: any) => ({
            ...x,
            name: x.name
        })))
        paging.value.reload()
    })
}
// 设备列表
const queryList = (id:any) => {
    const roomId = id + ''
    roomDeviceList(roomId).then((res: any) => {
        console.log(res)
        const list = res.map((x: any) => {
            const roomss: any = room.value.id ? room.value : roomList.value.find(n => n.id === x.patientId)
            return ({
                ...x,
                roomName: roomss ? roomss.name : "--"
            })
        })
        paging.value.complete(list)
        if (list.length === 0) {
            delShow.value = false
        }
    }).catch(() => {
        paging.value.complete(false)
    })
}
// tab切换
const changeTab = (e: any) => {
    current.value = e
    if (roomList.value.length < 1) {
        return
    }
    queryList(roomList.value[current.value].id)
}
// 设备详情
const linkAlarmDetail = (item) => {
    console.log(item);
    if (item.model == 'TEMPERATURE') {
        return gotoBodyTem(item.mac)
    }
    if (delShow.value) { return }
    gotoDeviceDetail({
        deviceId: item.id,
        deviceName: item.name,
        status: item.status,
        sn: item.sn
    }, item.model)
}
</script>

<style lang="scss" scoped>
.tabox {
    padding: 0 0rpx;
}

.devicebox {
    padding: 20rpx 20rpx 0;
    flex-wrap: wrap;

    .deviceli {
        box-sizing: border-box;
        width: 346rpx;
        height: 290rpx;
        background: #FFFFFF;
        border-radius: 24rpx;
        margin-bottom: 20rpx;
        padding: 30rpx;

        .more_icon {
            width: 108rpx;
            height: 108rpx;
        }

        .devicetitle {
            margin-top: 8rpx;
            font-weight: bold;
            font-size: 28rpx;
            color: #1A1A1A;
        }

        .devicemore {
            margin-top: 8rpx;

            .devicename {
                font-weight: 400;
                font-size: 24rpx;
                color: #999999;

                /* &::after{
                    content: "";
                    display: block;
                    height: 28rpx;
                    border-right: 4rpx solid #F2F2F2;
                    width: 0;
                    margin: 0 16rpx;
                } */
            }

            .devicetype {
                font-weight: 400;
                font-size: 24rpx;
                color: #00CC33;
                flex-shrink: 0;

                &.abnormal {
                    color: #eb3941;
                }
            }
        }
    }
}

.fotbox {
    background: #FFFFFF;
    box-shadow: 0rpx -16rpx 8rpx rgba(0, 0, 0, 0.02);

    .fotbtn {
        padding: 20rpx 30rpx;

        .fotflx {
            flex: 1;
            margin-left: 90rpx;

            .romnagbtn {
                width: 240rpx;
            }

            .btns {
                margin-left: 20rpx;
            }
        }
    }
}

.deviceadd {
    background-color: #29C86F;
    width: 108rpx;
    height: 108rpx;
    border-radius: 50%;
    position: fixed;
    right: 40rpx;
    bottom: 280rpx;
    z-index: 999;

    .devicetxt {
        font-size: 24rpx;
        margin-top: 4rpx;
        color: #FFFFFF;
    }
}
:deep(.tn-checkbox-group) {
    display:block !important;
}
</style>
