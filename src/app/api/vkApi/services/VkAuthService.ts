import { SecureCheckTokenRequest, SecureCheckTokenResponse } from "../models";
import { CollectUrl, GetParamFromUrl, VkFetch } from "../utility";

type AuthQueryDisplay = "page" | "popup" | "mobile";

type VkAuthServiceContructorParams = {
  AppId: number;
  Scopes: string[];
  ServiceKey: string;
  /** Коллбек который вызывается при успешной авторизации */
  callbackAuth: (token: string) => void;
};

export default class VkAuthService {
  private AuthUrl = "https://oauth.vk.com/authorize";
  /** ID приложения */
  private AppId: number;
  /** Адресс редиректа при авторизации */
  private RedirectURI: string = "http://127.0.0.1:8915";
  /** Тип отображения страницы авторизации */
  private Display: AuthQueryDisplay = "page";
  /** Доступы */
  private Scopes: string[];
  /** Сервисный ключ */
  private ServiceKey: string;

  /** Тип возвращаемого значения авторизации */
  private ResponseType = "token";
  /** Версия */
  private Version = "5.131";
  /** Коллбек который вызывается при успешной авторизации */
  private callbackAuth: (token: string) => void;

  /** Собираем URL авторизации */
  private CollectAuthURL() {
    return CollectUrl(this.AuthUrl, {
      client_id: this.AppId,
      display: this.Display,
      redirect_uri: this.RedirectURI,
      scope: this.Scopes.join(","),
      response_type: this.ResponseType,
      v: this.Version,
    });
  }

  /**
   * Проверяем валидный ли токен
   * @param token Токен для проверки
   */
  private async CheckValidToken(token: string) {
    // Данные для запроса
    const request = new SecureCheckTokenRequest({
      token,
      access_token: this.ServiceKey,
    });

    // Данные ответа
    const response = (await VkFetch(
      "secure.checkToken",
      request
    )) as SecureCheckTokenResponse;

    return response?.success === 1;
  }

  /**
   * Получаем токен авторизации.
   * Либо из локального хранилища, либо из параметра URL.
   * @returns
   */
  private async GetToken(): Promise<string | undefined> {
    // Токен из локального хранилища
    const lcToken = window.localStorage.getItem("token");
    // Если токен существует и он валидный
    if (lcToken && (await this.CheckValidToken(lcToken))) return lcToken;

    // Токен из URL параметра
    const urlParamToken = GetParamFromUrl("access_token");
    // Если токен существует и он валидный
    if (urlParamToken && (await this.CheckValidToken(urlParamToken))) {
      // Записываем токен в локальное хранилище
      window.localStorage.setItem("token", urlParamToken);
      return urlParamToken;
    }
  }

  /**
   * Авторизируемся
   * @returns Токен авторизации. Либо открывается новая страница с авторизацией
   */
  public async Auth(): Promise<string | void> {
    // Получаем токен
    const token = await this.GetToken();

    // Если токен отсутсвует.
    if (!token) {
      // Открываем страницу авторизации
      window.open(this.CollectAuthURL());
      // Закрываем текущую страницу
      window.close();
    } else {
      this.callbackAuth(token);
      return token;
    }
  }

  constructor(obj?: VkAuthServiceContructorParams) {
    Object.assign(this, obj);
  }
}
