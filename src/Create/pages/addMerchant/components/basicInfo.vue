<template>
    <view class="wrap">
        <!-- 基本信息 -->
        <view class="item">
            <view class="title">基本信息</view>
            <view class="element tn-flex-center-between">
                <view class="subTitle">店铺Logo</view>
                <view class="up_img_inp">
                    <ClUpload
                        ref="upload"
                        v-model="data.fileList"
                        :listStyle="data.uploadStyle"
                        :max="1"
                        fileType="image"
                        useBeforeDelete
                        useBeforeUpload
                        @beforeDelete="beforeDelete"
                        @beforeUpload="beforeUpload">

                        <template v-slot:addImg>
                            <view class="up_box">
                                <view class="up_icon">
                                    <TnIcon name="add" color="#C9C9C9" size="40"/>
                                </view>
                                <view class="up_text">店铺图片</view>
                            </view>
                        </template>
                    </ClUpload>
                </view>
            </view>
            <view class="sub tn-flex-column">
                <view class="subTitle">店铺名称</view>
                <TnInput custom-class="tnInput" placeholder="请输入店铺名称(最长15个字)" :underline="false" :border="false" :maxlength="15" clearable v-model="data.shopInfo.name"></TnInput>
            </view>
            <view class="sub tn-flex-column">
                <view class="subTitle">店铺简称</view>
                <TnInput custom-class="tnInput" placeholder="请输入店铺简称(最长5个字)" :underline="false" :border="false" :maxlength="5" clearable v-model="data.shopInfo.shortName"></TnInput>
            </view>
            <view class="sub tn-flex-column">
                <view class="subTitle">店铺位置</view>
                <view class="tnInput address" :class="[data.shopInfo.address == '' ? 'empty' : '']" @tap="openAuth">
                    {{ data.shopInfo.address || '请选择店铺位置' }}
                </view>
            </view>
        </view>

        <!-- 店铺信息 -->
        <view class="item">
            <view class="title">店铺信息</view>
            <view class="sub tn-flex-column">
                <view class="subTitle">商户类型</view>
                <view class="tnInput address" :class="[data.pickerMerchant.name == '' ? 'empty' : '']" @tap="data.openPicker = true">
                    {{ data.pickerMerchant.name || '请选择商户类型' }}
                </view>
            </view>
            <view class="sub tn-flex-column">
                <view class="subTitle">商户分类</view>
                <view class="tnInput address empty" @tap="showPicker" v-if="!data.businessList.length">
                    {{ data.businessList.length || '请选择商户分类' }}
                </view>

                <view class="business tnInput" @tap="showPicker" v-if="data.businessList.length">
                    <view class="business_major">
                        <view class="business_major_operate">经营大类</view>
                        <view class="business_major_level">一级类目</view>
                    </view>
                    <view class="business_major" style="background-color: #F9F9F9;" v-for="(item,index) in data.businessList" :key="index">
                        <view class="business_major_operate">{{ item.name }}</view>
                        <view class="business_major_row_level">
                            <view class="business_major_level" v-for="(v,i) in item.categoryName" :key="i">{{ v }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 经营信息 -->
        <view class="item">
            <view class="title">经营信息</view>
            <view class="other tn-flex-center-between">
                <view class="subTitle">经营者是否注册手机号一致</view>
                <TnSwitch v-model="data.isSame" active-color="#EA3E1A" inactive-text="否" active-text="是" @change="switchChange" />
            </view>
            <template v-if="!data.isSame">
                <view class="sub tn-flex-column">
                    <view class="subTitle">手机号</view>
                    <TnInput custom-class="tnInput" placeholder="请输入手机号码" :underline="false" :border="false" :maxlength="11" clearable v-model="data.mobile"></TnInput>
                </view>
                <view class="sub tn-flex-column">
                    <view class="subTitle">验证码</view>
                    <TnInput type="number" custom-class="tnInput" placeholder="请输入验证码" :underline="false" :border="false" :maxlength="4" v-model="data.code">
                        <template #suffix>
                            <TnButton bg-color="white" text-color="#41A0FE" font-size="26rpx" :disabled="data.countdown > 0" @tap="getCode">
                                {{ data.countdown > 0 ? `${data.countdown}秒后重新获取` : '获取验证码' }}
                            </TnButton>
                        </template>
                    </TnInput>
                </view>
            </template>
        </view>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
    <TnPicker v-model="data.pickerMerchant.name" v-model:open="data.openPicker" :data="data.pickerData" @confirm="pickerConfirm" />
    <yk-authpup ref="authpup" :isNativeHead="false" type="top" @changeAuth="changeAuth" permissionID="WRITE_EXTERNAL_STORAGE"></yk-authpup>
    <baTreePicker
        ref="treePicker"
        :selectParent="false"
        :multiple="false"
        @select-change="selectChange"
        title="商户分类"
        :localdata="data.listData"
        valueKey="id"
        textKey="name"
        childrenKey="categories"
    />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import BCNotify from '@/components/notify/index.vue'
import ClUpload from '@/Create/uni_modules/cl-upload/components/cl-upload/cl-upload.vue'
import baTreePicker from "./ba-tree-picker/ba-tree-picker.vue"
import { getAllCategory } from '@/api/create-api'
import { userGetCode } from '@/api/open-api'
import { uploadCertificate } from '@/api/file-api'
import { GlobalEvents, dispatchWEvent } from "@/events/event-registry"

const props = defineProps({
    type: {
        type: String,
        default: ''
    }
})

interface Data {
    fileList: any
    uploadStyle: any
    shopInfo: any
    pickerMerchant: any
    pickerData: any
    openPicker: boolean
    originlaData: any
    businessList: any
    listData: any
    categories: any
    isSame: boolean
    mobile: string
    code: string
    countdown: number
}

const data = reactive<Data>({
    fileList: [],
    uploadStyle: {
        columns: 1,
        columnGap: '0',
        rowGap:'0',
        padding:'0',
        height:'150rpx',
        radius:'20rpx'
    },
    shopInfo: {
        thumb: '',
        name: '',
        shortName: '',
        address: '',
    },
    pickerMerchant: {
        name: ''
    },
    openPicker: false,
    pickerData: [],
    originlaData: [
        { label: '健康商户', value: "health.shop" },
        // { label: '乐悠云课堂', value: "curriculum.shop" },
        { label: '内容创作', value: "ly.content.shop" }
    ],
    businessList: [],
    listData: [],
    categories: [],
    isSame: true,
    mobile: '',
    code: '',
    countdown: 0
})

const treePicker = ref()

const bcNotify = ref()

const authpup = ref()

onMounted(() => {
    console.log(props.type)
    
    if (props.type == 'content') {
        data.pickerData = ['内容创作']
    }
    else if (props.type == 'sale') {
        data.pickerData = ['健康商户']
    }
})

const beforeUpload = (tempFile: any, next: any) => {
    uni.showLoading({
        title: '正在上传..'
    })
    uploadCertificate(tempFile.path).then((res: any) => {
        data.fileList.push(res.url)
        data.shopInfo.thumb = res.url
        uni.hideLoading()
    })
}

/**
* 删除前钩子
* @param {Object} item 当前删除的图片或者视频信息
* @param {Number} index 当前删除的图片或视频索引
* @param {Function} next 调用此函数继续执行组件删除逻辑
* */ 
const beforeDelete = (item: any, index: any, next: any) => {
    uni.showModal({
        title: '提示信息',
        content: '确定要删除这个文件嘛？',
        success: res => {
            if (res.confirm) {
                // 清除信息
                data.fileList = []
                data.shopInfo.thumb = ''
                next()
            }
        }
    })
}

const openAuth = () => {
    // #ifdef APP-PLUS
    authpup.value.open() //调起自定义权限目的弹框,具体可看示例里面很详细
    // #endif
    // #ifndef APP-PLUS
    map()
    // #endif
}

//用户授权权限后的回调
const changeAuth = () => {
    //这里是权限通过后执行自己的代码逻辑
    console.log('权限已授权，可执行自己的代码逻辑了')
    map()
}

const map = () => {
    uni.chooseLocation({
        success: (res) => {
            console.log(res)
            data.shopInfo.address = res.address
            data.shopInfo.lat = res.latitude
            data.shopInfo.lng = res.longitude
        }
    })
}

const showPicker = () => {
    if (data.pickerMerchant.name == '') {
        bcNotify.value.show('请先选择商户类型')
        return
    }
    treePicker.value._show()
}

const pickerConfirm = (value: any) => {
    const filterData = data.originlaData.filter((item: any) => item.label == value)
    data.categories = []
    data.businessList = []

    getAllCategory({ applyId: filterData[0].value }).then((res) => {
        data.listData = res
    })
}

//监听选择（ids为数组）
const selectChange = (ids, names) => {
    // if ((data.pickerMerchant.name == 'agency.shop' || data.pickerMerchant.id == 'health.shop') && data.listData.some((item: any) => ids.includes(item.id))) {
    //     treePicker.value._show()
    //     return
    // }
    data.businessList = []
    data.categories = []
    data.listData.map((item: any) => {
        const categoryObj = {
            categoryId: '',
            sonCategories: []
        }
        const cateNameObj = {
            name: '',
            categoryName: []
        }
        if (ids.some(id => id == item.id)) {
            categoryObj.categoryId = item.id
            categoryObj.sonCategories = item.categories.map(item => item.id)
            cateNameObj.name = item.name
            cateNameObj.categoryName = item.categories.map(item => item.name)
        }
        if (ids.includes(item.id) || item.categories.some(cate => ids.includes(cate.id))) {
            item.categories.map(v => {
                if (ids.some(id => id == v.id)) {
                    const parentId = findParentId(item, v.id)
                    if (parentId == item.id) {
                        categoryObj.categoryId = item.id
                        cateNameObj.name = item.name
                        categoryObj.sonCategories = item.categories.filter(cate => ids.includes(cate.id)).map(ele => ele.id)
                        cateNameObj.categoryName = item.categories.filter(cate => ids.includes(cate.id)).map(ele => ele.name)

                    }
                }
            })
            data.categories.push(categoryObj)
            data.businessList.push(cateNameObj)
        }
    })
    console.log(data.categories)

    const list = []
    data.categories.map((item) => {
        list.push(item.categoryId)
        item.sonCategories.map(v => {
            list.push(v)
        })
    })
    dispatchWEvent(GlobalEvents.Add_Merchant_Sort, list)
    treePicker.value._show()
}

const findParentId = (tree, targetId) => {
    const parent = data.listData.find(child => child.categories && child.categories.some(grandchild => grandchild.id === targetId));
    return parent ? parent.id : null
}

const switchChange = (value: any) => {
    data.isSame = value
}

// 获取验证码倒计时
const getCode = () => {
    if (!data.mobile) {
        bcNotify.value.show('手机号码不能为空')
        return
    }
    userGetCode({ mobile: Number(data.mobile) }).then(() => {
        bcNotify.value.show('验证码发送成功')
        if (data.countdown === 0) {
            data.countdown = 60
            const intervalId = setInterval(() => {
                if (data.countdown > 0) {
                    data.countdown--
                }
                else {
                    clearInterval(intervalId)
                }
            }, 1000)
        }
    })
}

defineExpose({ data })

</script>

<style lang="scss" scoped>
:deep(.tn-image-upload-item) {
    width: 150rpx !important;
    height: 150rpx !important;
    margin-right: 0;
}
:deep(.tn-image-upload) {
    width: 150rpx !important;
    height: 150rpx !important;
}
:deep(.remove) {
    width: 10rpx;
    height: 10rpx;
}

.item {
    margin-bottom: 30rpx;
    padding: 0 30rpx 30rpx 30rpx;
    border-radius: 15rpx;
    background-color: #FFFFFF;


    .title {
        height: 90rpx;
        line-height: 90rpx;
        font-size: 30rpx;
        font-weight: bold;
    }

    .subTitle {
        color: #666666;
        font-size: 28rpx;
        font-weight: bold;
    }

    .element {
        padding: 20rpx 0;
        border-bottom: solid 1rpx #F6F6F6;
    }

    .sub {
        padding: 30rpx 0 0 0;
        border-bottom: solid 1rpx #F6F6F6;
    }

    .other {
        padding: 0 0 30rpx 0;
        border-bottom: solid 1rpx #F6F6F6;
    }
}

.up_img_inp {
    width: 150rpx;
    height: 150rpx;
    // margin-top: 20rpx;

    .up_box{
        width: 150rpx;
        height: 150rpx;
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

.address {
    min-height: 70rpx;
    // line-height: 70rpx;
    padding-left: 16rpx;
    display: flex;
    align-items: center;
}

.business {
    padding-bottom: 30rpx;
    .business_major {
        display: flex;
        padding: 34rpx 0;
        background: #eaf3ee;
        font-size: 24rpx;
        font-weight: 600;
        align-items: center;
        color: #333333;
        .business_major_operate {
            width: 280rpx;
            padding-left: 30rpx;
        }
        .business_major_row_level {
            display: flex;
            flex-wrap: wrap;
        }
        .business_major_level {
            padding-right: 12rpx;
        }
    }
}

.tnInput {
    margin-top: 20rpx;
    padding-bottom: 16rpx;
}

.empty {
    color: #9c9c9c;
}
</style>