export default class WallGetResponse {
  text: string;

  constructor(obj?: Partial<WallGetResponse>) {
    Object.assign(this, obj);
  }
}
