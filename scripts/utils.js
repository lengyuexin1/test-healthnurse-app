/**
 * open-api的types处理工具类
 */
import path from 'node:path'
import fs from 'fs'
import { URL, fileURLToPath } from 'node:url'
import axios from 'axios'
import openapiTS, { astToString } from 'openapi-typescript'

const __dirname = fileURLToPath(new URL('../packages/api', import.meta.url))
const __typesDir = 'types'
const ignorePaths = ['rpc', 'actuator', 'error']
const __env = 'test'

/**
 * 获取有效接口路径
 * @param {import('openapi-typescript').OpenAPI3} json
 * @returns
 */
const filterIgnorePaths = (json) => {
    return Object.keys(json.paths).filter(path => {
        const first = path.split('/')[1]
        return !ignorePaths.includes(first)
    })
}


/**
 * 生成types文件
 * @param { string } serviceName 服务名
 */
export const generalScheme = (serviceName) => {
    const openApiFile = `schema.ts`
    axios.get(`https://${__env}.baochuncare.com/api/${serviceName}/v3/api-docs`).then(async response => {
        const ast = await openapiTS(response.data)
        const typeDefinitions = astToString(ast)
        const filePath = path.join(__dirname, __typesDir, serviceName, openApiFile)

        fs.mkdirSync(path.dirname(filePath), { recursive: true })
        fs.writeFile(filePath, `/* eslint-disable */\n${typeDefinitions}`, err => {
            if (err) { throw err }
            console.log(`The file ${openApiFile} has been saved!`)
        })

        generalApi(serviceName, 'post', 'response', response.data)
        generalApi(serviceName, 'get', 'response', response.data)
        generalApi(serviceName, 'post', 'request', response.data)
        generalApi(serviceName, 'get', 'request', response.data)
        generalTypes(serviceName, response.data)
        generalPaths(serviceName, response.data)
    }).catch(error => {
        console.error(error)
    })
}


/**
 * 首字母大写
 * @param {string} str
 * @returns
 */
const toUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 获取请求类型对应的key
 * @param { 'get' | 'post' } method
 * @param {import('openapi-typescript').OperationObject} operationObject
 * @param { 'response' | 'request' } dataType 请求类型
 */
const getDataTypeKey = (method, operationObject, dataType) => {
    if (dataType === 'response') {
        const content = operationObject.responses[200].content
        if (content === undefined) {
            return `['responses'][200]['content']`
        }

        const contentType = Object.keys(content)[0]

        //处理分页接口
        if (content[contentType] && content[contentType].schema && content[contentType].schema.$ref) {
            const ref = content[contentType].schema.$ref
            if (ref.includes('PageResult')) {
                return `['responses'][200]['content']['${contentType}']`
            }
            else if (ref.includes('Result«')) {
                return `['responses'][200]['content']['${contentType}']['data']`
            }

            // if (operationObject.operationId === 'LookUsingPOST') {
            //     console.error('ref: ', operationObject, content, ref)
            // }
        }
        return `['responses'][200]['content']['${contentType}']`
    }
    else if (dataType === 'request') {
        if (method === 'get') {
            return `['parameters']['query']`
        }
        else if (method === 'post') {
            const requestBody = operationObject.requestBody
            if (requestBody === undefined) {
                if (operationObject.parameters && operationObject.parameters.length > 0) {
                    return `['parameters']['query']`
                }
                return `['requestBody']`
            }
            const content = requestBody.content
            if (content === undefined) {
                return `['requestBody']['content']`
            }
            const contentType = Object.keys(content)[0]
            return `['requestBody']['content']['${contentType}']`
        }
    }
    return ''
}

/**
 * 生成api请求和响应
 * @param { string } serviceName 服务名
 * @param { 'get' | 'post' } method
 * @param { 'response' | 'request' } dataType 请求类型
 * @param {Required<import('openapi-typescript').OpenAPI3>} json
 */
const generalApi = (serviceName, method, dataType, json) => {
    const openApiFile = `schema`
    const paths = filterIgnorePaths(json)

    const apis = paths.map((path) => {
        const methodKey = Object.keys(json.paths[path]).find(item => item === method)
        if (methodKey !== undefined) {
            /** @type {import('openapi-typescript').OperationObject} operationObject */
            const operationObject = json.paths[path][methodKey]
            // operations的keys组
            const dataTypeKey = getDataTypeKey(method, operationObject, dataType)
            return [
                `    /** ${operationObject.summary} */`,
                `    "${path}": Required<operations["${operationObject.operationId}"]>${dataTypeKey}`,
                ``
            ].join('\n')
        }
        return ''
    }).filter(item => item !== '').join('\n')

    const responseTypes = [
        `import type { operations } from './${openApiFile}'`,
        ``,
        `export interface I${toUpperCase(serviceName)}${toUpperCase(method)}${toUpperCase(dataType)} {`,
        apis,
        `}`,
        ``
    ].join('\n')

    const filename = `${method}-${dataType}.ts`
    const filePath = path.join(__dirname, __typesDir, serviceName, filename)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFile(filePath, `${responseTypes}`, err => {
        if (err) { throw err }
        console.log(`The file ${filename} has been saved!`)
    })
}

/**
 * 生成请求和响应实体
 * @param {string} serviceName 服务名
 * @param {Required<import('openapi-typescript').OpenAPI3>} json
 */
const generalTypes = (serviceName, json) => {
    const openApiFile = `schema`
    const paths = filterIgnorePaths(json)

    const apis = paths.map((path) => {
        return Object.keys(json.paths[path]).map((method) => {
            /** @type {import('openapi-typescript').OperationObject} operationObject */
            const operationObject = json.paths[path][method]
            // operations的keys组
            const dataTypeReqKey = getDataTypeKey(method, operationObject, 'request')
            const dataTypeResKey = getDataTypeKey(method, operationObject, 'response')
            const pathKey = path.split('/').join('_')
            return [
                `/** ${operationObject.summary} - ${method}请求参数 */`,
                `export type ${pathKey}_${method}_req = Required<operations["${operationObject.operationId}"]>${dataTypeReqKey}`,
                `/** ${operationObject.summary} - ${method}响应参数 */`,
                `export type ${pathKey}_${method}_res = Required<operations["${operationObject.operationId}"]>${dataTypeResKey}`,
                ``
            ].join('\n')
        }).join('\n')
    }).join('\n')

    const responseTypes = [
        `import type { operations } from './${openApiFile}'`,
        ``,
        apis,
        ``
    ].join('\n')

    const filename = `api-types.ts`
    const filePath = path.join(__dirname, __typesDir, serviceName, filename)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFile(filePath, `${responseTypes}`, err => {
        if (err) { throw err }
        console.log(`The file ${filename} has been saved!`)
    })
}

/**
 * 生成paths配置
 * @param { string } serviceName 服务名
 * @param {Required<import('openapi-typescript').OpenAPI3>} json
 */
const generalPaths = (serviceName, json) => {
    const paths = filterIgnorePaths(json)
    const tags = {}
    const add2Tag = (tag, pathItemApi) => {
        tags[tag] = tags[tag] || []
        tags[tag].push(pathItemApi)
    }

    paths.forEach((path) => {
        /** @type {import('openapi-typescript').PathItemObject} pathItemObject */
        const pathItemObject = json.paths[path]
        const tags = new Set()
        const pathItemApi = Object.values(pathItemObject).map(operationObject => {
            tags.add(...operationObject.tags)
            return [
                `        /** ${operationObject.summary} */`,
                `        ${operationObject.operationId}: "${path}"`
            ].join('\n')
        }).join(',\n')
        tags.forEach(tag => {
            add2Tag(tag, pathItemApi)
        })
    })

    const tagsPaths = Object.keys(tags).map(tag => {
        return [
            `    "${tag}": {`,
            tags[tag].join(',\n'),
            `    }`
        ].join('\n')
    }).join(',\n')

    const output = [
        `export const ${serviceName.toUpperCase()}_API = {`,
        tagsPaths,
        `}`
    ].join('\n')

    const filename = `api-conf.ts`
    const filePath = path.join(__dirname, __typesDir, serviceName, filename)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFile(filePath, `${output}\n`, err => {
        if (err) { throw err }
        console.log(`The file ${filename} has been saved!`)
    })
}
