export default class WallCreateCommentRequest {
  post_id: number;
  message: string;

  constructor(obj?: Partial<WallCreateCommentRequest>) {
    Object.assign(this, obj);
  }
}
