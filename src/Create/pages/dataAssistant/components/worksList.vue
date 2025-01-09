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
            <template #top>
                <view class="tag_list" v-if="!props.articleId">
                    <view 
                    class="tag_item" 
                    :class="{'is_tag' : data.tagType == item.id }" 
                    v-for="(item) in data.tagList" :key="item.id"
                    @click="clickTag(item)">
                        {{ item.name }}
                    </view>
                </view>
            </template>

            <view class="page_padding">
                <view class="data_overview">
                    <view class="overview_top_box">
                        <view class="overview_title">数据总览</view>
                        <view class="overview_time">近7天</view>
                    </view>
                    <view class="flow_box">
                        <view class="flow_top_box">
                            <image
                                class="flow_icon"
                                :src="getAssetsUrl('/create/liuliang.svg')"
                                mode="scaleToFill"
                            />
                            <view class="overview_title">流量</view>
                        </view>
                        <view class="overview_list">
                            <view class="overview_item">
                                <view class="overview_item_title" v-if="!data.tagType">阅读/播放总量</view>
                                <view class="overview_item_title" v-else> {{ data.tagType != 2 ? '阅读' : '播放' }}总量</view>
                                <view class="overview_item_number">{{ data.dataObj.cntLook?data.dataObj.cntLook:'--' }}</view>
                            </view>
                        </view>
                        
                    </view>
                    <view class="flow_box">
                        <view class="flow_top_box">
                            <image
                                class="flow_icon"
                                :src="getAssetsUrl('/create/hudong.svg')"
                                mode="scaleToFill"
                            />
                            <view class="overview_title">互动</view>
                        </view>
                        <view class="overview_list">
                            <view class="overview_item">
                                <view class="overview_item_title">点赞总量</view>
                                <view class="overview_item_number" >{{ data.dataObj.cntLike?data.dataObj.cntLike:'--' }}</view>
                            </view>
                            <view class="overview_item">
                                <view class="overview_item_title">评论总量</view>
                                <view class="overview_item_number" >{{ data.dataObj.cntComment?data.dataObj.cntComment:'--' }}</view>
                            </view>
                            <view class="overview_item">
                                <view class="overview_item_title">收藏总量</view>
                                <view class="overview_item_number" >{{ data.dataObj.cntCollect?data.dataObj.cntCollect:'--' }}</view>
                            </view>
                            <view class="overview_item">
                                <view class="overview_item_title">分享总量</view>
                                <view class="overview_item_number" >{{ data.dataObj.cntRetransmission?data.dataObj.cntRetransmission:'--' }}</view>
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
                    <view class="data_details_dace">
                        <text v-if="data.tagType != 2 ">总阅读量{{ data.dataObj.cntLook?data.dataObj.cntLook:'--' }},</text>
                        <text>总点赞量{{ data.dataObj.cntLike?data.dataObj.cntLike:'--' }}</text>
                    </view>
                    
                    <view class="data_Echarts">
                        <!-- 数据可视 -->
                        <lechart ref="chartRef"></lechart>
                    </view>
                    <view class="data_tag_list">
                        <view 
                        class="data_tag" 
                        :class="{'is_clicktag' : data.dataTagIndex == index}" 
                        v-for="(item,index) in data.dataTagList" :key="index"
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
import { articleDataLook, articleUserDayLook } from '@/api/create-api'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import lechart from '@/Create/uni_modules/lime-echart/components/l-echart/l-echart.vue'

// #ifdef APP-PLUS || H5
import * as echarts from 'echarts'
// #endif

// #ifdef MP-WEIXIN
const echarts = require('../../../uni_modules/lime-echart/static/echarts.min.js')
// #endif


// interface Props {
//     isarticle: number,
//     articleId: string
// }
const props = defineProps({
    articleType: Number,
    articleId: String,
})

const data = reactive({
    tagType:0,
    dataObj: {},
    dataTagIndex: 0,
    dataTagList: [
        {id:1,name:'阅读/播放量'},
        {id:2,name:'点赞量'},
        {id:3,name:'评论量'},
        {id:4,name:'收藏量'},
        {id:5,name:'分享量'},
    ],
    dataList: [],
    tagList: [
        {id:0,name:'全部'},
        {id:3,name:'图文'},
        {id:2,name:'视频',disabled: true},
    ],
    tagName: '阅读量',
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
    console.log('isarticle',props.articleType);
    console.log('articleId',props.articleId);
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

const getarticleDataLook = () => {
    articleDataLook({
        startTime: (Date.now()-(7 * 24 * 60 * 60 * 1000))/1000,
        endTime: Date.now() / 1000,
        type: props.articleId ? props.articleType :( data.tagType ? data.tagType : null),
        articleId: props.articleId
    }).then((res)=>{
        data.dataObj = res
    })
}

const getarticleUserDayLook = () => {
    console.log('data.dataType',data.dataType);
    articleUserDayLook({
        startTime: (Date.now()-(7 * 24 * 60 * 60 * 1000))/1000,
        endTime: Date.now() / 1000,
        dataType: data.dataTagList[data.dataTagIndex].id,
        type: props.articleId ? props.articleType :( data.tagType ? data.tagType : null),
        articleId: props.articleId
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
    getarticleDataLook();
    getarticleUserDayLook();
    paging.value.complete([]);

}




// 切换作品类型
const clickTag = (item) => {
    let obj = [
        {id:2,name:'点赞量'},
        {id:3,name:'评论量'},
        {id:4,name:'收藏量'},
        {id:5,name:'分享量'},
    ]
    data.tagType = item.id
    
    if (data.tagType == 0) {
        data.dataTagList = [
            {id:1,name:'阅读/播放量'},
            ...obj,
        ]
    }else if(data.tagType == 3){
        data.dataTagList = [
            {id:1,name:'阅读量'},
            ...obj,
        ]
    }else if(data.tagType == 2){
        data.dataTagList = [
            {id:1,name:'播放量'},
            ...obj,
        ]
    }
    data.dataTagIndex = 0

    console.log('data.dataTagIndex',data.dataTagIndex);

    getarticleDataLook()
    getarticleUserDayLook()

}

 // 切换折线图tag
const changeTagdata = (item,index) => {
    data.dataTagIndex = index
    data.tagName = data.dataTagList[data.dataTagIndex].name
    data.dataType = data.dataTagList[data.dataTagIndex].id
    getarticleUserDayLook()
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
    justify-content: space-between;
    width: 100%;
    padding: 22rpx 70rpx;
    box-sizing: border-box;
    background: #fff;
    border-top: 2rpx solid #F2F2F2;
    .tag_item{
        padding: 4rpx 20rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        color: #666666;
        margin-right: 20rpx;
        background: #fff;
        border-radius: 32rpx;
        &.is_tag{
            background: #FFE9E9;
            color: #EA3E1A;
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
        .overview_time{
            font-size: 24rpx;
            color: #999999;
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
 
