<template>
    <view class="container">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'个人信息'"></bc-page-navbar>
            </template>
            <view class="info">
                <view class="info-list" style="height: 150rpx;" @tap="openAuth">
                    <text class="info-list-title">头像</text>
                    <view class="info-list-right">
                        <view class="info-list-headerimg-box mr-10">
                            <image
                                class="info-list-headerimg"
                                :src="data.userinfo.avatar ? data.userinfo.avatar : getAssetsUrl('/leyou/static/default_avatar.png')"
                                mode="aspectFill"
                            />
                        </view>
                        <TnIcon name="right" color="#BEBEBE"/>
                    </view>
                </view>
                <view class="info-list">
                    <text class="info-list-title">昵称</text>
                    <view class="info-list-right">
                        <TnInput v-model="data.inputValue" :maxlength="15" placeholder="请输入昵称" size="sm" text-align="right" :border="false" clearable @blur="blur"/>
                    </view>
                </view>
                <view class="info-list">
                    <text class="info-list-title">生日</text>
                    <view class="info-list-right" @tap="modifyInfo('生日')">
                        <text class="info-list-right-character mr-10">{{ data.userinfo.birthday || '请选择'}}</text>
                        <TnIcon name="right" color="#BEBEBE"/>
                    </view>
                </view>
                <view class="info-list" v-if="data.userinfo.mobile">
                    <text class="info-list-title">手机</text>
                    <view class="info-list-right">
                        <text class="info-list-right-character mr-10">{{ changeStar(data.userinfo.mobile) }}</text>
                    </view>
                </view>
<!--                <view class="info-list">-->
<!--                    <text class="info-list-title">爱聊资料</text>-->
<!--                    <view class="info-list-right" @tap="clickLoveChatEditInfo">-->
<!--                        <text class="info-list-right-character mr-10">去修改</text>-->
<!--                        <TnIcon name="right" color="#BEBEBE"/>-->
<!--                    </view>-->
<!--                </view>-->
            </view>
            <view class="btn_box">
                <view class="btn" @click="save">
                    保存
                </view>
            </view>

            <yk-authpup ref="authpup" :isNativeHead="false" type="top" @changeAuth="uploadAvatar" permissionID="WRITE_EXTERNAL_STORAGE"></yk-authpup>
        </z-paging>

        <kps-image-cutter @ok="onok" @cancel="oncancle" :url="data.imgurl" :fixed="true" :blob="false" :maxWidth="500"
        :maxHeight="500"></kps-image-cutter>

        <!-- @confirm="save" -->
        <TnDateTimePicker v-model:open="data.show" v-model="data.userinfo.birthday" min-time="1960/1/1 00:00:00" :max-time="data.maxTime"></TnDateTimePicker>

        <BCNotify ref="bcNotify"></BCNotify>

    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

import { updateUserInfo, getDestroyInfo } from '@/api/user-api'
import { uploadUserAvatar } from '@/api/file-api'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"
import BCNotify from '@/components/notify/index.vue'
import kpsImageCutter from "@/pagesUser/components/kspImageCutter/kspImageCutter.vue"

import { PlatformManage } from "@bc/sys"
import { SessionSDK } from '@bc/msg'

import dayjs from "dayjs"


import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnDateTimePicker from '@tuniao/tnui-vue3-uniapp/components/date-time-picker/src/date-time-picker.vue'

import { gotoFillInfo } from '@/routes/user-routes'
import { getAssetsPic } from '@/common/setPicture'

interface Data {
    userinfo:any,
    quanxianShow: boolean,
    imgurl:string,
    show:boolean,
    inputValue:string,
    userToken:any,
    userList: any
    maxTime: any
}
const data = reactive<Data>({
    userinfo:{},
    quanxianShow: false,
    imgurl:'',
    show:false,
    inputValue:'',
    userToken:{},
    userList: [],
    maxTime: ''
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const changeStar = computed(()=>(tel:string)=>{
    const reg = /^(\d{3})\d{4}(\d{4})$/
    return String(tel).replace(reg, "$1****$2")
})

onMounted(() => {
    data.userList = uni.getStorageSync('userList') ? uni.getStorageSync('userList') : []
    data.maxTime = Date.now()
})
onLoad(()=>{
    getUserCheck()
})

// 获取用户个人信息
const getUserCheck = () => {
    getDestroyInfo().then(res => {
        data.userinfo = res
        data.inputValue = data.userinfo.nickname
        PlatformManage.getToken().then((res: any) => {
            data.userToken = res
        })
    }).catch(err => {
        PlatformManage.getToken().then((res: any) => {
            const userinfo = res
            data.userinfo = userinfo || {}
            data.inputValue = data.userinfo.nickname

        })

    })
}

const authpup = ref()

const openAuth = () => {
    // #ifdef APP-PLUS
    authpup.value.open()
    // #endif

    // #ifndef APP-PLUS
    uploadAvatar()
    // #endif
}

// 上传头像
const uploadAvatar = () => {
    uni.chooseImage({
        count: 1,
        sourceType: ['camera', 'album'],
        success: (rst) => {
            // 设置url的值，显示控件
            data.imgurl = rst.tempFilePaths[0]
        }
    })
}



const onok = (ev) => {
    uploadUserAvatar(ev.path).then((res: any) => {
        data.userinfo.avatar = `${res.url}?v=${dayjs().unix()}`

        // const newToken = {
        //     ...data.userToken,
        //     avatar: data.userinfo.avatar
        // }
        // PlatformManage.setToken(newToken).then(() => {
        //     /** 云信-更新用户名片 */
        //     SessionSDK.updateUserInfo({
        //         avatar: data.userinfo.thumb
        //     })
        // })
        oncancle()
    })
}


const bcNotify = ref()
const save = () => {

    console.log({
        avatar: data.userinfo.avatar,
        name: data.inputValue,
        birthday: data.userinfo.birthday || null
    });
    if (!data.inputValue.trim()) {
        bcNotify.value.show('昵称不能为空!')
        return
    }
    updateUserInfo({
        avatar: data.userinfo.avatar,
        name: data.inputValue,
        birthday: data.userinfo.birthday || null
    }).then((res)=>{
        const newToken = {
            ...data.userToken,
            nickname: data.inputValue,
            avatar: data.userinfo.avatar
        }

        const index = data.userList.findIndex((item: any) => {
            return item.id == newToken.id
        });
        data.userList.splice(index, 1, {
            ...data.userList[index],
            ...newToken,
        })
        uni.setStorageSync('userList', data.userList)

        PlatformManage.setToken(newToken).then(() => {
            bcNotify.value.show('修改成功')
            setTimeout(()=>{
                uni.navigateBack()
            },1000)
        })
    }).catch((err:any)=>{
        bcNotify.value.show(err)

    })
}

// const confirmTime = () => {
//     save()
// }

const oncancle = () => {
    data.imgurl = ""
}

const modifyInfo = (type) => {
    if (type == '生日') {
        data.show = true
        return false
    }
}
const blur = () => {

}

const clickLoveChatEditInfo = () => {
    gotoFillInfo()
}

</script>

<style lang="scss" scoped>
.showbox{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 1);
    z-index: 1000;
    text-align: center;
    line-height: 42rpx;
    font-size: 32rpx;
    .quanxianbox{
        padding: 50rpx;
    }
}
.container{
    background: linear-gradient(180deg, #DFF7EF 0%, #F3F4F6 20%);
}
	.info {
		// margin-top: 25rpx;
		padding: 0 25rpx;
		background-color: #fff;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;

        margin: 0 16rpx 16rpx;
        border-radius: 24rpx;

		&-list {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #F5F5F5;
			height: 100rpx;

			&-headerimg {
				// margin-left: auto;
				width: 100rpx;
				height: 100rpx;
				border-radius: 100%;
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}

			&-icon {
				margin-left: 15rpx;
			}

			&-title {
				font-size: 28rpx;
				color: #303133;
				width: 100rpx;
				font-weight: bold;
			}

			&-right {
				flex: 1;
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;

				&-character {
					color: #666666;
					font-size: 28rpx;
				}

				.mr-10 {
					margin-right: 10rpx;
				}
			}
		}
	}
    .btn_box {
		margin-top: 80rpx;
		padding: 0 30rpx;
        .btn{
            width: 100%;
            height: 90rpx;
            text-align: center;
            line-height: 90rpx;
            font-size: 32rpx;
            color: #FFFFFF;
            font-weight: 400;
            background: #EA3E1A;
            border-radius: 45rpx;
        }
    }
.info-list-headerimg-box{
    .info-list-headerimg{
        width: 100rpx;
        height: 100rpx;
    }
}
.info-list-title {
    width: 200rpx;
}
</style>

