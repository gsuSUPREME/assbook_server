/**
 * Clase base abstracta
 */
export abstract class NotificationState {}


/**
 * Clase Usada para mostrar errores relacionados a las notificaciones
 */
export class NotificationError {
  message: string;
  /**
   *@param {string} message - Mensaje de error a mostrar
   */
  constructor(message: string) {
    this.message = message;
  }
}

/**
 * Clase usaba para indicar que una operación es exitosa
 */
export class NotificationSuccess {}
