import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  /** Авторизован ли текущий клиент */
  const isAuth = ref(false);
  /** Токен авторизации текущего клиента (если он авторизован) */
  const tokenAuth = ref<string>();

  return {
    /** Авторизован ли текущий клиент */
    isAuth,
    /** Токен авторизации текущего клиента (если он авторизован) */
    tokenAuth,
  };
});
