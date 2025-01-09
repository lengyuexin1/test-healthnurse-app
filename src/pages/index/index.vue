<template>
    <view class="container" ></view>

</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, getCurrentInstance } from 'vue'
import { onLoad, onShow, onReady } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'

import { PlatformManage } from "@bc/sys"
import { gotoIndex } from "@/routes/public-routes"
import { getQRPage } from '@/api/open-api'
import { gotoLogin } from "@/routes/public-routes"


interface Data {
    firstLoad: number
}

const data = reactive<Data>({
    firstLoad: 1,
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onLoad(({ hideId = null, tabids = null, option = null, scene = null } = {}) => {
    
    console.log('onLoad1111');
    

    if (scene) {

        console.log('onLoad2222',scene);
        

        let invid = scene.replace(/share_/, '')
        
        if (/share_/.test(scene)) {
            uni.setStorageSync('scene', 1)
        }
        else if (/id_/.test(scene)) {
            invid = scene.replace(/id_/, '')
            uni.setStorageSync('scene', 1)
        }
        else if (/ci_/.test(scene)) {
            console.log('二维码转发')
            getpage(scene)
            return
        }
        else {

            uni.setStorageSync('scene', invid)
        }

        console.log('invid',invid);
        PlatformManage.isRequireLogin().then((isRequireLogin) => {
            if (isRequireLogin) {
                console.log('新用户邀请登录');
                console.log(4);
                
                gotoLogin({
                    inviteId: invid
                })
                return
            }
            gotoIndex()
            console.log('不是新用户');

        })

    }else{

        console.log('onLoad3333');

        gotoIndex()

    }
    
})
onShow(()=>{
    if (data.firstLoad > 1) {
        console.log('第二次进入首页跳转页222');
        gotoIndex()
    }else{
        console.log('第一次进入首页跳转页111');
    }
    data.firstLoad = data.firstLoad + 1
    
})


const getpage = (scene:any) => {
    getQRPage({scene}).then((page) => {
        console.log('page', page)
        uni.navigateTo({
            url: decodeURIComponent(page)
        })
    }).catch(() => {
        return
    })
}

</script>


<style lang="scss" scoped>
</style>