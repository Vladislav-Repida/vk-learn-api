export default class WallDeleteLikeRequest {
  post_id: number;

  constructor(obj?: Partial<WallDeleteLikeRequest>) {
    Object.assign(this, obj);
  }
}
