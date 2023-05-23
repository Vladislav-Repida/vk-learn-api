export default class SecureCheckTokenResponse {
  isSuccess: boolean;

  constructor(obj?: Partial<SecureCheckTokenResponse>) {
    Object.assign(this, obj);
  }
}
