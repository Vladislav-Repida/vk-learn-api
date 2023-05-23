export default class BaseTableRowModel<T> {
  id: number;
  slotName: string;
  data: T;

  constructor(obj?: Partial<BaseTableRowModel<T>>) {
    Object.assign(this, obj);
  }
}
