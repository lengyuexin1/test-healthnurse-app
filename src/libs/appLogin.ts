//阿里云一键登录sdk
const aLiSDKModule = uni.requireNativePlugin('AliCloud-NirvanaPns')

import { PlatformManage } from '@bc/sys'
import { gotoLogin } from "@/routes/public-routes"



//配置一键登录页面
const buildFullscreen = function() {
    const unit = parseInt((plus.screen.resolutionHeight - 80) / 20)
    const logoTop = String(unit * 1 - 10)
    const sloganTop = String(unit * 5)
    const numberTop = String(unit * 6 + 20)
    const loginBtnTop = String(unit * 9)
    const switchTop = String(unit * 12)

    return {
        uiConfig: {
            setStatusBarStyle: "1",
            setNavHidden: "true",
            // setSwitchHidden: "true",
            setLogoUi: {
                imgPath: "static/bc_logo.png",
                top: logoTop
            },
            setSloganUi: {
                top: sloganTop
            },
            setNumberUi: {
                top: numberTop
            },
            setLoginBtnUi: {
                top: loginBtnTop,
                color: "#2DDB8A"
            },
            setCheckBoxUi: {
                top: 10
            },
            setSwitchUi: {
                textColor: "#0faeff",
                top: switchTop
            },
            setPrivacyUi: {
                expandAuthPageCheckedScope: true
            },
            setAppPrivacyOne: {
                title: "用户协议",
                url: "https://res.baochuncare.com/web/protocol/user_agreement_xc_app.html"
            },
            setAppPrivacyTwo: {
                title: "隐私政策",
                url: "https://res.baochuncare.com/web/protocol/privacy_policy_xc_app.html"
            }
            /* setAppPrivacyThree: {
                title: "服务协议",
                url: "https://www.taobao.com",
            }, */
        }
    }
}

//app登录
export const appLogins = function(callback: Function) {
    const config = buildFullscreen()
    console.log('config',config);
    
    _presentLoginController(config).then((token) => {
        console.log('获取token换取手机号', token)
        callback(token)
    }).catch((err:any)=>{
        console.log('err',err);
        
    })
}

//初始化登录
function _presentLoginController(config: any) {
    // uni.showLoading({
    //     mask: true
    // })
    console.log('调用');
    
    return new Promise<string>((resolve, _reject) => {
        // 调用该接口首先会弹起授权页，点击授权页的登录按钮获取Token

        console.log('调用2');
        console.log('aLiSDKModule',aLiSDKModule);
        aLiSDKModule.getLoginToken(
            5000,
            config,
            (tokenResult: any) => {
                uni.hideLoading()
                const token = tokenResult.token

                console.log('调用阿里云');
                

                console.log(JSON.stringify(tokenResult), token)
                if (tokenResult.resultCode == "600001") {
                    console.log("授权页拉起成功", tokenResult)

                    aLiSDKModule.setCheckboxIsChecked(false)
                }
                else if (tokenResult.resultCode == "600000") {
                    resolve(token)
                    console.log(
                        "获取Token成功，接下来拿着结果里面的Token去服务端换取手机号码，SDK服务到此结束"
                    )
                    //手动关闭授权页
                    aLiSDKModule.quitLoginPage()
                }
                else {

                    //手动关闭授权页
                    aLiSDKModule.quitLoginPage()
                    gotoLogin({logtype: 2})
                }
            },
            (clickResult: any) => {
                console.log('-----------', JSON.stringify(clickResult))
                /* 切换其他方式登录 */
                if (clickResult.resultCode == 700001) {
                    aLiSDKModule.quitLoginPage()
                    gotoLogin({logtype: 2})
                }
            },
            (customUiResult: any) => {
                console.log("点击了自定义控件 " + JSON.stringify(customUiResult))
            }
        )
    })
}

