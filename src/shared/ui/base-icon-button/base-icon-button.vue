<template>
  <button class="base-icon-button" :style="{width, height}">
    <span :class="icon" />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  icon: string;
  width?: string;
  height?: string;
}>();
</script>

<style lang="less" scoped>
.base-icon-button {
  background-color: transparent;
  border: none;
  outline: none;
  display: block;
  padding: 0;
  margin: 0;

  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.5;
  }
}
</style>
