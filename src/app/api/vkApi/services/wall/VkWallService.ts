import { VkFetch } from "../../utility";
import { WallGetRequest, WallGetResponse } from "./models";

export default class VkWallService {
  private AccessToken: string;

  async Get(request: WallGetRequest) {
    const response: Array<WallGetResponse> = (
      await VkFetch(
        "friends.get",
        Object.assign({ access_token: this.AccessToken }, request)
      )
    ).items;

    return response.map((item) => new WallGetResponse({ ...item }));
  }

  constructor(AccessToken: string) {
    this.AccessToken = AccessToken;
  }
}
