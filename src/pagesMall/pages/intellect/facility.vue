<template>
    <view class="content">
        <z-paging ref="paging" :auto="false" v-model="data.dataList" @query="queryList" :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="暂无数据~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }">
            <template #top>
                <view style="background:linear-gradient(180deg, #DFF7EF 20%, #FFFFFF 100%);">
                    <!-- <customNavbar bgColor="transparent" pageTitle="智慧椿家" leftIcon=" "></customNavbar> -->
                    <bc-page-navbar title="智慧椿家">
                        <template #back>
                            <view></view>
                        </template>
                    </bc-page-navbar>
                    <view class="tabox">
                        <TnTabs v-model="data.current" @click="changeTab" active-color="#333" active-font-size="36rpx"
                            active-bold color="#959595" font-size="36rpx" bar-color="transparent">
                            <TnTabsItem v-for="item in data.roomList" :key="item.id" :title="item.name">
                            </TnTabsItem>
                            <!-- <template #default>
                                <view class="tabrig row i-center j-center">
                                    <TnIcon @click="data.show = true" name="menu-list" size="30" color="#5A5A5A" bold>
                                    </TnIcon>
                                    <template v-if="data.show">
                                        <view class="tabbg" @click="data.show = false"></view>
                                        <view class="tabopt">
                                            <scroll-view class="scrolbox" scroll-y="true">
                                                <view class="romli row i-center j-between"
                                                    @click="linkRoomDetail(item.id, item.name)"
                                                    v-for="(item) in data.roomList" :key="item.id">
                                                    <view>{{ item.name }}</view>
                                                </view>
                                            </scroll-view>
                                            <view class="romli rommag row i-center j-between" @click="linkRoomManag">
                                                <view>房间管理</view>
                                                <image style="width: 48rpx;height: 48rpx;"
                                                    :src="getAssetsUrl('/zhihu/zh-set.svg')"></image>
                                            </view>
                                        </view>
                                    </template>
                                </view>
                            </template> -->
                        </TnTabs>
                        <view class="menu-list">
                            <view class="tabrig row i-center j-center">
                                <TnIcon @click="data.show = true" name="menu-list" size="30" color="#5A5A5A" bold>
                                </TnIcon>
                                <template v-if="data.show">
                                    <view class="tabbg" @click="data.show = false"></view>
                                    <view class="tabopt">
                                        <scroll-view class="scrolbox" scroll-y="true">
                                            <view class="romli row i-center j-between"
                                                @click="linkRoomDetail(item.id, item.name)"
                                                v-for="(item) in data.roomList" :key="item.id">
                                                <view>{{ item.name }}</view>
                                            </view>
                                        </scroll-view>
                                        <view class="romli rommag row i-center j-between" @click="linkRoomManag">
                                            <view>房间管理</view>
                                            <image style="width: 48rpx;height: 48rpx;"
                                                :src="getAssetsUrl('/zhihu/zh-set.svg')"></image>
                                        </view>
                                    </view>
                                </template>
                            </view>
                        </view>
                    </view>
                </view>
            </template>
            <template #bottom>
                <view style="height: 50px;"></view>
                <!-- <u-safe-bottom></u-safe-bottom> -->
            </template>

            <!-- <DeviceItem ref="devItem" :dataList="data.dataList" /> -->
        </z-paging>
    </view>
</template>

<script lang="ts" setup>
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
// import DeviceItem from "@/Mall/components/deviceItem/deviceItem.vue"
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getAssetsPic } from "@/common/setPicture"
import { deviceList, patientList } from "@/api/smart-api"
import { gotoRoomManag, gotoRoomDetail } from "@/routes/wisdom-routes"
import { reactive, computed, onMounted, ref } from 'vue'
import { PlatformManage } from "@bc/sys"
interface IRoom {
    id: number,
    name: string
}
interface Data {
    dataList: Array<any>,
    roomList: Array<IRoom>,
    current: number,
    show: boolean
}
const data = reactive<Data>({
    dataList: [],
    roomList: [
        { id: 0, name: "全部" }
    ],
    current: 0,
    show: false
})
const getAssetsUrl = computed(() => {
    return (str: string) => {
        return getAssetsPic(str)
    }
})
const paging = ref()
onMounted(() => {
    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            (paging.value as any).complete([])
            return
        }

        getRoomList()
    })
})
const getRoomList = () => {
    patientList({
        pageSize: 100,
        pageNumber: 1,
        query: {}
    }).then(res => {
        console.log(res)
        data.roomList = data.roomList.concat(res.data.map(x => ({
            ...x,
            name: x.name
        })))
        paging.value.reload()
    }).catch((err) => {
        console.log(err)
        paging.value.complete(false)
    })
}

const queryList = () => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            (paging.value as any).complete([])
            return
        }
        const roomId = data.roomList[data.current].id
        console.log(roomId)
        deviceList(String(roomId)).then(res => {
            const list = res.map(x => {
                const room = data.roomList.find(n => n.id === x.patientId)
                return ({
                    ...x,
                    roomName: room ? room.name : "--"
                })
            })
            paging.value.complete(list)
        }).catch(() => {
            paging.value.complete(false)
        })

    })

}
// tab切换
const changeTab = (e) => {
    console.log(e)
    data.current = e.index
    paging.value.reload()
}
const linkRoomManag = () => {
    gotoRoomManag()
    data.show = false
}
const linkRoomDetail = (id, name) => {
    if (!id) { return }
    gotoRoomDetail(id, name)
    data.show = false
}
</script>

<style lang="scss" scoped>
.tabox {
    position: relative;

    .tabrig {
        width: 68rpx;
        height: 48rpx;
        border-radius: 24rpx;
        background-color: #E3E3E3;
        margin-left: 20rpx;
        position: relative;
        z-index: 999;

        .tabopt {
            position: absolute;
            width: 420rpx;
            height: 448rpx;
            background-color: #FFFFFF;
            border-radius: 28rpx;
            right: 0;
            top: 100%;
            box-sizing: border-box;
            padding: 50rpx;

            .scrolbox {
                height: 230rpx;
                padding-bottom: 40rpx;
            }

            .romli {
                font-weight: bold;
                font-size: 32rpx;
                color: #333333;
                margin-bottom: 46rpx;

                &:last-child {
                    margin-bottom: 0;
                }

                .romnum {
                    font-weight: bold;
                    font-size: 36rpx;
                    color: #999999;
                }
            }

            .rommag {
                padding-top: 42rpx;
                border-top: 2rpx solid #F2F2F2;
            }
        }

        .tabbg {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, .6);
            z-index: -1;
        }
    }

    .menu-list {
        position: absolute;
        top: 15rpx;
        right: 10rpx;
    }
}
</style>
