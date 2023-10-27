import {createI18n} from 'vue-i18n';
import zhCN from './zh-CN';
import enUS from './en-US';


const i18n = createI18n({
    locale: localStorage.getItem('lang') || "zh-CN",
    legacy: false,
    messages: {
        'zh-CN': zhCN,
        'en-US': enUS,
    },
});

export default i18n;