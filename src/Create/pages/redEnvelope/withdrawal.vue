<template>
    <view class="container">
        <z-paging
            ref="paging"
            v-model="dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="defaultPageSize"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'提现管理'" bg-color="#F2F3F5"></bc-page-navbar>
            </template>
            
            <view class="withdrawal">
                <view class="withdrawal_notice">
                    <view class="notice_left">
                        <view class="notice_left_title">现在余额</view>
                        <view class="notice_left_price">
                            <text style="font-size: 50rpx;">￥</text>
                            {{ (Number(cashData.reward) / 100).toFixed(2) }}
                        </view>
                    </view>

                    <view class="notice_right" @click="clickWithd">立即提现</view>
                </view>
                <view class="redEnvelope">
                    <view class="redEnvelope_left">入账中: ¥{{ (Number(cashData.transferring) / 100).toFixed(2) }}</view>
                    <view class="redEnvelope_right" @click="gotaskRecord">任务记录 ></view>
                </view>
            </view>
              <TnTabs
                :scroll="false" :bottom-shadow="false" font-size="30rpx" active-font-size="32rpx" bg-color="rgba(243, 244, 246, 1)" color="#333333" bar-color="#29C86F" active-color="#29C86F" @change="changeTabList">
                    <TnTabsItem v-for="(item, index) in list" :key="index" :title="item.name" />
              </TnTabs>
            
            <view class="menu" v-if="dataList.length">
                <view class="menu-list row i-center j-between" v-for="(item,index) in dataList" :key="index">
                    <view class="menu-list-left">
                        <view class="menu_left_title">{{ item.rewardName }}</view>
                        <view class="menu_left_time">{{ formatTime(item.utcCreated) }}</view>
                    </view>
                    <view class="menu_list_right">{{item.incomeExpense == 1 ? '+' : '-'}}{{(Number(item.reward) / 100).toFixed(2)}}元</view>
                </view>
            </view>
            <!-- 首页弹窗广告 -->
            <TnPopup v-model="homeUser" closeable mode="center"  bg-color="transparent"  :overlayOpacity="0.7" @close="homeUser = false">
                <view class="regboxs">
                    <view class="withdrawal_proup">
                        <view class="Withdrawal_title">提现至微信</view>
                        <view class="Withdrawal_desc">金额提现需要扣除{{cashData.commission}}%手续费</view>
                    </view>
                    <view class="withdrawal_proup_content">
                        <view
                            class="withdrawal_proup_row"
                            :class="{ 'withdrawalActive': withdIndex == index }"
                            v-for="(item,index) in cashData.cashList"
                            :key="index"
                            @click="changewithdIndex(index)"
                        >
                        <!-- changewithdIndex(index) -->
                            <view class="withdrawal_proup_price" :class="{ 'withdrawalActive': withdIndex == index }">
                                <text>￥</text>
                                {{(Number(item.cash) / 100).toFixed(2)}}
                            </view>
                            <view
                                class="withdrawal_proup_desc"
                                :class="{ 'withdrawalActive': withdIndex == index }"
                                v-if="false"
                            >实际到账{{((Number(item.cash) * 80) / 10000).toFixed(2)}}元</view>
                        </view>
                        <view class="withdrawal_proup_but" @click="submit">提现</view>
                    </view>
                    <view class="withdrawal_proup_text">微信绑定手机号需与保椿生活绑定手机号一致，显示未绑定微信，请解绑后重试，可退出登录选择【微信登录】保证一致，现金72小时内打款至微信。</view>
                </view>
            </TnPopup>
            <BCNotify ref="bcNotify"></BCNotify>
            
            <!-- <TnPopup v-model="show">
                <view class="popup_box">
                    <view class="content_text">
                        是否前往小程序完成提现操作
                    </view>
                    <view class="bottom_box">
                        <view class="cancel_btn"  @click="show = false">取消</view>
                        <view class="confirm_btn" @click="confirm">确认</view>
                    </view>
                </view>

            </TnPopup> -->
           
        </z-paging>
        <ReflectPopup ref="reflectPopup" @startReflect="startReflect" @startFacial="startFacial"></ReflectPopup>

    </view>
</template>

<script lang='ts' setup>
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import BCNotify from '@/components/notify/index.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { getAssetsPic } from '@/common/setPicture'
import { recordList, rewardTransfer, rewardCash } from '@/api/user-api'
import { ref, reactive,computed,defineProps } from 'vue'; // Import ref and reactive from Vue 3 Composition API
import dayjs from 'dayjs';
import { gotoTaskRecord } from '@/routes/user-routes'
import { onShow,onLoad } from '@dcloudio/uni-app'
import ReflectPopup from './components/reflect-popup.vue'
import { homePage, initFaceVerifyIdPlus, certificateByCertifyId } from '@/api/create-api'
import { getWechatOpenid } from '@/api/open-api'
import { callApiLocal } from "@/utils/client"


const list = ref([
    { name: '全部', id: '' },
    { name: '支出', id: 2 },
    { name: '收入', id: 1 }
]);
const bcNotify = ref()
const reflectPopup = ref()

const paging = ref() as any
const cashData = ref<any>({});
const withdIndex = ref<number>(0);
const dataList = ref([]);
const incomeExpense = ref<number|string>('');
const show = ref(false);
const defaultPageSize = 10;
const rewardId = ref();
const homeUser = ref(false);
const getClient = ref('')

// Computed properties
// 计算属性
const getAssetsUrl = computed(() => {
    return (str:any) => {
        return getAssetsPic(str);
    };
});
const formatTime = (number:number) => {
    return dayjs(number * 1000).format('YYYY-MM-DD HH:mm');
};

// Lifecycle hook: onLoad
onLoad((options:any) => {

    // #ifdef MP-WEIXIN
    getClient.value = 'WEIXIN'
    // #endif

    // #ifdef APP-PLUS
    getClient.value = 'APP'
    // #endif

    rewardId.value = options.activityId;
    initReward(rewardId.value);
});

// 立即提现
const clickWithd = () => {

    homePage({}).then((res: any) => {
        if (!res.cardId) {
            if (getClient.value == 'WEIXIN') {
                bcNotify.value.show('因技术升级原因,请您前往保椿生活APP进行实名认证')
                return
            }
            else if (getClient.value == 'APP') {
                // #ifdef APP-VUE
                const n = uni.requireNativePlugin('AP-FaceDetectModule')

                const platform = uni.getSystemInfoSync().platform

                let metaInfo = n.getMetaInfo()
                if (platform == 'ios') {
                    metaInfo=JSON.stringify(metaInfo)
                }
                console.log('metaInfo',metaInfo)
                initFaceVerifyIdPlus({ metaInfo }).then((res: any) => {
                    // this.certifyId = res.certifyId
                    n.verify({ certifyId: res.certifyId}, (v: any) => {
                        if(v.code == 1000) {
                            console.log('人脸识别成功。。。请求接口',res.certifyId)
                            certificateByCertifyId({
                                certifyId: res.certifyId
                            }).then((res: any) => {
                                // initSubmit()
                                homeUser.value = true;
                                console.log('实名认证提交成功',res)
                                bcNotify.value.show(getResultString(v.code))
                            }).catch((err: any) => {
                                console.log('实名认证提交失败',err)
                                bcNotify.value.error(getResultString(v.code))
                            })
                            return
                        }
                        bcNotify.value.error(getResultString(v.code))
                    })
                }).finally(() => {
                    bcNotify.value.show('正在调起人脸识别')
                }).catch(() => {
                    bcNotify.value.error('人脸识别调用失败')
                })
                // #endif
            }
        }else {
            reflectPopup.value.open(1);
        }
    })


    // #ifdef APP-PLUS
    // #endif

    // #ifdef MP-WEIXIN
    // #endif
};

// const confirm = () => {
//     plus.share.getServices((res:any) => {
//         let sweixin = null;
//         for (const i in res) {
//             if (res[i].id == 'weixin') {
//                 sweixin = res[i];
//             }
//         }
//         // 唤醒微信小程序
//         if (sweixin) {
//             uni.hideLoading();
//             // show.value = false;
//             sweixin.launchMiniProgram({
//                 id: 'gh_fd20b530cb94', // 小程序的原始ID
//                 type: 1, // 小程序版本
//                 path: '/Create/pages/redEnvelope/withdrawal' // 小程序的页面路径
//             });
//         }
//     });
// };

const submit = () => {
    console.log('提现',cashData.value);

    if (!cashData.value.cashList[withdIndex.value]?.cash) {
        homeUser.value = false;

        bcNotify.value.error('请选择提现金额');
        return;
    }

    // #ifdef APP-PLUS
    uni.login({
        onlyAuthorize: true,
        provider: 'weixin',
        success: (res) => {
            console.log('reslogin',res);
            
            if (res.code) { //微信登录成功 已拿到code
                getWechatOpenid({
                    code: res.code
                }).then((res1) => {
                    uni.setStorageSync('openid', res1)
                    weixinInitSubmit()
                })
            }
        },
        fail:(err:any) => {
            console.log('err',err);
            
        }
    })
    // #endif

    // #ifdef MP-WEIXIN
    weixinInitSubmit();
    // #endif
};

// 任务记录
const gotaskRecord =() =>{
    gotoTaskRecord({rewardId:rewardId.value})
}

const weixinInitSubmit = () => {
    const openid = uni.getStorageSync('openid');
    rewardTransfer({
        openid,
        rewardId:rewardId.value,
        cash: Number(cashData.value.cashList[withdIndex.value]?.cash)
    }).then((res:any) => {
        console.log('res',res);
        
        homeUser.value = false;
        if (!res) {
            bcNotify.value.success('提现中...')            
        }else{
            bcNotify.value.success('提现成功')            
        }
        initReward(rewardId.value);
        queryList(1, 10);
    }).catch((error) => {
        homeUser.value = false;

        bcNotify.value.error(error.message)
    });
};

const changewithdIndex = (index:number) => {
    withdIndex.value = index
}

const initReward = (id:any) => {
    rewardCash({ id }).then((res) => {
        cashData.value = res;
        console.log(cashData.value)
    });
};



const changeTabList = (e:any) => {
    incomeExpense.value = e==1?2:e==2?1:0;
    console.log(incomeExpense.value,e)
    queryList(1, 10);
};

const queryList = (pageNumber:number, pageSize:number) => {
    recordList({
        query: {
            rewardId:rewardId.value,
            incomeExpense: incomeExpense.value
        },
        pageNumber,
        pageSize
    }).then((res) => {
        (paging.value as any).complete(res.data)
    }).catch(() => {
        (paging.value as any).complete(false)
    });
};

const startReflect = () => {
    homeUser.value = true;
    reflectPopup.value.close();
    // initSubmit()
}

const initSubmit = () => {
    // #ifdef APP-PLUS
        uni.login({
            onlyAuthorize: true,
            provider: 'weixin',
            success: (res) => {
                if (res.code) { //微信登录成功 已拿到code
                    getWechatOpenid({
                        code: res.code
                    }).then((res1) => {
                        uni.setStorageSync('openid', res1)
                        weixinInitSubmit()
                    })
                }
            }
        })
    // #endif

    // #ifdef MP-WEIXIN
    weixinInitSubmit()
    // #endif
}

// 活体检测
const startFacial = () => {
    callApiLocal().then(() => {
        reflectPopup.value.open(2)
    }).catch(() => {
        reflectPopup.value.open(3)
    })
}


</script>

<style lang="scss" scoped>
.withdrawalActive {
    background: #29c86f !important;
    color: #ffffff !important;
}
.regboxs {
    width: 650rpx;
    background: #ffffff;
    border-radius: 40rpx !important;
    .withdrawal_proup_text {
        font-size: 24rpx;
        color: #666666;
        display: flex;
        justify-content: center;
        line-height: 44rpx;
        padding: 0 32rpx 50rpx 32rpx;
    }
    .withdrawal_proup_content {
        padding: 40rpx 24rpx;
        display: flex;
        flex-wrap: wrap;
        .withdrawal_proup_row {
            width: 187rpx;
            height: 136rpx;
            margin-bottom: 12rpx;
            background: #f6f7fa;
            border-radius: 12rpx;
            color: #888888;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-left: 12rpx;
            .withdrawal_proup_price {
                font-size: 48rpx;
                color: #333333;
                padding-bottom: 10rpx;
                text {
                    font-size: 30rpx;
                }
            }
            .withdrawal_proup_desc {
                font-size: 20rpx;
                color: #888888;
            }
        }
        .withdrawal_proup_but {
            width: 570rpx;
            height: 90rpx;
            margin: 0rpx auto;
            margin-top: 40rpx;
            background: #29c86f;
            display: flex;
            font-size: 32rpx;
            color: #ffffff;
            justify-content: center;
            align-items: center;
            border-radius: 46rpx;
        }
    }
    .withdrawal_proup {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 24rpx;
        color: #999999;
        .Withdrawal_title {
            font-size: 36rpx;
            font-weight: 600;
            margin-top: 26rpx;
            margin-bottom: 20rpx;
            color: #333333;
        }
    }
}
::v-deep .u-tabs__wrapper__nav__line {
    background: none !important;
}
::v-deep .u-popup__content {
    border-radius: 40rpx !important;
}
.menu {
    background-color: #ffffff;
    margin: 24rpx 16rpx;
    border-radius: 24rpx;
    padding-top: 20rpx;
    &-list {
        padding: 24rpx 36rpx;
        border-bottom: 2rpx solid #f2f2f2;
        &-left {
            display: flex;
            flex-direction: column;
            .menu_left_title {
                font-size: 30rpx;
                padding-top: 8tpx;
                color: #333333;
            }
            .menu_left_time {
                font-size: 24rpx;
                color: #999999;
                padding-top: 8rpx;
            }
        }
        .menu_list_right {
            font-size: 30rpx;
            color: #29c86f;
        }
    }
}
.withdrawal {
    height: 280rpx;
    margin: 20rpx;
    background: linear-gradient(47deg, #3dd681 0%, #29c86f 100%);
    border-radius: 24rpx;
    padding: 0 40rpx;
    .redEnvelope {
        height: 88rpx;
        font-size: 28rpx;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 2rpx solid rgba(255, 255, 255, 0.3);
    }
    .withdrawal_notice {
        display: flex;
        padding: 30rpx 0 20rpx 0;
        justify-content: space-between;
        align-items: center;
        .notice_left {
            color: #ffffff;
            display: flex;
            padding-top: 24rpx;
            flex-direction: column;
            .notice_left_title {
                font-size: 28rpx;
            }
            .notice_left_price {
                font-size: 60rpx;
            }
        }
        .notice_right {
            background: #ffffff;
            font-size: 24rpx;
            color: #29c86f;
            width: 160rpx;
            display: flex;
            justify-content: center;
            align-content: center;
            height: 58rpx;
            line-height: 58rpx;
            // padding: 12rpx 32rpx;
            border-radius: 30rpx;
        }
    }
}
.popup_box{
    width: 500rpx;
    padding: 50rpx 0rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .content_text{
        display: flex;
        text-align: center;
        margin-bottom: 40rpx;
    }
    .bottom_box{
        width: 100%;
        border-top: 2rpx solid #F0F0F0;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        .cancel_btn{
            text-align: center;
            height: 96rpx;
            line-height: 96rpx;
            border-right: 2rpx solid #F0F0F0;
            box-sizing: border-box;
            color: #333333;
            font-weight: 400;
            font-size: 28rpx;
            width: 50%;
        }
        .confirm_btn{
            text-align: center;
            height: 96rpx;
            line-height: 96rpx;
            font-size: 28rpx;
            color: #EA3E1A;
            font-weight: 400;
            width: 50%;

        }
    }
}
</style>
