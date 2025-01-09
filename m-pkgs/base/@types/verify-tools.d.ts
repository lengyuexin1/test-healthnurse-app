/* eslint-disable no-unused-vars */
//===================================================
//类型定义
//===================================================

type TRuleType = "numberRange" | "decimal" | "dateRange" | "required" | "integer" | 'length'


/** 获取对象结果 */
interface IMatchData {
    /** 当前对象主键key */
    key: string

    /** 根据主键获取的当前对象的值
     * 注意: 空数组的正常值为[], 如果为 undefined, 则value值也为 undefined
     */
    value: any

    /** 当前对象
     * 注意: 空数组的正常值为[], 如果为 undefined, 则object值也为 undefined
     */
    object: any
}

/** 规则函数 */
interface IRuleFun {
    /**
     * @param matchData 匹配结果
     * @param option 规则
     */
    (matchData: IMatchData, option: IRuleOption): Promise<void>
}


/** 基本规则字段 */
interface IBaseRuleOption {
    /** 校验字段, 支持“多级主键”, 比如: "userInfo.phone",可以拿到userInfo下的phone属性 */
    key?: string
    /** 字段名 */
    tips?: string
    /** 校验不通过时的完整提示信息 */
    message?: string
}
/** 自定义规则 */
interface ICustomRuleOption extends IBaseRuleOption{
    /** 校验函数, 支持函数自定义校验 */
    check: IRuleFun
}
/** 自带规则 */
interface INativeRuleOption extends IBaseRuleOption {
    /** 常用校验方式 */
    check: TRuleType
}
/** 长度规则 */
interface ILengthRuleOption extends INativeRuleOption {
    check: 'length'
    /** 最小长度 */
    min: number
    /** 最大长度 */
    max: number
}
/** 小数规则 */
interface IDecimalRuleOption extends INativeRuleOption {
    check: 'decimal'
    /** 小数点位数 */
    digit?: number
}
/** 数字范围规则 */
interface INumberRangRuleOption extends INativeRuleOption {
    check: 'numberRange'
    /** 最小值 */
    min: number
    /** 最大值 */
    max: number
}
/** 日期范围规则 */
interface IDateRangRuleOption extends INativeRuleOption {
    check: 'dateRange'
    /** 最小日期 */
    min: string
    /** 最大日期 */
    max: string
}

/** 规则集 */
type IRuleOption = ICustomRuleOption | INumberRangRuleOption | IDecimalRuleOption | IDateRangRuleOption | INativeRuleOption | ILengthRuleOption

