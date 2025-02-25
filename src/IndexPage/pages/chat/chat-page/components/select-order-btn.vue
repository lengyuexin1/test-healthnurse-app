<template>
    <view class="content" v-if="data.showPopup">
        <TnPopup v-model="data.showPopup" open-direction="bottom" @open="open" overlay-closeable>
            <view class="mesg-ode-hed row i-center j-between">
                <view></view>
                <view class="mesg-ode-hed-tit">请选择订单</view>
                <TnIcon name="close" color="#333333" size="28rpx" @click="hidePup" />
            </view>
            <view class="mesg-ode-seabox">
                <view class="seabox">
                    <TnInput placeholder="请输入订单号/手机号" v-model="data.searchText">
                        <template #prefix>
                            <TnIcon name="search"></TnIcon>
                        </template>
                    </TnInput>
                </view>
                <view class="seabox_text" @click="getsearch">搜索</view>
            </view>
            <view class="mesg-ode-dat">
                <!-- @scrolltolower="loadMoreList" -->
                <scroll-view class="mesg-ode-list" scroll-y="true" upper-threshold="50">
                    <template v-if="data.messageList.length">
                        <block v-for="(order) in data.messageList" :key="order.id">
                            <block v-for="(item) in order.shopList" :key="item.shopId">
                                <block v-for="(ele) in item.entityList" :key="ele.entityId">
                                    <view class="mesg-ode-dat-li row i-center j-between">
                                        <image :src="ele.image" mode="aspectFill"></image>
                                        <view class="mesg-ode-li-mid column j-between">
                                            <view class="i-center">
                                                <view class="mesg-ode-li-mid-tit u-line-1">{{ ele.title }}</view>
                                                <view class="mesg-ode-li-mid-subtit u-line-1">订单号: {{ order.serialNo }}
                                                </view>
                                            </view>
                                            <view class="row j-between i-center">
                                                <view class="mesg-ode-li-mid-bot">
                                                    ￥<text>{{ (ele.price / 100) }}</text>
                                                    <template v-if="ele.optionExtend">
                                                        /{{ ele.optionExtend.serviceWorkingHours.unitName }}
                                                    </template>
                                                </view>
                                                <view class="mesg-ode-li-end" @click="sendSerItem(order, ele)">发送</view>
                                            </view>
                                        </view>
                                    </view>
                                </block>
                            </block>
                        </block>
                    </template>
                </scroll-view>
            </view>
        </TnPopup>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'
import { getHouseOrderListL } from '@/api/hours-api'
import { getgoodOrderList, getorderList } from '@bc/api/im-api'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import { PlatformManage } from "@bc/sys"


interface Props {
    orderDetail: any
}
interface Data {
    // 特殊信息组件
    messageList: any,
    showPopup: boolean,
    userId: any,
    searchText: string,
    applyId: number,
    pageSize: number,
    mobile: number | undefined,
    serialNo: string | undefined,
    title: string | undefined,
}

interface Events {
    (e: 'sendOrder', data: string): void
}



const props = defineProps<Props>()
const emit = defineEmits<Events>()


const data = reactive<Data>({
    messageList: [],
    showPopup: false,
    userId: '',
    searchText: '',
    applyId: 1,
    pageSize: 0,
    mobile: undefined,
    serialNo: undefined,
    title: undefined,
})

const changeshow = (userId: any) => {


    PlatformManage.getToken().then((res: any) => {
        data.showPopup = true
        console.log('res.applyId', res.applyId);
        data.applyId = res.applyId
        data.userId = userId

        getProductList()

    })

}

const hidePup = () => {
    data.showPopup = false
    data.searchText = ''
    data.mobile = undefined
    data.serialNo = undefined
    data.title = undefined
}
const open = () => {
    data.searchText = ''
    data.mobile = undefined
    data.serialNo = undefined
    data.title = undefined
}

const getProductList = () => {
    // data.pageSize = data.pageSize + 10

    data.applyId == 2 ? getorderList({
        pageNumber: 1,
        pageSize: 1000,
        query: {
            userId: data.userId ? data.userId : null,
            mobile: data.mobile,
            serialNo: data.serialNo,
            title: data.title,
        }
    }).then((res) => {
        data.messageList = res.data
    }) : getHouseOrderListL({
        size: 100,
        query: {
            // userId: data.userId ? data.userId : null,
            // mobile: data.mobile,
            // serialNo: data.serialNo,
            title: data.searchText,
        },
        cursor: null
    }).then((res: any) => {
        data.messageList = res.data
    })
}


const getsearch = () => {
    console.log(data.searchText);
    let patternNumber = /^1[234578]\d{9}$/
    let pattern = /dd/i
    if ((patternNumber.test(data.searchText))) {
        console.log('电话号码搜索');
        data.mobile = Number(data.searchText)
        data.serialNo = undefined
        data.title = undefined
    } else if (pattern.test(data.searchText)) {
        console.log('订单搜索');
        data.mobile = undefined
        data.serialNo = data.searchText
        data.title = undefined
    } else {
        console.log('标题搜索');
        data.mobile = undefined
        data.serialNo = undefined
        data.title = data.searchText
    }
    getProductList()
}


// const loadMoreList = () => {
//     console.log('获取更多')
//     getProductList()
//     // getList()
// }

const sendSerItem = (order: any, item: any) => {
    const data = {
        orderId: order.id,
        entityId: item.entityId,
        itemId: item.itemId,
        serialNo: order.serialNo,
        name: item.title,
        desc: item?.desc,
        thumb: item.image,
        price: item.price,
        unitName: item?.optionExtend?.serviceWorkingHours?.unitName,
        msgType: 'order',
        templateCode: order.templateCodeId
    }
    emit('sendOrder', JSON.stringify(data))
    hidePup()
}

onMounted(() => {
    console.log('组件渲染')
})

defineExpose({
    changeshow,
})

</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 500rpx;
    background: #fff;
    padding: 40rpx 30rpx;
    box-sizing: border-box;

    .row {
        display: flex;
        flex-direction: row;
    }

    .i-center {
        align-items: center;
    }

    .j-between {
        justify-content: space-between;
    }


    .mesg-ode-hed {
        padding: 30rpx 40rpx;

        .mesg-ode-hed-tit {
            font-size: 36rpx;
            font-weight: bold;
            color: #333333;
        }
    }

    .mesg-ode-seabox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0rpx 30rpx 36rpx;

        .seabox {
            width: 80%
        }

        .seabox_text {
            width: 15%;
            text-align: center;
            // height: 42rpx;
            // line-height: 42rpx;
            // background: #41A0FE;
            // border-radius: 20rpx;
            // font-size: 24rpx;
            // color: #fff;
        }
    }

    .mesg-ode-dat {
        padding: 0 30rpx;
        height: 50vh;

        .mesg-ode-list {
            height: 100%;
        }

        .mesg-ode-dat-li {
            border-bottom: 2rpx solid #F2F2F2;
            padding-bottom: 20rpx;
            margin-bottom: 20rpx;

            image {
                width: 144rpx;
                height: 144rpx;
                background: #E3E3E3;
                border-radius: 16rpx;
                flex-shrink: 0;
            }

            .mesg-ode-li-mid {
                margin-left: 24rpx;
                height: 130rpx;
                flex: 1;

                .mesg-ode-li-mid-tit {
                    font-size: 30rpx;
                    font-weight: bold;
                    color: #333333;
                }

                .mesg-ode-li-mid-subtit {
                    margin-top: 8rpx;
                    font-size: 22rpx;
                    font-weight: bold;
                    color: #666666;
                }

                .mesg-ode-li-mid-static {
                    margin-left: 20rpx;
                    width: 118rpx;
                    padding: 0 14rpx;
                    height: 42rpx;
                    background: #E3F6F0;
                    border-radius: 6rpx;
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #14C183;
                    text-align: center;
                    line-height: 42rpx;
                    flex-shrink: 0;
                }

                .mesg-ode-li-mid-bot {
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #FF0000;

                    text {
                        font-size: 36rpx;
                        font-weight: bold;
                    }
                }
            }

            .mesg-ode-li-end {
                width: 160rpx;
                height: 56rpx;
                background: #3CD780;
                border-radius: 28rpx;
                font-size: 28rpx;
                font-weight: 400;
                line-height: 56rpx;
                color: #FFFFFF;
                text-align: center;
                margin: auto 0 0 auto;
                flex-shrink: 0;
            }
        }
    }


}
</style>
