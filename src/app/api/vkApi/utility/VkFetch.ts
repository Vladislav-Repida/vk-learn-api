import { CollectUrl } from "@/shared/utility";
// @ts-ignore
import jsonp from "simple-jsonp-promise";

declare function jsonp(url: string): Promise<any>;

// Методы API
type VkFetchMethod =
  | "secure.checkToken"
  | "friends.get"
  | "wall.get"
  | "wall.addLike"
  | "wall.deleteLike"
  | "wall.post"
  | "wall.getComments"
  | "wall.createComment"
  | "users.get"
  | "status.set";

type VkFetchRequest = {
  access_token?: string;
};

/** Ссылка апи */
const ApiUrl = "https://api.vk.com/method";
// Версия апи
const ApiVersion = "5.131";

/**
 * Отправляем запрос на API VK
 * @param method
 * @param body
 * @returns
 */
export const VkFetch = async <T extends VkFetchRequest>(
  method: VkFetchMethod,
  body: T
) => {
  // Собирем URL
  const url = CollectUrl(
    `${ApiUrl}/${method}`,
    Object.assign(body, { v: ApiVersion })
  );
  const resp = await jsonp(url);

  return resp?.response;
};
