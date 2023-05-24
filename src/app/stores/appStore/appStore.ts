import { PostModel, UserModel } from "@/app/mappers/models";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiStore } from "../apiStore";
import {
  mapComments,
  mapPosts,
  mapUsersFromGetFriendsMethod,
  mapUsersFromUsersGetMethod,
} from "@/app/mappers";
import {
  WallAddLikeRequest,
  WallDeleteLikeRequest,
  WallGetCommentsRequset,
  WallGetRequest,
  WallPostRequest,
} from "@/app/api/vkApi/services/wall/models";
import { UsersGetRequest } from "@/app/api/vkApi/services/users/models";
import { userInfo } from "os";

export const useAppStore = defineStore("appStore", () => {
  const friends = ref<Array<UserModel>>();
  const posts = ref<Array<PostModel>>();

  const GetFriends = async () => {
    const api = useApiStore().api;
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

  /** Получаем посты со стены текущего пользователя */
  const GetPosts = async () => {
    const api = useApiStore().api;
    const postsApi = await api.WallService.Get(new WallGetRequest());
    const _posts = await mapPosts(postsApi);
    window.console.log(_posts);
    posts.value = _posts;
    return _posts;
  };

  /**
   * Получаем пользователя по идентификатору
   * @param userId Идентификатор пользователя
   */
  const GetUser = async (userId: number) => {
    const api = useApiStore().api;
    const [user] = mapUsersFromUsersGetMethod(
      await api.UsersService.Get(
        new UsersGetRequest({
          user_ids: [userId],
        })
      )
    );

    return user;
  };

  const AddLike = async (postId: number) => {
    const api = useApiStore().api;
    const { likes } = await api.WallService.AddLike(
      new WallAddLikeRequest({
        post_id: postId,
      })
    );

    if (likes !== undefined) {
      GetPosts();
    }

    return likes;
  };

  const DeleteLike = async (postId: number) => {
    const api = useApiStore().api;
    const { likes } = await api.WallService.DeleteLike(
      new WallDeleteLikeRequest({
        post_id: postId,
      })
    );

    if (likes !== undefined) {
      GetPosts();
    }
    return likes;
  };

  const Post = async (message: string) => {
    const api = useApiStore().api;
    const { post_id } = await api.WallService.Post(
      new WallPostRequest({
        friends_only: 1,
        mute_notifications: 1,
        message,
      })
    );

    if (post_id !== undefined) {
      GetPosts();
    }

    return post_id;
  };

  const GetComments = async (postId: number) => {
    const api = useApiStore().api;
    const commentsApi = await api.WallService.GetComments(
      new WallGetCommentsRequset({
        post_id: postId,
      })
    );
    return mapComments(commentsApi);
  };

  return {
    GetFriends,
    GetPosts,
    GetUser,
    AddLike,
    DeleteLike,
    Post,
    GetComments,
    posts,
    friends,
  };
});
