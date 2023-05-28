import { VkApiService } from "@/app/api/vkApi";
import { APP_ID, SERVICE_KEY } from "@/app/config";
import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from "../userStore";
import { ref } from "vue";
import { CollectUrl } from "@/shared/utility";
import { SecureCheckTokenRequest } from "@/app/api/vkApi/services/secure/models";
import { mapUsersFromUsersGetMethod } from "@/app/mappers";
import { useAppStore } from "../appStore";

export const useApiStore = defineStore("apiStore", () => {
  /** VK API */
  const api = ref<VkApiService>();
  /** Доступы для VK api */
  const scopes = ["wall", "friends", "status"];

  /**
   * Создаем апи
   * @returns
   */
  const CreateAPI = () => {
    if (api.value) return;

    api.value = new VkApiService(SERVICE_KEY);
  };

  /** Открываем окно авторизации */
  const OpenAuthWindow = () => {
    /** URL авторизации (получения токена) */
    const url = CollectUrl("https://oauth.vk.com/authorize", {
      client_id: APP_ID,
      display: "page",
      redirect_uri: "https://oauth.vk.com/blank.html",
      scope: scopes.join(","),
      response_type: "token",
      v: "5.131",
    });
    /** Открываем URL */
    window.open(url);
  };

  /** Авторизовываемся с помощью токена */
  const Auth = async (token: string) => {
    // Проверяем токен на валидность
    const { isSuccess } = await api.value.SecureService.CheckToken(
      new SecureCheckTokenRequest({
        token,
      })
    );
    // Если токен валидный
    if (isSuccess) {
      // Инициализируем сервисы в которых необходим токен авторизации пользователя
      api.value.InitServicesWithToken(token);

      const userStore = useUserStore();
      // Устанавливаем состояние авторизации
      userStore.SetIsAuth(true);
      // Устанавливаем токен авторизации
      userStore.SetTokenAuth(token);

      // Получаем информацию о текущем пользователе
      const user = mapUsersFromUsersGetMethod(
        await api.value.UsersService.Get()
      )[0];
      // Устанавливаем текущего пользователя
      userStore.SetUser(user);
    }

    return isSuccess;
  };

  return {
    api,
    CreateAPI,
    OpenAuthWindow,
    Auth,
  };
});
