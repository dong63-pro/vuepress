---
title: 首页
createTime: 2025/02/28 14:47:07
permalink: /vue/
---
::: info 
Vue 3 使用了 JavaScript 的 Proxy 对象来实现响应式系统，相比 Vue 2 的 Object.defineProperty，Proxy 可以更好地处理数组和对象的深层嵌套，并且在性能上也有一定的提升。
Vue 3 的编译器进行了大量的优化，例如静态提升、事件监听器缓存等，这些优化可以减少虚拟 DOM 的创建和比较，从而提高渲染性能。Vue 3 对 TypeScript 提供了更好的支持，组合式 API 天然地与 TypeScript 配合良好，使得开发者可以更方便地编写类型安全的代码。同时，也有一些新的库和工具专门为 Vue 3 开发，例如 Pinia 作为状态管理库，在 Vue 3 中使用更加方便。
::: 
## 一、安装
### 1. vite 构建项目

用于通过 pnpm 包管理工具创建一个 Vite 项目

```js
pnpm create vite@latest vue-router@4

.../1955a74919a-bd4                      |   +1 +
.../1955a74919a-bd4                      | Progress: resolved 1, reused 0, downloaded 1, added 1, done
│
◆  Project name:
│  vite-project
◆  Select a framework:
│  ● Vanilla
│  ○ Vue
│  ○ React
│  ○ Preact
│  ○ Lit
│  ...
◆  Select a variant:
│  ● TypeScript
│  ○ JavaScript
│  ○ Official Vue Starter ↗
│  ○ Nuxt ↗
```

### 2. 安装组件库

- 安装 elementPlus 组件及图标`pnpm install element-plus @element-plus/icons-vue-S`
- `main.ts`文件中引入样式，注册组件库图标

```js
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

app.use(ElementPlus, { size: 'default' })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```

### 3. 自动引入组件

- 安装`npm install -D unplugin-vue-components unplugin-auto-import unplugin-icons`
  - `unplugin-vue-components`是自动导入 Vue 组件的插件
  - `unplugin-auto-import`自动导入 API，例如 Vue 3 中的 ref、reactive 等组合式 API
  - `unplugin-icons`该插件用于自动导入图标库中的图标
- 配置 vite.config.ts

```ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig {
  root: './',
  base,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.vue', '.js', '.ts', '.json', '.png', '.svg']
  },
  plugin: [
     vue(),
     AutoImport({
      include: [/\.[tj]sx?$/,/\.vue$/,/\.vue\?vue/,/\.md$/],
      // 自动导入 Vue 3 的 API，如 ref、reactive、onMounted 等
      imports: ['vue', 'vue-router', '@vueuse/core'],
      // 可以指定生成的类型声明文件的路径
      dts: './auto-imports.d.ts',
      resolvers: [
        ElementPlusResolver(
          {
            importStyle: "css",
          }
        ),
        // Auto import icon components
        IconsResolver({
          prefix: 'Icon',
        }),
        ],
        Components({
          resolvers: [
            ElementPlusResolver({importStyle: "css",}),
            // Auto register icon components
            IconsResolver({enabledCollections: ['ep'],})],
            dts: './components.d.ts',
        }),
        Icons({
          autoInstall: true,
        })
     })
    ],
    server: {
        port: 9996,
        host: true,
        hmr: true, //热更新
        // proxy: getProxyConfig()
        proxy: {
          '/api': {
            target: 'http://localhost:3000/',
            changeOrigin: true,
            secure: false,
            // rewrite:(path: string) => path.replace('/')
          }
        }
      },
}
```

### 4. 安装样式

- 安装 less `pnpm install less less-loader `
- 安装`tailwindcss npm install -D tailwindcss postcss autoprefixer`
- 初始化`npx tailwindcss init`
- 配置 `tailwind.config.js postcss.config.js`

```ts
// 1.postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// 2. tailwindcss.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: ['ProseMirror'],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Inter', ...defaultTheme.fontFamily.sans],
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}

```
