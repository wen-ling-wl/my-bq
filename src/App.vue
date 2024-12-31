<template>
  <div :class="{ 'dark': isDarkMode }">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from './composables/theme'

const { theme } = useTheme()

const isDarkMode = computed(() => {
  return theme.value === 'dark' || 
    (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
})
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  overflow: hidden;
}
</style>

