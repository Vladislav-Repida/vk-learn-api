import { FriendsGetResponse } from "@/app/api/vkApi/services/friends/models";
import { UserModel } from "./models";

export const mapUsersFromGetFriendsMethod = (
  users: Array<FriendsGetResponse>
) =>
  users.map(
    (user) =>
      new UserModel({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        photoRegular: user.photo_50,
        photoBold: user.photo_200_orig,
        photoMedium: user.photo_100,
        countryName: user.country?.title,
        bdate: user.bdate,
      })
  );