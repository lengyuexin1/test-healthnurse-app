<template>
    <view class="container">
        <PageTopbg bgstyle="background: linear-gradient(180deg, #DFF7EF 0%, #F2F3F5 100%);"></PageTopbg>
		<bc-page-navbar :title="'帮你评估'"></bc-page-navbar>

        <view class="estimbox">
            <template v-if="data.status === 1">
                <view class="estimcon">
                    <view class="estimtit">老人身体状况评估</view>
                    <view class="estimtip">请如实完成下面老人的身体状况信息，以方便我们更好的为老人提供服务</view>
                    <view class="estimpeop tn-flex-center-between">
                        <view class="peoptit">老人信息选择</view>
                        <view class="row tn-flex-center">
                            <view class="peopmation" v-if="data.archives.id">
                                {{ data.archives.name }} {{ data.archives.age }}岁
                            </view>
                            <TnButton width="136rpx" height="48rpx" shape="round" font-size="24rpx" border-color="#F0F0F0" size="sm" :plain="true" @click="getArchives">{{ data.archives.id?'重新选择':'请选择' }}</TnButton>
                        </view>
                    </view>
                    <block v-for="(ele, els) in data.questList" :key="els">
                        <view class="estimsel">
                            <view class="selctit">{{ els+1 }}、{{ ele.name }}</view>
                            <TnRadioGroup v-model="ele.select" wrap>
                                <TnRadio active-color="#60C577" :label="item.name" v-for="(item, index) in ele.answerList" :key="index" :custom-style="{ marginTop: '30rpx' }">男</TnRadio>
                            </TnRadioGroup>
                        </view>
                    </block>
                </view>
                <view class="estimfot estimbg">
                    <view class="extimbtn"></view>
                    <!-- <u-safe-bottom></u-safe-bottom> -->
                </view>
                <view class="estimfot">
                    <view class="extimbtn">
                        <TnButton width="100%" height="90rpx" color="#ffffff" bg-color="#60C577" shape="round" @click="goHome">提交</TnButton>
                        <!-- <u-button @click="submit" text="提交" color="#29C86F" shape="circle" :customStyle="{height:'90rpx'}"></u-button> -->
                    </view>
                    <u-safe-bottom></u-safe-bottom>
                </view>
            </template>

            <template v-if="data.status === 2">
                <view class="estimsuces tn-flex-column">
                    <TnIcon name="success-circle" size="160rpx" color="#29C86F"></TnIcon>
                    <view class="sucetit">评估完成</view>
                    <view class="sucetip">{{ data.archives.name }}（{{ data.archives.age }}岁）评估结果为：{{ data.result.estimateGradeName }}</view>
                    <view class="sucebtn">
                        <TnButton bg-color="#C2C2C2" shape="circle" :customStyle="{height:'76rpx',color:'#333333'}" @click="goHome">{{ data.archives.isPay ? '返回下单' : '去首页进行下单' }}</TnButton>
                        <!-- <u-button @click="goHome" :text="archives.isPay?'返回下单':'去首页进行下单'" color="#C2C2C2" shape="circle" plain :customStyle="{height:'76rpx',color:'#333333'}"></u-button> -->
                    </view>
                </view>
            </template>
        </view>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineEmits, reactive } from 'vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { estimateQuestionList, estimateQuestionEstimate } from '@/api/user-api'
import BCNotify from '@/components/notify/index.vue'
import { onShow, onLoad } from "@dcloudio/uni-app"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnRadio from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio.vue'
import TnRadioGroup from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio-group.vue'

interface Data {
    archives: any
    status: number
    questList: any
    result: any
}

const data = reactive<Data>({ 
    archives: {},
    status: 1, //1待评估 2评估完成
    questList: [],
    result: {}
})

const bcNotify = ref()

const getList = () => {
    estimateQuestionList().then(res => {
        data.questList = res.map(x => {
            return {
                ...x,
                select: ''
            }
        })
    }).catch(err => {
        bcNotify.value.error(err.message)
    })
}

/* 提交评估 */
const submit = () => {
    if(!data.archives.id) {
        bcNotify.value.show('请选择照护人')
        return false
    }
    const obj = data.questList.find(x => x.select === '')
    if(obj){
        bcNotify.show.show('请完成问答')
        return 
    }
    const answerIds = data.questList.map(x => x.select)
    estimateQuestionEstimate(data.archives.id,answerIds).then(res => {
        data.result = res
        data.status = 2

        data.archives.isPay && dispatchBCEvent(CareEvents.Get__Archives, {
            ...data.archives,
            ...data.result
        })
    }).catch(err => {
        bcNotify.value.error(err.message)
    })
}

onLoad((options) => {
    getList()

    options.info && (data.archives = JSON.parse(options.info))
    // autoBCEventListener(CareEvents.Get__Archives, (data) => {
    //     data.archives = data
    // })
})
</script>

<style lang="scss" scoped>
.estimbox{
    position: relative;
    z-index: 10;
    padding: 20rpx;
    background: linear-gradient(180deg, #DFF7EF 0%, rgba(0,0,0,0) 300rpx);

    .estimcon{
        background: #FFFFFF;
        border-radius: 24rpx;
        padding: 40rpx;

        .estimtit{
            font-size: 34rpx;
            font-weight: 500;
            color: #333333;
        }
        .estimtip{
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;
            margin-top: 16rpx;
            line-height: 30rpx;
        }

        .estimpeop{
            padding: 48rpx 0 40rpx;
            border-bottom: 2rpx solid #F2F2F2;

            .peoptit{
                font-size: 28rpx;
                font-weight: 500;
                color: #333333;
            }
            .peopmation{
                font-size: 24rpx;
                font-weight: 400;
                color: #666666;
                margin-right: 16rpx;
            }
            .peopbtn{
                width: 136rpx;
            }
        }

        .estimsel{
            padding: 40rpx 0;
            border-bottom: 2rpx solid #F2F2F2;

            .selctit{
                font-size: 28rpx;
                font-weight: bold;
                line-height: 34rpx;
                color: #333333;
            }
            .estimli{
                margin-top: 34rpx;
            }
            .selcrdio{
                font-size: 28rpx;
                font-weight: 400;
                color: #666666;
                margin-left: 12rpx;
            }
        }
    }

    .estimsuces{
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        border-radius: 24rpx;
        padding: 60rpx 130rpx;

        .sucetit{
            font-size: 34rpx;
            font-weight: 500;
            color: #333333;
            margin-top: 32rpx;
            text-align: center;
        }
        .sucetip{
            margin-top: 16rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #666666;
            text-align: center;
        }
        .sucebtn{
            margin-top: 60rpx;
            width: 336rpx;
        }
    }
}

.estimfot{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    box-shadow: 0rpx -16rpx 8rpx rgba(0,0,0,0.02);
    background: #FFFFFF;

    .extimbtn{
        height: 130rpx;
        box-sizing: border-box;
        padding: 20rpx 30rpx;
    }
}
.estimbg{
    position: static;
    opacity: 0;
}


</style>
