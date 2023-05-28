import { ExtendedDate } from "@/shared/models";
import CommentModel from "./CommentModel";
import UserModel from "./UserModel";

/** Модель описания поста */
export default class PostModel {
  /** ID поста */
  id: number;
  /** Текст поста */
  text: string;
  /** Дата создания поста */
  date: ExtendedDate;
  /** Количество лайков */
  countLikes: number;
  /** Создатель */
  owner: UserModel;
  /** Лайкнутый ли пост текущим пользователем */
  isLiked: boolean = false;
  /** Комментарии поста */
  comments?: Array<CommentModel>;

  constructor(obj?: Partial<PostModel>) {
    Object.assign(this, obj);
  }
}
