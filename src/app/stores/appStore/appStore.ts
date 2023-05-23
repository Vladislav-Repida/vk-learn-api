import { UserModel } from "@/app/mappers/models";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiStore } from "../apiStore";
import { mapUsersFromGetFriendsMethod } from "@/app/mappers";

export const useAppStore = defineStore("appStore", () => {
  const friends = ref<Array<UserModel>>();

  const GetFriends = async () => {
    const api = useApiStore().api;

    /**
     * "bdate",
        "can_post",
        "can_see_all_posts",
        "can_write_private_message",
        "city",
        "contacts",
        "country",
        "domain",
        "education",
        "has_mobile",
        "last_seen",
        "nickname",
        "online",
        "photo_100",
        "photo_200_orig",
        "photo_50",
        "relation",
        "sex",
        "status",
        "timezone",
        "universities",
     */
    const friendApi = await api.FriendsService.GetCurrenUserFriends({
      fields: [
        "nickname",
        "photo_200_orig",
        "photo_50",
        "photo_100",
        "country",
        "bdate",
        "status",
      ],
    });
    friends.value = mapUsersFromGetFriendsMethod(friendApi);
  };
  return {
    GetFriends,
    friends,
  };
});
