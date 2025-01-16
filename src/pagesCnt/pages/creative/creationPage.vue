<template>
    <view class="container">
        <z-paging
              ref="paging"
              v-model="data.dataList"
              :auto="true"
              :fixed="true"
              @query="queryList"
              :defaultPageSize="10"
              :auto-show-system-loading="true"
              :auto-scroll-to-top-when-reload="false"
              :hide-empty-view="true"
        >
            <template #top>
                <view id="pageTop">
                    <pageTopbg :zIndex="-1"></pageTopbg>
                    <bc-page-navbar :title="'创作者中心'"></bc-page-navbar>
                </view>
            </template>
            <view class="top_up_box">
                <view class="top_btn up" @click="toupArticle">
                    <image
                          class="top_up_icon"
                          :src="getAssetsUrl('/create/fabu.svg')"
                          mode="scaleToFill"
                    />
                    <text class="up_text">发布</text>
                </view>
            </view>

            <view class="page_padding">
                <view class="user_box">
                    <view class="user_top_box">
                        <image
                              class="user_top_img"
                              :src="data.pageObj.avatar"
                              mode="scaleToFill"
                        />
                        <view class="user_name">{{ data.pageObj.name }}</view>
                        <!-- 认证 -->
                        <template v-if="!data.pageObj.cardId">
                            <view @click="toAuthentication">
                                <view class="is_name" v-if="data.getClient == 'APP'">
                                    <text class="is_name_text">实名认证未完成</text>
                                    <TnIcon name="right" color="#E39C8A"></TnIcon>
                                </view>
                                <!-- <view class="is_name" v-else>
                                    <text class="is_name_text">使用APP完成实名认证</text>
                                </view> -->
                            </view>
                        </template>
                        <template v-else>
                            <view class="is_name is_true_name">
                                <text class="is_name_text is_true_text">实名认证已完成</text>
                            </view>
                        </template>
                        <view class="user_dace">在保椿创作的第{{ nowDay(data.pageObj.time) }}天</view>
                    </view>
                    <view class="user_top_data">
                        <view class="user_top_data_item">
                            <view class="user_top_data_title">总阅读</view>
                            <view class="user_top_number">{{ data.pageObj.cntLook }}</view>
                            <view class="yesterday_data">昨日
                                {{ data.pageObj.yesterdayCntLook ? data.pageObj.yesterdayCntLook : '--' }}
                            </view>
                        </view>
                        <view class="top_line"></view>
                        <view class="user_top_data_item">
                            <view class="user_top_data_title">总粉丝</view>
                            <view class="user_top_number">{{ data.pageObj.totalFans }}</view>
                            <view class="yesterday_data">昨日
                                {{ data.pageObj.yesterdayTotalFans ? data.pageObj.yesterdayTotalFans : '--' }}
                            </view>

                        </view>
                        <view class="top_line"></view>
                        <view class="user_top_data_item">
                            <view class="user_top_data_title">总收益</view>
                            <view class="user_top_number">{{ (data.pageObj.amount / 100) }}</view>
                            <view class="yesterday_data">昨日
                                {{ data.pageObj.yesterdayAmount ? (data.pageObj.yesterdayAmount / 100) : '--' }}
                            </view>


                        </view>
                    </view>
                    <view class="notice tn-flex-row">
                        <view class="notice_tag">公告</view>
                        <view class="noticeList_box">
                            <template v-if="data.noticeData.length">
                                <TnNoticeBar
                                      :data="data.noticeData"
                                      direction="vertical"
                                      font-size="28rpx"
                                      text-color="#666666"
                                      :speed="5000"
                                      right-icon-size="24"
                                      right-icon="right"
                                      @click="gotoNoticeDetail"
                                      @right-icon-click="clickNoticeList"
                                />
                            </template>
                            <template v-else>
                                <view class="emptyNotice" @tap="clickNoticeList">--</view>
                            </template>
                        </view>
                    </view>
                </view>


                <view class="staging_box">
                    <view class="staging_list" v-for="(item,index) in data.stagingList" :key="index">
                        <view class="staging_item" v-for="sonItem in item" :key="sonItem.id"
                              @tap="clickStagingList(sonItem)">
                            <image
                                  class="staging_img"
                                  :src="getAssetsUrl(sonItem.src)"
                                  mode="scaleToFill"
                            />
                            <view class="staging_text">{{ sonItem.name }}</view>
                        </view>

                    </view>

                </view>

                <!--                <template v-if="data.announcementList.length">-->
                <!--                    <swiper class="swiper" :autoplay="true" :circular="true" >-->
                <!--                        <swiper-item class="swiper_item" v-for="(item,index) in data.announcementList" :key="index">-->
                <!--                            <image-->
                <!--                                @click="toActivityDetail(item)"-->
                <!--                                class="announcement_img"-->
                <!--                                :src="item.thumb"-->
                <!--                                mode="aspectFill"-->
                <!--                            />-->
                <!--                        </swiper-item>-->
                <!--                    </swiper>-->
                <!--                </template>-->


                <view class="my_works">
                    <view class="works_top_box">
                        <view class="works_top_title">我的作品</view>
                        <view></view>
                    </view>
                    <view class="tag_list">
                        <view class="tag_scroll_box">
                            <view
                                  class="tag_item"
                                  v-for="(item) in data.tagList" :key="item.id"
                                  @click="clicktag(item)"
                                  :class="{ 'istag': data.istag == item.id }">
                                <text class="tag_item_text">{{ item.name }}</text>
                            </view>
                        </view>

                    </view>
                    <template v-if="data.dataList.length > 0">
                        <worksItem
                              v-for="(item,index) in data.dataList" :key="item.id"
                              :info="item"
                              :index="index"
                              :record="data.record"
                              @openoperation="openoperation"
                              @showPagebcNotify="showPagebcNotify"
                              ref="worksitem"
                        ></worksItem>
                    </template>
                    <template v-else>
                        <view class="not_data_box">
                            <image
                                  class="not_data_img"
                                  :src="getAssetsUrl('/empty/empty_icon_data.png')"
                                  mode="scaleToFill"
                            />
                            <text class="not_data_text"> 暂无数据~</text>
                        </view>
                        <!-- v-if="data.istag == 0" -->
                        <view class="notdata_toup" v-if="false" @click="toupArticle">发布作品</view>
                    </template>
                </view>


            </view>


            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>
        <TnPopup v-model="data.showPopup" @close="closePopup" open-direction="bottom">
            <view class="operation_box">
                <view class="operation_item_box">
                    <view class="operation_item" @click="Changeuparticle"
                          v-if="data.operationObj.status == 1 || data.operationObj.status == 3 || data.rejectObj.audit == 3 ">
                        <image
                              class="operation_img"
                              :src="getAssetsUrl('/leyou/create/creationPage-modify.svg')"
                              mode="scaleToFill"
                        />
                        <view class="operation_text">修改</view>
                    </view>
                    <view class="operation_item" @click="todel"
                          v-if="data.operationObj.status == 1 || data.operationObj.status == 3 || data.operationObj.status == 4 || data.operationObj.status == 5 || data.operationObj.status == 6">
                        <image
                              class="operation_img"
                              :src="getAssetsUrl('/leyou/create/creationPage-del.svg')"
                              mode="scaleToFill"
                        />
                        <view class="operation_text">删除</view>
                    </view>
                    <!-- <view class="operation_item" @click="tonewup" v-if="data.operationObj.status == 5">
                        <image
                            class="operation_img"
                            :src="getAssetsUrl('/leyou/create/creationPage-auditing.svg')"
                            mode="scaleToFill"
                        />
                        <view class="operation_text">重新发布</view>
                    </view>
                    <view class="operation_item" @click="todelup" v-if="data.operationObj.status == 2">
                        <image
                            class="operation_img"
                            :src="getAssetsUrl('/leyou/create/creationPage-remove.svg')"
                            mode="scaleToFill"
                        />
                        <view class="operation_text">撤销</view>
                    </view> -->
                    <view class="operation_item" v-if="data.operationObj.status == 3" @click="share">
                        <image
                              class="operation_img"
                              :src="getAssetsUrl('/leyou/create/creationPage-share.svg')"
                              mode="scaleToFill"
                        />
                        <view class="operation_text">分享</view>
                    </view>

                    <view class="operation_item" v-if="data.rejectObj.audit == 3" @click="rejectItem">
                        <image
                              class="operation_img"
                              :src="getAssetsUrl('/leyou/create/creationPage-justUser.svg')"
                              mode="scaleToFill"
                        />
                        <view class="operation_text">驳回原因</view>
                    </view>
                    <!-- <view class="operation_item" @click="changeoneselfLook" v-if="data.operationObj.status == 3 || data.operationObj.status == 4 || data.operationObj.status == 6">
                        <image
                            class="operation_img"
                            :src="getAssetsUrl((data.operationObj.status != 6 && data.operationObj.status != 4) ? '/leyou/create/creationPage-justUser.svg' : '/leyou/create/creationPage-open.svg')"
                            mode="scaleToFill"
                        />
                        <view class="operation_text">{{ (data.operationObj.status != 6 && data.operationObj.status != 4) ? '仅我可见' : '公开可见' }}</view>
                    </view> -->
                </view>
                <view class="operation_bottom" @click="data.showPopup = false">取消</view>
            </view>
        </TnPopup>

        <TnPopup v-model="data.showReject">
            <view class="popup_box">
                <view class="popup_box_top">审核未通过</view>
                <view class="popup_box_content">{{ data.rejectObj.result }}</view>
                <view class="popup_box_bottom" @click="data.showReject = false">我知道了</view>
            </view>
        </TnPopup>


        <shareView ref="shareBox" @sharePage="sharePage" @sharePoster="sharePoster" :status="data.status"
                   :imgUrl="data.shareimgUrl"></shareView>
        <canvas class="bilvas" canvas-id="mycanvas" id="mycanvas" width="254" height="344"
                style="width:254px; height:344px"></canvas>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, defineExpose, nextTick, getCurrentInstance } from 'vue'
import { onShow, onShareAppMessage } from '@dcloudio/uni-app'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnNoticeBar from '@tuniao/tnui-vue3-uniapp/components/notice-bar/src/notice-bar.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
// import commentItem from './commentItem.vue'
import worksItem from './components/worksItem.vue'
import {
    homePage,
    myContentList,
    tDeleteContent,
    articlecancel,
    deleteContent,
    contentStatus,
    initFaceVerifyIdPlus,
    certificateByCertifyId,
    oneselfLook,

    retransmission,
    getnewContentList,
    delnewContent


} from '@/api/create-api'
import { activityList } from '@/api/service-api'

import { createTeam } from "@/api/nim-api"
import {
    gotoCommentSetting,
    gotoActivityIndex,
    gotoDraftList,
    gotoCreateSchool,
    gotouparticle,
    assistantDetail,
    gotodataManage,
    gotoActivityDetail,
    gotoNewUpcontentPage,
    gotowithdrawalIncome
} from '@/routes/create-routes'
import { gotoNoticeList, gotoChatPage } from '@/routes/nim-routes'
import { agoTime } from '@/common/formatTime'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'

import shareView from '@/pagesCnt/components/shareView/shareView.vue'

import { type MessageList, useNoticeList, SessionSDK } from '@bc/msg'
import { ROUTE_FLAG, routeTable } from '@/events/jump-events'
import { PlatformManage } from '@bc/sys'
import { drawBGIMG } from '@/libs/canvas-tools'
import { getQrcode } from "@/api/user-api"
import { pageController } from '@bc/uni-tools'


interface Props {
    contentId: string,
}

const props = defineProps<Props>()

interface Data {
    dataList: any,
    pageObj: any,
    getClient: string,
    stagingList: any,
    tagList: any,
    istag: number,
    record: number | string,
    articleId: string,
    resultBox: boolean,
    resultText: string,
    noticeData: any,
    noticeList: any,
    announcementList: any,
    showPopup: boolean,
    operationObj: any,
    operationIndex: number,
    shareimgUrl: string,
    status: number,
    showReject: boolean,
    rejectObj: any
}

const data = reactive<Data>({
    dataList: [],
    pageObj: {},
    getClient: 'WEIXIN',
    stagingList: [
        [
            { id: 1, name: '数据助手', src: '/create/data_icon.png' },
            { id: 2, name: '粉丝管理', src: '/create/fans_icon.png' },
            { id: 3, name: '活动广场', src: '/create/activity_icon.png' },
            { id: 4, name: '客服中心', src: '/create/customer_icon.png' }
        ],
        [
            { id: 5, name: '收益提现', src: '/create/incomeSonPage.svg' },
            { id: 6, name: '草稿箱', src: '/create/draftPage.svg' },
            { id: 7, name: '创作学堂', src: '/create/schoolPage.svg' },
            { id: 8, name: '评论权限', src: '/create/commentPage.svg' }
        ]
    ],
    tagList: [
        { name: '全部', id: 0 },
        { name: '已发布', id: 3 },
        { name: '审核中', id: 2 },
        { name: '未发布', id: 4 },
        { name: '未通过', id: 5 }
    ],
    istag: 0,
    record: 9999,
    articleId: '',
    resultBox: false,
    resultText: '',
    noticeData: [],
    noticeList: [],
    announcementList: [],
    showPopup: false,
    operationObj: {},
    operationIndex: 999,
    shareimgUrl: '',
    status: 1,
    showReject: false,
    rejectObj: {}
})

const paper = ref<MessageList>()

const formatTime = computed(() => (time: number) => {
    return agoTime(time)
})
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const getplatFrom = computed(() => {
    return () => {
        let platFrom = ''
        // #ifdef MP-WEIXIN
        platFrom = 'MP-WEIXIN'
        // #endif

        // #ifdef APP-PLUS
        platFrom = 'APP-PLUS'
        // #endif

        return platFrom
    }
})

const nowDay = computed(() => (time: number) => {
    const date = Math.floor(((new Date().getTime() / 1000) - time) / (60 * 60 * 24))
    return date + 1
})

const bcNotify = ref()

onMounted(() => {
    // #ifdef MP-WEIXIN
    data.getClient = 'WEIXIN'
    // #endif

    // #ifdef APP-VUE
    data.getClient = 'APP'
    // #endif

    // 乐悠平台创作公告：41
    paper.value = useNoticeList('41', 10, (res) => {

    })
    paper.value?.loadmore().then((res) => {
        data.noticeList = res
        res.map((item: any) => data.noticeData.push(item.attach.title))
    })
})


const paging = ref()
const queryList = (pageNumber: number, pageSize: number) => {
    if (pageNumber == 1) {
        homePage({}).then((res: any) => {
            data.pageObj = res
            if (res.isFrozen == 1) {
                uni.showModal({
                    title: '账号冻结',
                    content: '您的个体创作者账号因违规操作，现已被平台冻结，如有疑问请联系保椿生活客服：400-2132-1231咨询。',
                    showCancel: false,
                    success: function() {
                        pageController.back()
                    }
                })
            }
        })
        activityList({
            query: {
                platformType: 2,
                categoryId: null,
                isJoin: null,
                articleType: null,
                accountType: 2
            },
            pageNumber: 1,
            pageSize: 3
        }).then((res: any) => {
            data.announcementList = res.data
        })
    }
    // myContentList({
    getnewContentList({
        pageNumber,
        pageSize,
        query: {
            status: data.istag ? data.istag : null
        }
    }).then((res: any) => {
        (paging.value as any).complete(res.data)
    })

}

onShow(() => {
    if (paging.value) {
        (paging.value as any).reload()
    }
})

// 发布
const toupArticle = () => {
    gotouparticle({})
}

const toAuthentication = () => {
    if (data.getClient == 'WEIXIN') {
        bcNotify.value.show('因技术升级原因,请您前往保椿生活APP进行实名认证')
        return
    }

    // #ifdef APP-VUE
    const n = uni.requireNativePlugin('AP-FaceDetectModule')

    const platform = uni.getSystemInfoSync().platform

    let metaInfo = n.getMetaInfo()
    if (platform == 'ios') {
        metaInfo = JSON.stringify(metaInfo)
    }
    console.log('metaInfo', metaInfo)
    initFaceVerifyIdPlus({ metaInfo }).then((res: any) => {
        // this.certifyId = res.certifyId
        n.verify({ certifyId: res.certifyId }, (v: any) => {
            if (v.code == 1000) {
                console.log('人脸识别成功。。。请求接口', res.certifyId)
                certificateByCertifyId({
                    certifyId: res.certifyId
                }).then((res: any) => {
                    console.log('实名认证提交成功', res)
                    bcNotify.value.show(getResultString(v.code))
                }).catch((err: any) => {
                    console.log('实名认证提交失败', err)
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

const getResultString = (code: any) => {
    const statusCode = {
        1000: '认证成功',
        1001: '系统错误',
        1003: '验证中断',
        2002: '网络错误',
        2003: '客户端设备时间错误',
        2006: '认证失败'
    }
    return statusCode[code]
}

const gotoNoticeDetail = (index: number) => {
    const linkMark = data.noticeList[index].attach.linkMark

    const fun = routeTable[linkMark]
    if (!fun) {
        // bcNotify.value.error('当前路由不支持跳转')
        gotoNoticeList('41', '创作者公告')
        return
    }

    fun(data.noticeList[index].attach)
}

const clickNoticeList = () => {
    gotoNoticeList('41', '创作者公告')
}

const clickStagingList = (item: any) => {
    item.id == 1 && assistantDetail({})
    item.id == 2 && gotodataManage({ type: 2, isuser: 1 })
    item.id == 3 && gotoActivityIndex()
    // item.id == 5 && bcNotify.value.show('敬请期待')
    item.id == 5 && gotowithdrawalIncome()
    item.id == 6 && gotoDraftList()
    item.id == 7 && gotoCreateSchool()
    item.id == 8 && gotoCommentSetting(data.pageObj.commentSet + '')

    if (item.id == 4) {
        PlatformManage.getToken().then((token: any) => {
            createTeam({
                userId: token?.id,
                userName: token?.nickname,
                userThumb: token?.avatar,
                flag: 1, //1小程序用户，2服务人员
                shopId: token?.shopId ?? 0,
                type: 1 // 1平台，2店铺
            }).then((res) => {
                gotoChatPage({
                    to: res.tid,
                    scene: 'customer',
                    originPage: 'pagesCnt/pages/creative/creationPage'
                })
            }).catch((err) => {
                bcNotify.value.show(err.message)
            })
        })
    }
}

const clicktag = (item: any) => {
    data.istag = item.id;
    (paging.value as any).reload()

}

const openoperation = (item: any, index: number) => {
    console.log(item)
    data.showPopup = true
    data.operationObj = item
    data.operationIndex = index
    console.log('data.operationObj', data.operationObj, index)
    if (data.operationObj.audit.audit == 3) {
        data.rejectObj = item.audit
        console.log('审核未通过', data.rejectObj)

    }
}

const closePopup = () => {
    data.showPopup = false
    data.operationObj = {}
    data.operationIndex = 999
    data.rejectObj = {}
}

const todel = () => {

    // tDeleteContent({
    delnewContent({
        ids: [data.operationObj.audit.id]
    }).then(() => {
        bcNotify.value.show('删除成功')
        data.dataList.splice(data.operationIndex, 1)
        data.operationIndex = 999
        data.showPopup = false;
        (paging.value as any).reload()

    }).catch(() => {
        bcNotify.value.error('删除失败')
    })
}

const todelup = () => {
    articlecancel({
        articleId: data.operationObj.articleId
    }).then(() => {
        bcNotify.value.show('撤销成功')
        data.dataList.splice(data.operationIndex, 1)
        data.operationIndex = 999
        data.showPopup = false;
        (paging.value as any).reload()

    }).catch(() => {
        bcNotify.value.error('撤销失败')
    })
}

const tonewup = () => {
    contentStatus({
        articleId: data.operationObj.articleId,
        status: 2
    }).then(() => {
        bcNotify.value.show('提交审核成功')
        data.dataList.splice(data.operationIndex, 1)
        data.operationIndex = 999
        data.showPopup = false;
        (paging.value as any).reload()

    }).catch(() => {
        bcNotify.value.error('提交失败')
    })
}

const Changeuparticle = () => {
    // gotouparticle({
    //     articleId: data.operationObj.articleId,
    //     type: data.operationObj.type,
    //     ischange: 1
    // })
    gotoNewUpcontentPage({
        isChange: 1,
        editId: data.operationObj.audit.id
    })

    data.showPopup = false
}

// 未通过原因
const rejectItem = () => {
    data.showReject = true
}

const changeoneselfLook = () => {
    oneselfLook({
        articleId: data.operationObj.articleId,
        isOneselfLook: data.operationObj.status == 3 ? 1 : 0
    }).then((res: any) => {
        data.showPopup = false;
        (paging.value as any).reload()

    }).catch((err: any) => {
        bcNotify.value.error(err.message)

    })
}

const toActivityDetail = (item: any) => {
    gotoActivityDetail({ id: item.id, topic: item.topic })
}


// 获取实例this
const instance = getCurrentInstance()


const sharRetransmission = () => {
    retransmission({ articleId: data.operationObj.articleId }).then(() => {
    })
}

const shareBox = ref()
const share = () => {
    data.status = 1
    data.showPopup = false;
    (shareBox.value as any).open()
}
const sharePoster = async () => {

    const coverUrl = await drawBGIMG(data.operationObj.cover)
    // 二维码链接图片
    let qrimg = await getQrcode(`/pagesCnt/pages/articledetails/articledetails?id=${data.operationObj.articleId}`).then((img) => {
        return img
    })
    const qrimgUrl = await drawBGIMG(qrimg)

    if (qrimgUrl == '') {
        uni.showToast({
            icon: 'none',
            title: '生成二维码失败,请稍后重试'
        })
        return
    }

    let title = data.operationObj.title//标题
    let accountName = data.operationObj.accountName//作者，店铺名

    if (title.length > 8) {
        title = title.slice(0, 8) + "..."
    }
    if (accountName.length > 8) {
        accountName = accountName.slice(0, 8) + "..."
    }

    const context = uni.createCanvasContext('mycanvas', instance)


    context.clearRect(0, 0, 254, 344)
    // 背景白块
    context.setFillStyle('#ffffff')
    context.fillRect(0, 0, 254, 344)

    // 底部白块
    context.setFillStyle('#ffffff')
    context.fillRect(0, 258, 258, 94)

    // 底部文字
    context.setFillStyle('#333333')
    context.setFontSize(16)
    context.fillText(title, 12, 282)
    context.setFillStyle('#808080')
    context.setFontSize(14)


    // 二维码
    context.drawImage(qrimgUrl, 168, 260, 76, 76)

    context.fillText(accountName, 40, 324)
    context.setFillStyle('#999999')
    context.setFontSize(12)

    // 背景图片
    context.drawImage(coverUrl, 0, 0, 275, 255)


    context.save()
    context.arc(24, 320, 10, 0, Math.PI * 2)
    context.fill()//保证图片无bug填充
    context.clip()//画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内

    context.drawImage(coverUrl, 14, 310, 20, 20)
    context.restore()

    context.draw(
          false,
          setTimeout(async () => {
              console.log('instance123', instance)

              uni.canvasToTempFilePath({
                  canvasId: 'mycanvas',
                  success: (res: any) => {
                      data.shareimgUrl = res.tempFilePath
                      data.status = 2
                      title = ''
                      sharRetransmission()
                  },
                  fail: err => {
                      console.log(err)
                      uni.showToast({
                          icon: 'none',
                          title: '生成失败,请稍后重试'
                      })
                  },
                  complete: (ret) => {
                      console.log('生成中....')
                      uni.hideLoading()
                  }
              }, instance)
          }, 3000)
    )


}

// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: data.operationObj.cover,
        title: data.operationObj.title,
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/pagesCnt/pages/articledetails/articledetails?id=${data.operationObj.articleId}`, //点击链接进入的页面
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
    sharRetransmission()

    let shareObj = {
        title: data.operationObj.title,
        imageUrl: data.operationObj.cover,
        desc: '',
        path: `/pagesCnt/pages/articledetails/articledetails?id=${data.operationObj.articleId}`
    }

    return {
        ...shareObj
    }
})
//#endif


const showPagebcNotify = (text: string) => {
    bcNotify.value.error(text)
}


defineExpose({})

</script>


<style lang="scss" scoped>
.top_up_box {
    width: 100%;
    height: 116rpx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 30rpx;
    box-sizing: border-box;

    .top_btn {
        height: 52rpx;
        border-radius: 26rpx;
        color: #ffffff;
        font-size: 28rpx;
        display: flex;
        align-items: center;
        padding: 6rpx 20rpx;
        box-sizing: border-box;
        margin-left: 16rpx;

        &.up {
            background: #48db97;
        }

        &.draft {
            background: #C1CEC8;
        }

        .top_up_icon {
            width: 28rpx;
            height: 28rpx;
            margin-right: 6rpx;
        }
    }
}

.page_padding {
    padding: 0rpx 20rpx;
    box-sizing: border-box;

    .user_box {
        width: 100%;
        border-radius: 32rpx;
        background: #ffffff;
        margin-bottom: 20rpx;

        .user_top_box {
            position: relative;
            width: 100%;
            padding: 98rpx 0rpx 22rpx 40rpx;
            box-sizing: border-box;

            .user_top_img {
                width: 128rpx;
                height: 128rpx;
                border: 4px solid #FFFFFF;
                background: #fff;
                border-radius: 50%;
                position: absolute;
                top: -60rpx;
                left: 40rpx;
            }

            .user_name {
                color: #333333;
                font-weight: 600;
                font-size: 40rpx;
                margin-bottom: 8rpx;

            }

            .user_dace {
                color: #999999;
                font-size: 24rpx;

            }

            .is_name {
                position: absolute;
                top: 35rpx;
                right: 0rpx;
                background: linear-gradient(90deg, #FCEEE3 0%, #FFDCCE 100%);
                border-radius: 30rpx 0rpx 0rpx 30rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10rpx 28rpx;
                padding-right: 2rpx;
                box-sizing: border-box;
                color: #BC765D;
                font-size: 28rpx;

                &.is_true_name {
                    background: linear-gradient(90deg, #E1FFF1 0%, #C4F8E0 100%);
                }

                .is_name_text {
                    margin-right: 12rpx;

                    &.is_true_text {
                        color: #29C86F;
                    }
                }

            }
        }

        .user_top_data {
            width: 90%;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            border-top: 2rpx solid #F2F2F2;
            border-bottom: 2rpx solid #F2F2F2;

            .user_top_data_item {
                width: 32%;
                padding: 20rpx 0rpx 24rpx 0rpx;
                box-sizing: border-box;

                .user_top_data_title {
                    font-size: 26rpx;
                    color: #333333;
                    margin-bottom: 8rpx;
                    font-weight: 500;
                    text-align: center;
                }

                .user_top_number {
                    font-size: 44rpx;
                    color: #333333;
                    margin-bottom: 12rpx;
                    font-weight: 600;
                    text-align: center;
                }

                .yesterday_data {
                    color: #666666;
                    font-size: 24rpx;
                    text-align: center;
                }

            }

            .top_line {
                width: 2rpx;
                height: 100rpx;
                background: #F2F2F2;

            }
        }

        .notice {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 30rpx 0 30rpx 30rpx;
            box-sizing: border-box;

            .notice_tag {
                width: 72rpx;
                height: 40rpx;
                background: #FFF2DF;
                border-radius: 6rpx;
                color: #FF8000;
                font-size: 22rpx;
                text-align: center;
                line-height: 40rpx;

            }

            .noticeList_box {
                // display: flex;
                // align-items: center;
                // flex: 1;
                width: 88%;
                // border: solid 1rpx red;
                .emptyNotice {
                    margin-left: 20rpx;
                }
            }
        }
    }

    .staging_box {
        background: #ffffff;
        width: 100%;
        border-radius: 32rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        padding: 30rpx 50rpx;
        padding-bottom: 0rpx;
        box-sizing: border-box;
        margin-bottom: 20rpx;

        .staging_list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 30rpx;

            .staging_item {
                display: flex;
                flex-direction: column;
                align-items: center;

                .staging_img {
                    width: 92rpx;
                    height: 92rpx;
                    background: #fff;
                    border-radius: 12rpx;
                    margin-bottom: 16rpx;
                }

                .staging_text {
                    color: #1B1B1B;
                    text-align: center;
                    font-size: 24rpx;
                }

            }
        }


    }

    .swiper {
        margin-bottom: 20rpx;

        .swiper_item {
            width: 100%;
            height: 180rpx;

            .announcement_img {
                width: 100%;
                height: 100%;
                border-radius: 16rpx;
                overflow: hidden;
                box-sizing: border-box;
            }
        }
    }


    .creative_box {
        background: #ffffff;
        width: 100%;
        border-radius: 32rpx;
        padding: 30rpx 0rpx 30rpx 30rpx;
        box-sizing: border-box;
        margin-bottom: 20rpx;

        .creative_top_box {
            width: 100%;
            padding-right: 30rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24rpx;

            .creative_top_title {
                color: #0B0B0B;
                font-size: 32rpx;
                font-size: 600;
            }

            .creative_top_more {
                display: flex;
                align-items: center;

                .creative_top_more_text {
                    color: #ABABAB;
                    font-size: 24rpx;
                }
            }


        }

        .creative_scroll {
            width: 100%;
            overflow-x: scroll;
            display: flex;
            align-items: center;

            &::-webkit-scrollbar {
                display: none;
            }

            .creative_scroll_item {
                width: 220rpx;
                margin-right: 30rpx;
                border-radius: 12rpx;
                overflow: hidden;
                flex-shrink: 0;

                .img_box {
                    position: relative;
                    width: 100%;
                    height: 160rpx;
                    border-radius: 12rpx;
                    overflow: hidden;
                    flex-shrink: 0;
                    margin-bottom: 16rpx;

                    .creative_scroll_item_img {
                        width: 100%;
                        height: 100%;
                        margin-bottom: 16rpx;
                        background: #E6E6E6;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }

                    .flex_box {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: rgba(0, 0, 0, 0.1);
                        z-index: 10;

                        .play_icon {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 60rpx;
                            height: 60rpx;
                        }
                    }
                }

                .creative_scroll_item_text {
                    color: #1B1B1B;
                    font-size: 24rpx;
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                }
            }

        }
    }

    .my_works {
        background: #ffffff;
        width: 100%;
        min-height: 1200rpx;
        border-radius: 32rpx;
        padding: 30rpx;
        box-sizing: border-box;

        .works_top_box {
            width: 100%;
            padding-right: 30rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24rpx;

            .works_top_title {
                color: #0B0B0B;
                font-size: 32rpx;
                font-size: 600;
            }

            .works_top_more {
                display: flex;
                align-items: center;

                .works_top_more_text {
                    color: #ABABAB;
                    font-size: 24rpx;
                }
            }


        }

        .tag_list {
            width: 100%;
            margin-bottom: 10rpx;
            overflow-x: scroll;

            &::-webkit-scrollbar {
                display: none;
            }

            .tag_scroll_box {
                display: flex;
                align-items: center;
            }

            .tag_item {
                padding: 6rpx 24rpx;
                box-sizing: border-box;
                border-radius: 26rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 20rpx;
                white-space: nowrap;
                background: #F1F1F1;
                color: #666666;

                &.istag {
                    background: #F9E3E3;
                    color: #EA3E1A;
                }

                .tag_item_text {
                    font-size: 28rpx;
                }
            }
        }

        .positioning_box {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }

        .not_data_box {
            margin-bottom: 50rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .not_data_img {
                width: 280rpx;
                height: 280rpx;
            }

            .not_data_text {
                font-size: 28rpx;
                color: #999999;
            }
        }

        .notdata_toup {
            margin: auto;
            width: 280rpx;
            height: 68rpx;
            background: #fff;
            border: 2rpx solid #EA3E1A;
            text-align: center;
            line-height: 68rpx;
            color: #EA3E1A;
            font-size: 28rpx;
            border-radius: 34rpx;
        }
    }
}

.freeze_box {
    width: 580rpx;
    height: 412rpx;
    background: #FFFFFF;
    border-radius: 28rpx;
    padding: 40rpx 30rpx;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &.son_box {
        height: 412rpx;

    }

    .freeze_box_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 44rpx;

        .freeze_box_top_left {
            display: flex;
            align-items: center;

            .erro_icon {
                width: 40rpx;
                height: 40rpx;
                margin-right: 12rpx;
            }

            .erro_title {
                font-size: 32rpx;
                color: #333333;
            }

        }
    }

    .freeze_box_text {
        font-size: 28rpx;
        font-weight: 400;
        color: #666666;
    }

    .freeze_box_btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        bottom: 40rpx;
        left: 0;
        width: 100%;
        padding: 0rpx 20rpx;
        box-sizing: border-box;

        .back_btn {
            width: 250rpx;
            height: 80rpx;
            text-align: center;
            line-height: 80rpx;
            border: 2rpx solid #D4D4D4;
            color: #333333;
            font-size: 28rpx;
            box-sizing: border-box;
            background: #fff;
            border-radius: 42rpx;

        }

        .call_service {
            width: 250rpx;
            height: 80rpx;
            text-align: center;
            line-height: 80rpx;
            color: #fff;
            font-size: 28rpx;
            background: #29C86F;
            border-radius: 42rpx;

            &.is_out {
                width: 100%;

            }
        }
    }
}

.operation_box {
    .operation_item_box {
        padding: 40rpx 64rpx;
        box-sizing: border-box;
        padding-bottom: 0rpx;
        padding-right: 0rpx;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .operation_item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-right: 68rpx;
            margin-bottom: 30rpx;

            .operation_img {
                width: 100rpx;
                height: 100rpx;
                border-radius: 50%;
                background: #EEEEEE;
                margin-bottom: 20rpx;
            }

            .operation_text {
                font-weight: 400;
                font-size: 28rpx;
                color: #666666;
                text-align: center;
            }
        }
    }

    .operation_bottom {
        box-sizing: border-box;
        text-align: center;
        font-weight: 400;
        font-size: 32rpx;
        color: #333333;
    }
}

.popup_box {
    width: 500rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 40rpx;
    box-sizing: border-box;

    .popup_box_top {
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
        text-align: center;
        margin-bottom: 24rpx;
    }

    .popup_box_content {
        font-size: 28rpx;
        font-weight: 400;
        color: #333333;
        line-height: 44rpx;
        margin-bottom: 60rpx;
        text-align: center;
    }

    .popup_box_bottom {
        padding: 16rpx 0rpx;
        box-sizing: border-box;
        text-align: center;
        background: #F0F0F0;
        border-radius: 36rpx;
        font-size: 28rpx;
        color: #666666;
    }
}

.bilvas {
    border-radius: 20rpx;
    position: relative;
    left: -750px;
}
</style>
