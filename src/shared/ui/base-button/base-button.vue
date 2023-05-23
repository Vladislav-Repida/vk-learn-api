<template>
  <button class="base-button">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.base-button {
  padding: 12px 22px;
  background-color: #4769ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}
</style>
