<script setup>
const props = defineProps({ name: { type: String, default: 'Tom' } })
</script>

<template>
  <div class="hello">
    Hello {{ props.name }}
  </div>
</template>

<style lang="scss">
.hello {
  font-size: 18px;
  font-weight: 300;
  color: #18a058;
}
</style>
