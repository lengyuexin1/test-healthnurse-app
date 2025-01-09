// 比较版本号大小
export const compareVersions = (version1: any, version2: any) => {
    const parts1 = version1.split('.')
    const parts2 = version2.split('.')
    const maxLength = Math.max(parts1.length, parts2.length)

    for (let i = 0; i < maxLength; i++) {
        const part1 = i < parts1.length ? parseInt(parts1[i], 10) : 0
        const part2 = i < parts2.length ? parseInt(parts2[i], 10) : 0

        if (part1 < part2) {
            return -1 // version1 < version2
        }
        else if (part1 > part2) {
            return 1 // version1 > version2
        }
    }

    return 0 // version1 === version2
}
