<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-center="false"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        :empty-view-text='data.navId == 1 ? "还没有数据哦~" : "暂无兑换记录~"'
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >

        <template #top>
            <pageTopbg :zIndex="-1" :bgstyle="'background: linear-gradient(90deg, #FE7549 0%, #FD482F 100%);'"></pageTopbg>
            <bc-page-navbar :title="'积分明细'" :iconColor="'#fff'" :textColor="'#fff'"></bc-page-navbar>
            <view class="rule_box">
                <view class="rule_btn" @click="tointegralRule">
                    积分规则
                </view>
            </view>
            <view class="my_Integral">
                <view class="Integral_number">{{ data.IntegralObj.points ? data.IntegralObj.points : '--' }}</view>
                <view class="Integral_text">我的积分</view>
            </view>

            <view class="goods_top_nav">
                <TnTabs v-model="data.navIndex" 
                    height="82rpx"
                    bar-width="36rpx"
                    :scroll="true"
                    :bottom-shadow="false"
                    font-size="30rpx"
                    active-font-size="32rpx"
                    color="#666666"
                    active-color="#0B0B0B" 
                    bar-color="#EA3E1A">
                    <TnTabsItem v-for="(item, index) in data.navList" :key="index" :title="item.name" @click="changeType(item)"/>
                </TnTabs>
            </view>
        </template>
        
        <view class="goods_list" v-if="data.dataList.length != 0">
            <view class="income_list" v-if="data.navId == 1">
                <view class="income_item" v-for="(item,index) in data.dataList" :key="index">
                    <view class="income_left">
                        <view class="income_title">{{ item.action }}</view>
                        <view class="income_time">{{ formatTime(item.utcCreated) }}</view>
                    </view>
                    <view class="income_right">
                        <view class="isAdd" v-if="item.isAdd == 1">+{{ item.points }}</view>
                        <view class="isDel" v-else>-{{ item.points }}</view>
                    </view>
                </view>
            </view>
            <view class="exchange_list" v-if="data.navId == 2">
                <view class="goods_item" v-for="(item,index) in data.dataList" :key="item" @click="toexchangeDetail(item)">
                    <image
                        class="item_img"
                        :src="item.mainPics && item.mainPics[0]"
                        mode="aspectFill"
                    />
                    <view class="item_text">
                        <view class="text_top">
                            <view class="goods_title">{{ item.name }}</view>
                            <view class="order_type">
                                <view class="type_text">
                                    <text class="deliver" v-if="item.status == 100000">待发货</text>
                                    <text class="deliver" v-if="item.status == 200000">待收货</text>
                                    <text class="complete" v-if="item.status == 300000">已完成</text>
                                </view>
                                <TnIcon name="right" color="#BEBEBE" size="26"></TnIcon>
                            </view>
                        </view>
                        <view class="text_bottom">
                            <view class="exchange_time">{{ formatTime(item.utcCreated) }}</view>
                            <view class="integral_number">
                                {{ item.integral }} 积分
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            
        </view>

        <view class="not_dataList_btn" v-if="data.navId == 2 && data.dataList.length == 0" @click="timeShop">
            去看看
        </view>

        

        <BCNotify ref="bcNotify"></BCNotify>
        

        
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'

import { getAssetsPic } from '@/common/setPicture'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import BCNotify from '@/components/notify/index.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { formattime } from '@/common/formatTime'
import { timePointsDetail, timeDetailList, integralGoodsList } from '@/api/goods-api'
import { gotointegralRule, gotointegralMallGoods } from '@/routes/goods-routes'
import { gotoexchangeDetail } from '@/routes/order-routes'


interface Data{
    dataList:any,
    welfareType: any,
    navId: number,
    navList: any,
    navIndex: number,
    IntegralObj: any,

}

const data = reactive<Data>({
    dataList:[],
    welfareType: [
        {id:999,name:'全部'},
        {id:1,name:'最新'},
        {id:2,name:'低价优先'},
        {id:3,name:'高价优先'},
    ],
    navId: 1,
    navList: [
        {id:1,name:'收支明细'},
        {id:2,name:'兑换记录'},
    ],
    navIndex: 0,
    IntegralObj: {},

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
    return formattime(time,'YYYY-MM-DD HH:mm')
})





const paging = ref()
const bcNotify = ref()

const queryList = async (pageNumber:number, pageSize:number)=>{
    if (pageNumber == 1) {
        timePointsDetail({}).then((res:any)=>{
            data.IntegralObj = res
        })
    }
    data.navId == 1 && timeDetailList({
        pageNumber,
        pageSize,
        query:{}
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    })
    data.navId == 2 && integralGoodsList({
        pageNumber,
        pageSize,
        query:{}
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    })
    
}


const changeType = (item:any) => {
    data.navId = item.id;
    (paging.value as any).reload()

}

// 页面刷新
const pagingReload = () => {
    (paging.value as any).reload(true)
}

const timeShop = () => {
    gotointegralMallGoods()
}


const toexchangeDetail = (item:any) => {
    gotoexchangeDetail({
        itemId: item.id
    })
}

const tointegralRule = () => {
    gotointegralRule()
}

defineExpose({
    pagingReload
})


</script>
<style>
page{
    background: #FFFFFF;
}
</style>

<style lang="scss" scoped>

.top_bg{
    width: 100%;
    height: 438rpx;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
.rule_box{
    position: absolute;
    top: 220rpx;
    right: 0rpx;
    .rule_btn{
        padding: 6rpx 24rpx;
        padding-right: 12rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        font-weight: 400;
        color: #EA3E1A;
        border-radius: 40rpx 0rpx 0rpx 40rpx;
        background: #FFD9D4;
    }
}
.my_Integral{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 16rpx;
    box-sizing: border-box;
    margin-bottom: 24rpx;
    .Integral_number{
        font-weight: 500;
        font-size: 84rpx;
        color: #FFFFFF;
    }
    .Integral_text{
        font-weight: 400;
        font-size: 28rpx;
        color: #FFB9AB;
    }
}
.goods_top_nav{
    background: #FFFFFF;
    border-radius: 28rpx 28rpx 0rpx 0rpx;
    padding-bottom: 12rpx;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid #F2F2F2;
}
.goods_list{
    .income_list{
        padding: 0rpx 30rpx;
        box-sizing: border-box;

        .income_item{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 40rpx;
            box-sizing: border-box;
            .income_left{
                display: flex;
                flex-direction: column;
                .income_title{
                    font-weight: 500;
                    font-size: 28rpx;
                    color: #333333;
                    margin-bottom: 4rpx;
                }
                .income_time{
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #999999;
                }
            }
            .income_right{
                font-weight: 500;
                font-size: 28rpx;
                .isAdd{
                    color: #00B825;
                }
                .isDel{
                    color: #EA3E1A;
                }
            }
            
        }
    }
    .exchange_list{
        padding: 24rpx;
        box-sizing: border-box;
        .goods_item{
            display: flex;
            align-items: center;
            box-shadow: 0rpx 0rpx 20rpx rgba(0,0,0,0.08);
            border-radius: 16rpx;
            background: #FFFFFF;
            padding: 24rpx;
            box-sizing: border-box;
            margin-bottom: 24rpx;
            .item_img{
                border: 2rpx solid #EFEFEF;
                border-radius: 8rpx;
                width: 132rpx;
                height: 132rpx;
                margin-right: 24rpx;
            }
            .item_text{
                width: 500rpx;
                height: 132rpx;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
                .text_top{
                    width: 100%;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    .goods_title{
                        width: 350rpx;
                        line-height: 25px!important;
                        display: -webkit-box;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        -webkit-box-orient:vertical;
                        -webkit-line-clamp:2;
                        font-weight: 500;
                        font-size: 30rpx;
                        color: #333333;
                    }
                    .order_type{
                        display: flex;
                        align-items: center;
                        .type_text{
                            font-weight: 400;
                            font-size: 28rpx;
                            margin-right: 10rpx;
                            .deliver{
                                color: #FFA908;
                            }
                            .complete{
                                color: #00CF2A;
                            }
                        }
                    }
                }
                .text_bottom{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .exchange_time{
                        font-weight: 400;
                        font-size: 24rpx;
                        color: #999999;
                    }
                    .integral_number{
                        font-weight: 500;
                        font-size: 30rpx;
                        color: #EC3E3E;
                    }
                }
            }
        }
    }
}
.not_dataList_btn{
    position: absolute;
    top: 480rpx;
    left: 50%;
    padding: 18rpx 98rpx;
    box-sizing: border-box;
    border: 2rpx solid #EA3E1A;
    border-radius: 46rpx;
    background: #FFFFFF;
    color: #EA3E1A;
    font-size: 32rpx;
    font-weight: 400;
    transform: translate(-50%, 0rpx);
}

</style>
