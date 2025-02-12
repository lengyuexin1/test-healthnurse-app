// #ifdef APP-PLUS
import permision from './permission.ts'
//#endif


import store from '@/store/index.js'



// 拨打电话
export const ringUp = function(phone) {
    //#ifdef APP-PLUS
    if (plus.os.name != "iOS") {
        permision.requestAndroidPermission('android.permission.CALL_PHONE').then(function(value) {
            if (value == -1) {
                uni.showToast({
                    title: '拨打电话权限已被永久拒绝',
                    icon: 'none'
                })
                setTimeout(() => {
                    permision.gotoAppPermissionSetting()
                }, 1000)
                return false
            }
        })
    }
    //#endif

    uni.makePhoneCall({
        phoneNumber: String(phone),
        fail: (err) => { console.log('拨号失败：' + err) }
    })
}

// 获取会话列表
export const getSessionsList = async function() {
    return {
        data: [{ cnt_unread: 0 }]
    }
}

// 判断当前用户是否申请注销
export const applyForcancellation = function() {
    if (!store.state.about.userinfo) { return false }
    const status = [100000, 200000].includes(store.state.about.userinfo.is_cancellation)
    if (status) { uni.showToast({ title: '您已提交注销，请撤销后重试！', icon: 'none' }) }
    return status
}

/**
 * 数字运算（主要用于小数点精度问题）
 * [see](https://juejin.im/post/6844904066418491406#heading-12)
 * @param {number} a 前面的值
 * @param {"+"|"-"|"*"|"/"} type 计算方式
 * @param {number} b 后面的值
 * @example
 * ```js
 * // 可链式调用
 * const res = computeNumber(1.3, "-", 1.2).next("+", 1.5).next("*", 2.3).next("/", 0.2).result;
 * console.log(res);
 * ```
 */
export const computeNumber = function(a, type, b) {
    /**
   * 获取数字小数点的长度
   * @param {number} n 数字
   */
    function getDecimalLength(n) {
        const decimal = n.toString().split(".")[1]
        return decimal ? decimal.length : 0
    }
    /**
   * 修正小数点
   * @description 防止出现 `33.33333*100000 = 3333332.9999999995` && `33.33*10 = 333.29999999999995` 这类情况做的处理
   * @param {number} n
   */
    const amend = (n, precision = 15) => parseFloat(Number(n).toPrecision(precision))
    const power = Math.pow(10, Math.max(getDecimalLength(a), getDecimalLength(b)))
    let result = 0

    a = amend(a * power)
    b = amend(b * power)

    switch (type) {
        case "+":
            result = (a + b) / power
            break
        case "-":
            result = (a - b) / power
            break
        case "*":
            result = (a * b) / (power * power)
            break
        case "/":
            result = a / b
            break
        default:
            break
    }

    result = amend(result)

    return {
    /** 计算结果 */
        result,
        /**
     * 继续计算
     * @param {"+"|"-"|"*"|"/"} nextType 继续计算方式
     * @param {number} nextValue 继续计算的值
     */
        next(nextType, nextValue) {
            return computeNumber(result, nextType, nextValue)
        }
    }
}

// 优惠卷类型 折扣券 返回true
export const getCouponType = (typeId) => {
    const cpuponTypeList = [1000004, 1000002, 10004, 10002, 100002, 100004]
    return cpuponTypeList.includes(typeId)
}
