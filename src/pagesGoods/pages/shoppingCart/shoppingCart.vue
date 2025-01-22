<template>
    <pageContainer :loading="data.pageLoading">
    <view class="contraner">
        <z-paging ref="paging"  @query="queryList" v-model="data.dataList":defaultPageSize="10" :refresher-enabled="false" :hide-empty-view="true">
            <template #top>
            <view class="head">
                    <view class="tabox row j-center">
                        <view
                            class="tabli"
                            :class="{ set: data.current == index }"
                            v-for="(item,index) in navList"
                            :key="index"
                            @click="tabsChange(index)"
                        >{{item.name}}</view>
                    </view>
            </view>
            </template>
            <view class="swiper">
                <carServe v-if="data.serviceType === 0" :dataList="data.dataList"></carServe>
                <carGoods v-else ref="godcart" :dataList="data.dataList"></carGoods>
            </view>
        <BCNotify ref="bcNotify"></BCNotify>
        </z-paging>
    </view>
    </pageContainer>

</template>

<script setup lang="ts">

import { ref, reactive, computed, onMounted } from "vue"
import { onLoad, onShow } from "@dcloudio/uni-app"
import { getGoodsCartList } from "@/api/goods-api"
import { getCartServiceList } from "@/api/service-api"
import { getAssetsPic } from '@/common/setPicture'
import carServe from './components/carServe.vue'
import carGoods from './components/carGoods.vue'
import pageContainer from "@/components/container/page-container.vue"
import BCNotify from '@/components/notify/index.vue'

interface Data {
    firstLoading: number
    pageLoading: boolean
    dataList: any

    serviceType:number,
    totalProductLength: number
    current:number
}

const data = reactive<Data>({
    serviceType: 0,
    firstLoading: 0,
    pageLoading: false,
    dataList: [],
    totalProductLength: 0,
    current: 0

})
const paging = ref() as any
const navList = [
    {
        id: '0',
        name: '服务'
    },
    {
        id: '1',
        name: '商品'
    }
]
const bcNotify = ref()

const queryList = (pageNumber: number, pageSize: number) => {
    if (data.current === 0) {
        getCartServiceList().then((res: any) => {
            paging.value.complete(res)
            data.serviceType = data.current

        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        getGoodsCartList().then((res: any) => {
            res.forEach((item: any) => {
                item.checkedGroup = false
                item.productList.forEach((element: any) => {
                    element.checked = false
                })
            })
            data.totalProductLength = res.reduce((accumulator: number, currentValue: any) => {
                return accumulator + currentValue?.productList.length
            }, 0) // 0 是初始值，表示累加器开始时的值
            uni.setNavigationBarTitle({ title: `购物车(${data.totalProductLength})` })
            // paging.value.complete(res)
            paging.value.complete(res)
            data.serviceType = data.current
            // 优化购物车初始化出现红条
            if (data.firstLoading == 0) {
                data.firstLoading = 1
                setTimeout(() => {
                    data.pageLoading = false
                }, 1000)
            }

        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
    }
}
onMounted(() => {

})

onShow(() => {
    // paging.value?.reload()
})
// tabs通知swiper切换
const tabsChange = (e:any) => {
    data.current = e
    // current = e
    paging.value?.reload()
}


</script>

<style lang="scss" scoped>
:deep(.tn-gray-disabled_border) {
    border-color: #B3B3B3;
}
.swiper {
    height: 100%;
}
.set{
     width: 360rpx;
     height: 90rpx;
     line-height: 90rpx;
     background: #ffffff !important;
     font-size: 32rpx;
     color: #000000;
    }
.head {
    padding: 0 20rpx;
    background: linear-gradient(#dff7ef 0%, #eff0f2 100%);
}
.tabox {
    height: 100rpx;
    background: linear-gradient(#dff7ef 0%, #eff0f2 100%);
    align-items: flex-end;
    .tabli {
        font-size: 28rpx;
        font-weight: 400;
        color: #666666;
        width: 350rpx;
        height: 70rpx;
        line-height: 70rpx;
        background: #f3f6f6;
        box-shadow: 0rpx 0rpx 24rpx rgba(0, 0, 0, 0.04);
        border-radius: 24rpx 24rpx 0rpx 0rpx;
        text-align: center;
    }
}

.cart-wrap {
    margin: 20rpx;
    padding: 24rpx;
    background-color: #FFFFFF;
    border-radius: 24rpx;
    box-shadow: 0 0 24rpx 2rpx rgba(0, 0, 0, .04);
}
.not_data_box{
    width: 100%;
    padding: 50rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .not_data_img{
        width: 320rpx;
        height: 320rpx;
        margin-bottom: 20rpx;
    }
    .not_data_text{
        font-size: 28rpx;
        color: #999999;
    }
}
.more_list_box{
    .more_title{
        font-size: 30rpx;
        font-weight: 600;
        color: #333333;
        padding: 20rpx;
        box-sizing: border-box;
    }
    .more_list{
        padding: 0rpx 10rpx;
        box-sizing: border-box;
    }

}

.btn {
    width: 100%;
    height: 146rpx;
    padding: 20rpx;
    background-color: #FFFFFF;
    box-shadow: 0 -4rpx 12rpx 2rpx rgba(0, 0, 0, .06);

    .allCheckbox {
        align-items: center;
        font-size: 28rpx;
        color: #666666;
    }

    .total {
        margin-left: 30rpx;

        .price {
            font-size: 30rpx;
            font-weight: bold;
            color: #F50606;
        }
        .tips {
            font-size: 22rpx;
            color: #999999;
        }
    }
}

.btn-disabled {
    opacity: .6;
}
</style>
