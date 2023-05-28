<template>
  <div :class="['base-avatar', {'is-small': isSmall}]">
    <div class="base-avatar__image" :style="style" v-if="photo" />
  </div>
</template>

<script lang="ts" setup>
import { CSSProperties, computed } from "vue";

const props = defineProps<{
  /** Фото для аватарки */
  photo?: string;

  isSmall?: boolean;
}>();

const style = computed<CSSProperties>(() => {
  return {
    backgroundImage: `url(${props.photo})`,
  };
});
</script>

<style lang="less" scoped>
.base-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #555;

  display: flex;
  align-items: center;
  justify-content: center;

  &.is-small{
    width: 24px;
    height: 24px;
  }

  &__image {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 50%;
  }
}
</style>
