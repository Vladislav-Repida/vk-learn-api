export default class UsersGetRequest {
  user_ids: Array<number>;

  constructor(obj?: Partial<UsersGetRequest>) {
    Object.assign(this, obj);
  }
}
