<template>
    <view class="pickName tn-flex-row" @tap="data.openPicker = true">
        <text>{{ data.pickerValue }}数据</text>
        <TnIcon name="down" color="#666666" size="28" />
    </view>
    <view class="wrap">
        <view class="echarts_wrap">
            <view class="title">粉丝变化趋势</view>

            <view class="tn-flex-row">
                <view :class="['type tn-flex-center-center', data.typeIndex == index ? 'active' : '' ]" v-for="(item, index) in data.typeData" :key="index" @tap="clickType(index)">
                    {{ item.name }}
                </view>
            </view>

            <view class="data_Echarts">
                <lechart ref="chartRef"></lechart>
            </view>
        </view>
        
        <BCNotify ref="bcNotify"></BCNotify>
        <TnPicker v-model="data.pickerValue" v-model:open="data.openPicker" :data="data.pickerData" @confirm="onChange" />
    </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import lechart from '@/Create/uni_modules/lime-echart/components/l-echart/l-echart.vue'
// #ifdef APP-PLUS || H5
import * as echarts from 'echarts'
// #endif
// #ifdef MP-WEIXIN
const echarts = require('../../../uni_modules/lime-echart/static/echarts.min.js')
// #endif
import BCNotify from '@/components/notify/index.vue'
import { liveTrendData } from '@/api/live-api'
import dayjs from "dayjs"

const props = defineProps({
    liveInfo: Object
})

const data = reactive({
    nowTime: 0,
    startTime: 0,
    tabsData: [
        { name: '观众人数', num: 0, unit: '人' },
        { name: '新增粉丝', num: 0, unit: '人' },
        { name: '开播时长', num: 0, unit: '分钟' }
    ],
    currentTabIndex: 0,
    typeData: [
        { name: '累计粉丝', num: 0 },
        { name: '净增粉丝', num: 0 },
        { name: '流失粉丝', num: 0 }
    ],
    typeIndex: 0,
    liveTrendData: {},
    option: {
        tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:'10%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: [],
                axisTick:{
                    show:false // 不显示坐标轴刻度线
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                max: 5,
                min: 0,
                minInterval:1,
            }
        ],
        series: [
            {
                // name: '阅读量',
                name: '',
                type: 'line',
                stack: 'Total',
                symbol: 'circle',
                areaStyle: {
                    color:'#FFF6F6',
                },
                itemStyle: {
                    normal: {
                    color: '#EA3E1A', //改变折线点的颜色
                    lineStyle: {
                        color: '#EA3E1A' //改变折线颜色
                    }
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            }
        ]
    },
    pickerValue: '今日',
    openPicker: false,
    pickerData: ['今日', '前7天', '前30天'],
    pickerIndex: 0,
})

const bcNotify = ref()

const chartRef = ref() 

// 图表初始化方法
const init = async (Xarr = [], Yarr = []) => {

    // chart 图表实例不能存在data里
    const chart = await chartRef.value.init(echarts);
            
    // 数据请求回来后给图表赋值绘制图表 
    data.option.xAxis[0].data = Xarr
    data.option.series[0].data = Yarr

    // 有数据时不设置最大、最小值，没有则设置
    data.option.yAxis[0].max = Yarr.length == 0 ? 5 : null
    data.option.yAxis[0].min = Yarr.length == 0 ? 0 : null
    chart.setOption(data.option,true)

}

// 处理折线图数据
const formatData = () => {
    let filterData = {}

    if (data.typeIndex == 0) {
        filterData = data.liveTrendData['fansStat']
    }
    else if (data.typeIndex == 1) {
        filterData = data.liveTrendData['netFollowersStat']
    }
    else if (data.typeIndex == 2) {
        filterData = data.liveTrendData['followersLostStat']
    }

    const keysArray = Object.keys(filterData)
    const valuesArray = Object.values(filterData)

    // x y 轴分别重新赋值
    init(keysArray, valuesArray)
}

// 获取折线图数据
const getLiveTrendData = () => {
    liveTrendData({
        channelId: props.liveInfo.id,
        startTime: data.startTime,
        endTime: data.nowTime,
        type: 4
    }).then((res) => {
        data.liveTrendData = res
        formatData()
    })
}

const clickType = (index) => {
    data.typeIndex = index

    getLiveTrendData()
}

const onChange = (value) => {
    data.pickerIndex = data.pickerData.indexOf(value)

    data.nowTime = Math.floor(dayjs().valueOf() / 1000)

    if (data.pickerIndex == 0) {
        data.startTime = data.nowTime
    }
    else if (data.pickerIndex  == 1) {
        const now = dayjs()
        // 获取7天前的时间
        const sevenDaysAgo = now.subtract(7, 'day')
        // 获取7天前的时间戳（毫秒）
        data.startTime = Math.floor(sevenDaysAgo.valueOf() / 1000)
    }
    else if (data.pickerIndex  == 2) {
        const now = dayjs()
        // 获取30天前的时间
        const thirtyDaysAgo = now.subtract(30, 'day')
        // 获取30天前的时间戳（毫秒）
        data.startTime = Math.floor(thirtyDaysAgo.valueOf() / 1000)
    }

    getLiveTrendData()
}

onMounted(() => {
    const nowTime = Math.floor(dayjs().valueOf() / 1000)
    data.nowTime = nowTime
    data.startTime = nowTime

    getLiveTrendData()
})

</script>

<style lang="scss" scoped>
.pickName {
    padding: 30rpx 30rpx 0 30rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #666666;

    text {
        padding-right: 10rpx;
    }
}

.wrap {
    margin: 30rpx;
    background-color: #FFFFFF;
    border-radius: 16rpx;
}

.echarts_wrap {
    margin-top: 40rpx;
    padding: 20rpx;

    .title {
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
    }

    .type {
        padding: 12rpx 20rpx;
        margin-top: 40rpx;
        margin-right: 24rpx;
        font-size: 24rpx;
        color: #666666;
        background: #F5F5F5;
        border-radius: 30rpx;
        border: solid 1rpx rgba(0, 0, 0, 0);
    }

    .active {
        font-weight: bold;
        color: #EA3E1A;
        background: #FFF6F6;
        border: 2rpx solid #FFE4E4;
    }

    .data_Echarts {
        width: 100%;
        height: 300rpx;
        margin-top: 40rpx;
        margin-bottom: 20rpx;
    }
}

</style>
