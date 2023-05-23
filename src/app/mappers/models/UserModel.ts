/**
 * Модель пользователя
 */
export default class UserModel {
  /** Идентификатор */
  id: number;
  /** Имя */
  firstName: string;
  /** Фамилия */
  lastName: string;
  /** Фото */
  photoRegular: string;
  /** Фото */
  photoMedium: string;
  /** Фото */
  photoBold: string;
  /** Название страны */
  countryName?: string;
  /** Дата рождения */
  bdate?: string;
  /** Статус */
  status?: string;

  constructor(obj?: Partial<UserModel>) {
    Object.assign(this, obj);
  }
}
