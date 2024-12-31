import { createI18n } from 'vue-i18n'

const messages = {
  'zh-CN': {
    common: {
      settings: '系统设置',
      language: '语言设置',
      theme: '主题设置',
      light: '浅色',
      dark: '深色',
      system: '跟随系统',
      search: '搜索工具...',
      customBackground: '自定义背景图片',
      removeBackground: '移除背景'
    },
    categories: {
      common: '常用工具',
      ai: 'AI工具',
      dev: '开发工具',
      image: '图片工具',
      doc: '文档工具',
      video: '视频工具',
      music: '音乐工具',
      reading: '阅读工具',
      favorite: '收藏夹',
      settings: '设置'
    },
    tools: {
      noTools: '该分类下暂无工具'
    }
  },
  'en-US': {
    common: {
      settings: 'Settings',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      search: 'Search tools...',
      customBackground: 'Custom Background Image',
      removeBackground: 'Remove Background'
    },
    categories: {
      common: 'Common Tools',
      ai: 'AI Tools',
      dev: 'Development',
      image: 'Image Tools',
      doc: 'Documents',
      video: 'Video Tools',
      music: 'Music Tools',
      reading: 'Reading',
      favorite: 'Favorites',
      settings: 'Settings'
    },
    tools: {
      noTools: 'No tools found in this category'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages
}) 