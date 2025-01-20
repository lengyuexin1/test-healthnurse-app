<template>
    <view class="container">
        <z-paging ref="paging" v-model="data.dataList" :auto="true" :auto-scroll-to-top-when-reload="false"
                  :auto-show-system-loading="true"
                  :defaultPageSize="10" :fixed="true" :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
                  empty-view-text="还没有数据哦~"
                  :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
                  @query="getList">
            <template #top>
                <bc-page-navbar :bgColor="'#ffffff'" :textColor="'#000000'" :title="'开票记录'">
                </bc-page-navbar>
            </template>

            <view class="corbox">
                <u-gap height="16" bgColor="rgba(0,0,0,0)"></u-gap>
                <block v-for="(item,index) in data.hisList" :key="index">
                    <view class="vocetit">
                        <text class="text">{{ item.month }}</text>
                    </view>
                    <view class="vocebox">
                        <view class="voceli row i-center j-between" v-for="(ele,ins) in item.list" :key="ins"
                              @click="linkDetails(ele.id)">
                            <view>
                                <view class="vocetop">
                                    <text class="viceord">订单号：{{ ele.orderSerialNo }}</text>
                                </view>
                                <view class="vocebot row i-center j-between">
                                    <view class="vocelef">
                                        <view class="vocehed">
                                            <text class="vocetex">{{ ele.itemName }}</text>
                                            <text class="rigtex">¥{{ ele.money | moneyFilter }}</text>
                                        </view>
                                    </view>
                                </view>
                                <view class="vocebout">
                                    <text class="vicestime">{{ ele.utcCreated | date('yyyy-mm-dd hh:MM:ss') }}</text>
                                </view>
                            </view>
                            <view class="vocerig row i-center">
                                <text v-if="stateList[ele.status]" :style="{ color: stateList[ele.status].color }">
                                    {{ stateList[ele.status].text }}
                                </text>
                                <text v-else :style="{ color: '#ff3366' }">开票失败</text>
                                <u-icon name="arrow-right" size="28rpx" color="#BEBEBE"></u-icon>
                            </view>
                        </view>
                    </view>
                </block>
                <u-safe-bottom></u-safe-bottom>
            </view>
        </z-paging>
    </view>
</template>

<script lang="ts" setup>
import { gotoInvoiceDetails } from '@/routes/order-routes'
import { invoiceList } from '@/api/care-api'
import { computed, reactive, ref, watch } from "vue"
import { getAssetsPic } from "@/common/setPicture"
import { pagination } from '@/common/sneakInto'

interface Data {
    params: object,
    dataList: Array<any>,
    isempty: boolean,
    keylist: Array<any>,
    stateList: object
}

const data = reactive({
    params: {},
    dataList: [],
    isempty: false,
    keylist: [],
    stateList: {
        "34": {
            text: '开票中',
            color: '#F8AD3D'
        },
        "102": {
            text: '开票成功',
            color: '#43A1FF'
        },
        "104": {
            text: '开票失败',
            color: '#ff3366'
        }
    }
})

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const { getListResult, PaginationData } = pagination()

watch(() => PaginationData.dalist, (newval) => {
    if (newval.length <= 0) {
        return
    }
    const arr = [...data.dataList]
    data.keylist = [uni.$u.timeFormat(newval[0].utcCreated, 'yyyy年mm月')] //[newval[0].month]
    arr.push({ month: data.keylist[0] })
    arr[0].list = []
    for (const i in newval) {
        const number = data.keylist.indexOf(uni.$u.timeFormat(newval[i].utcCreated, 'yyyy年mm月'))
        if (number >= 0) {
            arr[number].list.push(newval[i])
        }
        else {
            data.keylist.push(uni.$u.timeFormat(newval[i].utcCreated, 'yyyy年mm月'))
            arr.push({ month: data.keylist[data.keylist.length - 1] })
            arr[arr.length - 1].list = [newval[i]]
        }
    }
    console.log(arr, data.keylist)
    arr.sort((a, b) => {

        let time1 = a.month.replace(/年/gi, '/')
        time1 = time1.replace(/月/gi, '/01')
        let time2 = b.month.replace(/年/gi, '/')
        time2 = time2.replace(/月/gi, '/01')


        return Number(new Date(time2)) - Number(new Date(time1))
    })
    data.hisList = [...arr]
})
const linkDetails = (id) => {
    gotoInvoiceDetails({
        id
    })
}
const paging = ref()
// 加载接口
const getList = async () => {

    invoiceList({
        pageSize: data.params.size,
        pageNumber: data.params.page,
        query: {}
    }).then(res => {
        getListResult(res.data);
        (paging.value as any).complete(res.data)
    }).finally(() => {
        data.loaded = true
    })
}

</script>

<style lang="scss" scoped>
.corbox {
    padding: 0 24rpx;
    background: linear-gradient(#dff7ef 0%, rgba(255, 255, 255, 0) 30%);
}

.vocetit {
    padding: 25rpx 30rpx;

    .text {
        font-size: 32rpx;
        font-weight: 500;
        color: #333333;
    }
}

.vocebox {
    border-radius: 24rpx;
    background-color: #ffffff;
    padding: 0 32rpx;
}

.voceli {
    padding: 32rpx 0;
    border-bottom: 2rpx solid #f2f2f2;

    .vocetop {
        flex: 1;
        // padding-bottom: 20rpx;

        .viceord {
            /* font-size: 28rpx;
				font-weight: 400;
				color: #666666; */
            font-size: 28rpx;
            font-weight: bold;
            color: #333333;
        }

        .vicestu {
            font-size: 28rpx;
            font-weight: 400;
            color: #ff972e;
        }
    }

    .vocebout {
        margin-top: 12rpx;

        .vicetit {
            font-size: 28rpx;
            font-weight: bold;
            color: #333333;
        }

        .vicestime {
            /* font-size: 28rpx;
				font-weight: 400;
				color: #666666; */
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;
        }
    }

    .vocebot {
        margin-top: 8rpx;
        /* margin-top: 16rpx;
			background: #F6F6F6;
			border-radius: 6rpx;
			padding: 24rpx; */
    }

    .vocelef {
        .vocehed {
            .vocetex {
                font-size: 28rpx;
                color: #666666;
            }

            .vocepic {
                font-size: 26rpx;
                font-weight: 400;
                color: #999999;
                margin-top: 4rpx;
            }
        }
    }

    .rigtex {
        font-size: 30rpx;
        color: #666666;
        margin-left: 20rpx;
    }

    .vocerig {
        font-size: 28rpx;
        font-weight: 400;
        color: #f8ad3d;
        flex-shrink: 0;

        text {
            margin-right: 16rpx;
        }
    }

    .vocemore {
        margin-top: 20rpx;
        justify-content: flex-end;

        .vocebtn {
            width: 146rpx;
            height: 52rpx;
            border: 2rpx solid #d2d2d2;
            border-radius: 38rpx;

            .vocebntex {
                font-size: 26rpx;
                font-weight: 400;
                color: #666666;
            }
        }
    }
}
</style>
