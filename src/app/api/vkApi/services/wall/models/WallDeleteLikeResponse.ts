export default class WallDeleteLikeResponse {
  likes: number;

  constructor(obj?: Partial<WallDeleteLikeResponse>) {
    Object.assign(this, obj);
  }
}
