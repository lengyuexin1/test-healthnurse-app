<template>
    <view class="container">
        <z-paging ref="paging" :auto="true" v-model="data.dataList" @query="queryList" :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="暂无数据~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }">
            <template #top>
                <PageTopbg :zIndex="-1"></PageTopbg>
                <bc-page-navbar :title="'房间管理'"></bc-page-navbar>
                <!-- <input type="text" placeholder="请输入pad登录码" v-model="loginCode" /> -->
            </template>
            <view class="roombox page-public-bg">
                <TnCheckboxGroup v-model="delRimId" placement="column" shape="circle" activeColor="#29C86F"
                    @change="checkboxChange">
                    <view class="rows" v-for="(item, index) in data.dataList" :key="index">
                        <view class="roomcheck row i-center" v-if="delShow">
                            <TnCheckbox size="lg" checked-shape="circle" :label="item.id"></TnCheckbox>
                        </view>
                        <view class="roomli row i-center j-between" @click="linkDeviceManag(item)">
                            <view class="row i-center">
                                <TnAvatar :url="getAssetsUrl('/default/smart-room.png')" size="80"></TnAvatar>
                                <view class="roomnime">{{ item.name }}</view>
                            </view>
                            <view>
                                <TnIcon name="right" size="36" color="#BEBEBE"></TnIcon>
                            </view>
                        </view>
                    </view>
                </TnCheckboxGroup>
            </view>
            <template #bottom>
                <view class="romnagtom">
                    <view class="romnagbox row i-center j-between" v-if="!delShow">
                        <view class="romnagbtn btn">
                            <TnButton border-color="#E3E3E3" plain text-color="#535353" font-size="32rpx" width="100%"
                                height="90" bg-color="#fff" @click="delShow = true">管理
                            </TnButton>
                        </view>
                        <view class="romnagbtn btn">
                            <TnButton width="100%" height="90" text-color="#fff" font-size="32rpx" bg-color="#29C86F"
                                border-color="#E3E3E3">扫码登录</TnButton>
                        </view>
                    </view>
                    <view class="romnagboxs row i-center j-between" v-if="delShow">
                        <TnCheckboxGroup v-model="allList" placement="row" shape="circle" activeColor="#29C86F"
                            @change="unanimous">
                            <TnCheckbox size="lg" label="全选" checked-shape="circle">全选</TnCheckbox>
                        </TnCheckboxGroup>
                        <view class="roomeWid">
                            <TnButton border-color="#E3E3E3" plain text-color="#535353" font-size="32rpx" width="100%"
                                height="90" bg-color="#fff" @click="abolish">取消
                            </TnButton>
                        </view>
                        <view class="roomeWid">
                            <TnButton border-color="#E3E3E3" text-color="#fff" font-size="32rpx" width="100%" height="90"
                                bg-color="#29C86F" @click="openRemove">删除
                            </TnButton>
                        </view>
                    </view>
                </view>
            </template>
        </z-paging>
        <view class="deviceadd column i-center j-center" @click="data.createShow = true" v-if="!delShow">
            <TnIcon name="add" size="38" bold="true" color="#fff"></TnIcon>
            <view class="devicetxt">添加</view>
        </view>
        <TnPopup v-model="data.createShow" @close="data.createShow = false" mode="center" round="20"
            :safeAreaInsetBottom="false">
            <view class="catebox">
                <view class="catecls">
                    <TnIcon @click="data.createShow = false" bold name="close" size="28" color="#333333"></TnIcon>
                </view>
                <view class="catetit">新增使用者</view>
                <view class="cateinp">
                    <input v-model="newRoomName" class="inptxt" type="text" maxlength="7" placeholder="请输入房间名称">
                </view>
                <view class="catebtn">
                    <TnButton border-color="#E3E3E3" text-color="#fff" font-size="32rpx" width="100%" height="90"
                        bg-color="#29C86F" @click="addRoom">确定
                    </TnButton>
                    <BCNotify ref="bcNotify"></BCNotify>
                    <!-- <u-button @click="createRoom" :disabled="!newRoomName" color="#29C86F" shape="circle" text="确定"
                        :customStyle="{ height: '84rpx' }"></u-button> -->
                </view>
            </view>
        </TnPopup>
        <BCNotify ref="bcNotify" v-if="!data.createShow"></BCNotify>
    </view>
</template>
<script setup lang="ts">
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnAvatar from '@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar.vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import TnCheckboxGroup from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox-group.vue'
import { ref, reactive, computed, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { gotoRoomDetail, gotoTuYa } from "@/routes/wisdom-routes"
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { creatRoom, allRoomList, patientDelete } from "@/api/room-api"
interface Data {
    dataList: any
    createShow: boolean
}
const data = reactive<Data>({
    dataList: [],
    createShow: false
})
const bcNotify = ref()
const removeShow = ref(false)
const paging = ref()
const newRoomName = ref('')
const allList: any = ref([])
const delShow = ref(false)
const loginCode = ref('')  //'00:02:00:00:00:00:00:00:00:00:00:02' // 登录码
const delRimId: any = ref([])
const abolish = () => {
    delShow.value = false
    delRimId.value = []
    allList.value = []
}
const unanimous = (e) => {
    console.log(e)

    if (e.length === 0) {
        delRimId.value = []
    } else {
        delRimId.value = data.dataList.map((x: any) => x.id)
    }
}
const checkboxChange = (e) => {
    console.log(e);
    if (e.length === data.dataList.length) {
        allList.value = ['全选']
    }
    else {
        allList.value = []
    }
}
const linkDeviceManag = (item: any) => {
    if (delShow.value) { return }
    // 有登录码 进行登录pad操作
    if (loginCode.value) {
        auditLoginCode({
            loginCode: loginCode.value,
            patientId: item.id
        }).then(() => {
            // uni.$u.toast('登录成功，请前往pad端查看')
            loginCode.value = ''
        }).catch((err:any) => {
           console.log(err.message)
        })
        return
    }
    uni.setStorageSync('roomId', item.id)
    gotoRoomDetail(item.id, item.name)
    /* gotoDeviceManag({
        roomId: item.id,
        roomName: item.name
    }) */
}
const queryList = (pageNumber, pageSize) => {
    allRoomList({
        pageSize,
        pageNumber,
        query: {}
    }).then(res => {
        paging.value.complete(res.data)
    }).catch(() => {
        paging.value.complete(false)
    })
}
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const addRoom = () => {
    if (!newRoomName.value.trim()) {
        bcNotify.value.show('名称不能为空')
        return
    }
    creatRoom({
        id: null,
        name: newRoomName.value
    }).then((res: any) => {
        data.createShow = false
        newRoomName.value = ""
        queryList(1, 10)
    }).catch(err => {

    })
}
const openRemove = () => {
    if (delRimId.value.length <= 0) {
        bcNotify.value.show("请选择需要删除的房间")
        return
    }
    removeShow.value = true
    patientDelete({
        code: '8888',
        patientIds: delRimId.value
    }).then(() => {
        bcNotify.value.show("删除成功")
        delRimId.value = []
        allList.value = []
        removeShow.value = false
        paging.value.reload()
    }).catch(err => {
        bcNotify.value.show(err.message)
    })

}
</script>
<style lang="scss" scoped>
.roombox {
    .roomcheck {
        padding-left: 32rpx;
        margin-top: 22rpx;
    }

    .rows {
        display: flex;
        width: 100%;
    }

    .roomli {
        margin: 0 20rpx;
        margin-top: 20rpx;
        padding: 32rpx 40rpx 24rpx;
        background: #FFFFFF;
        border-radius: 24rpx;
        height: 120rpx;
        flex: 1;

        .roomnime {
            margin-left: 20rpx;
            font-size: 32rpx;
            color: #333333;
        }
    }
}

.deviceadd {
    box-shadow: #29C86F;
    background-color: #29C86F;
    width: 108rpx;
    height: 108rpx;
    border-radius: 50%;
    position: fixed;
    right: 40rpx;
    bottom: 280rpx;
    z-index: 999;

    .devicetxt {
        font-size: 24rpx;
        margin-top: 4rpx;
        color: #fff;
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

.romnagtom {
    background: #FFFFFF;
    box-shadow: 0rpx -16rpx 8rpx rgba(0, 0, 0, 0.02);

    .romnagbox {
        height: 130rpx;
        box-sizing: border-box;
        padding: 20rpx 30rpx;

        .btn {
            width: 330rpx;
            border-radius: 50%;
        }
    }

    .romnagboxs {
        height: 130rpx;
        box-sizing: border-box;
        padding: 20rpx 30rpx;

        .roomeWid {
            width: 100%;
            margin-left: 30rpx;
        }
    }
}

:deep(.tn-gray-disabled_border) {
    border-color: #666;
}
</style>
