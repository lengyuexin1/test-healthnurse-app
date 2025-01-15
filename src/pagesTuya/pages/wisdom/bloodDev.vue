<template>
    <view class="container">
        <z-paging ref="paging" v-model="dataList" @query="queryList" :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }" :auto="true">
            <!-- <bc-page-navbar :title="'血压'"></bc-page-navbar> -->
            <view class="contBox">
                <view class="topBox">
                    <view class="hist">历史记录</view>
                    <view class="tips" @click="data.createShow = true">血压范围值参考</view>
                </view>
                <view class="tableTitle">
                    <view class="dateTime">测量日期</view>
                    <view class="shofaBox">
                        <view class="shouFa">
                            <view class="shouya">收缩压</view>
                            <view class="faya">(mmHg)</view>
                        </view>
                        <view class="shouFa">
                            <view class="shouya">舒张压</view>
                            <view class="faya">(mmHg)</view>
                        </view>
                        <view class="shouFa">
                            <view class="shouya">脉搏</view>
                            <view class="faya">(次/分)</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="forList">
                <view class="liItem" v-for="(item, index) in dataList" :key="index" @click="gotoResule(item)">
                    <view class="hangha">
                        <view class="dayTime">{{ timeType(item.utcLog) }}</view>
                        <view class="bgCent">
                            <view class="fengTime">{{ timeTypeWto(item.utcLog) }}</view>
                            <view class="shouCss">{{ item.systolic }}</view>
                            <view class="status" :class="{ noticsuc: item.level == '2', notisdc: item.levelName == '3' }">{{
                                item.level == 2 ? '偏低' : item.level == 3 ? '偏高' : '正常' }}</view>
                            <view class="faCss">{{ item.diastolic }}</view>
                            <view class="mbo">
                                <view class="maboNum">{{ item.pulse }}</view>
                                <!-- <view>></view> -->
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <TnPopup v-model="data.createShow" round="20">
                <view class="catebox">
                    <view class="cank">血压范围值参考：</view>
                    <view class="headedui">根据《国家基层高血压防治管理指南2020版》，正常的血压值建议保持在90/60-140/90mmHg范围内：</view>
                    <view class="headedui">
                        <view>高血压：</view>
                        <view>收缩压≥140mmHg，舒张压≥90mmHg</view>
                    </view>
                    <view class="headedui">
                        <view>正常：</view>
                        <view>收缩压为90mmHg~139mmHg，舒张压为60mmHg~89mmHg</view>
                    </view>
                    <view class="headedui lastBot">
                        <view>低血压：</view>
                        <view>收缩压小于90mmHg，舒张压小于60mmHg</view>
                    </view>
                    <view class="catebtn">
                        <TnButton width="100%" height="90"
                            :custom-style="{ height: '84rpx', marginRight: '30rpx', fontSize: '32rpx' }" text-color="#fff"
                            font-size="32rpx" bg-color="#111214" border-color="#E3E3E3" @click="gotoNext">知道了</TnButton>
                    </view>
                </view>
            </TnPopup>
        </z-paging>
    </view>
</template>
<script setup lang="ts">
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { getAssetsPic } from '@/common/setPicture'
import { ref, reactive, computed } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { gotobooldLuc } from "@/routes/active-routes"
import { getBloodData } from "@/api/room-api"
import dayjs from "dayjs"
interface Data {
    createShow: boolean
    booldData: any
    deviceId: any
    showOne: boolean
    showTwo: boolean
    startTime: any
    endTime: any,
}
const data = reactive<Data>({
    createShow: false,
    booldData: {
        avgSystolic: '0',
        avgDiastolic: '0',
        maxValue: '0',
        minValue: '0'
    },
    deviceId: '',
    showOne: false,
    showTwo: false,
    startTime: (dayjs().subtract(7, 'day')).valueOf(),
    endTime: Number(new Date()),
})
const paging = ref()
const dataList:any = ref([])
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
onLoad((option: any) => {
    data.deviceId = option.deviceId
})
const gotoNext = () => {
    data.createShow = false
}
const queryList = (pageNumber: any, pageSize: any) => {
    const sentData = {
        pageNumber,
        pageSize,
        query: {
            deviceId: data.deviceId
        }
    }
    getBloodData(sentData).then(res => {
        let listArr: any = []
        console.log(res.data);
        res.data.forEach((element: any) => {
            listArr = [...listArr, ...element.dataList]
        });
        paging.value.complete(listArr)
    })
}
const timeType = (time: any) => {
    const dataTime = dayjs(Number(time)).format('YYYY年MM月DD日 HH:mm:ss')
    return dataTime.slice(5, 10)
}
const timeTypeWto = (time: any) => {
    const dataTime = dayjs(Number(time)).format('YYYY-MM-DD HH:mm')
    return dataTime.slice(10, 20)
}
const gotoResule = (value: any) => {
    const senda = {
        timeOne: (data.startTime + '').slice(0, 10),
        timeTwo: (data.endTime + '').slice(0, 10),
        devId: data.deviceId,
        text: value.level,
        systolic: value.systolic,
        diastolic: value.diastolic
    }
    console.log(senda);
    gotobooldLuc(JSON.stringify(senda))
}
const getValue = (value: any) => {
    if (value.includes('.')) {
        return "timeLi"
    }
}
</script>
<style lang="scss" scoped>
page {
    background: #ffffff;
}

.forList {
    margin: 0 30rpx;

    .liItem {
        margin: 30rpx 0;
    }

    .hangha {
        display: flex;
        align-items: center;

        .dayTime {
            font-size: 28rpx;
            color: #333333;
        }

        .bgCent {
            flex: 1;
            display: flex;
            align-items: center;
            margin-left: 20rpx;
            background: #F7F7F7;
            border-radius: 12rpx;
            padding: 22rpx 20rpx;

            .shouCss {
                font-size: 32rpx;
                color: #29C86F;
                margin: 0 16rpx 0 20rpx;
                width: 60rpx;
            }

            .status {
                padding: 6rpx;
                background: #29C86F;
                border-radius: 6rpx;
                font-size: 24rpx;
                color: #FFFFFF;
                margin-right: 50rpx;
            }

            .noticsuc {
                background: #FFB32E;
                color: #fff;
            }

            .notisdc {
                background: #FF4747;
                color: #FFFFFF;
            }

            .faCss {
                font-size: 32rpx;
                color: #333333;
            }

            .mbo {
                display: flex;
                justify-content: flex-end;
                flex: 1;
                margin-right: 10rpx;
            }

            .maboNum {
                font-size: 32rpx;
                margin-right: 40rpx;
                color: #333333;
            }

            .fengTime {
                font-size: 26rpx;
                color: #999999;
            }
        }
    }
}

.contBox {
    margin: 40rpx 30rpx;

    .topBox {
        display: flex;
        justify-content: space-between;

        .hist {
            font-weight: 600;
            font-size: 32rpx;
            color: #333333;
        }

        .tips {
            font-size: 30rpx;
            color: #3E92FF;
        }
    }

    .tableTitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 30rpx 0;
        font-size: 28rpx;
        color: #999999;

        .shofaBox {
            display: flex;
            width: 66%;
            justify-content: space-between;
            margin-right: 50rpx;
        }

        .shouFa {
            display: flex;
            flex-direction: column;
            align-items: center;

            .shouya {
                margin-top: 6rpx;
            }
        }
    }
}

.zp-paging-container {
    background: #fff !important;
}

.bg0 {
    background: #29C86F;
}

.bg1 {
    background: #FFB32EFF;
}

.bg2 {
    background: #FF4747;
}

.bottomText {
    margin: 50rpx 20rpx 0 20rpx;

    .wakeYou {
        font-weight: 600;
        font-size: 32rpx;
        color: #333333;
        margin-bottom: 16rpx;
    }

    .adsc {
        margin-top: 50rpx;
        margin-bottom: 30rpx;
    }

    .julab {
        font-size: 26rpx;
        color: #666666;
        margin-bottom: 30rpx;
    }

    .oneText {
        font-size: 26rpx;
        color: #666666;
        line-height: 46rpx;
    }
}

.catebox {
    box-sizing: border-box;
    width: 650rpx;
    background: #FFFFFF;
    border-radius: 40rpx;
    padding: 36rpx;
    position: relative;

    .cank {
        font-weight: 600;
        font-size: 30rpx;
        color: #333333;
    }

    .headedui {
        margin-top: 20rpx;
        font-size: 26rpx;
        color: #666666;
    }

    .lastBot {
        padding-bottom: 50rpx;
    }
}
</style>