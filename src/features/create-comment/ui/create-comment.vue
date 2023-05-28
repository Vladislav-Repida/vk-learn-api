<template>
  <div class="create-comment">
    <base-input-button-template max-width="100%">
      <template #input>
        <base-input
          placeholder="Написать комментарий..."
          v-model="commentMessage"
        />
      </template>
      <template #button>
        <base-button @click="onClickSend">
          <span class="mdi mdi-send"></span>
        </base-button>
      </template>
    </base-input-button-template>
  </div>
</template>

<script lang="ts" setup>
import { BaseInput } from '@/shared/ui/base-input';
import { BaseButton } from '@/shared/ui/base-button';
import { BaseInputButtonTemplate } from '@/shared/ui/base-input-button-template';
import { ref } from 'vue';
import { useAppStore } from '@/app/stores/appStore';

const props = defineProps<{
  postId: number;
}>();

const appStore = useAppStore();
const {CreateComment} = appStore;

const commentMessage = ref("");

const onClickSend = () => {
  if(commentMessage.value.trim()){
    CreateComment(props.postId, commentMessage.value).then((commentId) => {
      if(commentId) alert("Комментарий успешно создан")
    });
  }
}
</script>

<style lang="less" scoped></style>
