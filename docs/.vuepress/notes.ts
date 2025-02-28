import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: ['', 'foo'],
})

const vueNote = defineNoteConfig({
  dir: 'vue',
  link: '/vue',
  sidebar: ['', 'install'],
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [demoNote, vueNote],
})
