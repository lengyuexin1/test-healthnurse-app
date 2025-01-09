<template>
    <view class="order-content">
        <!-- :class="staCls" -->
        <view class="state-text-box" >
            <!-- mattit -->
            <view class="state-title ">
                {{ osObj.statusName }}
            </view>
            <view class="state-text" v-if="osObj.status == 65537">
                您的订单还有
                <TnCountDown :time="Number(osObj.statusDetailIntro)" separator-mode="cn" :show-hour="false"
                    separator-color="#666666" text-color="#666666" @end="stop" />
                过期，请尽快支付
            </view>
            <view class="state-text" v-else-if="osObj.status == 131075">
                您的商品已发货请留意物流信息
            </view>
            <view class="state-text" v-else>
                {{ osObj.statusDetailIntro }}
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'

interface Props {
    /** 订单状态
     * status 状态号码
     * statusName 状态名称
     * statusDetailIntro 状态描述
     */
    osObj: any
}

const props = defineProps<Props>()


const staCls = computed(() => {
    // '待付款','待服务','待确认','待评价','已取消','待使用','已完成','待发货','待收货', '已收货'
    const stateArr = [65537, 131076, 131092, 131077, 196610, 262146, 131079, 196611, 131074, 131075, 196609]
    const colorArr = ['state1', 'state2', 'state2', 'state3', 'state4', 'state5', 'state6', 'state7', 'state8', 'state9', 'state7']

    const index = stateArr.indexOf(props.osObj.status)
    return index >= 0 ? colorArr[index] : colorArr[0]
})

onMounted(() => {

})

const stop = () => {

    props.osObj.status = 196610
    props.osObj.statusName = '待评价'
    props.osObj.statusDetailIntro = '待评价'
}


</script>
  
<style lang="scss" scoped>
.order-content {
    width: 100%;
    height: 120rpx;
    border-radius: 24rpx;
    padding: 12rpx;
    box-sizing: border-box;
    margin-bottom: 18rpx;

    .state-text-box {
        width: 100%;
        height: 100%;
        border-radius: 16rpx;
        display: flex;
        flex-direction: column;

        .state-title {
            font-size: 40rpx;
            color: #FFFFFF;
            margin-bottom: 8rpx;
        }

        .state-text {
            font-size: 24rpx;
            color: #FFFFFF;
        }

        &.state1 {
            background: #FFF2F2;

            .mattit {
                color: #FC2828;
            }
        }

        &.state2 {
            background: #e3f9eb;

            .mattit {
                color: #09C85D;
            }
        }

        &.state3 {
            background: #e9f5fe;

            .mattit {
                color: #2DA3FE;
            }
        }

        &.state4 {
            background: #fff9eb;

            .mattit {
                color: #FF7331;
            }
        }

        &.state5 {
            background: #f2f2f2;

            .mattit {
                color: #333333;
            }
        }

        &.state6 {
            background: #E8F5FF;

            .mattit {
                color: #2DA3FE;
            }
        }

        &.state7 {
            background: #fff9eb;

            .mattit {
                color: #FF7331;
            }
        }

        &.state8 {
            background: #e3f9eb;

            .mattit {
                color: #09C85D;
            }
        }

        &.state9 {
            background: #E8F5FF;

            .mattit {
                color: #2DA3FE;
            }
        }
    }
}</style>
  