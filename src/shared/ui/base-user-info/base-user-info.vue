<template>
  <div :class="['base-user-info', {'is-small': isSmall}]">
    <base-avatar
      :photo="photo"
      class="base-user-info__avatar"
      :is-small="isSmall"
    />
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

  isSmall?: boolean;
}>();
</script>

<style lang="less" scoped>
.base-user-info {
  display: flex;
  align-items: center;
  gap: 10px;

  &.is-small{
    font-size: 12px;
    gap: 5px;
  }

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
