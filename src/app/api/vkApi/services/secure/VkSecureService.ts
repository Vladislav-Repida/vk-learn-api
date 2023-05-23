import { VkFetch } from "../../utility";
import { SecureCheckTokenRequest, SecureCheckTokenResponse } from "./models";

export default class VkSecureService {
  ServiceToken: string;

  /** Провряем токен */
  async CheckToken(request: SecureCheckTokenRequest) {
    const resp = await VkFetch("secure.checkToken", {
      access_token: this.ServiceToken,
      ...request,
    });

    return new SecureCheckTokenResponse({
      isSuccess: resp?.success === 1,
    });
  }

  constructor(ServiceToken: string) {
    this.ServiceToken = ServiceToken;
  }
}
