<template>
	<view class="container">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="6"
            :hide-empty-view="true"
            :auto-show-back-to-top="true"
        >
            <template #top>
                <PageTopbg bgstyle="background: transparent;"></PageTopbg>
                <bc-page-navbar :title="'享老记'">
                    <template #back>
                        <view @click="goback" class="back_icon">
                            <TnIcon name="left" size="38" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>
                <view class="top_user_box">
                    <view class="left_box">
                        <image
                            class="left_img"
                            :src="data.myenjoyObj.thumb"
                            mode="scaleToFill"
                        />
                        <view class="user_text">
                            <view class="user_name">{{ data.myenjoyObj.name }}的老友圈</view>
                            <view class="user_desc">{{ data.myenjoyObj.cntMember }}位好友可见</view>
                        </view>
                    </view>
                    <view class="right_box">
                        <view class="up_box" @click="upbtn">
                            <image
                                class="up_icon"
                                :src="getAssetsUrl('/leyou/create/enjoy_up_icon.svg')"
                                mode="scaleToFill"
                            />
                            <view class="up_text">发布</view>
                        </view>
                    </view>

                    <view class="top_fixed_box" @click="friendBtn">
                        <text class="fixed_text">老友中心</text>
                        <TnIcon name="right" color="#FFFFFF" size="20"/>
                    </view>
                </view>
                
                <view class="bg_box" :style="`background-image: url(${ data.myenjoyObj.backgroundImage ? data.myenjoyObj.backgroundImage : getAssetsUrl('/leyou/create/enjoyBG.png')})`"></view>

            </template>
            <view class="content_box">
                <!-- <view class="space_box"></view> -->
                <view class="nav_box">
                    <view class="nav_list">
                        <view class="nav_item" 
                        v-for="item in data.navList" :key="item.id" 
                        :class="{ 'is_select' : item.id == data.navId }" 
                        @click="navItemFun(item)">
                            {{ item.name }}
                        </view>
                    </view>
                    <view class="add_friend" @click="sharePage">
                        <TnIcon name="add" color="#FFFFFF" size="28"/>
                        <text class="add_friend_text">邀请微信亲朋好友</text>
                        <!-- #ifdef MP-WEIXIN -->
                        <button open-type="share" v-if="data.myenjoyObj.permission && data.myenjoyObj.permission.isInvite == 1"></button>
                        <button @click="notInvite" v-else></button>
                        <!-- #endif -->
                    </view>
                    
                </view>
                <view class="list_box" v-if="data.dataList.length != 0">
                    <view class="list_left_box">
                        <view class="leftBorder_box"></view>
                    </view>
                    <view class="list_right_box">
                        <enjoyCardItem 
                        ref="enjoyCardRef"
                        v-for="(item, index) in data.dataList" :key="item.id" 
                        :item="item"
                        :index="index"
                        :circleId="data.circleId"
                        :userId="data.userinfo.id"
                        :isLod="data.isLod"
                        @tolike="tolike"
                        @unlike="unlike"
                        @tocomment="tocomment"
                        @toedit="toedit"
                        @replyComment="replyComment"
                        @delcomment="delcomment"
                        @showImgDetail="showImgDetail"
                        ></enjoyCardItem>
                    </view>
                </view>

                <view class="not_data_box" v-else>
                    <view class="empty_box">
                        <image
                            class="empty_img"
                            :src="getAssetsUrl('/leyou/create/not_comment.svg')"
                            mode="scaleToFill"
                        />
                        <view class="empty_text">快来分享有趣生活</view>
                        <view class="empty_btn" @click="upbtn">发布</view>
                    </view>
                    
                </view>
            </view>
            


            
		</z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
        <view class="up_bottom_box" v-if="data.showBottom">
            <TnLoading show mode="flower" animation color="#FFFFFF" />
            <view class="bottom_text">正在为你发布享老记...</view>
            <TnCountDown 
                :time="5" 
                :show-day="false" 
                :show-hour="false" 
                :show-minute="false" 
                :show-second="true" 
                text-color="#FFFFFF"
                @end="endUp"
            />
            <view>s</view>
        </view>
        <TnPopup v-model="data.showTrue" >
            <view class="popupBox">
                <TnIcon name="success-circle-fill" size="100rpx" color="#2FD574"></TnIcon>
                <view class="up_text">发布成功</view>
                <view class="up_btn" @click="changeShowTrue">知道了</view>
            </view>
        </TnPopup>

        <!-- v-if="data.showtextbtn" -->
        <view class="keyboard_box" v-if="data.showtextbtn">
            <view class="keyboard_inp_box">
                <textarea
                    class="bottom_inp"
                    :auto-height="true"
                    :focus="data.showtextbtn"
                    :placeholder="data.placeholderText"
                    placeholder-style="color: #B5B5B5;line-height: 38rpx;"
                    v-model="data.textMsg"
                    @focus="openkeyboard"
                    @blur="closekeyboard"
                    @keyboardheightchange="changekeyboardH"
                    :show-confirm-bar="false"
                    cursor-spacing="20"
                    :adjust-position="false"
                    :auto-blur="true"
                />
                <view class="up_bottom_btn" @click="upComment">发送</view>
            </view>
            <view class="keyboard_space" :style="{ 'height': data.keyboardH + 'px' }"></view>
        </view>

        <TnPopup v-model="data.showAudit" :overlay-closeable="false">
            <view class="audit_box" v-if="data.showAudit">
                <view class="audit_top">
                    <view></view>
                    <view class="audit_title">审核提示</view>
                    <view @click="data.showAudit = false"><TnIcon name="close" size="32rpx" color="#333333"></TnIcon></view>
                </view>
                <view class="audit_content" >
                    您于{{ timeformat(data.myenjoyObj.audit.utcCreated) }}发布的内容存在法规行为，原因:{{ data.myenjoyObj.audit.result }}，现已隐藏该内容，请及时修改
                </view>
                <view class="audit_bottom">
                    <view class="bottom_btn to_del" @click="delFun">取消</view>
                    <view class="bottom_btn to_change" @click="tochange">去修改</view>
                </view>
            </view>
        </TnPopup>

        <TnPopup v-model="data.showDelPopup" :overlay-closeable="false">
            <view class="delPopup_box">
                <view class="delPopup_title">确定删除您的评论信息？</view>
                <view class="delPopup_bottom_box">
                    <view class="delPopup_bottom_item cancel" @click="cancelDel">取消</view>
                    <view class="delPopup_bottom_item determine" @click="determineDel">确定</view>
                </view>
            </view>
        </TnPopup>

	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick, watch } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnLoading from '@tuniao/tnui-vue3-uniapp/components/loading/src/loading.vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BCNotify from '@/components/notify/index.vue'
import enjoyCardItem from './components/enjoyCardItem.vue'
import { getAssetsPic } from '@/common/setPicture'
import { PlatformManage } from "@bc/sys"
import { gotoUpenjoyRecord, gotofriendCord, gotoEventList, gotoenjoyAlbum } from '@/routes/create-routes'
import { 
    enjoydetail,
    enjoysubmit,
    enjoyList,
    pushreview,
    pushrecover,
    livegetLike,
    liveunLike,
    contentdel,
    enjoydelComment,
} from '@/api/create-api'

import { TempStorage } from "@bc/base"
import { onShareAppMessage } from '@dcloudio/uni-app'
import { gotoIndex } from "@/routes/public-routes"
import { formattime } from '@/common/formatTime'


interface Data {
    navList: any,
    navId: number,
    dataList: any,
    myenjoyObj: any,
    upInfo: any,
    showBottom: boolean,
    uniqueId: string,
    showTrue: boolean,
    keyboardH: number,
    placeholderText: string,
    textMsg: string,
    showtextbtn: boolean,
    storageObj: any,
    storageIndex: number,
    circleId: string,
    userinfo: any,
    replyObj: any,
    isReply: boolean,
    isTop: boolean,
    showAudit: boolean,
    showDelPopup: boolean,
    delCommentObj: any,
    delCommentType: number,
    isLod: boolean,
    toload: boolean,
}

const data = reactive<Data>({
    navList: [
        { id: 1, name: '首页' },
        { id: 2, name: '大事记' },
        { id: 3, name: '老友云相册' },
    ],
    navId: 1,
    dataList: [],
    myenjoyObj: {},
    upInfo: {},
    showBottom: false,
    uniqueId: '',
    showTrue: false,
    keyboardH: 0,
    placeholderText: '写下你的评论吧',
    textMsg: '',
    showtextbtn: false,
    storageObj: {},
    storageIndex: 0,
    circleId: '',
    userinfo: {},
    replyObj: {},
    isReply: false,
    isTop: false,
    showAudit: false,
    showDelPopup: false,
    delCommentObj: {},
    delCommentType: 0,
    isLod: false,
    toload: true,
})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY年MM月DD日')
})


watch(() => data.myenjoyObj, (newVal, oldVal) => {
    console.log('newVal',newVal);
    // if (newVal.audit && newVal.audit.audit == 3) {
    //     setTimeout(() => {
    //         data.showAudit = true
    //     }, 3000);
    // }
}, { immediate: false, deep: true })

onLoad((options:any) => {
    PlatformManage.getToken().then((res:any)=>{
        data.userinfo = res
        console.log('获取info',data.userinfo);
    })
})

onShow(() => {
    const enjoyUpObj = uni.getStorageSync('enjoyUpObj')
    data.uniqueId = enjoyUpObj.uniqueId

    console.log('enjoyUpObj',enjoyUpObj);
    

    if (data.uniqueId) {
        data.showBottom = true
        console.log('data.showBottom',data.showBottom);
        
    }
    if (data.toload) {
        paging.value.reload()        
    }
    data.toload = true

})

onMounted(()=>{
})


const queryList = async (pageNumber: number, pageSize: number) => {
    if (pageNumber == 1) {
        await enjoydetail({}).then((res:any) => {
            console.log('res',res);
            data.myenjoyObj = res;
            data.circleId = res.id;
            
        })
    }
    await enjoyList({
        pageNumber,
        pageSize,
        query:{
            tagId: null,
        }
    }).then((res:any) => {
        paging.value.complete(res.data)
        data.isLod = !data.isLod;
        console.log('享老记data.dataList',data.dataList);
        console.log('享老记res.data',res.data);
        
    })

    if (data.myenjoyObj.audit && data.myenjoyObj.audit.audit == 3) {
        setTimeout(() => {
            data.showAudit = true
        }, 4000);
    }

}


const endUp = () => {
    data.showBottom = false
    uni.setStorageSync('enjoyUpObj',{})

    const tempStorage = new TempStorage()
    tempStorage.get(data.uniqueId).then((res:any) => {
        console.log('res1111',res);

        enjoysubmit({...res}).then((Objres:any)=>{
            data.showTrue = true;
            reloadPage();

        }).catch((err:any)=>{
            // bcNotify.value.error(err)
            console.log('err',err);
            bcNotify.value.error(err.message)
        })
    
    }).catch(() => {
        setTimeout(() => {
            console.log('获取信息失败');
        }, 1000)
    })
}



const upbtn = () => {
    if (data.myenjoyObj.permission.isRecord != 1) {
        bcNotify.value.show('没有记录权限');
        return
    }
    gotoUpenjoyRecord({})
}

const friendBtn = () => {
    gotofriendCord()
}


const tolike = (item:any, index:number) => {
    data.storageIndex = index

    livegetLike({
        articleId: item.id
    }).then((res:any) => {

        item.isLike++;
        enjoyCardRef.value[data.storageIndex] && enjoyCardRef.value[data.storageIndex].getlikeList()
        
        bcNotify.value.show('点赞成功');
    }).catch((err:any)=>{
        bcNotify.value.error(err)
    })

    console.log('tolike',item);
}

const unlike = (item:any, index:number) => {
    data.storageIndex = index

    liveunLike({
        articleIds: [item.id]
    }).then((res:any) => {
        item.isLike--;
        enjoyCardRef.value[data.storageIndex] && enjoyCardRef.value[data.storageIndex].getlikeList()

        bcNotify.value.show('取消成功');
    }).catch((err:any)=>{
        bcNotify.value.error(err)
    })

    console.log('unlike',item);
}

const tocomment = (item:any, index:number) => {
    data.showtextbtn = true
    data.storageObj = item
    data.storageIndex = index

}

const replyComment = (item:any, index:number, commentItem:any, isTop: boolean) => {
    data.showtextbtn = true
    data.storageObj = item
    data.storageIndex = index
    data.replyObj = commentItem
    data.isReply = true
    data.isTop = isTop
    data.placeholderText = '回复' + commentItem.name
}

const toedit = (item:any, index:number) => {
    data.storageIndex = index
    console.log('toedit',item);
    gotoUpenjoyRecord({
        auditId: item.audit.id,
        type: item.audit.type,
        ischange: 1,
    })
}

const enjoyCardRef = ref()

const upComment = () => {
    console.log('enjoyCardRef',enjoyCardRef);
    console.log('data.storageObj',data.storageObj);
    console.log('data.textMsg',data.textMsg);
    console.log('data.storageIndex',data.storageIndex);
    
    if (!data.textMsg) {
        bcNotify.value.show('请输入评论内容')
        
    }

    data.isReply ? pushrecover({
        commentId: data.isTop ? data.replyObj.topCommentId : data.replyObj.commentId,
        replyId: data.replyObj.commentId,
        replyUserId: data.replyObj.userId,
        replyUser: data.replyObj.name,
        quoteComment: data.replyObj.comment ? data.replyObj.comment : data.replyObj.replyComment,
        content: data.textMsg,
        articleId: data.storageObj.id,
    }).then(()=>{
        console.log('data.storageIndex',data.storageIndex);

        enjoyCardRef.value[data.storageIndex] && enjoyCardRef.value[data.storageIndex].getcommentList()
    }).catch((err:any)=>{
        bcNotify.value.error(err)
    }) : pushreview({
        articleId: data.storageObj.id,
        content: data.textMsg,
        isAuthor: 0,
    }).then(()=>{
        console.log('data.storageIndex',data.storageIndex);

        enjoyCardRef.value[data.storageIndex] && enjoyCardRef.value[data.storageIndex].getcommentList()
    }).catch((err:any)=>{
        bcNotify.value.error(err)
    })
    
}

const delcomment = (item: any, index:number, isComment: number) => {
    console.log('item,isComment',item,isComment);
    data.showDelPopup = true
    data.storageIndex = index
    data.delCommentObj = item
    data.delCommentType = isComment
    
}

const cancelDel = () => {
    data.showDelPopup = false
    data.delCommentObj = {}
    data.delCommentType = 0
}

const determineDel = () => {
    data.showDelPopup = false

    enjoydelComment({
        id: data.delCommentObj.commentId,
        isComment: data.delCommentType
    }).then(()=>{
        console.log('data.storageIndex',data.storageIndex);
        
        enjoyCardRef.value[data.storageIndex] && enjoyCardRef.value[data.storageIndex].getcommentList()
        data.delCommentObj = {}
        data.delCommentType = 0
        bcNotify.value.show('删除成功')

    }).catch((err:any)=>{
        bcNotify.value.error(err)
    })
}


// 评论框获取焦点
const openkeyboard = (event:any) => {
    data.keyboardH = event.detail.height + 18
}

// 键盘高度变化事件
const changekeyboardH = (event:any) => {
    data.keyboardH = event.detail.height + 18;
}

// 评论框获取失去焦点
const closekeyboard = () => {
    // click事件比change事件先触发
    setTimeout(() => {
        data.keyboardH = 0
        data.showtextbtn = false
        data.textMsg = ''
        data.placeholderText = '写下你的评论吧'
        data.isReply = false
    }, 500)
}


// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    if (data.myenjoyObj.permission.isInvite != 1) {
        bcNotify.value.show('没有邀请权限');
        return
    }
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: data.myenjoyObj.thumb,
        title: data.myenjoyObj.name,
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/CreateSplit/pages/enjoyRecord/joinEnjoy?circleId=${data.myenjoyObj.id}&invitationName=${data.myenjoyObj.name}&nickName=${data.myenjoyObj.nickName}`, //点击链接进入的页面
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
onShareAppMessage((res:any)=>{
    console.log(`/CreateSplit/pages/enjoyRecord/joinEnjoy?circleId=${data.myenjoyObj.id}&invitationName=${data.myenjoyObj.name}&nickName=${data.myenjoyObj.nickName}`);
    
    return {
        title: '邀请你加入老友圈',
        imageUrl: data.myenjoyObj.thumb,
        desc: '邀请你加入老友圈',
        path: `/CreateSplit/pages/enjoyRecord/joinEnjoy?circleId=${data.myenjoyObj.id}&invitationName=${data.myenjoyObj.name}&nickName=${data.myenjoyObj.nickName}`,
    }
})

const notInvite = () => {
    if (data.myenjoyObj.permission.isInvite != 1) {
        bcNotify.value.show('没有邀请权限');
        return {}
    }
}
//#endif

const goback = () => {
    const pages = getCurrentPages()
    // if (pages.length == 2 || pages.length == 1) {
    if (pages.length == 1) {
        // data.backindex = true
        gotoIndex()
        return
    }

    if (pages.length == 2) {
        uni.navigateBack()
        return
    }

}

const navItemFun = (item:any) => {
    item.id == 1 && reloadPage()
    item.id == 2 && gotoEventList({})
    item.id == 3 && gotoenjoyAlbum({circleId: data.myenjoyObj.id})
}

const reloadPage = () => {
    paging.value.reload()
}

const changeShowTrue = () => {
    data.showTrue = false
    // paging.value.reload()
}

const delFun = () => {
    data.showAudit = false
    contentdel({
        ids: [data.myenjoyObj.audit.articleId]
    }).then(()=>{

    }).catch((err:any)=>{
        bcNotify.value.error(err)
    })
}

const tochange = () => {
    data.showAudit = false
    gotoUpenjoyRecord({
        auditId: data.myenjoyObj.audit.id,
        type: data.myenjoyObj.audit.type,
        ischange: 1,
    })
}

const showImgDetail = (load:boolean) => {
    data.toload = load
}

</script>

<style lang="scss" scoped>
.back_icon{
    height: 68rpx;
    display: flex;
}
.container{
    // height: 100%;
    position: relative;
    .up_bottom_box{
        position: fixed;
        bottom: 50rpx;
        left: 30rpx;
        width: 690rpx;
        height: 90rpx;
        background: #000000;
        border-radius: 46rpx;
        margin: auto;
        background-color: rgba(0,0,0,0.5);
        padding: 24rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-size: 30rpx;
        color: #FFFFFF;
        z-index: 1000;
        .bottom_text{
            font-size: 30rpx;
            color: #FFFFFF;
            font-weight: 400;
            margin-left: 18rpx;
        }
    }
    .popupBox{
        width: 500rpx;
        height: 420rpx;
        background: #FFFFFF;
        border-radius: 28rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50rpx 0rpx;
        padding-top: 70rpx;
        box-sizing: border-box;
        .up_text{
            margin-top: 16rpx;
            margin-bottom: 60rpx;
            font-weight: 400;
            font-size: 32rpx;
            color: #333333;
        }
        .up_btn{
            width: 372rpx;
            height: 80rpx;
            background: #EEEEEE;
            border-radius: 42rpx;
            font-size: 28rpx;   
            color: #3D3D3D;
            line-height: 80rpx;
            text-align: center;
        }
        
    }

    .keyboard_box{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #FFFFFF;
        .keyboard_inp_box{
            padding: 20rpx 30rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #FFFFFF;
            .bottom_inp{
                width: 528rpx;
                height: 70rpx!important;
                background: #F5F5F5;
                border-radius: 8rpx;
                padding: 16rpx 20rpx;

            }
            .up_bottom_btn{
                width: 136rpx;
                height: 70rpx;
                background: #29C86F;
                border-radius: 8rpx;
                font-weight: 400;
                font-size: 28rpx;
                color: #FFFFFF;
                text-align: center;
                line-height: 70rpx;
            }
            
        }
        .keyboard_space{
            width: 100%;
        }
    }
    
}
.bg_box{
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(270deg, #E5FFFB 0%, #DBEDF9 100%);
    width: 100%;
    height: 480rpx;
    z-index: -1;
    background-size: cover;
    background-repeat: no-repeat;
}
.content_box{
    background: linear-gradient(0deg, #FFFFFF 0%, #F8F9F9 100%);
    border-radius: 32rpx 32rpx 0rpx 0rpx;
    overflow: hidden;
    position: relative;
}
.top_user_box{
    display: flex;
    justify-content: space-between;
    padding: 12rpx 40rpx;
    padding-bottom: 32rpx;
    box-sizing: border-box;
    position: relative;
    .left_box{
        display: flex;
        align-items: center;
        padding: 38rpx 0rpx;
        box-sizing: border-box;
        .left_img{
            border: 5rpx solid #FFFFFF;
            width: 128rpx;
            height: 128rpx;
            margin-right: 30rpx;
            border-radius: 50%;
        }
        .user_text{
            .user_name{
                font-weight: 500;
                font-size: 40rpx;
                color: #333333;
                margin-bottom: 12rpx;
            }
            .user_desc{
                font-weight: 400;
                font-size: 28rpx;
                color: #666666;
            }
        }
    }
    .right_box{
        .up_box{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .up_icon{
                width: 52rpx;
                height: 52rpx;
                margin-bottom: 4rpx;
            }
            .up_text{
                font-weight: 400;
                font-size: 24rpx;
                color: #333333;
            }
        }
    }
    .top_fixed_box{
        position: absolute;
        right: 0rpx;
        bottom: 40rpx;
        padding: 12rpx 24rpx;
        padding-right: 10rpx;
        border-radius: 40rpx 0rpx 0rpx 40rpx;
        opacity: 0.74;
        background: #29C86F;
        display: flex;
        align-items: center;
        .fixed_text{
            font-weight: 400;
            font-size: 28rpx;
            color: #FFFFFF;
            margin-right: 10rpx;
        }

    }
}
// .space_box{
//     width: 100%;
//     height: 244rpx;
// }
.nav_box{
    padding: 28rpx 24rpx;
    padding-bottom: 38rpx;
    box-sizing: border-box;
    // position: absolute;
    // top: 0;
    // left: 0;
    .nav_list{
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;
        .nav_item{
            padding: 8rpx 14rpx;
            box-sizing: border-box;
            border-radius: 8rpx;
            font-weight: 400;
            font-size: 26rpx;
            color: #888888;
            background: #EFEFEF;
            margin-right: 16rpx;
            &.is_select{
                background: #E7F6EE;
                color: #29C86F;
            }
        }
    }
    .add_friend{
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 88rpx;
        background: #29C86F;
        border-radius: 12rpx;
        position: relative;
        .add_friend_text{
            font-size: 28rpx;
            color: #FFFFFF;
            font-weight: 400;
            margin-left: 8rpx;
        }
        button{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            z-index: 30;
        }
    }
}

.list_box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0rpx 20rpx;
    box-sizing: border-box;

    .list_left_box{
        padding-top: 24rpx;
        box-sizing: border-box;
        width: 26rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .leftBorder_box{
            width: 2rpx;
            height: 100%;
            border-left: 2rpx dashed #DFDFDF;
        }
    }
    .list_right_box{
        width: 662rpx;

    }
}

.not_data_box{
    width: 100%;
    height: 1000rpx;
    .empty_box{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .empty_img{
        width: 360rpx;
        height: 360rpx;
    }
    .empty_text{
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
        margin-bottom: 40rpx;
    }
    .empty_btn{
        width: 346rpx;
        height: 88rpx;
        border-radius: 46rpx;
        border: 2rpx solid #29C86F;
        font-size: 32rpx;
        font-weight: 400;
        color: #29C86F;
        text-align: center;
        line-height: 88rpx;
    }
}
.audit_box{
    width: 650rpx;
    background: #FFFFFF;
    border-radius: 40rpx;
    padding: 36rpx 40rpx;
    box-sizing: border-box;
    .audit_top{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 50rpx;
        .audit_title{
            color: #333333;
            font-size: 36rpx;
            font-weight: 500;
        }
    }
    .audit_content{
        font-size: 28rpx;
        color: #333333;
        line-height: 48rpx;
        font-weight: 400;
        margin-bottom: 60rpx;
    }
    .audit_bottom{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .bottom_btn{
            width: 270rpx;
            height: 90rpx;
            background: #E8E8E8;
            border-radius: 46rpx;
            font-size: 32rpx;
            text-align: center;
            line-height: 90rpx;
            &.to_del{
                color: #666666;
                background: #E8E8E8;
            }
            &.to_change{
                color: #FFFFFF;
                background: #29C86F;
            }
        }
    }
}
.delPopup_box{
    width: 540rpx;
    height: 226rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    .delPopup_title{
        padding: 50rpx 0rpx;
        text-align: center;
        box-sizing: border-box;
    }
    .delPopup_bottom_box{
        width: 100%;
        display: flex;
        align-items: center;
        border-top: 2rpx solid #F0F0F0;
        .delPopup_bottom_item{
            width: 49%;
            padding: 22rpx 0rpx;
            font-size: 28rpx;
            text-align: center;
            &.cancel{
                color: #666666;
                border-right: 2rpx solid #F0F0F0;
            }
            &.determine{
                color: #399BFC;
            }
        }
    }


}
</style>
<style>
page{
    height: 100%;
}
</style>
