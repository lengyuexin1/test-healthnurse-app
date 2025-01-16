<template>
    <pageContainer :loading="data.pageLoading">
    <view class="contraner">
        <z-paging ref="paging" v-model="data.dataList":defaultPageSize="10" :refresher-enabled="false" :hide-empty-view="true">
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
            <view class="swiper">
                <carServe v-if="data.current === 0"></carServe>
                <car-goods  v-else ref="godcart"></car-goods>
            </view>
        <BCNotify ref="bcNotify"></BCNotify>
        </z-paging>
    </view>
    </pageContainer>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue"
import { onLoad, onShow } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import  carServe from './components/carServe.vue'
import  carGoods from './components/carGoods.vue'
import pageContainer from "@/components/container/page-container.vue"
import { getGoodsCartList, updateCartQuantity, delCartGoods, createOrder, recommendList } from "@/api/goods-api"
import BCNotify from '@/components/notify/index.vue'
import { gotoShopDetail, gotoserviceDetail } from "@/routes/service-routes"
import { gotogoodsDetail } from "@/routes/goods-routes"
import { PlatformManage } from "@bc/sys"

interface Data {
    firstLoading: number
    pageLoading: boolean
    dataList: any
    totalProductLength: number
    allChecked: boolean
    submitTotal: number
    submitPrice: number
    moreGoodList: any,
    current:number
}

const data = reactive<Data>({
    firstLoading: 0,
    pageLoading: false,
    dataList: [],
    current: 0,
    totalProductLength: 0,
    allChecked: false,
    submitTotal: 0,
    submitPrice: 0,
    moreGoodList: []
})

const  navList = [
    {
        id: '1',
        name: '服务'
    },
    {
        id: '2',
        name: '商品'
    }
]

const bcNotify = ref()

const bcPopup = ref()

const paging = ref() as any

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onMounted(() => {
    recommendList({
        pageSize: 10,
        pageNumber: 1,
        query: {
            lat: null,
            lng: null,
            sortType: 7,
            businessType: 2,
            sourceType: 2
        }
    }).then((res:any) => {
        data.moreGoodList = res.data
    })
})

onShow(() => {
    // paging.value?.reload()
})
// tabs通知swiper切换
const tabsChange = (e:any) => {
    data.current = e
    // current = e
}
const queryList = (pageNumber: number, pageSize: number) => {
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

        paging.value.complete(res)

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

// 修改商品数量
const quantityChange = (val: number, id: string) => {
    updateCartQuantity({
        id: id,
        quantity: val
    }).then(() => {
        calulateTotalPrice()
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

// 店铺全选
const changeGroup = (e: any, index: number) => {
    e && data.dataList[index].productList.map((item: any) => {
        item.checked = true
        if (item.isItemDeleted == 1) {
            item.checked = false
            return
        }
    })
    !e && data.dataList[index].productList.map((item: any) => item.checked = false)
    calulateTotalPrice()
}

// 单个选择
const changeSingle = (e: any, index: number) => {
    console.log('单选', index)

    // 判断店铺下的商品是否已全部选择
    const shopAllChecked = data.dataList[index].productList.every((obj: any) => {
        obj.checked == true
        if (obj.isItemDeleted == 1) {
            obj.checked = false
            return
        }
    })

    // 如果该店铺的商品都已经选择，则店铺全选按钮设为true
    if (shopAllChecked) {
        data.dataList[index].checkedGroup = true
    }
    else {
        data.dataList[index].checkedGroup = false
    }
    // 重新计算金额
    calulateTotalPrice()
}

// 全部全选
const allChange = (e: any) => {
    if (e) {
        data.dataList.forEach((item: any) => {
            item.checkedGroup = true

            item.productList.forEach((element: any) => {
                element.checked = true
                if (element.isItemDeleted == 1) {
                    element.checked = false
                    return
                }
            })
        })
    }
    else {
        data.dataList.forEach((item: any) => {
            item.checkedGroup = false

            item.productList.forEach((element: any) => {
                element.checked = false
            })
        })
    }
    calulateTotalPrice()
}

// 计算总数
const calulateTotalPrice = () => {
    const totalLength = data.dataList.reduce((total: number, item: any) => {
        return total + item.productList.filter((product: any) => product.checked).length
    }, 0)

    data.submitTotal = totalLength

    const totalPrice = data.dataList.reduce((total: number, item: any) => {
        return total + item.productList.reduce((subTotal: number, product: any) => {
            if (product.checked) {
                return subTotal + (product.price * product.quantity)
            }
            return subTotal
        }, 0)
    }, 0)

    data.submitPrice = totalPrice
}

const clickShop = (shopId: string) => {
    gotoShopDetail(shopId)
}

const clickGoods = (item: any) => {
    if (item.isItemDeleted == 1) {
        return
    }
    gotogoodsDetail(item.itemId)
}


</script>

<style lang="scss" scoped>
:deep(.tn-gray-disabled_border) {
    border-color: #B3B3B3;
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
.list {
    .shopInfo {
        font-weight: 500;
        font-size: 28rpx;
        color: #333333;

        .info {
            align-items: center;
            margin-left: 30rpx;

            .thumb {
                width: 40rpx;
                height: 40rpx;
                border-radius: 50%;
                margin-right: 14rpx;
            }
        }
    }

    .goodsList {
        margin-top: 28rpx;

        .goodsInfo {
            flex: 1;
            margin-left: 30rpx;

            .left {
                width: 200rpx;
                height: 200rpx;
                border-radius: 15rpx;
                position: relative;
                .left_img{
                    width: 100%;
                    height: 100%;
                }
                .ItemDeleted{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    width: 96rpx;
                    height: 96rpx;
                    border-radius: 50%;
                    background-color: rgba(0, 0, 0, 0.5);
                    text-align: center;
                    line-height: 96rpx;
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #FFFFFF;
                }
            }

            .right {
                flex: 1;
                margin-left: 24rpx;

                .title {
                    margin-top: 10rpx;
                    font-size: 30rpx;
                    font-weight: bold;
                    color: #333333;
                    line-height: 36rpx;
                }

                .subtitle {
                    margin-top: 15rpx;
                    font-size: 24rpx;
                    color: #999999;
                }

                .price-wrap {
                    margin-top: 70rpx;

                    .price {
                        font-weight: bold;
                        font-size: 32rpx;
                        color: #1A1A1A;
                    }
                }

                .tips {
                    margin-top: 8rpx;
                    font-weight: 500;
                    font-size: 24rpx;
                    color: #FC3848;
                }
            }
        }

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
