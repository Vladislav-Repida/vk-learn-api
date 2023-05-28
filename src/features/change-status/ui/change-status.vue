<template>
  <div class="change-status">
    <base-button @click="OpenModal">Сменить статус</base-button>
    <base-modal
      :active="isVisibleModal"
      title="Изменить статус текущего пользователя"
      @close="CloseModal"
    >
      <span v-if="user.status"><b>Текущий статус</b>: {{ user.status }}</span>
      <base-divider v-if="user.status" />
      <base-input placeholder="Новый статус ..." v-model="newStatus" />
      <template #buttons>
        <base-button @click="ChangeStatus">Установить статус</base-button>
        <base-button @click="CloseModal">Отмена</base-button>
      </template>
    </base-modal>
  </div>
</template>

<script lang="ts" setup>
import { BaseButton } from '@/shared/ui/base-button';
import {BaseModal} from "@/shared/ui/base-modal";
import {BaseInput} from "@/shared/ui/base-input";
import { useAppStore } from '@/app/stores/appStore';
import { useUserStore } from '@/app/stores/userStore';
import { BaseDivider } from '@/shared/ui/base-divider';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const appStore = useAppStore();
const {SetStatus} = appStore;

const userStore = useUserStore();
const {user} = storeToRefs(userStore);

const newStatus = ref("")

const isVisibleModal = ref(false);
const OpenModal = () => isVisibleModal.value = true;
const CloseModal = () => isVisibleModal.value = false;

const ChangeStatus = () => {
  if(newStatus.value.trim()){
    SetStatus(newStatus.value).then((isSuccsess) => {
      if(isSuccsess) alert("Статус успешно изменен");
    });
    newStatus.value = "";
  }

}
</script>

<style lang="less" scoped></style>
