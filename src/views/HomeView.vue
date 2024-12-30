<template>
  <div class="min-h-screen bg-[#f0f1f3] flex overflow-hidden">
    <!-- 左侧侧边栏 -->
    <Sidebar :menuItems="menuItems" />
    
    <!-- 主内容区域 - 添加左边距以避免被固定侧边栏覆盖 -->
    <main class="flex-1 p-6 overflow-hidden ml-16">
      <!-- 顶部搜索栏 -->
      <SearchBar />
      
      <!-- 网格布局的卡片区域 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" style="overflow-y: auto; max-height: calc(100vh - 200px);">
        <Card title="与 Tina 相识" date="2020年5月20日" days="1,657" />
        <Card title="WeTab AI" description="高效率写作助手" buttonText="Start »" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import SearchBar from '../components/SearchBar.vue'
import Card from '../components/Card.vue'

// 导入图标组件
import { Home, Palette, Code, ShoppingBag, Image as ImageIcon, Music, Film, Book, Coffee, Heart, Star, Zap, Bell, HelpCircle } from 'lucide-vue-next'

const menuItems = ref([
  { name: '主页', icon: Home },
  { name: '设计', icon: Palette },
  { name: '程序', icon: Code },
  { name: '购物', icon: ShoppingBag },
  { name: '图片', icon: ImageIcon },
  { name: '音乐', icon: Music },
  { name: '视频', icon: Film },
  { name: '阅读', icon: Book },
  { name: '休闲', icon: Coffee },
  { name: '收藏', icon: Heart },
  { name: '精选', icon: Star },
  { name: '快捷', icon: Zap },
  { name: '通知', icon: Bell },
  { name: '帮助', icon: HelpCircle }
])
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  font-family: 'Arial', sans-serif;
  overflow: hidden;
}

/* 隐藏滚动条但保持可滚动性 */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

::placeholder {
  color: #9ba3af;
}

.min-h-screen {
  min-height: 100vh;
  display: flex;
}
</style>
