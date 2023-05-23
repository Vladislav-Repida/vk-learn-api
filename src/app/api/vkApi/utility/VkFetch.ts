import { CollectUrl } from "@/shared/utility";
// @ts-ignore
import jsonp from "simple-jsonp-promise";

declare function jsonp(url: string): Promise<any>;

type VkFetchMethod =
  | "secure.checkToken"
  | "friends.get"
  | "wall.get"
  | "users.get";
type VkFetchRequest = {
  access_token?: string;
};

const ApiUrl = "https://api.vk.com/method";
const ApiVersion = "5.131";

export const VkFetch = async <T extends VkFetchRequest>(
  method: VkFetchMethod,
  body: T
) => {
  const url = CollectUrl(
    `${ApiUrl}/${method}`,
    Object.assign(body, { v: ApiVersion })
  );
  const resp = await jsonp(url);

  return resp?.response;
};
