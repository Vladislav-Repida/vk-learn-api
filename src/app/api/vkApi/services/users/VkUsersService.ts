import { VkFetch } from "../../utility";
import { UsersGetRequest, UsersGetResponse } from "./models";

export default class VkUsersService {
  private AccessToken: string;

  async Get(request?: UsersGetRequest) {
    const response = await VkFetch("users.get", {
      ...request,
      access_token: this.AccessToken,
      fields: [
        "bdate",
        "country",
        "status",
        "photo_50",
        "photo_100",
        "photo_200_orig",
      ],
    });

    return new UsersGetResponse({
      ...response[0],
    });
  }

  constructor(AccessToken: string) {
    this.AccessToken = AccessToken;
  }
}
