import { withNoopInstall } from '@tuniao/tnui-vue3-uniapp/utils'
import TopNavbar from './src/top-navbar.vue'

export const BcTopNavbar = withNoopInstall(TopNavbar)
export default BcTopNavbar

export type { BcTopNavbarInstance } from './src/instance'
