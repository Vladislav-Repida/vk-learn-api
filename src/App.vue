<template>
  <base-page-container>
    <base-section title="Текущий пользователь" v-if="isAuth && user">
      <base-user-info
        :name="`${user.firstName} ${user.lastName}`"
        :photo="user.photoRegular"
      >
        {{ user.bdate }}
      </base-user-info>
    </base-section>
    <base-section v-if="!isAuth" title="Авторизация" :init-is-open="true">
      <auth-block />
    </base-section>
    <base-section v-if="isAuth" title="Друзья" :init-is-open="true">
      <base-button @click="GetFriends">Получить друзей</base-button>
      <friends-table class="friends-table" />
    </base-section>
    <base-section v-if="isAuth" title="Посты">
      <base-flex-row>
        <base-button @click="GetPosts">Получить посты</base-button>
        <base-button @click="OpenModalCreatePost">Создать пост</base-button>
        <modal-create-post
          @close-modal="CloseModalCreatePost"
          :visible="isOpenModalCreatePost"
        />
      </base-flex-row>
      <wall-posts />
    </base-section>
  </base-page-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "./app/stores/userStore";
import { useAppStore } from "./app/stores/appStore";

import { FriendsTable } from "@/widgets/friends-table";

import { AuthBlock } from "@/widgets/auth-block";
import { BaseSection } from "@/shared/ui/base-section";
import { BasePageContainer } from "@/shared/ui/base-page-container";

import { BaseButton } from "@/shared/ui/base-button";
import { BaseUserInfo } from "@/shared/ui/base-user-info";
import { WallPosts } from "@/widgets/wall-posts";

import {BaseFlexRow }from "@/shared/ui/base-flex-row";

import {ModalCreatePost} from "@/features/modal-create-post";
import { ref } from "vue";

const isOpenModalCreatePost = ref(false);
const OpenModalCreatePost = () => isOpenModalCreatePost.value = true;
const CloseModalCreatePost = () => isOpenModalCreatePost.value = false;

const userStore = useUserStore();
const { isAuth, user } = storeToRefs(userStore);

const appStore = useAppStore();
const { GetFriends, GetPosts } = appStore;
</script>

<style lang="less"></style>
