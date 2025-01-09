/**
 * 格式化价格金额
 * 除以100，同时保留两位小数
 */

export const priceFormat = (price: string | number) => {
    const newPrice = price / 100

    const splitPrice = newPrice.toString().split('.')

    const num1 = splitPrice[0]

    let num2 = '00'

    if (splitPrice.length > 1) {
        num2 = splitPrice[1]
    }

    return `￥${num1}.${num2}`
}