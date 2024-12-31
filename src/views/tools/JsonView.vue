<template>
  <div class="min-h-screen bg-[#f0f1f3] dark:bg-dark-bg p-6 pl-26">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-dark-text mb-6">JSON 工具</h1>
      
      <!-- 工具栏 -->
      <div class="bg-white dark:bg-dark-card rounded-xl p-4 mb-4 flex items-center space-x-4">
        <button
          v-for="action in actions"
          :key="action.name"
          @click="action.handler"
          class="px-4 py-2 rounded-lg flex items-center space-x-2
                 hover:bg-gray-100 dark:hover:bg-white/10
                 text-gray-700 dark:text-gray-200
                 transition duration-200"
        >
          <component :is="action.icon" size="16" />
          <span>{{ action.name }}</span>
        </button>
      </div>

      <!-- 编辑器容器 -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm text-gray-500 dark:text-gray-400">输入 JSON</span>
            <div class="flex items-center space-x-2">
              <button
                v-for="sample in samples"
                :key="sample.name"
                @click="loadSample(sample.content)"
                class="px-3 py-1 rounded-lg text-xs
                       hover:bg-gray-100 dark:hover:bg-white/10
                       text-gray-600 dark:text-gray-300
                       transition duration-200"
              >
                {{ sample.name }}
              </button>
            </div>
          </div>
          <div class="h-[600px] relative">
            <MonacoEditor
              v-model="inputJson"
              language="json"
              :theme="isDark ? 'vs-dark' : 'vs'"
              :height="'600px'"
              :options="{
                formatOnPaste: true,
                formatOnType: true,
                renderWhitespace: 'selection',
                automaticLayout: true,
                minimap: { enabled: false }
              }"
              @change="handleInput"
            />
          </div>
        </div>

        <div class="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm text-gray-500 dark:text-gray-400">格式化结果</span>
            <button
              @click="copyOutput"
              class="px-3 py-1 rounded-lg text-xs
                     hover:bg-gray-100 dark:hover:bg-white/10
                     text-gray-600 dark:text-gray-300
                     transition duration-200
                     flex items-center space-x-1"
            >
              <Copy size="12" />
              <span>复制</span>
            </button>
          </div>
          <div class="h-[600px] relative">
            <MonacoEditor
              v-model="outputJson"
              language="json"
              :theme="isDark ? 'vs-dark' : 'vs'"
              :options="{ readOnly: true }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '../../composables/theme'
import MonacoEditor from '@/components/MonacoEditor.vue'
import { 
  Wand2, Copy, Download, Upload,
  Minimize2, Maximize2, RefreshCw
} from 'lucide-vue-next'

const { theme } = useTheme()
const isDark = computed(() => theme.value === 'dark' || 
  (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches))

const inputJson = ref('')
const outputJson = ref('')

// 工具栏操作
const actions = [
  {
    name: '格式化',
    icon: Wand2,
    handler: () => formatJson()
  },
  {
    name: '压缩',
    icon: Minimize2,
    handler: () => compressJson()
  },
  {
    name: '转义',
    icon: RefreshCw,
    handler: () => escapeJson()
  },
  {
    name: '导出',
    icon: Download,
    handler: () => exportJson()
  }
]

// 示例数据
const samples = [
  {
    name: '简单对象',
    content: `{
  "name": "John Doe",
  "age": 30,
  "city": "New York"
}`
  },
  {
    name: '数组对象',
    content: `[
  {
    "id": 1,
    "title": "Post 1",
    "tags": ["news", "tech"]
  },
  {
    "id": 2,
    "title": "Post 2",
    "tags": ["lifestyle"]
  }
]`
  }
]

// 加载示例
const loadSample = (content) => {
  inputJson.value = content
  formatJson()
}

// 格式化 JSON
const formatJson = () => {
  try {
    if (!inputJson.value.trim()) {
      outputJson.value = ''
      return
    }
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed, null, 2)
  } catch (error) {
    outputJson.value = `Error: ${error.message}`
  }
}

// 压缩 JSON
const compressJson = () => {
  try {
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed)
  } catch (error) {
    outputJson.value = `Error: ${error.message}`
  }
}

// 转义 JSON
const escapeJson = () => {
  try {
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(JSON.stringify(parsed))
  } catch (error) {
    outputJson.value = `Error: ${error.message}`
  }
}

// 导出 JSON
const exportJson = () => {
  const blob = new Blob([outputJson.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'formatted.json'
  a.click()
  URL.revokeObjectURL(url)
}

// 复制输出
const copyOutput = async () => {
  try {
    await navigator.clipboard.writeText(outputJson.value)
    // TODO: 显示复制成功提示
  } catch (error) {
    // TODO: 显示复制失败提示
  }
}

// 监听输入变化
const handleInput = (value) => {
  inputJson.value = value // 确保更新输入值
  if (!value) {
    outputJson.value = ''
    return
  }
  formatJson()
}
</script> 