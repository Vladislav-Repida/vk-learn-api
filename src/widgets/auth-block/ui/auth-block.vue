<template>
  <div class="auth-block">
    <base-button @click="onClickOpenWindowAuth">
      Открыть окно авторизации
    </base-button>
    <base-input-button-template max-width="600px">
      <template #input>
        <base-input v-model="inputValue" placeholder="Ссылка с токеном" />
      </template>
      <template #button>
        <base-button @click="onClickAuth">Авторизоваться</base-button>
      </template>
    </base-input-button-template>
  </div>
</template>

<script lang="ts" setup>
import { useApiStore } from "@/app/stores/apiStore";
import { BaseButton } from "@/shared/ui/base-button";
import { BaseInput } from "@/shared/ui/base-input";

import { BaseInputButtonTemplate } from "@/shared/ui/base-input-button-template";
import { GetParamFromUrl } from "@/shared/utility/GetParamFromUrl";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const apiStore = useApiStore();
const { OpenAuthWindow, Auth } = apiStore;

const inputValue = ref("");

const onClickOpenWindowAuth = () => {
  OpenAuthWindow();
};

const onClickAuth = async () => {
  const token = GetParamFromUrl("access_token", inputValue.value);
  if (token?.trim()) {
    const isSuccess = await Auth(token);
    if (!isSuccess) alert("Токен не валидный, попробуйте еще раз");
    else {
      alert("Вы успешно авторизованы");
    }
  } else {
    alert("Токен не валидный, попробуйте еще раз");
  }
  inputValue.value = "";
};
</script>

<style lang="less" scoped>
.auth-block {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
