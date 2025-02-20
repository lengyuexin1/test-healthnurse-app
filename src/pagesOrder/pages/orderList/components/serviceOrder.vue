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
                <view class="top_box">
                    <view
                          class="navList_item"
                          :class="{ 'is_select' : data.navIndex == index }"
                          v-for="(item,index) in data.navList" :key="item.id"
                          @click="select(item,index)">
                        {{ item.category_name }}
                    </view>
                </view>
            </template>
            <view class="content">
                <serviceOrderItem v-for="item in data.dataList" :key="item.id" :orderInfo="item"
                                  @cancelOrder="cancelOrder"></serviceOrderItem>
            </view>
        </z-paging>

        <TnPopup v-model="data.showreason" :close-btn="true" @close="data.showreason = false" open-direction="bottom"
                 round="32rpx">
            <view class="delreason_box">
                <view class="delreason_box_title">选择取消订单原因</view>
                <view class="delreason_list_box">
                    <view class="delreason_item_title">
                        <view class="delreason_text">请选择取消原因</view>
                    </view>
                    <view class="delreason_item" v-for="item in data.reasonList" :key="item.id">
                        <view class="delreason_text" @click="clickdelreason(item.id)">{{ item.name }}</view>
                        <view class="is_icon" v-if="data.reasonItemid == item.id">
                            <TnIcon name="success" color="#29C86F" size="28rpx"></TnIcon>
                        </view>
                    </view>
                </view>
                <view class="delreason_btn" @click="goRemove">提交</view>
            </view>

            <BCNotify ref="delreasonNotify"></BCNotify>
        </TnPopup>
        <BCNotify ref="bcNotify"></BCNotify>


    </view>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { applyRefund, getAftersaleReason, getserviceOrderList, houseOrderCancel } from '@/api/order-api'
import serviceOrderItem from './serviceOrderItem.vue'

import BCNotify from '@/components/notify/index.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

interface navList {
    id: string,
    category_name: string,
    category_id: number | null
}

interface Data {
    dataList: any,
    navList: navList[],
    navIndex: number,
    statusId: number | null,
    cursor: string | 0,
    showreason: boolean,
    reasonList: any,
    reasonItemid: string,
    cancelObj: any,
}

interface Prop {
    tabsIndsex: number | null,
    month_t: string | number | null
}

const props = defineProps<Prop>()


const data = reactive<Data>({
    dataList: [],
    navList: [
        {
            id: '1',
            category_name: '全部',
            category_id: null
        },
        {
            id: '2',
            category_name: '待付款',
            category_id: 65537
        },
        {
            id: '3',
            category_name: '待服务',
            category_id: 131076
        },
        {
            id: '4',
            category_name: '待确认',
            category_id: 131077
        },
        {
            id: '5',
            category_name: '待评价',
            category_id: 196610
        }
    ],
    navIndex: 0,
    statusId: null,
    cursor: null,
    showreason: false,
    reasonList: [],
    reasonItemid: '',
    cancelObj: {}
})

onMounted(() => {
    data.navIndex = props.tabsIndsex
})

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const paging = ref(null)


const queryList = (pageNumber: number, pageSize: number) => {
    getOrderList(pageNumber, pageSize)
}

const select = (item: navList, index: number) => {
    data.navIndex = index
    data.statusId = item.category_id;
    (paging.value as any).reload()

}

const getOrderList = (pageNumber: number, pageSize: number) => {
    if (pageNumber == 1) {
        data.cursor = null
    }
    getserviceOrderList({
        cursor: data.cursor,
        size: pageSize,
        query: {
            kind: 1,
            statusId: data.navList[data.navIndex].category_id,
            title: '',
            dateOption: props.month_t
        }
    }).then((res) => {
        (paging.value as any).complete(res.list)
        data.cursor = res.nextCursor!
    })


}

// 刷新页面
const reloadPage = () => {
    (paging.value as any).reload()
}

const delreasonNotify = ref()
const bcNotify = ref()
const cancelOrder = (obj: any) => {
    getAftersaleReason({
        typeId: 6
    }).then((res: any) => {
        data.reasonList = res
        data.showreason = true
        data.cancelObj = obj

    }).catch(() => {
        bcNotify.value.error('取消原因数据获取失败')
    })

}

const clickdelreason = (id: string) => {
    data.reasonItemid = id
}

// 提交取消订单
const goRemove = () => {
    console.log('data.cancelObj', data.cancelObj)

    setTimeout(() => {
        if (data.reasonItemid == '') {
            delreasonNotify.value.error('请选择取消原因')
            return
        }

        if (data.cancelObj.actionableList.includes('apply_refund')) {
            console.log({
                orderEntityId: data.cancelObj.shopList[0].entityList[0].entityId,
                reasonId: data.reasonItemid,
                number: data.cancelObj.shopList[0].entityList[0].quantity,
                refund: data.cancelObj.shopList[0].entityList[0].paidAmount
            })

            // 不存在serviceInfo.info
            applyRefund({
                orderEntityId: data.cancelObj.shopList[0].entityList[0].entityId,
                reasonId: data.reasonItemid,
                number: data.cancelObj.shopList[0].entityList[0].quantity,
                refund: data.cancelObj.shopList[0].entityList[0].paidAmount
            }).then((res: any) => {
                bcNotify.value.show('取消订单成功')
                data.showreason = false
                reloadPage()
            }).catch((err: any) => {
                delreasonNotify.value.error(err.message)
            })
            return
        }

        console.log({
            orderId: data.cancelObj.id,
            reasonId: data.reasonItemid
        })


        houseOrderCancel({
            orderId: data.cancelObj.id,
            reasonId: data.reasonItemid
        }).then((res: any) => {
            bcNotify.value.show('取消订单成功')
            data.showreason = false
            reloadPage()
        }).catch((err: any) => {
            delreasonNotify.value.error(err.message)
        })
    }, 300)
}

defineExpose({
    reloadPage
})

</script>

<style lang="scss" scoped>
.top_box {
    display: flex;
    padding: 30rpx 24rpx;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    background: #F3F4F6;

    .navList_item {
        padding: 10rpx 20rpx;
        box-sizing: border-box;
        text-align: center;
        font-size: 28rpx;
        color: #666666;
        background: #fff;
        border-radius: 32rpx;

        &.is_select {
            background: #29C86F;
            color: #fff;
        }
    }
}

.content {
    padding: 0rpx 20rpx;
    box-sizing: border-box;
}

.test {
    width: 100%;
    height: 512rpx;
    background-color: #fff;
    border-radius: 24rpx;
}

.delreason_box {
    padding: 30rpx;
    padding-bottom: 0;
    box-sizing: border-box;

    .delreason_box_title {
        font-size: 34rpx;
        font-weight: 600;
        text-align: center;
        color: #333333;
        margin-bottom: 30rpx;
    }

    .delreason_list_box {
        .delreason_item_title {
            font-size: 32rpx;
            color: #333333;
            border-bottom: 2rpx solid #eeeeee;
            margin-bottom: 30rpx;
        }

        .delreason_item {
            font-size: 30rpx;
            color: #666666;
            border-bottom: 2rpx solid #eeeeee;
            margin-bottom: 30rpx;
            position: relative;

            .is_icon {
                position: absolute;
                top: 0;
                right: 0rpx;
            }
        }

        .delreason_text {
            padding-bottom: 20rpx;
            box-sizing: border-box;
        }
    }

    .delreason_btn {
        width: 85%;
        height: 84rpx;
        background: #29c86f;
        border-radius: 85rpx;
        text-align: center;
        line-height: 84rpx;
        color: #ffffff;
        font-size: 32rpx;
        font-weight: 600;
        margin: auto;
    }
}
</style>
