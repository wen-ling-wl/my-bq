<template>
  <div class="min-h-screen bg-[#f0f1f3] dark:bg-dark-bg flex overflow-hidden">
    <Sidebar :menuItems="localizedMenuItems" @category-change="changeCategory" :activeCategory="currentCategory" />
    
    <main class="flex-1 p-6 overflow-hidden ml-20">
      <SearchBar :placeholder="$t('common.search')" @search="handleSearch" />
      
      <h2 class="text-xl font-bold text-gray-700 dark:text-dark-text mb-4">
        {{ currentCategory }}
      </h2>
      
      <div v-if="!filteredTools.length" class="text-gray-500 dark:text-dark-text-secondary">
        {{ $t('tools.noTools') }}
      </div>
      
      <div class="overflow-y-auto hide-scrollbar" style="height: calc(100vh - 140px);">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <template v-for="tool in filteredTools" :key="tool.title">
            <Card 
              :title="tool.title"
              :description="tool.description"
              :buttonText="tool.buttonText"
              :icon="tool.icon"
              :category="tool.category"
              :link="tool.link"
            />
          </template>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Sidebar from '../components/Sidebar.vue'
import SearchBar from '../components/SearchBar.vue'
import Card from '../components/Card.vue'
import { useRouter } from 'vue-router'
import { 
  Home, Brain, Code, 
  Image as ImageIcon, Music, Film, Book, 
  Heart, Settings, MessageSquare, FileCode, FileImage,
  File, Edit, Terminal
} from 'lucide-vue-next'

const { t } = useI18n()
const router = useRouter()

// 当前选中的分类
const currentCategory = ref(t('categories.common'))
// 搜索关键词
const searchQuery = ref('')

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

// 所有工具数据
const tools = ref([
  // AI工具类
  {
    category: t('categories.ai'),
    title: 'ChatGPT',
    description: 'OpenAI开发的AI对话助手',
    buttonText: 'Chat »',
    icon: MessageSquare,
    link: 'https://chat.openai.com'
  },
  {
    category: t('categories.ai'),
    title: 'Claude',
    description: 'Anthropic开发的AI助手',
    buttonText: 'Chat »',
    icon: MessageSquare,
    link: 'https://claude.ai'
  },

  // 开发工具类
  {
    category: t('categories.dev'),
    title: 'JSON格式化',
    description: '在线JSON格式化工具',
    buttonText: '格式化 »',
    icon: FileCode,
    link: '/tools/json'
  },
  {
    category: t('categories.dev'),
    title: '代码转换器',
    description: '各种语言代码转换',
    buttonText: '转换 »',
    icon: Code,
    link: '/tools/code-convert'
  },
  {
    category: t('categories.dev'),
    title: '正则测试',
    description: '正则表达式测试工具',
    buttonText: '测试 »',
    icon: Terminal,
    link: '/tools/regex'
  },

  // 图片工具类
  {
    category: t('categories.image'),
    title: '图片压缩',
    description: '在线图片压缩工具',
    buttonText: '压缩 »',
    icon: ImageIcon,
    link: '/tools/image-compress'
  },
  {
    category: t('categories.image'),
    title: '图片格式转换',
    description: '支持多种格式转换',
    buttonText: '转换 »',
    icon: FileImage,
    link: '/tools/image-convert'
  },
  {
    category: t('categories.image'),
    title: '图片编辑器',
    description: '在线图片编辑工具',
    buttonText: '编辑 »',
    icon: Edit,
    link: '/tools/image-editor'
  }
])

// 根据分类和搜索过滤工具
const filteredTools = computed(() => {
  let filtered = tools.value
  
  // 如果不是"常用工具"，则按分类筛选
  if (currentCategory.value !== t('categories.common')) {
    filtered = filtered.filter(tool => tool.category === currentCategory.value)
  }
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(tool => 
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    )
  }
  
  return filtered
})

// 切换分类
const changeCategory = (category) => {
  currentCategory.value = category
}

// 处理搜索
const handleSearch = (query) => {
  searchQuery.value = query
}
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
