<template>
  <div class="bg-white dark:bg-dark-card rounded-2xl p-4 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300">
    <div>
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ category }}</span>
        <component :is="icon" class="text-blue-500" size="20" />
      </div>
      <h3 class="text-lg font-semibold text-gray-800 dark:text-dark-text">{{ title }}</h3>
      <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-2">{{ description }}</p>
    </div>
    <div class="mt-4">
      <button 
        @click="handleClick"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  title: String,
  description: String,
  buttonText: String,
  icon: {
    type: String,
    default: 'Box'
  },
  category: String,
  link: String
})

const handleClick = () => {
  if (props.link) {
    if (props.link.startsWith('http')) {
      window.open(props.link, '_blank')
    } else {
      router.push(props.link)
    }
  }
}
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style> 