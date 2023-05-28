import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { PostModel, UserModel } from "@/app/mappers/models";
import {
  mapComments,
  mapPosts,
  mapUsersFromGetFriendsMethod,
  mapUsersFromUsersGetMethod,
} from "@/app/mappers";
import {
  WallAddLikeRequest,
  WallCreateCommentRequest,
  WallDeleteLikeRequest,
  WallGetCommentsRequset,
  WallGetRequest,
  WallPostRequest,
} from "@/app/api/vkApi/services/wall/models";
import { UsersGetRequest } from "@/app/api/vkApi/services/users/models";
import { StatusSetRequest } from "@/app/api/vkApi/services/status/models";

import { useApiStore } from "../apiStore";
import { useUserStore } from "../userStore";

export const useAppStore = defineStore("appStore", () => {
  /** Стек пользователей к которые мы получали с API */
  const users = ref(new Array<UserModel>());
  /** Друзья текущего пользователя */
  const friends = ref<Array<UserModel>>();
  /** Посты текущего пользователя */
  const posts = ref<Array<PostModel>>();

  /** Получаем друзей текущего пользователя */
  const GetFriends = async () => {
    // API
    const api = useApiStore().api;
    // Друзья (модели API)
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
    // Конвертируем модели API в локальные модели
    friends.value = mapUsersFromGetFriendsMethod(friendApi);
  };

  /** Получаем посты со стены текущего пользователя */
  const GetPosts = async () => {
    // API
    const api = useApiStore().api;
    // Посты (модели API)
    const postsApi = await api.WallService.Get(new WallGetRequest());
    // Сконвертированные API модели в локальные модели
    const _posts = await mapPosts(postsApi);

    posts.value = _posts;
    return _posts;
  };

  /**
   * Получаем пользователя по идентификатору
   * @param userId Идентификатор пользователя
   */
  const GetUser = async (userId: number) => {
    // Находим пользователя в хранилище стора
    const findUser = users.value.find((user) => user.id === userId);
    // Если такой пользователь найден, возвращаем его без запроса к API
    if (findUser) return findUser;

    const api = useApiStore().api;

    // Получаем пользователя
    const [user] = mapUsersFromUsersGetMethod(
      await api.UsersService.Get(
        new UsersGetRequest({
          user_ids: [userId],
        })
      )
    );

    // Добавляем пользователя в общий стек
    users.value.push(user);

    return user;
  };

  /**
   * Ставим лайк на пост
   * @param postId ID поста
   * @returns Количество лайков на посте
   */
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

  /**
   * Удаляем лайк с поста
   * @param postId ID поста
   * @returns
   */
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

  /**
   * Постим пост
   * @param message Сообщение поста
   * @returns ID созданного поста
   */
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
      return post_id;
    }
  };

  /**
   * Получаем комментарии поста
   * @param postId ID поста
   * @returns Массив комментариев
   */
  const GetComments = async (postId: number) => {
    const api = useApiStore().api;
    const commentsApi = await api.WallService.GetComments(
      new WallGetCommentsRequset({
        post_id: postId,
      })
    );
    return mapComments(commentsApi);
  };

  /**
   * Создаем комментарий на посте
   * @param postId ID поста
   * @param message Сообщение комментария
   * @returns
   */
  const CreateComment = async (postId: number, message: string) => {
    const api = useApiStore().api;
    const commentId = (
      await api.WallService.CreateComment(
        new WallCreateCommentRequest({
          post_id: postId,
          message,
        })
      )
    ).comment_id;

    if (commentId !== undefined) {
      GetPosts();
      return commentId;
    }
  };

  /**
   * Устанавливаем статус на странице
   * @param status Строка нового статуса
   * @returns
   */
  const SetStatus = async (status: string) => {
    const api = useApiStore().api;
    const { isSuccess } = await api.StatusService.Set(
      new StatusSetRequest({
        text: status,
      })
    );

    // Если запрос успешен обновляем данные о пользователе
    if (isSuccess) {
      const userStore = useUserStore();
      const { user } = storeToRefs(userStore);
      user.value.status = status;
    }

    return isSuccess;
  };

  return {
    GetFriends,
    GetPosts,
    GetUser,
    AddLike,
    DeleteLike,
    Post,
    GetComments,
    CreateComment,
    SetStatus,
    posts,
    friends,
  };
});
