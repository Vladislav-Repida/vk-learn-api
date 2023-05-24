export default class WallAddLikeResponse {
  likes: number;

  constructor(obj?: Partial<WallAddLikeResponse>) {
    Object.assign(this, obj);
  }
}
