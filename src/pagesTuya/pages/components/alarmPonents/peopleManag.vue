<template>
    <z-paging ref="paging" :auto="true" v-model="dataList" @query="queryList" :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="暂无数据~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }">
        <view class="peoption" v-for="(calerInfo) in dataList" :key="calerInfo.id">
            <view class="row j-between">
                <view class="peoplef">
                    <view class="peopmat">接警人：{{ calerInfo.name || '--' }}</view>
                    <view class="peopmat">接警人电话：{{ calerInfo.mobile || '--' }}</view>
                    <view class="peoptow row i-center">
                        <view class="peopmat">接受电话：{{ calerInfo.telNotify || '--' }}</view>
                        <view class="peopmat">接受短信：{{ calerInfo.smsNotify || '--' }}</view>
                    </view>
                    <view class="peopmat">绑定时间：{{ calerInfo.utcCreated || '--' }}</view>
                </view>
                <view class="peoprig">
                    <TnAvatar :url="getAssetsUrl('/default/smart-caller.png')" size="116rpx"></TnAvatar>
                </view>
            </view>
            <view class="propfot row i-center j-between">
                <view class="popfotlet row i-center j-between">更新时间：{{ calerInfo.utcModified || '--' }}</view>
                <view class="popfotrig row i-center j-center" @click="linkCaller(calerInfo)">
                    <text>点击编辑</text>
                    <TnIcon name="arrow-right-double" color="#ffffff" size="18"></TnIcon>
                </view>
            </view>
        </view>
        <template #bottom>
            <view class="fotbtn">
                <TnButton width="90%" @click="linkDeviceSetup" height="90" text-color="#fff" font-size="32rpx"
                    bg-color="#111214" border-color="#E3E3E3">通知设置</TnButton>
            </view>
        </template>
    </z-paging>
</template>

<script lang="ts" setup>
import TnAvatar from '@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { gotoCaller, gotoDeviceSetup } from '@/routes/active-routes'
import { getAssetsPic } from '@/common/setPicture'
import { getCallerList } from "@/api/room-api"
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import dayjs from "dayjs"
import { ref, computed } from 'vue'
const calerInfo:any = ref({})
const dataList:any = ref([])

interface Props {
    deviceId: string
}
const paging = ref()
const props = defineProps<Props>()
console.log(props)

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const queryList = (pageNumber, pageSize) => {
    getCallerList().then(res => {
        paging.value.complete(res.map(x => ({
            ...x,
            utcCreated: dayjs(x.utcCreated * 1000).format("YYYY-MM-DD HH:mm:ss"),
            utcModified: dayjs(x.utcModified * 1000).format("YYYY-MM-DD HH:mm:ss"),
            smsNotify: x.smsNotify === 1 ? '是' : '否',
            telNotify: x.telNotify === 1 ? '是' : '否'
        })))
    })
}
queryList(1, 10)
// 接警人编辑
const linkCaller = (info) => {
    gotoCaller(info.id)
}
// 通知设置
const linkDeviceSetup = () => {
    gotoDeviceSetup()
}

</script>

<style lang="scss" scoped>
.content {
    height: 100%;
}

.peoption {
    margin: 30rpx 20rpx;
    background: linear-gradient(270deg, #E3F2EE 0%, #F6FFFC 100%);
    box-shadow: 0rpx 8rpx 12rpx #CAE2D4;
    border-radius: 16rpx;
    overflow: hidden;
    padding: 40rpx 40rpx 0;
    position: relative;

    &::after {
        content: "";
        display: block;
        height: 72rpx;
        margin-top: 28rpx;
    }

    .peopmat {
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        margin-bottom: 20rpx;
    }

    .peoptow {
        .peopmat:last-child {
            margin-left: 40rpx;
        }
    }

    .peopedit {
        margin-top: 30rpx;
        width: 136rpx;
        height: 60rpx;
        background: #3AD57E;
        border-radius: 30rpx;

        .editxt {
            font-weight: 400;
            font-size: 28rpx;
            color: #FFFFFF;
            margin-left: 8rpx;
        }
    }

    .propfot {
        height: 72rpx;
        // background-color: #29C86F;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        font-weight: 400;
        font-size: 28rpx;
        color: #FFFFFF;
        overflow: hidden;

        &::after {
            content: "";
            position: absolute;
            width: 516rpx;
            top: 0;
            bottom: 0;
            left: 0;
            background-image: url("https://res.baochuncare.com/webapplet/zhihu/caller-bg1.png");
            background-size: cover;
            background-repeat: no-repeat;
            transform: translateX(-20rpx);
        }

        .popfotlet {
            padding-left: 40rpx;
            flex: 1;
            height: 72rpx;
            position: relative;
            z-index: 10;
        }

        .popfotrig {
            padding: 0 16rpx 0 48rpx;
            background-image: url("https://res.baochuncare.com/webapplet/zhihu/caller-bg2.png");
            background-size: cover;
            background-repeat: no-repeat;
            height: 72rpx;
            width: 224rpx;
            box-sizing: border-box;
        }
    }
}

.peoptips {
    position: fixed;
    left: 20rpx;
    right: 20rpx;
    bottom: 128rpx;
    background: #E5E7EB;
    border-radius: 16rpx;
    padding: 30rpx 42rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: #616161;

    .tipicon {
        margin-right: 12rpx;
        float: left;
    }
}

.fotbtn {
    display: flex;
    justify-content: center;
}
</style>
