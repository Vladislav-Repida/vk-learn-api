import { APP_ID } from "@/app/config";
import { UserModel } from "@/app/mappers/models";
import { CollectUrl } from "@/shared/utility";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  /** Авторизован ли текущий клиент */
  const isAuth = ref(false);
  /** Токен авторизации текущего клиента (если он авторизован) */
  const tokenAuth = ref<string>();

  const user = ref<UserModel>();

  const SetIsAuth = (value: boolean) => (isAuth.value = value);

  const SetTokenAuth = (token: string) => (tokenAuth.value = token);

  const SetUser = (_user: UserModel) => (user.value = _user);

  return {
    /** Авторизован ли текущий клиент */
    isAuth,
    /** Токен авторизации текущего клиента (если он авторизован) */
    tokenAuth,
    user,
    SetUser,
    SetIsAuth,
    SetTokenAuth,
  };
});
