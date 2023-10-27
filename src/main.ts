import './assets/main.scss'

import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'

// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/css-vars.scss'

// 国际化
import i18n from "./locales/i18n";

import VueKeycloakJs from '@dsb-norge/vue-keycloak-js'
import Keycloak from "keycloak-js";

const app = createApp(App)

app.use(i18n)

app.use(VueKeycloakJs, {
    init: {
        onLoad: 'check-sso'
    },
    config: {
        url: 'https://account.dracalon.com',
        realm: 'dracalon',
        clientId: 'account-index',
    },
    // config: {
    //     url: 'http://127.0.0.1:8012',
    //     clientId: 'account-index',
    //     realm: 'example'
    // },
    onReady (keycloak: Keycloak) {
        // app.mount('#app')
    }
})

app.mount('#app')

import './keycloak'
