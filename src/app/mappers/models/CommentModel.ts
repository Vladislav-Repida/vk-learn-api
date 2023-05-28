import { ExtendedDate } from "@/shared/models";
import UserModel from "./UserModel";

/** Модель комментария для поста */
export default class CommentModel {
  /** ID комментария */
  id: number;
  /** ID поста */
  postId: number;
  /** Текст комментария */
  text: string;
  /** Создатель комментария */
  owner: UserModel;
  /** Дата создания комментария */
  date?: ExtendedDate;

  constructor(obj?: Partial<CommentModel>) {
    Object.assign(this, obj);
  }
}
