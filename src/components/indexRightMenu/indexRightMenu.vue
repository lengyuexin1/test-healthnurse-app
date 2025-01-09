<template>
    <view class="container">
        <!-- 右侧菜单 -->
        <TnPopup v-model="showLeftMenu" open-direction="right" :z-index="30000">
            <view class="left_popup_box"> 
                <view>
                    <view class="left_popup_top not_bottom">
                        <block v-for="item in data.topMenu" :key="item.id">
                            <view class="top_item"  v-if="item.id!=1||data.activityType"  @click="topmenu(item)">
                                <image
                                    class="item_img"
                                    :src="getAssetsUrl(item.icon)"
                                    mode="scaleToFill"
                                />
                                <view class="item_text">
                                    {{ item.name }}
                                </view>
                            </view>
                        </block>
                        
                    </view>
                    
                </view>
                <view class="left_popup_bottom">
                    <view  v-for="item in data.bottomMenu" :key="item.id" @click="botMenu(item)">
                        <view class="bottom_item">
                             <image
                            class="item_img"
                            :src="getAssetsUrl(item.icon)"
                            mode="scaleToFill"
                        />
                        <view class="item_text" >
                            {{ item.name }}
                        </view>
                        </view>
                    </view>
                </view>
            </view>

            <BCNotify ref="bcNotify"></BCNotify>

        </TnPopup>
    </view>
</template>
     
<script setup lang="ts">
import { ref, computed,onMounted, reactive, defineEmits, defineProps } from 'vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import { gotoSetting, gotoLogin } from "@/routes/public-routes"
import { gotoChatPage } from "@/routes/nim-routes"
import { createTeam } from "@/api/nim-api"
import { PlatformManage } from '@bc/sys'
import { gotoRegister} from '@/routes/goods-routes'

import { rewardExist } from '@/api/user-api'
import { gotoCommentList } from "@/routes/user-routes"
import { gotoAddMerchant } from '@/routes/create-routes'
import { getQRPage } from '@/api/open-api'

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: '',
	},
})
 
const emit = defineEmits(['update:modelValue'])
 
const showLeftMenu = computed({
	get() {
		return props.modelValue
	},
	set(newValue) {
		emit('update:modelValue', newValue)
	},
})
    onMounted(()=>{
        rewardExist({ platformType: 2 }).then(res => {
           if(res==0){
            data.activityType=false
            return
           }
             data.activityType=true
        }).catch((error:any) => {
             data.activityType=false
        })
    })
     
interface Data {
    topMenu:any,
    bottomMenu:any,
    activityType:boolean
}
const data = reactive<Data>({
    activityType:false,
    topMenu:[
        {id:1,name:'签到红包',icon:'/leyou/home/sign-in-icon.svg'},
        {id:2,name:'写评语',icon:'/leyou/menu/tocomment_icon.svg'},
        {id:3,name:'创作入驻',icon:'/leyou/home/comment-icon.svg'},
        {id:4,name:'商户入驻',icon:'/leyou/menu/addgood_icon.svg'},
    ],
    bottomMenu:[
        {id:1,name:'设置',icon:'/leyou/home/settings-icon.svg'},
        {id:2,name:'帮助与客服',icon:'/leyou/home/customer-icon.svg'},
        {id:3,name:'扫一扫',icon:'/leyou/home/scanningbtn-icon.svg'},
    ],

})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const bcNotify = ref()

const topmenu = (item:any) => {
    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(()=>{
                gotoLogin({})
            },1000)
            return
        }
        item.id == 1 && gotoRegister()
        item.id == 2 && gotoCommentList(0)
        item.id == 3 && gotoAddMerchant('content')
        item.id == 4 && gotoAddMerchant('sale')
    })
}
const botMenu = (item:any) => {
    if (item.id == 1) {
        gotoSetting()
        return
    }
    if (item.id == 2) {
        PlatformManage.getToken().then((token: any) => {
            createTeam({
                userId: token?.id,
                userName: token?.nickname,
                userThumb: token?.avatar,
                flag: 1, //1小程序用户，2服务人员
                shopId: token?.shopId ?? 0,
                type: 1 // 1平台，2店铺
            }).then((res) => {
                gotoChatPage({
                    to: res.tid,
                    scene: 'customer',
                    originPage: 'IndexPage/pages/index/index'
                })
            }).catch((err) => {
                bcNotify.value.show(err.message)
            })
        })
    }
    if (item.id == 3) {
        scanCode()
        return
    }
}


const scanCode= () => {
    uni.scanCode({
        success: function(res) {

            let [path, str] = res.path.split('?');
            let [type, scene] = str.split('=');

            getQRPage({scene}).then((page) => {
                console.log('page', page)
                uni.navigateTo({
                    url: decodeURIComponent(page)
                })
            }).catch(() => {
                bcNotify.value.error('二维码失效')
                return
            })

        }
    })
}

</script>
  
<style lang="scss" scoped>

.left_popup_box{
    width: 500rpx;
    height: 100%;
    padding: 120rpx 52rpx 100rpx 52rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .left_popup_top{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        border-bottom: 2rpx solid #F2F2F2;
        margin-bottom: 20rpx;
        &.not_bottom{
            border-bottom: none;
        }
        .top_item{
            display: flex;
            align-items: center;
            margin-bottom: 46rpx;
            .item_img{
                width: 40rpx;
                height: 40rpx;
                margin-right: 30rpx;
            }
            .item_text{
                font-size: 28rpx;
                color: #333434;
                font-weight: 500;
            }
        }
    }
    .left_popup_bottom{
        padding: 0rpx 12rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .bottom_item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            margin-bottom: 12rpx;
            .item_img{
                width: 64rpx;
                height: 64rpx;
                margin-bottom: 8rpx;    
            }
            .item_text{
                font-size: 28rpx;
                color: #666666;
                font-weight: 500;
            }
        }
    }
}
</style>
  