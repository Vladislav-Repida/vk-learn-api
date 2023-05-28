export default class FriendsGetRequest {
  user_id?: number;
  order?: "hints" | "random" | "name";
  fields: Array<
    | "bdate"
    | "can_post"
    | "can_see_all_posts"
    | "can_write_private_message"
    | "city"
    | "contacts"
    | "country"
    | "domain"
    | "education"
    | "has_mobile"
    | "timezone"
    | "last_seen"
    | "nickname"
    | "online"
    | "photo_100"
    | "photo_200_orig"
    | "photo_50"
    | "relation"
    | "sex"
    | "status"
    | "universities"
  >;
  name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl";

  constructor(obj?: Partial<FriendsGetRequest>) {
    Object.assign(this, obj);
  }
}
