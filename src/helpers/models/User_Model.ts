import {User} from '@prisma/client';
/**
 *Clase abstracta base
 */
export abstract class UserState {}

/**
 * Clase que indica si hay error en alguna operacion con el usuario
 */
export class UserError extends UserState {
  error: String;
  /**
   * @param {string} error - Mensaje de error sucedido
   */
  constructor(error: string) {
    super();
    this.error = error;
  }
}
/**
 * Clase que indica si una operación con el usuario fue exitosa
 */
export class UserSuccessfull extends UserState {
  user: User;
  /**
   * @param {User} user - Objeto de usuario resultante de la operación
   */
  constructor(user: User) {
    super();
    this.user = user;
  }
}
