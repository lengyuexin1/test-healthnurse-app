<template>
    <view class="content">
        <z-paging ref="paging" :auto="true" :fixed="false">
            <view class="mationbox">
                <view class="mationcon" v-for="(ele, els) in messList" :key="els">
                    <view class="mationtit">{{ ele.title }}</view>
                    <view class="mationli row j-between" v-for="(item, index) in ele.childs" :key="index">
                        <view class="mationli-tit">{{ item.name }}</view>
                        <view class="mationli-con" v-if="item.id !== 2">
                            <text selectable user-select>{{ item.desc || '--' }}</text>
                        </view>
                        <view class="mationli-con" v-if="item.id === 2">
                            <textarea class="mationli-inp" auto-height v-model="data.address" @blur="updateAlarm"
                                placeholder="请输入安装地址" :maxlength="30" type="text"></textarea>
                        </view>
                    </view>
                </view>

                <view class="devmore row i-center j-center" @click="gotoPact">
                    <text>设备协议</text>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script lang="ts" setup>
import { deviceUpdate } from "@/api/room-api"
import { ref, reactive, watch } from 'vue'
import { gotoDeviceTreaty } from '@/routes/active-routes'
interface Data {
    address: string
}
const data = reactive<Data>({
    address: ""
})
interface Props {
    messList: any
    deviceId: string
}

const props = defineProps<Props>()

watch(props.messList, (newValue: any) => {
    const data = newValue[0].childs.find(x => x.id === 2)
    data.address = data ? data.desc : ""
})

// 更新安装地址
const updateAlarm = () => {
    // if (!uni.$u.trim(this.address, 'all')) {
    //     return
    // }
    deviceUpdate({
        deviceId: props.deviceId,
        address: data.address
    }).then(() => {
        uni.showToast({
            icon: "none",
            title: "更新成功"
        })
    }).catch(err => {
        uni.showToast({
            icon: "none",
            title: err
        })
    })
}
// 跳转协议
const gotoPact = () => {
    gotoDeviceTreaty()
}
</script>

<style lang="scss" scoped>
.content {
    height: 100%;

    // margin-top: 180rpx;
    .mationbox {
        padding: 30rpx 20rpx;

        .mationcon {
            background: #FFFFFF;
            border-radius: 16rpx;
            margin-bottom: 16rpx;

            .mationtit {
                padding: 30rpx 30rpx 24rpx;
                border: 2rpx solid #F2F2F2;
                font-weight: bold;
                font-size: 32rpx;
                color: #333333;
            }

            .mationli {
                margin-top: 40rpx;
                padding: 0 30rpx;
                align-items: flex-start;

                &:last-child {
                    padding-bottom: 40rpx;
                }

                &-tit {
                    font-weight: blod;
                    font-size: 30rpx;
                    color: #333333;
                    flex-shrink: 0;
                    margin-right: 30rpx;
                }

                &-con {
                    font-size: 30rpx;
                    color: #666666;
                    flex: 1;
                    text-align: right;
                }

                &-inp {
                    font-size: 28rpx;
                    width: 100%;
                    text-align: right;
                }
            }
        }
    }
}

.devmore {
    margin-top: 20rpx;
    height: 92rpx;
    background: #FFFFFF;
    box-shadow: 8rpx 8rpx 20rpx rgba(0, 0, 0, 0.07);
    border-radius: 16rpx;

    text {
        font-size: 32rpx;
        color: #000000;
        margin-left: 8rpx;
    }
}
</style>
