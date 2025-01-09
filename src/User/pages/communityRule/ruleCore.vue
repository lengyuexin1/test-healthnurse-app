<template>
	<view class="container">
        <z-paging 
            ref="paging"
            v-model="data.recList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'规则中心'" ></bc-page-navbar>
            </template>
            <view class="page_content">
                <view class="fixed_box" @click="toruleList">
                    <text>
                        规则百科 
                    </text>                    
                    <TnIcon name="right" size="28rpx" color="#fff"/>
                </view>
                <!-- :src="getAssetsUrl('/leyou/my/communityRule.png')" -->
                <image
                    v-if="data.ruleObj"
                    class="rule_img"
                    :src="data.ruleObj.content"
                    mode="aspectFill"
                />
                <view class="notice_list">
                    <view class="notice_left">
                        <image
                            class="notice_img"
                            :src="getAssetsUrl('/leyou/my/Notice_icon.svg')"
                            mode="scaleToFill"
                        />
                        <view class="notice_title">违规公示</view>
                    </view>
                    <view class="swiper_notice">
                        <template v-if="data.noticeData.length != 0">
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
                            <view class="not_notice">--</view>
                        </template>
                    </view>
                </view>
                <view class="create_noticeList">
                    <view class="create_title">创作学堂</view>
                    <template v-if="data.recList.length">
                        <view class="create_item" v-for="item in data.recList" :key="item.id" @click="clickItem(item.id)">
                            <view class="item_top">
                                <view class="item_title">{{ item.title }}</view>
                                <TnIcon name="right" size="28rpx" color="#333333"/>
                            </view>
                            <image
                                class="item_img"
                                :src="item.cover"
                                mode="scaleToFill"
                            />
                        </view>
                    </template>
                    <template v-else>
                        <view class="not_data">
                            <image
                                class="not_img"
                                :src="getAssetsUrl('/empty/empty_icon_data.png')"
                                mode="scaleToFill"
                            />
                            <view class="not_text">没有创作学堂内容~</view>
                        </view>
                    </template>

                </view>
            </view>
            <template #bottom>
                <view class="bottom_box">
                    <view class="bottom_space"></view>
                    <view class="bottom_text">
                        <text>如有疑问，请联系</text>
                        <text class="customer_service" @click="chatPc">平台客服</text>
                    </view>
                    <view class="bottom_space"></view>
                </view>                    
            </template>
            
		</z-paging>

        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnNoticeBar from '@tuniao/tnui-vue3-uniapp/components/notice-bar/src/notice-bar.vue'

import { gotoruleList, gotoNoticeList } from "@/routes/user-routes"
import { ruleCategory, ruleList, ruleDetail } from '@/api/user-api'
import { schoolRecList } from '@/api/create-api'
import { gotoSchoolArticleDetail } from '@/routes/create-routes'
import { createTeam } from "@/api/nim-api"
import { PlatformManage } from '@bc/sys'
import { gotoChatPage } from "@/routes/nim-routes"

interface Data {
    noticeList: any
    noticeData: any
    ruleObj: any
    recList: any
}

const data = reactive<Data>({
    noticeList: [],
    noticeData: [],
    ruleObj: {},
    recList: [],
})

const bcNotify = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onLoad((options:any) => {
    getnoticeList()
    getRuleObj()
    
})

onShow(() => {
})

const paging = ref()
const queryList = (pageNumber: number, pageSize: number) => {
    schoolRecList({
        query: {
            categoryId: 28
        },
        pageNumber,
        pageSize
    }).then((res:any) => {
        // data.recList = res.data
        (paging.value as any).complete(res.data)

        console.log('data.recList',data.recList);
    })
}

// 公示列表
const getnoticeList = () => {
    ruleList({
        pageNumber: 1,
        pageSize: 10,
        query:{
            categoryId: 60
        }
    }).then((res:any) =>{
        data.noticeData = res.data.map((item:any) => {
            return item.title
        })
        console.log('data.noticeData',data.noticeData);
    })
}

// 公约详情
const getRuleObj = ()=>{
    ruleList({
        pageNumber: 1,
        pageSize: 10,
        query:{
            categoryId: 59
        }
    }).then((res:any) =>{
        data.ruleObj = res.data[0]
        console.log('data.ruleObj',data.ruleObj);
    })
}


const gotoNoticeDetail = (index:number) => {
    console.log('公告详情',index);
}
const clickNoticeList = () => {
    console.log('公告列表');
    gotoNoticeList()

}
const toruleList = () => {
    gotoruleList()
}

const clickItem = (id: string) => {
    gotoSchoolArticleDetail({ id })
}

const chatPc = () => {
    PlatformManage.getToken().then((token) => {
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
                scene: 'customer'
            })
        }).catch((err) => {
            bcNotify.value.show(err.message)
        })
    })
}

</script>

<style lang="scss" scoped>
.page_content{
    padding: 24rpx;
    box-sizing: border-box;
    position: relative;
    .rule_img{
        width: 100%;
        height: 240rpx;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
    }
    .notice_list{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 26rpx;
        box-sizing: border-box;
        border-radius: 16rpx;
        background: #fff;
        margin-bottom: 30rpx;
        .notice_left{
            display: flex;
            align-items: center;
            padding-right: 16rpx;
            border-right: 2rpx solid #DCDCDC;
            box-sizing: border-box;
            .notice_img{
                width: 30rpx;
                height: 30rpx;
                margin-right: 6rpx;
            }
            .notice_title{
                font-weight: 500;
                font-size: 28rpx;
                color: #EA3E1A;
            }
        }
        .swiper_notice{
            font-size: 28rpx;
            color: #666666;
            width: 72%;
        }
    }
    .create_noticeList{
        .create_title{
            font-weight: 500;
            font-size: 32rpx;
            color: #333333;
            margin-bottom: 16rpx;
        }
        .create_item{
            margin-bottom: 16rpx;
            border-radius: 16rpx;
            background: #fff;
            padding: 24rpx;
            box-sizing: border-box;
            width: 100%;
            .item_top{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 24rpx;
                .item_title{
                    font-size: 28rpx;
                    color: #333333;
                    font-weight: 500;
                }
            }
            .item_img{
                width: 100%;
                height: 200rpx;
                border-radius: 8rpx;
            }
        }
    }
    .fixed_box{
        position: absolute;
        top: 156rpx;
        right: -16rpx;
        padding: 10rpx 24rpx;
        box-sizing: border-box;
        background: linear-gradient( 90deg, #FF4040 0%, #FF8A72 100%);
        border-radius: 30rpx 0rpx 0rpx 30rpx;
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: #FFFFFF;
        font-weight: 400;
        z-index: 10;
    }

}
.bottom_box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 50rpx;
    box-sizing: border-box;
    .bottom_space{
        width: 30rpx;
        height: 2rpx;
        background: #CFCFCF;
    }
    .bottom_text{
        display: flex;
        align-items: center;
        font-size: 24rpx;
        color: #999999;
        margin: 0rpx 10rpx;
        .customer_service{
            color: #2CA3FF;
        }
    }
}
.not_data{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50rpx;
    box-sizing: border-box;
    .not_img{
        width: 320rpx;
        height: 320rpx;
        margin-bottom: 16rpx;
    }
    .not_text{
        font-size: 28rpx;
        color: #666666;
    }
}
</style>
<style>
page{
    background: #F8F8F8;
}
</style>