<template>
  <div class="post-block">
    <div class="post-block__header">
      <base-user-info
        :photo="post.owner.photoRegular"
        :name="`${post.owner.firstName} ${post.owner.lastName}`"
      >
        <small-text>{{ post.date.Format("DD.MM.YYYY HH:MM") }}</small-text>
      </base-user-info>
    </div>
    <div class="post-block__main">
      {{ post.text }}
    </div>
    <div class="post-block__footer">
      <div class="post-block__like" @click="ToggleLike">
        <base-icon-button
          class="post-block__like-icon"
          :icon="likeIcon"
          width="20px"
          height="20px"
        />
        <span class="post-block__like-count">{{ post.countLikes }}</span>
      </div>
      <base-divider />
      <slot name="footer-content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PostModel } from '@/app/mappers/models';
import { BaseUserInfo } from '@/shared/ui/base-user-info';
import { BaseIconButton } from '@/shared/ui/base-icon-button';
import { computed } from 'vue';
import { useAppStore } from '@/app/stores/appStore';

import { SmallText } from '@/shared/ui/small-text';
import {BaseDivider} from "@/shared/ui/base-divider"

const props = defineProps<{
  post: PostModel;
}>();

const appStore = useAppStore();
const {AddLike, DeleteLike} = appStore;

const likeIcon = computed(() => props.post.isLiked ? "mdi mdi-heart" : "mdi mdi-heart-outline");

const ToggleLike = () => {
  if(props.post.isLiked) DeleteLike(props.post.id);
  else AddLike(props.post.id);
}
</script>

<style lang="less" scoped>
.post-block{
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.239);
  border-radius: 10px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;

  &__like{
    display: flex;
    align-items: center;
    gap: 2px;
    color: #ff4747;

    cursor: pointer;
  }

  &__like-icon{
    font-size: 18px;
    color: #ff4747;
  }

  &__like-count{
    font-size: 13px;
  }
}
</style>
