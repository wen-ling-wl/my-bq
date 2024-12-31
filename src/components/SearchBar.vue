<template>
  <div class="relative w-full max-w-2xl mx-auto px-4">
    <div class="bg-white/90 dark:bg-dark-card/90 backdrop-blur-md 
                rounded-2xl flex items-center px-4 py-3 mb-6 
                shadow-[0_4px_10px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.2)]
                border border-gray-200/50 dark:border-white/[0.05]
                transition-all duration-300 
                hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]
                group/search">
      <!-- 搜索引擎选择按钮 -->
      <button 
        @click="showEngines = !showEngines"
        class="relative flex items-center space-x-1.5 mr-3 p-1.5 -ml-1
               rounded-xl
               hover:bg-gray-100/80 dark:hover:bg-white/[0.06]
               text-gray-600 dark:text-gray-300
               transition duration-200
               group"
      >
        <component 
          :is="currentEngine.icon" 
          size="18" 
          class="transition-colors duration-200"
          :class="currentEngine.id === 'local' ? 'text-blue-500 group-hover:text-blue-600' : ''" 
        />
        <ChevronDown 
          size="14" 
          class="transition-transform duration-200 opacity-50 group-hover:opacity-80"
          :class="{ 'rotate-180': showEngines }" 
        />
      </button>

      <!-- 搜索输入框 -->
      <input
        type="text"
        v-model="searchText"
        :placeholder="currentEngine.placeholder || placeholder"
        @input="handleSearch"
        @keydown.enter="handleEnter"
        @keydown.esc="clearSearch"
        @keydown.down="navigateDropdown(1)"
        @keydown.up="navigateDropdown(-1)"
        class="flex-1 outline-none text-[15px] text-gray-700 dark:text-gray-200 bg-transparent 
               placeholder:text-gray-400/90 dark:placeholder:text-gray-500
               group-hover/search:placeholder:text-gray-500 dark:group-hover/search:placeholder:text-gray-400
               transition-colors duration-200"
      />

      <!-- 清除按钮 -->
      <button 
        v-if="searchText"
        @click="clearSearch"
        class="p-1.5 rounded-xl -mr-1
               hover:bg-gray-100/80 dark:hover:bg-white/[0.06]
               text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
               transition duration-200"
      >
        <X size="16" />
      </button>

      <!-- 搜索引擎下拉菜单 -->
      <div v-if="showEngines" 
           class="absolute left-4 top-[calc(100%+0.75rem)] w-56 py-2 
                  rounded-xl shadow-lg
                  bg-white/95 dark:bg-dark-card/95 backdrop-blur-md
                  border border-gray-200/50 dark:border-white/[0.05]
                  z-50
                  animate-slideDownAndFade">
        <button
          v-for="(engine, index) in searchEngines"
          :key="engine.id"
          @click="selectEngine(engine)"
          :class="[
            'w-full px-4 py-2.5 flex items-center space-x-3',
            'hover:bg-gray-100/80 dark:hover:bg-white/[0.06]',
            'text-gray-700 dark:text-gray-200',
            'text-sm transition duration-200',
            { 'bg-gray-50/80 dark:bg-white/[0.03]': selectedIndex === index }
          ]"
        >
          <component 
            :is="engine.icon" 
            size="16" 
            :class="[
              'transition-colors duration-200',
              engine.id === 'local' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'
            ]" 
          />
          <span>{{ engine.name }}</span>
          <div v-if="engine.id === currentEngine.id" class="ml-auto">
            <Check size="14" class="text-blue-500" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { 
  Search, ChevronDown, Check, X,
  Chrome, Github, Globe,
  Youtube, Twitter, Bookmark
} from 'lucide-vue-next'

const props = defineProps({
  placeholder: {
    type: String,
    default: '搜索工具...'
  }
})

const emit = defineEmits(['search'])
const searchText = ref('')
const showEngines = ref(false)
const selectedIndex = ref(-1)

// 搜索引擎列表
const searchEngines = [
  {
    id: 'local',
    name: '本地搜索',
    icon: Search,
    url: null,
    placeholder: '搜索工具...'
  },
  {
    id: 'google',
    name: 'Google',
    icon: Chrome,
    url: 'https://www.google.com/search?q=',
    placeholder: '搜索 Google...'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/search?q=',
    placeholder: '搜索 GitHub...'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    url: 'https://www.youtube.com/results?search_query=',
    placeholder: '搜索 YouTube...'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/search?q=',
    placeholder: '搜索 Twitter...'
  },
  {
    id: 'bookmark',
    name: '收藏夹',
    icon: Bookmark,
    url: null,
    placeholder: '搜索收藏...'
  }
]

const currentEngine = ref(searchEngines[0])

// 清除搜索
const clearSearch = () => {
  searchText.value = ''
  handleSearch()
}

// 键盘导航下拉菜单
const navigateDropdown = (direction) => {
  if (!showEngines.value) {
    showEngines.value = true
    selectedIndex.value = 0
    return
  }

  selectedIndex.value = Math.max(
    0, 
    Math.min(
      searchEngines.length - 1,
      selectedIndex.value + direction
    )
  )

  // 如果按下回车，选择当前高亮的选项
  if (direction === 0 && selectedIndex.value >= 0) {
    selectEngine(searchEngines[selectedIndex.value])
  }
}

// 选择搜索引擎
const selectEngine = (engine) => {
  currentEngine.value = engine
  showEngines.value = false
  selectedIndex.value = -1
  // 聚焦输入框
  const input = document.querySelector('input[type="text"]')
  if (input) {
    input.focus()
    // 如果有文本，立即执行搜索
    if (searchText.value) {
      handleEnter()
    }
  }
}

// 处理搜索
const handleSearch = () => {
  if (currentEngine.value.id === 'local' || currentEngine.value.id === 'bookmark') {
    emit('search', searchText.value)
  }
}

// 处理回车
const handleEnter = () => {
  if (showEngines.value && selectedIndex.value >= 0) {
    selectEngine(searchEngines[selectedIndex.value])
    return
  }

  if (currentEngine.value.url && searchText.value) {
    window.open(currentEngine.value.url + encodeURIComponent(searchText.value), '_blank')
  } else {
    handleSearch()
  }
}

// 点击外部关闭下拉菜单
const closeDropdown = (e) => {
  if (!e.target.closest('.relative')) {
    showEngines.value = false
    selectedIndex.value = -1
  }
}

// 添加防抖
let timeout
watch(searchText, (newVal) => {
  if (currentEngine.value.id === 'local' || currentEngine.value.id === 'bookmark') {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      emit('search', newVal)
    }, 300)
  }
})

// 监听点击事件
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style>
@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideDownAndFade {
  animation: slideDownAndFade 0.2s ease-out;
}
</style> 