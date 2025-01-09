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
            <image
                class="top_bg"
                :src="getAssetsUrl('/leyou/icon/timeMall-bg.svg')"
                mode="scaleToFill"
            />
            <bc-page-navbar :title="'评选规则'" :iconColor="'#fff'" :textColor="'#fff'"></bc-page-navbar>
            <view class="rule_box">
                <view class="rule_btn" @click="tointegralRule">
                    积分规则
                </view>
            </view>
            <view class="top_box">
                <view class="my_integral_box">
                    <view class="integral_left">
                        <view class="integral_number">{{ data.IntegralObj.points ? data.IntegralObj.points : '--' }}</view>
                        <view class="integral_text">积分</view>
                    </view>
                    <view class="integral_right" @click="tomyIntegral">
                        积分明细
                    </view>
                </view>
                <view class="welfare_title">
                    福利兑换
                </view>
                <view class="welfare_type_box">
                    <view class="type_item" @click="changeType(item)" :class="{ 'is_Select': item.id == data.typeId }" v-for="item in data.welfareType" :key="item.id">
                        {{ item.name }}
                    </view>
                </view>
            </view>

        </template>

        <view class="goods_list">
            <WaterfallsFlow :wfList="data.dataList" @waterItem="waterItem"></WaterfallsFlow>
        </view>



        <BCNotify ref="bcNotify"></BCNotify>



    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import { getAssetsPic } from '@/common/setPicture'

import BCNotify from '@/components/notify/index.vue'
import WaterfallsFlow from './components/WaterfallsFlow.vue'
import { formattime } from '@/common/formatTime'
import { integrallist, timePointsDetail } from '@/api/goods-api'
import { gotointegralGoodsDetail, gotomyIntegral, gotointegralRule } from '@/routes/goods-routes'

interface Data{
    dataList:any,
    welfareType: any,
    typeId: number,
    IntegralObj: any,
}

const data = reactive<Data>({
    dataList: [],
    welfareType: [
        { id: 999, name: '全部' },
        { id: 1, name: '最新' },
        { id: 2, name: '低价优先' },
        { id: 3, name: '高价优先' }
    ],
    typeId: 999,
    IntegralObj: {}
})


interface Props {
    id:string,
    pageTitle:string,
}
const props = defineProps<Props>()



const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const formatTime = computed(() => (time:number) => {
    return formattime(time, 'MM月DD日')
})


onMounted(() => {

})

onShow(() => {
    paging.value && (paging.value as any).reload()
})

const paging = ref()
const bcNotify = ref()

const queryList = async (pageNumber:number, pageSize:number) => {
    if (pageNumber == 1) {
        timePointsDetail({}).then((res:any) => {
            data.IntegralObj = res
        })
    }

    integrallist({
        pageNumber,
        pageSize,
        query: {
            sort: data.typeId == 999 ? null : data.typeId
        }
    }).then((res:any) => {
        (paging.value as any).complete(res.data)

    })

}


const changeType = (item:any) => {
    data.typeId = item.id;
    (paging.value as any).reload()

}

const tomyIntegral = () => {
    gotomyIntegral()
}


const waterItem = (item:any) => {
    if (item.stock == 0) {
        bcNotify.value.show('已经抢完了')
        return
    }
    gotointegralGoodsDetail({
        id: item.id
    })
}

const tointegralRule = () => {
    gotointegralRule()
}


defineExpose({
})


</script>
<style>
page{
    background: #F8F9F9;
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
    width: 100%;
    padding: 24rpx 0rpx;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
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
.top_box{
    padding: 30rpx;
    box-sizing: border-box;
    .my_integral_box{
        width: 100%;
        background: #FFFFFF;
        border-radius: 16rpx;
        padding: 30rpx 50rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0rpx 6rpx 12rpx rgba(0,0,0,0.03);
        .integral_left{
            display: flex;
            flex-direction: column;
            .integral_number{
                font-weight: 500;
                font-size: 56rpx;
                color: #FE623E;
            }
            .integral_text{
                font-size: 28rpx;
                font-weight: 400;
                color: #333333;
            }

        }
        .integral_right{
            padding: 12rpx 28rpx;
            box-sizing: border-box;
            background: #FFFFFF;
            border-radius: 30rpx;
            border: 2rpx solid #E3E3E3;
            font-size: 26rpx;
            font-weight: 400;
            color: #535353;
        }
    }
    .welfare_title{
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
        padding: 30rpx 0rpx;
        padding-top: 40rpx;
        box-sizing: border-box;
    }
    .welfare_type_box{
        display: flex;
        align-items: center;
        .type_item{
            padding: 12rpx 32rpx;
            box-sizing: border-box;
            border-radius: 32rpx;
            font-weight: 400;
            font-size: 28rpx;
            color: #333333;
            border: 2rpx solid #E5E5E5;
            margin-right: 20rpx;
            &.is_Select{
                border: 2rpx solid #EA3E1A;
                color: #EA3E1A;
            }
        }

    }
}

.goods_list{
    padding: 0rpx 10rpx;
    box-sizing: border-box;
}


</style>
