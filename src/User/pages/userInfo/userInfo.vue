<template>
    <view class="container">
        <view class="avatar" @tap="clickAvtar">
            <image :src="data.userInfo?.avatar" mode="aspectFill" />
            <!-- <view class="location tn-flex-center-between">
                您未开启定位，无法获得精准推荐
                <TnIcon name="right" color="#FFFFFF" size="30"/>
            </view> -->
            <view class="like tn-flex-center-between" >
                <view v-if="data.userInfo.focusOn == 1" @tap.stop="clickFocus(2)">
                    <TnIcon name="like-fill" color="#EA3E1A" size="34"/>已关注
                </view>
                <view v-if="data.userInfo.focusOn == 2" @tap.stop="clickFocus(1)">
                    <TnIcon name="like-fill" color="#FFFFFF" size="34"/>关注
                </view>
            </view>
            <view class="distance tn-flex-center-center" :class="[data.showAvatar ? 'distance0' : '']">
                <TnIcon name="location-fill" color="#FFFFFF" size="36"/>
                距你{{ data.distance || '--' }}
            </view>
        </view>
        <view class="info item" :class="[data.showAvatar ? 'margin10' : '']">
            <view class="tn-flex-center-between">
                <view class="name-wrap tn-flex-row">
                    <view class="name">{{ data.userInfo.nickName }}</view>
                    <!-- <view class="status online tn-flex-center-center">在线</view> -->
                    <!-- <view class="status offline tn-flex-center-center">离线</view> -->
                </view>
                <view class="auth-wrap">
                    <view class="tag authed tn-flex-center-center" v-if="data.userInfo.authenticate == 1">
                        已实名
                        <!-- <TnIcon name="right" color="#29C86F" size="32"/> -->
                    </view>
                    <view class="tag onAuth tn-flex-center-center" v-else>
                        未实名
                        <!-- <TnIcon name="right" color="#BC765D" size="32"/> -->
                    </view>
                </view>
            </view>
            <view class="txt">
                <text>{{ data.userInfo.sex == 1 ? '男': '女' }}</text>·
                <text>{{ data.userInfo.cityName }}</text>·
                <text>{{ data.userInfo.age }}岁</text>·
                <text>{{ data.userInfo.height }}cm</text>
            </view>
            <view class="txt">{{ data.userInfo.innerMonologue }}</view>
            <view class="greyTxt">IP属地：{{ data.userInfo.ipCityName || '--' }} | <text v-if="data.userInfo?.photoAlbum">{{ data.userInfo?.photoAlbum.length }}</text>张照片</view>
        </view>

        <!-- 个人相册 -->
        <view class="album item">
            <view class="tn-flex-center-between">
                <view class="title">个人相册</view>
                <view class="arrow" @tap="data.popup = true">查看所有照片<TnIcon name="right" color="#666666" size="32"/></view>
            </view>
            <view class="scroll-wrap">
                <TnScrollList>
                    <view class="item-container">
                        <image class="" :src="item" mode="aspectFill" v-for="(item, index) in data.userInfo.photoAlbum" :key="index" @tap="previewImg(index)" />
                    </view>
                </TnScrollList>
            </view>
        </view>
        <view class="detail item">
            <view class="title">详细资料</view>
            <view class="list">
                <view class="tag-wrap tn-flex-row">
                    <TnIcon name="my-formal-fill" color="#4F6AE5" size="37"/>
                    <view class="tag">{{ data.userInfo.age }}岁</view>
                    <view class="tag">{{ data.userInfo.height }}CM</view>
                    <view class="tag" v-if="data.userInfo.constellation">{{ data.userInfo.constellation }}</view>
                    <view class="tag">{{ data.userInfo.nationality }}</view>
                </view>
                <view class="tag-wrap tn-flex-row">
                    <TnIcon name="location-fill" color="#4F6AE5" size="37"/>
                    <view class="tag">现居{{ data.userInfo.cityName }}</view>
                    <view class="tag">{{ data.userInfo.placeOfOrigin }}人</view>
                </view>
                <view class="tag-wrap tn-flex-row">
                    <TnIcon name="money-fill" color="#4F6AE5" size="37"/>
                    <view class="tag">{{ data.userInfo.education }}文凭</view>
                    <view class="tag">月入{{ data.userInfo.monthlyIncomeMin }}-{{ data.userInfo.monthlyIncomeMax }}元</view>
                </view>
                <view class="tag-wrap tn-flex-row">
                    <TnIcon name="floral-fill" color="#4F6AE5" size="37"/>
                    <view class="tag" v-if="data.userInfo.weight !== 0">{{ data.userInfo.weight }}Kg</view>
                    <view class="tag">{{ data.userInfo.smoking == 1 ? '吸烟' : '不吸烟' }}</view>
                    <view class="tag">{{ data.userInfo.drinkWine == 1 ? '喝酒' : '不喝酒' }}</view>
                </view>
            </view>
            <view class="title">择偶条件</view>
            <view class="list">
                <view class="tag-wrap tn-flex-row">
                    <TnIcon name="like-fill" color="#FF4721" size="37"/>
                    <view class="tag-red">年龄{{ data.conditions.ageMin }} - {{ data.conditions.ageMax }}岁</view>
                    <view class="tag-red">身高{{ data.conditions.heightMin }} - {{ data.conditions.heightMax }}CM</view>
                </view>
                <view class="tag-wrap tn-flex-row">
                    <TnIcon name="like-fill" color="#FF4721" size="37"/>
                    <view class="tag-red">月入{{ data.conditions.monthlyIncomeMin }} - {{ data.conditions.monthlyIncomeMax }}元</view>
                    <view class="tag-red">{{ data.conditions.education }}文凭</view>
                </view>
            </view>
        </view>
        <view class="hobby item">
            <view class="title">兴趣爱好</view>
            <view class="list">
                <view class="tag-wrap tn-flex-row" v-if="data.userInfo.hobbyNames && data.userInfo.hobbyNames.length">
                    <view class="tag-gold" v-for="(item, index) in data.userInfo.hobbyNames" :key="index">{{ item }}</view>
                </view>
                <view class="empty" v-else>无</view>
            </view>
        </view>
        <view class="bottom-btn tn-flex-center-center">
            <TnButton shape="round" width="100%" height="80rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="clickChat">
                开始聊天
            </TnButton>
        </view>
    </view>
    <TnPopup v-model="data.popup" width="80%" height="1000" :overlay-closeable="true" :close-btn="true" :z-index="500" open-direction="bottom">
        <view class="content">
            <view class="title">个人相册</view>
            <view class="image-list">
                <view class="item tn-flex-column" v-for="(item, index) in data.userInfo.photoAlbum" :key="index">
                    <image class="bg" :src="item" mode="aspectFill" @tap="previewImg(index)" />
                </view>
            </view>
        </view>
    </TnPopup>
    <BCNotify ref="bcNotify"></BCNotify>
</template>
    
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnScrollList from '@tuniao/tnui-vue3-uniapp/components/scroll-list/src/scroll-list.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import BCNotify from '@/components/notify/index.vue'
import { loveChatUserInfo, loveChatConditionsUserInfo, updateFocusOnStatus, updateTalkStatus, getRealCoordinate } from '@/api/user-api'
import { getDistances } from '@/utils/distance'
import { gotoChatPage } from '@/routes/nim-routes'
import { IMWEB_ENV } from '@/utils/handleEnv'

interface Data {
    popup: boolean
    userInfo: any
    showAvatar: boolean
    conditions: any
    distance: string
}

const data = reactive<Data>({
    popup: false,
    userInfo: {},
    showAvatar: false,
    conditions: {},
    distance: ''
})

const bcNotify = ref()

const previewImg = (index: number) => {
    uni.previewImage({
        current: index,
        indicator: 'number',
        urls: data.userInfo.photoAlbum
    })
}

const clickAvtar = () => {
    data.showAvatar = !data.showAvatar
}

const clickFocus = (type: number) => {
    updateFocusOnStatus({
        loveChatAccountId: data.userInfo.id,
        focusOn: type
    }).then((res) => {
        data.userInfo.focusOn = type
        bcNotify.value.show(`${type == 1 ? '已关注' : '已取消关注'}`)
    })
}

const clickChat = () => {
    updateTalkStatus({
        loveChatAccountId: data.userInfo.id,
        talk: 1
    }).then(() => {
        gotoChatPage({
            to: `${IMWEB_ENV()}${data.userInfo.ownerId}`,
            scene: 'p2p'
        })
    })
}

onLoad((options) => {
    loveChatUserInfo({ id: options?.id }).then((res: any) => {
        data.userInfo = res

        uni.getLocation({
            type: "gcj02",
            isHighAccuracy: true,
            success: (location) => {
                getRealCoordinate({ id: res.id }).then((pack: any) => {
                    const distance = getDistances(
                        pack.realLat,
                        pack.realLng,
                        location.latitude,
                        location.longitude
                    )
                    if (distance == 0) {
                        data.distance = '0.1km'
                    }
                    else {
                        data.distance = distance + 'km'
                    }
                })
            }
        })
    })
    loveChatConditionsUserInfo({ id: options?.id }).then((res: any) => {
        data.conditions = res
    })
})
</script>
  
<style lang="scss" scoped>
.container {
    padding-bottom: 160rpx;

    .avatar {
        width: 100%;
        height: 916rpx;
        position: relative;

        image {
            width: 100%;
            height: 100%;
        }

        .location {
            align-items: center;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 15rpx 30rpx;
            color: #FFFFFF;
            background-color: rgba(0, 0, 0, .2);
        }

        .like {
            align-items: center;
            position: absolute;
            right: 30rpx;
            top: 50rpx;
            font-size: 28rpx;
            padding: 12rpx 16rpx;
            border-radius: 8rpx;
            color: #FFFFFF;
            background-color: rgba(0, 0, 0, .2);
        }

        .distance {
            position: absolute;
            left: 30rpx;
            bottom: 250rpx;
            height: 58rpx;
            padding: 5rpx 15rpx;
            border-radius: 36rpx;
            color: #FFFFFF;
            background-color: rgba(0, 0, 0, .36);
        }

        .distance0 {
            position: absolute;
            left: 30rpx;
            bottom: 50rpx;
            height: 58rpx;
            padding: 5rpx 15rpx;
            border-radius: 36rpx;
            color: #FFFFFF;
            background-color: rgba(0, 0, 0, .36);
        }
    }

    .item {
        padding: 40rpx;
        margin-bottom: 15rpx;
        border-radius: 24rpx;
        background-color: #FFFFFF;
        position: relative;
        z-index: 10;
        animation: all 1s ease-in-out;
    }

    .info {
        margin-top: -230rpx;

        .name-wrap {
            align-items: center;

            .name {
                font-weight: bold;
                font-size: 34rpx;
                color: #333333;
            }

            .status {
                width: 60rpx;
                height: 32rpx;
                padding: 2rpx 10rpx;
                margin-left: 12rpx;
                color: #683C05;
                font-size: 20rpx;
                border-radius: 6rpx;
            }

            .online {
                background: linear-gradient(90deg, #FFDB6E 0%, #ECA427 100%);
            }

            .offline {
                background: linear-gradient(90deg, #D9D9D9 0%, #A7A7A7 100%);
            }
        }

        .auth-wrap {
            align-items: center;

            .tag {
                position: relative;
                right: -40rpx;
                width: 192rpx;
                height: 60rpx;
                font-size: 28rpx;
                border-radius: 30rpx 0 0 30rpx;
            }

            .authed {
                color: #29C86F;
                background: linear-gradient(90deg, #E1FFF1 0%, #C4F8E0 100%);
            }

            .onAuth {
                color: #BC765D;
                background: linear-gradient(90deg, #FCEEE3 0%, #FFDCCE 100%);
            }
        }

        .txt {
            font-size: 26rpx;
            color: #303030;
            margin-top: 20rpx;

            text {
                padding: 0 8rpx;

                &:first-child {
                    padding-left: 0;
                }
            }
        }

        .greyTxt {
            font-size: 26rpx;
            color: #999999;
            margin-top: 40rpx;
        }
        
    }

    .margin10 {
        margin-top: -20rpx;
    }

    .album {
        padding-bottom: 0;

        .title {
            font-size: 32rpx;
            font-weight: bold;
            color: #333333;
        }

        .arrow {
            font-size: 28rpx;
            color: #666666; 
        }

        .scroll-wrap {
            margin-top: 30rpx;

            .item-container {
                position: relative;
                width: fit-content;
                display: flex;
                flex-wrap: nowrap;

                image {
                    flex-grow: 1;
                    flex-shrink: 0;
                    margin: 0rpx 20rpx;
                    width: 192rpx;
                    height: 192rpx;
                    border-radius: 16rpx;
                }
            }
        }
    }

    .detail {
        .title {
            font-size: 32rpx;
            font-weight: bold;
            color: #333333;
        }

        .list {
            border-bottom: solid 1rpx #F2F2F2;
            margin-bottom: 40rpx;

            &:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }

            .tag-wrap {
                margin: 40rpx 0;
                flex-wrap: wrap;

                .tag {
                    margin: 0 10rpx;
                    padding: 3rpx 16rpx;
                    color: #4F6AE5;
                    font-size: 24rpx;
                    background: #EFF6FF;
                    border-radius: 20rpx;
                }

                .tag-red {
                    margin: 0 10rpx;
                    padding: 3rpx 16rpx;
                    color: #FF4721;
                    font-size: 24rpx;
                    background: #FFEFEF;
                    border-radius: 20rpx;
                }
            }
        }
    }

    .hobby {
        .title {
            font-size: 32rpx;
            font-weight: bold;
            color: #333333;
        }

        .list {
            .tag-wrap {
                flex-wrap: wrap;
                margin: 20rpx 0;

                .tag-gold {
                    margin: 20rpx 10rpx;
                    padding: 3rpx 16rpx;
                    color: #B2733C;
                    font-size: 24rpx;
                    background: #FEF3E1;
                    border-radius: 20rpx;
                }
            }
        }
    }
}

.content {
    height: 1000rpx;
    padding: 20rpx 40rpx 40rpx 40rpx;

    .title {
        height: 60rpx;
        font-weight: bold;
        font-size: 36rpx;
        color: #333333;
        text-align: center;
    }

    .image-list {
        height: 820rpx;
        padding: 20rpx 0;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        display: flex;
        flex-wrap: wrap;

        .item {
            align-items: center;
            margin: 0 15rpx;
        }

        .bg {
            width: 192rpx;
            height: 192rpx;
            border-radius: 50%;
        }
    }
}

.empty {
    margin-top: 30rpx;
    font-size: 26rpx;
    color: #666666;
}

.bottom-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 140rpx;
    padding: 0 30rpx;
    background-color: #FFFFFF;
}
</style>
