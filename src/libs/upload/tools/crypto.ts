

const BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
const BLOCK_SIZE = 16

//===================================================
//工具类
//===================================================

// Convert a string to big-endian 32-bit words
const stringToWords = (str: string) => {
    const words: number[] = []
    for (let c = 0, b = 0; c < str.length; c++, b += 8) {
        words[b >>> 5] |= str.charCodeAt(c) << (24 - b % 32)
    }
    return words
}

// Convert big-endian 32-bit words to a byte array
const wordsToBytes = (words: number[]) => {
    const bytes = []
    for (let b = 0; b < words.length * 32; b += 8) {
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF)
    }
    return bytes
}

// Convert a byte array to a hex string
const bytesToHex = (bytes: number[]) => {
    const hex = []
    for (let i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16))
        hex.push((bytes[i] & 0xF).toString(16))
    }
    return hex.join("")
}

// Convert a string to a byte array
const stringToBytes = (str: string) => {
    const bytes = []
    for (let i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i))
    }
    return bytes
}

const bytesToString = (bytes: number[]) => {
    const str = []
    for (let i = 0; i < bytes.length; i++) {
        str.push(String.fromCharCode(bytes[i]))
    }
    return str.join("")
}

// Convert a byte array to a base-64 string
const bytesToBase64 = (bytes: number[]) => {

    // Use browser-native function if it exists
    // if (typeof btoa == "function") {
    //     return btoa(bytesToString(bytes))
    // }

    const base64 = [] as string[]
    let overflow

    for (let i = 0; i < bytes.length; i++) {
        // eslint-disable-next-line default-case
        switch (i % 3) {
            case 0:
                base64.push(BASE64_MAP.charAt(bytes[i] >>> 2))
                overflow = (bytes[i] & 0x3) << 4
                break
            case 1:
                //@ts-ignore
                base64.push(BASE64_MAP.charAt(overflow | (bytes[i] >>> 4)))
                overflow = (bytes[i] & 0xF) << 2
                break
            case 2:
                //@ts-ignore
                base64.push(BASE64_MAP.charAt(overflow | (bytes[i] >>> 6)))
                base64.push(BASE64_MAP.charAt(bytes[i] & 0x3F))
                overflow = -1
        }
    }

    // Encode overflow bits, if there are any
    if (overflow != undefined && overflow != -1) {
        base64.push(BASE64_MAP.charAt(overflow))
    }

    // Add padding
    while (base64.length % 4 != 0) {
        base64.push("=")
    }

    return base64.join("")

}


//===================================================
//工具类 - SHA1
//===================================================


const _sha1 = function(message: string) {

    const m = stringToWords(message)
    const l = message.length * 8
    const w = []
    let H0 =  1732584193, H1 = -271733879, H2 = -1732584194, H3 =  271733878, H4 = -1009589776

    // Padding
    m[l >> 5] |= 0x80 << (24 - l % 32)
    m[((l + 64 >>> 9) << 4) + 15] = l

    for (let i = 0; i < m.length; i += 16) {

        const a = H0, b = H1, c = H2, d = H3, e = H4

        for (let j = 0; j < 80; j++) {

            if (j < 16) {
                w[j] = m[i + j]
            }
            else {
                //@ts-ignore
                const n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16]
                w[j] = (n << 1) | (n >>> 31)
            }

            const t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + (j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 : j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 : j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 : (H1 ^ H2 ^ H3) - 899497514)

            H4 =  H3
            H3 =  H2
            H2 = (H1 << 30) | (H1 >>> 2)
            H1 =  H0
            H0 =  t

        }

        H0 += a
        H1 += b
        H2 += c
        H3 += d
        H4 += e

    }

    return [H0, H1, H2, H3, H4]

}

const SHA1toString = (message: string) => {
    const digestbytes = wordsToBytes(_sha1(message))
    return bytesToString(digestbytes)
}

const SHA1toByte = (message: string) => {
    return wordsToBytes(_sha1(message))
}


//===================================================
//核心
//===================================================


export const HMAC = (message: string, key: string) => {

    // Allow arbitrary length keys
    const keyByte = key.length > BLOCK_SIZE * 4 ? SHA1toByte(key) : stringToBytes(key)

    // XOR keys with pad constants
    const okey = keyByte, ikey = keyByte.slice(0)
    for (let i = 0; i < BLOCK_SIZE * 4; i++) {
        okey[i] ^= 0x5C
        ikey[i] ^= 0x36
    }

    const bytes = SHA1toByte(bytesToString(okey) + SHA1toString(bytesToString(ikey) + message))
    return bytesToBase64(bytes)
}
