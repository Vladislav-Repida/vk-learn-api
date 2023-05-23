<template>
  <div class="base-table-column" :style="{ width: width }">
    <div class="base-table-column__header">
      <slot name="header" />
    </div>
    <div class="base-table-column__main">
      <base-table-row v-for="rowData in rowsData">
        <slot name="row" :data="rowData" />
      </base-table-row>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T">
import { BaseTableRow } from ".";
defineProps<{
  rowsData: Array<T>;
  width?: string;
}>();
</script>

<style lang="less" scoped>
.base-table-column {
  &::not(:last-child) {
    border-right: 1px solid #dcdce7;
  }

  &__header {
    background-color: #e9e9f7;
    color: #69698b;
    padding: 10px;
  }
}
</style>
