import { VkApiService } from "@/app/api/vkApi";
import { APP_ID, SERVICE_KEY } from "@/app/config";
import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from "../userStore";
import { ref } from "vue";
import { CollectUrl } from "@/shared/utility";
import { SecureCheckTokenRequest } from "@/app/api/vkApi/services/secure/models";
import { mapUserFromUsersGetMethod } from "@/app/mappers/mapUsers";

export const useApiStore = defineStore("apiStore", () => {
  /** VK API */
  const api = ref<VkApiService>();
  const scopes = ["wall", "friends"];

  /**
   * Создаем апи
   * @returns
   */
  const CreateAPI = () => {
    if (api.value) return;

    api.value = new VkApiService(SERVICE_KEY);
  };

  const OpenAuthWindow = () => {
    const url = CollectUrl("https://oauth.vk.com/authorize", {
      client_id: APP_ID,
      display: "page",
      redirect_uri: "https://oauth.vk.com/blank.html",
      scope: scopes.join(","),
      response_type: "token",
      v: "5.49",
      revoke: 1,
    });
    window.open(url);
  };

  const Auth = async (token: string) => {
    const { isSuccess } = await api.value.SecureService.CheckToken(
      new SecureCheckTokenRequest({
        token,
      })
    );
    if (isSuccess) {
      const userStore = useUserStore();
      api.value.InitServicesWithToken(token);
      userStore.SetIsAuth(true);
      userStore.SetTokenAuth(token);
      const user = mapUserFromUsersGetMethod(
        await api.value.UsersService.Get()
      );
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
