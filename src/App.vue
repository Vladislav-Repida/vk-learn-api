<template>
  {{ isAuth }}
  <br />
  {{ tokenAuth }}
  <br />
  <button @click="onAuth" v-if="!isAuth">Авторизоваться</button>
  <div v-if="isAuth">
    <button @click="GetFriends">Получить друзей</button>
    <user-list v-if="friends" :users="friends" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "./app/stores/userStore";
import { useApiStore } from "./app/stores/apiStore";
import { useAppStore } from "./app/stores/appStore";
import { onMounted } from "vue";

import { BaseAvatar } from "@/shared/ui/base-avatar";
import { BaseUserInfo } from "@/shared/ui/base-user-info";

import { UserList } from "./shared/ui/user-list";

const userStore = useUserStore();
const { isAuth, tokenAuth } = storeToRefs(userStore);

const appStore = useAppStore();

const { GetFriends } = appStore;
const { friends } = storeToRefs(appStore);

const onAuth = () => {
  const api = useApiStore().api;
  // console.log(api);
  api.AuthService.Auth();
};
onMounted(() => {
  onAuth();
});
</script>

<style lang="less"></style>
