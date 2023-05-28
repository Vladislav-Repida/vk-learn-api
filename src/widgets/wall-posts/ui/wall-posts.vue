<template>
  <div class="wall-posts">
    <post-block v-if="posts?.length" v-for="post in posts" :post="post">
      <template #footer-content>
        <div class="wall-posts__comments" v-if="post.comments?.length">
          <h4 class="wall-posts__comments-title">Комментарии:</h4>
          <div class="wall-posts__comments-content">
            <comment-block
              v-for="comment in post.comments"
              :key="comment.id"
              :comment="comment"
            />
          </div>
          <base-divider />
          <create-comment :post-id="post.id" />
        </div>
      </template>
    </post-block>
    <span class="wall-posts__empty-placeholder" v-else>Посты отсутствуют</span>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/app/stores/appStore';
import { storeToRefs } from 'pinia';
import { PostBlock } from '@/features/post-block';
import { CommentBlock } from '@/features/comment-block';

import { BaseDivider } from '@/shared/ui/base-divider';

import { CreateComment } from '@/features/create-comment';

const appStore = useAppStore();
const {posts} = storeToRefs(appStore);
</script>

<style lang="less" scoped>
.wall-posts{
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;

  &__empty-placeholder{
    display: block;
    font-size: 18px;
    color: #999;
    margin-top: 20px;
  }

  &__comments-title{
    display: block;
    margin-bottom: 10px;
  }

  &__comments-content{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
