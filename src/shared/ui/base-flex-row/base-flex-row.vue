<template>
  <div class="base-flex-row">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.base-flex-row{
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
