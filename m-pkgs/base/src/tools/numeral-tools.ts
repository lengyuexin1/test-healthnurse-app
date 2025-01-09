import numeral from 'numeral'

numeral.register('format', 'money', {
    regexps: {
        format: /(￥)/,
        unformat: /(￥)/
    },
    format: function(value, format, roundingFunction) {
        if (format.includes('￥')) {
            format = format.replace(/\s?\￥/, '')
            const output = numeral._.numberToFormat(value, format, roundingFunction)
            return `￥${output}`
        }
        return numeral._.numberToFormat(value, format, roundingFunction)
    },
    unformat: function(string) {
        return numeral._.stringToNumber(string)
    }
})


/**
 *
 * @param value 需要转换的值
 * @param def numeral(value).value() === null 时的默认值
 * @returns
 */
export const NumeralTools = (value: any, def = 0) => {
    const obj = numeral(value)
    if (obj.value() === null) {
        return numeral(def)
    }
    return obj
}
