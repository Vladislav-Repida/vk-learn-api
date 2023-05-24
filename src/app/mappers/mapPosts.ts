import { ExtendedDate } from "@/shared/models";
import { WallGetResponse } from "../api/vkApi/services/wall/models";
import { useAppStore } from "../stores/appStore";
import { PostModel } from "./models";

export const mapPosts = async (posts: Array<WallGetResponse>) => {
  const { GetUser, GetComments } = useAppStore();

  const result = new Array<PostModel>();

  for (let index = 0; index < posts.length; index++) {
    const post = posts[index];
    result.push(
      new PostModel({
        id: post.id,
        text: post.text,
        countLikes: post?.likes?.count ?? 0,
        isLiked: post?.likes?.can_like === 0,
        date: new ExtendedDate(post.date * 1000),
        owner: await GetUser(post.owner_id),
        comments: await GetComments(post.id),
      })
    );
  }

  return result;
};
