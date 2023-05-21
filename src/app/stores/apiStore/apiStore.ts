import { VkApiService } from "@/app/api/vkApi";
import { APP_ID, SERVICE_KEY } from "@/app/config";
import { defineStore } from "pinia";
import { useUserStore } from "../userStore";
import { ref } from "vue";

export const useApiStore = defineStore("apiStore", () => {
  /** VK API */
  const api = ref<VkApiService>();

  /**
   * Устанавливаем состояние аудетификации
   * @param token Токен аудентификации
   */
  const SetAuthenticationState = (token: string) => {
    const userStore = useUserStore();
    // Устанавливаем состояние авторизации
    userStore.isAuth = true;
    // Устанавливаем токен авторизации
    userStore.tokenAuth = token;
  };

  /**
   * Создаем апи
   * @returns
   */
  const CreateAPI = () => {
    if (api.value) return;

    api.value = new VkApiService({
      AppId: APP_ID,
      ServiceKey: SERVICE_KEY,
      Scopes: ["friends"],
      callbackAuth: SetAuthenticationState,
    });
  };
  return {
    CreateAPI,
    api,
  };
});
