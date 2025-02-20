<template>
    <view class="container">
        <z-paging
              ref="paging"
              :auto="true"
              v-model="data.dataList"
              @query="queryList"
              :defaultPageSize="10"
              :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
              empty-view-text="暂无数据~"
              :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template #top>
                <view style="background:linear-gradient(180deg, #DFF7EF 20%, #FFFFFF 100%);">
                    <!--                    <customNavbar bgColor="transparent" pageTitle="康护知识"></customNavbar>-->
                    <bc-page-navbar title="康护知识"></bc-page-navbar>
                </view>
            </template>
            <view class="persbox" id="into2">
                <view class="perslearn">
                    <view class="perssell row i-center j-between">
                        <view class="persselef">
                            <view class="persnum">{{ data.dateInfo.m || '' }}</view>
                            <view class="selline"></view>
                            <view class="persnum">{{ data.dateInfo.d || '' }}</view>
                            <view class="persweek">{{ data.dateInfo.w || '' }}</view>
                        </view>
                        <view class="persserig"
                              :style="{ backgroundImage: `url(${getAssetsUrl('/zhihu/kangbg.png')})` }">
                            <view class="sellbox row i-center">
                                <view class="selllef">推荐</view>
                                <view class="selltxt">每日必看</view>
                            </view>
                            <block v-for="(item,index) in data.articDay" :key="index">
                                <view class="persli row i-center" @click="linkArticledetails(item.id)">
                                    <view class="u-line-1">{{ item.name || '' }}</view>
                                </view>
                            </block>
                        </view>
                    </view>
                    <view class="perstop row i-center j-between">
                        <view class="perstit">最新推荐</view>
                    </view>
                    <view class="persarticle" v-if="data.articList.length">
                        <block v-for="(item,index) in data.articList" :key="index">
                            <view class="articli row i-center j-between" @click="linkArticledetails(item.id)">
                                <view class="articlef column j-between">
                                    <view class="artictit u-line-1">{{ item.name || '' }}</view>
                                    <view class="row i-center">
                                        <TnAvatar :src="item.accountAvatar" size="32rpx"></TnAvatar>
                                        <view class="artictime">{{ item.accountName || '--' }}</view>
                                    </view>
                                </view>
                                <view class="articrig">
                                    <image style="width: 226rpx;height: 226rpx;border-radius: 4rpx;"
                                           :src="item.thumb"></image>
                                    <view class="alblayer" v-if="item.type == 2">
                                        <view class="albtriangle row i-center j-center">
                                            <view class="albtrimin">
                                                <TnIcon name="play-right-fill" color="#ffffff" size="30rpx"></TnIcon>
                                            </view>
                                        </view>
                                        <!-- <view class="tritime">00:20</view> -->
                                    </view>
                                </view>
                            </view>
                        </block>
                    </view>
                    <TnEmpty v-else mode="list" :icon="getAssetsUrl('/empty/empty_icon_data.png')">
                        <template #tips>暂无数据</template>
                    </TnEmpty>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script lang="ts" setup>
import TnAvatar from '@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar.vue'
import TnEmpty from '@tuniao/tnui-vue3-uniapp/components/empty/src/empty.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getAssetsPic } from "@/common/setPicture"
import { escontentlist } from "@/api/create-api"
import { gotoarticledetails } from '@/routes/create-routes'
import { channelClsList } from "@/api/smart-api"
import dayjs from "dayjs"
import { computed, reactive, ref } from "vue"
import { onLoad } from '@dcloudio/uni-app'

interface Data {
    dataList: any[],
    articDay: any[],
    articList: any[],
    dateInfo: any
}

/** @returns {function} */
const getAssetsUrl = computed(() => {
    return (str: string) => {
        return getAssetsPic(str)
    }
})
const data = reactive<Data>({
    dataList: [],
    articDay: [],
    articList: [],
    dateInfo: {}
})
const paging = ref()
onLoad((options) => {
    getToday()
    channelClsList(11).then(res => {
        // res.length > 0 && this.getcontentList([res[0].id])
        console.log(res)
        res.length > 0 && getcontentList(res[0].categoryIds)
    }).catch(err => {
        console.log(err)
    })
})
const queryList = (pageNumber, pageSize) => {
    // paging.value.complete([1, 2, 3])
}
// 康养知识
const getcontentList = (categoryIds) => {
    escontentlist({
        pageNumber: 1,
        pageSize: 30,
        query: {
            categoryIds
        }
    }).then(res => {
        console.log(res)
        if (res.data.length >= 2) {
            data.articDay = res.data.splice(0, 2)
            data.articList = res.data
        }
        else {
            data.articDay = res.data
            data.articList = []
        }
    })
}
const linkArticledetails = (itemId) => {
    gotoarticledetails({ id: itemId })
}
const getToday = () => {
    const time = dayjs()
    const week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    data.dateInfo = {
        d: time.format("DD"),
        m: time.format("MM"),
        w: week[time.format("d")]
    }
    const endTime = time.add(1, 'day').startOf('date').diff(time)
    if (endTime <= 30 * 60 * 1000) {
        setTimeout(() => {
            data.getToday()
        }, endTime)
    }
}
</script>

<style lang="scss" scoped>
.persbox {
    margin: 20rpx 20rpx 0;

    .perstop {
        margin-bottom: 24rpx;
        padding: 36rpx 10rpx 0;

        .perstit {
            padding-left: 10rpx;
            font-weight: bold;
            font-size: 30rpx;
            color: #0B0B0B;
        }

        .persmore {
            width: 122rpx;
            height: 56rpx;
            background: #E7E8EB;
            border-radius: 28rpx;
            font-weight: 400;
            font-size: 28rpx;
            color: #A1A1A1;
        }
    }

    .personnel {
        padding: 0 10rpx;

        text {
            font-weight: 400;
            font-size: 24rpx;
            color: #666666;
            line-height: 28rpx;
            margin-top: 16rpx;
        }

        .sonnli {
            margin-right: 24rpx;
        }

        .line {
            width: 0rpx;
            height: 44rpx;
            border: 2rpx solid #D9D9D9;
            margin-right: 24rpx;
        }
    }

    .perslearn {
        .perssell {
            height: 256rpx;
            background: #FFFFFF;
            border-radius: 24rpx;
            overflow: hidden;

            .persselef {
                padding: 26rpx 0 26rpx 50rpx;

                .persnum {
                    font-weight: 400;
                    font-size: 56rpx;
                    color: #6D6D6D;
                }

                .selline {
                    width: 44rpx;
                    height: 0;
                    border: 2rpx solid #B4B4B4;
                    margin: 10rpx;
                    transform: rotate(-10deg);
                }

                .persweek {
                    font-weight: 400;
                    font-size: 26rpx;
                    color: #6D6D6D;
                    margin-top: 8rpx;
                }
            }

            .persserig {
                width: 544rpx;
                height: 256rpx;
                border-radius: 24rpx 24rpx 24rpx 0rpx;
                box-sizing: border-box;
                background-size: cover;
                padding: 52rpx 44rpx 40rpx;
                position: relative;
                overflow: hidden;
                z-index: 10;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: -1;
                    background-color: rgba(0, 0, 0, 0.3);
                }

                .sellbox {
                    margin-bottom: 30rpx;

                    .selllef {
                        width: 64rpx;
                        height: 36rpx;
                        line-height: 36rpx;
                        background: #FF8000;
                        border-radius: 6rpx;
                        margin-right: 16rpx;
                        font-weight: bold;
                        font-size: 22rpx;
                        color: #FFFFFF;
                        text-align: center;
                    }

                    .selltxt {
                        font-weight: 400;
                        font-size: 40rpx;
                        color: #FFFFFF;
                    }
                }

                .persli {
                    font-weight: 400;
                    font-size: 28rpx;
                    color: #FFFFFF;
                    margin-top: 8rpx;

                    &::before {
                        content: "";
                        display: block;
                        width: 8rpx;
                        height: 8rpx;
                        border-radius: 50%;
                        border: 2px solid #FFFFFF;
                        margin-right: 12rpx;
                    }
                }
            }
        }

        .persarticle {
            margin-top: 20rpx;
            background: #FFFFFF;
            border-radius: 24rpx;
            padding: 32rpx 30rpx;

            .articli {
                padding-bottom: 32rpx;
                margin-bottom: 30rpx;
                border-bottom: 2rpx solid #F2F2F2;

                &:last-child {
                    border-bottom: none;
                    margin-bottom: 0rpx;
                    padding-bottom: 0rpx;
                }

                .articlef {
                    height: 150rpx;

                    .artictit {
                        font-weight: 400;
                        font-size: 28rpx;
                        color: #333333;
                    }

                    .artictime {
                        font-weight: 400;
                        font-size: 24rpx;
                        color: #979797;
                        margin-left: 8rpx;
                    }
                }

                .articrig {
                    position: relative;
                    margin-left: 20rpx;
                }
            }
        }
    }

    .alblayer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 50;

        .albtriangle {
            width: 52rpx;
            height: 52rpx;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
            z-index: 20;

            .albtrimin {
                margin: 0rpx 0 0 5rpx;
            }
        }

        .tritime {
            font-weight: 400;
            font-size: 20rpx;
            color: #FFFFFF;
            position: absolute;
            z-index: 20;
            right: 12rpx;
            bottom: 6rpx;
        }
    }
}
</style>
