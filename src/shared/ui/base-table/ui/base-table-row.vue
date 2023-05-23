<template>
  <div class="base-table-row">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.base-table-row {
  padding: 8px 10px;
  color: #69698b;
  border-bottom: 1px solid #dcdce7;
  height: 56px;

  display: flex;
  align-items: center;
}
</style>
