<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >

        <template #top>
            <view class="top_box">
                <image
                    class="top_bg"
                    :src="getAssetsUrl('/leyou/icon/goodsRanking-bg.png')"
                    mode="scaleToFill"
                />
                <view class="back_icon" @click="goback">
                    <TnIcon name="left" size="42rpx" color="#fff"></TnIcon>
                </view>
            </view>
            <view class="rule_box">
                <view class="rule_left">
                    <view class="rule_title">排行榜</view>
                    <view class="rule_time" v-if="data.dataList.length != 0 "> {{ data.dataList[0] ? formatTime(data.dataList[0].utcModified) : '' }} 已更新</view>
                </view>
                <view class="rule_text" @click="torankingDetail">
                    <view style="margin-right: 12rpx;">评选规则</view>
                    <TnIcon name="right" size="24rpx" color="#666666"></TnIcon>

                </view>
            </view>
            <view class="top_icon_list">
                <view class="top_scrool">
                    <view 
                    class="scrool_item" 
                    @click="changeToplist(item,index)" 
                    :class="{ 'is_select' : data.topMenuIndex == index }" 
                    v-for="(item,index) in data.topMenu" :key="item.id">
                        <view class="item_name">{{ item.name }}</view>
                        <view class="select_box" v-if="data.topMenuIndex == index"></view>
                    </view>
                </view>
            </view>
            <view class="top_nav_list">
                <view class="top_nav_scrool">
                    <view 
                    class="top_nav_item" 
                    :class="{ 'is_select' : index == data.topIndex }" 
                    v-for="(item,index) in data.topList" :key="item.id"
                    @click="changeTopnav(item,index)">
                        {{ item.name }}
                    </view>
                </view>
            </view>

            <view class="screen_box">
                <view class="city_screen" v-if="data.topMenuIndex != 0" @click="getCitylist">
                    <view class="city_text">{{ data.cityIndex != 999 ? data.cityList[data.cityIndex].name : '全城' }}</view>
                    <TnIcon name="down-triangle" size="24rpx" color="#666666"></TnIcon>
                </view>
                <view class="screen_text" :class="{ 'is_screen' : data.rankType == 1 }" @click="changerankType(1)">热销榜</view>
                <view class="screen_text" :class="{ 'is_screen' : data.rankType == 2 }" @click="changerankType(2)">好评榜</view>
            </view>
           

        </template>

        <view class="page_list">
            <view class="ranking_item" v-for="(item,index) in data.dataList" :key="item.id" @click="toDetail(item)">
                <view class="ranking_img_box">
                    <image
                        class="goods_img"
                        :src="item.thumb"
                        mode="aspectFill"
                    />
                    <view v-if="index == 0" class="fixed_tag_box" :style="`background-image: url(${getAssetsUrl('/leyou/serviceIcon/one.png')})`">
                        <view class="top_text">TOP</view>
                        <view class="fixed_number">{{ (index + 1) }}</view>
                    </view>
                    <view v-if="index == 1" class="fixed_tag_box" :style="`background-image: url(${getAssetsUrl('/leyou/serviceIcon/tow.png')})`">
                        <view class="top_text">TOP</view>
                        <view class="fixed_number">{{ (index + 1) }}</view>
                    </view>
                    <view v-if="index == 2" class="fixed_tag_box" :style="`background-image: url(${getAssetsUrl('/leyou/serviceIcon/three.png')})`">
                        <view class="top_text">TOP</view>
                        <view class="fixed_number">{{ (index + 1) }}</view>
                    </view>
                    <view v-if="index > 2" class="fixed_tag_box" :style="`background-image: url(${getAssetsUrl('/leyou/serviceIcon/other.png')})`">
                        <view class="top_text">TOP</view>
                        <view class="fixed_number">{{ (index + 1) }}</view>
                    </view>
                </view>
                <view class="ranking_right">
                    <view class="ranking_text_box">
                        <view class="goods_title">{{ item.name }}</view>
                        <view class="goods_score_box">
                            <view class="score_icon">
                                <TnRate v-model="item.score" :min="1" :max="5" readonly gutter="0rpx" activeColor="#FF9F3E" inactive-color="#EBEBEB" size="sm" allow-half />
                                <view class="score_number">{{ item.score }}</view>
                            </view>
                            <view class="comment_number">{{ item.commentCnt ? item.commentCnt : '--'}}评价</view>
                        </view>
                        <view v-if="data.topMenuIndex != 0" class="ranking_city_text">
                            <view class="categoryNames_name" v-if="item.categoryNames">{{ item.categoryNames && item.categoryNames[0] }}</view>
                            <view class="districtName_name">{{ item.districtName }}</view>
                        </view>
                    </view>
                    <view class="bottom_price" v-if="data.topMenuIndex != 0">
                        <view class="bottom_left">
                            <view class="bottom_sales">{{ item.sales }}条</view>
                            <view class="bottom_price_number">￥{{ (item.price / 100) }}</view>
                        </view>
                        <!-- getdistance -->
                        <view class="bottom_right" v-if="data.positioning">{{ getdistance(item.lat, item.lng) }}</view>
                    </view>
                    <view class="sales_box" v-else>已售{{ item.sales }}件</view>
                </view>
            </view>
        </view>

        <BCNotify ref="bcNotify"></BCNotify>
        

        <TnPopup v-model="data.showPopup" open-direction="bottom">
            <view class="action_box">
                <view class="action_top" @click="data.showPopup = false">
                    <view class="my_channel_title">地区筛选</view>
                    <image
                        class="posshu"
                        :src="getAssetsUrl('/channel/out.svg')"
                        mode="scaleToFill"
                    />
                </view>
                <view class="my_channel">
                    <view class="my_channel_list">
                        <view
                        v-for="(item,index) in data.cityList" :key="item.id"
                        @click="changechannel(item,index)"
                        class="my_channel_item"
                        :class="{ 'highlight_box': data.cityIndex == index,'not_right': (index + 1) % 4 == 0 }">
                            {{ item.name }}
                        </view>
                    </view>
                </view>
            </view>

            <view class="Popup_bottom">
                <view class="reset_btn" @click="resetCity">重置</view>
            </view>

        </TnPopup>
        <template #bottom>
            
        </template>
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'

import { getAssetsPic } from '@/common/setPicture'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import BCNotify from '@/components/notify/index.vue'
import {getcategoryList} from '@/api/service-api'
import { formattime } from '@/common/formatTime'
import { organizationReviewsList, organizationReviewsListAll } from '@/api/goods-api'
import { gotorankingDetail } from '@/routes/goods-routes'
import { gotoShopDetail, gotoServiceStore } from "@/routes/service-routes"
import { getSonList } from '@/api/user-api'
import { getDistances } from '@/utils/distance'

interface Data{
    dataList:any,
    topMenu:any,
    topMenuIndex:number,
    topList:any,
    topIndex:number,
    rankType:number,
    showPopup:boolean,
    cityList:any,
    cityIndex:number,
    positioning:boolean,//是否展示距离
    mylat:number,
    mylng:number,
}

const data = reactive<Data>({
    dataList:[],
    topMenu:[
            {id:86,name:'适品购物',icon:'/leyou/goods/goods.svg'},
            {id:80,name:'兴趣学习',icon:'/leyou/goods/study.svg'},
            {id:85,name:'休闲玩乐',icon:'/leyou/goods/play.svg'},
            {id:81,name:'康旅文旅',icon:'/leyou/goods/travel.svg'},
            {id:82,name:'医学美容',icon:'/leyou/goods/cosmetology.svg'},
            {id:89,name:'生活',icon:'/leyou/goods/life.svg'},
            {id:87,name:'健康',icon:'/leyou/goods/health.svg'},
            {id:88,name:'照护',icon:'/leyou/goods/care.svg'},
            {id:83,name:'代办',icon:'/leyou/goods/handling.svg'},
            {id:84,name:'找工作',icon:'/leyou/goods/finjob.svg'},
    ],
    topMenuIndex:0,
    topList:[],
    topIndex:0,
    rankType:1,
    showPopup:false,
    cityList:[],
    cityIndex:999,
    positioning:false,
    mylat:0,
    mylng:0,

})


interface Props {
    id:string,
    pageTitle:string,
}
const props = defineProps<Props>()



const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const formatTime = computed(()=>(time:number)=>{
    return formattime(time,'MM月DD日')
})

const getdistance = computed(()=>(lat:number, lng:number)=>{
    if (!data.mylat || !data.mylng) { return '' }
    const distance = getDistances(
        data.mylat,
        data.mylng,
        lat,
        lng
    )
    return distance + 'km'
})

onMounted(()=>{
    getSonList({
        parentId: 440100
    }).then((res:any)=>{
        console.log('res',res);
        data.cityList = res
    })

    getDistancesfun().then((res:any) => {
        data.mylat = res.lat1
        data.mylng = res.lng1
    })
})


const paging = ref()
const bcNotify = ref()

const queryList = async (pageNumber:number, pageSize:number)=>{
    if (pageNumber == 1) {
        await getcategoryList({
            id:data.topMenu[data.topMenuIndex].id
        }).then((res:any)=>{
            data.topList = [
                {id:999,name:'全部'},
                ...res
            ]
        })
    }
    data.topList[data.topIndex].id == 999 ? allList(pageNumber, pageSize) : organizationReviewsList({
        pageNumber,
        pageSize,
        query:{
            applyId: data.topMenuIndex == 0 ? 18 : 19,
            categoryShowId:data.topList[data.topIndex].id,
            rankType:data.rankType,
            districtIds: (data.topMenuIndex != 0 && data.cityIndex != 999) ? [data.cityList[data.cityIndex].id] : []
        }
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
        
    })
    
}

const allList = (pageNumber:number, pageSize:number) => {

    let categoryShowIds = data.topList.map((item:any)=>{
        return item.id
    })
    categoryShowIds.shift()
    console.log('categoryShowIds',categoryShowIds);

    organizationReviewsListAll({
        pageNumber,
        pageSize,
        query:{
            applyId: data.topMenuIndex == 0 ? 18 : 19,
            categoryShowIds,
            rankType:data.rankType,
            districtIds: (data.topMenuIndex != 0 && data.cityIndex != 999) ? [data.cityList[data.cityIndex].id] : []
        }
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
        
    })
}

const changeToplist = (item:any,index:number) => {
    data.topMenuIndex = index;
    (paging.value as any).reload()

}

const changeTopnav = (item:any,index:number) => {
    data.topIndex = index;
    (paging.value as any).reload()

}

const changerankType = (type:number) => {
    data.rankType = type;
    (paging.value as any).reload()
}

const torankingDetail = () => {
    gotorankingDetail()
}

const toDetail = (item:any) => {
    data.topMenuIndex == 0 && gotoShopDetail(item.id);
    data.topMenuIndex != 0 && gotoServiceStore({shopId: item.id})
}

const getCitylist = () => {
    data.showPopup = true
}

const changechannel = (item:any,index:number) => {
    data.cityIndex = index;
    (paging.value as any).reload()

}


// 页面刷新
const pagingReload = () => {
    (paging.value as any).reload(true)
}


const getDistancesfun = () => {
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: "gcj02",
            isHighAccuracy: true,
            success: (res) => {
                data.positioning = true
                console.log("res", res)
                console.log("定位成功")
                resolve({
                    lat1: res.latitude,
                    lng1: res.longitude
                })
            },
            fail: (err) => {
                data.positioning = false
                console.log("定位失败")
                reject(err)
            }
        })
    })
}


const resetCity = () => {
    data.cityIndex = 999;
    data.showPopup = false;
    (paging.value as any).reload()
}

const goback = () => {
    uni.navigateBack()
}

defineExpose({
    pagingReload
})


</script>

<style lang="scss" scoped>


.top_box{
    position: relative;
    margin-bottom: 30rpx;
    .top_bg{
        width: 100%;
        height: 378rpx;
    }
    .back_icon{
        position: absolute;
        // top: 24rpx;
        bottom: 226rpx;
        left: 30rpx;
    }
}
.rule_box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0rpx 30rpx;
    box-sizing: border-box;
    margin-bottom: 24rpx;
    .rule_left{
        display: flex;
        align-items: center;
        .rule_title{
            font-size: 32rpx;
            color: #000000;
            font-weight: 600;
            margin-right: 8rpx;
        }
        .rule_time{
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
        }
    }
    .rule_text{
        display: flex;
        align-items: center;
        font-size: 24rpx;
        font-weight: 400;
        color: #666666;
    }
    
}
.top_icon_list{
    width: 100%;
    overflow-x: scroll;
    padding: 20rpx;
    padding-top: 0rpx;
    margin-bottom: 14rpx;
    box-sizing: border-box;
    .top_scrool{
        display: flex;
        align-items: center;
        width: fit-content;

        .scrool_item{
            flex-shrink: 0;
            display: flex;
            align-items: center;
            padding: 14rpx 16rpx;
            box-sizing: border-box;
            margin-right: 20rpx;
            border-radius: 6rpx;
            background: #fff;
            color: #333;
            position: relative;
            &.is_select{
                background: linear-gradient( 90deg, #FF8C74 0%, #EA3E1A 100%);
                color: #FFFFFF;
            }
            .item_name{
                flex-shrink: 0;
                font-size: 26rpx;
                font-weight: 400;
            }
            .select_box{
                width: 58rpx;
                height: 58rpx;
                background: linear-gradient( 90deg, #FF8C74 0%, #EA3E1A 200%);
                position: absolute;
                bottom: -2rpx;
                left: 50%;
                transform: translate(-50%, 0) rotate(45deg);
                z-index: -1;
            }
        }
    }
}
.top_nav_list{
    width: 100%;
    overflow-x: scroll;
    padding: 20rpx;
    padding-top: 0rpx;
    margin-bottom: 20rpx;
    box-sizing: border-box;
    .top_nav_scrool{
        display: flex;
        align-items: center;
        width: fit-content;
        .top_nav_item{
            padding: 8rpx 20rpx;
            box-sizing: border-box;
            border-radius: 26rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #333333;
            margin-right: 8rpx;
            white-space:nowrap;
            &.is_select{
                background: #FFE6E1;
                color: #EA3E1A;
            }
        }
    }
}

.screen_box{
    padding-left: 40rpx;
    padding-bottom: 24rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .city_screen{
        display: flex;
        align-items: center;
        margin-right: 40rpx;
        .city_text{
            font-weight: 400;
            font-size: 24rpx;
            color: #808080;
            margin-right: 6rpx;
        }
    }
    .screen_text{
        font-weight: 400;
        font-size: 24rpx;
        color: #808080;
        margin-right: 40rpx;

        &.is_screen{
            color: #EA3E1A;
        }
    }
}

.page_list{
    padding: 20rpx;
    padding-top: 0rpx;
    box-sizing: border-box;
    .ranking_item{
        width: 100%;
        padding: 20rpx;
        box-sizing: border-box;
        display: flex;
        background: #fff;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
        .ranking_img_box{
            position: relative;
            width: 150rpx;
            height: 150rpx;
            margin-right: 24rpx;
            border-radius: 12rpx;
            overflow: hidden;
            .goods_img{
                width: 100%;
                height: 100%;

            }
            .fixed_tag_box{
                position: absolute;
                top: -2rpx;
                left: 20rpx;
                width: 48rpx;
                height: 60rpx;
                background-size: contain;
                background-repeat: no-repeat;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 2rpx 4rpx;
                box-sizing: border-box;
                .top_text{
                    font-weight: 400;
                    font-size: 20rpx;
                    color: #FFFFFF;
                }
                .fixed_number{
                    font-weight: 400;
                    font-size: 20rpx;
                    color: #FFFFFF;
                }
            }
        }
        .ranking_right{
            width: 490rpx;
            // height: 150rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .ranking_text_box{
                .goods_title{
                    font-weight: 500;
                    font-size: 30rpx;
                    color: #333333;
                    margin-bottom: 12rpx;
                }
                .goods_score_box{
                    display: flex;
                    align-items: center;
                    margin-bottom: 14rpx;
                    .score_icon{
                        display: flex;
                        align-items: center;
                        .score_number{
                            margin-left: 6rpx;
                            font-weight: 500;
                            font-size: 24rpx;
                            color: #FF9F3E;
                        }
                    }
                    .comment_number{
                        margin-left: 16rpx;
                        font-weight: 400;
                        font-size: 24rpx;
                        color: #808080;
                    }
                }
                .ranking_city_text{
                    display: flex;
                    align-items: center;
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #808080;
                    margin-bottom: 8rpx;
                    .categoryNames_name{
                        margin-right: 12rpx;
                    }
                    .districtName_name{
                        padding-left: 12rpx;
                        border-left: 2rpx solid #E8E8E8;
                    }

                }
            }
            .bottom_price{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .bottom_left{
                    display: flex;
                    align-items: center;
                    .bottom_sales{
                        font-weight: 400;
                        font-size: 24rpx;
                        color: #808080;
                    }
                    .bottom_price_number{
                        font-weight: 500;
                        font-size: 30rpx;
                        color: #333333;
                        margin-left: 12rpx;
                    }
                }
                .bottom_right{
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #999999;
                }
            }
            .sales_box{
                font-size: 24rpx;
                color: #808080;
                font-weight: 400;
            }
        }
        
    }
}
.action_box{
    padding: 40rpx 32rpx;
    box-sizing: border-box;
    min-height: 800rpx;

    .action_top{
        width: 100%;
        margin-bottom: 34rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .posshu{
            width: 32rpx;
            height: 32rpx;
        }
        .my_channel_title{
            color: #333333;
            font-size: 32rpx;
            margin-right: 12rpx;
        }
    }
    .my_channel{
        .my_channel_list{
            margin-bottom: 32rpx;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }
        .my_channel_item{
            margin-right: 14rpx;
            margin-bottom: 20rpx;
            padding: 16rpx 52rpx;
            box-sizing: border-box;
            border-radius: 8rpx;
            background: #F7F7F7;
            text-align: center;
            font-size: 26rpx;
            white-space: nowrap; /*强制一行内显示*/
            overflow: hidden;/*溢出隐藏*/
            text-overflow: ellipsis;/*超出部分现实省略号*/
            &.highlight_box{
                background: #FFE6E1;
                color: #EA3E1A;
            }
        }
    }
    .recommend_channel{
        .recommend_channel_top{
            display: flex;
            align-items: center;
            margin-bottom: 32rpx;
            .recommend_channel_title{
                color: #333333;
                font-size: 32rpx;
                margin-right: 12rpx;
            }
            .recommend_channel_bace{
                color: #999999;
                font-size: 24rpx;
            }
        }
        .recommend_channel_list{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .recommend_channel_item{
                margin-right: 14rpx;
                margin-bottom: 20rpx;
                width: 152rpx;
                height: 68rpx;
                border-radius: 8rpx;
                background: #FFFFFF;
                border: 1px solid #D5D5D5;
                text-align: center;
                line-height: 68rpx;
                font-size: 26rpx;
            }
        }
    }
}

.Popup_bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0rpx 30rpx;
    padding-bottom: 88rpx;
    box-sizing: border-box;
    width: 100%;
    .reset_btn{
        width: 100%;
        padding: 22rpx 0rpx;
        box-sizing: border-box;
        text-align: center;
        background: #EA3E1A;
        border-radius: 46rpx;
        color: #FFFFFF;
        font-size: 30rpx;
    }
}

</style>
