<template>
    <div class="content">
        <TnPopup v-model="show" @close="close" closeable round="40rpx">
            <div class="conbox">
                <div class="contit">修改订单</div>
                <scroll-view class="scrbox" scroll-y>
                    <div class="conli" @click="getAdres(1)" v-if="consumerAdrs && ismany">
                        <div class="conltit">服务地址</div>
                        <div class="conadrs row j-between">
                            <div class="contip">
                                <div>{{ressinfo.area}}{{ressinfo.address}}</div>
                                <div>{{ressinfo.name}}  {{ressinfo.mobile}}</div>
                            </div>
                            <div class="conbtn">
                                <TnButton width="60rpx" style="border: none;" bg-color="white" height="60rpx" size="mini" font-size="28rpx" shape="circle" color="#666666" >修改</TnButton>
                            </div>
                        </div>
                    </div>

                    <div class="conli" @click="clickSelectTime" v-if="consumerTime && isOrderPackage != 1">
                        <div class="conltit">服务时间</div>
                        <div class="conadrs row j-between">
                                <div class="contip">{{parameter.utcVisitStart}}</div>
                                <div class="conbtn">
                                    <TnButton @click="showTime" plain size="mini" text="修改" shape="circle" color="#F2F2F2" :customStyle="btnStyle"></TnButton>
                                </div>
                            </div>
                        <TnDateTimePicker mode="datetime" v-model="parameter.utcVisitStart" v-model:open="openDateTimePicker" />

                    </div>

                    <div class="conli" v-if="informationVisi">
                        <div class="conltit">就诊人</div>
                        <div class="conadrs">
                            <!-- <u-input v-model="parameter.patient" maxlength="7" border="none" placeholder="请输入就诊人" clearable></u-input> -->
                            <input class="contarea" v-model="parameter.patient" :maxlength="7" placeholder="请输入就诊人" />
                        </div>
                    </div>

                    <div class="conli" @click="getAdres" v-if="contactVisi">
                        <div class="conltit">联系人</div>
                        <div class="conadrs row j-between">
                            <div class="contip">
                                <div>{{ressinfo.name}}  {{ressinfo.mobile}}</div>
                            </div>
                            <div class="conbtn">
                                <TnButton plain size="mini" width="60rpx" style="border: none;"  bg-color="white"  height="60rpx" shape="circle" color="#666666"  font-size="28rpx">修改</TnButton>
                            </div>
                        </div>
                    </div>

                    <div class="conli" @click="deliveryShow = true" v-if="methodVisi">
                        <div class="conltit">代送方式</div>
                        <div class="conadrs row j-between">
                            <div class="contip">
                                <div>{{parameter.deliveryMethodName}}</div>
                            </div>
                            <div class="conbtn">
                                <TnButton plain size="mini" shape="circle" style="border: none;" color="#666666" bg-color="white" width="60rpx" height="60rpx">修改</TnButton>
                            </div>
                        </div>
                    </div>
                    <!--  -->
                    <div class="conli" @click="getAdres" v-if="deliveryVisi">
                        <div class="conltit">配送地址</div>
                        <div class="conadrs row j-between">
                            <div class="contip">
                                <div>{{ressinfo.area}}{{ressinfo.address}}</div>
                                <div>{{ressinfo.name}}  {{ressinfo.mobile}}</div>
                            </div>
                            <div class="conbtn">
                                <TnButton plain size="mini" style="border: none;" shape="circle" color="#F2F2F2" >修改</TnButton>
                            </div>
                        </div>
                    </div>

                    <div class="conli" v-if="certificateVisi">
                        <div class="conltit">代送凭证</div>
                        <div class="conadrs row j-between">
                    <div class="contip">
                        <imgUpload v-model:imageArr="fileList1" :limit="3" ref="imgUploadref">
                        <template #uploadBtn>
                            <view @click="openUp" class="up_box">
                                <view class="up_icon">
                                    <TnIcon name="add" color="#C9C9C9" size="80"/>
                                </view>
                                <view class="up_text">
                                    代送凭证
                                </view>
                            </view>
                        </template>
                    </imgUpload>
                              <!-- <imgUpload v-model:imageArr="fileList1" :limit="1" ref="imgUploadref" @upchange="changeisNext"></imgUpload> -->
                      <!-- <ClUpload @change="handleChange" :maxCount="9" width="60px" height="60px" v-model="fileList1" uploadPath="errand" uploadIcon="plus" /> -->
                            </div>
                        </div>
                    </div>

                    <div class="conli">
                        <div class="conltit">备注信息</div>
                        <div class="conadrs">
                            <textarea class="contarea" v-model="parameter.note" auto-height placeholder="请输入备注" />
                        </div>
                    </div>
                </scroll-view>
                <div class="consub"><TnButton @click="submit" :throttleTime="1000"  style="width: 100%; border-radius: 10rpx; color: #ffffff;height: 80rpx;" shape="circle" bg-color="#29C86F" color="#ffffff">提交</TnButton></div>
            </div>
            <!-- 配送方式 -->
            <TnPicker v-model="parameter.deliveryMethodId" v-model:open="deliveryShow" :data="deliveryList" @confirm="setDelivery" />
            <BCNotify ref="bCNotifyRef"></BCNotify>
		</TnPopup>

    </div>
</template>

<script setup lang="ts">
import { gotoAddressList } from '@/routes/user-routes'
import BCNotify from '@/components/notify/index.vue'
import dayjs from 'dayjs'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import imgUpload from '@/components/upload/img-upload.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnDateTimePicker from '@tuniao/tnui-vue3-uniapp/components/date-time-picker/src/date-time-picker.vue'
import { ref, reactive, watch, nextTick, computed, onMounted } from 'vue'
import { getOrderEntityConfig, editOrderModify } from '@/api/order-api'
import { addWEventsListener } from '@/events/event-registry'
import { CareEvents } from '@/events/care-events'
// import { gotoUserLink } from '@/route/user-routes'
const openDateTimePicker = ref(false)
const show = ref(false)
const ressinfo = ref({})
const isOrderPackage = ref(false)
const orderId = ref(null)
const fileList1 = ref([])
const deliveryShow = ref()
const parameter = reactive({
    note: '',
    utcVisitStart: null,
    hospitalId: null,
    hospital: null,
    patient: null,
    patientMobile: null,
    deliveryMethodId: null,
    deliveryMethodName: null
})
const consumerAttr = ref([])
const optionMation = reactive({
    templateCode: ''
})
const bCNotifyRef = ref()
const timeUnit = ref('')
const serviceRules = ref('')
const optionUnit = ref('')
const deliveryList = [{ label: '同城', value: 1 }, { label: '邮寄', value: 2 }]
const consumerTime = computed(() => exist('service_time'))
const consumerAdrs = computed(() => exist('service_address'))

const consumerVisi = computed(() => {
    return ![65795, 65796].includes(optionMation.templateCode) && exist('visitor_information')
})

const informationVisi = computed(() => {
    return [65795, 65796].includes(optionMation.templateCode) && exist('visitor_information')
})
const props = withDefaults(
    defineProps<{
    shopId?: any;
  }>(),
    {
        shopId: ''
    }
)
onMounted(() => {
    addWEventsListener(CareEvents.Get__Address, (res) => {
        console.log(res)
        ressinfo.value = res
    })
})
const hospitalVisi = computed(() => exist('hospital_address'))
const methodVisi = computed(() => exist('delivery_method'))
const deliveryVisi = computed(() => exist('delivery_address'))
const certificateVisi = computed(() => exist('delivery_certificate'))
const contactVisi = computed(() => exist('contact_info'))
const emit = defineEmits(["updateOrder"])
const ismany = computed(() => {
    if (isOrderPackage.value === 0) {
        return true
    }
    else {
        return !!ressinfo.value.name
    }
})
// Methods

const handleChange = (item) => {
    fileList1.value = item
}
const imgUploadref = ref()
const openUp = () => {
    nextTick(() => {
        console.log('手动调用', imgUploadref, imgUploadref.value)
        imgUploadref.value.chooseFileFun()
    })
}
const clickSelectTime = () => {
    openDateTimePicker.value = true
}
// 判断参数是否存在
const exist = (str) => {
    const item = consumerAttr.value.find(x => x.field === str)
    return !!item
}

const close = () => {
    show.value = false
}

const open = async (optionId, data) => {
    const { orderId: order, ressinfo: resInfo, deliveryCertificate, contactMobile, contactPerson, isOrderPackage: packageFlag, ...mation } = data
    ressinfo.value = resInfo.id ? resInfo : { mobile: contactMobile, name: contactPerson }
    isOrderPackage.value = packageFlag
    orderId.value = order
    fileList1.value = deliveryCertificate
    parameter.note = mation.note

    try {
        const res = await getOrderEntityConfig(optionId)
        optionMation.templateCode = res.item.templateCode
        timeUnit.value = res.option.extend.serviceWorkingHours.unit
        consumerAttr.value = res.consumerAttr
        serviceRules.value = res.item.extend.serviceRules
        optionUnit.value = res.option.extend.serviceWorkingHours.unit
        show.value = true
    }
    catch (err:any) {
        bCNotifyRef.value.error(err.message)
    // Handle error with a toast or any other method
    }
}

const submit = async () => {

    await editOrderModify({
        orderId: orderId.value,
        note: parameter.note,
        attr: {
            utcVisitStart: dayjs().unix(parameter.utcVisitStart),
            addressId: consumerAdrs.value || deliveryVisi.value ? ressinfo.value.id : null,
            patientId: consumerVisi.value ? parameter.patientId : null,
            hospitalId: parameter.hospitalId || null,
            hospital: parameter.hospital || null,
            patient: informationVisi.value ? parameter.patient : null,
            patientMobile: parameter.patientMobile || null,
            deliveryMethod: methodVisi.value ? parameter.deliveryMethodId : null,
            deliveryCertificate: certificateVisi.value ? fileList1.value : null
        },
        contact: contactVisi.value ? {
            mobile: ressinfo.value.mobile,
            person: ressinfo.value.name
        } : null
    }).then(() => {
        bCNotifyRef.value.show('修改成功')

        emit('updateOrder')
    }).catch(err => {
        bCNotifyRef.value.show(err.message)
    })

    close()


}

const getAdres = (type = 0) => {
    const req = {}
    // if (type === 1) { req.shopId = props.shopId }
    gotoAddressList()
}

const getSerTime = (e) => {
    parameter.utcVisitStart = e / 1000
}

const showTime = () => {
    // Assuming `dataTime` component exists
    // this.$refs.dataTime.openTime()
}

const setDelivery = (e) => {
    console.log(e)
    deliveryShow.value = false
    parameter.deliveryMethodId = e
    parameter.deliveryMethodName = deliveryList.find(item => item.value == e)?.label
}


watch(() => parameter.utcVisitStart, (newValue, oldValue) => {
    console.log('UTC Visit Start changed:', newValue)
})
defineExpose({ open })
</script>


<style lang="scss" scoped>
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
.conbox{
    padding: 0 50rpx 30rpx;

    .contit{
        font-size: 36rpx;
        font-weight: bold;
        color: #333333;
        text-align: center;
        margin: 30rpx 80rpx 40rpx;

    }
    .scrbox{
        max-height: 600rpx;
        padding-top: 40rpx;
    }
    .conli{
        margin-top: 30rpx;
        &:first-child{
            margin-top: 0rpx;
        }
        .conltit{
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
        }
        .conadrs{
            margin-top: 24rpx;
            .contip{
                font-size: 30rpx;
                font-weight: 400;
                color: #666666;

            }
            .conbtn{
                width: 92rpx;
                margin: 0 20rpx;
            }
            .contarea{
                background: #F5F5F5;
                padding: 18rpx 24rpx;
                border-radius: 6rpx;
            }
        }
    }
    .consub{
        margin-top: 50rpx;
        padding: 20rpx 0rpx;
        width: 100%;
    }
}
</style>

