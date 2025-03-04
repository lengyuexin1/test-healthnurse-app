<template>
	<view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <PageTopbg bgstyle="background: transparent"></PageTopbg>
                <bc-page-navbar :title="'老友中心'" :bgColor="'#29C86F'" :iconColor="'#FFFFFF'" :textColor="'#FFFFFF'"></bc-page-navbar>
            </template>
            
            <view class="friend_box">
                <view class="friend_top_box" @click="sharePage">
                    <view class="top_title">{{ data.myenjoyObj.cntMember }}位老友可见</view>
                    <view class="invitation_btn">邀请微信好友</view>
                    <!-- #ifdef MP-WEIXIN -->
                    <button open-type="share" v-if="data.myenjoyObj.permission && data.myenjoyObj.permission.isInvite == 1"></button>
                    <button @click="notInvite" v-else></button>
                    <!-- #endif -->
                </view>
                <view class="friend_list">
                    <view class="friend_item" v-for="item in data.friendList" :key="item.id">
                        <image
                            class="friend_img"
                            :src="item.thumb"
                            mode="scaleToFill"
                        />
                        <view class="friend_name">{{ item.name }}</view>
                    </view>
                </view>
            </view>

            <view class="operation_box">
                <view class="operation_item" v-for="(item, index) in data.operationList" :key="index">
                    <view class="son_operation" :class="{ 'have_border' : sonIndex % 2 == 1 }" v-for="(sonItem, sonIndex) in item" :key="sonItem.id" @click="operationFun(sonItem)">
                        <view class="operation_left">
                            <image  
                                v-if="sonItem.icon"
                                class="operation_icon"
                                :src="getAssetsUrl(sonItem.icon)"
                                mode="scaleToFill"
                            />
                            <view class="operation_title">{{ sonItem.name }}</view>
                        </view>
                        <TnIcon name="right" color="#999999" size="28"/>
                    </view>
                </view>
            </view>
            

            
		</z-paging>

        <BCNotify ref="bcNotify"></BCNotify>
        <TnPopup v-model="data.showPopup" open-direction="bottom" radius="24rpx">
            <view class="popup_box">
                <view class="popup_item" @click="opencamera">拍照</view>
                <view class="popup_item" @click="openAuth">从手机相册中选择</view>
                <view class="popup_item" @click="changeBG(getAssetsUrl('/leyou/create/enjoyBG.png'))">恢复默认背景</view>
            </view>
        </TnPopup>

        <imgCutter @ok="onok" @cancel="oncancle" :url="data.imgurl" :fixed="true" :blob="false" :maxWidth="500"
        :maxHeight="500"></imgCutter>

        <yk-authpup ref="cameraUp" :isNativeHead="false" type="top" @changeAuth="CameraAvatar" permissionID="WRITE_EXTERNAL_STORAGE"></yk-authpup>

        <yk-authpup ref="albumUp" :isNativeHead="false" type="top" @changeAuth="AlbumAvatar" permissionID="WRITE_EXTERNAL_STORAGE"></yk-authpup>

        <TnPopup v-model="data.showSignout" radius="24rpx">
            <view class="sign_out_box">
                <view class="popup_box_top">{{ data.signoutType == 1 ? '确认退出?' : '确认解散?' }}</view>
                <view class="popup_box_bottom">
                    <view class="not_preserve" @click="data.showSignout = false">取消</view>
                    <view class="preserve" @click="confirmFun">确定</view>
                </view>
            </view>
        </TnPopup>

	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow, onShareAppMessage } from "@dcloudio/uni-app"

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import imgCutter from './components/imgCutter.vue'
import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'
import { memberList, enjoydetail, editmember, removeEnjoy, leaveEnjoy } from '@/api/create-api'
import { gotocreateEnjoy, gotoEventList, gotoenjoyAlbum, gotoenjoySecurity } from "@/routes/create-routes"
import { uploadUserBg } from '@/api/file-api'
import { PlatformManage } from "@bc/sys"
import { gotoIndex } from "@/routes/public-routes"


interface Data {
    operationList: any
    friendList: any
    showPopup: boolean
    imgurl: string
    upimgUrl: string
    myenjoyObj: any
    showSignout: boolean
    signoutType: number
}

const data = reactive<Data>({
    operationList: [
        [
            { id: 1, icon: '/leyou/create/Memoirs_icon.svg', name: '大事记' },
            { id: 2, icon: '/leyou/create/album_icon.svg', name: '老友云相册' },
        ],
        [
            { id: 3, icon: '', name: '修改资料' },
            { id: 4, icon: '', name: '更换主页背景' },
        ],
        [
            { id: 5, icon: '', name: '安全保障' },
        ]
    ],
    friendList: [],
    showPopup: false,
    imgurl: '',
    upimgUrl: '',
    myenjoyObj: {},
    showSignout: false,
    signoutType: 1,
})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})



onLoad((options:any) => {
    memberList({
        query:{},
        pageNumber: 1,
        pageSize: 100,        
    }).then((res:any) => {
        data.friendList = res.data
    }).catch((err:any) => {
        data.friendList = []
    })

    
    PlatformManage.getToken().then((userRes:any)=>{
        enjoydetail({}).then((res:any) => {
            
            data.myenjoyObj = res;
            console.log(data.myenjoyObj.createdId);
            console.log(userRes.id);
            
            if (data.myenjoyObj.createdId == userRes.id) {
                data.operationList[2].push(
                    { id: 6, icon: '', name: '解散圈子' },
                )
            }else{
                data.operationList[2].push(
                    { id: 7, icon: '', name: '退出圈子' },
                )
            }
        })
    })
})

onShow(() => {
})


const operationFun = (item:any) => {
    item.id == 1 && gotoEventList({})
    item.id == 2 && gotoenjoyAlbum({circleId: data.myenjoyObj.id})
    item.id == 3 && gotocreateEnjoy({ischange:1})
    item.id == 4 && changePopup()
    item.id == 5 && gotoenjoySecurity()
    item.id == 6 && signoutFun(2)
    item.id == 7 && signoutFun(1)
}

const signoutFun = (type:number) => {
    data.showSignout = true
    data.signoutType = type
}

const confirmFun = () => {
    data.signoutType == 1 ? toleaveEnjoy() : toremoveEnjoy()
}

const changePopup = () => {
    data.showPopup = true
}

const toremoveEnjoy = () => {
    data.showSignout = false
    removeEnjoy({}).then(()=>{
        bcNotify.value.show('解散成功')
        setTimeout(()=>{
            // uni.navigateBack()
            gotoIndex()
        },2000)
    }).catch((err:any) => {
        bcNotify.value.error(err)
    })
}

const toleaveEnjoy = () => {
    data.showSignout = false
    leaveEnjoy({}).then(()=>{
        bcNotify.value.show('退出成功')
        setTimeout(()=>{
            // uni.navigateBack()
            gotoIndex()
        },2000)
    }).catch((err:any)=>{
        bcNotify.value.error(err)
    })
}


const cameraUp = ref()
const albumUp = ref()

const opencamera = () => {
    data.showPopup = false
    // #ifdef APP-PLUS
    cameraUp.value.open()
    // #endif

    // #ifndef APP-PLUS
    CameraAvatar()
    // #endif
}

const openAuth = () => {
    data.showPopup = false
    // #ifdef APP-PLUS
    albumUp.value.open()
    // #endif

    // #ifndef APP-PLUS
    AlbumAvatar()
    // #endif
}

// 拍摄上传头像
const CameraAvatar = () => {
    uni.chooseImage({
        count: 1,
        sourceType: ['camera'],
        success: (rst) => {
            // 设置url的值，显示控件
            data.imgurl = rst.tempFilePaths[0]
        }
    })
}

// 相册上传头像
const AlbumAvatar = () => {
    uni.chooseImage({
        count: 1,
        sourceType: ['album'],
        success: (rst) => {
            // 设置url的值，显示控件
            data.imgurl = rst.tempFilePaths[0]
        }
    })
}

const oncancle = () => {
    data.imgurl = ""
}

const onok = (ev:any) => {
    uploadUserBg(ev.path).then((res: any) => {
        let dateTime = new Date().getTime()
        data.upimgUrl = `${res.url}?v=${dateTime}`
        changeBG(data.upimgUrl)

        oncancle()
    })
}

const changeBG = (img: string) => {
    enjoydetail({}).then((res:any) => {


        console.log('res',res);
        console.log({
            backgroundImage: img,
        });

        editmember({
            backgroundImage: img,
        }).then(()=>{
            data.showPopup = false
		    bcNotify.value.show('修改成功')
        }).catch((err:any)=>{
            data.showPopup = false
            bcNotify.value.error(err)
        })
    })
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

</script>

<style lang="scss" scoped>
.friend_box{
    padding: 48rpx 30rpx;
    padding-right: 0rpx;
    padding-bottom: 30rpx;
    box-sizing: border-box;
    background: #fff;
    margin-bottom: 20rpx;
    .friend_top_box{
        padding-right: 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40rpx;
        position: relative;
        button{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            z-index: 30;
        }
        .top_title{
            font-weight: 500;
            font-size: 32rpx;
            color: #333333;
        }
        .invitation_btn{
            padding: 12rpx 20rpx;
            box-sizing: border-box;
            background: #29C86F;
            border-radius: 30rpx;
            font-weight: 400;
            color: #FFFFFF;
            font-size: 24rpx;
        }
    }
    .friend_list{
        overflow-x: scroll;
        display: flex;
        align-items: center;
        .friend_item{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-right: 50rpx;
            .friend_img{
                width: 112rpx;
                height: 112rpx;
                border-radius: 50%; 
                border: 4rpx solid #A9E8C4;
                margin-bottom: 8rpx;
            }
            .friend_name{
                width: 112rpx;
                white-space: nowrap; 
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 28rpx;
                color: #3A3A3A;
                text-align: center;
            }
        }
    }
}
.operation_box{
    width: 100%;
    .operation_item{
        width: 100%;
        padding: 0rpx 30rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        margin-bottom: 20rpx;
        .son_operation{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 30rpx 0rpx;
            box-sizing: border-box;
            &.have_border{
                border-top: 2rpx solid #F2F2F2;
            }
            .operation_left{
                display: flex;
                align-items: center;
                .operation_icon{
                    width: 36rpx;
                    height: 36rpx;
                    margin-right: 8rpx;
                }
                .operation_title{
                    font-size: 30rpx;
                    color: #333333;
                }
            }
        }
    }
}
.popup_box{
    box-sizing: border-box;
    background: #fff;
    .popup_item{
        padding: 30rpx 0rpx;
        text-align: center;
        box-sizing: border-box;
        border-bottom: 2rpx solid #F0F0F0;
        font-size: 36rpx;
        color: #333333;
    }
}
.sign_out_box{
    width: 500rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 50rpx 0rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    .popup_box_top{
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
        text-align: center;
        margin-bottom: 50rpx;
    }  
    .popup_box_bottom{
        width: 100%;
        border-top: 2rpx solid #F0F0F0;
        display: flex;
        align-items: center;
        .not_preserve{
            padding: 22rpx 0rpx;
            box-sizing: border-box;
            text-align: center;
            font-weight: 400;
            font-size: 28rpx;
            color: #666666;
            width: 100%;
        }
        .preserve{
            padding: 22rpx 0rpx;
            box-sizing: border-box;
            text-align: center;
            font-weight: 400;
            font-size: 28rpx;
            color: #399BFC;
            width: 100%;
            border-left: 2rpx solid #F0F0F0;
        }

    }
}
</style>
<style>
page{
    background: #F9F9F9;
}
</style>