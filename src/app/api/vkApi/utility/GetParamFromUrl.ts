/**
 * Получаем параметр из URL по ключу
 * @param key Ключ
 * @param url URL
 */
export const GetParamFromUrl = (key: string, url: string = location.hash) => {
  const matches = url.match(new RegExp(key + "=([^&]*)"));
  return matches ? matches[1] : null;
};
