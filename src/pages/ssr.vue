<script setup>

/**
 * 如果您的项目需要使用 ssr 请勿将接口请求放在任何页面的声明周期中,
 * 否则就会在前端发起请求, 就无法达到 ssr 的效果了.
 * 如果判断该请求是 ssr, 你看 network 有没有发起接口的请求接口, 如果发起请求了, 就不是 ssr, 反之则是
 */
const state = reactive({ title: '' })
const res = await ssrData()
state.en = res?.result?.content || 'Not Found'
state.title = res?.result?.note || 'Not Found'
</script>

<template>
  <div class="text-[36px] flex items-center justify-center h-[100vh] w[100vw]">
    <div>
      <div>{{ state.en }}</div>
      <div class="mt-3">
        {{ state.title }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
