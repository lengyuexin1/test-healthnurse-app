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
              :auto-show-back-to-top="true"
              :auto-scroll-to-top-when-reload="false"
        >
            <template #top>

                <PageTopbg :zIndex="-1" :addheight="250"
                           :bgstyle="'background: linear-gradient( 180deg, #FFE3DE 0%, #F8F9F9 100%);'"></PageTopbg>

                <view class="navbar_box"
                      :style="{ paddingTop: data.titleTop + 'px', paddingRight: data.titleRight + 'px' }">
                    <view class="top_box" :style="{ height: data.sBarHeight + 'px' }">
                        <view class="back_icon" @click="goback">
                            <TnIcon name="left" color="#2F2F2F" size="38" :bold="true"/>
                            <!-- #ifdef MP-WEIXIN -->
                            <view class="title_text">讨论区</view>
                            <!-- #endif -->
                        </view>

                        <!-- #ifdef APP-PLUS || H5 -->
                        <view class="title_text">讨论区</view>
                        <!-- #endif -->

                        <view class="page_share" @click="sharePage" v-if="!data.isRequireLogin">
                            <image
                                  class="share_img"
                                  :src="getAssetsUrl('/leyou/newpagemenu/fenxiang.svg')"
                                  mode="scaleToFill"
                            />
                            <!-- #ifdef MP-WEIXIN -->
                            <button open-type="share"></button>
                            <!-- #endif -->
                        </view>
                        <view v-else></view>
                    </view>

                </view>

            </template>


            <view class="partition_box">
                <view class="partition_item" @click="partitionDetail(item)" v-for="item in data.partitionList"
                      :key="item.id">
                    <image
                          class="partition_img"
                          :src="item.thumb"
                          mode="scaleToFill"
                    />
                    <view class="partition_text">
                        <view class="partition_title">{{ item.name }}</view>
                        <view class="partition_desc">{{ item.desc }}</view>
                        <view class="partition_number">{{ item.cntPost }}人讨论</view>
                    </view>
                </view>
            </view>

            <view class="page_title">最新讨论</view>

            <view class="content_box" v-if="data.dataList.length != 0">
                <view class="content_list">
                    <view class="content_List_item" v-for="item in data.dataList" :key="item.id">
                        <view class="item_top_box">
                            <view class="item_top_left">
                                <!-- :src="getAssetsUrl('/leyou/newpagemenu/haowu_icon.svg')" -->
                                <image
                                      class="type_img"
                                      :src="item.discussion.thumb"
                                      mode="scaleToFill"
                                />
                                <view class="type_text">
                                    <view class="type_title">{{ item.discussion.name }}</view>
                                    <view class="type_uptext">
                                        <view class="up_time">{{ formatTime(item.utcCreated) }}</view>
                                        <view class="up_author">@{{ item.accountName }}</view>
                                    </view>
                                </view>
                            </view>
                            <view class="join_btn" @click="toDetail(item)">
                                <view>进入</view>
                                <TnIcon name="right" color="#EA3E1A" size="38" :bold="true"/>
                            </view>
                        </view>
                        <partitionTextItem :info="item" v-if="data.showListBox"></partitionTextItem>
                    </view>

                </view>
            </view>


            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { onLoad, onShow, onShareAppMessage, onHide } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'
import { getdiscussionList, discussionContentList } from "@/api/create-api"
import { PlatformManage } from "@bc/sys"
import { gotoLogin } from "@/routes/public-routes"
import { gotodiscussListsonPage } from '@/routes/service-routes'
// gotoarticledetails
import { gotoarticledetails } from '@/routes/create-routes'
import BCNotify from '@/components/notify/index.vue'
import partitionTextItem from './components/partitionTextItem.vue'

import { gotoserviceIndexPage } from '@/routes/service-routes'


import { TempStorage } from "@bc/base"
import { agoTime } from '@/common/formatTime'


interface Data {
    titleTop: number
    titleRight: number
    sBarHeight: number
    dataList: any
    partitionList: any
    isRequireLogin: boolean
    showListBox: boolean
}

const data = reactive<Data>({
    titleTop: 0,
    titleRight: 0,
    sBarHeight: 0,
    dataList: [],
    partitionList: [],
    isRequireLogin: false,
    showListBox: false
})

const formatTime = computed(() => (time: number) => {
    return agoTime(time)
})

const bcNotify = ref()

onMounted(async () => {

    // #ifdef MP-WEIXIN
    // 获取胶囊按钮位置信息
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    const { top, height, width } = menuButtonInfo
    // #endif

    // #ifdef APP-PLUS || H5
    console.log('app顶部')
    const height = 0
    const width = 0
    const top = 0
    // #endif


    // #ifdef MP-WEIXIN
    // 获取系统状态栏高度
    data.sBarHeight = uni.getSystemInfoSync().statusBarHeight!
    // 计算标题需要偏移的位置
    data.titleTop = top + (height - data.sBarHeight) / 2

    // 计算顶部右侧偏移量
    data.titleRight = width + 8
    // #endif


    // #ifdef APP-PLUS || H5
    data.sBarHeight = 33
    const pageObj = uni.getSystemInfoSync() as any
    data.titleTop = pageObj.safeArea.top

    data.titleRight = 8
    // #endif


})


const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

onLoad((option: any) => {
    // PlatformManage.isRequireLogin().then((isRequireLogin) => {
    //     getdiscussionList({},isRequireLogin).then((res:any) => {
    //         data.isRequireLogin = isRequireLogin
    //         data.partitionList = res
    //         console.log('data.partitionList',data.partitionList);
    //     }).catch((err:any) => {})
    // })
})
onShow(() => {
    // data.showListBox = true;
    (paging.value as any).reload()

})
onHide(() => {
    // data.showListBox = false;
})

const paging = ref(null)
const queryList = async (pageNumber: number, pageSize: number) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {

        if (pageNumber == 1) {
            getdiscussionList({}, isRequireLogin).then((res: any) => {
                data.isRequireLogin = isRequireLogin
                data.partitionList = res
                console.log('data.partitionList', data.partitionList)
            }).catch((err: any) => {
            })
        }

        data.showListBox = false

        discussionContentList({
            query: {},
            pageNumber,
            pageSize
        }, isRequireLogin).then((res: any) => {
            (paging.value as any).complete(res.data)
            data.showListBox = true

        }).catch((err: any) => {
            (paging.value as any).complete([])
        }).finally(() => {
            console.log('加载中.....')
        })
    })

}

const partitionDetail = (item: any) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        gotodiscussListsonPage({ discussionId: item.id, discussionName: item.name })

    })
}

const toDetail = (item: any) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        gotoarticledetails({ id: item.id })
    })
}


// 退出页面
const goback = () => {
    const pages = getCurrentPages()
    if (pages.length == 2 || pages.length == 1) {
        gotoserviceIndexPage(true)
        return
    }
    uni.navigateBack()
}


// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN
    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: 'https://xcpublic.oss-cn-shenzhen.aliyuncs.com/webapplet/leyou/newpagemenu/jianwen_icon.svg',
        title: '讨论区',
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/Create/pages/discussPage/discussListPage`, //点击链接进入的页面
            type: shareType, //0-正式版； 1-测试版； 2-体验版。 默认值为0
            webUrl: 'http://www.baochuncare.com'//兼容低版本的网页链接
        },
        success: ret => {
            console.log(JSON.stringify(ret))
        }, fail: err => {
            console.log(err)
        }
    })
}
// #endif

// 微信小程序分享
//#ifdef MP-WEIXIN
onShareAppMessage((res: any) => {
    console.log('小程序分享')

    return {
        title: '讨论区',
        imageUrl: '',
        desc: '讨论区内页',
        path: `/Create/pages/discussPage/discussListPage`
    }
})
//#endif


defineExpose({})

</script>

<style lang="scss" scoped>
.navbar_box {
    // #ifdef APP-PLUS || H5
    padding-bottom: 12rpx;
    // #endif

    margin-bottom: 24rpx;

    .top_box {

        padding: 10rpx;

        padding-left: 24rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        // #ifdef APP-PLUS || H5
        width: 100%;
        height: auto !important;
        // #endif
        .title_text {
            font-weight: 500;
            font-size: 34rpx;
            color: #333333;
            margin-left: 16rpx;
        }
    }

    .back_icon {
        margin-right: 20rpx;
        display: flex;
        align-items: center;
    }

    .page_share {
        width: 48rpx;
        height: 48rpx;
        position: relative;

        .share_img {
            width: 100%;
            height: 100%;
        }

        button {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            opacity: 0;
            z-index: 30;
        }
    }


}

.partition_box {
    padding: 16rpx 24rpx;
    box-sizing: border-box;
    display: grid;
    grid-gap: 22rpx;
    grid-template-columns: auto auto;

    .partition_item {
        padding: 28rpx 24rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 12rpx;
        display: flex;
        align-items: center;

        .partition_img {
            width: 108rpx;
            height: 108rpx;
            margin-right: 16rpx;
        }

        .partition_text {
            display: flex;
            flex-direction: column;

            .partition_title {
                font-weight: 500;
                font-size: 30rpx;
                color: #333333;
                margin-bottom: 4rpx;
            }

            .partition_desc {
                font-weight: 400;
                font-size: 22rpx;
                color: #666666;
                margin-bottom: 8rpx;
            }

            .partition_number {
                font-weight: 400;
                font-size: 22rpx;
                color: #999999;
            }
        }
    }
}

.page_title {
    font-weight: 500;
    font-size: 30rpx;
    color: #333333;
    padding: 14rpx 36rpx;
}

.content_box {
    padding: 0rpx 24rpx;
    box-sizing: border-box;

    .content_list {
        padding: 30rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 24rpx;

        .content_List_item {
            padding-bottom: 30rpx;
            margin-bottom: 30rpx;
            border-bottom: 2rpx solid #F2F2F2;

            .item_top_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 30rpx;

                .item_top_left {
                    display: flex;
                    align-items: center;

                    .type_img {
                        width: 80rpx;
                        height: 80rpx;
                        margin-right: 16rpx;
                    }

                    .type_text {
                        .type_title {
                            font-size: 28rpx;
                            font-weight: 500;
                            color: #333333;
                            margin-bottom: 6rpx;
                        }

                        .type_uptext {
                            display: flex;
                            align-items: center;
                            font-weight: 400;
                            font-size: 24rpx;
                            color: #666666;

                            .up_time {
                                margin-right: 16rpx;
                            }

                            .up_author {
                                width: 280rpx;
                                white-space: nowrap; /*强制一行内显示*/
                                overflow: hidden; /*溢出隐藏*/
                                text-overflow: ellipsis; /*超出部分现实省略号*/
                            }
                        }
                    }
                }

                .join_btn {
                    display: flex;
                    align-items: center;
                    padding: 8rpx 22rpx;
                    padding-right: 10rpx;
                    box-sizing: border-box;
                    background: #FFE2DB;
                    border-radius: 28rpx;
                    font-size: 28rpx;
                    color: #EA3E1A;
                }
            }
        }
    }
}


</style>
<style>
page {
    background: #F8F8F8;
}
</style>
