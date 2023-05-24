import { ExtendedDate } from "@/shared/models";
import UserModel from "./UserModel";

export default class CommentModel {
  id: number;
  postId: number;
  text: string;
  owner: UserModel;
  date?: ExtendedDate;

  constructor(obj?: Partial<CommentModel>) {
    Object.assign(this, obj);
  }
}
