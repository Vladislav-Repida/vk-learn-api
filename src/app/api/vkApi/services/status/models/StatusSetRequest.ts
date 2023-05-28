export default class StatusSetRequest {
  text: string;

  constructor(obj?: Partial<StatusSetRequest>) {
    Object.assign(this, obj);
  }
}
