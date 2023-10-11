<script setup>
import { zhCN, dateZhCN } from 'naive-ui'

/**
 * 挂载之前
 */
onBeforeMount(() => {
  // 解决 tailwind 覆盖问题, 在挂载之前设置 meta
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
})

/**
 * 挂载之后
 */
onMounted(() => {})
</script>

<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    inline-theme-disabled
  >
    <NuxtPage />
  </NConfigProvider>
</template>

<style lang="scss"></style>
