export default class WallGetCommentsRequset {
  post_id: number;

  constructor(obj?: Partial<WallGetCommentsRequset>) {
    Object.assign(this, obj);
  }
}
