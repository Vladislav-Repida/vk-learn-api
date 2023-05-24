export default class WallGetCommentsResponse {
  id: number;
  post_id: number;
  text: string;
  owner_id: number;
  date: number;

  constructor(obj?: Partial<WallGetCommentsResponse>) {
    Object.assign(this, obj);
  }
}
