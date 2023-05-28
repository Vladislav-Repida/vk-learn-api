import { VkFriendsService } from "./friends";
import { VkSecureService } from "./secure";
import { VkStatusService } from "./status";
import { VkUserService } from "./users";
import VkUsersService from "./users/VkUsersService";
import { VkWallService } from "./wall";

export default class VkApiService {
  /** Сервисный токен доступа */
  ServiceToken: string;

  /** Сервис для работы с административными методами */
  SecureService?: VkSecureService;

  /** Cервис для работы с друзьями */
  FriendsService?: VkFriendsService;
  /** Cервис для работы со стеной */
  WallService?: VkWallService;
  /** Сервис для работы с пользователями */
  UsersService?: VkUserService;
  /** Сервис для работы со статусами пользователя */
  StatusService?: VkStatusService;

  /** Инициализируем сервисы с токеном */
  InitServicesWithToken(token: string) {
    // Инициализируем сервис для работы с друзьями
    this.FriendsService = new VkFriendsService(token);
    // Инициализируем сервис для работы со стеной
    this.WallService = new VkWallService(token);
    // Инициализируем сервис для работы с пользователями
    this.UsersService = new VkUsersService(token);
    // Инициализируем сервис для работы со статусами пользователя
    this.StatusService = new VkStatusService(token);
  }

  /** Инициализируем сервисы без токена */
  InitServicesWithoutToken() {
    this.SecureService = new VkSecureService(this.ServiceToken);
  }

  constructor(ServiceToken: string) {
    this.ServiceToken = ServiceToken;
    this.InitServicesWithoutToken();
  }
}
