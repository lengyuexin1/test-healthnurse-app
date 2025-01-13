<template>
	<view class="container">
		<z-paging
		ref="paging"
		:auto="false"
		:refresher-enabled="false"
		>
            <view class="activity_box">
                <image
                    class="activity_img"
                    :src="data.activityObj.thumb"
                    mode="aspectFill"
                />
                <view class="illustrate_item">
                    <view class="illustrate_title">活动介绍</view>
                    <view class="activity_introduce">
                        {{ data.activityObj.desc }}
                    </view>
                </view>

                <view class="illustrate_item">
                    <view class="illustrate_title">活动时间</view>
                    <view class="activity_time_box">
                        <view class="submission_box">
                            <view class="activity_time">{{ formatTime(data.activityObj.utcStart)}}</view>
                            <view class="activity_dot">
                                <view class="activity_dot_son"></view>
                            </view>
                            <view class="activity_time_text">征稿开始</view>
                        </view>

                        <view class="submission_box">
                            <view class="activity_time">{{ formatTime(data.activityObj.utcEnd) }}</view>
                            <view class="activity_dot">
                                <view class="activity_dot_son"></view>
                            </view>
                            <view class="activity_time_text">征稿结束</view>
                        </view>

                        <view class="submission_box">
                            <view class="activity_time">{{ formatTime(data.activityObj.utcReward) }}</view>
                            <view class="activity_dot">
                                <view class="activity_dot_son"></view>
                            </view>
                            <view class="activity_time_text">奖励发放</view>
                        </view>
                        <view class="activity_time_border"></view>
                    </view>

                </view>

                <view class="illustrate_item">
                    <view class="illustrate_title">活动奖励</view>
                    <view class="reward_box" :style="{ backgroundImage: `url(${getAssetsUrl('/create/reward.png')})` }">
                        <template v-if="iscoupon">
                            <view class="reward_number_box number" v-if="!data.typeList.includes(data.coupon.typeId)">
                                <text class="reward_number_str">￥</text>
                                <text class="reward_number" >{{ data.coupon.cfgOffer / 100 }}</text>
                            </view>
                            <view class="reward_number_box break" v-else>
                                <text class="reward_number" >{{ data.coupon.cfgOffer / 100 }}</text>
                                <text class="reward_number_text">折</text>
                            </view>
                        </template>
                        <template v-else>
                            <view class="reward_number_box number">
                                <text class="reward_number_str">￥</text>
                                <text class="reward_number" >{{ data.activityObj.moneyReward / 100 }}</text>
                            </view>
                        </template>
                        <view class="reward_title_box">
                            <view class="reward_title">{{ iscoupon ? data.coupon.typeName : '现金奖励' }}</view>
                            <view class="reward_text"> {{ iscoupon ? data.coupon.desc : '获取收益额度' }} </view>
                        </view>

                    </view>
                    <view class="join_number_text">本活动获奖共设置了{{ data.activityObj.cntReward }}个名额，欢迎大家踊跃参与！</view>
                </view>

                <view class="illustrate_item">
                    <view class="illustrate_title">参与方式</view>
                    <view class="join_text_box">
                        <text>活动页面点击下方【立即投稿】，或在发布页面发布作品，输入</text>
                        <text class="topic">#{{ data.activityObj.topic }}#</text>
                        <text>活动话题，上传符合活动主题及要求的作品，即视为成功参与。</text>
                    </view>
                    <view class="ask_box" v-if="false">
                        <view class="ask_box_title">·投稿要求:</view>
                        <view>需投稿时长大于1分钟，横版，画质清晰度720p或以上的原创视频。</view>
                    </view>
                </view>

                <view class="illustrate_item">
                    <view class="illustrate_title">评选规则</view>
                    <view class="rule_box">
                        平台运营根据视频的内容质量，播放量，点赞量，弹幕量，评论数等综合维度评选得出
                    </view>
                </view>
            </view>
            <template #bottom>
                <view slot="bottom" class="bottom_btn_box">
                    <view class="bottom_btn" @click="toupArticle">立即投稿</view>
                </view>
            </template>
		</z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import { activityDetail } from '@/api/activity-api'
import { homePage } from '@/api/create-api'
import { gotouparticle, gotoNewUpcontentPage, Upcontent } from '@/routes/create-routes'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import { formattime } from '@/common/formatTime'

interface Data {
    swiperIndex: number
    id: string
    activityObj: any
    topic: string
    coupon: any
    typeList: any
}

const data = reactive<Data>({
    swiperIndex: 1,
    id: '',
    activityObj: {},
    topic: '',
    coupon: {},
    typeList: [1000004, 1000002, 10004, 10002]
})

const bcNotify = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const iscoupon = computed(() => {
    if (!data.activityObj.id) {
        return false
    }
    else {
        if (data.activityObj.rewardType == 1 && data.activityObj.coupon) {
            return true
        }
        else {
            return false
        }
    }

})

const formatTime = (time:number) => {
    return formattime(time, 'MM-DD')
}

const toupArticle = () => {
    // homePage({}).then((res:any) => {
        // if (res.cardId) {

            data.activityObj.status == 1 && bcNotify.value.show('活动还未开始')
            data.activityObj.status == 3 && bcNotify.value.show('活动已结束')
            // data.activityObj.status == 2 && gotouparticle({
        
            // #ifdef MP-WEIXIN
            data.activityObj.status == 2 && gotoNewUpcontentPage({
                activityId: data.activityObj.id,
                topic: data.activityObj.topic,
                isjoinActivity: 1,
                categoryId: data.activityObj.categoryId
            })
            // #endif

            // #ifdef APP-PLUS
            data.activityObj.status == 2 && Upcontent({
                activityId: data.activityObj.id,
                topic: data.activityObj.topic,
                isjoinActivity: 1,
                categoryId: data.activityObj.categoryId
            })
            // #endif

        // }
        // else {
            // bcNotify.value.show('未完成实名认证无法参加活动')
        // }
    // })
}

const getactivityDetail = (id:string) => {
    activityDetail({ id }).then((res:any) => {
        data.activityObj = res
        data.coupon = res.coupon
        uni.setNavigationBarTitle({ title: data.activityObj.name })
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

onLoad((options) => {
    data.id = options?.id
    data.topic = options?.topic
    getactivityDetail(data.id)
})

onShow(() => {
    getactivityDetail(data.id)
})

</script>

<style lang="scss" scoped>
.top_box {
	background: #fff;
	padding-bottom: 20rpx;
}
.activity_box{
    padding: 20rpx;
    box-sizing: border-box;
    .activity_img{
        width: 100%;
        height: 320rpx;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
    }
    .illustrate_item{
        padding: 40rpx 30rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
        .illustrate_title{
            color: #333333;
            font-size: 32rpx;
            text-align: center;
            font-weight: 600;
            margin-bottom: 40rpx;
        }
        .activity_introduce{
            color: #666666;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 48rpx;
        }
        .activity_time_box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            position: relative;
            .submission_box{
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                z-index: 1;
                .activity_time{
                    color: #898A8F;
                    font-size: 28rpx;
                }
                .activity_dot{
                    width: 20rpx;
                    height: 20rpx;
                    border-radius: 50%;
                    background: #FFEACF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 18rpx 0rpx;
                    .activity_dot_son{
                        width: 8rpx;
                        height: 8rpx;
                        border-radius: 50%;
                        background: #FFA023;
                    }
                }
                .activity_time_text{
                    font-size: 28rpx;
                    color: #2A2B31;
                }
            }
            .activity_time_border{
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 2rpx;
                background: #E8E8E8;
            }

        }
        .reward_box{
            width: 100%;
            height: 234rpx;
            border-radius: 24rpx;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-position:center center;
            background-size: 100% 100%;
            padding: 30rpx 30rpx;
            box-sizing: border-box;
            margin-bottom: 40rpx;
            .reward_number_box{
                // display: flex;
                // &.number{
                //     flex-direction: column;
                // }
                &.break{
                    align-items: center;
                    margin-left: 50rpx;
                }
                .reward_number_str{
                    color: #EB4438;
                    font-size: 36rpx;
                }
                .reward_number_text{
                    color: #EB4438;
                    font-size: 50rpx;
                }
                .reward_number{
                    font-size: 46rpx; //58rpx;
                    color: #EB4438;
                }
            }
            .reward_title_box{
                display: flex;
                flex-direction: column;
                margin-right: 50rpx;
                .reward_title{
                    font-size: 48rpx;
                    color: #EB4438;
                }
                .reward_text{
                    font-size: 28rpx;
                    color: #998E8C;
                }
            }


        }
        .join_number_text{
            color: #999999;
            font-size: 24rpx;
            text-align: center;
        }
        .join_text_box{
            font-size: 28rpx;
            color: #666666;
            margin-bottom: 40rpx;
            line-height: 44rpx;
            .topic{
                color: #29C86F;
            }


        }
        .ask_box{
            color: #999999;
            font-size: 28rpx;
        }
        .rule_box{
            color: #666666;
            font-size: 28rpx;
            line-height: 44rpx;
        }

    }


}
.bottom_btn_box{
    padding: 20rpx 30rpx;
    padding-bottom: 60rpx;
    box-sizing: border-box;
    background: #fff;
    .bottom_btn{
        width: 100%;
        height: 80rpx;
        background: #EA3E1A;
        text-align: center;
        line-height: 80rpx;
        color: #FFFFFF;
        font-size: 32rpx;
        border-radius: 40rpx;
    }

}

</style>
