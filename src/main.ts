import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/vars.scss'

const app = createApp(App)

// 国际化
import i18n from "./locales/i18n";
app.use(i18n)

import VueKeycloakJs from '@dsb-norge/vue-keycloak-js'
// import Keycloak from "keycloak-js";
// @ts-ignore
const VITE_KEYCLOAK_SERVER = import.meta.env.VITE_KEYCLOAK_SERVER
// @ts-ignore
const VITE_KEYCLOAK_REALM = import.meta.env.VITE_KEYCLOAK_REALM
// @ts-ignore
const VITE_KEYCLOAK_CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID
app.use(VueKeycloakJs, {
    init: {
        onLoad: 'check-sso'
    },
    config: {
        url: VITE_KEYCLOAK_SERVER,
        realm: VITE_KEYCLOAK_REALM,
        clientId: VITE_KEYCLOAK_CLIENT_ID,
    },
})

app.mount('#app')
