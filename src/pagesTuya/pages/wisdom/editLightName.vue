<template>
    <z-paging ref="paging" :auto="false" :refresher-enabled="false">
        <template #top>
            <PageTopbg :zIndex="-1"></PageTopbg>
            <bc-page-navbar :title="'按键设置'"></bc-page-navbar>
        </template>
        <view class="topImg">
            <image class="imgBox" :src="getAssetsUrl('/device/airCond/editName.png')" alt="" />
        </view>
        <view class="setTitle">设置按键名称及房间</view>
        <view class="uLList">
            <view class="itemCs" @click="openTap(item)" v-for="(item, index) in listNum">
                <view class="titfir">按键{{ index + 1 }}</view>
                <view class="editName">
                    <view>名称</view>
                    <view>{{ item.name }}
                        <TnIcon name="right"></TnIcon>
                    </view>
                </view>
            </view>
        </view>
    </z-paging>
    <TnPopup v-model="createShow" @close="createShow = false" mode="center" round="20" :safeAreaInsetBottom="false">
        <view class="catebox">
            <view class="catecls">
                <TnIcon @click="createShow = false" bold name="close" size="28" color="#333333"></TnIcon>
            </view>
            <view class="catetit">{{ flagName }}</view>
            <view class="cateinp">
                <input v-model="newRoomName" class="inptxt" type="text" maxlength="7" placeholder="请输入名称">
            </view>
            <view class="catebtn">
                <TnButton border-color="#E3E3E3" text-color="#fff" font-size="32rpx" width="100%" height="90"
                    bg-color="#28c86e" @click="addRoom">确定
                </TnButton>
                <BCNotify ref="bcNotify"></BCNotify>
                <!-- <u-button @click="createRoom" :disabled="!newRoomName" color="#29C86F" shape="circle" text="确定"
                        :customStyle="{ height: '84rpx' }"></u-button> -->
            </view>
        </view>
    </TnPopup>
</template>
<script setup lang="ts">
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getAssetsPic } from '@/common/setPicture'
import { ref, reactive, computed } from 'vue'
import { tuyaDetail, editName } from "@/api/room-api"
import { onLoad } from '@dcloudio/uni-app'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'

const createShow = ref(false)
const flagName = ref('')
const newRoomName = ref('')
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const listNum: any = ref([])
const deviceId = ref('')

onLoad((option: any) => {
    deviceId.value = option.id
    initDetail(option.id)
})

const initDetail = (id:any) => {
    tuyaDetail(id).then((res: any) => {
        listNum.value = res.attributes.filter((item: any) => {
            return item.code.includes('switch')
        })
        console.log(listNum.value)
    })
}

const jiCode = ref('')
const openTap = (item: any) => {
    createShow.value = true
    flagName.value = item.name
    jiCode.value = item.code
}

const addRoom = () => {
    if (!newRoomName.value) {
        return
    }
    console.log(newRoomName.value)

    const datas = {
        code: jiCode.value,
        devId: deviceId.value,
        name: newRoomName.value
    }
    editName(datas).then(res => {
        console.log(res)
        uni.showToast({
            title: '修改成功',
            icon: 'none'
        })
        createShow.value = false
        initDetail(deviceId.value)
    })

}
</script>
<style scoped lang="scss">
.topImg {
    margin: 30rpx;
}

.imgBox {
    width: 148rpx;
    height: 148rpx;
}

.setTitle {
    font-weight: 600;
    font-size: 32rpx;
    color: #333333;
    margin-left: 30rpx;
}

.editName {
    display: flex;
    justify-content: space-between;
    font-size: 30rpx;
    color: #333333;
}

.uLList {
    margin: 30rpx;

    .itemCs {
        background: #fff;
        margin-bottom: 24rpx;
        padding: 30rpx;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
    }

    .titfir {
        font-weight: 600;
        font-size: 32rpx;
        color: #333333;
        margin-bottom: 30rpx;
    }
}

.catebox {
    box-sizing: border-box;
    width: 620rpx;
    background: #FFFFFF;
    border-radius: 40rpx;
    padding: 36rpx;
    position: relative;

    .catecls {
        margin-bottom: 12rpx;
        display: flex;
        justify-content: flex-end;
    }

    .catetit {
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
    }

    .catedesc {
        margin-top: 12rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        text-align: center;
    }

    .catemobile {
        margin-top: 50rpx;
        font-weight: bold;
        font-size: 30rpx;
        color: #333333;
        text-align: center;
    }

    .cateinp {
        background: #F6F6F6;
        border-radius: 16rpx;
        padding: 22rpx 30rpx;
        margin-top: 20rpx;

        .inptxt {
            width: 100%;
            font-size: 28rpx;
        }

        .codebox {
            width: 164rpx;
        }
    }

    .catebtn {
        margin-top: 50rpx;
    }

    .catebg {
        height: 124rpx;
        opacity: 0;
    }

    .cateopt {
        height: 90rpx;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 20;
        border-top: 2rpx solid #F0F0F0;

        .cateoptli {
            width: 50%;
            height: 90rpx;
            font-weight: bold;
            font-size: 28rpx;
            color: #666666;

            &:last-child {
                color: #399BFC;
                border-left: 2rpx solid #F0F0F0;
            }
        }
    }
}
</style>
