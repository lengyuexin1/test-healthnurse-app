import { createSSRApp } from "vue"
// import './assets/scss/app.scss'
import App from "./App.vue"
// import "animate.css"
// import 'animate.css/animate.compat.css'

export function createApp() {
    const app = createSSRApp(App)
    return {
        app
    }
}
