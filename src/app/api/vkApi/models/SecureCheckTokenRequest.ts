import BaseRequest from "./BaseRequest";

export default class SecureCheckTokenRequest extends BaseRequest {
  /** Токен для проверки */
  token: string;

  constructor(obj?: Partial<SecureCheckTokenRequest>) {
    super(obj);
    Object.assign(this, obj);
  }
}
