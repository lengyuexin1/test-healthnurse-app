<template>
    <view class="content">
        <!--        <customNavbar bgColor="#F7F7F7" pageTitle="我的" leftIcon=" "></customNavbar>-->
        <bc-page-navbar title="我的">
            <template #back>
                <view></view>
            </template>
        </bc-page-navbar>
        <view class="myInfo">
            <view class="row i-center j-between">
                <view class="myInfo_detail" @tap="editInfo">
                    <view class="myInfo_pic">
                        <image :src="data.userinfo && data.userinfo.avatar || '/static/default_avatar.png'"
                               mode="aspectFill" style="width: 110rpx;height: 110rpx; border-radius: 50%;">
                            <template #error>
                                <image class="avatar" src="/static/default_avatar.png" mode="aspectFill">
                                </image>
                            </template>
                        </image>
                    </view>
                    <view class="column" v-if="data.userinfo">
                        <text class="name u-line-1">{{ data.userinfo.mobile }}</text>
                        <view class="grade">
                            <text class="grde-tex">账号名：{{ data.userinfo.regCode || '' }}</text>
                        </view>
                    </view>
                    <text class="name" v-else>点击头像登录</text>
                </view>
                <view class="myInfo_set row i-center j-between">
                    <view class="set_li" @click="navUrl(0)">
                        <image :src="getAssetsUrl('/zhihu/zh-kf.svg')" style="width: 56rpx;height: 56rpx;"></image>
                        <view class="txt">客服</view>
                    </view>
                    <view class="set_li" @click="gotoMessage" style="position: relative;">
                        <image :src="getAssetsUrl('/zhihu/zh-xx.svg')" style="width: 56rpx;height: 56rpx;"></image>
                        <view class="txt">消息</view>
                        <TnBadge bgColor="#FF2A2A" absolute type="danger" max="99" :value="data.badge"
                                 :offset="[-5, -10]"></TnBadge>
                    </view>
                </view>
            </view>
        </view>
        <view class="subox row i-center j-between">
            <view class="suli row i-center" @click="linkChannel">
                <image :src="getAssetsUrl('/zhihu/zh-bk.svg')" style="width: 72rpx;height: 72rpx;"></image>
                <view class="sutxt">产品百科</view>
            </view>
            <view class="suli row i-center" @click="linkKnowledge">
                <image :src="getAssetsUrl('/zhihu/zh-kh.svg')" style="width: 72rpx;height: 72rpx;"></image>
                <view class="sutxt">康护知识</view>
            </view>
        </view>
        <view class="cellbox">
            <view class="celli row i-center j-between" v-for="item in data.celList" :key="item.id"
                  @click="gotoCell(item)">
                <view class="cellef row i-center">
                    <image :src="item.img" style="width: 48rpx;height: 48rpx;"></image>
                    <view class="celtxt">{{ item.name }}</view>
                </view>
                <TnIcon name="right" size="30" color="#A5A5A5"></TnIcon>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import TnBadge from '@tuniao/tnui-vue3-uniapp/components/badge/src/badge.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoEditProfile } from "@/routes/user-routes"
import { gotoLogin } from "@/routes/public-routes"
import { gotoChatPage } from "@/routes/nim-routes"
import { gotoMessage } from '@/routes/plateform-routes'
import { getAssetsPic } from "@/common/setPicture"
import { gotoKnowledge } from "@/routes/wisdom-routes"
import { gotoScienceAssort } from "@/routes/care-routes"
// #ifdef APP-PLUS
import { appLogins } from "@/libs/appLogin" //阿里云一键登录sdk
// #endif
import { computed, onMounted, reactive } from 'vue'
import { PlatformManage } from "@bc/sys"

interface celList {
    id: string;
    name: string;
    img: string;
}

interface Data {
    celList: celList[];
    badge: number;
    userinfo: any;
}

const data = reactive<Data>({
    celList: [
        { id: '1', name: '场景服务', img: getAssetsPic('/zhihu/zh-fw.svg') },
        { id: '2', name: '场景链接', img: getAssetsPic('/zhihu/zh-lj.svg') },
        { id: '3', name: '探护云记', img: getAssetsPic('/zhihu/zh-ty.svg') },
        { id: '4', name: '在线问诊', img: getAssetsPic('/zhihu/zh-wz.svg') }
    ],
    badge: 0,
    userinfo: {}
})
onMounted(() => {
    PlatformManage.getToken().then((res: any) => {
        data.userinfo = res
    })
})
const getAssetsUrl = computed(() => {
    return (str: string) => {
        return getAssetsPic(str)
    }
})
// 编辑个人信息
const editInfo = async () => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            // #ifdef APP-PLUS
            appLogins(() => {
                console.log('一键登录')
            })
            // #endif
            // #ifdef MP-WEIXIN || H5
            gotoLogin()
            // #endif

            return
        }
        gotoEditProfile()
    })
}

const navUrl = () => {
    gotoChatPage()
}
const gotoMessage = () => {
    gotoMessage()
}
const gotoCell = (item) => {
    console.log(item.name)
    uni.showToast({ title: '敬请期待', icon: 'none' })
}
// 康护知识
const linkKnowledge = () => {
    gotoKnowledge()
}
const linkChannel = () => {
    gotoScienceAssort()
}
</script>

<style lang="scss" scoped>
.content {
    background-color: #F7F7F7;

    /**  个人信息  */
    .myInfo {
        padding: 50rpx 30rpx;

        .myInfo_detail {
            display: flex;
            flex-direction: row;
            align-items: center;

            .myInfo_pic {
                width: 104rpx;
                height: 104rpx;
                border-radius: 50%;
            }

            .avatar {
                width: 104rpx;
                height: 104rpx;
                border-radius: 50%;
            }

            .name {
                color: #333333;
                font-size: 36rpx;
                font-weight: bold;
                margin-left: 20rpx;
            }

            .grade {
                margin-left: 20rpx;

                .grde-tex {
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #999999;
                }
            }
        }

        .myInfo_set {
            .set_li {
                font-size: 24rpx;
                font-weight: 400;
                color: #333333;
                margin-left: 40rpx;
                text-align: center;

                .txt {
                    margin-top: 5rpx;
                }
            }
        }
    }

    .subox {
        margin: 0 20rpx;

        .suli {
            width: 346rpx;
            height: 140rpx;
            background-color: #FFFFFF;
            border-radius: 16rpx;
            box-sizing: border-box;
            padding: 30rpx;

            .sutxt {
                font-weight: bold;
                font-size: 28rpx;
                color: #333333;
                margin-left: 20rpx;
            }
        }
    }

    .cellbox {
        margin: 20rpx;
        background-color: #FFFFFF;
        border-radius: 16rpx;

        .celli {
            height: 100rpx;
            padding: 0 30rpx;

            .celtxt {
                font-weight: 400;
                font-size: 28rpx;
                color: #333333;
                margin-left: 20rpx;
            }
        }
    }
}
</style>
