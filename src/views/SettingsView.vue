<template>
  <div class="min-h-screen bg-[#f0f1f3] dark:bg-dark-bg flex overflow-hidden">
    <Sidebar :menuItems="localizedMenuItems" :activeCategory="$t('categories.settings')" />
    
    <main class="flex-1 p-6 overflow-hidden ml-20">
      <h2 class="text-xl font-bold text-gray-700 dark:text-dark-text mb-6">{{ $t('common.settings') }}</h2>
      
      <div class="bg-white dark:bg-dark-card rounded-lg p-6 max-w-2xl">
        <!-- 语言设置 -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-dark-text mb-4">{{ $t('common.language') }}</h3>
          <div class="flex items-center space-x-4">
            <button 
              v-for="lang in languages" 
              :key="lang.code"
              @click="changeLanguage(lang.code)"
              :class="[
                'px-4 py-2 rounded-lg transition-colors duration-200',
                currentLang === lang.code 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-dark-hover text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-hover'
              ]"
            >
              {{ lang.name }}
            </button>
          </div>
        </div>

        <!-- 主题设置 -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-dark-text mb-4">{{ $t('common.theme') }}</h3>
          <div class="flex items-center space-x-4">
            <button 
              v-for="theme in themes" 
              :key="theme.name"
              @click="changeTheme(theme.value)"
              :class="[
                'px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2',
                currentTheme === theme.value 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-dark-hover text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-hover'
              ]"
            >
              <component :is="theme.icon" size="16" />
              <span>{{ $t(`common.${theme.value}`) }}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import { 
  Sun, Moon, Monitor, Home, Brain, Code, 
  Image as ImageIcon, File, Film, Music, 
  Book, Heart, Settings 
} from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/theme'

const { locale, t } = useI18n()
const { theme, setTheme } = useTheme()

const currentLang = ref(locale.value)
const currentTheme = ref(theme.value)

// 本地化菜单项
const localizedMenuItems = computed(() => [
  { name: t('categories.common'), icon: Home },
  { name: t('categories.ai'), icon: Brain },
  { name: t('categories.dev'), icon: Code },
  { name: t('categories.image'), icon: ImageIcon },
  { name: t('categories.doc'), icon: File },
  { name: t('categories.video'), icon: Film },
  { name: t('categories.music'), icon: Music },
  { name: t('categories.reading'), icon: Book },
  { name: t('categories.favorite'), icon: Heart },
  { name: t('categories.settings'), icon: Settings }
])

const languages = [
  { name: '简体中文', code: 'zh-CN' },
  { name: 'English', code: 'en-US' }
]

const themes = [
  { name: '浅色', value: 'light', icon: Sun },
  { name: '深色', value: 'dark', icon: Moon },
  { name: '跟随系统', value: 'system', icon: Monitor }
]

const changeLanguage = (lang) => {
  currentLang.value = lang
  locale.value = lang
  localStorage.setItem('language', lang)
}

const changeTheme = (newTheme) => {
  currentTheme.value = newTheme
  setTheme(newTheme)
}
</script> 

<style scoped>
.background-upload {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.file-input {
  max-width: 300px;
}

.remove-bg-btn {
  padding: 0.5rem 1rem;
  background-color: var(--color-danger);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
</style> 