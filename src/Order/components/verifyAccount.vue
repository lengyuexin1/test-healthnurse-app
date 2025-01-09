<template>
    <!-- <TnPopup v-model="data.showBox" open-direction="center" :radius="20" :overlay-closeable="false">
        <view class="container" v-if="data.showBox">
            <view class="text_box">
                app登录账号与小程序登录的账号不一致是否切换登录?
            </view>
            <view class="bottom_box">
                <view class="btn_box del" @click="delFun">取消</view>
                <view class="btn_box confirm" @click="tologin">确认</view>
            </view>
        </view>
    </TnPopup> -->
    <view class="bg_box" v-if="data.showBox">
        <view class="container" v-if="data.showBox">
            <view class="text_box">
                app登录账号与小程序登录的账号不一致是否切换登录?
            </view>
            <view class="bottom_box">
                <view class="btn_box del" @click="delFun">取消</view>
                <view class="btn_box confirm" @click="tologin">确认</view>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { PlatformManage } from "@bc/sys"
import { gotoIndex } from "@/routes/public-routes"
import { gotoLogin } from "@/routes/public-routes"
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'


interface Props {
}

const props = defineProps<Props>()

interface Data {
    showBox: boolean
}
const data = reactive<Data>({
    showBox: false
})


onMounted(()=>{
})

const checkUser = (userId:string) => {
    console.log('userId',userId);

    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            tologin()
            return
        }
        PlatformManage.getToken().then((res:any) => {
            if (userId.replace(/["\s]+/g, '') == res.id) {
                console.log('账号一致不需要登录');
                return
            }
            data.showBox = true
        })
    })
    
}

const delFun = () => {
    gotoIndex()
}

const tologin = () => {
    let routes = getCurrentPages() as any; 
    let curRoute = routes[routes.length - 1].route 
    let curParam = routes[routes.length - 1].options; 

    let param = ''
    for (let key in curParam) {
        param += '&' + key + '=' + curParam[key]
    }
    param = '?' + param.slice(1);
    console.log('');
    
    console.log('curRoute',curRoute);
    console.log('param',param);
    console.log(curRoute+param);
    

    uni.setStorageSync('saveCurRoute', curRoute+param)
    gotoLogin({
        toSaveRoute: 1
    })
}


defineExpose({
    checkUser,
})

</script>
  
<style lang="scss" scoped>
.bg_box{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
}
.container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500rpx;
    height: 260rpx;
    background: #fff;
    border-radius: 20rpx;
    z-index: 10;
    .text_box{
        padding: 48rpx;
        box-sizing: border-box;
        color: #333333;
        font-size: 30rpx;
    }
    .bottom_box{
        display: flex;
        align-items: center;
        width: 100%;
        border-top: 2rpx solid #F0F0F0;
        .btn_box{
            width: 49%;
            padding: 20rpx 0rpx;
            box-sizing: border-box;
            font-size: 28rpx;
            color: #666666;
            text-align: center;
            &.del{
                border-right: 2rpx solid #F0F0F0;
            }
            &.confirm{
                color: #399BFC;
            }
        }
    }

}
</style>
  