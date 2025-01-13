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
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
		>
            <template #top>
                <PageTopbg :zIndex="-1" :bgstyle="'background:linear-gradient(180deg, #FDD9CD 20%, #F2F3F5 100%)'"></PageTopbg>
                <bc-page-navbar :title="'个人主页'">
                    <template #back>
                        <view @click="goback" class="nav_back">
                            <TnIcon name="left" size="38" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>

                <view class="flex_author_box">
                    <view class="author_box">
                        <image
                            class="author_img"
                            :src="data.homeObj.avatar"
                            mode="scaleToFill"
                        />
                        <view class="author_right_box">
                            <view class="author_name_box">
                                <view class="name_box">
                                    <view class="author_name">{{ data.homeObj.name }}</view>
                                    <!-- IP属地: 广东 -->
                                    <view class="author_ip"></view>
                                </view>
                                <view class="btn_box" v-if="!data.pageisuser">
                                    <view class="btn chat_btn" :class="{'is_fanschat' : data.pageFanstype }" @tap="clickPrivateLetter">私信</view>
                                    <view class="btn follow_btn" :class="{ 'is_fans' : data.pageFanstype }" @click="toFans">
                                        {{ data.pageFanstype ? '已关注' : '关注' }}
                                    </view>
                                </view>
                                <view v-else></view>
                            </view>
                        </view>
                    </view>
                    <view class="author_desc" v-if="data.homeObj.accountDescription">{{ data.homeObj.accountDescription }}</view>
                    <view class="data_box">
                        <view class="left_data_box">
                            <view class="data_item_box" @click="todataManage(1)">
                                <view class="data_item_box_number">{{ data.homeObj.cntFollow }}</view>
                                <view class="data_item_box_text">
                                    <view class="data_item_text">关注</view>
                                </view>
                            </view>
                            <view class="data_item_box" @click="todataManage(2)">
                                <view class="data_item_box_number">{{ data.homeObj.totalFans }}</view>
                                <view class="data_item_box_text">
                                    <view class="data_item_text">粉丝</view>
                                </view>
                            </view>
                            <view class="data_item_box">
                                <view class="data_item_box_number">{{ data.homeObj.cntLike }}</view>
                                <view class="data_item_box_text" style="border-right:none">
                                    <view class="data_item_text">获赞数</view>
                                </view>
                            </view>
                        </view>
                        
                        <view class="right_data_box" @click="data.showTouch = true">
                            <TnIcon name="more-horizontal" color="#7E7E7E" size="42" :bold="true"/>
                        </view>
                        
                        
                    </view>
                </view>

                <view class="nav_box">
                    <TnTabs
                        v-model="data.navIndex"
                        color="#fff"
                        :scroll="true" 
                        bg-color="#fff" 
                        bar-color="#EA3E1A" 
                        :bottom-shadow="false"
                    >
                        <TnTabsItem
                        v-for="(item, index) in data.tagList"
                        :key="index"
                        :title="item.name"
                        font-size="28rpx"
                        active-color="#333333"
                        color="#999999"
                        @click="tabsclick(item)"
                        />
                    </TnTabs>
                    
                </view>

            </template>
            <template v-if="(data.tagId == 3 && (data.dataList.length == 0 && data.salonList.length == 0)) || (data.tagId != 3 && data.dataList.length == 0 )">
                <view class="not_data_box">
                    <image
                        class="not_data_img"
                        :src="getAssetsUrl('/empty/empty_icon_data.png')"
                        mode="scaleToFill"
                    />
                    <view class="not_data_text">
                        暂无内容~
                    </view>
                </view>
            </template>
            <template v-else>
                <!-- data.tagId == 0 || data.tagId == 1 || data.tagId == 4 -->
                <view class="works_list" v-if=" data.tagId != 2 && data.tagId != 3 ">
                    <view class="works_item" v-for="item in data.dataList" :key="item.id" @click="toArticledetails(item)">
                        <view class="works_item_text">
                            <view class="works_item_title">{{ item.title }}</view>
                            <view class="works_item_number_box">
                                <view class="read">阅读{{ item.cntLook }}</view>
                                <view class="comment">评论{{ item.cntComment }}</view>
                                <view class="time">{{ formatTime(item.utcExamined) }}</view>
                            </view>
                        </view>
                        <view class="works_item_img_box">
                            <image
                                class="works_item_img"
                                :src="item.cover"
                                mode="aspectFill"
                            />
                            <view class="works_item_play_box" v-if="item.type == 2">
                                <image
                                    class="works_item_play_icon"
                                    :src="getAssetsUrl('/channel/play.svg')"
                                    mode="aspectFill"
                                />
                            </view>
                        </view>
                    </view>
                </view>
                <view v-if="data.tagId == 2">
                    <authorWaterFall :wfList="data.dataList"></authorWaterFall>
                </view>
                <view v-if="data.tagId == 3">
                    <authorSalon :dataList="data.dataList" :salonList="data.salonList"></authorSalon>
                </view>
            </template>
            
            

		    <BCNotify ref="bcNotify"></BCNotify>


            <TnPopup v-model="data.showTouch" open-direction="bottom" :zIndex="40080" radius="32">
				<view class="touch_box">
					<view class="touch_top_box">
						<view class="touch_item" @click="sharePage">
							分享
                            <!-- #ifdef MP-WEIXIN -->
                            <button open-type="share"></button>
                            <!-- #endif -->
						</view>
						<view class="touch_item" v-if="!data.pageisuser" @click="toReportPage" >
							举报
						</view>
					</view>
					<view class="touch_bottom_box">
						<view class="bottom_spage"></view>
						<view class="out_touch_btn" @click="cancelPopup">取消</view>
					</view>
				</view>
				<BCNotify ref="TouchbcNotify"></BCNotify>

			</TnPopup>

        </z-paging>
    </view>
</template>


<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { getAssetsPic } from '@/common/setPicture'
import { agoTime } from '@/common/formatTime'
import BCNotify from '@/components/notify/index.vue'
import authorWaterFall from '../components/authorWaterFall.vue'
import authorSalon from '../components/authorSalon.vue'

import { homePage, contentList, getcontentList, unfollow, follow, userLetterCreator, getJoinsalonList } from '@/api/create-api'
import { gotoChatPage } from '@/routes/nim-routes'
import { TempStorage } from "@bc/base"
import { 
    gotocourseVideo,
    gotosalonPostsDetailPage,
    gotovideoPreview,
    gotodataManage,
    gotoarticledetails,
    gotochatDetail,
    gotoReportPage
} from '@/routes/create-routes'
import { gotoIndex } from "@/routes/public-routes"

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import { Throttle } from '@/libs/antivibthrot'

interface Props {
    isuser:number,
    accountId:string,
    isFans:number
    taskId:string
    ismyFans: number
}
interface Events {
    (e: 'saveShareObj', obj: any): void
}
const props = defineProps<Props>()
const emit = defineEmits<Events>()

interface Data {
    dataList:any,
    salonList:any,
    tagList:any,
    navIndex:number,
    tagId:number,
    homeObj:any,
    pageFanstype:number,
    pageisuser:number,
    fansType:number,
    isuser: number,
    isFans: number,
	showTouch: boolean

}
const data = reactive<Data>({
    dataList:[],
    salonList:[],
    tagList:[
        {name:'全部',id:0},
        // {name:'康养百科',id:1},
        {name:'云课堂',id:2},
        {name:'沙龙',id:3},
        // {name:'聊天',id:4},
        // {name:'发现',id:5},
        // {name:'创意短片',id:6},
        {name:'作品',id: 98},
    ],
    navIndex:0,
    tagId:0,
    homeObj:{},
    pageFanstype:0,
    pageisuser:0,
    fansType:0,
    isuser: 0,
    isFans: 0,
	showTouch: false

})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})
const formatTime = computed(()=>(time:number)=>{
    return agoTime(time)
})



onMounted(() => {

    // if (isNaN(props.isFans)) {
    //     data.pageFanstype = 0
    // }else{
    //     data.pageFanstype = props.isFans
    // }
    if (isNaN(props.isuser)) {
        data.pageisuser = 0
    }else{
        data.pageisuser = props.isuser
    }

})

const paging = ref()

const queryList = (pageNumber:number, pageSize:number) => {
    console.log('data.pageisuser1',data.pageisuser);
    
    if (pageNumber == 1) {
        homePage({
            accountId: data.pageisuser ? null : props.accountId
        }).then((res:any)=>{
            data.homeObj = res
            data.pageFanstype = res.isFans
            data.pageisuser = res.isUser
            emit('saveShareObj',{
                imageUrl: data.homeObj.avatar,
            })
        }).catch(()=>{
	        bcNotify.value.show('账号查询失败')
            setTimeout(()=>{
                uni.navigateBack()
            },3000)
        })
    }
    console.log('data.pageisuser2',data.pageisuser);

    // data.pageisuser ? contentList({
    //     query: {
    //         happyType: data.tagId ? data.tagId : null,
    //         status:3,
    //         accountId: props.accountId
    //     },
    //     pageNumber,
    //     pageSize
    // }).then((res:any)=>{
    //     (paging.value as any).complete(res.data)

    // }):
    getcontentList({
        query: {
            happyType: data.tagId ? data.tagId : null,
            status:3,
            accountId: props.accountId
        },
        pageNumber,
        pageSize
    }).then((res:any) => {
        console.log('内容',res);
        res.data.forEach((item:any) => {
            item.cntLook = Math.floor(Math.random() * 900) + 100
            item.cntComment = Math.floor(Math.random() * 900) + 100
        });
        (paging.value as any).complete(res.data)
    })

    if (data.tagId == 3) {
        getJoinsalonList({
            query:{
                name:"",
                accountID:props.accountId
            },
            pageNumber: 1,
            pageSize: 50,
        }).then((res:any)=>{
            console.log('res',res);
            data.salonList = res.data
        })
    }
}

/**
 * 
 * @param item 
 * {name:'全部',id:0},
        {name:'康养百科',id:1},
        {name:'云课堂',id:2},
        {name:'沙龙',id:3},
        {name:'聊天',id:4},
 */
const toArticledetails = (item:any) => {
    
    console.log('item',item);
    if (item.moduleType == 98) {
        item.type == 3 && gotoarticledetails({
            id: item.id
        })
        item.type == 2 && gotovideoPreview({ videoId: item.id, videoPagetype: 2 })

        item.type == 1 && gotoarticledetails({ id: item.id })
        return
    }
    
    // item.moduleType == 1 && tochannelDetail(item);
    item.moduleType == 2 && tocourseVideo(item.id);
    item.moduleType == 3 && gotosalonPostsDetailPage({id:item.id});
    // item.moduleType == 4 && chatDetail(item);
    // item.moduleType == 5 && finDetail(item);
    // item.moduleType == 6 && gotovideoPreview({videoId:item.id,videoPagetype:3});
    
}


// 云课堂详情
const tocourseVideo = (id:string) => {
    const listId = TempStorage.savewx({
        videoIdlist:[id],
    })
    gotocourseVideo(listId)
}



const todataManage = (type:number) => {

    gotodataManage({
        type,
        isuser:String(data.pageisuser),
        accountId:props.accountId, 
    })
}

const bcNotify = ref()
const toFans = () => {
    if (data.pageFanstype == 0 ) {
        tofollow(props.accountId)
    }else{
        tounfollow(props.accountId)
    }
}
const tounfollow = (accountId:string) => {
    unfollow({
        accountId,
    }).then(()=>{
        data.pageFanstype = 0
	    bcNotify.value.show('取消成功')
    })
}
const tofollow = (accountId:string) => {
    console.log(props.taskId)
    follow({
        accountId,
        taskId:props.taskId,
    }).then(()=>{
        data.pageFanstype = 1
	    bcNotify.value.show('关注成功')

    }).catch((res)=>{   
        console.log(res);
	    bcNotify.value.error('不可以给本人点关注哦')

    })
}

const tabsclick = (item:any) => {

    console.log(item);
    data.tagId = item.id;
    (paging.value!).reload()
}

const clickPrivateLetter = () => {
    if (data.pageFanstype || props.ismyFans == 1) {
        Throttle(() => {
            userLetterCreator({ accountId: props.accountId }).then((res: any) => {
                gotoChatPage({
                    to: res.tid,
                    scene: 'privateMsg'
                })
            }).catch((err) => {
                bcNotify.value.error(err.message)
            })
        }, 2000)
    }else{
        bcNotify.value.show('请先关注')
    }
    
}

const goback = () => {
    
    const pages = getCurrentPages()
    console.log('pages',pages);

    if (pages.length == 1) {
        // data.backindex = true
        gotoIndex()
        return
    }
    uni.navigateBack()
}


const cancelPopup = () => {
	data.showTouch = false
}	

const toReportPage = () => {
	gotoReportPage({
		applicableTypes: 1,
		objectName: data.homeObj.name,
		toAccountId: data.homeObj.accountId,
        objectId: data.homeObj.accountId

	})
}

// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN
    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: data.homeObj.avatar,
        title: "邀请你添加好友",
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/pagesCnt/pages/author/author?accountId=${props.accountId}`, //点击链接进入的页面
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




</script>

<style lang="scss" scoped>
.nav_back {
    line-height: 34px;
    display: flex;
    align-items: center;
}
.flex_author_box{
    display: flex;
    flex-direction: column;
    padding: 40rpx;
    box-sizing: border-box;
    background: linear-gradient(180deg, transparent 50%, #F8F9F9 100%);
}
.author_box{
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    .author_img{
        width: 116rpx;
        height: 116rpx;
        border-radius: 50%;
        border: 5rpx solid #A4EBBA;
        margin-right: 20rpx;
    }
    .author_right_box{
        width: 76%;
        .author_name_box{
            display: flex;
            justify-content: space-between;
            margin-bottom: 30rpx;
            width: 100%;
            .name_box{
                width: 44%;
            }
            .author_name{
                font-size: 36rpx;
                color: #333333;
                font-weight: 500;
                margin-bottom: 8rpx;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .author_ip{
                color: #666666;
                font-size: 24rpx;
            }
            .btn_box{
                display: flex;
                align-items: center;
                .btn{
                    font-size: 24rpx;
                    text-align: center;
                    width: 120rpx;
                    height: 52rpx;
                    border-radius: 8rpx;
                    line-height: 52rpx;
                    &.chat_btn{
                        box-shadow: 0rpx 0rpx 16rpx rgba(0,0,0,0.04);
                        background: #F1F1F1;
                        color: #666666;
                        border: 2rpx solid #E3E3E3;
                        margin-right: 20rpx;
                    }
                    &.is_fanschat{
                        background: #FFFFFF;
                        color: #666666;
                        border: none;
                    }
                    &.follow_btn{
                        background: #29C86F;
                        color: #FFFFFF;
                    }
                    &.is_fans{
                        background: #FFE5E5;
                        color: #EA3E1A;
                    }
                }
                
            }
        }
        
    }
}

.data_box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .left_data_box{
        display: flex;
        align-items: center;
        .data_item_box{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20rpx;
            .data_item_box_number{
                color: #333333;
                font-size: 30rpx;
                margin-right: 10rpx;
            }
            .data_item_box_text{
                color: #333333;
                font-size: 26rpx;
                opacity: 0.6;
                padding-right: 24rpx;
                box-sizing: border-box;
                border-right: 2rpx solid #D8D8D8;
                
            }
        }  
    
    }
    .right_data_box{
        width: 54rpx;
        height: 54rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
     
}
.author_desc{
    font-size: 24rpx;
    color: #999999;
    margin-bottom: 30rpx;
}
.nav_box{
    border-bottom: 2rpx solid #F2F2F2;
    box-sizing: border-box;
    background: #fff;
    border-radius: 32rpx 32rpx 0rpx 0rpx;
    padding-left: 20rpx;
}
.works_list{
    padding: 0rpx 30rpx;
    box-sizing: border-box;
    background: #fff;
    .works_item{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 40rpx 0rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #F2F2F2;
        .works_item_text{
            flex: 1;
            height: 150rpx;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            
            .works_item_title{
                color: #333333;
                font-size: 28rpx;
            }
            .works_item_number_box{
                display: flex;
                align-items: center;
                color: #979797;
                font-size: 24rpx;
                .read{
                    margin-right: 14rpx;
                }
                .comment{
                    margin-right: 14rpx;
                }
                .time{
                    margin-right: 0rpx;
                }
            }
        }
        .works_item_img_box{
            position: relative;
            width: 226rpx;
            height: 150rpx;
            border-radius: 4rpx;
            overflow: hidden;
            .works_item_img{
                width: 100%;
                height: 100%;
                position:absolute;
                top: 0;
                left: 0;
            }
            .works_item_play_box{
                position:absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background-color: rgba(0, 0, 0, 0.2);
                z-index: 10;
                .works_item_play_icon{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 60rpx;
                    height: 60rpx;
                    z-index: 100;
                }
            }
        }
    }
}
.not_data_box{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40rpx;
    box-sizing: border-box;
    background: linear-gradient(180deg, #fff 70%, #F8F9F9 100%);
    .not_data_img{
        width: 320rpx;
        height: 320rpx;
        margin-bottom: 10rpx;
    }
    .not_data_text{
        font-size: 26rpx;
        color: #666666;
    }
}
.touch_box{
    width: 100%;
    background: #fff;
    .touch_top_box{
        .touch_item{
            padding: 32rpx;
            box-sizing: border-box;
            text-align: center;
            border-top: 2rpx solid #F2F2F2;
            border-bottom: 2rpx solid #F2F2F2;
            color: #333333;
            font-size: 32rpx;
            font-weight: 400;
            position: relative;
            button{
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                opacity: 0;
                z-index: 30;
            }
            &.del_btn{
                color: #EA3E1A;
            }
            
        }
        
    }
    .touch_bottom_box{
        .bottom_spage{
            width: 100%;
            height: 20rpx;
            background: #F8F8F8;
        }
        .out_touch_btn{
            padding: 32rpx;
            box-sizing: border-box;
            text-align: center;
            border-top: 2rpx solid #F2F2F2;
            color: #333333;
            font-size: 32rpx;
            font-weight: 400;
        }
    }
}
</style>
  