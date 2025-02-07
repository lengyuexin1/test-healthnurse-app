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
                                <TnButton plain size="mini" text="修改" shape="circle" color="#F2F2F2" :customStyle="btnStyle"></TnButton>
                            </div>
                        </div>
                    </div>

                    <div class="conli" v-if="consumerTime && isOrderPackage != 1">
                        <div class="conltit">服务时间</div>
                        <TnDateTimePicker mode="datetime" v-model="datetime" v-model:open="openDateTimePicker" />
                        <orderDatetimeSelect :serviceRules="serviceRules" :optionUnit="optionUnit" @setTiem="getSerTime" ref="dataTime">
                            <div class="conadrs row j-between">
                                <div class="contip">{{parameter.utcVisitStart * 1000 | date('yyyy-mm-dd hh:MM')}}</div>
                                <div class="conbtn">
                                    <TnButton @click="showTime" plain size="mini" text="修改" shape="circle" color="#F2F2F2" :customStyle="btnStyle"></TnButton>
                                </div>
                            </div>
                        </orderDatetimeSelect>
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
                                <TnButton plain size="mini" text="修改" shape="circle" color="#F2F2F2" :customStyle="btnStyle"></TnButton>
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
                                <TnButton plain size="mini" text="修改" shape="circle" color="#F2F2F2" :customStyle="btnStyle"></TnButton>
                            </div>
                        </div>
                    </div>

                    <div class="conli" @click="getAdres" v-if="deliveryVisi">
                        <div class="conltit">配送地址</div>
                        <div class="conadrs row j-between">
                            <div class="contip">
                                <div>{{ressinfo.area}}{{ressinfo.address}}</div>
                                <div>{{ressinfo.name}}  {{ressinfo.mobile}}</div>
                            </div>
                            <div class="conbtn">
                                <TnButton plain size="mini" text="修改" shape="circle" color="#F2F2F2" :customStyle="btnStyle"></TnButton>
                            </div>
                        </div>
                    </div>

                    <div class="conli" v-if="certificateVisi">
                        <div class="conltit">代送凭证</div>
                        <div class="conadrs row j-between">
                            <div class="contip">
                                <ClUpload @change="handleChange" :maxCount="9" width="60px" height="60px" v-model="fileList1" uploadPath="errand" uploadIcon="plus" />
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
                <div class="consub"><TnButton @click="submit" :throttleTime="1000" text="提交" shape="circle" color="#29C86F"></TnButton></div>
            </div>
            <!-- 配送方式 -->
            <u-picker :show="deliveryShow" :columns="deliveryList" keyName="label" @confirm="setDelivery"></u-picker>
            <BCNotify ref="uToast"></BCNotify>
		</TnPopup>
        <BCNotify ref="bToast"></BCNotify>

    </div>
</template>

<script setup>
import TnDateTimePicker from '@tuniao/tnui-vue3-uniapp/components/date-time-picker/src/date-time-picker.vue'
import ClUpload from '@/pagesCnt/uni_modules/cl-upload/components/cl-upload/cl-upload.vue'
import { ref, reactive, watch } from 'vue'
// import { getOrderEntityConfig, houseEditOrder, gotoUserLink } from '@/api'  // Import your API methods
import BCNotify from '@/components/notify/index.vue'
// Reactive state
const show = ref(false)
const ressinfo = ref({})
const isOrderPackage = ref(false)
const orderId = ref(null)
const fileList1 = ref([])
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
const timeUnit = ref('')
const serviceRules = ref('')
const optionUnit = ref('')

const consumerAdrs = ref(null)
const deliveryVisi = ref(false)
const informationVisi = ref(false)
const hospitalVisi = ref(false)
const methodVisi = ref(false)
const certificateVisi = ref(false)
const contactVisi = ref(false)

// Methods
const handleChange = (item) => {
    fileList1.value = item
}

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
    catch (err) {
        console.error('Error:', err.message)
    // Handle error with a toast or any other method
    }
}

const submit = async () => {
    try {
        await houseEditOrder({
            orderId: orderId.value,
            note: parameter.note,
            attr: {
                utcVisitStart: parameter.utcVisitStart,
                addressId: consumerAdrs.value || deliveryVisi.value ? ressinfo.value.id : null,
                patientId: informationVisi.value ? parameter.patientId : null,
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
        })

        close()
    // Emit event after successful submission
    // e.g., emit("updateOrder") if needed
    }
    catch (err) {
        console.error('Error:', err.message)
    // Handle error with a toast or any other method
    }
}

const getAdres = (type = 0) => {
    const req = {}
    if (type === 1) { req.shopId = shopId.value }
    gotoUserLink(req, 'dizhi')
}

const getSerTime = (e) => {
    parameter.utcVisitStart = e / 1000
}

const showTime = () => {
    // Assuming `dataTime` component exists
    // this.$refs.dataTime.openTime()
}

const setDelivery = (e) => {
    // Assuming `deliveryShow` is used to control a modal or visibility
    deliveryShow.value = false
    parameter.deliveryMethodId = e.value[0].id
    parameter.deliveryMethodName = e.value[0].label
}

// Watchers
// For example, if you need to watch changes to 'parameter.utcVisitStart'
watch(() => parameter.utcVisitStart, (newValue, oldValue) => {
    console.log('UTC Visit Start changed:', newValue)
})
</script>


<style lang="scss" scoped>
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
    }
}
</style>

