// 版本控制
import { software as localSoftware } from "./config-local"
let softwareLocal = localSoftware

// 云信IMkey
const ImProdKey = "23847cad317767365d411ef2b1d01ccb"

let WXversion:any = ''
let QRversion = ''

// #ifdef MP-WEIXIN
// 获取小程序当前帐号信息
const miniProgram = wx.getAccountInfoSync().miniProgram
WXversion = miniProgram.version || 'dev.1.0.20'
QRversion = miniProgram.envVersion
if (QRversion === 'release') {
    softwareLocal = "prod"
}
// #endif

// #ifdef APP-PLUS
WXversion = plus.runtime.versionCode

QRversion = 'release' // 正式版
// QRversion = 'trial' // 体验版
// QRversion = 'develop' // 开发版
// #endif


export const web = {
    java: `https://${softwareLocal}.baochuncare.com` //   java
}

export const key = {
    imKey: ImProdKey
}

export const edition = {
    WXversion,
    QRversion
}

export const apiVersion = "/v1"

export const software = softwareLocal
