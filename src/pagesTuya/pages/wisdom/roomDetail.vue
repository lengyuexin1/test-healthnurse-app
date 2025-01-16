<template>
    <view class="container">
        <z-paging ref="paging">
            <template #top>
                <PageTopbg :zIndex="-1"></PageTopbg>
                <bc-page-navbar :title="'房间详情'"></bc-page-navbar>
            </template>
            <view class="rom-box page-public-bg">
                <view class="rom-mation row i-center j-between">
                    <view class="rom-mat-lef">
                        <view class="rom-mat-name" @click="gotoTY">{{ data.roomName || '--' }}的房间</view>
                        <view class="rom-mat-more row i-center">
                            <div class="rom-mat-line row i-center">室内</div>
                            <div class="rom-mat-line row i-center">PM2.5</div>
                            <div class="rom-mat-line row i-center">{{ '--' }}</div>
                        </view>
                    </view>
                    <view class="rom-mat-rig">
                        <TnIcon @click="linkDeviceCreate" name="add-fill" color="rgba(41, 200, 111, 1)"
                            size="80"></TnIcon>
                    </view>
                </view>
                <view class="rom-air row i-center j-between">
                    <view class="rom-air-lef">
                        <view class="rom-air-li">
                            <view class="rom-air-num">{{ getWeatherMation("temperature_humidity_sensor") }} <text>℃</text>
                            </view>
                            <view class="rom-air-tex">温度</view>
                        </view>
                        <view class="rom-air-li">
                            <view class="rom-air-num">{{ getWeatherMation("temperature_humidity_sensor.relative_humidity")
                            }}<text>%</text></view>
                            <view class="rom-air-tex">湿度</view>
                        </view>
                    </view>
                    <view class="rom-air-rig">
                        <u-image :src="getAssetsUrl('/zhihu/rompic.png')" width="440rpx" height="240rpx"
                            mode="widthFix"></u-image>
                    </view>
                </view>
                <view class="rom-slep">
                    <view class="rom-sle-li">
                        <view class="rom-sle-tit">血压</view>
                        <view class="rom-sle-more">低压<text>{{ getTypeMation(2) }}</text> / 高压<text>{{ getTypeMation(1)
                        }}</text>(mmHg)</view>
                    </view>
                    <view class="rom-sle-li">
                        <view class="rom-sle-tit">呼吸率</view>
                        <view class="rom-sle-more"><text>{{ data.realInfo.breathing || '--' }}</text> 次/分钟</view>
                    </view>
                    <view class="rom-sle-li">
                        <view class="rom-sle-tit">体温</view>
                        <view class="rom-sle-more"><text>{{ getTypeMation(4) }}</text> ℃</view>
                    </view>
                    <view class="rom-sle-li">
                        <view class="rom-sle-tit">心率</view>
                        <view class="rom-sle-more"><text>{{ data.realInfo.heartRate || '--' }}</text> 次/分钟</view>
                    </view>
                </view>
                <view class="rom-dice">
                    <view class="rom-dic-tit">设备管理</view>
                    <view class="rom-dic-box">
                        <view class="rom-dic-li" v-for="(item) in data.diceList" :key="item.id" @click="linkAlarmDetail(item)">
                            <image :src="item.thumb" width="140rpx" height="140rpx" mode="aspectFit"></image>
                            <view class="rom-dic-name u-line-1">{{ item.name }}</view>
                            <view class="rom-dic-abt row i-center">
                                <view class="rom-dic-peop">{{ item.roomName }}</view>
                                <view class="rom-dic-stu" :class="{ abnormal: item.status !== 3 }">{{ data.statusTex[item.status]
                                    || '未知故障' }}</view>
                            </view>
                        </view>

                    </view>
                    <u-empty :show="data.diceList.length === 0" mode="list" text="暂无设备"
                        :icon="getAssetsUrl('/empty/empty_icon_data.png')"></u-empty>
                </view>
            </view>
        </z-paging>
        <u-safe-bottom></u-safe-bottom>
        <u-toast ref="uToast"></u-toast>
    </view>
</template>

<script setup lang="ts">
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { getAssetsPic } from "@/common/setPicture"
import { onLoad, onShow, onHide, onUnload } from '@dcloudio/uni-app'
import { computed, reactive } from 'vue'
import { gotoDeviceDetail, gotoDeviceChoice, gotoBodyTem, gotoBooldYa, gotoTuYa } from "@/routes/wisdom-routes"
import { deviceList, patientDetail, patientLastData } from "@/api/smart-api"

interface Data {
    roomId: string
    roomName: string
    roomList: any
    diceList: any
    signMation: any //体征信息
    statusTex: any
    roomMemoize: any
    roomWeather: any
    lastInterId: number
    realInfo: any //实时数据
}
const data = reactive<Data>({
    roomId: "",
    roomName: "",
    roomList: [],
    diceList: [],
    signMation: {}, //体征信息
    statusTex: {
        1: "离线",
        3: "使用中", //连网
        4: "故障"
    },
    roomMemoize: [],
    roomWeather: [],
    lastInterId: 0,
    realInfo: {} //实时数据
})

// 获取天气信息
const getWeatherMation = (type: any) => {
    const cache: any = {}
    if (cache[type]) {
        return cache[type]
    }
    const momeize = data.roomWeather.find((it: any) => it.translationKey === type)
    if (!momeize) { return '--' }
    cache[type] = momeize.state
    return cache[type]
}
// 获取不同类型参数
const getTypeMation = (type: any) => {
    const cache: any = {} // 缓存对象
    if (cache[type]) {
        return cache[type]
    }
    const momeize = data.roomMemoize.find(it => it.id === type)

    if (!momeize) { return '--' }

    cache[type] = momeize.value
    return cache[type]
}

onShow(() => {
    getRoomInfo()
    startGetLast()
    getDeviceList()
})
onLoad((option: any) => {
    data.roomId = option.roomId
})
onHide(() => {
    endGetLast()
})
onUnload(() => {
    endGetLast()
})

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const gotoTY = () => {
    gotoTuYa()
}

// 获取设备列表
const getDeviceList = () => {
    deviceList(data.roomId).then(res => {
        const list = res.map(x => {
            return ({
                ...x,
                roomName: data.roomName
            })
        })
        data.diceList = list
    }).catch((err: any) => {
        // this.$refs.uToast.error(err.message)
    })
}

// 设备详情
const linkAlarmDetail = (item: any) => {
    if (item.model == 'TEMPERATURE') {
        return gotoBodyTem(item.mac)
    }
    gotoDeviceDetail({
        deviceId: item.id,
        deviceName: item.name,
        status: item.status,
        sn: item.sn
    }, item.model)
}

// 房间实时数据 按秒进行更新
const getLastData = () => {
    patientLastData(data.roomId).then(res => {
        if (!res.data) { return }
        const data = res.data.match(/.{2}/g)
        if (data.length != 15) {
            throw new Error("数据错误")
        }
        // 0x03-在床 0x04-离床 0x05-打鼾 0x06-体动
        const stus:any = { "03": "在床", "04": "离床", "05": "打鼾", "06": "体动" }
        data.realInfo = {
            heartRate: parseInt(data[11], 16), //转成十进制
            breathing: parseInt(data[12], 16),
            status: stus[data[13]]
        }
    })
}

// 开始获取实时数据
const startGetLast = () => {
    data.lastInterId && endGetLast()
    data.lastInterId = setInterval(() => {
        getLastData()
    }, 1000)
}
// 结束获取实时数据
const endGetLast = () => {
    clearInterval(data.lastInterId)
}
// 房间详情
const getRoomInfo = () => {
    patientDetail(data.roomId).then(res => {
        data.roomMemoize = res.dataList
        data.roomWeather = res.stateList
        data.roomName = res.name
    }).catch((err) => {
       console.log(err.message)
    })
}
// 添加设备
const linkDeviceCreate = () => {
    gotoDeviceChoice(data.roomId)
}
</script>

<style>
page {
    background-color: #F8F9F9;
}
</style>

<style lang="scss" scoped>
.rom-box {
    padding: 1rpx;
}

.rom-mation {
    margin: 30rpx 50rpx 0;

    .rom-mat-name {
        font-weight: bold;
        font-size: 40rpx;
        color: #333333;
    }

    .rom-mat-more {
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        margin-top: 10rpx;

        .rom-mat-line {
            &::after {
                content: "|";
                margin: 0 24rpx;
                color: #B8B8B8;
            }

            &:last-child {
                &::after {
                    content: "";
                    display: none;
                }
            }
        }
    }
}

.rom-air {
    margin: 36rpx 50rpx 0;

    .rom-air-li {
        margin-bottom: 24rpx;
        text-align: center;

        :last-child {
            margin-bottom: 0;
        }

        .rom-air-num {
            font-weight: bold;
            font-size: 48rpx;
            color: #363636;
            line-height: 54rpx;

            text {
                font-size: 32rpx;
            }
        }

        .rom-air-tex {
            font-weight: 400;
            font-size: 28rpx;
            color: #9D9D9D;
            margin-top: 10rpx;
        }
    }
}

.rom-slep {
    margin: 40rpx 20rpx 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;

    .rom-sle-li {
        background: #EEF4F9;
        border-radius: 16rpx;
        padding: 24rpx 30rpx;
        box-sizing: border-box;

        .rom-sle-tit {
            font-weight: bold;
            font-size: 28rpx;
            color: #333333;
        }

        .rom-sle-more {
            margin-top: 8rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #666666;

            text {
                color: rgba(41, 200, 111, 1);
                margin: 0 6rpx;
            }
        }
    }
}

.rom-dice {
    margin: 36rpx 20rpx;

    .rom-dic-tit {
        font-weight: bold;
        font-size: 32rpx;
        color: #363636;
        padding-left: 16rpx;
    }

    .rom-dic-box {
        margin-top: 20rpx;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20rpx;

        .rom-dic-li {
            background: #FFFFFF;
            border-radius: 24rpx;
            padding: 30rpx;

            .rom-dic-name {
                margin: 8rpx 0;
                font-weight: 500;
                font-size: 28rpx;
                color: #1A1A1A;
            }

            .rom-dic-abt {
                .rom-dic-peop {
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #999999;
                    display: flex;

                    &::after {
                        content: '';
                        display: block;
                        height: 28rpx;
                        border-left: 2rpx solid #F2F2F2;
                        margin: 0 16rpx;
                    }
                }

                .rom-dic-stu {
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #00CC33;

                    &.abnormal {
                        color: #eb3941;
                    }
                }
            }
        }
    }
}
</style>
