<template>
    <view class="container">
        <bc-page-navbar :title="'消息设置'"></bc-page-navbar>
        <view class="tainerbox page-public-bg">
            <view class="consumebox">
                <view class="consumetop row i-center j-between">
                    <view class="cons-mobile">{{ data.accountInfo.mobile || '--' }}</view>
                    <view class="cons-more row i-center j-center" @click="linkNoticeRecord">
                        <text>通知记录</text>
                        <TnIcon name="right" color="#333333" size="28"></TnIcon>
                    </view>
                </view>
                <view class="cons-info row i-center j-between">
                    <view class="cons-amount">
                        <view class="cons-num">{{ data.accountInfo.notifyNum || '--' }}
                            <text>次</text>
                        </view>
                        <view class="cons-balan">通知次数余额</view>
                    </view>
                    <view class="cons-btn">
                        <TnButton width="90%" @click="gotopay" height="70" text-color="#d1a257" font-size="32rpx"
                                  bg-color="#FFEEDD" border-color="#D1A257" :plain="true">去充值
                        </TnButton>
                    </view>
                </view>
                <view class="cons-tips row i-center j-between">
                    <!-- <view class="cons-tip-tex">电话通知每次每人消耗3次</view> -->
                    <view class="cons-tip-tex">通知消耗：电话（3），短信（1）</view>
                    <view class="cons-tip-reco" @click="linkExpendList">消费记录</view>
                </view>
            </view>
            <!-- 设备列表 -->
            <block v-for="(item, index) in deviceList" :key="index">
                <view class="devili">
                    <view class="devitit">{{ item.deviceTypeName }}</view>
                    <view class="devisetli row i-center j-between" v-for="(ele, elx) in item.children" :key="elx">
                        <view class="deviname">{{ ele.typeName }}</view>
                        <view>
                            <TnSwitch size="20" inactiveColor="#DBDBDB" activeColor="#29C86F" v-model="ele.active"
                                      @change="change(ele)"></TnSwitch>
                        </view>
                    </view>
                </view>
            </block>
        </view>
        <view class="tainerfot">
            <view class="fotbox">
                <view class="fotbtn">
                    <TnButton width="100%" @click="linkNoticeStaff" height="90" text-color="#fff" font-size="32rpx"
                              bg-color="#29c86f" border-color="#29c86f">通知人员设置
                    </TnButton>
                </view>
                <u-safe-bottom></u-safe-bottom>
            </view>
            <view class="botseat">
                <u-safe-bottom></u-safe-bottom>
            </view>
        </view>

        <TnPopup width="98%" v-model="data.goodsShow" round="20">
            <view class="godbox" @touchmove.stop.prevent="() => { }">
                <view class="godtit">充值中心</view>
                <view class="godcls" @click="data.goodsShow = false">
                    <u-icon name="close" color="#333333" size="22"></u-icon>
                </view>
                <scroll-view class="godroll" scroll-y>
                    <view class="godsku">
                        <block v-for="(item, index) in data.goodsInfo.options" :key="index">
                            <view class="godkuli column i-center j-center" @click="data.current = index"
                                  :class="{ activ: index === data.current }">
                                <view class="godnum">{{ item.name }}</view>
                                <view class="godmon">￥{{ moneyFilter(item.price) }}</view>
                            </view>
                        </block>
                    </view>
                </scroll-view>
                <view class="godsay">
                    <view>充值说明：</view>
                    <view>1. 本次充值仅限于平台使用，充值成后无法退款、不能提现；</view>
                    <view>2. 若遇到充值未到账，请联系客服。</view>
                </view>
                <view class="godbtn">
                    <TnButton width="100%" height="90" text-color="#fff" font-size="32rpx" bg-color="#29c86f"
                              border-color="#E3E3E3" @click="gotoBalance">确认充值
                    </TnButton>
                </view>
            </view>
        </TnPopup>
    </view>
</template>

<script lang="ts" setup>
import { moneyFilter } from '@/common/filters'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { gotoExpendList, gotoNoticeRecord, gotoNoticeStaff } from "@/routes/active-routes"
import { getAccountInfo, getConfig, setConfig } from "@/api/room-api"
import { smartNotifyPackage, smartOrderCreate, smartPlatformPay } from '@/api/goods-api'
// import { packPayment } from "@/libs/pay/pay-tools"
// import { gotoMallBalance, gotoPaySuccess } from '@/route/goods-routes'
import { onLoad, onShow } from "@dcloudio/uni-app"
// import { TempStorage } from '@/libs/temp-storage'
import { reactive, ref } from "vue"

interface Data {
    accountInfo: any,
    goodsShow: boolean,
    current: number,
    goodsInfo: any
}

const data = reactive<Data>({
    accountInfo: {},
    goodsShow: false,
    current: 0,
    goodsInfo: {}
})

const deviceList = ref([])
onLoad(() => {
    getssConfig()
    getGoodsInfo()
})
onShow(() => {
    getAccount()
})
// 跳转下单结算页面
const gotoBalance = () => {
    smartOrderCreate(data.goodsInfo.options[data.current].id).then((res: any) => {
        console.log("创建订单成功")
        return smartPlatformPay({
            orderId: res,
            // #ifdef MP-WEIXIN
            openid: uni.getStorageSync('openid')
            // #endif
        })
    }).then((pay: any) => {
        console.log("支付成功", JSON.stringify(pay))
        data.goodsShow = false
        return packPayment(pay.payParams, true)
    }).then(() => {
        uni.$u.toast("支付成功，请前往消费记录查看")
        getAccountInfo()
    }).catch((err: any) => {

        data.goodsShow = false
        console.log(err)
        uni.$u.toast("支付失败")
    })
}
// 获取充值数据
const getGoodsInfo = () => {
    smartNotifyPackage('1').then((res: any) => {
        data.goodsInfo = res
    }).catch((err: any) => {
        console.log(err)
    })
}
// 充值
const gotopay = () => {
    if (!data.goodsInfo.id) {
        return uni.showToast({
            title: '获取数据失败',
            icon: 'none'
        })
    }
    data.goodsShow = true
}
// 通知设置配置
const change = (e: any) => {
    const list: any = []
    deviceList.value.forEach((x: any) => {
        list.push(...x.children.map((n: any) => ({
            type: n.type,
            status: n.active ? 1 : 0
        })))
    })
    setConfig({ list }).then().catch(err => {
        console.log(err)
        e.active = !e.active
    })
}
// 通知记录
const linkNoticeRecord = () => {
    gotoNoticeRecord()
}
// 通知人员设置
const linkNoticeStaff = () => {
    gotoNoticeStaff()
}
// 消费记录
const linkExpendList = () => {
    gotoExpendList()
}

// 通知配置
const getssConfig = () => {
    getConfig().then(res => {
        // 用于存储以type为键的聚合数据
        const map = {}

        // 遍历原始数据
        res.forEach((item: any) => {
            // 如果type键不存在于map中，则创建一个新的条目
            if (!map[item.type]) {
                map[item.type] = {
                    ...item,
                    children: []
                }
            }
            // 将当前项添加到children数组中
            map[item.type].children.push({ ...item, active: !!item.status })
        })
        // 生成新的数据数组
        deviceList.value = Object.values(map)
    })
}

// 通知账户信息
const getAccount = () => {
    getAccountInfo().then(res => {
        data.accountInfo = res
        console.log(res)
    })
}
// computed: {
//     ...mapState("about", ["pubMesage", "userinfo"])
// },

</script>

<style lang="scss" scoped>
.tainerbox {
    padding: 20rpx 30rpx;

    .consumebox {
        background: linear-gradient(90deg, #FFF6ED 0%, #FEEDDB 100%);
        box-shadow: 0rpx 8rpx 16rpx 2rpx rgba(209, 162, 87, 0.2);
        border-radius: 24rpx;
        padding: 32rpx 32rpx 0;
        position: relative;

        &::after {
            content: '';
            display: block;
            height: 96rpx;
            margin-top: 40rpx;
        }

        .consumetop {
            .cons-mobile {
                font-weight: 400;
                font-size: 32rpx;
                color: #333333;
            }

            .cons-more {
                text {
                    font-weight: 400;
                    font-size: 28rpx;
                    color: #333333;
                    margin-right: 4rpx;
                }
            }
        }

        .cons-info {
            padding: 24rpx 8rpx 0;

            .cons-amount {
                .cons-num {
                    font-weight: bold;
                    font-size: 64rpx;
                    color: #333333;

                    text {
                        font-weight: 400;
                        font-size: 28rpx;
                        color: #333333;
                        margin-left: 12rpx;
                    }
                }

                .cons-balan {
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #333333;
                }
            }

            .cons-btn {
                width: 164rpx;
                display: flex;
                justify-content: flex-end;

                :deep(.tn-button--plain) {
                    border-radius: 100rpx !important;
                }
            }
        }

        .cons-tips {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 96rpx;
            background: #FEEDDB;
            border-radius: 0rpx 0rpx 24rpx 24rpx;
            padding: 0 32rpx;

            .cons-tip-tex {
                font-weight: 400;
                font-size: 24rpx;
                color: #333333;
            }

            .cons-tip-reco {
                font-weight: 400;
                font-size: 26rpx;
                color: #3E92FF;
            }
        }
    }


    .devili {
        margin-top: 40rpx;

        .devitit {
            font-weight: bold;
            font-size: 32rpx;
            color: #1A1A1A;
            margin-bottom: 30rpx;
        }

        .devisetli {
            height: 128rpx;
            background: #FFFFFF;
            border-radius: 24rpx;
            margin-bottom: 20rpx;
            padding: 0 30rpx;

            .deviname {
                font-weight: bold;
                font-size: 30rpx;
                color: #333333;
            }
        }
    }
}

.tainerfot {
    .fotbox {
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
        background-color: #FFFFFF;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;

        .fotbtn {
            box-sizing: border-box;
            height: 132rpx;
            padding: 20rpx 30rpx;
            display: flex;
            justify-content: center;

            :deep(.tn-button) {
                border-radius: 100rpx;
            }
        }
    }

    .botseat {
        opacity: 0;

        &::after {
            content: "";
            display: block;
            height: 132rpx;
        }
    }
}

.godbox {
    padding: 40rpx;
    position: relative;

    .godtit {
        font-weight: bold;
        font-size: 36rpx;
        color: #333333;
    }

    .godcls {
        position: absolute;
        right: 40rpx;
        top: 40rpx;
        z-index: 30;
    }

    .godroll {
        max-height: 400rpx;
        padding: 40rpx 0;
    }

    .godsku {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30rpx;

        .godkuli {
            width: 190rpx;
            height: 140rpx;
            background-color: #F6F7FA;
            border-radius: 12rpx;
            color: #808080;

            &.activ {
                background-color: #29C86F;
                color: #FFFFFF;
            }

            .godnum {
                font-weight: bold;
                font-size: 36rpx;
            }

            .godmon {
                margin-top: 4rpx;
                font-weight: bold;
                font-size: 28rpx;
            }
        }
    }

    .godsay {
        padding: 0 8rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        line-height: 44rpx;
    }

    .godbtn {
        margin-top: 258rpx;
    }
}
</style>
