import {Friend} from '@prisma/client';
/**
 * Clase abstracta base
 */
export abstract class FriendState {}

/**
 * Clase que indica si hay error en alguna operacion con los amigos
 */
export class FriendError extends FriendState {
  error: string;
  /**
   * @param {string} error - Mensaje de error
   */
  constructor(error: string) {
    super();
    this.error = error;
  }
}
/**
 * Clase que indica si operación con los amigos es exitosa
 */
export class FriendSuccessfull extends FriendState {
  request: Friend | Friend[];
  /**
   * @param {Friend | Friend[]} request - Se recibe tanto el objeto Friend
  como una lista de el mismo resultantes de la operación
   */
  constructor(request: Friend | Friend[]) {
    super();
    this.request = request;
  }
}
