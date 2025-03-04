<template>
    <view class="bar"></view>
    <view class="container">
        <z-paging 
		    ref="paging"
            :auto="false"
		    :refresher-enabled="false"
		>
            <view class="article_page">
                <view class="textarea_box">
                    <textarea 
                    placeholder-style="color:#B2B2B2" 
                    placeholder="请输入正文" 
                    v-model="data.textvalue"
                    :maxlength="500" 
                    @blur="secondInpblur" 
                    class="textarea_inp"
                    :auto-height="true"
                    />
                </view>
                <view class="up_img_inp" v-if="data.showImgBox">
                    <imgUpload v-model:imageArr="data.fileList1" :limit="6" ref="imgUploadref" @upchange="upchange">
                        <template #uploadBtn>
                            <view @click="openUp" class="up_box">
                                <view class="up_icon">
                                    <TnIcon name="add" color="#C9C9C9" size="80"/>
                                </view>
                                <view class="up_text">
                                    添加图片
                                </view>
                            </view>
                        </template>
                    </imgUpload>
                </view>

                <view class="position_box" @click="positionFun">
                    <view class="position_left">
                        <TnIcon name="location" color="#D8D8D8" size="32rpx"/>
                        <view class="position_text"> {{ !data.regionText ? '点击设置坐标' : data.regionText }} </view>
                    </view>
                    <view class="position_right">
                        <TnIcon name="right" color="#BBBBBB" size="32rpx"/>
                    </view>
                </view>

                <view class="sign_box">
                    <view class="sign_left">
                        <image
                            class="sign_icon"
                            :src="getAssetsUrl('/leyou/create/createMemoirs.svg')"
                            mode="scaleToFill"
                        />
                        <view class="sign_text">标记为大事记</view>
                    </view>
                    <view class="sign_right">
                        <TnSwitch v-model="data.selectValue" active-color="#EA3E1A"/>
                    </view>
                </view>

                <view class="record_time_box">
                    <view class="record_time_left">
                        <image
                            class="record_time_icon"
                            :src="getAssetsUrl('/leyou/create/createTime.svg')"
                            mode="scaleToFill"
                        />
                        <view class="record_time_text">记录时间</view>
                    </view>
                    <view class="record_time_right" @click="openTimePicker">
                        <view class="time_text">
                            {{ !data.dateTimeValue ? data.nowTime : data.dateTimeValue }}
                        </view>
                        <TnIcon name="right" color="#BBBBBB" size="32rpx"/>
                    </view>
                </view>

            </view>

            <template #bottom>
                <view class="bottom_box" v-if="props.ischange != 1">
                    <view class="bottom_box_btn" @tap="clickBtn(2)">确认发布</view>
                </view>
                <view class="change_bottom_box" v-else>
                    <view class="del_btn" @tap="delAudit">删除记录</view>
                    <view class="up_btn" @tap="clickBtn(2)">保存编辑</view>
                </view>
            </template>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>

        <TnPopup v-model="data.showPopup">
            <view class="popup_box">
                <view class="popup_box_top">新纪录还未发布，确定要放弃吗？</view>
                <view class="popup_box_bottom">
                    <view class="not_preserve" @click="data.showPopup = false">取消</view>
                    <view class="preserve" @click="preserve">确定</view>
                </view>
            </view>
            <BCNotify ref="PopupNotify"></BCNotify>
        </TnPopup> 

        <TnDateTimePicker 
            @confirm="confirm"
            v-model:open="data.openDateTimePicker"
            v-model="data.dateTimeValue"
            mode="date"
            format="YYYY-MM-DD"
            :min-time="data.nowTime"
        ></TnDateTimePicker>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'
import TnDateTimePicker from '@tuniao/tnui-vue3-uniapp/components/date-time-picker/src/date-time-picker.vue'

import imgUpload from '@/components/upload/img-upload.vue'
import { getenjoyDetail, enjoysubmit } from '@/api/create-api'
import BCNotify from '@/components/notify/index.vue'
import { formattime } from '@/common/formatTime'
import { getAssetsPic } from '@/common/setPicture'


import { TempStorage } from "@bc/base"

const props = withDefaults(defineProps<{
    ischange: number
    auditId: string
    type: number
    isEvent: boolean
}>(),{
    ischange: 0,
    auditId: '',
    type: 0,
    isEvent: false
})

interface Events {
    (e: 'delAudit', contentId: string): void
}
const emit = defineEmits<Events>()

interface Data {
    textvalue:string
    fileList1:any
    textbol: boolean,
    imgbol: boolean,
    showPopup: boolean,
    firstUp: boolean,
    selectValue: boolean,
    openDateTimePicker: boolean,
    dateTimeValue: string,
    nowTime: string,
    regionText: string,
    lng: number,
    lat: number,
    showImgBox: boolean,
    contentId: string,
}
const data = reactive<Data>({
    textvalue:'',
    fileList1:[],
    textbol: false,
    imgbol: false,
    showPopup: false,
    firstUp: true,
    selectValue: false,
    openDateTimePicker: false,
    dateTimeValue: '',
    nowTime: '',
    regionText: '',
    lng: 0,
    lat: 0,
    showImgBox: false,
    contentId: '',
})

const bcNotify = ref()
const PopupNotify = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const formatTime = (time:number) => {
    return formattime(time, 'YYYY-MM-DD')
}


const isnotNull = computed(()=>{
    console.log('执行');
    
    if (!data.textvalue) {
        bcNotify.value.show('请输入正文')
        return false
    }
    else if (!data.fileList1.length) {
        bcNotify.value.show('请上传图片')
        return false
    }
    else if (!data.regionText) {
        bcNotify.value.show('请选择定位')
        return false
    }

    return true
})


onMounted(() => {
    data.nowTime = formatTime((new Date().getTime() / 1000))
    if (props.ischange == 1) {
        console.log('修改');
        getenjoyDetail({
            id: props.auditId
        }).then((res:any) => {
            console.log('res',res);
            data.fileList1 = res.baseInfo.images
            data.textvalue = res.baseInfo.desc
            data.lat = res.baseInfo.lat
            data.lng = res.baseInfo.lng
            data.selectValue = res.baseInfo.tagIds.length != 0 ? true : false
            data.dateTimeValue = formatTime(res.baseInfo.utcCreated);
            data.regionText = res.baseInfo.address

            data.showImgBox = true

            data.contentId = res.baseInfo.contentId
        }).catch((err:any) =>{
            bcNotify.value.error('内容已删除')
            setTimeout(() => {
                uni.navigateBack();
            }, 1000);
        })
    }else{
        data.selectValue = props.isEvent
        data.showImgBox = true
    }
})


onLoad(()=> {
    // #ifdef MP-WEIXIN 
    uni.getPrivacySetting({
        success: (res:any) => {
            console.log(res) // 返回结果为: res = { needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》' }
            if (res.needAuthorization) {
                // 需要弹出隐私协议
                console.log('需要弹出隐私协议');
            } else {
                // 用户已经同意过隐私协议，所以不需要再弹出隐私协议，也能调用已声明过的隐私接口
                console.log('用户已经同意');
            }
        },
        fail: () => {},
        complete: () => {}
    })
    // #endif
})

const imgUploadref = ref()
const openUp = () => {
    nextTick(()=>{
        console.log('手动调用',imgUploadref ,imgUploadref.value); 
        imgUploadref.value.chooseFileFun()
    })
}

const upchange = () => {
    console.log('上传切换');
    if (data.fileList1.length == 0) {
        data.imgbol = false
        return
    }
    data.imgbol = true
}


const secondInpblur = (val:any) => {
    console.log('val',val);
    let str = val.detail.value
    console.log('str',str);
    
    // data.textvalue = str.replace(/\n/g, '<br>')
    if(!data.textvalue){
        data.textbol = false
        return
    }
    data.textbol = true
}



const clickBtn = (status:number) =>{
    if (!isnotNull.value) {
        return
    }

    let utcRecord = new Date(!data.dateTimeValue ? data.nowTime : data.dateTimeValue).getTime()

    let upInfo = {
        baseInfo: {
            title: '',
            desc: data.textvalue,
            type: 3,
            images: data.fileList1,
            cover: data.fileList1[0],
            utcRecord: (utcRecord / 1000),
            tagIds: data.selectValue ? [999] : [],
            tagNames: data.selectValue ? ['大事记'] : [],
            lng: data.lng,
            lat: data.lat,
            address: data.regionText
        },
        auditId: props.auditId,
    }

    if (props.ischange == 1) {
        enjoysubmit({
            ...upInfo
        }).then((res:any) => {
            bcNotify.value.show('修改成功')

            setTimeout(()=>{
                uni.navigateBack()
            },1000)
        })
        return
    }

    
    const uniqueId = TempStorage.savewx(upInfo)
    uni.setStorageSync('enjoyUpObj',{ uniqueId })
    uni.navigateBack()


    // Throttle(() => {
	// 	dispatchWEvent(CareEvents.Get__Address, upInfo)
	// }, 800)

}


// onUnload
const outLoadfun = () => {
    
    if ( data.textbol || data.imgbol) {
        if (props.ischange == 2) {
            notpreserve()
            return
        }
        console.log('页面退出保存草稿');
        data.showPopup = true
    }else{
        data.showPopup = false
        notpreserve()
    }
    
}

const notpreserve = () => {
    uni.navigateBack()
}

const preserve = () => {
    data.showPopup = false
    notpreserve()
}


const confirm = (val:string) => {
    data.dateTimeValue = val
}

const openTimePicker = () => {
    data.openDateTimePicker = true
}

const positionFun = () => {
    uni.chooseLocation({
        success: (res:any) => {
            console.log('res',res);
            
            data.regionText = res.address.slice(0,9)
            data.lat = res.latitude
            data.lng = res.longitude

            console.log('data.lat',data.lat);
            console.log('data.lng',data.lng);
            
        }
    })
}

const delAudit = () => {
    emit('delAudit', data.contentId)
}

defineExpose({
    outLoadfun
})

</script>

<style scoped>
/* tn-input tn-text-left tn-border-bottom tn-underline tn-input */
:deep(.tn-input .tn-text-left .tn-border-bottom .tn-underline .tn-input) {
    font-size: 36rpx;
}
:global(.tn-input .tn-text-left .tn-border-bottom .tn-underline .tn-input) {
    font-size: 36rpx;
}
</style>

<style lang="scss" scoped>
.article_page{
    padding: 30rpx;
    box-sizing: border-box;
    .textarea_box{
        width: 100%;
        position: relative;
        .textarea_inp{
            min-height: 240rpx;
            width: 100%;
            padding: 14rpx;
            padding-bottom: 30rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #F2F2F2;
        }
    }
    .up_img_inp{
        padding: 32rpx 0;
        box-sizing: border-box;

        .up_box{
            width: 228rpx;
            height: 228rpx;
            background: #F8F8F8;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .up_text{
                margin-top: 24rpx;
                font-size: 24rpx;
                color: #C9C9C9;
                font-weight: 400;
            }
        }
    }
    .position_box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 28rpx 24rpx;
        box-sizing: border-box;
        background: #F5F5F5;
        border-radius: 12rpx;
        margin-bottom: 16rpx;
        .position_left{
            display: flex;
            align-items: center;
            .position_text{
                margin-left: 14rpx;
                font-weight: 400;
                font-size: 28rpx;
                color: #B9B9B9;
            }
        }
    }
    .sign_box{
        padding: 24rpx 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16rpx;
        border-bottom: 2rpx solid #F2F2F2;
        .sign_left{
            display: flex;
            align-items: center;
            .sign_icon{
                width: 40rpx;
                height: 40rpx;
                margin-right: 12rpx;

            }
            .sign_text{
                font-size: 30rpx;
                color: #333333;
            }
        }
    }
    .record_time_box{
        padding: 24rpx 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 216rpx;
        border-bottom: 2rpx solid #F2F2F2;
        .record_time_left{
            display: flex;
            align-items: center;
            .record_time_icon{
                width: 40rpx;
                height: 40rpx;
                margin-right: 12rpx;
            }
            .record_time_text{
                font-size: 30rpx;
                color: #333333;
            }
        }
        .record_time_right{
            display: flex;
            align-items: center;
            .time_text{
                font-size: 28rpx;
                color: #999999;
                margin-right: 16rpx;
            }   
        }
    }
    
}

.bottom_box{
    display: flex;
    align-items: center;
    border-top: 2rpx solid #F2F2F2;
    padding: 20rpx 30rpx;
    padding-bottom: 50rpx;
    box-sizing: border-box;
    background: #fff;
    
	.bottom_box_btn {
		font-size: 32rpx;
		height: 80rpx;
		width: 100%;
		text-align: center;
		color: #FFFFFF;
        background: #EA3E1A;
        line-height: 80rpx;
		border-radius: 46rpx;
        

	}
}
.change_bottom_box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2rpx solid #F2F2F2;
    padding: 20rpx 30rpx;
    padding-bottom: 50rpx;
    box-sizing: border-box;
    background: #fff;
    .del_btn{
        width: 220rpx;
        height: 80rpx;
        background: #FFFFFF;
        border: 2rpx solid #BFBFBF;
        font-size: 32rpx;
        color: #535353;
        font-weight: 400;
        text-align: center;
        line-height: 80rpx;
		border-radius: 46rpx;

    }
    .up_btn{
        font-size: 32rpx;
		height: 80rpx;
		width: 450rpx;
		text-align: center;
		color: #FFFFFF;
        background: #EA3E1A;
        line-height: 80rpx;
		border-radius: 46rpx;
    }
}
.popup_box{
    width: 500rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 50rpx 0rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    .popup_box_top{
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
        text-align: center;
        margin-bottom: 50rpx;
    }  
    .popup_box_bottom{
        width: 100%;
        border-top: 2rpx solid #F0F0F0;
        display: flex;
        align-items: center;
        .not_preserve{
            padding: 22rpx 0rpx;
            box-sizing: border-box;
            text-align: center;
            font-weight: 400;
            font-size: 28rpx;
            color: #666666;
            width: 100%;
        }
        .preserve{
            padding: 22rpx 0rpx;
            box-sizing: border-box;
            text-align: center;
            font-weight: 400;
            font-size: 28rpx;
            color: #399BFC;
            width: 100%;
            border-left: 2rpx solid #F0F0F0;
        }

    }
}

.bar {
    width: 100%;
    height: 8rpx;
    background-color: #F8F9F9;
}
</style>
  