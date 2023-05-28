import { VkFetch } from "../../utility";
import {
  WallAddLikeRequest,
  WallAddLikeResponse,
  WallCreateCommentRequest,
  WallCreateCommentResponse,
  WallDeleteLikeRequest,
  WallDeleteLikeResponse,
  WallGetCommentsRequset,
  WallGetCommentsResponse,
  WallGetRequest,
  WallGetResponse,
  WallPostRequest,
  WallPostResponse,
} from "./models";

export default class VkWallService {
  private AccessToken: string;

  async Get(request: WallGetRequest) {
    const response: Array<WallGetResponse> = (
      await VkFetch(
        "wall.get",
        Object.assign(
          {
            access_token: this.AccessToken,
          },
          request
        )
      )
    ).items;

    return response.map((item) => new WallGetResponse({ ...item }));
  }

  async AddLike(request: WallAddLikeRequest) {
    const response: WallAddLikeResponse = await VkFetch(
      "wall.addLike",
      Object.assign(
        {
          access_token: this.AccessToken,
        },
        request
      )
    );

    return new WallAddLikeResponse({ ...response });
  }

  async DeleteLike(request: WallDeleteLikeRequest) {
    const response: WallDeleteLikeResponse = await VkFetch(
      "wall.deleteLike",
      Object.assign(
        {
          access_token: this.AccessToken,
        },
        request
      )
    );

    return new WallDeleteLikeResponse({ ...response });
  }

  async Post(request: WallPostRequest) {
    const response: WallPostResponse = await VkFetch(
      "wall.post",
      Object.assign(
        {
          access_token: this.AccessToken,
        },
        request
      )
    );

    return new WallPostResponse({ ...response });
  }

  async GetComments(request: WallGetCommentsRequset) {
    const response: Array<WallGetCommentsResponse> = (
      await VkFetch(
        "wall.getComments",
        Object.assign(
          {
            access_token: this.AccessToken,
          },
          request
        )
      )
    ).items;

    return response.map((value) => new WallGetCommentsResponse({ ...value }));
  }

  async CreateComment(request: WallCreateCommentRequest) {
    const response: WallCreateCommentResponse = await VkFetch(
      "wall.createComment",
      Object.assign(
        {
          access_token: this.AccessToken,
        },
        request
      )
    );

    return new WallCreateCommentResponse({ ...response });
  }

  constructor(AccessToken: string) {
    this.AccessToken = AccessToken;
  }
}
