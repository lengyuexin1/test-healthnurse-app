<template>
    <view class="container">
        <z-paging 
            ref="paging"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="3"
            :hide-empty-view="true"
            :auto-show-system-loading="true"
            :loading-more-enabled="false"
            >
            <view class="page_padding">
                <view class="data_overview">
                    <view class="flow_box">
                        <view class="flow_top_box">
                            <view class="overview_title">数据概览</view>
                        </view>
                        <view class="overview_list">
                            <view class="overview_item">
                                <view class="overview_item_title">昨日净增粉丝数</view>
                                <view class="overview_item_number">{{ data.dataObj.netNewFans ? data.dataObj.netNewFans:'--' }}</view>
                            </view>
                            <view class="overview_item">
                                <view class="overview_item_title">昨日总粉丝数</view>
                                <view class="overview_item_number">{{ data.dataObj.totalFans ? data.dataObj.totalFans:'--' }}</view>
                            </view>
                        </view>
                        <view class="overview_real_time">
                            
                            <view class="up_fans">
                                <text class="up_fans_text">新增</text>
                                <TnIcon name="up-triangle" color="#F24C45" size="28"></TnIcon>
                                <text class="up_fans_number">{{ data.dataObj.addFans ? data.dataObj.addFans:'--' }}</text>
                            </view>
                            <view class="down_fans">
                                <text class="down_fans_text">掉粉</text>
                                <TnIcon name="down-triangle" color="#29C86F" size="28"></TnIcon>
                                <text class="down_fans_number">{{ data.dataObj.offFans ? data.dataObj.offFans:'--' }}</text>
                            </view>
                        </view>
                    </view>
                </view>


                <view class="data_details">
                    <view class="data_details_top_box">
                        <view class="data_details_title">数据总览</view>
                        <view class="data_details_time">近7天</view>
                    </view>
                    <view class="data_details_text">流量趋势</view>
                    
                    <view class="data_Echarts">
                        <!-- 数据可视 -->
                        <lechart ref="chartRef"></lechart>
                    </view>
                    <view class="data_tag_list">
                        <view 
                        class="data_tag" 
                        :class="{'is_clicktag' : data.dataTagIndex == index}" 
                        v-for="(item,index) in data.dataTagList" :key="item.id"
                        @click="changeTagdata(item,index)">
                            <view class="data_tag_icon" :class="{'is_tag_icon' : data.dataTagIndex == index}">
                                <TnIcon name="success" color="#fff"></TnIcon>
                            </view>
                            <text class="data_tag_text">{{item.name}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </z-paging>
    </view>
</template>
    
<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { fansDataLook, fansUserDayLook } from '@/api/create-api'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import lechart from '@/pagesCnt/uni_modules/lime-echart/components/l-echart/l-echart.vue'

// #ifdef APP-PLUS || H5
import * as echarts from 'echarts'
// #endif
// #ifdef MP-WEIXIN
const echarts = require('../../../uni_modules/lime-echart/static/echarts.min.js')
// #endif

// interface Props {
// }
// const props = defineProps<Props>()

const data = reactive({
    tagType:0,
    dataObj: {},
    dataTagIndex: 0,
    dataTagList: [
        {id:1,name:'净增粉丝数'},
        {id:3,name:'新增粉丝数'},
        {id:2,name:'流失粉丝数'},
        {id:4,name:'总粉丝数'},
    ],
    dataList: [],
    tagName: '净增粉丝数',
    dataType: 1,
    option: {
        tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#FFF6F6'
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


})

const getAssetsUrl = computed(()=>(src)=> {
    return getAssetsPic(src)
})


onMounted(() => {

})


const chartRef = ref() 

// 图表初始化方法
const init = async (Xarr = [], Yarr = []) => {

    // chart 图表实例不能存在data里
    const chart = await chartRef.value.init(echarts);
            
    // 数据请求回来后给图表赋值绘制图表 
    data.option.xAxis[0].data = Xarr
    data.option.series[0].data = Yarr
    data.option.series[0].name = data.tagName

    // 有数据时不设置最大、最小值，没有则设置
    data.option.yAxis[0].max = Yarr.length == 0 ? 5 : null
    data.option.yAxis[0].min = Yarr.length == 0 ? 0 : null
    chart.setOption(data.option,true)

}

const getfansDataLook = () => {
    fansDataLook({}).then((res)=>{
        data.dataObj = res
    })
}

const getfansUserDayLook = () => {
    fansUserDayLook({
        startTime: (Date.now()-(7 * 24 * 60 * 60 * 1000))/1000,
        endTime: Date.now() / 1000,
        fansDataType:data.dataType,
    }).then((res)=>{
        formatData(res)
    })
}

// 处理折线图数据
const formatData = (data) => {
    const keysArray = Object.keys(data);
    const valuesArray = Object.values(data);

    // x y 轴分别重新赋值
    init(keysArray,valuesArray)
}



const paging = ref()
const queryList = () => {
    getfansDataLook();
    getfansUserDayLook();
    paging.value.complete([]);

}



 // 切换折线图tag
const changeTagdata = (item,index) => {
    data.dataTagIndex = index
    data.tagName = item.name
    if (item.id == 6) {
        data.dataType = null
        return
    }
    data.dataType = item.id

    getfansUserDayLook()
}


</script>
  
<style lang="scss" scoped>
.top_box {
    background: #fff;
	border-bottom: 2rpx solid #F2F2F2;
	.top_swiper{
		padding-left: 20rpx;
		box-sizing: border-box;
		width: 100%;
	}
}
.tag_list{
    display: flex;
    align-items: center;
    width: 100%;
    padding: 22rpx 40rpx;
    box-sizing: border-box;
    background: #fff;
    .tag_item{
        padding: 4rpx 20rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        color: #666666;
        margin-right: 20rpx;
        background: #fff;
        border-radius: 20rpx;
        &.is_tag{
            background: #EAF6EE;
            color: #29C86F;
        }

    }
}
.page_padding{
    padding: 0rpx 20rpx;
    box-sizing: border-box;
    margin-top: 20rpx;
    .data_overview{
        width: 100%;
        border-radius: 16rpx;
        padding: 34rpx 30rpx;
        padding-bottom: 10rpx;
        box-sizing: border-box;
        background: #fff;
        margin-bottom: 20rpx;
        .overview_title{
            font-size: 28rpx;
            color: #333333;
            font-weight: 600;
        }
        .overview_list{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .overview_item{
                width: 49%;
                font-size: 24rpx;
                margin-bottom: 24rpx;
                .overview_item_title{
                    color: #999999;
                    margin-bottom: 12rpx;
                }
                .overview_item_number{
                    color: #333333;
                }
            }
        }
        .overview_top_box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 36rpx;
        }
        .flow_box{
            margin-bottom: 16rpx;
            .flow_top_box{
                display: flex;
                align-items: center;
                margin-bottom: 24rpx;
                .flow_icon{
                    width: 32rpx;
                    height: 32rpx;
                    margin-right: 4rpx;
                }
            }
            .overview_real_time{
                display: flex;
                .up_fans{
                    display: flex;
                    align-items: center;
                    border-right: 2rpx solid #F2F2F2;
                    padding-right: 20rpx;
                    .up_fans_text{
                        margin-right: 8rpx;
                        color: #999999;
                        font-size: 24rpx;
                    }
                    .up_fans_number{
                        color: #F24C45;
                        font-size: 24rpx;
                        margin-left: 6rpx;
                    }
                }
                .down_fans{
                    display: flex;
                    align-items: center;
                    padding-left: 20rpx;
                    .down_fans_text{
                        margin-right: 8rpx;
                        color: #999999;
                        font-size: 24rpx;
                    }
                    .down_fans_number{
                        color: #29C86F;
                        font-size: 24rpx;
                        margin-left: 6rpx;
                    }
                }
            }
        }
    }
    .data_details{
        width: 100%;
        border-radius: 16rpx;
        padding: 40rpx 30rpx;
        padding-bottom: 20rpx;
        box-sizing: border-box;
        background: #fff;
        margin-bottom: 40rpx;
        .data_details_top_box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 600;
            margin-bottom: 40rpx;
            .data_details_title{
                color: #333333;
                font-size: 28rpx;
                margin-bottom: 12rpx;
            }
            .data_details_time{
                font-size: 24rpx;
                color: #999999;
            }
        }
        .data_details_text{
            color: #333333;
            font-weight: 500;
            font-size: 24rpx;
            margin-bottom: 12rpx;
        }
        .data_details_dace{
            color: #666666;
            font-weight: 400;
            font-size: 24rpx;
            margin-bottom: 20rpx;
        }
        .data_Echarts{
            width: 100%;
            height: 300rpx;
            margin-bottom: 40rpx;
        }
        .data_tag_list{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .data_tag{
                padding: 12rpx 18rpx; 
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 38rpx;
                margin-bottom: 20rpx;
                background: #F5F5F5;
                font-size: 24rpx;
                color: #999999;
                border-radius: 28rpx;
                &.is_clicktag{
                    background: #FFF6F6;
                    border: 2rpx solid #FFE4E4;
                    color: #EA3E1A;
                }
                .data_tag_icon{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 4rpx;
                    width: 32rpx;
                    height: 32rpx;
                    border-radius: 50%;
                    background: #D9D9D9;
                    &.is_tag_icon{
                        background: #EA3E1A;
                    }


                }        
            }
        }
    }
}

</style>
 
