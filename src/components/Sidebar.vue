<template>
  <aside class="w-20 bg-dark-bg flex flex-col h-screen shadow-lg z-10 fixed top-0 left-0">
    <div class="p-4 flex justify-center">
      <div class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
        <User size="20" class="text-gray-300" />
      </div>
    </div>
    <div class="flex-1 overflow-y-auto hide-scrollbar">
      <div class="py-2 flex flex-col items-center space-y-2">
        <div v-for="(item, index) in menuItems" 
             :key="index"
             @click="handleClick(item.name)"
             class="w-full flex flex-col items-center cursor-pointer group px-2">
          <div class="w-full px-2 py-3 flex flex-col items-center hover:bg-dark-hover transition duration-200 rounded-lg"
               :class="{ 'bg-dark-hover': activeCategory === item.name }">
            <component :is="item.icon" 
                      size="22" 
                      :class="[
                        'group-hover:text-blue-400',
                        activeCategory === item.name ? 'text-blue-400' : 'text-gray-400'
                      ]" />
            <span class="text-xs mt-1.5 whitespace-nowrap text-center"
                  style="font-size: 11px;"
                  :class="[
                    'group-hover:text-blue-400',
                    activeCategory === item.name ? 'text-blue-400' : 'text-gray-400'
                  ]">
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { User } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  menuItems: Array,
  activeCategory: String
})

const emit = defineEmits(['category-change'])

const handleClick = (category) => {
  if (category === '设置') {
    router.push('/settings')
  } else {
    if (router.currentRoute.value.path === '/settings') {
      router.push('/')
    }
    emit('category-change', category)
  }
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style> 