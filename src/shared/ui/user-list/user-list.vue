<template>
  <div class="user-list">
    <base-user-info
      v-for="user in users"
      :key="user.id"
      :photo="user.photoRegular"
      :name="`${user.firstName} ${user.lastName}`"
    >
      <template #header>
        <span class="user-list__user-country" v-if="user.countryName">
          {{ user.countryName }}
        </span>
      </template>
      {{ user.bdate }}
    </base-user-info>
  </div>
</template>

<script lang="ts" setup>
import { UserModel } from "@/app/mappers/models";
import { BaseUserInfo } from "@/shared/ui/base-user-info";

const props = defineProps<{
  users: Array<UserModel>;
}>();
</script>

<style lang="less" scoped>
.user-list {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__user-country {
    font-size: 13px;
    color: #999;
    font-weight: 400;
    margin-left: 6px;
  }
}
</style>
