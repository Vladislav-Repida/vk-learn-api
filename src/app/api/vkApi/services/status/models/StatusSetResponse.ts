export default class StatusSetResponse {
  isSuccess: boolean;
  constructor(obj?: Partial<StatusSetResponse>) {
    Object.assign(this, obj);
  }
}
