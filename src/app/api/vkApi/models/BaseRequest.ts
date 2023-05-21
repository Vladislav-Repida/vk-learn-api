export default class BaseRequest {
  /** Токен доступа */
  access_token?: string;

  constructor(obj?: Partial<BaseRequest>) {
    Object.assign(this, obj);
  }
}
