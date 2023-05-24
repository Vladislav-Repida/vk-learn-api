export default class WallAddLikeRequest {
  post_id: number;

  constructor(obj?: Partial<WallAddLikeRequest>) {
    Object.assign(this, obj);
  }
}
