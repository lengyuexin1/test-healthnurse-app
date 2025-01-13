<template>
    <view class="container">
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
                
            </template>
            <view class="content">
                <view class="course_item" v-for="item in data.dataList" :key="item.id" @click="tocourseOrderDetail(item)">
                    <view class="item_top">
                        <view class="order_time">{{ timeformat(item.utcCreated) }}</view>
                        <view class="order_type isbay" v-if="item.status == 196612">购买成功</view>
                        <view class="order_type ispaid" v-if="item.status == 65537">待支付</view>
                        <view class="order_type isdel" v-if="item.status == 262146">已取消</view>
                    </view>
                    <view class="item_card">
                        <courseCard 
                        :cardObj="handleObj(item)"
                        ></courseCard>
                    </view>
                    <view class="item_bottom">
                        
                        <!-- <view class="state_text" v-if="item.actionableList.includes('pay')">
                            <text class="typetex" v-if="item.statusDetailIntro <= 0">{{ isNaN(item.statusDetailIntro) ? item.statusDetailIntro : '请支付' }}</text>
                            <template v-else>
                                <text class="typetex">您的订单还有</text>
                                <TnCountDown separator-color="#666666" size="24" :time="item.statusDetailIntro" :show-hour="false" separator-mode="cn"/>
                                <text class="typetex">过期，请尽快支付</text>
                            </template>
                        </view> -->

                        <view class="order_stateBox">
                            <view class="order_price">
                                实付金额
                                <text class="price_number">
                                    ￥{{ getprice(item) / 100 }}
                                </text>
                            </view>
                        </view>
                        <view class="order_btn_box">
                            <view class="btn_item todel" v-if="false">
                                取消订单
                            </view>
                            <view class="btn_item" v-if="item.actionableList.includes('pay')">
                                <text class="btn_item_text">去支付</text>
                                <TnCountDown separator-color="#fff" text-color="#fff" size="24" :time="item.statusDetailIntro" :show-hour="false" separator-mode="cn"/>
                            </view>
                            <view class="btn_item" v-if="item.actionableList.includes('comment')" @click.stop="tocourseVideo(item)">
                                <text class="btn_item_text">去学习</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { getserviceOrderList } from '@/api/order-api'
import { courseOrderDetail } from '@/routes/order-routes'
import courseCard from '@/Order/components/courseCard.vue'
import { formattime } from '@/common/formatTime'

import { gotocourseVideo } from '@/routes/create-routes'
import { TempStorage } from "@bc/base"
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'

interface Data{
    dataList:any,
    statusId:number | null,
    cursor:string | null,

}

const data = reactive<Data>({
    dataList:[],
    statusId: null,
    cursor:null,

})

const timeformat = computed(()=>(time:number)=>{
    return formattime(time,'YYYY-MM-DD HH:mm:ss')
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})
const handleObj = computed(()=>(item:any)=>{
    return {
        price:item.shopList[0].entityList[0].price,
        cover:item.shopList[0].entityList[0].image,
        coursetitle:item.shopList[0].entityList[0].title,
    }
})
const getprice = computed(()=>(item:any)=>{
    return item.shopList[0].entityList[0].price
})




const queryList = (pageNumber:number, pageSize:number)=>{
    getOrderList(pageNumber,pageSize)
}


const paging = ref()
const getOrderList = (pageNumber:number, pageSize:number) => {
    if (pageNumber == 1) { data.cursor = null }
    getserviceOrderList({
        cursor:data.cursor,
        size:pageSize,
        query:{
            kind:4,
            statusId: data.statusId!,
            title:'',
            dateOption:'',
        }
    }).then((res)=>{
        (paging.value as any).complete(res.list)
        data.cursor = res.nextCursor!
    })

    
}

const tocourseOrderDetail = (item:any) => {
    courseOrderDetail(item.id)
}

const tocourseVideo = (item:any) => {
    const listId = TempStorage.savewx({
        videoIdlist:[item.id],
        isstudy:2

    })
    gotocourseVideo(listId)
}

// 刷新页面
const reloadPage = () => {
    (paging.value as any).reload()
}

defineExpose({
    reloadPage,
})

</script>

<style lang="scss" scoped>
.content{
    padding: 20rpx ;
    box-sizing: border-box;
    .course_item{
        padding: 30rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 24rpx;
        width: 100%;
        margin-bottom: 20rpx;
        .item_top{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .order_time{
                font-size: 28rpx;
                color: #666666;
                font-weight: 400;
            }
            .order_type{
                font-size: 28rpx;
                &.isbay{
                    color: #EA3E1A;
                }
                &.ispaid{
                    color: #FBA02B;
                }
                &.isdel{
                    color: #999999;
                }
            }
        }
        .item_card{
            padding: 24rpx 0rpx ;
            box-sizing: border-box;
            margin-bottom: 24rpx;
            border-bottom: 2rpx solid #F2F2F2;
        }
        .item_bottom{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            position: relative;
            .state_text{
                position: absolute;
                left: 0;
                top: 50%;
                .typetex {
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #666666;
                    // margin-left: -16rpx;
                    &.retreat {
                        margin-left: 4rpx;
                        color: #29c86f;
                    }
                    &.texmgin {
                        margin-left: 12rpx;
                    }
                }
            }
            .order_price{
                font-size: 28rpx;
                color: #333333;
                margin-bottom: 24rpx;
                .price_number{
                    font-size: 30rpx;
                    color: #FF1010;
                }
            }
            .order_btn_box{
                display: flex;
                align-items: center;
                .btn_item{
                    border-radius: 6rpx;
                    background: #EA3E1A;
                    margin-left: 20rpx;
                    text-align: center;
                    line-height: 52rpx;
                    display: flex;
                    align-items: center;
                    padding: 10rpx 26rpx;
                    box-sizing: border-box;
                    border-radius: 38rpx;
                    color: #FFFFFF;
                    height: 54rpx;
                    
                    .btn_item_text{
                        font-size: 24rpx;
                        color: #FFFFFF;
                        margin-right: 10rpx;
                    }
                    &.todel{
                        border: 2rpx solid #EA3E1A;
                        background: #FFFFFF;
                        color: #EA3E1A;

                    }
                }
            }
        }
    }
}
</style>
