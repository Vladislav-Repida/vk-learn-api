import { VkScopepeType } from "../types";
import VkAuthService from "./VkAuthService";
import { VkFriendsService } from "./friends";

type VkServiceParams = {
  /** ID приложения */
  AppId: number;
  /** Доступы */
  Scopes: VkScopepeType[];
  /** Сервисный ключ */
  ServiceKey: string;
  /** Коллбек успешной авторизации */
  callbackAuth: (token: string) => void;
};

export default class VkApiService {
  /** ID приложения */
  private AppId: number;
  /** Доступы */
  private Scopes: string[];
  /** Сервисный ключ */
  private ServiceKey: string;
  /** Коллбек успешной авторизации */
  private callbackAuth: (token: string) => void;

  /** Сервис аутентификации */
  AuthService: VkAuthService;
  /** Cервис для работы с друзьями */
  FriendsService?: VkFriendsService;

  /**
   * Инициализируем сервисы в которых необходим токен
   * @param token Токен
   */
  initServicesWithToken = (token: string) => {
    // Инициализируем сервис для работы с друзьями
    this.FriendsService = new VkFriendsService(token);
    // Вызываем коллбек успешной авторизации и передаем токен
    this.callbackAuth(token);
  };

  init = () => {
    // Инициализируем сервис аутентификации
    this.AuthService = new VkAuthService({
      AppId: this.AppId,
      Scopes: this.Scopes,
      ServiceKey: this.ServiceKey,
      callbackAuth: this.initServicesWithToken,
    });
  };

  constructor(obj?: VkServiceParams) {
    Object.assign(this, obj);
    this.init();
  }
}
