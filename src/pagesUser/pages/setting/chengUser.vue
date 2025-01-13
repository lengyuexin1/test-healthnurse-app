<template>
	<view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'切换账号'" ></bc-page-navbar>
            </template>
            <view class="page_content">
                <view class="user_list_box">
                    <view class="user_item" :class="{ 'is_user' : data.userObj.id == item.id && data.enitUser }" v-for="item in data.userList" :key="item.id" @click="changeUser(item)">
                        <view class="item_left">
                            <image
                                class="user_img"
                                :src="item.avatar"
                                mode="scaleToFill"
                            />
                            <view class="user_text">
                                <view class="user_name">{{ item.nickname }}</view>
                                <view class="user_id">保椿号：{{ item.regCode ? item.regCode : 'ABCDEF' }}</view>
                            </view>
                        </view>
                        <view class="item_right" v-if="data.userObj.id == item.id">
                            <TnIcon name="success" color="#EA3E1A" size="40"></TnIcon>
                        </view>
                        <view v-else>
                            <view v-if="data.enitUser" class="del_btn" @click.stop="delUser(item)">移除</view>
                        </view>
                    </view>
                    <view class="add_user" @click="addUser">
                        <view class="add_icon">
                            <TnIcon name="add"></TnIcon>
                        </view>
                        <view class="add_text">添加账号</view>
                    </view>
                </view>
                <view class="bottom_text">添加账号后，可在本设备切换登录</view>
            </view>

            <template #bottom>
                <view class="bottom_box">
                    <view class="edit_user" :class="{ 'is_edit' : data.enitUser }" @click="editUser">
                        {{ data.enitUser ? '完成' : '账号管理' }}
                    </view>
                </view>
            </template>
            
            <TnPopup v-model="data.showPopup" open-direction="center" radius="24rpx">
                <view class="del_popup">
                    <view class="popup_text">
                        <view class="popup_title">确认提示</view>
                        <view class="popup_content">确认移除该账号？移除后将清除该账号在本设备的登录信息</view>
                    </view>
                    <view class="popup_bottom">
                        <view class="del_btn" @click="data.showPopup = false">取消</view>
                        <view class="confirm_btn" @click="todeluser">移除</view>
                    </view>
                </view>
            </TnPopup>     
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
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { PlatformManage } from '@bc/sys'
import { gotoLogin } from "@/routes/public-routes"
import { mutiMobileLogin } from '@/api/open-api'
import { addContentAccount } from '@/api/create-api'
import { SessionSDK } from '@bc/msg'

interface Data {
    userList: any
    userObj: any
    enitUser: boolean
    showPopup: boolean
    delUserObj: any
}

const data = reactive<Data>({
    userList: [],
    userObj: {},
    enitUser: false,
    showPopup: false,
    delUserObj: {}
})

const bcNotify = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onLoad((options:any) => {
    data.userList = uni.getStorageSync('userList')
    PlatformManage.getToken().then((token) => {
        data.userObj = token
        console.log('data.userObj',data.userObj);
        console.log('data.userList',data.userList);
        
    })
    
})

onShow(() => {
})

const changeUser = (item:any) => {

    if (data.enitUser) {
        return
    }

    Promise.all([PlatformManage.clearStoreAuthorize(), SessionSDK.logout()]).then(() => {
        console.log('清除im缓存');
        mutiMobileLogin({
            mobile: item.userMobile,
            platformType: 2
        }).then((res:any) => {
            let newObj = {
                ...res,
                city:'广州',
                cityId:11,
            }
            PlatformManage.setToken(newObj).then(() => {
                uni.setStorageSync('userHistory', [])
                
                bcNotify.value.success('登录成功')
                addContentAccount({}).then(()=>{})

                console.log('切换成功token',newObj);
                console.log('data.userList',data.userList);
                            
                setTimeout(()=>{
                    uni.navigateBack()
                },2000)
            })
        })
        
    }).catch((err: any) => {
        bcNotify.value.error(err)
    })

}

const addUser = () => {
    gotoLogin({
        logtype: 2,
        retainPage: 1,
        addUser: 1,
    })
}

const editUser = () => {
    data.enitUser = !data.enitUser
}

const delUser = (item:any) => {
    data.showPopup = true
    data.delUserObj = item
}

const todeluser = () => {

    console.log('data.delUserObj',data.delUserObj);
    const index = data.userList.findIndex((item: any) => {
        return item.id == data.delUserObj.id
    });
    let newArr = data.userList.splice(index, 1)
    
    uni.setStorageSync('userList', data.userList)

    data.showPopup = false
    bcNotify.value.show('删除成功')

}

</script>

<style lang="scss" scoped>
.page_content{
    padding: 24rpx 20rpx;
    box-sizing: border-box;
    .user_list_box{
        width: 100%;
        background: #FFFFFF;
        border-radius: 24rpx;
        margin-bottom: 40rpx;
        padding: 32rpx;
        box-sizing: border-box;
        .user_item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2rpx solid #F2F2F2;
            padding-bottom: 32rpx;
            margin-bottom: 32rpx;
            box-sizing: border-box;
            &.is_user{
                opacity: 0.3;
            }
            .item_left{
                display: flex;
                align-items: center;
                .user_img{
                    width: 100rpx;
                    height: 100rpx;
                    border-radius: 50%;
                    margin-right: 24rpx;
                }
                .user_text{
                    .user_name{
                        font-weight: 500;
                        color: #333333;
                        font-size: 32rpx;
                        margin-bottom: 8rpx;
                    }
                    .user_id{
                        font-weight: 400;
                        font-size: 24rpx;
                        color: #999999;
                    }
                }
            }
            .del_btn{
                padding: 12rpx 28rpx;
                box-sizing: border-box;
                border: 2rpx solid #EA3E1A;
                border-radius: 32rpx;
                font-size: 22rpx;
                color: #EA3E1A;
            }
            
            
        }
        .add_user{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            .add_icon{
                width: 100rpx;
                height: 100rpx;
                background: #F8F8F8;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 24rpx;
            }
            .add_text{
                font-size: 32rpx;
                color: #666666;
                font-weight: 400;
            }
        }
    }
    .bottom_text{
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        width: 100%;
        text-align: center;
    }
}
.bottom_box{
    padding: 0rpx 30rpx;
    padding-bottom: 68rpx;
    box-sizing: border-box;

    .edit_user{
        width: 100%;
        height: 90rpx;
        background: #EA3E1A;
        line-height: 90rpx;
        text-align: center;
        color: #fff;
        border-radius: 40rpx;
        font-size: 32rpx;
        &.is_edit{
            background: #D9D9D9;
        }
    }
}
.del_popup{
    .popup_text{
        padding: 50rpx 54rpx;
        box-sizing: border-box;
        width: 540rpx;
        .popup_title{
            text-align: center;
            font-size: 32rpx;
            color: #333333;
            font-weight: 500;
            margin-bottom: 20rpx;
        }
        .popup_content{
            font-weight: 400;
            font-size: 30rpx;
            color: #666666;
            text-align: center;
            margin-bottom: 50rpx;
        }
    }
    .popup_bottom{
        border-top: 2rpx solid #F0F0F0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .del_btn{
            padding: 22rpx 0rpx;
            box-sizing: border-box;
            text-align: center;
            width: 49%;
            border-right: 2rpx solid #F0F0F0;
            font-weight: 500;
            font-size: 28rpx;
            color: #666666;            
        }
        .confirm_btn{
            padding: 22rpx 0rpx;
            box-sizing: border-box;
            text-align: center;
            width: 49%;
            font-weight: 500;
            font-size: 28rpx;
            color: #399BFC;   
        }
    }
}
</style>
<style>
page{
    background: #F2F3F5;
}
</style>