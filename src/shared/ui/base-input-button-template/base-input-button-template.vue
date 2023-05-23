<template>
  <div class="base-input-button-template" :style="{ maxWidth: maxWidth }">
    <div class="base-input-button-template__input">
      <slot name="input" />
    </div>
    <div class="base-input-button-template__button">
      <slot name="button" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  maxWidth: string;
}>();
</script>

<style lang="less" scoped>
.base-input-button-template {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
