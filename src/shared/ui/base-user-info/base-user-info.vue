<template>
  <div class="base-user-info">
    <base-avatar :photo="photo" class="base-user-info__avatar" />
    <div class="base-user-info__content">
      <div class="base-user-info__header">
        <span class="base-user-info__name" v-if="name">{{ name }}</span>
        <slot name="header" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BaseAvatar } from "@/shared/ui/base-avatar";

const props = defineProps<{
  photo?: string;
  name?: string;
}>();
</script>

<style lang="less" scoped>
.base-user-info {
  display: flex;
  align-items: center;
  gap: 10px;

  &__avatar {
    flex-shrink: 0;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }
}
</style>
