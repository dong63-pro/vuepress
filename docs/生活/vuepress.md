---
title: vuepress
createTime: 2025/02/28 19:16:26
permalink: /article/1wezd0jd/
---

### 安装 
简单来讲，vuepress博客搭建过程，最简单的还是直接下载vuepress的主题，
按照步骤安装就可以直接开始写markdown了。其实还有其他的主题选择，
    默认主题目前还是需要自己配置，但是theme-plume这个主题更方便快捷一些，
    不需要手动配置侧边栏链接和导航栏链接等等，也可以按照自己的需求增加
    或者减少导航，剩下的就是配置笔记中的路由和发表博客内容了。现在我还没有想好要写一些什么...
::: important 
主题官网： [link](https://theme-plume.vuejs.press/) 
```js
pnpm create vuepress-theme-plume@latest
```
:::

### 项目目录结构
::: file-tree
- docs
  - .vuepress
    - public/
    - config.ts
    - navbar.ts
    - notes.ts
    - plume.config.ts
    - client.ts
  - notes # 知识笔记
    - demo
      - foo.md
      - bar.md
  - preview # 博客分类
    - markdown.md     
  - page1.md
  - README.md
- package.json
- pnpm-lock.yaml
- .gitignore
- README.md
- …
:::