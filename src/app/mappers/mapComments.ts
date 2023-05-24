import { ExtendedDate } from "@/shared/models";
import { WallGetCommentsResponse } from "../api/vkApi/services/wall/models";
import { useAppStore } from "../stores/appStore";
import { CommentModel } from "./models";

export const mapComments = async (comments: Array<WallGetCommentsResponse>) => {
  const { GetUser } = useAppStore();

  const result = new Array<CommentModel>();

  for (let index = 0; index < comments.length; index++) {
    const comment = comments[index];

    result.push(
      new CommentModel({
        id: comment.id,
        postId: comment.post_id,
        text: comment.text,
        owner: await GetUser(comment.owner_id),
        date: new ExtendedDate(comment.date * 1000),
      })
    );
  }

  return result;
};
