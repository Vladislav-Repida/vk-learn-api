<template>
  <base-modal
    :active="!!visible"
    title="Добавить пост"
    @close="emit('close-modal')"
  >
    <base-input placeholder="Введите текс поста" v-model="postText" />
    <template #buttons>
      <base-button @click="onClickCreatePost">Создать пост</base-button>
    </template>
  </base-modal>
</template>

<script lang="ts" setup>
import {BaseModal} from "@/shared/ui/base-modal";
import {BaseInput} from "@/shared/ui/base-input";
import { BaseButton } from "@/shared/ui/base-button";
import { ref } from "vue";
import { useAppStore } from "@/app/stores/appStore";

const emit = defineEmits<{
  (eventName: "close-modal"): void;
}>();

const props = defineProps<{
  visible?: boolean;
}>();

const appStore = useAppStore();
const {Post} = appStore;

const postText = ref("");

const onClickCreatePost = () => {
  if(postText.value.trim()){
    Post(postText.value).then((postId) => {
      alert(`Пост успешно создан. ID поста: ${postId}`);
      postText.value = "";
      emit("close-modal");
    });
  }
}
</script>

<style lang="less" scoped></style>
