<template>
  <div class="base-section">
    <div class="base-section__header" @click="ToggleOpen">
      <h2 class="base-section__title" v-if="title">{{ title }}</h2>
      <base-icon-button :icon="icon" />
    </div>
    <div class="base-section__separator" />
    <div class="base-section__main" v-if="isOpen">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { BaseButton } from "../base-button";
import { BaseIconButton } from "../base-icon-button";

const props = defineProps<{
  title?: string;
  initIsOpen?: boolean;
}>();

const isOpen = ref(props.initIsOpen ?? false);
const ToggleOpen = () => (isOpen.value = !isOpen.value);

const icon = computed(() => (isOpen.value ? "mdi mdi-minus" : "mdi mdi-plus"));
</script>

<style lang="less" scoped>
.base-section {
  margin: 20px 0;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;
  }

  &__title {
    font-size: 22px;
    font-weight: 500;
    margin: 0;

    user-select: none;
  }
  &__separator {
    height: 1px;
    background-color: #e9ebf7;
    margin: 6px 0 16px 0;
  }

  &__main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>
