<!--
 * @Description: 
 * @Author: hexueying
 * @Date: 2025-03-19 13:50:20
 * @LastEditors: hexueying
 * @LastEditTime: 2025-03-20 11:31:23
 * @FilePath: App.vue
-->
<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/detail/1">Detail 1</router-link> |
    <router-link to="/detail/2">Detail 2</router-link>
  </nav> -->

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive :include="includeComponents">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
  
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

// 动态缓存列表
const includeComponents = computed(() => store.state.cacheViews)
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>