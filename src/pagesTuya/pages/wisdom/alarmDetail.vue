<template>
    <z-paging-swiper class="swiper-item">
        <template #top>
            <!-- <bc-page-navbar :title="data.deviceName"></bc-page-navbar> -->
            <TnTabs v-model="data.current" :scroll="false" @change="changeTab">
                <TnTabsItem class="tabsItem" :active-style="{ color: '#29C86F', fontSize: '32rpx', fontWeight: 'bold' }"
                    :inactive-style="{ color: '#666666', fontSize: '32rpx' }" v-for="(item, index) in data.tabList"
                    :key="index" :title="item.text" />
            </TnTabs>
        </template>
        <swiper class="swiper" :current="data.current" @change="onswiperchange">
            <swiper-item>
                <alarmMation :deviceId="data.deviceId" :messList="data.messList" />
            </swiper-item>
            <swiper-item>
                <peopleManag ref="caller" :deviceId="data.deviceId" />
            </swiper-item>
            <swiper-item>
                <alarmRecord :deviceId="data.deviceId" />
            </swiper-item>
        </swiper>
    </z-paging-swiper>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app"
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import alarmMation from "../components/alarmPonents/alarmMation.vue"
import peopleManag from "../components/alarmPonents/peopleManag.vue"
import alarmRecord from "../components/alarmPonents/alarmRecord.vue"
import { getAlarmDetail } from "@/api/room-api"
import { ref, reactive } from 'vue'
import dayjs from "dayjs"
interface Data {
    deviceName: string
    current: number
    tabList: any
    deviceId: any
    messList: any
    userList: any
}
const data = reactive<Data>({
    deviceName: '跌倒报警器',
    current: 0,
    tabList: [
        { id: "1", text: "详情" },
        { id: "2", text: "管理接警人" },
        { id: "3", text: "报警记录" }
    ],
    deviceId: 0,
    messList: [],
    userList: []
})
const onswiperchange = (e: any) => {
    data.current = e.detail.current
}
const changeTab = (e: any) => {
    console.log(e)
}
onLoad((option: any) => {
    data.deviceId = option.deviceId
    data.deviceName = option.deviceName
    data.userList = uni.getStorageSync('userList')
    getAlarmDe()
})
const getAlarmDe = () => {
    getAlarmDetail(data.deviceId).then(res => {
        data.messList = [
            {
                title: "基本信息",
                childs: [
                    { id: 1, name: '设备编号', desc: res.sn },
                    { id: 2, name: '安装地址', desc: res.address },
                    { id: 3, name: '安装时间', desc: dayjs(res.utcCreated * 1000).format("YYYY-MM-DD HH:mm:ss") },
                    { id: 4, name: '绑定人名称', desc: data.userList[0].nickname },
                    { id: 5, name: '绑定人电话', desc: data.userList[0].userMobile }
                ]
            }
        ]

        if (res.model === "ALARM") {
            data.messList.push({
                title: "网络信息",
                childs: [
                    { id: 6, name: '网关', desc: res.gateway },
                    { id: 7, name: 'IMEI', desc: res.sn },
                    { id: 8, name: '电池容量', desc: `${res.batteryCapacity}%` },
                    { id: 9, name: '协议', desc: res.protocol },
                    { id: 10, name: '产品编号', desc: res.productId },
                    { id: 11, name: '信号参数', desc: res.signalValue }
                ]
            })
        }
    }).catch(err => {
        // setTimeout(() => { uni.navigateBack() }, 1000)
    })
}
</script>

<style lang="scss" scoped>
.bg_box {
    background: linear-gradient(180deg, #DFF7EF 0%, #F8F9F9 100%);
    z-index: 10080;
}

.swiper {
    flex: 1;
    height: 100%;
}

.showOne {
    height: 100%;
}

.tabsItem {
    width: 50%;
}
</style>
