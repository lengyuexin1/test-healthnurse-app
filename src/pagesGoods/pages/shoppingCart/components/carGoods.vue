<template>
    <pageContainer :loading="data.pageLoading">
    <view class="contraner">
        <!-- <z-paging ref="paging" v-model="props.dataList" @query="queryList" :defaultPageSize="10" :refresher-enabled="false" :hide-empty-view="true">
        <template v-if="props.dataList.length"> -->
            <view class="cart-wrap" v-for="(item, index) in props.dataList" :key="index">
                <view class="list">
                    <view class="shopInfo tn-flex-row">
                        <TnCheckbox size="lg" checked-shape="circle" active-color="#EA3E1A" v-model="item.checkedGroup" @change="changeGroup($event, index)"></TnCheckbox>
                        <view class="info tn-flex-row" @tap="clickShop(item.shopId)">
                            <image class="thumb" :src="item.shopIcon" mode="scaleToFill" />
                            {{ item.shopName }}<TnIcon name="right" color="#8D8D8D" />
                        </view>
                    </view>
                    <TnSwipeAction @select="delGoods($event, item, index)">
                        <TnSwipeActionItem v-for="(ele, idx) in item.productList" :key="idx" :options="options" :auto-close="false">
                            <view class="goodsList tn-flex-center-center" @tap="clickGoods(ele)">
                                <TnCheckbox size="lg" checked-shape="circle" active-color="#EA3E1A" v-model="ele.checked" @change="changeSingle($event, index)"></TnCheckbox>
                                <view class="goodsInfo tn-flex-row">
                                    <view class="left tn-flex-row">
                                        <image class="left_img" :src="ele.image" mode="scaleToFill" />
                                        <view class="ItemDeleted" v-if="ele.isItemDeleted == 1">已下架</view>
                                    </view>
                                    <view class="right tn-flex-column">
                                        <view class="title tn-text-ellipsis-2">{{ ele.title }}</view>
                                        <view class="subtitle tn-text-ellipsis-1">{{ ele.subtitle }}</view>
                                        <view class="price-wrap tn-flex-center-between" @tap.stop>
                                            <view class="price">{{ priceFormat(ele.price) }}</view>
                                            <TnNumberBox v-model="ele.quantity" font-size="24rpx" size="sm" :min="1" :input-disabled="false" @change="quantityChange($event, ele.id)" />
                                        </view>
                                        <!-- <view class="tips" v-if="ele.preferentialPrice">优惠价￥{{ ele.preferentialPrice / 100 }}</view> -->
                                    </view>
                                </view>
                            </view>
                        </TnSwipeActionItem>
                    </TnSwipeAction>
                </view>
            </view>
        <!-- </template>
        <template v-else>
            <view class="not_data_box">
                <image
                    class="not_data_img"
                    :src="getAssetsUrl('/empty/empty_icon_data.png')"
                    mode="scaleToFill"
                />
                <view class="not_data_text">购物车暂无内容~</view>
            </view>
        </template> -->


        <view class="more_list_box">
            <view class="more_title">
                猜你喜欢
            </view>
            <view class="more_list">
                <WaterfallsFlow :wfList="data.moreGoodList" @waterItem="clickwaterItem"></WaterfallsFlow>
            </view>
        </view>

        <!-- <template #bottom> -->
            <view class="btn tn-flex-center-between animate__animated animate__faster animate__slideInUp" v-if="props.dataList.length">
                <view class="tn-flex-row" style="align-items: center;">
                    <TnCheckbox custom-class="allCheckbox" size="lg" checked-shape="circle" active-color="#EA3E1A" v-model="data.allChecked" @change="allChange">全选</TnCheckbox>
                    <view class="total tn-flex-column">
                        <view>合计：<text class="price">{{ priceFormat(data.submitPrice) }}</text></view>
                        <view class="tips">共{{ data.submitTotal }}件</view>
                    </view>
                </view>
                <view :class="[data.submitTotal > 0 ? '' : 'btn-disabled']">
                    <TnButton shape="round" width="220rpx" height="76rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" :debounce="true" @tap="clickBtn">
                        去结算
                    </TnButton>
                </view>
            </view>
        <!-- </template> -->
        <!-- </z-paging> -->
        <BCPopup
            ref="bcPopup"
            title="提示"
            content="是否确认删除该商品？"
            subBtn="确认"
            cancelBtn="取消"
            subBtnColor="#EA3E1A"
            @clickLeftBtn="confirmDel"
            @clickRightBtn="cancel">
        </BCPopup>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
    </pageContainer>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue"
import { onLoad, onShow } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import pageContainer from "@/components/container/page-container.vue"
import { updateCartQuantity, delCartGoods, createOrder, recommendList } from "@/api/goods-api"
import BCNotify from '@/components/notify/index.vue'
import BCPopup from '@/components/popup/index.vue'
import WaterfallsFlow from '@/pagesGoods/components/WaterfallsFlow/WaterfallsFlow.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnNumberBox from '@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue'
import TnSwipeAction from '@tuniao/tnui-vue3-uniapp/components/swipe-action/src/swipe-action.vue'
import TnSwipeActionItem from '@tuniao/tnui-vue3-uniapp/components/swipe-action/src/swipe-action-item.vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import { gotoShopDetail, gotoserviceDetail } from "@/routes/service-routes"
import { GlobalEvents, dispatchWEvent } from "@/events/event-registry"
import { TempStorage } from "@bc/base"
import { gotoBalanceGood } from '@/routes/order-routes'
import { priceFormat } from '@/common/price-format'
import { gotogoodsDetail } from "@/routes/goods-routes"
import { PlatformManage } from "@bc/sys"

interface Data {
    firstLoading: number
    pageLoading: boolean
    dataList: any
    totalProductLength: number
    allChecked: boolean
    delGoodsId: string
    delGoodsItemIndex: number
    delGoodsItemProductIndex: number
    submitTotal: number
    submitPrice: number
    moreGoodList: any,
    current:number
}
const props = withDefaults(defineProps<{
    dataList?: any
}>(), {
    dataList: []
})
const data = reactive<Data>({
    firstLoading: 0,
    pageLoading: false,
    dataList: [],
    current: 0,
    totalProductLength: 0,
    allChecked: false,
    delGoodsId: '',
    delGoodsItemIndex: 0,
    delGoodsItemProductIndex: 0,
    submitTotal: 0,
    submitPrice: 0,
    moreGoodList: []
})

const options: any = [
    {
        text: '删除',
        icon: 'delete',
        bgColor: 'tn-red'
    }
]
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
    props.dataList = props.dataList
    paging.value?.reload()
})
// tabs通知swiper切换
const tabsChange = (e:any) => {
    data.current = e
    // current = e
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
    e && props.dataList[index].productList.map((item: any) => {
        item.checked = true
        if (item.isItemDeleted == 1) {
            item.checked = false
            return
        }
    })
    !e && props.dataList[index].productList.map((item: any) => item.checked = false)
    calulateTotalPrice()
}

// 单个选择
const changeSingle = (e: any, index: number) => {
    console.log('单选', index)

    // 判断店铺下的商品是否已全部选择
    const shopAllChecked = props.dataList[index].productList.every((obj: any) => {
        obj.checked == true
        if (obj.isItemDeleted == 1) {
            obj.checked = false
            return
        }
    })

    // 如果该店铺的商品都已经选择，则店铺全选按钮设为true
    if (shopAllChecked) {
        props.dataList[index].checkedGroup = true
    }
    else {
        props.dataList[index].checkedGroup = false
    }
    // 重新计算金额
    calulateTotalPrice()
}

// 全部全选
const allChange = (e: any) => {
    if (e) {
        props.dataList.forEach((item: any) => {
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
        props.dataList.forEach((item: any) => {
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
    const totalLength = props.dataList.reduce((total: number, item: any) => {
        return total + item.productList.filter((product: any) => product.checked).length
    }, 0)

    data.submitTotal = totalLength

    const totalPrice = props.dataList.reduce((total: number, item: any) => {
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

const clickBtn = () => {
    if (data.submitTotal == 0) {
        bcNotify.value.show('您还没选择商品哦')
        return
    }
    const listData : any = []

    for (const i in props.dataList) {
        const dataItem = props.dataList[i]
        dataItem.checkedGroup = false
        for (const j in dataItem.productList) {
            const productItem = dataItem.productList[j]
            if (productItem.checked) {
                listData.push(productItem.id)
                productItem.checked = false
            }
        }
    }
    data.allChecked = false
    calulateTotalPrice()

    const uniqueId = TempStorage.savewx({
        listData,
        isCart: 1
    })

    gotoBalanceGood(uniqueId)
    // #ifdef MP-WEIXIN
    // #endif


    // #ifdef APP-PLUS
    const payJSON = JSON.stringify({
        listData,
        isCart: 1
    })

    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    // APP跳转小程序进行支付
    plus.share.getServices((res: any) => {
        let sweixin = null as any
        for (const i in res) {
            if (res[i].id == 'weixin') {
                sweixin = res[i]
            }
        }
        // 唤醒微信小程序
        if (sweixin) {
            uni.hideLoading()

            PlatformManage.getToken().then((res:any) => {
                console.log('获取userinfo', res)
                sweixin.launchMiniProgram({
                    id: 'gh_c2469c570746',  // 小程序的原始ID，微信公众平台设置里有
                    type: shareType, // 小程序版本  0-正式版； 1-测试版； 2-体验版。
                    path: `/pagesOrder/pages/balanceGoods/balanceGoods?payJSON=${payJSON}&userId=${res.id}`, // 小程序的页面，使用传递的参数在小程序内部判断跳转到指定页面
                    extraData: {
                        'payJSON': payJSON
                    }
                })
            })


        }
    })
    // #endif


}

const delGoods = (e: number, item: any, index: number) => {
    data.delGoodsItemIndex = index
    data.delGoodsItemProductIndex = e
    data.delGoodsId = item.productList[e].id
    bcPopup.value.open()
}

// 确认删除
const confirmDel = () => {
    delCartGoods({
        id: data.delGoodsId
    }).then(() => {
        bcPopup.value.close()
        bcNotify.value.show('删除成功')
        dispatchWEvent(GlobalEvents.Refresh_ShoppingCart_Badge)

        // 接口请求成功后，使用本地删除，防止清除用户全选或者选择的操作
        props.dataList[data.delGoodsItemIndex].productList.splice(data.delGoodsItemProductIndex, 1)

        // 如果该店铺下只有一个商品，删除商品后，删除该店铺
        if (props.dataList[data.delGoodsItemIndex].productList.length == 0) {
            props.dataList.splice(data.delGoodsItemIndex, 1)
        }

        // 修改标题的商品总数
        uni.setNavigationBarTitle({ title: `购物车(${data.totalProductLength - 1})` })


        setTimeout(() => {
            // 重新算合计的总额
            calulateTotalPrice()
        }, 0)
        // paging.value.reload()
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

const cancel = () => {
    bcPopup.value.close()
    // 恢复默认值
    data.delGoodsId = ''
    data.delGoodsItemIndex = 0
    data.delGoodsItemProductIndex = 0
}

const clickwaterItem = (item:any) => {
    console.log('item', item)
    gotogoodsDetail(item.id)
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
    position: fixed;
    bottom: 0;
    z-index: 999999;
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
