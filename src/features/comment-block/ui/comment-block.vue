<template>
  <div class="comment-block">
    <base-user-info
      :name="userName"
      :photo="comment.owner.photoRegular"
      is-small
    >
      <span
        class="comment-block__date"
        >{{ comment.date.Format("DD.MM.YYYY HH:MM") }}</span
      >
    </base-user-info>
    <div class="comment-block__content">
      {{ comment.text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CommentModel } from '@/app/mappers/models';
import { BaseUserInfo } from '@/shared/ui/base-user-info';
import { computed } from 'vue';

import { SmallText } from '@/shared/ui/small-text';

const props = defineProps<{
  comment: CommentModel
}>();

const userName = computed(() => `${props.comment.owner.firstName} ${props.comment.owner.lastName}`)
</script>

<style lang="less" scoped>
.comment-block{
  &__date{
    font-size: 11px;
    color: #999;
  }
  &__content{
    margin-top: 4px;
    margin-left: 29px;
    font-size: 12px;
    font-weight: 400;
    color: #999;
  }
}
</style>
