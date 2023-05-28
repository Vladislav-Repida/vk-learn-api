import { VkFetch } from "../../utility";
import { StatusSetRequest, StatusSetResponse } from "./models";

export default class VkStatusService {
  private AccessToken: string;

  async Set(requst: StatusSetRequest) {
    const response: number = await VkFetch("status.set", {
      access_token: this.AccessToken,
      ...requst,
    });

    return new StatusSetResponse({
      isSuccess: response === 1,
    });
  }

  constructor(AccessToken: string) {
    this.AccessToken = AccessToken;
  }
}
