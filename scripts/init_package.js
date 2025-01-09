console.log('init .env')

import fs from 'node:fs'

const fd = fs.openSync('.env.local', 'w')
let cnt = '# 通用'
// eslint-disable-next-line no-undef
cnt += '\r\n' + 'VITE_PROJECT_NAME=' + process.env.npm_package_name
// eslint-disable-next-line no-undef
cnt += '\r\n' + 'VITE_PROJECT_VERSION=' + process.env.npm_package_version
cnt += '\r\n'
fs.writeSync(fd, cnt)

fs.closeSync(fd)
