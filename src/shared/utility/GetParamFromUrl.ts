/**
 * Получаем параметр из URL по ключу
 * @param key Ключ
 * @param url URL
 */
export const GetParamFromUrl = (key: string, url: string) => {
  const matches = url.match(new RegExp(key + "=([^&]*)"));
  return matches ? matches[1] : null;
};
