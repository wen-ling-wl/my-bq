<template>
  <aside class="w-16 bg-gray-800 flex flex-col h-screen shadow-lg z-10 fixed top-0 left-0">
    <div class="p-4 flex justify-center">
      <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        <User size="20" class="text-gray-600" />
      </div>
    </div>
    <div class="flex-1 overflow-y-auto hide-scrollbar">
      <div class="py-2 flex flex-col items-center space-y-6">
        <div v-for="(item, index) in menuItems" 
             :key="index"
             class="w-full flex flex-col items-center cursor-pointer group">
          <div class="w-full px-4 py-2 flex flex-col items-center hover:bg-gray-700 transition duration-200">
            <component :is="item.icon" 
                      size="24" 
                      class="text-white group-hover:text-blue-400" />
            <span class="text-xs mt-1 text-white group-hover:text-blue-400">
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 flex justify-center">
      <Settings size="24" class="text-white cursor-pointer hover:text-blue-400" />
    </div>
  </aside>
</template>

<script setup>
defineProps(['menuItems'])
</script>

<style>
/* 可以根据需要添加样式 */
</style> 