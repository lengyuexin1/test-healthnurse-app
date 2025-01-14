<template>
    <view class="container">
        <customNavbar :pageTitle="'体温枪'"></customNavbar>
        <view class="imgBox">
            <image class="left_img" :src="data.imgUrlst" mode="scaleToFill" />
        </view>
        <view class="recBox">
            <view class="headerTie" @click="gotoRec">
                <view class="roveLi">体温记录</view>
                <image class="go_img" :src="data.leftGo" mode="scaleToFill" />
            </view>
            <view class="recTime">{{ getTime(data.recodListArr.utcLog) }}</view>
            <view class="hangBot">
                <view class="lefttext">
                    <view class="bodLaber">体温</view>
                    <view class="temNub">{{ data.recodListArr.data }}°C</view>
                </view>
                <view class="rightBot">
                    <view class="bodLaber">状态</view>
                    <view class="norl" :class="typecs">{{ isNomr }}</view>
                </view>
            </view>
        </view>
        <view class="noeTest" @click="gotoTest">
            <view class="ts_img">
                <image class="img_asd" :src="data.zhenBtn" mode="scaleToFill" />
            </view>
            <view>测量体温</view>
        </view>
    </view>
</template>
<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import { gotorecListTem, gotoStartTep } from "@/routes/active-routes"
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { lyRecodeList } from "@/api/room-api"
import dayjs from "dayjs"
import { ref, reactive, computed } from "vue"

const data = reactive({
    recodListArr: {
        data: '',
        utcLog: ''
    },
    imgUrlst: getAssetsPic("/agency/bigTem.svg"),
    leftGo: getAssetsPic('/agency/leftjian.svg'),
    zhenBtn: getAssetsPic('/agency/zhenTem.svg'),
    sendData: {
        pageNumber: 1,
        pageSize: 10,
        query: {
            mac: ''
        }
    }
})

const isNomr = computed(() => {
    const flagTem = Number(data.recodListArr.data) * 100
    if (flagTem < 3600) {
        return '低温'
    } else if (flagTem > 4100) {
        return '超高热'
    } else if (flagTem > 3900) {
        return '高热'
    } else if (flagTem > 3800) {
        return '中等热'
    } else if (flagTem > 3720) {
        return '低热'
    } else if (flagTem > 3600) {
        return '正常'
    }
})
const typecs = computed(() => {
    const flagTem = Number(data.recodListArr.data) * 100
    if (flagTem < 3600) {
        return 'ins0'
    }
    else if (flagTem > 4100) {
        return 'ins5'
    }
    else if (flagTem > 3900) {
        return 'ins4'
    }
    else if (flagTem > 3800) {
        return 'ins3'
    }
    else if (flagTem > 3720) {
        return 'ins2'
    }
    else if (flagTem > 3600) {
        return 'ins1'
    }
})

onLoad((option) => {
    data.sendData.query.mac = JSON.parse(decodeURIComponent(option.data))
    getRecList()
})

const getTime = (time) => {
    if (time) {
        return dayjs(Number(time)).format('YYYY-MM-DD HH:mm:ss');
    } else {
        return ''
    }
}
const gotoRec = () => {
    gotorecListTem(data.sendData.query.mac)
}
const gotoTest = () =>{
    gotoStartTep()
}
const getRecList = () => {
    lyRecodeList(data.sendData).then(res => {
        console.log(res)
        if (res.data.length > 0) {
            data.recodListArr.data = res.data[0].data
            data.recodListArr.utcLog = res.data[0].utcLog
        }
    })
}
</script>
<style lang="scss" scoped>
.imgBox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 130rpx;
}

.left_img {
    width: 400rpx;
    height: 400rpx;
}

.recBox {
    padding: 40rpx;
    margin: 60rpx 40rpx 30rpx 40rpx;
    height: 168px;
    background: #FFFFFF;
    box-shadow: 10rpx 10rpx 20rpx 2rpx rgba(0, 0, 0, 0.07);
    border-radius: 16rpx;

    .headerTie {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6rpx;

        .roveLi {
            font-weight: 600;
            font-size: 32rpx;
            color: #000000;
        }

        .go_img {
            width: 40rpx;
            height: 40rpx;
        }
    }

    .recTime {
        font-size: 28rpx;
        color: #999999;
    }

    .hangBot {
        display: flex;
        margin-top: 66rpx;

        .lefttext {
            width: 50%;
            border-right: 4rpx solid #F2F2F2;
        }

        .bodLaber {
            font-size: 14px;
            color: #333333;
            margin-bottom: 6rpx;
        }

        .temNub {
            font-weight: 600;
            font-size: 44rpx;
            color: #000000;
        }

        .rightBot {
            width: 48%;
            text-align: center;

            .norl {
                font-weight: 600;
                font-size: 44rpx;
                color: #29C86FFF;
            }

            .ins0 {
                color: #18B0CF;
            }

            .ins1 {
                color: #29C86F;
            }

            .ins2 {
                color: #FFAC1D;
            }

            .ins3 {
                color: #FF8800;
            }

            .ins4 {
                color: #FF4A11;
            }

            .ins5 {
                color: #FF4A11;
            }
        }
    }
}

.noeTest {
    margin: 0 40rpx;
    height: 96rpx;
    display: flex;
    background: #FFFFFF;
    align-items: center;
    justify-content: center;
    box-shadow: 8rpx 8rpx 20rpx 2rpx rgba(0, 0, 0, 0.07);
    border-radius: 16rpx;

    .ts_img {
        width: 30rpx;
        height: 30rpx;
        margin-right: 16rpx;
        margin-bottom: 6rpx;

        .img_asd {
            width: 100%;
            height: 100%;
        }
    }
}
</style>