
/**
 * 根据索引获取在对象内的值
 * @param object 源对象
 * @param keyStr 字符串索引,如xx.yy.zz; 支持数组的索引，如:xx.0.yy;
 * @returns
 */
const getValue = (object: any, keyStr: string): any => {
    const keyList = keyStr.split(".")
    //先获取第一个
    const firstKey = keyList.shift() as string
    const firstValue = object && object[firstKey]

    if (keyList.length === 0) {
        return firstValue
    }
    else {
        return getValue(firstValue, keyList.join("."))
    }
}

/**
 * 是否数字
 * @param value
 * @returns
 */
const isNumber = (value: any) => {
    return !isNaN(parseFloat(value)) && isFinite(value)
}

/**
 * 获取数组交集
 * @param arr1
 * @param arr2
 * @returns
 */
const intersection = (arr1: any[], arr2: any[]) => {
    return arr1.filter(item => arr2.includes(item))
}

/**
 * 分割数据
 * @param arr
 * @param size
 * @returns
 */
const splitArray = <T>(arr: T[], size:number) => {
    const result = []
    while (arr.length > 0) {
        const currentChunk = arr.splice(0, size)
        result.push(currentChunk)
    }
    return result
}

/** 
 * 【单聊】处理返回云信账号增加的环境变量前缀 
 * @param accountStr
 * @returns
 */
const handleEnvAccount = (accountStr: any) => {
    if (isNumber(accountStr)) {
        return accountStr
    }
    const regex = /test|dev|pre|prod/gi
    let modifiedString = accountStr.toString().replace(regex, '')
    modifiedString = modifiedString.trim().replace(/\s+/g, ' ').trim()
    return modifiedString
}

export const ObjectTool = {
    getValue,
    isNumber,
    intersection,
    splitArray,
    handleEnvAccount
}
