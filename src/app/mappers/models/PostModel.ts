import { ExtendedDate } from "@/shared/models";
import CommentModel from "./CommentModel";
import UserModel from "./UserModel";

export default class PostModel {
  id: number;
  text: string;
  date: ExtendedDate;
  countLikes: number;
  owner: UserModel;
  isLiked: boolean = false;
  comments?: Array<CommentModel>;

  constructor(obj?: Partial<PostModel>) {
    Object.assign(this, obj);
  }
}
