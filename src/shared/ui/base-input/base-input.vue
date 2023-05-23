<template>
  <input
    class="base-input"
    :name="name"
    :type="type || 'text'"
    :placeholder="placeholder"
    v-model="model"
  />
</template>
<script lang="ts" setup>
import { computed } from "vue";

const emit = defineEmits(["update:modelValue"]);

type BaseInputType = "text" | "password" | "number";

const props = defineProps<{
  type?: BaseInputType;
  isBorder?: boolean;
  placeholder?: string;
  name?: string;

  modelValue: string;
}>();

const model = computed({
  get() {
    return props.modelValue;
  },

  set(value) {
    return emit("update:modelValue", value);
  },
});
</script>
<style lang="less" scoped>
.base-input {
  display: block;
  padding: 12px 16px;
  border: none;
  outline: none;

  width: 100%;
  border-radius: 5px;
  background-color: #f5f7ff;
  color: #252525;
  border: solid 1px #e6eaf5;

  font-size: 15px;

  &::placeholder {
    color: #bbbbbb;
  }
}
</style>
