export default class WallGetResponse {
  id: number;
  text: string;
  date: number;
  owner_id: number;
  likes: {
    count: number;
    can_like: number;
  };

  constructor(obj?: Partial<WallGetResponse>) {
    Object.assign(this, obj);
  }
}
