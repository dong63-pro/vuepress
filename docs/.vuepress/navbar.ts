import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/' },
  {
    text: '笔记',
    items: [
      { text: 'vue', link: '/notes/vue/README.md' },
      { text: 'JavaScript', link: '/notes/demo/README.md' },
      { text: 'TypeScript', link: '/' }
    ]
  },
])
