<template>
  <div class="w-full h-full relative">
    <Editor
      v-if="mounted"
      :defaultValue="modelValue"
      :value="modelValue"
      :language="language"
      :theme="theme"
      :options="editorOptions"
      :height="height"
      @change="handleChange"
      @mount="handleEditorDidMount"
      beforeMount={handleEditorWillMount}
    />
    <!-- 加载状态 -->
    <div v-if="!mounted" class="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-dark-card">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Editor from '@monaco-editor/react'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'javascript'
  },
  theme: {
    type: String,
    default: 'vs'
  },
  options: {
    type: Object,
    default: () => ({})
  },
  height: {
    type: [String, Number],
    default: '100%'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])
const mounted = ref(false)
let editorInstance = null

const editorOptions = computed(() => ({
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  fontSize: 14,
  fontFamily: '"Fira Code", Consolas, "Courier New", monospace',
  tabSize: 2,
  renderWhitespace: 'selection',
  smoothScrolling: true,
  cursorBlinking: 'smooth',
  wordWrap: 'on',
  automaticLayout: true,
  ...props.options
}))

// 编辑器初始化前的配置
const handleEditorWillMount = (monaco) => {
  // 可以在这里配置 monaco 实例
}

// 处理编辑器内容变化
const handleChange = (value) => {
  emit('update:modelValue', value || '')
  emit('change', value || '')
}

// 编辑器加载完成
const handleEditorDidMount = (editor, monaco) => {
  editorInstance = editor
  mounted.value = true
  // 聚焦编辑器
  editor.focus()
}

onMounted(() => {
  mounted.value = true
})
</script> 