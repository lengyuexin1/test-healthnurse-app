import { sendTyUid } from "@/api/room-api"
var homeModule = uni.requireNativePlugin("XM-TuyaHomeModule")
var userModule = uni.requireNativePlugin("XM-TuyaUserModule")
var tuya = uni.requireNativePlugin("XM-TuyaModule")
// 初始化
export const initSDK = () => {
    var params:any = {};
    switch (uni.getSystemInfoSync().platform) {
        case 'android':
            params.appKey = "qsw35sr9yg8ptmhvpa8p";
            params.appSerect = "w4tetktjsndsvqcsccu7emj8a4wme5vs";
            break;
        case 'ios':
            params.appKey = "srgfuc797cp3v98tt383";
            params.appSerect = "w4tetktjsndsvqcsccu7emj8a4wme5vs";
            break;
        default:
            break;
    }
    tuya.init(params, (ret:any) => {
        console.log('涂鸦SDK',JSON.stringify(ret));
    });
}

export const getHomeDetail = (id: string) => {
    return new Promise((resolve, reject) => {
        homeModule.getHomeDetail({
            homeId: id
        }, (resp: any) => {
            console.log(resp)
            resolve(resp)
        })
    })
}

export const uidLogin = (tyId: any, useId: any) => {
    // initSDK()
    console.log('SDK-APi', userModule);

    userModule.loginOrRegisterWithUid({
        countryCode: '86',
        uid: tyId,
        passwd: useId,
        isCreateHome: false
    }, (resp: any) => {
        console.log(tyId, useId)
        console.log(resp)
        uni.setStorageSync("tuyaUid", resp.data.uid)
        const data = {
            uid: resp.data.uid
        }
        sendTyUid(data).then(res => {
            console.log(res)
        })
    })
}