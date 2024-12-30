<template>
  <div class="bg-[#e8f0f8] rounded-2xl p-4 flex flex-col justify-between aspect-square shadow-md">
    <div>
      <h3 class="text-lg font-semibold text-[#42536d]">{{ title }}</h3>
      <p class="text-4xl font-bold text-[#42536d] mt-2">{{ days }}<span class="text-base font-normal ml-1">天</span></p>
    </div>
    <div class="flex justify-between items-end">
      <span class="text-sm text-gray-500">{{ date }}</span>
      <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center">
        <Clock class="text-[#42536d]" size="32" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['title', 'date', 'days', 'description', 'buttonText'])
</script>

<style>
/* 可以根据需要添加样式 */
</style> 