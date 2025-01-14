<template>
    <view class="container">
        <customNavbar :pageTitle="'体温记录'"></customNavbar>
        <view class="contents">
            <view class="list" v-for="(item, index) in recodListArr" :key="index" @click="gotoDetail(item)">
                <view class="timeLi">
                    <view class="timeLab">时间</view>
                    <view class="timeNum">{{ getTime(item.utcLog) }}</view>
                </view>
                <view class="timeLi">
                    <view class="timeLab">体温</view>
                    <view class="timeNum">{{ item.data }}</view>
                </view>
                <view class="timeLi">
                    <view class="timeLab">状态</view>
                    <view class="timeNum laststu"
                        :class="{ ins0: Number(item.data) * 100 < 3600, 
                            ins5: Number(item.data) * 100 > 4100,
                            ins4: Number(item.data) * 100 > 3900,
                            ins3: Number(item.data) * 100 > 3800,
                            ins2: Number(item.data) * 100 > 3720,
                            ins1:Number(item.data) * 100 > 3600,
                            }">
                        {{ isNomr(item.data) }}</view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import { getAssetsPic } from '@/common/setPicture'
import { gotoRecodEcart } from "@/routes/active-routes"
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { lyRecodeList } from "@/api/room-api"
import dayjs from "dayjs"
export default {
    components: {
        customNavbar
    },
    data() {
        return {
            recodListArr: [],
            sendData: {
                pageNumber: 1,
                pageSize: 10,
                query: {
                    mac: ''
                }
            },
            sucdImg: getAssetsPic("/agency/succed.svg")
        }
    },
    methods: {
        getTime(time) {
            return dayjs(Number(time)).format('YYYY-MM-DD HH:mm:ss');
        },
        isNomr(time) {
            const flagTem = Number(time) * 100
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
        },
        generateClassName(time) {
            const flagTem = Number(time.data) * 100
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
        },
        gotoDetail(item) {
            console.log(item);
            const sdaMac = JSON.stringify(this.sendData.query.mac)
            gotoRecodEcart(item.data, item.utcLog, sdaMac)
        },
        getRecList() {
            lyRecodeList(this.sendData).then(res => {
                console.log(res)
                this.recodListArr = res.data
            })
        }
    },
    onLoad(option) {
        this.sendData.query.mac = JSON.parse(decodeURIComponent(option.data))
        this.getRecList()
    },
}

</script>

<style lang="scss" scoped>
.contents {
    margin: 30rpx;
}

.list {
    background: #fff;
    display: flex;
    height: 136rpx;
    border-radius: 12rpx;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 20rpx;

    .timeLi {
        font-size: 28rpx;
        display: flex;
        flex-direction: column;
        align-items: center;

        .timeLab {
            font-weight: 600;
            color: #333333;
        }

        .timeNum {
            margin-top: 12rpx;
            color: #666666;
            padding: 4rpx 8rpx;
            border-radius: 4px;
        }

        .laststu {
            color: #29C86FFF;
        }
    }
}

.ins0 {
    background: #DEF6FF;
    color: #18B0CF;
}

.ins1 {
    color: #29C86F;
    background: #E5F9EE;
}

.ins2 {
    background: #FFF8C9;
    color: #FFAC1D;
}

.ins3 {
    color: #FF8800;
    background: #FFE8CB;
}

.ins4 {
    color: #FF4A11;
    background: #FFDAD1;
}

.ins5 {
    background: #FF4D4D;
    color: #FFFFFF;
}</style>