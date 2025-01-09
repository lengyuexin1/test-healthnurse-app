import dayjs from 'dayjs'
import { NumeralTools } from "../tools/numeral-tools"

//===================================================
//定义
//===================================================

const PRE_TAG = '「'
const LAST_TAG = '」'

//===================================================
//工具类
//===================================================


/** 快速创建异常实体 */
const createErrorPromise = (message: string) => {
    return Promise.reject(new Error(message))
}


//===================================================
//规则集
//===================================================


/** 必填校验规则 */
export const requiredRule: IRuleFun = (matchData: IMatchData, option: IRuleOption) => {
    const value = matchData.value
    if (value === undefined || value === null || value === '') {
        return createErrorPromise(`${PRE_TAG}${option.tips}${LAST_TAG} ${messageMap.required}`)
    }

    if (Array.isArray(value) && value.length === 0) {
        return createErrorPromise(`${PRE_TAG}${option.tips}${LAST_TAG} ${messageMap.required}`)
    }
    return Promise.resolve()
}

/** 长度校验规则 */
//@ts-ignore
export const lengthRule: IRuleFun = (matchData: IMatchData, option: ILengthRuleOption) => {
    const value = matchData.value || ''
    if (value.length > option.max || value.length < option.min) {
        return createErrorPromise(`${PRE_TAG}${option.tips}${LAST_TAG} ${messageMap.length}`)
    }
    return Promise.resolve()
}

/** 整数校验规则 */
export const integerRule: IRuleFun = (matchData: IMatchData, option: IRuleOption) => {
    const value = matchData.value

    if (!/(^[1-9]\d*$)|(^0$)/.test(value)) {
        return createErrorPromise(`${PRE_TAG}${option.tips}${LAST_TAG} ${messageMap.integer}`)
    }
    return Promise.resolve()
}
/** 小数校验规则 */
//@ts-ignore
export const decimalRule: IRuleFun = (matchData: IMatchData, option: IDecimalRuleOption) => {
    const value = matchData.value

    //格式校验
    if (!/^\d*(\.\d{1,})?$/.test(value)) {
        return createErrorPromise(`${PRE_TAG}${option.tips}${LAST_TAG} ${messageMap.decimal}`)
    }

    const res = value.toString().split('.')
    //@ts-ignore
    if (res[1] !== undefined && res[1].length > option.digit) {
        return createErrorPromise(`${PRE_TAG}${option.tips}${LAST_TAG} 格式不对, 只支持${option.digit}位小数点`)
    }
    //const regexp = new RegExp('(^[1-9]\\d*(\\.\\d{1,' + digit + '})?$)|(^0\\.\\d{1,' + digit + '}$)')
    return Promise.resolve()
}
/** 数字范围校验规则 */
//@ts-ignore
export const numberRangeRule: IRuleFun = (matchData: IMatchData, option: INumberRangRuleOption) => {
    const value = matchData.value
    if (value === undefined) {
        //为空则不校验
        return Promise.resolve()
    }

    //格式校验
    if (!/^\d*(\.\d{1,})?$/.test(value)) {
        return createErrorPromise(`${PRE_TAG}${option.tips}${LAST_TAG} ${messageMap.numberRange}`)
    }

    //@ts-ignore
    if (NumeralTools(value).subtract(option.min).value() < 0 || NumeralTools(option.max).subtract(value).value() < 0) {
        return createErrorPromise(`${PRE_TAG}${option.tips}${LAST_TAG} 的范围必须为: ${option.min} ~ ${option.max}`)
    }

    return Promise.resolve()
}
/** date范围校验规则 */
//@ts-ignore
export const dateRangeRule: IRuleFun = (matchData: IMatchData, option: IDateRangRuleOption) => {
    const value = matchData.value

    //格式校验
    if (dayjs(value).isBefore(option.min) || dayjs(value).isAfter(option.max)) {
        return createErrorPromise(`${PRE_TAG}${option.tips}${LAST_TAG} 的范围必须为: ${dayjs(option.min).format('YYYY/MM/DD')} ~ ${dayjs(option.max).format('YYYY/MM/DD')}`)
    }

    return Promise.resolve()
}

const messageMap: Record<TRuleType, string> = {
    'required': '不能为空, 请检查!',
    'length': '长度不对, 请检查',
    'integer': '必须为整数, 请检查!',
    'decimal': '格式不对, 请检查!',
    'numberRange': '格式不对, 请检查!',
    'dateRange': '格式不对, 请检查!'
}
