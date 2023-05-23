export default class SecureCheckTokenRequest {
  token: string;

  constructor(obj?: Partial<SecureCheckTokenRequest>) {
    Object.assign(this, obj);
  }
}
