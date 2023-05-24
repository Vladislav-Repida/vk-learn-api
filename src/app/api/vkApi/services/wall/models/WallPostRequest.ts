export default class WallPostRequest {
  friends_only?: number;
  mute_notifications?: number;
  message: string;

  constructor(obj?: Partial<WallPostRequest>) {
    Object.assign(this, obj);
  }
}
