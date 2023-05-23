export default class UsersGetResponse {
  id: number;
  first_name?: string;
  last_name?: string;
  photo_50?: string;
  photo_100?: string;
  photo_200_orig?: string;
  country?: {
    id: number;
    title: string;
  };
  bdate?: string;
  status?: string;

  constructor(obj?: Partial<UsersGetResponse>) {
    Object.assign(this, obj);
  }
}
