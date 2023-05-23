<template>
  <div class="user-list">
    <div class="user-list__item" v-for="user in users">
      <base-user-info
        :key="user.id"
        :photo="user.photoRegular"
        :name="`${user.firstName} ${user.lastName}`"
      >
        <template #header>
          <span class="user-list__user-country" v-if="user.countryName">
            {{ user.countryName }}
          </span>
        </template>
        <div class="user-list__user-date">
          {{ user.bdate }}
        </div>
      </base-user-info>
    </div>
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
  max-width: 300px;

  &__item {
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(30, 31, 65, 0.15);
  }

  &__user-country {
    font-size: 13px;
    color: #999;
    font-weight: 400;
    margin-left: 6px;
  }

  &__user-date {
    font-size: 13px;
    color: #777;
    font-weight: 400;
  }
}
</style>
