<template>
    <view class="container" @click="showFlag = false">
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
                <bc-page-navbar :title="'签到领取红包'" bg-color="#F2F3F5">
                    <template #back>
                        <view @click="goback">
                            <TnIcon name="left" color="#333333" size="38" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>
            </template>
        <!-- <view class="conbg"></view> -->
        <view class="register">
              <view class="register_top" @click.stop="showFlag = true">
                <view class="register_envelope">
                    <!-- <image class="register_top_img" src="/static/emvelope_icon.svg" mode="scaleToFill" /> -->
                    <view class="register_top_title" @click.stop="gotoPAge(0)">活动规则</view>
                </view>
                <!-- <image class="register_top_right" src="/static/emvelope_add.svg" mode="scaleToFill" /> -->
            </view>
            <image src="https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_test/life/care/service/thumb/202463143012914.png" class="register_Sign" mode="scaleToFill" />
            <view class="sign_Withdrawal" >
                <view class="Withdrawal_price"><text>￥</text>{{ rewardObj.money ? (Number(rewardObj.money) / 100).toFixed(2) : '0' }}</view>
                <view class="Withdrawal_right" @click="goWithdrawal">
                    <image :src="getAssetsUrl('/leyou/static/weChat.svg')" class="Withdrawal_right_img"></image>
                    <view class="withdrawal_right_title">去提现</view>
                    <image src="/static/chat_right.svg" class="Withdrawal_right_icon"></image>
                </view>
            </view>
        </view>
        <view class="redEnvelope">
            <view class="redEnvelope_reg">
                <scroll-view class="redEnvelope_reg_content" :scroll-x="true"  scroll-with-animation >
                    <block v-for="(item,index) in rewardObj.advanceList" :key="index">
                         <view class="reg_unseal"  v-if="item.isGet == 1">
                            <view class="reg_unseal_title">已开启</view>
                        </view>
                       <view class="reg_random" @click="toEnvelope(item)" v-else>
                            <view class="reg_unseal_title">{{ item.name }}</view>
                            <view class="reg_unseal_desc" :style="item.isGet == 2 ? 'opacity: 0.6;' : ''">{{ item.isGet == 2 ? '待获得' : '已获得'}}</view>
                       </view>
                    </block>
				        </scroll-view>
                <button
                v-if="rewardObj.canInvite"
                    open-type="share"
                    class="redEnvelope_but"
                    type="default"
                    @click="gotake"
                >
                {{ rewardObj.infoMsg || '' }}
                </button>
                   <button
                   v-else

                    class="redEnvelope_but"
                    type="default"

                >
                {{ rewardObj.infoMsg || '' }}
                </button>
                <view class="redEnvelope_state">本日邀请人数 ({{rewardObj.inviteCnt || 0}}/{{ rewardObj.inviteLimit || '' }})</view>
            </view>
            <view class="line-press">
                <view class="line-press-title">连续签到{{rewardObj.dayTransfer || 1}}天 得微信提现特权</view>
            <luo-line-press :queryData="obj" :lvFlex="rewardObj.dayTransfer == 0 ? 1 : rewardObj.dayTransfer"  :actBgColor="'linear-gradient(180deg, #FD9582 0%, #FB474C 100%)'"></luo-line-press>
            </view>
            <view class="registerTask">
                     <view class="registerTask_title"> 做任务得现金</view>
                     <view class="registerTask_row" v-for="(item,index) in rewardObj.taskList" :key="index">
                        <view class="registerTask_row_left">
                            <image class="registerTask_successp_img" :src="item.icon" mode="scaleToFill" />
                            <view class="registerTask_success">
                                <view class="registerTask_success_title">{{ item.name }}</view>
                                <view class="registerTask_success_desc">{{item.desc}}</view>
                            </view>
                        </view>
                        <view :style="item.isGet == 2 ? 'background: #FFEDE8;color: #FB4140;' : item.isGet == 3 ? 'background: #EBEBEB;color: #7B7B7B;' : item.isGet == 0 ? 'background: linear-gradient(90deg, #FFE3C0 0%, #FFD48B 100%);color: #AC5300;' : ''" class="registerTask_row_right" @click="goComplete(item)">{{ item.isGet == 2 ? '去完成' : item.isGet == 3 ? '已结束' : item.isGet == 1 ? '已完成' : '领取' }}</view>
                     </view>
            </view>

        </view>
    <!-- 新人领取优惠券弹窗 -->
      <!-- <TnOverlay v-model:show="showOverlay" :duration="250" :opacity="0.4" /> -->
	<TnOverlay v-if="packerState != 3 && homeUser" v-model:show="homeUser"  mode="center" bgColor="transparent" >
    <view class="regbox">
    <block v-if="packerState != 3">
		<view class="packer-box flex-column">
			<view class="packer-bg anim-ease-in" :class="{ 'anim-fade-out': packerState == 2 }"></view>
			<view class="packer-bottom-box anim-ease-in" :class="{ 'anim-out-bottom': packerState == 2 }">
				<view class="arc-bottom-edge"></view>
				<view class="packer-bottom-bg"></view>
			</view>
			<view class="packer-top-box anim-ease-in" :class="{ 'anim-out-top': packerState == 2 }">
				<view class="flex-row sender-info">
				</view>
				<view class="packer-greeting double-text">{{'任务奖励'}}</view>
				<view class="arc-edge"></view>
				<view v-if="packerState == 1" class="anim-rotate packer-btn-pos">
					<view class="packer-btn" style="transform: translateZ(-4px);">開</view>
					<view class="packer-btn-middle" v-for="(item, index) in 7" :key="index" :style="{ transform: `translateZ(${index - 3}px)` }"></view>
					<view class="packer-btn packer-btn-front">開</view>
				</view>
				<view v-else class="packer-btn packer-btn-pos" @click="openPacker">開</view>
			</view>
		</view>
    </block>
        <view class="regclos"  v-if="packerState != 3"  @click="homeUser = false">
			   	<TnIcon name="close-circle" color="#FFFFFF" size="68rpx" ></TnIcon>
	    </view>

	    </view>
    </TnOverlay>
    <TnPopup  v-if="packerState == 3"  v-model="registerUser"  mode="center" bgColor="transparent">
         <block v-if="packerState == 3">
                <view class="accepted">
                <view class="register_accepted">
                    <view class="register_accepted_content">
                        <view class="accepted_content_price">{{(Number(taskItem.reward) / 100).toFixed(2)}}<text>元</text></view>
                        <view class="accepted_content_deposit">已存入签到账号</view>
                        <view class="accepted_content_withdrawal">
                            <image
                                class="withdrawal_image"
                                :src="getAssetsUrl('/leyou/static/weChat.svg')"
                                mode="scaleToFill"
                            />
                            <view>可提现至微信</view>
                        </view>
                    </view>
                      <div class="accepted_register_row" @click="registerUser = false,packerState = 0">
                        <image
                                class="accepted_register_image"
                                :src="getAssetsUrl('/leyou/static/accepted.svg')"
                                mode="scaleToFill"
                            />
                    </div>
                </view>
          <!-- <view class="register_participate">
                      <view style="display: flex;justify-content: center;">
                        <view class="accepted_content_deposit">本日参与人数已达到上限，明天早点来哟~</view>
                      </view>
                    <div class="accepted_register_row">
                        <image
                                class="accepted_register_image"
                                src="/static/fare/accepted.svg"
                                mode="scaleToFill"
                            />
                    </div>
                </view> -->
           </view>
            <view class="regcloscle" @click="homeUser = false,packerState = 0">
				     	<TnIcon name="close-circle" color="#FFFFFF" size="68rpx" ></TnIcon>
	         </view>
         </block>
    </TnPopup>
          <BCNotify ref="bcNotify"></BCNotify>
            <view class="recommend">
                <view class="recommend-title">
                    <view>
                        为您推荐
                    </view>
                </view>
                <!-- 瀑布流 -->
                <view class="outserve">
                    <WaterfallsFlow :wfList="dataList" @waterItem="clickwaterItem"></WaterfallsFlow>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { gotoauthor } from '@/routes/create-routes'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnOverlay from '@tuniao/tnui-vue3-uniapp/components/overlay/src/overlay.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { onShow, onLoad, onShareAppMessage } from '@dcloudio/uni-app'
import { gotoChannel, gotouparticle } from '@/routes/create-routes'
import BCNotify from '@/components/notify/index.vue'
import { gotoctivityRules, gotoWithdrawall, gotoSignWithdrawal } from "@/routes/user-routes"

import { gotoIndex, gotoLogin } from "@/routes/public-routes"
import { recommendList } from '@/api/goods-api'
import { getAssetsPic } from '@/common/setPicture'
import { gotoCommentList } from '@/routes/user-routes'
import WaterfallsFlow from './components/WaterfallsFlow.vue'
import { PlatformManage } from '@bc/sys'
import { gotogoodsDetail } from '@/routes/goods-routes'
import { gotoServiceStore, gotoShopDetail } from '@/routes/service-routes'
import luoLinePress from '@/components/luo-linePress/luo-linePress'
import { rewardExist, rewardInfo, rewardAdvance, rewardTask, rewardtoTask, happyUnfollowed } from '@/api/user-api'
import { Upcontent, gotoNewUpcontentPage } from '@/routes/create-routes'

import {
    ref,
    reactive,
    onMounted,
    onUnmounted,
    watch,
    computed
} from 'vue' // 引入Vue 3的Composition API
const bcNotify = ref()
const paging = ref() as any
// 响应式数据
const registerUser = ref()
const showFlag = ref(false)
const dataList = ref([])
const packerState = ref<number>(1)
const homeUser = ref(false)
const rewardObj = reactive<any>({})
const loadPage = ref(1)
let activityId:string|null = null
const taskItem = reactive<any>({})
const defaultPageSize = ref(10)
const inviteId = ref<string|null>('')
const obj = reactive<any>({
    lv: 1,
    lvNum: 6,
    lvNowNum: 1
})
const unseal = ref(false)
// 计算属性
const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})
// 生命周期钩子
onLoad((option:any) => {
    PlatformManage.isRequireLogin().then((needlogin:any) => {
        if (needlogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
    })
    inviteId.value = option.id // 通过props获取id
})

onShow(() => {
    rewardExist({ platformType: 2 }).then((res:any) => {
        activityId = res
        initGetInfo(res, inviteId.value)
    })

})

const toEnvelope = (item:any) => {
    if (item.isGet == 2) {
        bcNotify.value.show('还未获得，获得红包可开启')
    }
    homeUser.value = item.isGet == 0
    packerState.value = 0
    Object.assign(taskItem, item)
}
// 转发到私信
onShareAppMessage(():any => {
    return {
        title: '签到抢红包',
        path: `/pagesCnt/pages/redEnvelope/register?id=${rewardObj.advanceId}`,
        imageUrl: getAssetsUrl.value('/share/register_share.png'),
        content: '签到抢红包',
        success: (res:any) => {
            console.info(res)
        }
    }
})
const clickwaterItem = (item:any) => {
    console.log('item', item)
    item.businessType == 2 && gotogoodsDetail(item.id)
    item.businessType == 3 && gotoServiceStore({ shopId: item.id, isAd: 0 })
}



// 方法
const gotoPAge = (index:number) => {
    if (index === 0) {
        gotoctivityRules({ ruleDesc: rewardObj.ruleDesc })
    }
}

const goback = () => {
    const pages = getCurrentPages()
    if (pages.length == 1) {
        gotoIndex()
        return
    }

    uni.navigateBack()
}

const goWithdrawal = () => {
    if (!rewardObj) {
        bcNotify.value.error('请稍后重试!')
        return
    }
    if (rewardObj.dayTransfer > rewardObj.consecutiveDays) {
        bcNotify.value.error(`连续签到${rewardObj.dayTransfer || ''}天 得微信提现特权`)
        return
    }
    //   gotoWithdrawall({activityId});
    gotoSignWithdrawal()
}

const goComplete = (item:any) => {
    if (item.isGet == 1 || item.isGet == 3) {
        return
    }
    if (item.isGet == 0) {
        rewardTask({ id: item.id }).then(res => {
            bcNotify.value.success('领取成功')
            initGetInfo(activityId, inviteId.value)
        }).catch(err => {
            bcNotify.value.error(err.message)
            initGetInfo(activityId, inviteId.value)
        })
        return
    }

    if (item.taskId == 6) {
        // #ifdef APP-PLUS || H5
        Upcontent({ taskId: item.taskId })
        // #endif

        // #ifdef MP-WEIXIN
        gotoNewUpcontentPage({ taskId: item.taskId })
        // #endif

    }
    else if (item.taskId == 9) {
        happyUnfollowed().then((res) => {
            gotoauthor({
                taskId: item.taskId,
                accountId: res
            })
        })
    }
    else if (item.taskId == 7 || item.taskId == 8) {
        rewardtoTask({ taskId: item.taskId, platformType: 2 }).then(res => {
            gotoChannel()
        })
    }
    uni.navigateTo({
        url: item.url
    })
}

const initGetInfo = (rewardId:string|null, invId:any) => {
    rewardInfo({ rewardId, inviteId: invId }).then((info:any) => {
        console.log('info1', info)

        if (!info) {
            return
        }

        if (info.taskList.length != 0) {
            info.taskList[0].icon = getAssetsUrl.value('/leyou/static/upChannel_task.png')
            info.taskList[1].icon = getAssetsUrl.value('/leyou/static/preview_task.png')
            info.taskList[2].icon = getAssetsUrl.value('/leyou/static/curriculum_task.png')
            info.taskList[3].icon = getAssetsUrl.value('/leyou/static/follow_task.png')
        }


        console.log('info2', info)




        inviteId.value = null
        Object.assign(rewardObj, info) // 更新响应式对象的值
        obj.lv = info.consecutiveDays ? info.consecutiveDays : 1
        obj.lvNum = info.dayTransfer || 1
        obj.dayTransfer = info.dayTransfer || 1
        obj.lvNowNum = info.consecutiveDays ? info.consecutiveDays : 1
        //  if(info.inviteMsg){
        //     bcNotify.value.show(info.inviteMsg);
        //   }
        if (info.isSignIn == 0) {
            registerUser.value = true
            packerState.value = 3
            taskItem.reward = info.signInReward
        }
    }).catch(error => {
        bcNotify.value.error(error.message)
    })
}

const queryList = (pageNumber:number, pageSize = 10) => {
    if (pageNumber === 1) {
        loadPage.value = 1
    }
    recommendList({
        pageSize,
        pageNumber,
        query: {
            categoryIds: null,
            lat: null,
            lng: null,
            businessTypeIds: [2, 3],
            sortType: 7

        }
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    })

}

const gotake = (scene = 'WXSceneSession') => {
    if (!rewardObj.advanceId) {
        bcNotify.value.error('请稍后重试!')
        return
    }
    console.log(rewardObj.advanceId, 11)
    // #ifdef APP-PLUS || MP-WEIXIN
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: getAssetsUrl.value('/share/register_share.png'),
        title: '签到抢红包',
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/pagesCnt/pages/redEnvelope/register?id=${rewardObj.advanceId}`,
            type: shareType, //0-正式版； 1-测试版； 2-体验版。 默认值为0
            webUrl: 'http://www.baochuncare.com'//兼容低版本的网页链接
        },
        success: ret => {
            console.log(JSON.stringify(ret))
        },
        fail: err => {
            console.log(err)
        }
    })
    // #endif
}

const openPacker = () => {
    packerState.value = 1
    rewardAdvance({ id: taskItem.id }).then((res:any) => {
        packerState.value = 2
        packerState.value = 3
        registerUser.value = true
        initGetInfo(activityId, inviteId.value)
    }).catch((error:any) => {
        bcNotify.value.error(error.message)
    })

}
</script>

<style lang="scss" scoped>
::v-deep .u-navbar__content__left{
    top:30rpx !important;
}
.conbg {
    // background: linear-gradient(180deg, #dff7ef 0%, #f8f9f9 100%);
    position: relative;
    width: 750rpx;
    height: 180rpx;
}
.listBox {
	position: absolute;
	right: 20rpx;
	top: 260rpx;
	width: 260rpx;
	background-color: #fff;
	box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
	padding: 0rpx 30rpx;
	box-sizing: border-box;
	border-radius: 4px;
	.triangle-up {
		position: absolute;
		right: 30rpx;
		top: -10rpx;
		width: 0;
		height: 0;
		border-left: 20rpx solid transparent;
		border-right: 20rpx solid transparent;
		border-bottom: 20rpx solid #fff;
		// box-shadow: 0px 0px 6px rgba(0,0,0,0.08);
	}

	.itemhang {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #333333;
		font-weight: 400;
		padding: 28rpx 0rpx;
		border-bottom: 1px solid #F2F2F2;
	}

	.tabbar_item_icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}
}
.line-press{
    margin: 40rpx 0;
    .line-press-title{
        font-size: 32rpx;
        color: #983D26;
        font-weight: 500;
        padding-bottom: 32rpx;
    }
}
.recommend{
    background-color: rgba(255, 238, 217, 1);
&-title {
    font-size: 34rpx;
    font-weight: bold;
    color: #000002;
    padding-bottom: 20rpx;
    padding: 10rpx 20rpx;


}
.outserve{
    padding: 0rpx 10rpx;
    box-sizing: border-box;
}
}
/* 重置所有按钮的默认样式，确保没有默认样式干扰 */
button::after {
  border: none;
  outline: none;
  box-shadow: none;
  background: none;
  -webkit-appearance: none;
  appearance: none;
}

.regclos{
    position: absolute;
    top: 1314rpx;
    left: 50%;
    z-index: 99999;
    transform: translateX(-50%);
}
.regcloscle{
    display: flex;
    justify-content: center;
    margin-top: 20rpx;
}
.regbox{
    position: relative;
}
.register_active{
    background: #FFEDE8 !important;
    color:#ffffff !important;
}
.accepted{
    .register_participate{
            background-repeat: no-repeat;
            width:650rpx;
            height: 710rpx;
            background-size: cover; /* 背景图覆盖整个页面 */
            background-image: url('https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_test/life/care/service/thumb/2024661223389.png');
            .accepted_content_deposit{
                font-size: 20px;
                color: #FFFFFF;
                width: 425rpx;
                text-align: center;
                padding-top: 164rpx;
            }
         .accepted_register_row{
            display: flex;
            justify-content: center;
            .accepted_register_image{
            width:482rpx;
            height:112rpx;
            margin-top:232rpx;
          }
        }
    }
    .register_accepted{
            background-repeat: no-repeat;
            width:650rpx;
            height: 710rpx;
            background-size: cover; /* 背景图覆盖整个页面 */
            background-image: url('https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_test/life/care/service/thumb/202464941084.svg');
        .register_accepted_content{
            display: flex;
            flex-direction: column;
            align-items: center;
            .accepted_content_price{
                font-size: 112rpx;
                color: #FB3F3B;
                margin-top: 92rpx;

         text{
              font-size: 52rpx;
            }
        }
        .accepted_content_deposit{
            font-size: 32rpx;
            color: #E9928E;
            margin:12rpx 0 24rpx 0;
        }
            .accepted_content_withdrawal{
                display: flex;
                font-size: 32rpx;
                align-items: center;
                color: #666666;
                .withdrawal_image{
                    width: 48rpx;
                    height: 48rpx;
                    margin-right:8rpx;
                }
            }
        }
        .accepted_register_row{
            display: flex;
            justify-content: center;
            .accepted_register_image{
            width:482rpx;
            height:112rpx;
            margin-top:132rpx;
          }
        }
    }
}
.redEnvelope{
    background-color: rgba(255, 238, 217, 1);
    padding:32rpx 24rpx;
    .redEnvelope_reg{
        .redEnvelope_but{
            display: flex;
            margin: 0 auto;
            margin-top: 42rpx;
            align-items: center;
            background-repeat: no-repeat;
            background-size: cover; /* 背景图覆盖整个按钮 */
            font-size: 36rpx;
            width: 502rpx;
            height: 130rpx;
            color: #FFFFFF;
            background-image: url('https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_test/life/care/service/thumb/202465105514261.png');
            justify-content: center;
            /* 确保没有任何边框和背景 */
            background-color: transparent !important;

        }
        .redEnvelope_state{
            display: flex;
            margin-top: 16rpx;
            justify-content: center;
            font-weight: 600;
            font-size: 28rpx;
            margin-bottom:50rpx;
            color: #333333;
        }
        .redEnvelope_reg_content{
            white-space: nowrap;
            align-items: center;
            display: flex !important;
                .reg_random{
                width: 152rpx;
                height: 166rpx;
                align-items: center;
                font-size: 20rpx;
                display: inline-flex;
                flex-direction: column;
                justify-content: space-between;
                color: #FFFFFF;
                background-repeat: no-repeat;
                background-size: cover; /* 背景图覆盖整个页面 */
                background-image: url('https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_test/life/care/service/thumb/202467102010370.svg');
                .reg_unseal_title{
                    font-size: 28rpx;
                    padding-top: 22rpx;
                    font-size: 24rpx;
                    color: #FFFFFF;
                }
                .reg_unseal_desc{
                    font-size: 20rpx;
                    color: #FFFFFF;
                    padding-bottom: 18rpx;
                }
            }

            .reg_unseal{
                width: 152rpx;
                height: 166rpx;
                align-items: center;
                font-size: 20rpx;
                display: inline-flex;
                flex-direction: column;
                justify-content: space-between;
                color: #FFFFFF;
                // background-position: 0rpx 10rpx;
                background-repeat: no-repeat;
                background-size: cover; /* 背景图覆盖整个页面 */
                background-image: url('https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_test/marketing-manage/otherCenter/classManage/2024612145431562.png');
                .reg_unseal_title{
                    font-size: 28rpx;
                    padding-top: 20rpx;

                    color: #FF8484;
                }
                .reg_unseal_desc{
                    padding-bottom: 24rpx;
                }
            }

        }
    }

}
.registerTask {
    padding:30rpx;
    padding-bottom: 42rpx;
    margin-top: 95rpx;
    border-radius: 28rpx;
    background: #ffffff;
    .registerTask_title{
        font-size: 32rpx;
        color: #333333;
    }
    .registerTask_row{
        margin-top: 40rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .registerTask_row_left {
        display: flex;
        .registerTask_successp_img {
            width: 88rpx;
            height: 88rpx;
            margin-right: 22rpx;
        }
        .registerTask_success {
            display: flex;
            flex-direction: column;
            .registerTask_title {
                font-size: 32rpx;
                color: #333333;
            }
            .registerTask_success_desc {
                font-size: 24rpx;
                margin-top: 8rpx;
                color: #666666;
            }
        }
    }
    .registerTask_row_right {
        width: 132rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 54rpx;
        font-size: 24rpx;
        color: #ffffff;
        background: linear-gradient(90deg, #fe7454 0%, #fb3d3e 100%);
        border-radius: 28rpx;
    }
    }

}
.register {
    background-image: url("https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_dev/life/care/service/thumb/2024531175519497.svg");
    width: 100%;
    background-repeat: no-repeat;
    height: 341rpx;
    background-size: cover; /* 背景图覆盖整个页面 */
    .register_Sign{
        width: 280rpx;
        height: 60rpx;
        display: block;
        margin: 14rpx auto;

    }
    .sign_Withdrawal{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10rpx;
        .Withdrawal_price{
            color: #FFFFFF;
            font-size: 64rpx;
            text{
                font-size: 44rpx;
            }
        }
        .Withdrawal_right{
            margin-left:20rpx;
            width: 176rpx;
            box-shadow: 0rpx 4rpx 8rpx rgba(201,0,0,0.1);
            border-radius: 34rpx;
            height: 56rpx;
            font-size: 28rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #FF5E48;
            background:rgba(254,228,226,1);
            .Withdrawal_right_img{
                width: 32rpx;
                height: 32rpx;
            }
            .withdrawal_right_title{
                margin: 0 4rpx;
            }
            .Withdrawal_right_icon{
                width: 28rpx;
                height: 28rpx;

            }
      }
    }
    .register_top {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 30rpx;
        padding-right: 30rpx;
        .register_envelope {
            display: flex;
            flex-direction: column;
            align-items: center;
            .register_top_title {
                font-size: 32rpx;
                color: #ffffff;
            }
            .register_top_img {
                width: 40rpx;
                height: 40rpx;
            }
        }

        .register_top_right {
            width: 56rpx;
            height: 56rpx;
            margin-left: 30rpx;
        }
    }
}
.flex-row, .flex-column {
    display: flex;
    position: relative;
}

.flex-row {
    flex-direction: row;
}

.flex-column {
    flex-direction: column;
}

.packer-box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    color: rgb(235, 205, 153);
    padding: 60rpx;
}

.packer-bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.packer-top-box {
    width: 600rpx;
    background-color: rgb(244, 94, 77);
    text-align: center;
    margin: auto;
    transform: translateY(-160rpx);
    border-top-left-radius: 30rpx;
    border-top-right-radius: 30rpx;
    position: relative;
}

.sender-info {
    margin-top: 200rpx;
    justify-content: center;
    line-height: 60rpx;
    font-size: 36rpx;
}

.sender-avatar {
    width: 60rpx;
    height: 60rpx;
    border-radius: 10rpx;
    background-color: #fff;
    margin-right: 10rpx;
}

.packer-greeting {
    font-size: 48rpx;
    line-height: 60rpx;
    height: 120rpx;
    margin: 40rpx 30rpx 200rpx;
}

.arc-edge, .arc-bottom-edge {
    position: relative;
}

.arc-edge::after, .arc-bottom-edge::after {
    width: 100%;
    height: 200rpx;
    left: 0;
    position: absolute;
    top: -100rpx;
    content: '';
    border-radius: 50%;
    box-shadow: 0 6rpx 6rpx 0 rgba(0, 0, 0, 0.1);
}

.arc-edge::after {
    background-color: rgb(244, 94, 77);
}

.arc-bottom-edge::after {
    width: 120%;
    left: -10%;
    box-shadow: 0 60rpx 0 0 rgb(242, 85, 66);
}

.packer-bottom-box {
    width: 600rpx;
    height: 360rpx;
    border-bottom-left-radius: 30rpx;
    border-bottom-right-radius: 30rpx;
    overflow: hidden;
    position: absolute;
    bottom: calc(50% - 440rpx);
    left: 50%;
    transform: translateX(-50%);
}

.anim-ease-in {
    animation-duration: 0.5s;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes slideOutTop {
    from {
        transform: translateY(-160rpx);
    }
    to {
        transform: translateY(-200%);
    }
}

@keyframes slideOutBottom {
    from {
        transform: translate(-50%, 0);
    }
    to {
        transform: translate(-50%, 200%);
    }
}

.packer-bottom-bg {
    background-color: rgb(242, 85, 66);
    height: 280rpx;
    margin-top: 100rpx;
}

.packer-btn {
    border-radius: 50%;
    width: 200rpx;
    height: 200rpx;
    line-height: 200rpx;
    font-size: 80rpx;
    text-align: center;
    color: #333;
    background-color: rgb(235, 205, 153);
    box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 50%;
    bottom: -200rpx;
    transform: translateX(-50%);
}

.packer-btn-middle {
    border-radius: 50%;
    width: 200rpx;
    height: 200rpx;
    background-color: rgb(235, 180, 120);
    position: absolute;
    top: 0;
    left: 0;
}

.anim-rotate {
    margin-left: -100rpx;
    transform-style: preserve-3d;
    animation: rotate 1s linear infinite;
}

@keyframes rotate {
    0% {
        transform: rotateY(0deg);
    }
    100% {
        transform: rotateY(360deg);
    }
}
</style>

