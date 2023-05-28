export default class WallCreateCommentResponse {
  comment_id: number;

  constructor(obj?: Partial<WallCreateCommentResponse>) {
    Object.assign(this, obj);
  }
}
