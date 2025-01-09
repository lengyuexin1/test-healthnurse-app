import { dateRangeRule, decimalRule, integerRule, lengthRule, numberRangeRule, requiredRule } from './rules'

//===================================================
//定义
//===================================================


const debug = false
//===================================================
//接口
//===================================================


/** 异常 */
interface IValidError extends Error {
    /** 异常规则 */
    rule: IRuleOption

    /** 根据errFieldKey匹配到的最终结果数据 */
    matchData: IMatchData

    /** 异常对象索引, 校验对象为数组才有 */
    errIndex: any
}


//===================================================
//工具类
//===================================================


/** 目标对象,非数组. 参考 Object */
type TargetObj = Record<string, any>
/**
 * 获取"keyStr"对应的结果
 * @param target 目标对象, 非数组
 * @param keyStr 主键, 支持多级主键。比如: "userInfo.phone",可以拿到userInfo下的phone属性
 */
const getMatchData = (target: TargetObj, keyStr: string): IMatchData | IMatchData[] => {
    //数组判断
    if (Array.isArray(target)) {
        return __getArrValue(target, keyStr)
    }
    return __getObjValue(target, keyStr)
}
//@ts-ignore
const __getObjValue = (target: TargetObj, keyStr: string) => {
    const keyList = keyStr.split('.')
    //先获取第一个
    const firstKey = keyList.shift()
    //@ts-ignore
    const firstValue: any = target && target[firstKey]

    if (keyList.length === 0) {
        return { value: firstValue, key: firstKey, object: target } as IMatchData
    }

    if (Array.isArray(firstValue)) {
        return __getArrValue(firstValue, keyList.join('.')) as IMatchData[]
    }
    return __getObjValue(firstValue, keyList.join('.'))
}

//@ts-ignore
const __getArrValue = (targetList: TargetObj[], keyStr: string) => {
    //@ts-ignore
    return targetList.flatMap((item) => {
        return __getObjValue(item, keyStr)
    })
}

/** 统一格式化异常 */
const handleErr = (err: IValidError, matchData: IMatchData, option: IRuleOption) => {
    if (err === undefined || err.message === undefined) {
        err = new Error() as IValidError
    }
    //注入异常字段和匹配结果
    err.rule = option
    if (option.message) {
        err.message = option.message
    }

    err.matchData = Object.assign({}, matchData)
    return Promise.reject(err)
}


/** 合并校验 */
const unionFun = (fun1:IRuleFun, fun2:IRuleFun) => {
    return async (matchData: IMatchData, option: IRuleOption) => {
        return fun1(matchData, option).then(() => {
            return fun2(matchData, option)
        })
    }
}

//===================================================
//规则库
//===================================================


const ruleMap: Record<TRuleType, IRuleFun> = {
    'required': requiredRule,
    'length': lengthRule,
    'integer': unionFun(requiredRule, integerRule),
    'decimal': decimalRule,
    'numberRange': numberRangeRule,
    'dateRange': unionFun(requiredRule, dateRangeRule)
}

//===================================================
//核心类
//===================================================

export class VerifyTools {

    static check(target: any, options: IRuleOption[]) {
        if (Array.isArray(target)) {
            return this.checkArr(target, options)
        }
        return this.checkObj(target, options)
    }
    private static checkObj(target: any, options: IRuleOption[]) {
        //@ts-ignore
        const promiseList = []
        options.forEach((option) => {
            const fieldKey = option.key
            // debug && console.group('rule run log')
            debug && console.info('rule-fieldKey: ', fieldKey)
            //@ts-ignore
            const matchData = getMatchData(target, fieldKey)
            debug && console.info('matchData: ', matchData)
            debug && console.info('option: ', option)

            const checkFun = typeof (option.check) === 'string' ? ruleMap[option.check] : option.check

            if (Array.isArray(matchData)) {
                //数组
                matchData.forEach((data) => {
                    debug && console.warn('check-value: ', data)
                    promiseList.push(checkFun(data, option).catch((err: IValidError) => {
                        return handleErr(err, data, option)
                    }))
                })
            }
            else {
                debug && console.warn('check-value: ', matchData)
                promiseList.push(checkFun(matchData as IMatchData, option).catch((err: IValidError) => {
                    return handleErr(err, matchData, option)
                }))
            }
            // debug && console.groupEnd()
        })
        //@ts-ignore
        return Promise.all(promiseList)
    }

    private static checkArr(targetList: any[], options: IRuleOption[]) {
        //@ts-ignore
        const promiseList = []
        targetList.forEach((target, index) => {
            const promise = this.checkObj(target, options).catch((err) => {
                //注入对象和对象索引
                err.errIndex = index
                return Promise.reject(err)
            })
            promiseList.push(promise)
        })
        //@ts-ignore
        return Promise.all(promiseList)
    }
}

