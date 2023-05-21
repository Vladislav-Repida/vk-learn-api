export default class FriendsGetResponse {
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

  constructor(obj: Partial<FriendsGetResponse>) {
    Object.assign(this, obj);
  }
}
