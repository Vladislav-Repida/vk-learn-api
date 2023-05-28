import { UserModel } from "@/app/mappers/models";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  /** Авторизован ли текущий клиент */
  const isAuth = ref(false);
  /** Токен авторизации текущего клиента (если он авторизован) */
  const tokenAuth = ref<string>();

  /** Текущий пользователь */
  const user = ref<UserModel>();

  /** Устанавливаем состояние авторизации */
  const SetIsAuth = (value: boolean) => (isAuth.value = value);
  /** Устанавливаем токен авторизации */
  const SetTokenAuth = (token: string) => (tokenAuth.value = token);
  /** Устанавливаем текущего пользователя */
  const SetUser = (_user: UserModel) => (user.value = _user);

  return {
    isAuth,
    tokenAuth,
    user,
    SetUser,
    SetIsAuth,
    SetTokenAuth,
  };
});
