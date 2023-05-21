import { VkFetch } from "../../utility";
import { FriendsGetRequest, FriendsGetResponse } from "./models";

export default class VkFriendsService {
  private AccessToken: string;

  async GetCurrenUserFriends(request?: FriendsGetRequest) {
    const response: Array<FriendsGetResponse> = (
      await VkFetch(
        "friends.get",
        Object.assign({ access_token: this.AccessToken }, request)
      )
    ).items;

    return response.map((item) => new FriendsGetResponse({ ...item }));
  }

  constructor(AccessToken: string) {
    this.AccessToken = AccessToken;
  }
}
