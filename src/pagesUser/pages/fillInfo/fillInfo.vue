<template>
    <view class="container">
        <!-- <view class="album item">
            <view class="title">我的头像</view>
            <view class="up_img_inp" v-if="data.showFileBox">
                <view>
                    <imgUpload v-model:imageArr="data.fileList" :limit="1" ref="imgUploadref">
                        <template #uploadBtn>
                            <view @click="openUp" class="up_box">
                                <view class="up_icon">
                                    <TnIcon name="add" color="#C9C9C9" size="60"/>
                                </view>
                                <view class="up_text">头像</view>
                            </view>
                        </template>
                    </imgUpload>
                </view>
            </view>
        </view> -->
        <!-- 我的相册 -->
        <view class="album item">
            <view class="title"><text class="star">*</text>我的相册</view>
            <view class="up_img_inp" v-if="data.showFileBox">
                <view>
                    <imgUpload v-model:imageArr="data.fileList1" :limit="9" ref="imgUploadref1">
                        <template #uploadBtn>
                            <view @click="openUp1" class="up_box">
                                <view class="up_icon">
                                    <TnIcon name="add" color="#C9C9C9" size="80"/>
                                </view>
                                <view class="up_text">相册</view>
                            </view>
                        </template>
                    </imgUpload>
                </view>
            </view>
        </view>
        <view class="mono item">
            <view class="title">内心独白</view>
            <view class="mono-empty tn-flex-row" @tap="data.monoPopup = true">
                <view class="txt" v-if="!data.userInfo.innerMonologue">介绍一下自己，让异性更快了解你</view>
                <view class="txt-input" v-else>{{ data.userInfo.innerMonologue }}</view>
            </view>
        </view>

        <!-- 我的资料, 择偶条件 -->
        <view class="info">
            <view class="tabs">
                <TnTabs v-model="data.currentTabIndex" active-color="#EA3E1A" bar-color="#EA3E1A" color="#7E7E7E" active-font-size="32rpx" font-size="32rpx" :bottom-shadow="false">
                    <TnTabsItem v-for="(item, index) in data.tabsData" :key="index"  :title="item.text" />
                </TnTabs>
            </view>
            
            <view class="list" v-if="data.currentTabIndex == 0">
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>昵称</view>
                    <view class="tnInput address" :class="[!data.userInfo.nickName ? 'empty' : '']" @tap="data.namePopup = true">
                        {{ data.userInfo.nickName || '点击输入' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>性别</view>
                    <view class="tnInput address" :class="[!data.userInfo.sex ? 'empty' : '']" @tap="clickSelect(1)">
                        {{ data.userInfo.sex || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>生日</view>
                    <view class="tnInput address" :class="[!data.userInfo.birthday ? 'empty' : '']" @tap="clickSelectTime(2)">
                        {{ data.userInfo.birthday || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>身高</view>
                    <view class="tnInput address" :class="[!data.userInfo.height ? 'empty' : '']" @tap="clickSelect(13)">
                        {{ data.userInfo.height || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>月收入</view>
                    <view class="tnInput address" :class="[!data.userInfo.income ? 'empty' : '']" @tap="clickSelect(3)">
                        {{ data.userInfo.income || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>居住地</view>
                    <view class="tnInput address" :class="[!data.userInfo.addressDetail ? 'empty' : '']" @tap="map(1)">
                        {{ data.userInfo.addressDetail || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>学历</view>
                    <view class="tnInput address" :class="[!data.userInfo.education ? 'empty' : '']" @tap="clickSelect(5)">
                        {{ data.userInfo.education || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>民族</view>
                    <view class="tnInput address" :class="[!data.userInfo.nationality ? 'empty' : '']" @tap="clickSelect(6)">
                        {{ data.userInfo.nationality || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>籍贯</view>
                    <view class="tnInput address" :class="[!data.userInfo.placeOfOrigin ? 'empty' : '']" @tap="clickSelectReigon(7)">
                        {{ data.userInfo.placeOfOrigin || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
            </view>
            <!-- 择偶条件 -->
            <view class="list" v-else>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>年龄</view>
                    <view class="tnInput address" :class="[!data.conditions.age ? 'empty' : '']" @tap="clickSelect(8)">
                        {{ data.conditions.age || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>身高</view>
                    <view class="tnInput address" :class="[!data.conditions.height ? 'empty' : '']" @tap="clickSelect(9)">
                        {{ data.conditions.height || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>月收入</view>
                    <view class="tnInput address" :class="[!data.conditions.income ? 'empty' : '']" @tap="clickSelect(10)">
                        {{ data.conditions.income || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>学历</view>
                    <view class="tnInput address" :class="[!data.conditions.education ? 'empty' : '']" @tap="clickSelect(11)">
                        {{ data.conditions.education || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
                <view class="sub tn-flex-center-between">
                    <view class="subTitle"><text class="star">*</text>所在城市</view>
                    <!-- clickSelectReigon(12) -->
                    <view class="tnInput address" :class="[!data.conditions.addressDetail ? 'empty' : '']" @tap="map(12)">
                        {{ data.conditions.addressDetail || '请选择' }}
                        <TnIcon name="right" color="#9c9c9c" size="32"/>
                    </view>
                </view>
            </view>
        </view>

        <!-- 详细资料 -->
        <view class="other item" v-if="data.currentTabIndex == 0">
            <view class="title">其他资料</view>
            <view class="sub tn-flex-center-between">
                <view class="subTitle">我的认证</view>
                <view class="tnInput address" :class="[!data.userInfo.authenticate ? 'empty' : '']">
                    {{ data.userInfo.authenticate || '请选择' }}
                    <!-- <TnIcon name="right" color="#9c9c9c" size="32"/> -->
                </view>
            </view>
            <view class="sub tn-flex-center-between">
                <view class="subTitle">我的爱好</view>
                <view class="tnInput address" :class="[!data.userInfo.hobbiesTxt ? 'empty' : '']" @tap="clickHobbies">
                    {{ data.userInfo.hobbiesTxt || '请选择' }}
                    <TnIcon name="right" color="#9c9c9c" size="32"/>
                </view>
            </view>
        </view>

        <!-- 更多资料 -->
        <view class="more item" v-if="data.currentTabIndex == 0">
            <view class="title">更多资料</view>
            <view class="sub tn-flex-center-between">
                <view class="subTitle">体重</view>
                <view class="tnInput address" :class="[!data.userInfo.weight ? 'empty' : '']" @tap="clickSelect(14)">
                    {{ data.userInfo.weight || '请选择' }}
                    <TnIcon name="right" color="#9c9c9c" size="32"/>
                </view>
            </view>
            <view class="sub tn-flex-center-between">
                <view class="subTitle">是否吸烟</view>
                <view class="tnInput address" :class="[!data.userInfo.smoking ? 'empty' : '']" @tap="clickSelect(15)">
                    {{ data.userInfo.smoking || '请选择' }}
                    <TnIcon name="right" color="#9c9c9c" size="32"/>
                </view>
            </view>
            <view class="sub tn-flex-center-between">
                <view class="subTitle">是否喝酒</view>
                <view class="tnInput address" :class="[!data.userInfo.drinkWine ? 'empty' : '']" @tap="clickSelect(16)">
                    {{ data.userInfo.drinkWine || '请选择' }}
                    <TnIcon name="right" color="#9c9c9c" size="32"/>
                </view>
            </view>
            <view class="sub tn-flex-center-between">
                <view class="subTitle">星座</view>
                <view class="tnInput address" :class="[!data.userInfo.constellation ? 'empty' : '']" @tap="clickSelect(17)">
                    {{ data.userInfo.constellation || '请选择' }}
                    <TnIcon name="right" color="#9c9c9c" size="32"/>
                </view>
            </view>
        </view>
    </view>
    <BottomSingleBtn @clickBtn="clickBtn"></BottomSingleBtn>
    <TnPopup v-model="data.namePopup" width="86%" height="400" close-btn open-direction="center">
        <view class="content">
            <view class="title">昵称</view>
            <view class="input">
                <TnInput custom-class="textarea" v-model="data.nickName" :maxlength="20" :border="true" height="90rpx" placeholder="请输入名称" size="sm" />
            </view>
            <view class="btn tn-flex-center-center">
                <TnButton shape="round" width="100%" height="80rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="clickSaveNickName">
                    保存
                </TnButton>
            </view>
        </view>
    </TnPopup>
    <TnPopup v-model="data.monoPopup" width="86%" height="750" close-btn open-direction="center">
        <view class="content">
            <view class="title">内心独白</view>
            <view class="detail">
                <TnInput custom-class="textarea" v-model="data.mono" height="450" type="textarea" :border="true" :show-word-limit="true" :maxlength="200" placeholder="认证写下心意，让缘分主动靠近" size="sm" />
            </view>
            <view class="tips">一段好的内心独白，能帮你更快找到合适的另一半。</view>
            <view class="btn tn-flex-center-center">
                <TnButton shape="round" width="100%" height="80rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="clickSaveMono">
                    保存
                </TnButton>
            </view>
        </view>
    </TnPopup>
    <TnPopup v-model="data.hobbyPopup" width="86%" height="750" close-btn open-direction="bottom">
        <view class="content">
            <view class="title">选择兴趣爱好（可多选）</view>
            <view class="detail">
                <view class="tabs">
                    <TnTabs v-model="data.hobbycurrentTabIndex" :bar="false" active-color="#EA3E1A" bar-color="#EA3E1A" color="#7E7E7E" active-font-size="32rpx" font-size="32rpx" :bottom-shadow="false" @change="changeHobbyTabs">
                        <TnTabsItem v-for="(item, index) in data.hobbyTabsData" :key="index" :title="item.text" />
                    </TnTabs>
                </view>

                <view class="tag-list">
                    <view class="item tn-flex-row" v-for="(item, index) in data.sonInterests" :key="index">
                        <view class="btn tn-flex-center-center" :class="[data.activeCategory.includes(item.id) ? 'active' : '']" @tap="clickInterest(item)">
                            {{ item.name }}
                        </view>
                    </view>
                </view>
            </view>
            <view class="btn tn-flex-center-center">
                <TnButton shape="round" width="100%" height="80rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="clickSaveHobby">
                    保存
                </TnButton>
            </view>
        </view>
    </TnPopup>
    <TnPicker v-model="data.pickerValue" v-model:open="data.openPicker" :data="data.pickerData" @confirm="pickerConfirm" />
    <TnDateTimePicker min-time="1950/01/01" max-time="2023/12/01 12:10:30" :init-current-date-time="false" v-model="data.userInfo.birthday" v-model:open="data.openDateTimePicker" @confirm="timeConfirm" />
    <TnRegionPicker v-model="data.regionValue" v-model:open="data.openRegionPicker" @confirm="regionConfirm" />
    <BCNotify ref="bcNotify"></BCNotify>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, nextTick } from 'vue'
import BCNotify from '@/components/notify/index.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import imgUpload from '@/components/upload/img-upload.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnDateTimePicker from '@tuniao/tnui-vue3-uniapp/components/date-time-picker/src/date-time-picker.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import TnRegionPicker from '@tuniao/tnui-vue3-uniapp/components/region-picker/src/region-picker.vue'
import BottomSingleBtn from '@/components/bottomSingleBtn/index.vue'
import { loveChatUserInfo, loveChatConditionsUserInfo, loveChatUpdateUserInfo, loveChatUpdateConditions, interestsList } from '@/api/user-api'
import { homePage } from '@/api/create-api'
import { PlatformManage } from '@bc/sys'
import { pageController } from '@bc/uni-tools'
import { GlobalEvents, dispatchWEvent } from "@/events/event-registry"

interface Data {
    cardId: any
    userInfo: any
    conditions: any
    // fileList: any
    fileList1: any
    showFileBox: boolean
    tabsData: any
    mono: string
    nickName: string
    currentTabIndex: number
    uploadStyle: any
    selectType: number
    sexList: any
    height: any
    weight: any
    nation: any
    education: any
    income: any
    constellation: any
    orNot: any
    ageRange: any
    heightRange: any
    pickerData: any
    monoPopup: boolean
    hobbyPopup: boolean
    namePopup: boolean
    openPicker: boolean
    regionValue: any
    pickerValue: string
    openDateTimePicker: boolean
    openRegionPicker: boolean

    hobbyList: any
    sonInterests: any
    activeCategory: any
    activeCategoryTxt: any
    hobbyTabsData: any
    hobbycurrentTabIndex: number
}

const data = reactive<Data>({
    cardId: null,
    userInfo: {
        // avatar: '',
        photoAlbum: [],
        innerMonologue: '',
        nickName: '',
        sex: '',
        birthday: '',
        age: '',
        income: '', 
        monthlyIncomeMin: '',
        monthlyIncomeMax: '',
        lng: '',
        lat: '',
        addressDetail: '的法师打发',
        education: '',
        nationality: '',
        placeOfOrigin: '',
        authenticate: '',
        hobbiesTxt: '',
        weight: '',
        height: '',
        smoking: '',
        drinkWine: '',
        constellation: ''
    },
    conditions: {
        age: '',
        height: '',
        income: '',
        education: '',
        addressDetail: '打发第三方'
    },
    // fileList: [],
    fileList1: [],
    showFileBox: false,
    mono: '',
    nickName: '',
    tabsData: [
        {
            text: '我的资料',
        },
        {
            text: '择偶条件',
        }
    ],
    currentTabIndex: 0,
    uploadStyle: {
        columns: 1,
        columnGap: '0',
        rowGap:'0',
        padding:'0',
        height:'150rpx',
        radius:'20rpx'
    },
    selectType: 0,
    sexList: ['男', '女'],
    height: ['150cm', '151cm', '152cm', '153cm', '154cm', '155cm', '156cm', '157cm', '158cm', '159cm', '160cm', '161cm', 
            '162cm', '163cm', '164cm', '165cm', '166cm', '167cm', '168cm', '169cm', '170cm', '171cm','172cm', '173cm', '174cm',
            '175cm', '176cm', '177cm', '178cm', '179cm', '180cm', '181cm', '182cm', '183cm', '184cm', '185cm', '186cm', '187cm',
            '188cm', '189cm', '190cm'
    ],
    weight: ['40Kg', '41Kg', '42Kg', '43Kg', '44Kg', '45Kg', '46Kg', '47Kg', '48Kg', '49Kg', '50Kg', '51Kg', '52Kg', '53Kg', '54Kg', 
            '55Kg', '56Kg', '57Kg', '58Kg', '59Kg', '60Kg', '61Kg', '62Kg', '63Kg', '64Kg', '65Kg', '66Kg', '67Kg', '68Kg', '69Kg', '70Kg'
            , '71Kg', '72Kg', '73Kg', '74Kg', '75Kg', '76Kg', '77Kg', '78Kg', '79Kg', '80Kg'
    ],
    nation: [
        '汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '侗族', '瑶族', '白族', '土家族',
        '哈尼族', '哈萨克族', '傣族', '黎族', '傈僳族', '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族',
        '景颇族', '柯尔克孜族', '土族', '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族', '毛南族', '仡佬族', '锡伯族', '阿昌族',
        '普米族', '朝鲜族', '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族',
        '独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族'
    ],
    education: ['小学','初中', '高中', '大专', '本科', '研究生', '硕士', '博士'],
    income: ['1000-3000元', '3000-5000元', '5000-7000元', '7000-9000元', '10000-12000元', '12000-14000元', '14000元以上'],
    constellation: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    orNot: ['是', '否'],
    ageRange: [
        '20-30岁', '30-40岁', '50-60岁', '70-80岁', '80-90岁'
    ],
    heightRange: [
        '140-150cm', '155-160cm', '161-170cm', '171-180cm', '181-190cm', '191-200cm'
    ],
    pickerData: [],
    namePopup: false,
    monoPopup: false,
    hobbyPopup: false,
    openPicker: false,
    regionValue: [],
    pickerValue: '',
    openDateTimePicker: false,
    openRegionPicker: false,

    hobbyList: [],
    sonInterests: [],
    activeCategory: [],
    activeCategoryTxt: [],
    hobbyTabsData: [],
    hobbycurrentTabIndex: 0
})

const bcNotify = ref()

const imgUploadref = ref()

const imgUploadref1 = ref()

const openUp = () => {
    nextTick(()=>{
        console.log('手动调用',imgUploadref ,imgUploadref.value); 
        imgUploadref.value.chooseFileFun()
    })
}

const openUp1 = () => {
    nextTick(()=>{
        console.log('手动调用',imgUploadref1 ,imgUploadref1.value); 
        imgUploadref1.value.chooseFileFun()
    })
}

const clickSelect = (type: number) => {
    data.selectType = type
    if (type == 1) {
        data.pickerData = data.sexList
    }
    else if (type == 3) {
        data.pickerData = data.income
    }
    else if (type == 5) {
        data.pickerData = data.education
    }
    else if (type == 6) {
        data.pickerData = data.nation
    }
    else if (type == 8) {
        data.pickerData = data.ageRange
    }
    else if (type == 9) {
        data.pickerData = data.heightRange
    }
    else if (type == 10) {
        data.pickerData = data.income
    }
    else if (type == 11) {
        data.pickerData = data.education
    }
    else if (type == 13) {
        data.pickerData = data.height
    }
    else if (type == 14) {
        data.pickerData = data.weight
    }
    else if (type == 15 || type == 16) {
        data.pickerData = data.orNot
    }
    else if (type == 17) {
        data.pickerData = data.constellation
    }
    data.openPicker = true
}

const pickerConfirm = (value: string | number) => {
    data.selectType == 1 && (data.userInfo.sex = value)
    data.selectType == 3 && (data.userInfo.income = value)
    data.selectType == 5 && (data.userInfo.education = value)
    data.selectType == 6 && (data.userInfo.nationality = value)
    data.selectType == 8 && (data.conditions.age = value)
    data.selectType == 9 && (data.conditions.height = value)
    data.selectType == 10 && (data.conditions.income = value)
    data.selectType == 11 && (data.conditions.education = value)
    data.selectType == 13 && (data.userInfo.height = value)
    data.selectType == 14 && (data.userInfo.weight = value)
    data.selectType == 15 && (data.userInfo.smoking = value)
    data.selectType == 16 && (data.userInfo.drinkWine = value)
    data.selectType == 17 && (data.userInfo.constellation = value)
}

const clickSelectReigon = (type: number) => {
    data.selectType = type
    data.openRegionPicker = true
}

const regionConfirm = (value: string| number, item: any) => {
    data.selectType == 7 && (data.userInfo.placeOfOrigin = item[0].name + item[1].name + item[2].name)
    data.selectType == 12 && (data.conditions.addressDetail = item[0].name + item[1].name)
}

const clickSelectTime = (type: number) => {
    data.selectType = type
    data.openDateTimePicker = true
}

const timeConfirm = (value: string) => {
    data.selectType == 2 && (data.userInfo.birthday = value)
}

const clickSaveNickName = () => {
    data.userInfo.nickName = data.nickName
    data.namePopup = false
}

const clickSaveMono = () => {
    data.userInfo.innerMonologue = data.mono
    data.monoPopup = false
}

const clickSaveHobby = () => {
    data.hobbyPopup = false
}

const map = (type: number) => {
    uni.chooseLocation({
        success: (res) => {
            if (type == 1) {
                data.userInfo.addressDetail = res.address
                data.userInfo.lat = res.latitude
                data.userInfo.lng = res.longitude
            }
            if (type == 12) {
                data.conditions.addressDetail = res.address
                data.conditions.lat = res.latitude
                data.conditions.lng = res.longitude
            }
        }
    })
}

const clickHobbies = () => {
    interestsList({
        pageNumber: 1,
        pageSize: 10,
        query: {}
    }).then((res: any) => {
        if (res.data.length) {
            data.hobbyList = res.data
            const tabList = res.data.map((item: any) => ({
                text: item.name
            }))

            data.hobbyTabsData = tabList
            data.sonInterests = data.hobbyList[0].sonInterests
            data.hobbyPopup = true
        }
    }).catch((err) => {
        bcNotify.value.show(err.message)
    })
}

const changeHobbyTabs = (val: string | number) => {
    data.sonInterests = data.hobbyList[val].sonInterests
}

const clickInterest = (item: any) => {
    const idIndex = data.activeCategory.indexOf(item.id)
    
    if (idIndex > -1) {
        // 如果找到已经存在该元素
        data.activeCategory.splice(idIndex, 1)
        data.activeCategoryTxt.splice(idIndex, 1)
    }
    else {
        // 如果没有找到，就添加一个id
        data.activeCategory.push(item.id)
        data.activeCategoryTxt.push(item.name)
    }
    data.userInfo.hobbiesTxt = data.activeCategoryTxt.join('，')
}

const clickBtn = () => {
    // if (data.fileList.length == 0) {
    //     bcNotify.value.show('请上传头像')
    //     return
    // }
    if (data.fileList1.length == 0) {
        bcNotify.value.show('请上传相册')
        return
    }
    else if (!data.userInfo.nickName) {
        bcNotify.value.show('请填写昵称')
        return
    }
    else if (!data.userInfo.sex) {
        bcNotify.value.show('请选择性别')
        return
    }
    else if (!data.userInfo.birthday) {
        bcNotify.value.show('请选择生日')
        return
    }
    else if (!data.userInfo.height) {
        bcNotify.value.show('请选择身高')
        return
    }
    else if (!data.userInfo.income) {
        bcNotify.value.show('请选择月收入')
        return
    }
    else if (!data.userInfo.addressDetail) {
        bcNotify.value.show('请选择居住地')
        return
    }
    else if (!data.userInfo.education) {
        bcNotify.value.show('请选择学历')
        return
    }
    else if (!data.userInfo.nationality) {
        bcNotify.value.show('请选择民族')
        return
    }
    else if (!data.userInfo.placeOfOrigin) {
        bcNotify.value.show('请选择籍贯')
        return
    }
    else if (!data.conditions.age) {
        bcNotify.value.show('请选择择偶的年龄')
        return
    }
    else if (!data.conditions.height) {
        bcNotify.value.show('请选择择偶的身高')
        return
    }
    else if (!data.conditions.income) {
        bcNotify.value.show('请选择择偶的月收入')
        return
    }
    else if (!data.conditions.education) {
        bcNotify.value.show('请选择择偶的学历')
        return
    }
    else if (!data.conditions.addressDetail) {
        bcNotify.value.show('请选择择偶的居住地')
        return
    }

    // data.userInfo.avatar = data.fileList[0]
    data.userInfo.photoAlbum =data.fileList1

    const info = {
        ...data.userInfo,
        authenticate: data.cardId == null ? 2 : 1,
        hobbies: data.activeCategory,
        height: Number(removeChat(data.userInfo.height, 'cm')),
        weight: Number(removeChat(data.userInfo.weight, 'Kg')),
        sex: data.userInfo.sex == '男' ? 1 : 2,
        smoking: data.userInfo.smoking == '是' ? 1 : 2,
        drinkWine: data.userInfo.drinkWine == '是' ? 1 : 2,
        monthlyIncomeMin: Number(processString(data.userInfo.income, '元')[0]),
        monthlyIncomeMax: Number(processString(data.userInfo.income, '元')[1]),
    }
    console.log(info);

    const conditions = {
        ...data.conditions,
        ageMin: Number(processString(data.conditions.age, '岁')[0]),
        ageMax: Number(processString(data.conditions.age, '岁')[1]),
        heightMin: Number(processString(data.conditions.height, 'cm')[0]),
        heightMax: Number(processString(data.conditions.height, 'cm')[1]),
        monthlyIncomeMin: Number(processString(data.conditions.income, '元')[0]),
        monthlyIncomeMax: Number(processString(data.conditions.income, '元')[1]),
        lat: data.conditions.lat,
        lng: data.conditions.lng,
    }

    console.log(conditions);
    
    loveChatUpdateUserInfo(info).then((res) => {
        loveChatUpdateConditions(conditions).then((res) => {
            bcNotify.value.show('提交成功')
            dispatchWEvent(GlobalEvents.Love_chat_UpateInfo)
            setTimeout(() => {
                pageController.back()
            }, 1200)
        })
    })
}

const removeChat = (str: any, charToRemove: string) => {
    if (str !== null && str !== undefined && str !== 0) {
        return str.replace(new RegExp(charToRemove, 'g'), '')
    }
}

const processString = (str: any, charToRemove: string) => {
    if (str !== null && str !== undefined && str !== 0) {
        if (str.includes('元以上')) {
            const parts = str.split('元以上')
            parts[1] = -1 
            return parts
        }
        else {
            const cleanedStr = str.replace(new RegExp(charToRemove, 'g'), '')
            let parts = cleanedStr.split('-')
            return parts
        }
    }
}

onMounted(() => {
    homePage({}).then((res: any) => {
        // 1 已认证 2 尚未认证
        data.cardId = res.cardId
        data.userInfo.authenticate = res.cardId == null ? '未认证' : '已认证'
    })

    PlatformManage.getToken().then((token) => {
        loveChatUserInfo({ id: token.id }).then((res: any) => {
            
            data.userInfo = {
                ...res,
                // avatar: res.avatar,
                // addressDetail: '测试居住地',
                photoAlbum: res.photoAlbum,
                authenticate: data.cardId == null ? '未认证' : '已认证',
                hobbiesTxt: Array.isArray(res.hobbyNames) ? res.hobbyNames.join('，') : null
            }
            data.mono = res.innerMonologue
            data.nickName = res.nickName

            if (res.photoAlbum !== null) {
                data.fileList1 = res.photoAlbum
            }
            if (res.sex) {
                data.userInfo.sex = res.sex == 1 ? '男' : res.sex == 2 ? '女' : null
            }
            if (res.monthlyIncomeMin && res.monthlyIncomeMax) {
                if (res.monthlyIncomeMax == -1) {
                    data.userInfo.income = res.monthlyIncomeMin + '元以上'
                }
                else {
                    data.userInfo.income = res.monthlyIncomeMin + '-' + res.monthlyIncomeMax + '元'
                }
            }
            if (res.height) {
                data.userInfo.height = res.height + 'cm'
            }
            if (res.weight) {
                data.userInfo.weight = res.weight + 'kg'
            }
            if (res.smoking) {
                data.userInfo.smoking = res.smoking == 1 ? '是' : res.smoking == 2 ? '否' : null
            }
            if (res.drinkWine) {
                data.userInfo.drinkWine = res.drinkWine == 1 ? '是' : res.drinkWine == 2 ? '否' : null
            }
            if (res.authenticate) {
                data.userInfo.authenticate = data.cardId == null ? '未认证' : '已认证'
            }
            if (res.hobbies) {
                data.activeCategory = res.hobbies
            }
            if (res.hobbyNames) {
                data.activeCategoryTxt = res.hobbyNames
            }
            
            data.showFileBox = true
        })

        loveChatConditionsUserInfo({ id: token.id }).then((res: any) => {
            data.conditions = {
                ...res,
                // addressDetail: '测试居住地'
            }

            if (res.ageMin && res.ageMax) {
                data.conditions.age = res.ageMin + '-' + res.ageMax + '岁'
            }
            if (res.heightMin && res.heightMax) {
                data.conditions.height = res.heightMin + '-' + res.heightMax + 'cm'
            }
            if (res.monthlyIncomeMin && res.monthlyIncomeMax) {
                if (res.monthlyIncomeMax == -1) {
                    data.conditions.income = res.monthlyIncomeMin + '元以上'
                }
                else {
                    data.conditions.income = res.monthlyIncomeMin + '-' + res.monthlyIncomeMax + '元'
                }
            }
        })
    })
    
    
})
</script>
  
<style lang="scss" scoped>
.container {
    padding-bottom: 120rpx;

    .item {
        padding: 40rpx 30rpx 30rpx 30rpx;
        margin-top: 15rpx;
        margin-bottom: 15rpx;
        border-radius: 24rpx;
        background-color: #FFFFFF;
    }

    .title {
        height: 70rpx;
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
    }

    .albumn {

    }

    .mono {
        .mono-empty {
            width: 670rpx;
            margin-top: 30rpx;
            padding: 30rpx;
            font-size: 28rpx;
            color: #BCBCBC;
            background: #F8F8F8;
            border-radius: 16rpx;
            align-items: center;


            .txt {
                // margin-left: 16rpx;
            }

            .txt-input {
                // margin-left: 16rpx;
                color: #333333;
            }
        }
    }

    .info {
        background-color: #FFFFFF;
        border-radius: 24rpx;

        .tabs {
            padding: 15rpx 0 0 0;
            background-color: #FFFFFF;
            border-radius: 24rpx 24rpx 0 0;
            border-bottom: solid 1rpx #F2F2F2;
        }

        .list {
            padding: 30rpx 40rpx;
        }
    }

    .other {

    }

    .more {
        
    }
}

.up_img_inp{
    padding: 32rpx 0;
    box-sizing: border-box;

    .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20rpx;

        text {
            padding-left: 5rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
        }
    }

    .up_box{
        width: 168rpx;
        height: 168rpx;
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
    .up_box1{
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

.content {
    height: 1000rpx;
    padding: 20rpx 40rpx 40rpx 40rpx;

    .title {
        height: 60rpx;
        font-weight: bold;
        font-size: 36rpx;
        color: #333333;
        text-align: center;
    }

    .input {
        height: 150rpx;
        padding: 20rpx 0;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
    }

    .detail {
        height: 500rpx;
        padding: 20rpx 0;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        overflow-y: auto;

        .tabs {
            border-bottom: solid 1rpx #F2F2F2;
        }

        .tag-list {
            padding: 20rpx 0;
            font-weight: 400;
            font-size: 28rpx;
            color: #333333;
            display: flex;
            flex-wrap: wrap;

            .item {
                margin: 20rpx 10rpx;

                .btn {
                    min-width: 190rpx;
                    height: 80rpx;
                    padding: 0 15rpx;
                    font-size: 28rpx;
                    color: #1A1A1A ;
                    border: solid 1rpx #E5E5E5;
                    border-radius: 12rpx;
                    transition: all .2s;
                }

                .active {
                    color: white;
                    border: none;
                    background-color: #EA3E1A;
                }
            }
        }

        // view {
        //     font-weight: 400;
        //     font-size: 28rpx;
        //     color: #333333;
        //     line-height: 44rpx;
        //     margin-bottom: 30rpx;

        //     &:last-child {
        //         margin-bottom: 0;
        //     }
        // }
    }

    .tips {
        font-weight: 400;
        font-size: 24rpx;
        color: #BFBFBF;
    }

    .btn {
        height: 100rpx;
        margin-top: 30rpx;
    }
}

.sub {
    min-height: 90rpx;
}

.subTitle {
    width: 160rpx;
    color: #333333;
    font-size: 30rpx;
    font-weight: bold;
}

.tnInput {
    flex: 1;
    justify-content: flex-end;
    margin-top: 20rpx;
    padding-bottom: 16rpx;
}

.address {
    min-height: 70rpx;
    padding-left: 16rpx;
    display: flex;
    align-items: center;
}

.empty {
    color: #9c9c9c;
}

.textarea {
    background-color: #F6F6F6;
}

// .desc {
//     color: #666666;
//     font-size: 26rpx;
//     padding-left: 10rpx;
// }

.star {
    padding-right: 5rpx;
    font-size: 26rpx;
    color: red;
}
</style>
 
