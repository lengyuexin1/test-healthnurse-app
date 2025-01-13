<template>
    <view class="container">
        <PageTopbg bgstyle="background: linear-gradient(180deg, #DFF7EF 0%, #F2F3F5 100%);"></PageTopbg>
		<bc-page-navbar :title="data.pageTit"></bc-page-navbar>

        <view class="form-box">
            <TnForm ref="formRef" :model="data.model" label-width="140rpx">
                <TnFormItem label="姓名">
                    <TnInput v-model="data.model.name" :maxlength="7" :underline="true" placeholder="请输入被照护人姓名（必填）" />
                </TnFormItem>
                <TnFormItem label="亲属关系">
                    <TnInput type="select" v-model="data.model.relation" :maxlength="7" :underline="true" placeholder="请选择与照护人亲属关系" @click="seleRelat(0)">
                        <template #suffix>
                            <TnIcon name="right" color="#999999" size="24"></TnIcon>
                        </template>
                    </TnInput>
                </TnFormItem>
                <template v-if="data.model.relation === '其他'">
                    <TnFormItem label="其他关系">
                        <TnInput v-model="data.ortherRela" :underline="true" placeholder="请输入其他关系" />
                    </TnFormItem>
                </template>
                <TnFormItem label="身份证号">
                    <TnInput v-model="data.model.identity" :underline="true" placeholder="请输入被照护人身份证" />
                </TnFormItem>
                <TnFormItem label="性别">
                    <TnRadioGroup v-model="data.model.sex">
                        <TnRadio label="1">男</TnRadio>
                        <TnRadio label="2">女</TnRadio>
                    </TnRadioGroup>
                </TnFormItem>
                <TnFormItem label="年龄">
                    <TnInput v-model="data.model.age" :maxlength="7" :underline="true" placeholder="请输入被照护人年龄" />
                </TnFormItem>
                <TnFormItem label="身高(cm)">
                    <TnInput v-model="data.model.height" :maxlength="7" :underline="true" placeholder="请输入被照护人身高" />
                </TnFormItem>
                <TnFormItem label="体重(kg)">
                    <TnInput v-model="data.model.weight" :maxlength="7" :underline="true" placeholder="请输入被照护人体重" />
                </TnFormItem>

                <TnFormItem label="病史"></TnFormItem>
                <TnCheckboxGroup :border="true" v-model="data.model.medicalHistory">
                    <TnCheckbox :label="item.name" v-for="(item, index) in data.mediList">{{ item.name }}</TnCheckbox>
                </TnCheckboxGroup>

                <template v-if="data.model.medicalHistory.includes('其他')">
                    <TnFormItem label="其他病史">
                        <TnInput v-model="data.ortherVal" :underline="true" placeholder="请输入其他病史" />
                    </TnFormItem>
                </template>
                <TnFormItem label="手机号码">
                    <TnInput v-model="data.model.phone" :maxlength="11" :underline="true" placeholder="请输入被照护人手机号" />
                </TnFormItem>
                <TnFormItem label="所在地区" >
                    <view class="tn-flex-row" style="flex: 1;">
                        <TnInput v-model="data.model.region" :underline="true" placeholder="请选择" type="select" @click="openAuth">
                            <template #suffix>
                                <TnIcon name="right" color="#999999" size="24"></TnIcon>
                            </template>
                        </TnInput>
                    </view>
                </TnFormItem>
                <TnFormItem label="详细地址">
                    <TnInput v-model="data.model.detail" :maxlength="7" :underline="true" placeholder="所在小区楼栋/门牌号" />
                </TnFormItem>
            </TnForm>
		</view>
        <view class="wrap emergency">
            <TnForm ref="formRef" label-width="130rpx">
                <block v-for="(item, index) in data.emergeObj" :key="index">
                    <TnFormItem label="姓名">
                        <TnInput v-model="item.name" :maxlength="7" :underline="true" placeholder="请输入联系人姓名" />
                    </TnFormItem>
                    <TnFormItem label="是否监护人">
                        <TnRadioGroup v-model="item.isGuardian">
                            <TnRadio label="1">是</TnRadio>
                            <TnRadio label="0">否</TnRadio>
                        </TnRadioGroup>
                    </TnFormItem>
                    <TnFormItem label="与照护人关系">
                        <TnInput type="select" v-model="item.rel" :underline="true" placeholder="请选择与照护人关系" @click="seleRelat(1, index)">
                            <template #suffix>
                                <TnIcon name="right" color="#999999" size="24"></TnIcon>
                            </template>
                        </TnInput>
                    </TnFormItem>
                    <template v-if="item.rel === '其他'">
                        <TnFormItem label="其他">
                            <TnInput v-model="item.other" :maxlength="7" :underline="true" placeholder="请输入其他关系" />
                        </TnFormItem>
                    </template>
                    <TnFormItem label="手机号码">
                        <TnInput v-model="item.mobile" :maxlength="11" :underline="true" placeholder="请输入联系人电话" />
                    </TnFormItem>
                    <TnFormItem label="所在地区" >
                        <view class="tn-flex-row" style="flex: 1;">
                            <TnInput v-model="item.area" :underline="true" placeholder="请选择" type="select" @click="openAuth">
                                <template #suffix>
                                    <TnIcon name="right" color="#999999" size="24"></TnIcon>
                                </template>
                            </TnInput>
                        </view>
                    </TnFormItem>
                    <TnFormItem label="详细地址">
                        <TnInput v-model="item.address" :underline="true" placeholder="请输入联系人地址" />
                    </TnFormItem>
                </block>
                <view class="emerge-add row i-center j-center" @click="addEmerge" v-if="data.emergeObj.length < 3">
                    <TnIcon name="add" color="#999999" size="24"></TnIcon>
					<text>添加联系人</text>
				</view>
            </TnForm>
        </view>
        <view style="background-color: #F2F4F5; width: 100%; height: 170rpx;"></view>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
    <yk-authpup ref="authpup" :isNativeHead="false" type="top" @changeAuth="changeAuth" permissionID="WRITE_EXTERNAL_STORAGE"></yk-authpup>
    <TnPicker v-model="data.region" v-model:open="data.pickerShow" :data="data.folkList" @confirm="regionConfirm" />
    <!-- 底部操作按钮 -->
    <BottomSingleBtn btnName="保存" @clickBtn="save"></BottomSingleBtn>
</template>
    
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed, reactive, onMounted } from 'vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BottomSingleBtn from '@/components/bottomSingleBtn/index.vue'
import { editPatient, getPatientDetail } from '@/api/service-api'
import BCNotify from '@/components/notify/index.vue'
import TnForm from '@tuniao/tnui-vue3-uniapp/components/form/src/form.vue'
import TnFormItem from '@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnRadio from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio.vue'
import TnRadioGroup from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio-group.vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import TnCheckboxGroup from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox-group.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import { pageController } from '@bc/uni-tools'
// import { BcResumeMsg } from '@bc/ui'

interface Data {
    pageTit: string
    eldid: string
    folkList: any
    ortherRela: string
    model: any,
    identity: string
    item: any,
    region: string
    pickerShow: boolean
    ortherVal: string
    mediList: any
    emergeObj: any
    relatType: number
    zhaohuids: number
}
const data = reactive<Data>({
    pageTit: '',
    eldid: '',
    folkList: [//亲属关系
        ['父子', '母子', '父女', '母女', '爷孙', '婆孙', '其他']
    ],
    ortherRela: '', //其他关系
    mediList: [
        { name: '高血压', checked: false },
        { name: '高血脂', checked: false },
        { name: '糖尿病', checked: false },
        { name: '心脑血管疾病', checked: false },
        { name: '基础代谢障碍性疾病', checked: false },
        { name: '慢性消耗性疾病', checked: false },
        { name: '癌症', checked: false },
        { name: '免疫功能低下', checked: false },
        { name: '帕金森病', checked: false },
        { name: '老年痴呆', checked: false },
        { name: '其他', checked: false }
    ],
    ortherVal: '',
    emergeObj: [{
        name: '', //姓名
        isGuardian: '', //是否监护人
        rel: '', //关系
        orther: '', //其他关系
        mobile: '', //电话
        address: '', //地址
        area: 'aa'
    }],
    model: {
        avater: '',
        name: '',
        relation: '',
        identity: '',
        sex: '',
        height: '',
        weight: '',
        phone: '',
        code: '',
        is_default: false,
        lat: '',
        lng: '',
        medicalHistory: [], //病史
        region: 'gz',
        age: '',
        detail: ''
    },
    birthShow: false,
    default: 0,
    myborder: 'none',
    check: false,

    pickerShow: false,
    relatType: 0,
    zhaohuids: 0, //联系人下标
    leftPosition: 'left',
    errorType: 'toast', //'message',
    userdetail: '',
    submittype: '',
    updateid: '',
    title: '',
    index: '',
    lotusAddressData: {
        visible: false,
        provinceName: '',
        cityName: '',
        townName: ''
    },
    region: '',
    funName: '',
    funInds: 0
})

const openPicker = ref(false)

const bcNotify = ref()

const authpup = ref()

const seleRelat = (type: number, inds?: number) => {
    data.pickerShow = true
    data.relatType = type
    if (type == 1) { data.zhaohuids = inds }
}

const regionConfirm = (e) => {
    if (data.relatType == 0) {
        data.model.relation = e[0]
        e[0] !== "其他" && (data.ortherRela = '')
    }
    else {
        data.emergeObj[data.zhaohuids].rel = e[0]
        e[0] !== "其他" && (data.emergeObj[data.zhaohuids].orther = '')
    }
    data.pickerShow = false
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
            data.form.area = res.address
            data.form.lat = res.latitude
            data.form.lng = res.longitude
        }
    })
}

// 照护人档案详情
const getPatienDetail = () => {
    getPatientDetail({
        id: data.eldid
    }).then((res: any) => {

        if (res.medicalHistory.includes('其他')) {
            data.ortherVal = res.medicalHistory[res.medicalHistory.length - 1]
        }
        
        data.emergeObj = res.contact.map(x => {
            const isOrderRel = data.folkList[0].includes(x.rel)
            return {
                ...x,
                rel: isOrderRel ? x.rel : "其他",
                orther: isOrderRel ? '' : x.rel
            }
        })

        const isOrderRel = data.folkList[0].includes(res.rel)
        data.model = {
            avater: '',
            name: res.name,
            relation: isOrderRel ? res.rel : "其他",
            identity: res.idCardNumber,
            sex: res.sex + '',
            height: res.height,
            weight: res.weight,
            phone: String(res.mobile),
            region: res.area,
            age: res.age,
            detail: res.address,
            medicalHistory: res.medicalHistory
        }
        !isOrderRel && (data.ortherRela = res.rel)
    })
}

// 更新
const renew = () => {
    // 紧急联系人
    const contact = data.emergeObj.map((x: any) => {
        return {
            ...x,
            rel: x.orther ? x.orther : x.rel
        }
    })
    const res = {
        rel: data.ortherRela || data.model.relation, //亲属关系
        sex: data.model.sex, //0、未知；1、男；2、女
        age: data.model.age * 1,
        name: data.model.name,
        idCardNumber: data.model.identity, //身份证
        height: data.model.height,
        weight: data.model.weight,
        mobile: data.model.phone,
        area: data.model.region, //所在地区
        address: data.model.detail, //详细地址
        medicalHistory: data.model.medicalHistory,
        contact
    }
    data.eldid && (res.id = data.eldid)
    editPatient(res).then(() => {
        bcNotify.value.show('提交成功')
        setTimeout(() => {
            pageController.back()
        }, 1000)
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

// 添加联系人
const addEmerge = () => {
    const len = data.emergeObj.length - 1
    for (const v in data.emergeObj[len]) {
        if (data.emergeObj[len][v] !== 0 && !data.emergeObj[len][v]) {
            bcNotify.value.show('请先完善当前联系人')
            return false
        }
        if (v == 'mobile' && !isValidPhoneNumber(data.emergeObj[len].mobile)) {
            bcNotify.value.show('当前联系人号码不正确')
            return false
        }
    }

    data.emergeObj.push({
        name: '', //姓名
        isGuardian: '', //是否监护人
        rel: '', //关系
        orther: '', //其他关系
        mobile: '', //电话
        address: '', //地址
        area: ''
    })
}

const isValidPhoneNumber = (phoneNumber: any) => {
    const regex = /^1[0-9]{10}$/
    return regex.test(phoneNumber)
}

const save = () => {
    if (!data.model.name) {
        bcNotify.value.show('请输入被照护人姓名')
        return
    }
    if (!data.model.relation) {
        bcNotify.value.show('请选择与照护人亲属关系')
        return
    }
    if (!data.model.identity) {
        bcNotify.value.show('请输入身份证号')
        return
    }
    if (!data.model.sex) {
        bcNotify.value.show('请输入性别')
        return
    }
    if (!data.model.age) {
        bcNotify.value.show('请输入年龄')
        return
    }
    if (!data.model.height) {
        bcNotify.value.show('请输入被照护人身高')
        return
    }
    if (!data.model.weight) {
        bcNotify.value.show('请输入被照护人体重')
        return
    }
    if (data.model.medicalHistory.length == 0) {
        bcNotify.value.show('请选择被照护人病史')
        return
    }
    if (!data.model.phone) {
        bcNotify.value.show('请选择被照护人手机号码')
        return
    }
    if (!isValidPhoneNumber(data.model.phone)) {
        bcNotify.value.show('请输入正确的手机号码')
        return
    }
    if (!data.model.region) {
        bcNotify.value.show('请选择地区')
        return
    }
    if (!data.model.detail) {
        bcNotify.value.show('请输入详细地址')
        return
    }

    // const arr = []
    // for (const i in data.mediList) {
    //     if (data.mediList[i].checked) {
    //         arr.push(data.mediList[i].name)
    //     }
    // }

    // if (arr.includes('其他') && data.ortherVal) {
    //     arr.splice(arr.indexOf('其他'), 1, data.ortherVal)
    // }

    renew()
}

onMounted(() => {

})

onLoad((options:any)=>{
    if (options.type == 1) {
        data.submittype = options.type
        data.index = options.index
        data.eldid = options.id
        getPatienDetail()
    }
    data.pageTit = options.type == 1 ? '编辑档案' : '被照护人档案'
})





</script>
  
<style lang="scss" scoped>
.form-box {
    margin: 20rpx;
    padding: 20rpx;
    background-color: white;
    border-radius: 20rpx;
    position: relative;
    z-index: 10;
}
// 紧急联系人样式
.emergency{
    margin: 20rpx;
    padding: 20rpx;
    background-color: white;
    border-radius: 20rpx;
    position: relative;
    z-index: 10;

    .emerge-top{
        padding: 28rpx 0rpx 8rpx;

        .emerge-tit{

            font-size: 34rpx;
            font-weight: bold;
            color: #333333;
        }
    }


    .emerge-add{
        height: 104rpx;
        background: #FFFFFF;

        font-size: 30rpx;
        font-weight: 400;
        color: #29C86F;

        text{
            margin-left: 18rpx;
        }
    }
}
</style>
  