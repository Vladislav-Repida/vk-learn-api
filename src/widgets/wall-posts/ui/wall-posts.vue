<template>
  <div class="wall-posts">
    <post-block v-if="posts?.length" v-for="post in posts" :post="post">
      <template #footer-content>
        <comment-block
          v-for="comment in post.comments"
          :key="comment.id"
          :comment="comment"
        />
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

const appStore = useAppStore();
const {posts} = storeToRefs(appStore);
</script>

<style lang="less" scoped>
.wall-posts{
  width: 100%;
  max-width: 500px;

  &__empty-placeholder{
    display: block;
    font-size: 18px;
    color: #999;
    margin-top: 20px;
  }
}
</style>
