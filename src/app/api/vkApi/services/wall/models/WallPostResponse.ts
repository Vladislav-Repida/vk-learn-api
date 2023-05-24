export default class WallPostResponse {
  post_id: number;

  constructor(obj?: Partial<WallPostResponse>) {
    Object.assign(this, obj);
  }
}
