<template>
    <view class="container">
        <view class="elderly_top" @tap="chooseElderly">
            <image
                class="elderly_img"
                :src="`/User/static/dangan/${info.sex == 1 ? 'pic_man' : 'pic_girl'}.png`"
                mode="scaleToFill"
            />
            <view class="elderly_information">
                <view class="elderly_name_box">
                    <view class="elderly_name">{{ info.name }}</view>
                    <view class="elderly_relationship">{{ info.rel }}</view>
                </view>
                <view class="elderly_id_card">
                    {{ concealIdCard(info.idCardNumber) }}
                </view>
            </view>

            <view class="elderly_tag" v-if="info.estimateGradeId">{{ info.estimateGradeName }}</view>

        </view>
        <view class="elderly_btn_box">
            <view class="elderly_btn" @click="delElderly">删除</view>
            <view class="elderly_btn" @click="changeelderly">修改</view>
            <view class="elderly_btn" :class="{ 'toassess' : true }" @click="linkEstimate">{{ info.estimateGradeId ? '修改评估' : '去评估' }}</view>
        </view>
        <BCPopup
            ref="bcPopup"
            title="删除"
            content="是否确认删除？"
            subBtn="确认"
            cancelBtn="取消"
            @clickLeftBtn="confirmDel"
            @clickRightBtn="cancel">
        </BCPopup>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted, defineEmits } from 'vue'
import { gotoPatientEdit } from "@/routes/user-routes"
import { dispatchWEvent } from '@/events/event-registry'
import { CareEvents } from '@/events/care-events'
import { pageController } from '@bc/uni-tools'
import BCPopup from '@/components/popup/index.vue'
import { gotoEstimate } from '@/routes/user-routes'

interface Props {
    info: any
}

const props = defineProps<Props>()

const bcPopup = ref()

const concealIdCard = computed(()=>(str:string)=> {
    return str.replace(/(.{4}).*(.{4})/, "$1**********$2")
})

const chooseElderly = () => {
    dispatchWEvent(CareEvents.Get__Archives, props.info)
    pageController.back()
}

const linkEstimate = () => {
    gotoEstimate(JSON.stringify({
        id: props.info.id,
        name: props.info.name,
        age: props.info.age
    }))
}

const changeelderly = () => {
    gotoPatientEdit({ type:1, id: props.info.id })
}

const delElderly = () => {
    bcPopup.value.open()
}

const cancel = () => {
    bcPopup.value.close()
}

const confirmDel = () => {
    emit("delElderly", props.info.id)
    cancel()
}

const emit = defineEmits(["delElderly"])

</script>
  
<style lang="scss" scoped>
.container{
    background: #fff;
    border-radius: 24rpx;
    padding: 32rpx;
    box-sizing: border-box;
    .elderly_top{
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 40rpx;
        .elderly_img{
            width: 84rpx;
            height: 84rpx;
            border-radius: 50%;
            margin-right: 20rpx;
        }
        .elderly_information{
            .elderly_name_box{
                display: flex;
                align-items: center;
                margin-bottom: 16rpx;
                .elderly_name{
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #333333;
                    margin-right: 20rpx;
                }
                .elderly_relationship{
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #8B8B8B;
                }

            }
            .elderly_id_card{
                font-size: 24rpx;
                color: #8B8B8B;
                font-weight: 400;
            }
        }   

    }
    .elderly_btn_box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .elderly_btn{
            width: 200rpx;
            height: 64rpx;
            border: 2rpx solid #EEEEEE;
            border-radius: 32rpx;
            text-align: center;
            line-height: 64rpx;
            color: #666666;
            font-size: 26rpx;
            background: #fff;

            &.toassess{
                border: 2rpx solid #29C86F;
                color: #29C86F;
            }
        }
    }
}
</style>
  