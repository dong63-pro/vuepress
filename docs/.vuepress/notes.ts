import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: ['', '类型判断', 'ES6', 'canvas'],
})

const vueNote = defineNoteConfig({
  dir: 'vue',
  link: '/vue',
  sidebar: ['', 'nvm包管理工具', '全局钩子函数', '自定义指令'],
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [demoNote, vueNote],
})
