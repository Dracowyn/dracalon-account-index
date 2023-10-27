import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
// import importToCDN from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [
                ElementPlusResolver(),
                // Auto import icon components
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),],
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
                // Auto register icon components
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
            ],
        }),
        // 打包优化，使用CDN
        // importToCDN({
        //     modules: [
        //         {
        //             name: 'vue',
        //             var: 'Vue',
        //             path: `https://cdn.staticfile.org/vue/3.3.7/vue.global.prod.min.js`,
        //         },
        //         {
        //             name: 'element-plus',
        //             var: 'ElementPlus',
        //             path: `https://cdn.staticfile.org/element-plus/2.4.1/index.full.min.js`,
        //             css: 'https://cdn.staticfile.org/element-plus/2.4.1/index.min.css',
        //         },
        //         {
        //             name: 'vue-i18n',
        //             var: 'vue-i18n',
        //             path: 'https://cdn.staticfile.org/vue-i18n/9.6.0/vue-i18n.global.prod.min.js',
        //         }
        //     ]
        // })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
